import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import BetTransactionList from "./BetTransactionList";
import Highcharts from "highcharts";

interface OverviewProps {
    totalValue: number;
    dataChart: any;
    currency: string;
    todayChange: number;
    thisMonthPnl: number;
    prevPnl: number;
    percentLastMonth: number;
    percentToday: number;
    percentThisMonth: number;
    onRangeChange?: (range: string) => void;
}

export const PnlOverview: React.FC<OverviewProps> = ({
    totalValue,
    currency,
    todayChange,
    thisMonthPnl,
    prevPnl,
    percentLastMonth,
    percentToday,
    percentThisMonth,
    onRangeChange,
    dataChart
}) => {
    const [range, setRange] = useState<"1W" | "1M" | "3M" | "6M" | "today">("today");
    const chartRef = useRef<HTMLDivElement>(null);
    const ranges = [
        { key: "today", label: "Hôm nay" },
        { key: "1w", label: "1 Tuần" },
        { key: "1m", label: "1 Tháng" },
        { key: "3m", label: "3 Tháng" },
        { key: "6m", label: "6 Tháng" },

    ];

    const formatNumber = (n: number) =>
        n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const colorFor = (n: number) => (n >= 0 ? "text-[#4CAF50]" : "text-[#FF3B30]");

    const handleClick = (key: typeof range) => {
        setRange(key);
        onRangeChange && onRangeChange(key);
    };

    const categories = dataChart?.chart?.map((i: any) => i?.x) || [];
    const total = categories.length;
    const step = Math.floor(total / 4); // vì sẽ lấy 0, step, step*2, step*3, total-1

    const tickPositions = [
        0,
        step,
        step * 2,
        step * 3,
        total - 1
    ].filter((v, i, arr) => v < total && arr.indexOf(v) === i); // loại trùng, tránh out of range
    useEffect(() => {
        if (!chartRef.current) return;

        Highcharts.chart(chartRef.current, {
            chart: {
                type: "line",
                backgroundColor: "#2a2a2a",
                height: 200,
            },
            title: { text: undefined },
            credits: { enabled: false },
            xAxis: {
                //"19/06", "20/06", "21/06", "22/06", "23/06", "24/06", "25/06", "26/06"
                categories: dataChart?.chart?.map((i: any) => i?.x),
                tickAmount: 5,
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
                min: dataChart?.min,
                max: dataChart?.max,
                tickInterval: (dataChart?.max - dataChart?.min) / 5,
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
                    data: dataChart?.chart?.map((i: any) => i?.y),
                },
            ],
        });
    }, [dataChart]);

    return (
        <div className="mx-[16px] my-[16px] space-y-[16px]">
            {/* Card Tổng quan */}
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#111111] p-[16px] rounded-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.4)] border border-[#333]">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-[#AAA] text-[14px]">Số dư hiện có</div>
                        <div className="flex items-baseline gap-[4px]">
                            <span className="text-white text-[28px] font-semibold">
                                {formatNumber(totalValue)}
                            </span>
                            <span className="text-[#FFD700] text-[16px]">{currency}</span>
                        </div>
                    </div>
                    {/* <button className="text-[#999] text-[16px]">
                        👁‍🗨
                    </button> */}
                </div>

                <div className="mt-[8px] flex items-center gap-[8px]">
                    <span className={clsx(colorFor(todayChange), "text-[14px] font-medium")}>
                        {todayChange >= 0 ? "+" : ""}{formatNumber(todayChange)}
                    </span>
                    <span className={clsx(colorFor(percentToday), "text-[12px]")}>
                        ({percentToday >= 0 ? "+" : ""}{percentToday}%)
                    </span>
                    <span className="text-[#AAA] text-[12px]">Hôm nay</span>
                </div>

                <div className="mt-[12px] grid grid-cols-2 gap-[12px]">
                    <div>
                        <div className="text-[#AAA] text-[12px]">PNL tháng này<i className="ml-[4px] text-[#777]" title="Profit & Loss tháng này"></i></div>
                        <div className={clsx(colorFor(thisMonthPnl), "text-[14px] font-semibold")}>
                            {thisMonthPnl} ({percentThisMonth}%)
                        </div>
                    </div>
                    <div>
                        <div className="text-[#AAA] text-[12px]">PNL hôm qua<i className="ml-[4px] text-[#777]" title="Profit & Loss trước đó"></i></div>
                        <div className={clsx(colorFor(prevPnl), "text-[14px] font-semibold")}>
                            {formatNumber(prevPnl)} ({percentLastMonth}%)
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs chọn khoảng thời gian */}
            <div className="flex justify-center gap-[8px]">
                {ranges.map((r) => (
                    <button
                        key={r.key}
                        onClick={() => handleClick(r.key as typeof range)}
                        className={clsx(
                            "px-[12px] py-[6px] rounded-[12px] text-[13px] font-medium transition-colors duration-150",
                            range === r.key
                                ? "bg-[#FFD700] text-[#1A1A1A]"
                                : "bg-[#2A2A2A] text-[#AAA] hover:bg-[#3A3A3A]"
                        )}
                    >
                        {r.label}
                    </button>
                ))}
            </div>

            {/* PNL chart placeholder */}
            <div className="bg-[#111111] p-[16px] rounded-[16px] border border-[#333]">
                <div className="text-[#FFD700] text-[16px] font-semibold mb-[8px]">
                    PNL tích lũy
                </div>
                {/* Thay thế bằng chart thực tế */}
                <div
                    ref={chartRef}
                    className="h-[200px] flex items-center justify-center text-[#555]">
                    {/* <YourChartComponent data={...} /> */}
                    Chưa đủ dữ liệu
                </div>
            </div>

            <BetTransactionList />
        </div>
    );
};
