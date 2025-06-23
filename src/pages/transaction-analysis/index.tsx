import React, { useEffect, useState } from 'react';
import { PnlOverview } from './PnlOverview';
import { useNavigate } from 'react-router-dom';
import { useAuthApp } from 'store/useAuthApp';
import requestService from 'api/request';

const TransactionAnalysis: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuthApp()
    const [dataSummary, setDataSummary] = useState<any>()
    const [dataChart, setDataChart] = useState<any>()
    const getSummaryTrading = async () => {
        try {
            const res = await requestService.get("/trading/transaction-summary")
            if (res && res.data) {
                setDataSummary(res.data?.data)
            }
        } catch (error) {
            console.log(error);

        }
    }

    const getDataChart = async (r: string) => {
        try {
            const res = await requestService.get('/trading/data-chart', {
                params: {
                    range: r
                }
            })
            if (res && res.data) {
                setDataChart(res.data.data)
            }
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        if (user) {
            getSummaryTrading()
            getDataChart("today")
        }

    }, [user])
    return (
        <div className="min-h-screen bg-[#0f0e0d] text-white">
            <div className="z-[10] relative h-[80px] bg-[#0F0F0F] border-b border-[#FFD700] flex items-center px-[10px]">
                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="w-[32px] h-[32px] rounded-full bg-gradient-to-br from-[#F6E27A] to-[#CBA135] flex items-center justify-center shadow-[0_4px_12px_rgba(255,215,0,0.3)]"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[20px] h-[20px] text-[#1A1300]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Title */}
                <h1 className="flex-1 text-center text-[20px] font-extrabold text-[#FFD700] tracking-wide">
                    Transaction Analysis
                </h1>

            </div>

            {/* Content */}
            <div className="pt-[16px]">
                <PnlOverview
                    totalValue={Number(user?.realBalance?.toFixed(3))}
                    currency="USDT"
                    todayChange={Number(dataSummary?.profitToday?.toFixed(3))}
                    thisMonthPnl={Number(dataSummary?.profitThisMonth?.toFixed(3))}
                    prevPnl={Number(dataSummary?.profitYesterday?.toFixed(3))}
                    onRangeChange={(r) => getDataChart(r)}
                    percentLastMonth={Number(dataSummary?.percentYesterday?.toFixed(3))}
                    percentToday={Number(dataSummary?.percentToday?.toFixed(3))}
                    percentThisMonth={Number(dataSummary?.percentThisMonth?.toFixed(3))}
                    dataChart={dataChart}
                />
            </div>
            <div className="bg-animation">
                <div id="stars" />
                <div id="stars2" />
                <div id="stars3" />
                <div id="stars4" />
            </div>
        </div>
    );
};

export default TransactionAnalysis;
