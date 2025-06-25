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
            notification.error({
                message: error?.response?.data?.message,
                duration: 3,
                placement: "top"
            })
        }
        handleLoading(false)
    }
    return (
        <div className='pb-[70px] rounded-[20px]'>

            {
                !openConfirm ?
                    <>
                        <div className="bg-[#161616] p-[24px] rounded-[16px] text-white max-w-[500px] mx-auto border border-[#2c2c2c] shadow-xl">

                            {/* Quay lại */}
                            <div className="mb-[20px]">
                                <button
                                    onClick={() => {
                                        reset();
                                        navigate('/profile');
                                    }}
                                    className="flex items-center gap-[8px] text-[#facc15] hover:text-[#fde68a] font-semibold text-[16px]"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                                    </svg>
                                    {t("Quay lại")}
                                </button>
                            </div>

                            {/* Tiêu đề */}
                            <div className="text-[20px] font-bold mb-[16px] text-[#facc15]">
                                {t("Chọn số tiền")}
                            </div>

                            {/* Danh sách số tiền gợi ý */}
                            <div className="grid grid-cols-4 gap-[12px] mb-[24px]">
                                {["5", "10", "20", "50", "100", "200", "500", "1000"].map((i, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setAmount(+i)}
                                        className={clsx(
                                            "cursor-pointer text-[16px] font-semibold py-[10px] rounded-[10px] text-center border transition-all",
                                            amount === +i
                                                ? "border-[#facc15] bg-[#facc15] text-black"
                                                : "border-[#444] hover:border-[#facc15]"
                                        )}
                                    >
                                        ${i}
                                    </div>
                                ))}
                            </div>

                            {/* Nhập số tiền tuỳ chỉnh */}
                            <div className="mb-[16px]">
                                <label className="block mb-[6px] text-[14px] font-medium text-gray-300">
                                    {t("Số tiền tùy chỉnh")}
                                </label>
                                <div className="flex items-center border border-[#333] rounded-[10px] overflow-hidden">
                                    <input
                                        type="text"
                                        value={amount}
                                        onChange={(e) => setAmount(parseFloat(e.target.value || '0'))}
                                        className="flex-1 bg-transparent outline-none text-white p-[10px] text-[16px] placeholder:text-gray-500"
                                        placeholder="$0.00"
                                        inputMode="decimal"
                                    />
                                    <div className="px-[12px]  flex items-center">
                                        <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png" className="w-[20px] h-[20px]" />
                                    </div>
                                </div>
                                <div className="mt-[8px] text-[14px] text-[#facc15] font-medium">
                                    ≈ {formatNumber(amount * configApp?.rateUsd || 0)} VNĐ
                                </div>
                            </div>

                            {/* Nút xác nhận */}
                            <div>
                                <button
                                    onClick={handleDeposit}
                                    disabled={amount === 0}
                                    className={clsx(
                                        "w-full py-[12px] text-[16px] font-semibold rounded-full transition",
                                        amount === 0
                                            ? "bg-[#444] text-gray-400 cursor-not-allowed"
                                            : "bg-[#facc15] text-black hover:bg-[#fbbf24]"
                                    )}
                                >
                                    {t("Xác nhận")}
                                </button>
                            </div>
                        </div>


                    </>
                    :
                    <div className="max-w-[500px] mx-auto bg-[#161616] text-white rounded-[16px] p-[24px] shadow-xl border border-[#2c2c2c]">
                        {/* Countdown */}
                        <div className="text-center text-[24px] font-extrabold text-[#facc15] mb-[20px]">
                            <Countdown
                                date={new Date(resultDeposit?.createdAt).getTime() + 1000 * 60 * 10}
                                renderer={({ minutes, seconds, completed }) => {
                                    if (completed) reset();
                                    return `${minutes}:${seconds}`;
                                }}
                            />
                        </div>

                        {/* QR Section */}
                        <div className="bg-[#0f0f0f] rounded-[12px] p-[16px] border border-[#2c2c2c] mb-[24px] text-center">
                            {paymentMethod === "crypto" ? (
                                <div className="w-[200px] mx-auto relative">
                                    <QRCode
                                        size={160}
                                        style={{ width: "100%" }}
                                        value={`${resultDeposit?.walletDeposit}`}
                                    />
                                    <div className="absolute inset-0 flex justify-center items-center">
                                        <img
                                            src="https://img.icons8.com/?size=100&id=DEDR1BLPBScO&format=png&color=000000"
                                            className="w-[50px] opacity-90 mt-[-40px]"
                                        />
                                    </div>
                                    <div className="mt-[10px] text-[14px] text-gray-400 font-semibold">
                                        BNB Smart Chain (BEP20)
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <img
                                        className="mx-auto rounded-[8px] border"
                                        src={`https://img.vietqr.io/image/${configApp?.paymentGateWay?.banking?.code}-${configApp?.paymentGateWay?.banking?.numberBank}-compact2.png?amount=${amount * configApp?.rateUsd || 25000}&addInfo=${encodeURIComponent(resultDeposit?.note)}&accountName=${encodeURIComponent(configApp?.paymentGateWay?.banking?.holderName)}`}
                                    />
                                    <div className="text-[15px] font-semibold mt-[10px]">
                                        {configApp?.paymentGateWay?.banking?.holderName}
                                        <span className="bg-[#facc15] text-black text-[10px] px-[6px] py-[2px] rounded-full ml-[6px]">✔</span>
                                    </div>
                                    <button className="text-[12px] text-[#60a5fa] underline mt-[4px]">Tải mã QR</button>
                                </div>
                            )}
                        </div>

                        {/* Payment Info */}
                        <div className="space-y-[14px] text-[15px] font-medium">
                            <div className="flex justify-between border-b border-[#333] pb-[6px]">
                                <span>{t("Số tiền nạp")}</span>
                                <span className="text-[20px] font-bold flex items-center gap-[6px]">
                                    {amount}$ <CopyIcon value={amount} />
                                </span>
                            </div>

                            {paymentMethod === "crypto" && (
                                <>
                                    <div className="flex justify-between">
                                        <span>{t("Mạng lưới")}</span>
                                        <span className="font-bold text-[#facc15]">BNB Smart Chain</span>
                                    </div>
                                    <div className="flex items-start gap-[10px]">
                                        <span>{t("Địa chỉ nạp")}</span>
                                        <div className="text-right break-words max-w-[80%] flex items-center gap-[6px] font-bold">
                                            {resultDeposit?.walletDeposit}
                                            <CopyIcon value={resultDeposit?.walletDeposit} />
                                        </div>
                                    </div>
                                </>
                            )}

                            {paymentMethod === "banking" && (
                                <>
                                    <div className="flex justify-between">
                                        <span>{t("Số tiền thực tế")}</span>
                                        <div className="flex items-center gap-[6px] font-bold text-[#facc15]">
                                            {formatNumber(amount * configApp?.rateUsd)} VNDC
                                            <CopyIcon value={formatNumber(amount * configApp?.rateUsd)} />
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{t("Tên Ngân Hàng")}</span>
                                        <div className="flex items-center gap-[6px] font-bold">
                                            {configApp?.paymentGateWay?.banking?.nameBank}
                                            <CopyIcon value={configApp?.paymentGateWay?.banking?.nameBank} />
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{t("Số Tài Khoản")}</span>
                                        <div className="flex items-center gap-[6px] font-bold">
                                            {configApp?.paymentGateWay?.banking?.numberBank}
                                            <CopyIcon value={configApp?.paymentGateWay?.banking?.numberBank} />
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{t('Nội dung')}</span>
                                        <div className="flex items-center gap-[6px] font-extrabold text-red-500">
                                            {resultDeposit?.note}
                                            <CopyIcon value={resultDeposit?.note} />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Warning Box */}
                        {
                            paymentMethod === 'banking' ?
                                <div className="mt-[24px] bg-[#2d1e00] text-[#facc15] text-[13px] p-[12px] rounded-[8px] space-y-[8px]">

                                    <div className="flex items-start gap-[6px]">
                                        ⚠️ {t("Đúng nội dung và số tiền chuyển khoản")}
                                    </div>
                                    <div className="flex items-start gap-[6px]">
                                        ⚠️ {t("Chuyển khoản chính chủ ( ngân hàng cùng một chủ sở hữu)")}
                                    </div>
                                    <div className="flex items-start gap-[6px]">
                                        ⚠️ {t(" Vui lòng liên hệ bộ phận CSKH sau 30 phút nếu không thành công")}
                                    </div>

                                </div>
                                :
                                <div className="mt-[24px] bg-[#2d1e00] text-[#facc15] text-[13px] p-[12px] rounded-[8px] space-y-[8px]">

                                    <div className="flex items-start gap-[6px]">
                                        ⚠️ {t("Nạp tiền đúng số tiền và địa ví trên mạng BEP20")}
                                    </div>
                                    <div className="flex items-start gap-[6px]">
                                        ⚠️ {t(" Vui lòng liên hệ bộ phận CSKH sau 30 phút nếu không thành công")}
                                    </div>
                                </div>

                        }


                        {/* Button */}
                        <div className="flex justify-center mt-[30px]">
                            <button
                                onClick={reset}
                                className="flex items-center gap-[8px] px-[20px] py-[10px] bg-[#facc15] text-black rounded-full hover:bg-[#fbbf24] transition"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
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