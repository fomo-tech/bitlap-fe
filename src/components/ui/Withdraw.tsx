import { Drawer, message, Modal, notification, Popover } from 'antd'
import requestService from 'api/request'
import { clsx } from 'clsx'
import { formatAddress, formatNumber } from 'lib/helpers'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuthApp } from 'store/useAuthApp'
import { useGlobalAppStore } from 'store/useGlobalApp'
import { useCopyToClipboard } from "@uidotdev/usehooks";
// import Countdown from 'react-countdown'
import { AddPaymentMethod } from './AddPaymentMethod'
import PinInput from 'react-pin-input'
import dolar from 'assets/images/dollar.png'
import useBreakpoint from 'hooks/useBreakpoint'
import { useNavigate } from 'react-router-dom'


const Withdraw = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { user } = useAuthApp()
    const { configApp, handleLoading, handleCallbackUser } = useGlobalAppStore()
    const [openAddMethod, setAddMethod] = useState(false)
    const [openConfirm, setOpenConfirm] = useState(false)
    const [_, copyToClipboard] = useCopyToClipboard();
    const [amount, setAmount] = useState(0)
    const [selectMethod, setSelectMethod] = useState(user?.bankList[0])
    const pinRef = useRef<any>(null);
    const breakpoint = useBreakpoint()
    const handleReset = () => {
        pinRef?.current?.clear(); // Reset input về trống
    };
    const reset = () => {
        // setAddMethod(false)
        setAmount(0)
        setSelectMethod(user?.bankList[0])
    }

    useEffect(() => {
        setSelectMethod(user?.bankList[0])
    }, [user])

    const handleWithdraw = async (paymentPassword: string) => {

        handleLoading(true)
        try {
            const res = await requestService.post('/profile/withdraw', {
                data: {
                    amount: selectMethod?.nameBank === "BEP20" ?
                        amount + amount * Number(configApp?.FEE_WIDTHDRAW) / 100
                        : amount,
                    fiatAmount: selectMethod?.nameBank === "BEP20" ? amount : (amount - amount * 0.01) * configApp?.rateUsdWithdraw
                    ,
                    paymentMethod: JSON.stringify(selectMethod),
                    note: "WIDTHDRAW" + Date.now(),
                    paymentPassword
                }
            })
            if (res && res.data) {
                handleCallbackUser()
                notification.success({
                    message: "Withraw success!",
                    duration: 3
                })
                // message.success()
            }
        } catch (error: any) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
            notification.error({
                message: error?.response?.data?.message,
                duration: 3
            })
            // message.error(error?.response?.data?.message)
        }
        handleLoading(false)
        handleReset()
    }
    return (
        <>
            <AddPaymentMethod
                open={openAddMethod}
                setOpen={setAddMethod}
            />

            <div data-v-7d13b5f8="" className="amount-section">
                <div className="flex items-center justify-start mb-5">
                    <button
                        onClick={() => {
                            reset()
                            navigate('/profile')
                        }}
                        className="flex items-center gap-[6px] text-[#a47b21] hover:text-[#cca354] font-semibold text-[16px]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                        </svg>
                        {t("Quay lại")}
                    </button>
                </div>
                <div data-v-7d13b5f8="" className="section-title">
                    {t("Withdraw amount")}
                </div>
                <div data-v-7d13b5f8="" className="van-cell van-field !border-none">
                    {/**/}
                    {/**/}
                    <div className="van-cell__value van-field__value ">
                        <div className="van-field__body gap-2">
                            <input
                                type="text"
                                onChange={(e) => setAmount(parseFloat(e.target.value || "0"))}
                                value={amount}
                                inputMode="decimal"
                                id="van-field-17-input"
                                className="van-field__control van-field__control--right 
                                    !placeholder:text-[#dddd]"
                                placeholder="0"
                                data-allow-mismatch="attribute"
                            />
                            {/**/}
                            <div className="van-field__right-icon">
                                <div data-v-7d13b5f8="" className="right-content">

                                    <button
                                        data-v-7d13b5f8=""
                                        type="button"
                                        className="van-button van-button--default van-button--small"
                                        onClick={() => setAmount(user?.realBalance || 0)}
                                    >
                                        <div className="van-button__content">
                                            {/**/}
                                            <span className="van-button__text">All</span>
                                            {/**/}
                                        </div>
                                    </button>
                                </div>
                            </div>
                            {/**/}
                        </div>
                        {/**/}
                        {/**/}
                    </div>
                    {/**/}
                    {/**/}
                </div>
            </div>
            <div data-v-7d13b5f8="" className="channel-section">
                <div data-v-7d13b5f8="" className="section-title !text-[15px]">
                    <span data-v-7d13b5f8="">
                        {t("Select Bank Account")}
                    </span>
                    <button
                        data-v-7d13b5f8=""
                        type="button"
                        onClick={() => {

                            setTimeout(() => (
                                setAddMethod(true)
                            ), 150)


                        }}
                        className="van-button van-button--primary van-button--small justify-end van-button--plain add-btn"
                    >
                        <div className="van-button__content">
                            {/**/}
                            <span className="van-button__text">
                                {t("Add Bank")}
                            </span>
                            {/**/}
                        </div>
                    </button>
                </div>
                <div data-v-7d13b5f8="" className="channel-list">
                    {
                        user && user?.bankList?.length > 0
                        && user?.bankList?.map((i, index) => (
                            <div data-v-7d13b5f8=""
                                onClick={() => setSelectMethod(i)}
                                className={clsx("channel-item", {
                                    "active": i?.numberBank === selectMethod?.numberBank && i?.nameBank === selectMethod?.nameBank
                                })} key={index}>
                                <img src="https://img.icons8.com/?size=100&id=209&format=png&color=000000"
                                    width={30} className='mr-[10px]' alt=''
                                />

                                {
                                    i?.nameBank === 'BEP20' ?
                                        <Popover trigger={'click'} content={i.numberBank}>
                                            <span data-v-1ad66f02="" className="value">
                                                {formatAddress(i.numberBank)} ({i.nameBank})
                                            </span>
                                        </Popover>

                                        :
                                        <Popover trigger={'click'} content={i.numberBank}>
                                            <span data-v-1ad66f02="" className="value">
                                                {i.numberBank} ({i.nameBank})
                                            </span>
                                        </Popover>

                                }


                            </div>
                        ))

                    }

                </div>

            </div>
            <div data-v-7d13b5f8="" className="submit-section">
                <button
                    onClick={() => {
                        // const now = new Date();
                        // const vnNow = new Date(now.getTime() + (7 * 60 - now.getTimezoneOffset()) * 60000);
                        // const hours = vnNow.getHours();

                        // Nếu nằm trong khoảng 23:00 - 09:00 thì hiển thị thông báo và return
                        // if (hours >= 23 || hours < 9) {
                        //     return message.warning("System under maintenance, please try again later.");
                        // }
                        if (!selectMethod) return message.warning(t("Bạn chưa cài đặt thanh toán"))
                        setOpenConfirm(true)
                    }}
                    data-v-7d13b5f8=""
                    disabled={!user || user.realBalance < amount || user.realBalance === 0}
                    type="button"
                    className="w-full text-[#fff] van-button van-button--primary van-button--normal van-button--block"
                    style={{
                        background: !user || user.realBalance < amount || user.realBalance === 0 ? "#bbb" : ""
                    }}
                >
                    <div className="van-button__content">
                        {/**/}
                        <span className="van-button__text">
                            {t("Confirm withdrawal")}
                        </span>
                        {/**/}
                    </div>
                </button>
            </div>


            <Drawer
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
                placement={'bottom'}
                height={"auto"}
                width={"100rem"}
                zIndex={9999}
                className='security'
                closeIcon={false}
                title={
                    <div className='flex justify-between'>
                        <div className='cursor-pointer ' >
                            {t("Nhập mật khẩu rút tiền")}
                        </div>
                        <div className='cursor-pointer' onClick={() => {
                            // if (!!parseInt(configApp?.PAYMENT_MAINTENANCE))
                            //     return message.warning("System under maintenance, please try again later.")

                            setOpenConfirm(false)


                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>

                        </div>
                    </div>
                }
            >
                <div className="bg-[#1a1d2e] rounded-[20px] p-5 w-full text-white space-y-5 shadow-xl">

                    {/* Tiêu đề */}
                    <h2 className="text-center text-[22px] font-semibold">
                        {t("Xác nhận rút tiền")}
                    </h2>

                    {/* Danh sách thông tin */}
                    <div className="space-y-3 text-[16px]">

                        <ItemRow label={t("Phí rút")} value={`${configApp?.FEE_WIDTHDRAW || 0}%`} valueClass="text-yellow-400" />

                        <ItemRow label={t("Số lượng")} value={
                            `${Number(amount?.toFixed(2))} $`
                        } valueClass="text-green-400" />

                        <ItemRow label={t("Cổng thanh toán")} value={selectMethod?.nameBank} />

                        <ItemRow label={t("Thông tin")} value={
                            selectMethod?.nameBank === 'BEP20'
                                ? `${formatAddress(selectMethod?.numberBank)} (${selectMethod?.nameBank})`
                                : `${selectMethod?.numberBank} (${selectMethod?.nameBank})`
                        } />

                        <ItemRow label={t("Tổng tiền rút")} value={
                            selectMethod?.nameBank === 'BEP20'
                                ? `${Number((amount + amount * Number(configApp?.FEE_WIDTHDRAW) / 100)?.toFixed(1))} $`
                                : `${Number(((amount - amount * 0.01) * configApp?.rateUsdWithdraw)?.toFixed(0))?.toLocaleString()} đ`
                        } valueClass="text-red-500 font-bold" />

                    </div>

                    {/* Nhập mật khẩu */}
                    <div>
                        <p className="text-[16px] mb-5">{t("Nhập mật khẩu rút tiền")}</p>
                        <div className="flex justify-center">
                            <PinInput
                                length={6}
                                secret
                                secretDelay={300}
                                inputMode="numeric"
                                ref={pinRef}
                                type="numeric"
                                style={{ display: 'flex', gap: '12px' }}
                                inputStyle={{
                                    border: '2px solid #444',
                                    borderRadius: '10px',
                                    backgroundColor: '#262c47',
                                    width: '50px',
                                    height: '50px',
                                    fontSize: '20px',
                                    color: '#fff',
                                }}
                                inputFocusStyle={{ borderColor: '#cca354' }}
                                onComplete={async (value) => {
                                    handleReset()
                                    setOpenConfirm(false)
                                    await handleWithdraw(value)
                                }}
                                autoSelect
                                regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                            />
                        </div>
                    </div>
                </div>


            </Drawer >
        </>
    )
}
const ItemRow = ({ label, value, valueClass = "" }: any) => (
    <div className="flex justify-between items-center">
        <span className="text-gray-300">{label}</span>
        <span className={`text-right font-medium ${valueClass}`}>{value}</span>
    </div>
);


export default Withdraw