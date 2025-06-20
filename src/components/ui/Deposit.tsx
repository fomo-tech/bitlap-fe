/* eslint-disable jsx-a11y/alt-text */
import { Drawer, message, Modal, notification } from 'antd'
import requestService from 'api/request'
import { clsx } from 'clsx'
import { formatNumber, getRecaptchaToken } from 'lib/helpers'
import React, { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useAuthApp } from 'store/useAuthApp'
import { useGlobalAppStore } from 'store/useGlobalApp'
import { useCopyToClipboard } from "@uidotdev/usehooks";
import Countdown from 'react-countdown'
import QRCode from 'react-qr-code'
// import binance from 'assets/images/withdrawal_binance_icon.png'
import { socket } from 'lib/socket'
import { useNavigate, useSearchParams } from 'react-router-dom'
import CopyIcon from 'components/elements/CopyIcon'


const Deposit = () => {
    const { t } = useTranslation()
    const { user } = useAuthApp()
    const { configApp, handleLoading, handleCallbackUser } = useGlobalAppStore()
    const [openConfirm, setOpenConfirm] = useState(false)
    const [_, copyToClipboard] = useCopyToClipboard();
    const [amount, setAmount] = useState(0)
    const [resultDeposit, seResultDeposit] = useState<any>(null)
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const paymentMethod = searchParams.get('type') || "crypto"

    const reset = () => {
        setOpenConfirm(false)
        setAmount(0)
        seResultDeposit(null)
    }

    useEffect(() => {
        if (socket) {
            socket.on("depositSuccess", (val: any) => {
                if (val?.isCheck) {
                    notification.success({
                        message: "Deposit success",
                        duration: 5
                    })
                    reset()
                    handleCallbackUser()
                }
            });
            return () => {
                socket.off("depositSuccess");
            };
        }
    }, [socket]);


    const handleDeposit = async () => {

        handleLoading(true)
        try {
            // const token = await getRecaptchaToken();
            const res = await requestService.post('/profile/deposit', {
                data: {
                    amount,
                    fiatAmount: amount * configApp?.rateUsd || 26000,
                    paymentMethod,
                    note: "MP" + Date.now(),
                    recaptchaToken: ""
                }
            })
            if (res && res.data) {
                setOpenConfirm(true)
                seResultDeposit(res?.data?.data)
            }
        } catch (error: any) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
            message.error(error?.response?.data?.message)
        }
        handleLoading(false)
    }
    return (
        <div className='pb-[70px] rounded-[20px]'>

            {
                !openConfirm ?
                    <>
                        <div data-v-0fbd6467="" className="amount-section">
                            <div className="flex items-center justify-start mb-5">
                                <button
                                    onClick={() => {
                                        reset()
                                        navigate('/profile')
                                    }}
                                    className="flex items-center gap-[6px] text-[#a47b21] hover:text-[#cca354]  font-semibold text-[16px]"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                                    </svg>
                                    {t("Quay lại")}
                                </button>
                            </div>
                            <div data-v-0fbd6467="" className="section-title">
                                {t("Chọn số tiền")}
                            </div>
                            <div className="amount-grid grid !grid-cols-4" data-v-0fbd6467="">
                                {[
                                    "5", "10", "20",
                                    "50", "100", "200",
                                    "500", "1000"
                                ].map((i, index) => (
                                    <div
                                        onClick={() => setAmount(+i)}
                                        data-v-0fbd6467="" key={index} className={clsx("amount-item flex gap-2 items-center justify-center", {
                                            "!border-[#dddd] border-[1px]": amount === +i
                                        })}>
                                        <span data-v-0fbd6467="" className="value">{i}</span>
                                        {/* <span data-v-0fbd6467="" className="currency">$</span> */}
                                    </div>
                                ))}
                            </div>


                            <div data-v-0fbd6467="" className="!border-none van-cell van-field flex flex-col">
                                {/**/}
                                <div className="van-cell__title van-field__label w-full">
                                    <label
                                        id="van-field-1-label"
                                        htmlFor="van-field-1-input"
                                        data-allow-mismatch="attribute"
                                    >
                                        {t("Số tiền tùy chỉnh")}
                                    </label>
                                    {/**/}
                                </div>
                                <div className="van-cell__value van-field__value">
                                    <div className="van-field__body">
                                        <input
                                            value={amount}
                                            onChange={(e) => setAmount(parseFloat(e.target.value || '0'))}
                                            type="text"
                                            inputMode="decimal"
                                            id="van-field-1-input"
                                            className="van-field__control van-field__control--right placeholder:text-[#cccc] text-left"
                                            placeholder=""

                                        />
                                        {/**/}
                                        <div className="van-field__right-icon">
                                            <div data-v-0fbd6467="" className="right-content">
                                                <span data-v-0fbd6467="" className="currency-label">
                                                    <img src={"https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"} width={20} />
                                                </span>
                                            </div>
                                        </div>
                                        {/**/}
                                    </div>
                                    {/**/}
                                    {/**/}
                                </div>
                                {/**/}
                                {/**/}
                                = {formatNumber(amount * configApp?.rateUsd || 0)} vnđ
                            </div>
                        </div>


                        <div data-v-0fbd6467="" className="submit-section">
                            <button
                                disabled={amount === 0}
                                onClick={handleDeposit}
                                data-v-0fbd6467=""
                                type="button"
                                className="w-full text-[#fff] van-button van-button--primary van-button--normal van-button--block"
                            >
                                <div className="van-button__content">
                                    {/**/}
                                    <span className="van-button__text">
                                        {t("Xác nhận")}
                                    </span>
                                    {/**/}
                                </div>
                            </button>
                        </div>
                        {/* <div data-v-0fbd6467="" className="notice-section">
                            <div data-v-0fbd6467="" className="section-title">
                                {t("Mô tả giá trị lưu trữ")}
                            </div>
                            <div data-v-0fbd6467="" className="notice-content">
                                {t("1: Do những biến động gần đây của mạng lưới ngân hàng,")}.
                                {t("Nếu thanh toán của bạn không thành công, vui lòng thử")}
                                {t("Liên hệ lại với chúng tôi trong vòng 5 phút")}
                                {t("Báo cáo vấn đề cho bộ phận Dịch vụ khách hàng.")}
                                <br />
                                {t("2: Thời gian thanh toán là 5 phút")}
                                <br />
                                {t("3: Số tiền gửi tối thiểu là 10$")}

                            </div>
                        </div> */}
                    </>
                    :
                    <div className="px-[40px] py-[30px] bg-white rounded-2xl shadow-xl max-w-[900px] mx-auto">
                        <div className="text-center text-[40px] font-extrabold text-gray-800 mb-[30px]">
                            ⏳ <Countdown
                                date={new Date(resultDeposit?.createdAt)?.getTime() + 1000 * 60 * 30}
                                renderer={({ minutes, seconds, completed }) => {
                                    if (completed) reset();
                                    return `${minutes}:${seconds}`;
                                }}
                            />
                        </div>

                        <div className="bg-gray-50 rounded-xl p-[20px] mb-[30px] shadow-sm text-center">
                            {paymentMethod === "crypto" ? (
                                <div className="w-[200px] mx-auto relative">
                                    <QRCode
                                        size={150}
                                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                        value={`${configApp?.paymentGateWay?.crypto?.BEP20}`}
                                        viewBox="0 0 150 150"
                                    />
                                    <div className="absolute inset-0 flex justify-center items-center">
                                        <img
                                            src="https://img.icons8.com/?size=100&id=DEDR1BLPBScO&format=png&color=000000"
                                            className="w-[50px] opacity-80"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <img
                                    className="mx-auto max-w-full rounded-lg border"
                                    src={`https://img.vietqr.io/image/${configApp?.paymentGateWay?.banking?.code}-${configApp?.paymentGateWay?.banking?.numberBank}-compact2.png?amount=${amount * configApp?.rateUsd || 25000}&addInfo=${encodeURIComponent(resultDeposit?.note)}&accountName=${encodeURIComponent(configApp?.paymentGateWay?.banking?.holderName)}`}
                                />
                            )}
                        </div>

                        <div className="space-y-[15px] text-[18px] text-gray-700 font-semibold">
                            <div className="flex justify-between items-center border-b pb-[10px]">
                                <span>{t("Số Tiền Nạp")}</span>
                                <span className="text-[26px] font-bold text-black flex items-center gap-[8px]">
                                    {amount}$ <CopyIcon value={amount} />
                                </span>
                            </div>

                            {paymentMethod === "crypto" && (
                                <>
                                    <div className="flex justify-between items-center">
                                        <span>{t("Mạng lưới")}</span>
                                        <span className="text-[24px] font-bold">BNB Smart Chain (BEP20)</span>
                                    </div>
                                    <div className="flex justify-between items-start gap-[10px]">
                                        <span>{t("Địa chỉ nạp")}</span>
                                        <div className="text-right max-w-[80%] break-words flex items-center gap-[10px] text-[18px] font-bold"
                                            style={{
                                                wordBreak: 'break-word'
                                            }}
                                        >
                                            {configApp?.paymentGateWay?.crypto?.BEP20}
                                            <CopyIcon value={configApp?.paymentGateWay?.crypto?.BEP20} />
                                        </div>
                                    </div>
                                </>
                            )}

                            {paymentMethod === "banking" && (
                                <>
                                    <div className="flex justify-between items-center">
                                        <span>{t("Số tiền thực tế")}</span>
                                        <div className="flex items-center gap-[8px] font-bold text-[22px] text-black">
                                            {formatNumber(amount * configApp?.rateUsd)}
                                            <CopyIcon value={formatNumber(amount * configApp?.rateUsd)} />
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>{t("Tên Ngân Hàng")}</span>
                                        <div className="flex items-center gap-[8px] font-bold text-[22px] text-black">
                                            {configApp?.paymentGateWay?.banking?.nameBank}
                                            <CopyIcon value={configApp?.paymentGateWay?.banking?.nameBank} />
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>{t("Số Tài Khoản")}</span>
                                        <div className="flex items-center gap-[8px] font-bold text-[22px] text-black">
                                            {configApp?.paymentGateWay?.banking?.numberBank}
                                            <CopyIcon value={configApp?.paymentGateWay?.banking?.numberBank} />
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>{t("Nội dung")}</span>
                                        <div className="flex items-center gap-[8px] font-extrabold text-[22px] text-red-600">
                                            {resultDeposit?.note}
                                            <CopyIcon value={resultDeposit?.note} />
                                        </div>
                                    </div>
                                    <p className="text-[16px] mt-[10px] text-gray-600 leading-relaxed">
                                        <strong className="text-red-600">{t("Lưu ý")}:</strong> {t("Để giao dịch được xử lý nhanh chóng, vui lòng điền đầy đủ và chính xác nội dung chuyển khoản theo hướng dẫn")}
                                    </p>
                                </>
                            )}
                        </div>

                        <div className="flex justify-center mt-[40px]">
                            <button
                                onClick={reset}
                                className="flex items-center gap-[8px] px-[20px] py-[10px] bg-[#1d4ed8] text-white rounded-full hover:bg-[#1e40af] transition"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-[20px]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                                </svg>
                                {t("Quay lại")}
                            </button>
                        </div>
                    </div>


            }

        </div>
    )
}


export default Deposit