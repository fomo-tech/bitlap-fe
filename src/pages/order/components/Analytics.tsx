import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import requestService from "api/request";
import { useAuthApp } from "store/useAuthApp";
import { useGlobalAppStore } from "store/useGlobalApp";
import { useTranslation } from "react-i18next";

const Analytics: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation()
    const { configApp } = useGlobalAppStore()
    const { user } = useAuthApp()
    const [dataSummary, setDataSummary] = useState<any>()
    const startDate = "20/06/2025";
    const today = new Date().toLocaleDateString("vi-VN");

    const getInvestmentSummary = async () => {
        try {
            const res = await requestService.get("/tickets/investment-summary")
            if (res && res.data) {
                setDataSummary(res?.data?.data)
            }
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        if (!chartRef.current) return;

        Highcharts.chart(chartRef.current, {
            chart: {
                type: "line",
                backgroundColor: "#2a2a2a",
                height: 220,
            },
            title: { text: undefined },
            credits: { enabled: false },
            xAxis: {
                //"19/06", "20/06", "21/06", "22/06", "23/06", "24/06", "25/06", "26/06"
                categories: dataSummary?.dailyProfits?.map((i: any) => i?._id),
                labels: {
                    style: {
                        color: "#ccc",
                        fontSize: "12px",
                    },
                },
                lineColor: "#444",
                tickColor: "#444",
            },
            yAxis: {
                min: 0,
                max: Number(dataSummary?.max?.toFixed(1)),
                tickInterval: Number((dataSummary?.max / 5)?.toFixed(1)),
                title: { text: undefined },
                labels: {
                    formatter: function () {
                        // return `${this.value / 1_000_000}M`;
                        return `${this.value} $`
                    },
                    style: {
                        color: "#ccc",
                        fontSize: "12px",
                    },
                },
                gridLineColor: "#333",
            },
            tooltip: {
                valueSuffix: " USDT",
                backgroundColor: "#333",
                style: {
                    color: "#fff",
                },
            },
            legend: { enabled: false },
            plotOptions: {
                line: {
                    marker: { enabled: false },
                    lineWidth: 2,
                },
                series: {
                    color: "#3ea8ff",
                },
            },
            series: [
                {
                    // 210_000_000, 225_000_000, 238_000_000, 245_000_000,  255_000_000, 265_000_000, 272_000_000, 278_000_000,

                    type: "line",
                    name: "USDT",
                    data: dataSummary?.dailyProfits?.map((i: any) => i?.totalProfit)
                },
            ],
        });
    }, [dataSummary]);


    useEffect(() => {
        if (user)
            getInvestmentSummary()
    }, [user])

    return (
        <div className="bg-[#1e1e1e] text-white px-[24px] py-[20px] rounded-[12px] shadow-lg w-full max-w-[960px] mx-auto pb-[80px]">
            {/* Header */}
            <div className="flex justify-between items-center mb-[16px]">
                <h2 className="text-[18px] font-semibold text-[#facc15] tracking-wide uppercase">
                    {t("Biểu đồ")}
                </h2>
                <span className="text-[13px] text-[#34d399]">
                    {t("Cập nhật hàng ngày")}
                </span>
            </div>

            {/* Time Range */}
            <div className="text-[13px] text-gray-400 mb-[16px]">
                {t("Từ ngày")} <span className="text-white font-medium">{startDate}</span> -{" "}
                <span className="text-white font-medium">{today}</span>
            </div>

            {/* Chart */}
            <div
                ref={chartRef}
                className="w-full rounded-[8px] mb-[24px]"
                style={{ height: 220 }}
            />

            {/* Stats Grid */}
            <div className="grid grid-cols-2  gap-[16px] text-[14px] mb-[10px]">
                <div className="bg-[#2a2a2a] p-[16px] rounded-[8px]">
                    <p className="text-gray-400 mb-[4px]">{t("Lợi nhuận chia sẻ")}</p>
                    <p className="text-[18px] font-semibold text-[#facc15]">
                        {Number(dataSummary?.totalValueProfit?.toFixed(3))} USDT
                    </p>

                </div>

                <div className="bg-[#2a2a2a] p-[16px] rounded-[8px]">
                    <p className="text-gray-400 mb-[4px]">{t("Tổng Bitcoin trong Pool")}</p>
                    <p className="text-[18px] font-semibold text-white">
                        {Number((+configApp?.BITCOIN_VALUE)?.toFixed(5))} BTC
                    </p>

                </div>

                <div className="bg-[#2a2a2a] p-[16px] rounded-[8px]">
                    <p className="text-gray-400 mb-[4px]">{t("Tổng gói đầu tư")}</p>
                    <p className="text-[18px] font-semibold text-[#facc15]">
                        {dataSummary?.totalInvestCount}
                    </p>
                    {
                        dataSummary?.totalInvestToday > 0 &&
                        <p className="text-[12px] text-green-400 mt-[6px]">+{Number(dataSummary?.totalInvestToday)} {t("đầu tư mới")}</p>
                    }
                </div>

                <div className="bg-[#2a2a2a] p-[16px] rounded-[8px]">
                    <p className="text-gray-400 mb-[4px]">{t("Người tham gia")}</p>
                    <p className="text-[18px] font-semibold text-white">{Number(dataSummary?.totalInvest)}</p>


                </div>


            </div>
            <div className="grid grid-cols-2  gap-[16px] text-[14px]">
                <div className="bg-[#2a2a2a] p-[16px] rounded-[8px] col-span-2 md:col-span-3">
                    <p className="text-gray-400 mb-[4px]">{t("Tổng lãi đã nhận của bạn")}</p>
                    <p className="text-[18px] font-semibold text-[#facc15]">
                        {Number(dataSummary?.totalValueMyProfit?.toFixed(2))} USDT
                    </p>
                </div>
                <div className="bg-[#2a2a2a] p-[16px] rounded-[8px] col-span-2 md:col-span-3">
                    <p className="text-gray-400 mb-[4px]">{t("Tổng đầu tư")}</p>
                    <p className="text-[18px] font-semibold text-[#facc15]">
                        {Number(user?.totalbuyTicket?.toFixed(2))} USDT
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
