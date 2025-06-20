import React from 'react';
import { PnlOverview } from './PnlOverview';
import { useNavigate } from 'react-router-dom';

const TransactionAnalysis: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#0F0F1C] text-white">
            <div className="relative h-[80px] bg-[#0F0F0F] border-b border-[#FFD700] flex items-center px-[10px]">
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
                    totalValue={1914.76}
                    currency="VND"
                    todayChange={-0.50}
                    thisMonthPnl={-158.55}
                    prevPnl={-2250.69}
                    onRangeChange={(r) => console.log("Range changed:", r)}
                />
            </div>
        </div>
    );
};

export default TransactionAnalysis;
