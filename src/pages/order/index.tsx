import requestService from 'api/request'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
// import bg_order from 'assets/images/d2a7ec6d39f2a709844f1b935c241855cd3ce0.jpg'

import { useNavigate } from 'react-router-dom'
import { useGlobalAppStore } from 'store/useGlobalApp'
import { socket } from 'lib/socket'
import { useAuthApp } from 'store/useAuthApp'
import Farming from './components/Farming'
import clsx from 'clsx'
import Analytics from './components/Analytics'

const Order = () => {
    const [orders, setOrders] = useState([])
    const { handleLoading, loading } = useGlobalAppStore()
    const { user } = useAuthApp()
    const navigate = useNavigate()
    const [isCallBack, setIsCallBack] = useState(false)

    const [activeTab, setActiveTab] = useState<'farming' | 'analytics'>('farming');

    // const [openRecord, setOpenRecord] = useState(false)
    const { t, i18n } = useTranslation()

    const getOrders = async () => {
        handleLoading(true)
        try {
            const res = await requestService.get('/tickets/orders')
            if (res && res.data) {
                setOrders(res.data?.data)
            }
        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        }
        handleLoading(false)
    }

    useEffect(() => {
        getOrders();
    }, [isCallBack]);


    useEffect(() => {
        const interval = setInterval(() => {
            socket.emit("getOrders", { userId: user?._id });
        }, 1000); // 3 giây 1 lần hoặc tùy bạn

        socket.on("emitOrders", (data) => {

            setOrders(data);
        });

        return () => {
            clearInterval(interval);
            socket.off("emitOrders");
        };
    }, [user?._id]);

    const totalToday = orders?.reduce((acc, order: any) => acc + Number(order?.currentIncome || 0), 0);


    return (
        <div className="min-h-screen bg-[#0f0e0d] text-white p-[24px] font-sans pb-[80px]">
            <div className="bg-animation">
                <div id="stars" />
                <div id="stars2" />
                <div id="stars3" />
                <div id="stars4" />
            </div>
            {/* Tổng quan lãi hôm nay */}
            <div className="bg-gradient-to-br from-[#e5c27a] via-[#cca354] to-[#a97f30] rounded-[30px] p-[24px] shadow-[0_4px_20px_rgba(229,194,122,0.4)] relative overflow-hidden">
                {/* Glow light */}
                <div className="absolute w-[120px] h-[120px] bg-white opacity-10 rounded-full top-[-40px] right-[-40px] blur-[40px]"></div>

                <div className="text-[14px] font-medium mb-[8px] drop-shadow-sm">
                    {t("Lãi hôm nay (dự kiến)")}
                </div>
                <div className="text-[48px] font-bold leading-[1.2] mb-[8px] drop-shadow">
                    +{Number(totalToday?.toFixed(3))} <span className="text-[16px] font-normal">USDT</span>
                </div>
                <div className="text-[12px] text-[#4c3a1a] leading-[20px] max-w-[90%]">
                    {t("Lãi sẽ tự động trả về Ví chính 24h từ lúc đầu tư hàng ngày")}.
                </div>
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-[12px] mt-[24px] mb-[16px] z-[10] relative">
                <button
                    onClick={() => setActiveTab('farming')}
                    className={clsx(
                        "px-[20px] py-[10px] rounded-full text-[15px] font-semibold transition-all duration-200 shadow-sm",
                        activeTab === 'farming'
                            ? "bg-[#a97f30] text-white hover:bg-[#b88c3f]"
                            : "bg-transparent border border-[#a97f30] text-[#a97f30] hover:bg-[#a97f30] hover:text-white"
                    )}
                >
                    {t("Đang nhận lãi")}
                </button>

                <button
                    onClick={() => setActiveTab('analytics')}
                    className={clsx(
                        "px-[20px] py-[10px] rounded-full text-[15px] font-semibold transition-all duration-200 shadow-sm",
                        activeTab === 'analytics'
                            ? "bg-[#a97f30] text-white hover:bg-[#b88c3f]"
                            : "bg-transparent border border-[#a97f30] text-[#a97f30] hover:bg-[#a97f30] hover:text-white"
                    )}
                >
                    {t("Thống kê đầu tư")}
                </button>
            </div>


            {/* Gói đầu tư */}
            {
                activeTab === 'farming' && <Farming
                    orders={orders}
                />
            }
            {
                activeTab === 'analytics' && <Analytics />
            }

        </div>

    )
}

export default Order