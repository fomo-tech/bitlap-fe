import { Avatar, Drawer, List, message, Modal, notification, Popover, Tabs, Typography } from 'antd'
import requestService from 'api/request';
import clsx from 'clsx';
import { formatAddress } from 'lib/helpers';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAuthApp } from 'store/useAuthApp';
import { useGlobalAppStore } from 'store/useGlobalApp';


interface Props {
    setOpen: (val: boolean) => void,
    open: boolean
}

interface IFormInput {
    nameBank: string;
    numberBank: string;
    holderName: string
}
export const AddPaymentMethod = ({ open, setOpen }: Props) => {
    const { i18n, t } = useTranslation();
    const [openSelectBank, setOpenSelectbank] = useState(false)
    const { user } = useAuthApp()
    const { configApp, handleLoading, handleCallbackUser } = useGlobalAppStore()
    const { register, handleSubmit, watch, control, setValue, reset, formState: { errors } } = useForm<IFormInput>({
    });
    const [tab, setTab] = useState("banking")

    const onChange = (key: string) => {
        setTab(key);
    };

    const onSubmitBanking: SubmitHandler<IFormInput> = async (data) => {
        handleLoading(true)
        try {
            const res = await requestService.post('/profile/method-payment', {
                data: {
                    ...data
                }
            })

            if (res && res.data) {
                handleCallbackUser()
                reset()
            }
        } catch (error: any) {
            notification.error({
                message: error.response?.data?.message,
                duration: 3
            })
        }
        handleLoading(false)
    }


    const onSubmitAddressWallet: SubmitHandler<IFormInput> = async (data) => {
        handleLoading(true)
        try {
            const res = await requestService.post('/profile/method-payment', {
                data: {
                    nameBank: "BEP20",
                    numberBank: data.numberBank,
                    holderName: "Crypto"
                }
            })

            if (res && res.data) {
                handleCallbackUser()
                reset()
            }
        } catch (error: any) {
            notification.error({
                message: error.response?.data?.message,
                duration: 3
            })

        }
        handleLoading(false)
    }

    const handleDeleteMethod = async (item: any) => {
        try {
            const res = await requestService.delete('/profile/method-payment', {
                data: {
                    ...item
                }
            })
            if (res && res.data) {
                handleCallbackUser()
            }
        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        }
    }

    return (
        <>
            <Drawer
                open={openSelectBank}
                placement='bottom'
                height={"40vh"}
                width={"100rem"}
                zIndex={9999}
                closeIcon={false}
                title={
                    <div className='flex justify-between'>
                        <div className='cursor-pointer text-[#ccc]' onClick={() => {
                            setOpenSelectbank(false)
                            setValue('nameBank', "")
                        }}>
                            Cancel
                        </div>
                        <div className='cursor-pointer van-picker__confirm' onClick={() => {
                            setOpenSelectbank(false)
                        }}>
                            Confirm
                        </div>
                    </div>
                }
            >
                <List
                    header={null}
                    footer={null}

                    dataSource={configApp?.bankList || []}
                    renderItem={(item: any) => (
                        <List.Item onClick={() => {
                            setValue('nameBank', item?.short_name)
                            setOpenSelectbank(false)
                        }
                        }>
                            <List.Item.Meta
                                avatar={<img width={80} src={item?.logo} />}
                                title={item?.short_name}
                                description={item?.name}
                            />

                        </List.Item>
                    )}
                />
            </Drawer>

            <Drawer
                title={
                    <div className='text-center text-[#fff]'>
                        Thông tin thanh toán
                    </div>
                }
                placement={'right'}
                width={"100rem"}
                closable={true}
                closeIcon={
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-[#fff] hover:text-[#fff]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>


                    </div>
                }
                onClose={() => setOpen(false)}
                bodyStyle={{ backgroundColor: "#1c1b18", padding: "20px" }}
                headerStyle={{ backgroundColor: "#1c1b18", padding: "20px" }}
                open={open}

            >
                <div className="mx-[20px] add-bank-form bg-[#1c1b18] p-[20px] rounded-[16px] border border-[#3a3225] shadow-md">
                    <div className="form-title text-[18px] font-semibold text-[#facc15] mb-[16px]">
                        {t("Add New Account")}
                    </div>

                    {/* Custom Tabs */}
                    <div className="flex mb-[16px] justify-around text-[14px] font-semibold bg-[#2a261c] px-[6px] py-[6px] rounded-[12px] border border-[#3a3225]">
                        <div
                            className={clsx(
                                "w-[100px] text-center py-[8px] rounded-[8px] cursor-pointer transition-all duration-200",
                                tab === 'banking'
                                    ? "bg-[#facc15]/10 text-[#facc15] shadow-inner"
                                    : "text-[#d1b96f] hover:text-[#facc15]"
                            )}
                            onClick={() => setTab('banking')}
                        >
                            Banking
                        </div>
                        <div
                            className={clsx(
                                "w-[100px] text-center py-[8px] rounded-[8px] cursor-pointer transition-all duration-200",
                                tab === 'crypto'
                                    ? "bg-[#facc15]/10 text-[#facc15] shadow-inner"
                                    : "text-[#d1b96f] hover:text-[#facc15]"
                            )}
                            onClick={() => setTab('crypto')}
                        >
                            BEP 20
                        </div>
                    </div>

                    {/* Banking Form */}
                    {tab === "banking" && (
                        <form className="space-y-[16px]" onSubmit={handleSubmit(onSubmitBanking)}>
                            <div>
                                <label className="block text-[14px] text-[#facc15] font-medium mb-[6px]">
                                    {t("holderName")}
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-[12px] py-[10px] border border-[#3a3225] rounded-[10px] text-white placeholder-[#d6bb79] text-[14px] bg-[#2a261c]"
                                    placeholder={t("Enter your name")}
                                    {...register("holderName", { required: t("field_required") })}
                                />
                                {errors.holderName && (
                                    <p className="mt-[4px] text-[13px] text-red-500">{errors.holderName.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-[14px] text-[#facc15] font-medium mb-[6px]">
                                    {t("nameBank")}
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        readOnly
                                        onClick={() => setOpenSelectbank(true)}
                                        className="w-full px-[12px] py-[10px] border border-[#3a3225] rounded-[10px] text-white bg-[#2a261c] placeholder-[#d6bb79] text-[14px] cursor-pointer"
                                        placeholder={t("Click to select bank")}
                                        {...register("nameBank", { required: t("field_required") })}
                                    />
                                    <i className="absolute right-[12px] top-[50%] translate-y-[-50%] text-[#d6bb79]">▼</i>
                                </div>
                                {errors.nameBank && (
                                    <p className="mt-[4px] text-[13px] text-red-500">{errors.nameBank.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-[14px] text-[#facc15] font-medium mb-[6px]">
                                    {t("numberBank")}
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-[12px] py-[10px] border border-[#3a3225] rounded-[10px] text-white placeholder-[#d6bb79] text-[14px] bg-[#2a261c]"
                                    placeholder={t("Enter Bank Account Number")}
                                    {...register("numberBank", { required: t("field_required") })}
                                />
                                {errors.numberBank && (
                                    <p className="mt-[4px] text-[13px] text-red-500">{errors.numberBank.message}</p>
                                )}
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full py-[12px] bg-[#facc15] hover:bg-[#eab308] transition-all text-black font-semibold rounded-[12px] text-[14px]"
                                >
                                    {t("Thêm thanh toán")}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Crypto Form */}
                    {tab === "crypto" && (
                        <form className="space-y-[16px]" onSubmit={handleSubmit(onSubmitAddressWallet)}>
                            <div>
                                <label className="block text-[14px] text-[#facc15] font-medium mb-[6px]">
                                    {t("Address")}
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-[12px] py-[10px] border border-[#3a3225] rounded-[10px] text-white placeholder-[#d6bb79] text-[14px] bg-[#2a261c]"
                                    placeholder={t("Nhập địa chỉ ví BEP20")}
                                    {...register("numberBank", { required: t("field_required") })}
                                />
                                {errors.numberBank && (
                                    <p className="mt-[4px] text-[13px] text-red-500">{errors.numberBank.message}</p>
                                )}
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full py-[12px] bg-[#facc15] hover:bg-[#eab308] transition-all text-black font-semibold rounded-[12px] text-[14px]"
                                >
                                    {t("Thêm thanh toán")}
                                </button>
                            </div>
                        </form>
                    )}
                </div>

            </Drawer>
        </>
    )

}
