import React, { useState } from 'react'
import activity1 from 'assets/images/call.png'
import activity2 from 'assets/images/activity2.jpg'
import { useTranslation } from 'react-i18next'
import j123 from 'assets/images/j123.webp'
import j124 from 'assets/images/j124.webp'
import j126 from 'assets/images/j124.webp'
import { useNavigate } from 'react-router-dom'
import luckydraw from 'assets/images/interactiveadvertising_task4.png'
import j120 from 'assets/images/j120.webp'
import j127 from 'assets/images/j127.webp'
import j121 from 'assets/images/j121.webp'
import Countdown from 'react-countdown'

// import activity3 from 'assets/images/658138687ef751702967400.png'
// import rw3 from 'assets/icons/duck.png'

const getNextMonday = () => {
    const now = new Date();
    const day = now.getDay();
    const diff = (8 - day) % 7 || 7; // số ngày đến thứ 2 kế tiếp
    const nextMonday = new Date(now);
    nextMonday.setDate(now.getDate() + diff);
    nextMonday.setHours(0, 0, 0, 0);
    return nextMonday;
};

const Activity = () => {
    const { t } = useTranslation()
    const [timeLeft, setTimeLeft] = useState(getTimeLeft());
    const navigate = useNavigate()

    function getTimeLeft() {
        const now = new Date();
        const nextMonday = getNextMonday();
        const diff = nextMonday.getTime() - now.getTime();

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        return { days, hours, minutes, seconds };
    }

    const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
        if (completed) {
            return <span>Pending...</span>;
        } else {
            return (
                <span>
                    {days}d {hours}h {minutes}m {seconds}s
                </span>
            );
        }
    };


    return (
        <div className="min-h-screen bg-[#0f0e0d] text-white p-[24px] font-sans">
            {/* Tiêu đề */}
            <div className="text-[20px] font-semibold mb-[16px]">Hoạt động hàng ngày</div>

            {/* Danh sách hoạt động */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-[16px]">
                {/* Item 1 */}
                <div className="flex flex-col justify-between h-full bg-gradient-to-br from-[#e5c27a] via-[#cca354] to-[#a97f30] rounded-[20px] p-[16px] shadow-[0_4px_20px_rgba(229,194,122,0.4)] relative overflow-hidden">
                    <div>
                        <div className="text-[16px] font-semibold mb-[4px]">Điểm danh</div>
                        <div className="text-[13px] text-[#4c3a1a] mb-[12px]">Nhận thưởng mỗi ngày khi điểm danh</div>
                    </div>
                    <button
                        onClick={() => navigate('/daily-checkin')}
                        className="bg-white text-[#a97f30] hover:bg-[#f5f0e3] transition-all text-[13px] font-medium px-[12px] py-[6px] rounded-full">
                        Điểm danh
                    </button>
                </div>

                {/* Item 2 */}
                <div className="flex flex-col justify-between h-full bg-[#1f1b14] rounded-[20px] p-[16px] border border-[#2b241a] shadow-[inset_0_0_10px_rgba(0,0,0,0.3)]">
                    <div>
                        <div className="text-[16px] font-semibold mb-[4px]">Mở hộp may mắn</div>
                        <div className="text-[13px] text-gray-400 mb-[12px]">Có cơ hội nhận VNDC hoặc quà hấp dẫn</div>
                    </div>
                    <button
                        style={{
                            background: '#ccc'
                        }}
                        className="bg-[#a97f30] hover:bg-[#b88c3f] transition-all text-white text-[13px] font-medium px-[12px] py-[6px] rounded-full">
                        Mở hộp
                    </button>
                </div>

                {/* Item 3 */}
                <div className="flex flex-col justify-between h-full bg-[#1f1b14] rounded-[20px] p-[16px] border border-[#2b241a] shadow-[inset_0_0_10px_rgba(0,0,0,0.3)]">
                    <div>
                        <div className="text-[16px] font-semibold mb-[4px]">Lì xì hàng ngày</div>
                        <div className="text-[13px] text-gray-400 mb-[12px]">Nhận lì xì ngẫu nhiên mỗi ngày</div>
                    </div>
                    <button
                        style={{
                            background: '#ccc'
                        }}
                        className="bg-[#a97f30] hover:bg-[#b88c3f] transition-all text-white text-[13px] font-medium px-[12px] py-[6px] rounded-full">
                        Nhận lì xì
                    </button>
                </div>

                {/* Item 4 */}
                <div className="flex flex-col justify-between h-full bg-[#1f1b14] rounded-[20px] p-[16px] border border-[#2b241a] shadow-[inset_0_0_10px_rgba(0,0,0,0.3)]">
                    <div>
                        <div className="text-[16px] font-semibold mb-[4px]">Quay may mắn</div>
                        <div className="text-[13px] text-gray-400 mb-[12px]">Xem 1 video để nhận 1 VNDC</div>
                    </div>
                    <button
                        style={{
                            background: '#ccc'
                        }}
                        className="bg-[#a97f30] hover:bg-[#b88c3f] transition-all text-white text-[13px] font-medium px-[12px] py-[6px] rounded-full">
                        Xem ngay
                    </button>
                </div>
            </div>
        </div>

    )
}

export default Activity