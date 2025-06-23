import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { useTranslation } from 'react-i18next';
import requestService from 'api/request';
import { useGlobalAppStore } from 'store/useGlobalApp';
import { useAuthApp } from 'store/useAuthApp';
import { clsx } from 'clsx';

const DailyCheckin = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { configApp, handleCallbackUser } = useGlobalAppStore();
    const { user } = useAuthApp();

    const handleCheckin = async () => {
        if (user?.isCheckinToday) return;
        try {
            setLoading(true);
            const res = await requestService.post('/checkin');
            if (res && res.data) {
                handleCallbackUser();
            }
        } catch (error: any) {
            notification.error({
                message: error?.response?.data?.message || 'Có lỗi xảy ra!',
                duration: 3,
            });
        } finally {
            setLoading(false);
        }
    };

    const statusClass = {
        done: "bg-gradient-to-b from-[#f2d79b] to-[#a97f30] text-[#1a1300]",
        today: "bg-[#ffcc00] text-[#000] ring-2 ring-[#fff] shadow-md animate-pulse",
        missed: "bg-[#3a2f1d] text-[#999]",
        locked: "bg-[#1e1a14] text-[#555]",
    } as const;

    type CheckinStatus = keyof typeof statusClass;
    const rewardList = configApp?.checkIn || [0.05, 0.05, 0.1, 0.2, 0.2, 0.4, 0.5];

    function generateCheckinDays(checkInTotal: number, isCheckedToday: boolean): { day: number; status: CheckinStatus }[] {
        const totalDays = 7;
        const result: { day: number; status: CheckinStatus }[] = [];

        for (let i = 1; i <= totalDays; i++) {
            let status: CheckinStatus;

            if (i <= checkInTotal) {
                status = "done";
            } else if (i === checkInTotal + 1 && !isCheckedToday) {
                status = "today";
            } else {
                status = "locked";
            }

            result.push({ day: i, status });
        }

        return result;
    }

    const checkInTotal = Number(user?.checkInToday) || 0;
    const isCheckedToday = !!user?.isCheckinToday;
    const checkinDays = generateCheckinDays(checkInTotal, isCheckedToday);

    return (
        <div className="bg-[#0f0e0d] text-white px-[24px] py-[32px] min-h-screen">
            {/* Lịch checkin */}
            <div className="p-[16px]">
                <div className="max-w-[500px] mx-auto">
                    <div className="grid grid-cols-7 gap-[6px]">
                        {checkinDays.map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                                <span className="text-[10px] text-[#aaa] mb-[2px] whitespace-nowrap">
                                    {t("Ngày")} {item.day}
                                </span>
                                <div
                                    className={clsx(
                                        "w-[40px] h-[40px] rounded-full flex items-center justify-center text-[13px] font-semibold transition-all duration-200",
                                        statusClass[item.status]
                                    )}
                                >
                                    {item.day}
                                </div>
                                <div className="mt-[4px] text-[10px] text-[#e0b054] font-medium whitespace-nowrap">
                                    +{rewardList[idx]}$
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hôm nay */}
            <div className="mb-[32px]">
                <h2 className="text-[20px] font-semibold mb-[8px] text-[#f2d79b]">
                    {t("Hôm nay")}
                </h2>
                <p className="text-[12px] text-gray-400">
                    {t('Hoàn thành hoạt động hàng ngày của bạn')}
                </p>
            </div>

            {/* Nút nhận thưởng */}
            <button
                className={clsx(
                    "w-full text-[#1a1300] py-[12px] px-[16px] rounded-[12px] mb-[32px] text-[16px] font-semibold shadow-md transition active:scale-[0.98] z-[10] relative",
                    {
                        "!bg-[#ccc]": isCheckedToday,
                        "bg-gradient-to-b from-[#f2d79b] to-[#a97f30]": !isCheckedToday,
                    }
                )}
                disabled={isCheckedToday || loading}
                onClick={handleCheckin}
            >
                {t("Nhận")}
            </button>
            <div className="bg-animation">
                <div id="stars" />
                <div id="stars2" />
                <div id="stars3" />
                <div id="stars4" />
            </div>
            {/* Thống kê */}
            <div className="grid grid-cols-2 gap-[16px]">
                <div className="bg-[#1f1b14] p-[16px] rounded-[16px]">
                    <p className="text-[12px] text-gray-400 mb-[8px]">
                        {t("Tổng kết hàng tháng")}
                    </p>
                    <p className="text-[20px] font-bold text-[#f2d79b]">{user?.checkinsThisMonth}</p>
                    <p className="text-[12px] text-gray-400 mt-[8px]">
                        {t("Ngày đăng nhập")}
                    </p>
                </div>
                <div className="bg-[#1f1b14] p-[16px] rounded-[16px] flex items-center justify-center text-center">
                    <div>
                        <p className="text-[12px] text-gray-400 mb-[8px]">
                            {t("Chuỗi hoạt động tháng")}
                        </p>
                        <p className="text-[16px] font-semibold text-[#e5c27a]">
                            {t("Thưởng 30 ngày liên tiếp")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailyCheckin;
