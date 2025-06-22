import clsx from "clsx";
import { socket } from "lib/socket";
import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

interface TradingItem {
    openPrice?: number;
    closePrice?: number;
    isLoading?: boolean;
}

interface Props {
    tradingData: TradingItem[];
    showChunks: boolean,
    setShowChunks: (val: boolean) => void
}
const columnLength = 24;

export default function LastResults({ tradingData, showChunks, setShowChunks }: Props) {
    const [data, setData] = useState<TradingItem[]>([]);
    const { t } = useTranslation()
    useEffect(() => {
        setData(_.takeRight(tradingData, columnLength));
    }, [tradingData]);

    useEffect(() => {
        const handlePrice = (price: TradingItem & { second: number }) => {
            // Nếu là dữ liệu chuẩn bị => chỉ thêm 1 chấm loading
            if (price.second <= 10) {
                setData((prev) => {
                    const hasLoading = prev.some((item) => item.isLoading);
                    if (hasLoading) return prev; // đã có thì không thêm nữa

                    const last44 = _.takeRight(prev, 23);
                    return [...last44, { ...price, isLoading: true }];
                });
            }
            // Khi có kết quả thật
            if (price.second < 2) {

                setData((prev) => {
                    const withoutLoading = prev.filter((item) => !item?.isLoading);
                    const next = [...withoutLoading, price];
                    return _.takeRight(next, columnLength);
                });
            }
        };

        socket.on("WE_PRICE", handlePrice);
        return () => {
            socket.off("WE_PRICE", handlePrice);
        };
    }, []);

    const upCount = useMemo(() => {
        return data.filter((item: any) => item?.closePrice > item?.openPrice).length;
    }, [data]);

    const downCount = useMemo(() => {
        return data.filter((item: any) => item?.closePrice <= item?.openPrice).length;
    }, [data]);

    const tradingDataChunks = _.chunk(data, 8);

    return (
        <div className="text-white px-[12px] py-[15px] relative z-[10]">
            <div className="flex items-center justify-between mb-[10px] w-full">
                <span className="text-[14px] font-semibold flex items-center gap-4">Last Results    {/* Toggle Button */}
                    <button
                        className="text-[12px] text-blue-400 underline "
                        onClick={() => setShowChunks(!showChunks)}
                    >
                        {showChunks ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-[20px] text-[#e0b054cc]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-[20px] text-[#e0b054cc]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                            </svg>

                        }
                    </button></span>
                <div className="flex space-x-[6px]">
                    <div className="bg-[#3ae64e] text-white text-[12px] px-[8px] py-[2px] rounded-[4px] font-bold">
                        Long <span className="ml-[2px] font-normal">{upCount}</span>
                    </div>
                    <div className="bg-[#e62a2a] text-white text-[12px] px-[8px] py-[2px] rounded-[4px] font-bold">
                        Short <span className="ml-[2px] font-normal">{downCount}</span>
                    </div>
                </div>
            </div>

            <div
                className={clsx(
                    "grid grid-cols-3 gap-[50px] mt-[10px] transition-all duration-500 overflow-hidden",
                    {
                        "max-h-[0px] opacity-0": !showChunks,
                        "max-h-[1000px] opacity-100": showChunks,
                    }
                )}
            >
                {tradingDataChunks.map((chunk, i) => (
                    <div key={i} className="grid grid-cols-4 gap-[5px]">
                        {chunk.map((item: any, idx) => {
                            const isBuy = item?.closePrice > item?.openPrice;
                            const isSell = item?.closePrice <= item?.openPrice;
                            const isLoading = item?.isLoading;

                            let bgColor = "bg-gray-600";
                            if (isLoading) bgColor = "animate-ping bg-yellow-400";
                            else if (isBuy) bgColor = "bg-[#3ae64e]";
                            else if (isSell) bgColor = "bg-[#e62a2a]";

                            return (
                                <div
                                    key={idx}
                                    className={`w-[20px] h-[20px] rounded-full ${bgColor} transition-all duration-300`}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
