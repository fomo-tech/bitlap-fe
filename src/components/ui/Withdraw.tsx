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

            <div className="bg-[#161616] p-[24px] rounded-[16px] text-white max-w-[500px] mx-auto border border-[#2c2c2c] shadow-xl">

                {/* Nút quay lại */}
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

                {/* Nhập số tiền */}
                <div className="mb-[24px]">
                    <label className="block mb-[8px] text-[15px] text-gray-300 font-medium">
                        {t("Withdraw amount")}
                    </label>
                    <div className="flex items-center border border-[#333] rounded-[10px] overflow-hidden">
                        <input
                            type="text"
                            inputMode="decimal"
                            value={amount}
                            onChange={(e) => setAmount(parseFloat(e.target.value || "0"))}
                            className="flex-1 bg-transparent p-[10px] text-white placeholder:text-gray-500 outline-none"
                            placeholder="0"
                        />
                        <button
                            onClick={() => setAmount(user?.realBalance || 0)}
                            className="px-[12px] text-[14px] text-[#facc15] hover:text-[#fde68a] font-semibold"
                        >
                            All
                        </button>
                    </div>
                </div>

                {/* Danh sách tài khoản ngân hàng */}
                <div className="mb-[24px]">
                    <div className="flex justify-between items-center mb-[10px]">
                        <span className="text-[15px] font-semibold text-[#facc15]">
                            {t("Select Bank Account")}
                        </span>
                        <button
                            onClick={() => setTimeout(() => setAddMethod(true), 150)}
                            className="text-[14px] text-[#facc15] hover:text-[#fde68a] font-medium"
                        >
                            + {t("Add Bank")}
                        </button>
                    </div>

                    {/* Danh sách bank */}
                    <div className="space-y-[12px]">
                        {user &&
                            user?.bankList?.length > 0 ? user.bankList.map((i, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setSelectMethod(i)}
                                    className={clsx(
                                        "flex items-center p-[12px] rounded-[10px] cursor-pointer border transition-all",
                                        selectMethod?.numberBank === i?.numberBank && selectMethod?.nameBank === i?.nameBank
                                            ? "border-[#facc15] bg-[#1f1f1f]"
                                            : "border-[#333] hover:border-[#555]"
                                    )}
                                >
                                    <img
                                        src="https://img.icons8.com/?size=100&id=209&format=png&color=ffffff"
                                        alt=""
                                        className="w-[30px] h-[30px] mr-[12px]"
                                    />
                                    <div className="text-[14px]">
                                        {
                                            i.nameBank === "BEP20"
                                                ? <span className="text-gray-200">{formatAddress(i.numberBank)} ({i.nameBank})</span>
                                                : <span className="text-gray-200">{i.numberBank} ({i.nameBank})</span>
                                        }
                                    </div>
                                </div>
                            )) : (
                            <div className="text-gray-500 text-[14px]">{t("No bank accounts added.")}</div>
                        )}
                    </div>
                </div>

                {/* Nút xác nhận */}
                <button
                    onClick={() => {
                        if (!selectMethod) return message.warning(t("Bạn chưa cài đặt thanh toán"));
                        setOpenConfirm(true);
                    }}
                    disabled={!user || user.realBalance < amount || user.realBalance === 0}
                    className={clsx(
                        "w-full py-[12px] text-[16px] font-semibold rounded-full transition",
                        (!user || user.realBalance < amount || user.realBalance === 0)
                            ? "bg-[#444] text-gray-400 cursor-not-allowed"
                            : "bg-[#facc15] text-black hover:bg-[#fbbf24]"
                    )}
                >
                    {t("Confirm withdrawal")}
                </button>
                <div className="mt-[24px] bg-[#2d1e00] text-[#facc15] text-[13px] p-[12px] rounded-[8px] space-y-[8px]">

                    <div className="flex items-start gap-[6px]">
                        ⚠️ {t("Số tiền rút tối thiểu 5$. Phí rút hiện tại 5%")}
                    </div>

                    <div className="flex items-start gap-[6px]">
                        ⚠️ {t("Điều kiện rút tiền khi có lịch sử mua gói đầu tư trong tuần cả còn hạn hay hết hạn hoặc có volume giao dịch trên 5$")}
                    </div>
                    <div className="flex items-start gap-[6px]">
                        ⚠️ {t("Thời gian xử lý rút tiền: từ 9:00 AM đến 5:00 PM, từ Thứ Hai đến Thứ Bảy.Thời gian xử lý trung bình: 1–2 giờ.")}
                    </div>
                </div>
            </div>
            <Drawer
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
                className='confirm-withdraw'
                placement="bottom"
                height="auto"
                zIndex={9999}
                closeIcon={false}
                bodyStyle={{
                    background: "#121212",
                    padding: 0,

                    overflow: "hidden" // giúp nội dung không tràn bo góc
                }}
                headerStyle={{
                    backgroundColor: "#1a1a1a",
                    borderBottom: "1px solid #2c2c2c",
                    borderTopLeftRadius: "24px",
                    borderTopRightRadius: "24px"
                }}
                title={
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '20px 24px 0',
                        fontSize: '18px',
                        fontWeight: 600,
                        color: '#facc15'
                    }}>
                        <span>{t("Nhập mật khẩu rút tiền")}</span>
                        <span onClick={() => setOpenConfirm(false)} style={{ cursor: 'pointer' }}>✕</span>
                    </div>
                }
            >
                <div style={{
                    backgroundColor: '#121212',
                    borderRadius: '16px',
                    padding: '24px',
                    margin: '12px',
                    color: '#f4f4f4',
                    fontSize: '16px',
                    border: '1px solid #2c2c2c',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                }}>
                    <div style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        textAlign: 'center',
                        color: '#facc15',
                        marginBottom: '24px'
                    }}>
                        {t("Xác nhận rút tiền")}
                    </div>

                    {/* Bảng thông tin */}
                    <div style={{
                        backgroundColor: '#1b1b1b',
                        border: '1px solid #2e2e2e',
                        borderRadius: '12px',
                        padding: '20px',
                        marginBottom: '24px'
                    }}>
                        <InfoRow label={t("Số tiền rút")} value={`${amount?.toFixed(2)} $`} valueColor="#22c55e" />
                        <InfoRow label={t("Phí giao dịch")} value={`${configApp?.FEE_WIDTHDRAW || 0}%`} valueColor="#facc15" />
                        <InfoRow label="Payment Gateway" value={selectMethod?.nameBank} />
                        <InfoRow
                            label={t("Thông tin nhận")}
                            value={
                                selectMethod?.nameBank === 'BEP20'
                                    ? `${formatAddress(selectMethod?.numberBank)} (${selectMethod?.nameBank})`
                                    : `${selectMethod?.numberBank} (${selectMethod?.nameBank})`
                            }
                        />
                        <InfoRow
                            label={t("Tổng tiền phải nhận")}
                            value={
                                selectMethod?.nameBank === 'BEP20'
                                    ? `${(amount + amount * Number(configApp?.FEE_WIDTHDRAW) / 100).toFixed(1)} $`
                                    : `${((amount - amount * 0.01) * configApp?.rateUsdWithdraw).toFixed(0)} đ`
                            }
                            valueColor="#ef4444"
                            bold
                        />
                    </div>

                    {/* Nhập mã PIN */}
                    <div>
                        <div style={{ fontSize: '16px', marginBottom: '12px', color: '#facc15' }}>Enter withdrawal password</div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                            <PinInput
                                length={6}
                                secret
                                secretDelay={300}
                                inputMode="numeric"
                                ref={pinRef}
                                type="numeric"
                                inputStyle={{
                                    border: '2px solid #333',
                                    borderRadius: '10px',
                                    backgroundColor: '#1b1b1b',
                                    width: '40px',
                                    height: '40px',
                                    fontSize: '20px',
                                    color: '#facc15',
                                    fontWeight: '600'
                                }}
                                inputFocusStyle={{ borderColor: '#facc15' }}
                                onComplete={async (value) => {
                                    handleReset()
                                    setOpenConfirm(false)
                                    await handleWithdraw(value)
                                }}
                                autoSelect
                            />
                        </div>
                    </div>
                </div>
            </Drawer>

        </>
    )
}
const InfoRow = ({ label, value, valueColor = '#ccc', bold = false }: any) => (
    <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '12px',
        color: '#ccc'
    }}>
        <span>{label}</span>
        <span style={{
            color: valueColor,
            fontWeight: bold ? '700' : '500'
        }}>{value}</span>
    </div>
);



export default Withdraw