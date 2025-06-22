import clsx from "clsx";
import Empty from "components/elements/Empty";
import { useTranslation } from "react-i18next";
import { useGlobalAppStore } from "store/useGlobalApp";

interface Props {
    data: any
}
const Transactions = ({ data }: Props) => {
    const { t } = useTranslation()
    const { transaction_type_trading, setTransactionTypeTrading } = useGlobalAppStore()
    return (
        <div className="bg-[#1e1b16] min-h-screen px-4 py-4 text-white rounded-[12px]">
            {/* Tabs */}
            <div className="flex justify-around mb-[16px] text-[14px] font-semibold bg-[#1e1b16] px-[4px] py-[4px] rounded-[12px] border border-[#3a3227]">
                <div
                    className={clsx(
                        "w-[90px] text-center py-[6px] rounded-[8px] cursor-pointer transition-all duration-200",
                        transaction_type_trading === 'pending'
                            ? "bg-[#e0b054]/10 text-[#e0b054] shadow-inner"
                            : "text-white/60 hover:text-white"
                    )}
                    onClick={() => setTransactionTypeTrading('pending')}
                >
                    {t("MỞ")}
                    {!!data?.total_bet_open && (
                        <span className="text-red-500 ml-[4px]">{data?.total_bet_open}</span>
                    )}
                </div>
                <div
                    className={clsx(
                        "w-[90px] text-center py-[6px] rounded-[8px] cursor-pointer transition-all duration-200",
                        transaction_type_trading === 'finish'
                            ? "bg-[#e0b054]/10 text-[#e0b054] shadow-inner"
                            : "text-white/60 hover:text-white"
                    )}
                    onClick={() => setTransactionTypeTrading('finish')}
                >
                    {t("ĐÓNG")}
                </div>
            </div>



            {/* List */}
            <div className="space-y-[12px]">
                {!data?.transactions?.length && (
                    <div className="text-center text-[#AAA]">
                        {t("Không có data")}
                    </div>
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
                            {/* Top row */}
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
                                            {t("Đang chờ")}
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

        </div>


    )
}

export default Transactions