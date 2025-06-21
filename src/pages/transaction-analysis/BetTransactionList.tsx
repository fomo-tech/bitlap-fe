import React, { useEffect, useState } from "react";
import clsx from "clsx";
import requestService from "api/request";
import { useAuthApp } from "store/useAuthApp";
import { DatePicker, Pagination } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi";
dayjs.locale("vi");

const { RangePicker } = DatePicker;

const BetTransactionPage: React.FC = () => {
    const [data, setData] = useState<any>({ transactions: [], total: 0 });
    const { user } = useAuthApp();
    const [page, setPage] = useState(1);
    const [dateRange, setDateRange] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    const getTransactions = async () => {
        try {
            setLoading(true);
            const res = await requestService.get("/trading/transactions", {
                params: {
                    page,
                    limit: 5,
                    start: dateRange?.[0]?.toISOString(),
                    end: dateRange?.[1]?.toISOString()
                }
            });
            if (res?.data) setData(res.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) getTransactions();
    }, [user, page, dateRange]);

    return (
        <div className="space-y-[12px]">
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
                <div className="text-[18px] font-bold text-[#e0b054]">Lịch sử giao dịch</div>

            </div>

            {!data?.transactions?.length && (
                <div className="text-center text-[#AAA]">Không có dữ liệu</div>
            )}

            {data?.transactions?.map((i: any, idx: number) => {
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
                        <div className="flex justify-between items-center mb-[6px]">
                            <div className="flex items-center gap-[6px] font-semibold text-[15px]">
                                BTC/USDT
                                <img
                                    src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
                                    width={18}
                                    alt="btc"
                                />
                                {i?.transaction_status === "pending" ? (
                                    <span className="text-[10px] px-[6px] py-[2px] rounded-[6px] font-semibold shadow bg-gradient-to-r from-yellow-400 to-yellow-500 text-black">
                                        Đang chờ
                                    </span>
                                ) : (
                                    <span className={`text-[10px] px-[6px] py-[2px] rounded-[6px] font-semibold shadow ${isWin
                                        ? "bg-gradient-to-r from-lime-400 to-lime-500 text-black"
                                        : "bg-gradient-to-r from-red-400 to-red-600 text-white"
                                        }`}>
                                        {isWin ? "Win" : "Lose"}
                                    </span>
                                )}

                            </div>
                            <div className="text-[#e0b054] font-bold text-[15px]">
                                ${i.bet_value.toFixed(3)}
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-[6px]">
                            <div className={`font-semibold text-[15px] ${betTypeColor}`}>{betTypeLabel}</div>
                            <div className={`font-semibold text-[15px] ${valueColor}`}>
                                {valuePrefix}${i.value.toFixed(3)}
                            </div>
                        </div>

                        <div className="text-[11px] text-white/50">
                            {new Date(i.createdAt).toLocaleString()}
                        </div>
                    </div>
                );
            })}

            {/* Pagination */}
            {data.total > 5 && (
                <div className="flex justify-center mt-4">
                    <Pagination
                        current={page}
                        total={data?.total}
                        showSizeChanger={false}
                        onChange={(p) => setPage(p)}
                        className="custom-premium-pagination"
                    />

                </div>
            )}

        </div>
    );
};

export default BetTransactionPage;