import React from 'react'
import Countdown, { CountdownRenderProps } from 'react-countdown';
import { useTranslation } from 'react-i18next';

const Farming = ({ orders }: { orders: Array<any> }) => {
    const { t } = useTranslation()
    const renderer = ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
        if (completed) {
            return <span>{t("Đã kết thúc")}</span>;
        }

        const pad = (n: number) => String(n).padStart(2, '0');

        return (
            <span>
                {days > 0 ? `${days} ngày ` : ''}
                {pad(hours)}:{pad(minutes)}:{pad(seconds)}
            </span>
        );
    };

    return (
        <>
            {
                orders?.map((item: any, idx) => (
                    <div className="bg-[#1f1b14] rounded-[20px] p-[20px] shadow-[inset_0_0_10px_rgba(0,0,0,0.3)] border border-[#2b241a] mb-[10px] " key={idx}>
                        <div className="flex justify-between items-center mb-[12px]">
                            <div className="flex items-center gap-[10px]">
                                <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png" className="w-[24px] h-[24px]" alt='icon' />
                                <div>
                                    <div className="text-[16px] font-semibold">{item?.ticket?.name}</div>
                                    <div className="text-[13px] text-gray-400"></div>
                                </div>
                            </div>
                            <div className="bg-green-400 bg-opacity-20 text-green-300 text-[13px] font-bold px-[12px] py-[4px] rounded-full shadow">
                                +{Number(item?.currentIncome?.toFixed(4))} USDT
                            </div>
                        </div>
                        <div className="flex justify-between text-[13px] text-gray-400">
                            <div>{item?.ticket?.incomePerDay} USDT / Ngày</div>
                            <div className="text-white font-semibold">
                                <Countdown
                                    renderer={renderer}
                                    date={item?.endTime}
                                />
                            </div>
                        </div>
                    </div>
                ))
            }

        </>
    )
}

export default Farming