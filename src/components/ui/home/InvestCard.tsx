import React, { useState } from 'react'
import from_wood from 'assets/images/farm_wooden.png'
import bg_4 from 'assets/new_img/bg-4.png'
import dolar from 'assets/images/dollar.png'
import { useTranslation } from 'react-i18next'
import { Drawer, Modal, notification } from 'antd'
import { useGlobalAppStore } from 'store/useGlobalApp'
import requestService from 'api/request'
import useBreakpoint from 'hooks/useBreakpoint'
import guide_icon from 'assets/images/me_feedback_detailed_icon.png'
import info_icon from 'assets/images/home_tx_icon.png'
import TextRentFarm from 'locale/component/TextRentFarm'
import { useNavigate } from 'react-router-dom'
import close_icon from 'assets/images/home_dialog_close.png'
import clsx from 'clsx'
import { useAuthApp } from 'store/useAuthApp'
const InvestCard = ({ item }: { item: any }) => {
    const { t } = useTranslation()
    const breakpoint = useBreakpoint()
    const [openConfirm, setOpenConfirm] = useState<any>(false)
    const { loading, handleLoading, handleCallbackUser } = useGlobalAppStore()
    const { user } = useAuthApp()
    const navigate = useNavigate()

    const handleBuyTicket = async (ticketId: string) => {
        handleLoading(true)
        try {
            const res = await requestService.post('/tickets', {
                data: {
                    ticketId
                }
            })
            if (res && res.data) {
                notification.success({
                    message: res.data?.message,
                    duration: 3
                })
                handleCallbackUser()
                setOpenConfirm(false)
                navigate('/order')
            }
        } catch (error: any) {
            notification.error({
                message: error?.response?.data?.message,
                duration: 3
            })
            setOpenConfirm(false)
        }
        handleLoading(false)
    }

    return (
        <>
            <div
                className="package-card text-center relative p-6 rounded-xl shadow-lg border border-[#e0b054]/30 bg-cover bg-center overflow-hidden"
                style={{ backgroundImage: `url(${bg_4})` }}
            >
                {/* Overlay nhẹ để làm rõ chữ */}
                <div className="absolute inset-0 bg-black/40 rounded-xl z-0" />

                <div className="relative z-10">
                    <h4 className="text-[#e0b054] text-[25px] font-extrabold mb-[15px] drop-shadow">
                        {item?.name}
                    </h4>

                    <ul className="text-white text-[20px] space-y-[8px] font-medium">
                        <li>{t("Return")} <span className="text-[#a2ff86] font-semibold">{item?.incomePerDay} $ </span>
                            / {t("Every day")}
                        </li>

                        <li>{t("For")} <span className="font-semibold text-[#ffd700]">{item?.earningDay} {t("ngày")}</span></li>
                        <li>
                            {t("Total Receive")}{" "}
                            <span className="inline-block bg-[#e0b054] text-black text-[15px] font-semibold rounded-full px-5 py-[2px] shadow">
                                {Number((item?.incomePerDay * item?.earningDay)?.toFixed(3))} $
                            </span>
                        </li>
                    </ul>

                    {user?.totalbuyTicket === 0 ? (
                        <div className="mt-5 drop-shadow text-center">
                            <div className="text-[24px] text-gray-400 line-through">
                                ${item?.price.toFixed(2)}
                            </div>
                            <div className="text-[#e0b054] text-[40px] font-[900]">
                                ${Number((item?.price * 0.9).toFixed(2))}
                            </div>
                            <div className="text-[14px] text-green-400 font-semibold mt-1">
                                {t("Giảm 10% cho lần đầu tiên")}
                            </div>
                        </div>
                    ) : (
                        <div className="mt-5 font-[900] text-[#e0b054] text-[40px] drop-shadow">
                            ${item?.price.toFixed(2)}
                        </div>
                    )}

                    <button
                        onClick={() => setOpenConfirm(true)}
                        className="w-full mt-5 bg-[#e0b054] hover:bg-[#f1cc60] text-black font-bold py-[15px] rounded-[15px] transition-all shadow-md"
                    >
                        Invest Now
                    </button>
                </div>
            </div>


            <Drawer
                className="modal-confirm-buy"
                placement="bottom"
                height="auto"
                closable
                onClose={() => setOpenConfirm(false)}
                zIndex={9999}
                closeIcon={
                    <div className="hover:scale-110 transition-transform duration-150">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24" strokeWidth={2}
                            stroke="white" className="w-5 h-5"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                }
                bodyStyle={{
                    background: "linear-gradient(145deg, #121212, #1e1e1e)",
                    padding: 0,
                }}
                headerStyle={{
                    borderBottom: "1px solid #2d2d2d",
                    background: "#111",
                    color: "#FFD700",
                    textAlign: "center",
                    padding: "16px 24px",
                }}
                title={
                    <div className="text-center">
                        <h2 className="text-[28px] font-extrabold text-[#FFD700] uppercase tracking-wide relative inline-block">
                            {t("Xác nhận")}
                            <span className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-[60%] h-[2px] bg-[#b98a00]" />
                        </h2>
                    </div>
                }
                open={openConfirm}
            >
                <div className="w-full flex justify-center">
                    <div className="w-full max-w-[420px] px-24 py-20 bg-[#1f1f1f] text-white rounded-[20px] border border-[#FFD700]/30 shadow-[0_0_12px_rgba(255,215,0,0.1)]">
                        <p className="text-center text-[16px] leading-[26px] text-[#f5f5dc] px-[16px] font-normal">
                            {t("Bạn xác nhận muốn đầu tư")}{" "}
                            <span className="text-[#d6a354] font-semibold">
                                {
                                    user?.totalbuyTicket === 0 ?
                                        Number((item?.price * 0.9).toFixed(2)) :
                                        item?.price}$
                            </span>{" "}
                            {t("trong")}{" "}
                            <span className="text-[#e4c177] font-semibold">
                                {item?.earningDay} {t("ngày")}
                            </span>
                            ?
                        </p>

                        <div className="mt-20">
                            <button
                                onClick={() => handleBuyTicket(item)}
                                disabled={loading}
                                className={clsx(
                                    "w-full text-center text-[16px] font-semibold py-12 rounded-[20px] transition-all duration-300",
                                    "bg-gradient-to-r from-[#f3d066] to-[#e6c200] text-[#1f1500] shadow-md",
                                    "hover:brightness-105 hover:shadow-lg",
                                    "disabled:opacity-60 disabled:cursor-not-allowed"
                                )}
                            >
                                {t("Xác nhận")}
                            </button>
                        </div>
                    </div>
                </div>
            </Drawer>
        </>

    )
}

export default InvestCard