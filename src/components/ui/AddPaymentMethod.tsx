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
                    <div className='text-center'>
                        Thông tin thanh toán
                    </div>
                }
                placement={'right'}
                width={"100rem"}
                closable={true}
                closeIcon={
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 hover:text-[#000]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>


                    </div>
                }
                onClose={() => setOpen(false)}

                open={open}

            >
                <div data-v-1ad66f02="" className="bank-page mt-0">

                    <div className="bank-list space-y-[12px] px-[20px] py-[12px]">
                        {user && user?.bankList?.length > 0 &&
                            user.bankList.map((i: any, index: number) => (
                                <div
                                    key={i?._id || index}
                                    className="bank-item flex items-center justify-between px-[18px] py-[14px] bg-[#FFFBEB] border border-[#FDE68A] rounded-[14px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-200"
                                >
                                    <div className="bank-info max-w-[80%]">
                                        <div className="info-row text-[15px] leading-[20px] text-[#8A6D1D] font-semibold">
                                            {i?.nameBank === 'BEP20' ? (
                                                <Popover trigger="click" content={i?.numberBank}>
                                                    <span className="value cursor-pointer hover:underline text-[#D4A017] break-all">
                                                        {formatAddress(i?.numberBank)} <span className="text-[#B58900]">({i?.nameBank})</span>
                                                    </span>
                                                </Popover>
                                            ) : (
                                                <span className="value text-[#D4A017] break-all">
                                                    {i.numberBank} <span className="text-[#B58900]">({i?.nameBank})</span>
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleDeleteMethod(i)}
                                        type="button"
                                        className="flex items-center justify-center w-[32px] h-[32px] bg-[#FFF3C4] hover:bg-[#FFE69A] border border-[#FDE68A] rounded-full transition-all duration-150 group"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-[18px] h-[18px] text-[#EAB308] group-hover:text-[#CA8A04]"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={1.5}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M14.74 9L14.394 18M9.606 18L9.26 9M19.228 5.79A48.108 48.108 0 0015.75 5.393M4.772 5.79A48.11 48.11 0 018.25 5.393M16.75 5.393V4.477C16.75 3.297 15.84 2.313 14.66 2.276A51.964 51.964 0 0011.34 2.276C10.16 2.313 9.25 3.297 9.25 4.477V5.393M16.75 5.393A48.667 48.667 0 009.25 5.393"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                    </div>


                    <div className="mx-[20px] add-bank-form bg-[#FFFCF2] p-[20px] rounded-[16px] border border-[#FDE68A] shadow-md">
                        <div className="form-title text-[18px] font-semibold text-[#8A6D1D] mb-[16px]">
                            {t("Add New Account")}
                        </div>

                        <Tabs
                            onChange={onChange}
                            items={[
                                {
                                    label: "Banking",
                                    key: "banking",
                                    children: tab === "banking" && (
                                        <form className="space-y-[16px]" onSubmit={handleSubmit(onSubmitBanking)}>
                                            {/* Holder name */}
                                            <div>
                                                <label className="block text-[14px] text-[#8A6D1D] font-medium mb-[6px]">
                                                    {t("holderName")}
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full px-[12px] py-[10px] border border-[#FDE68A] rounded-[10px] text-[#333] placeholder-[#c2a75e] text-[14px] bg-[#FFF9DB]"
                                                    placeholder={t("Enter your name")}
                                                    {...register("holderName", {
                                                        required: t("field_required"),
                                                    })}
                                                />
                                                {errors.holderName && (
                                                    <p className="mt-[4px] text-[13px] text-red-600">{errors.holderName.message}</p>
                                                )}
                                            </div>

                                            {/* Bank name (readonly input) */}
                                            <div>
                                                <label className="block text-[14px] text-[#8A6D1D] font-medium mb-[6px]">
                                                    {t("nameBank")}
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        readOnly
                                                        onClick={() => setOpenSelectbank(true)}
                                                        className="w-full px-[12px] py-[10px] border border-[#FDE68A] rounded-[10px] text-[#333] bg-[#FFF9DB] placeholder-[#c2a75e] text-[14px] cursor-pointer"
                                                        placeholder={t("Click to select bank")}
                                                        {...register("nameBank", {
                                                            required: t("field_required"),
                                                        })}
                                                    />
                                                    <i className="absolute right-[12px] top-[50%] translate-y-[-50%] text-[#D4A017]">
                                                        ▼
                                                    </i>
                                                </div>
                                                {errors.nameBank && (
                                                    <p className="mt-[4px] text-[13px] text-red-600">{errors.nameBank.message}</p>
                                                )}
                                            </div>

                                            {/* Bank number */}
                                            <div>
                                                <label className="block text-[14px] text-[#8A6D1D] font-medium mb-[6px]">
                                                    {t("numberBank")}
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full px-[12px] py-[10px] border border-[#FDE68A] rounded-[10px] text-[#333] placeholder-[#c2a75e] text-[14px] bg-[#FFF9DB]"
                                                    placeholder={t("Enter Bank Account Number")}
                                                    {...register("numberBank", {
                                                        required: t("field_required"),
                                                    })}
                                                />
                                                {errors.numberBank && (
                                                    <p className="mt-[4px] text-[13px] text-red-600">{errors.numberBank.message}</p>
                                                )}
                                            </div>

                                            <div>
                                                <button
                                                    type="submit"
                                                    className="w-full py-[12px] bg-[#FACC15] hover:bg-[#eab308] transition-all text-white font-semibold rounded-[12px] text-[14px]"
                                                >
                                                    {t("Thêm thanh toán")}
                                                </button>
                                            </div>
                                        </form>
                                    ),
                                },
                                {
                                    label: "BEP 20",
                                    key: "crypto",
                                    children: tab === "crypto" && (
                                        <form className="space-y-[16px]" onSubmit={handleSubmit(onSubmitAddressWallet)}>
                                            {/* BEP20 Address */}
                                            <div>
                                                <label className="block text-[14px] text-[#8A6D1D] font-medium mb-[6px]">
                                                    {t("Address")}
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full px-[12px] py-[10px] border border-[#FDE68A] rounded-[10px] text-[#333] placeholder-[#c2a75e] text-[14px] bg-[#FFF9DB]"
                                                    placeholder={t("Nhập địa chỉ ví BEP20")}
                                                    {...register("numberBank", {
                                                        required: t("field_required"),
                                                    })}
                                                />
                                                {errors.numberBank && (
                                                    <p className="mt-[4px] text-[13px] text-red-600">{errors.numberBank.message}</p>
                                                )}
                                            </div>

                                            <div>
                                                <button
                                                    type="submit"
                                                    className="w-full py-[12px] bg-[#FACC15] hover:bg-[#eab308] transition-all text-white font-semibold rounded-[12px] text-[14px]"
                                                >
                                                    {t("Thêm thanh toán")}
                                                </button>
                                            </div>
                                        </form>
                                    ),
                                },
                            ]}
                        />
                    </div>

                </div>


            </Drawer>
        </>
    )

}
