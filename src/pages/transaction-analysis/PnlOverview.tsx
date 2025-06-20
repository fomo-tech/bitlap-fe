import React, { useState } from "react";
import clsx from "clsx";
import BetTransactionList from "./BetTransactionList";

interface OverviewProps {
    totalValue: number;
    currency: string;
    todayChange: number;
    thisMonthPnl: number;
    prevPnl: number;
    onRangeChange?: (range: string) => void;
}

export const PnlOverview: React.FC<OverviewProps> = ({
    totalValue,
    currency,
    todayChange,
    thisMonthPnl,
    prevPnl,
    onRangeChange,
}) => {
    const [range, setRange] = useState<"1W" | "1M" | "3M" | "6M" | "custom">("1M");

    const ranges = [
        { key: "today", label: "Hôm nay" },
        { key: "1W", label: "1 Tuần" },
        { key: "1M", label: "1 Tháng" },
        { key: "3M", label: "3 Tháng" },
        { key: "6M", label: "6 Tháng" },

    ];

    const formatNumber = (n: number) =>
        n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const colorFor = (n: number) => (n >= 0 ? "text-[#4CAF50]" : "text-[#FF3B30]");

    const handleClick = (key: typeof range) => {
        setRange(key);
        onRangeChange && onRangeChange(key);
    };

    return (
        <div className="mx-[16px] my-[16px] space-y-[16px]">
            {/* Card Tổng quan */}
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#111111] p-[16px] rounded-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.4)] border border-[#333]">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-[#AAA] text-[14px]">Tổng giá trị ước tính</div>
                        <div className="flex items-baseline gap-[4px]">
                            <span className="text-white text-[28px] font-semibold">
                                {formatNumber(totalValue)}
                            </span>
                            <span className="text-[#FFD700] text-[16px]">{currency}</span>
                        </div>
                    </div>
                    <button className="text-[#999] text-[16px]">
                        👁‍🗨
                    </button>
                </div>

                <div className="mt-[8px] flex items-center gap-[8px]">
                    <span className={clsx(colorFor(todayChange), "text-[14px] font-medium")}>
                        {todayChange >= 0 ? "+" : ""}{formatNumber(todayChange)}
                    </span>
                    <span className={clsx(colorFor(todayChange), "text-[12px]")}>
                        ({todayChange >= 0 ? "+" : ""}{(todayChange / totalValue * 100).toFixed(2)}%)
                    </span>
                    <span className="text-[#AAA] text-[12px]">Hôm nay</span>
                </div>

                <div className="mt-[12px] grid grid-cols-2 gap-[12px]">
                    <div>
                        <div className="text-[#AAA] text-[12px]">PNL tháng này<i className="ml-[4px] text-[#777]" title="Profit & Loss tháng này">ℹ️</i></div>
                        <div className={clsx(colorFor(thisMonthPnl), "text-[14px] font-semibold")}>
                            {formatNumber(thisMonthPnl)} ({((thisMonthPnl / totalValue) * 100).toFixed(2)}%)
                        </div>
                    </div>
                    <div>
                        <div className="text-[#AAA] text-[12px]">PNL trước đây<i className="ml-[4px] text-[#777]" title="Profit & Loss trước đó">ℹ️</i></div>
                        <div className={clsx(colorFor(prevPnl), "text-[14px] font-semibold")}>
                            {formatNumber(prevPnl)} ({((prevPnl / totalValue) * 100).toFixed(2)}%)
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
                <div className="h-[200px] flex items-center justify-center text-[#555]">
                    {/* <YourChartComponent data={...} /> */}
                    Biểu đồ PNL ở đây
                </div>
            </div>

            <BetTransactionList />
        </div>
    );
};
