import React from "react";
import clsx from "clsx";

interface Transaction {
    bet_condition: "up" | "down";
    bet_value: number;
    value: number;
    createdAt: string;
}

const mockData: Transaction[] = [
    {
        bet_condition: "up",
        bet_value: 100,
        value: 150,
        createdAt: new Date().toISOString(),
    },
    {
        bet_condition: "down",
        bet_value: 80,
        value: -80,
        createdAt: new Date(Date.now() - 3600 * 1000).toISOString(),
    },
];

const BetTransactionList: React.FC = () => {
    const data = { transactions: mockData };

    return (
        <div className="space-y-[12px]">
            {/* Title */}
            <div className="text-[18px] font-bold text-[#e0b054] mb-[8px]">
                Lịch sử giao dịch
            </div>

            {!data?.transactions?.length && (
                <div className="text-center text-[#AAA]">Không có data</div>
            )}

            {data?.transactions?.map((i, idx) => {
                const isLong = i?.bet_condition === "up";
                const isWin = i?.value > 0;
                const betTypeLabel = isLong ? "Long" : "Short";
                const betTypeColor = isLong ? "text-[#e0b054]" : "text-red-400";
                const valueColor = isWin ? "text-lime-400" : "text-red-500";
                const valuePrefix = isWin ? "+" : "";

                return (
                    <div
                        key={idx}
                        className="bg-[#2a251d] hover:bg-[#3a3229] transition-all rounded-[12px] px-[12px] py-[12px] shadow-md"
                    >
                        {/* Top row */}
                        <div className="flex justify-between items-center mb-[6px]">
                            <div className="flex items-center gap-[6px] font-semibold text-[15px]">
                                BTC/USDT
                                <img
                                    src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
                                    width={18}
                                    alt="btc"
                                />
                                <span
                                    className={`text-[10px] px-[6px] py-[2px] rounded-[6px] font-semibold shadow ${isWin
                                        ? "bg-gradient-to-r from-lime-400 to-lime-500"
                                        : "bg-gradient-to-r from-red-400 to-red-600"
                                        }`}
                                >
                                    {isWin ? "Win" : "Lose"}
                                </span>
                            </div>
                            <div className="text-[#e0b054] font-bold text-[15px]">
                                ${i.bet_value.toFixed(3)}
                            </div>
                        </div>

                        {/* Middle row */}
                        <div className="flex justify-between items-center mb-[6px]">
                            <div className={`font-semibold text-[15px] ${betTypeColor}`}>
                                {betTypeLabel}
                            </div>
                            <div className={`font-semibold text-[15px] ${valueColor}`}>
                                {valuePrefix}${i.value.toFixed(3)}
                            </div>
                        </div>

                        {/* Time */}
                        <div className="text-[11px] text-white/50">
                            {new Date(i.createdAt).toLocaleString()}
                        </div>
                    </div>
                );
            })}
        </div>

    );
};

export default BetTransactionList;
