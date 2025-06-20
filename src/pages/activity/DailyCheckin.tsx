import React, { useState } from 'react'
import coin_icon from 'assets/images/tu.webp'
import { useNavigate } from 'react-router-dom'
import { message, Modal, notification } from 'antd'
import { useTranslation } from 'react-i18next'
import requestService from 'api/request'
import { useGlobalAppStore } from 'store/useGlobalApp'
import { useAuthApp } from 'store/useAuthApp'

const DailyCheckin = () => {
    const { t, i18n } = useTranslation()
    const navigate = useNavigate()
    const [openRule, setOpenRule] = useState(false)
    const { configApp, handleCallbackUser } = useGlobalAppStore()
    const { user } = useAuthApp()

    const handleCheckin = async () => {
        if (user?.isCheckinToday) return
        try {
            const res = await requestService.post('/checkin')
            if (res && res.data) {
                handleCallbackUser()
            }
        } catch (error: any) {
            notification.error({
                message: error?.response?.data?.message,
                duration: 3
            })
            // message.error(error?.response?.data?.message)
        }
    }
    const statusClass = {
        done: "bg-gradient-to-b from-[#f2d79b] to-[#a97f30] text-[#1a1300]",
        today: "bg-[#ffcc00] text-[#000] ring-2 ring-[#fff] shadow-md animate-pulse",
        missed: "bg-[#3a2f1d] text-[#999]",
        locked: "bg-[#1e1a14] text-[#555]",
    } as const;

    type CheckinStatus = keyof typeof statusClass;

    const checkinDays: { day: number; status: CheckinStatus }[] = [
        { day: 1, status: "done" },
        { day: 2, status: "done" },
        { day: 3, status: "today" },
        { day: 4, status: "locked" },
        { day: 5, status: "locked" },
        { day: 6, status: "locked" },
        { day: 7, status: "locked" },
    ];

    return (
        <div className="bg-[#0f0e0d] text-white px-[24px] py-[32px] min-h-screen">
            {/* Lịch tuần */}
            <div className="bg-[#0f0e0d] text-white p-[24px]">
                <div className="flex justify-between items-center mb-[24px]">
                    {checkinDays.map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                            <span className="text-[12px] mb-[8px]">Ngày {item.day}</span>
                            <div
                                className={`w-[48px] h-[48px] rounded-full flex items-center justify-center text-[14px] font-semibold ${statusClass[item.status]}`}
                            >
                                {item.day}
                            </div>
                        </div>
                    ))}
                </div>


            </div>

            {/* Hôm nay */}
            <div className="mb-[32px]">
                <h2 className="text-[20px] font-semibold mb-[8px] text-[#f2d79b]">Hôm nay</h2>
                <p className="text-[12px] text-gray-400">
                    Hoàn thành hoạt động hàng ngày của bạn
                </p>
            </div>

            {/* Nút nhận thưởng */}
            <button className="w-full bg-gradient-to-b from-[#f2d79b] to-[#a97f30] text-[#1a1300] py-[12px] px-[16px] rounded-[12px] mb-[32px] text-[16px] font-semibold shadow-md transition active:scale-[0.98]
            z-[10] relative
            ">
                Nhận thưởng
            </button>
            {/* Star background */}
            <div className="bg-animation">
                <div id="stars" />
                <div id="stars2" />
                <div id="stars3" />
                <div id="stars4" />
            </div>
            {/* Thống kê */}
            <div className="grid grid-cols-2 gap-[16px]">
                <div className="bg-[#1f1b14] p-[16px] rounded-[16px]">
                    <p className="text-[12px] text-gray-400 mb-[8px]">Tổng kết hàng tháng</p>
                    <p className="text-[20px] font-bold text-[#f2d79b]">Sat: 24</p>
                    <p className="text-[12px] text-gray-400 mt-[8px]">Ngày đạt thứ hạng</p>
                </div>
                <div className="bg-[#1f1b14] p-[16px] rounded-[16px] flex items-center justify-center text-center">
                    <div>
                        <p className="text-[12px] text-gray-400 mb-[8px]">Chuỗi hoạt động</p>
                        <p className="text-[16px] font-semibold text-[#e5c27a]">Thưởng 7 ngày liên tiếp</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default DailyCheckin