import { Drawer } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthApp } from 'store/useAuthApp'
import Transactions from './Transactions'
import logo from 'assets/new_img/logo.png'
interface Props {
    data: any
    getTransactions: () => Promise<void>
}
const TradeHeader = ({ data, getTransactions }: Props) => {
    const navigate = useNavigate()
    const { user } = useAuthApp()
    const [open, setOpen] = useState(false)
    return (
        <div id="header_trade" className="flex items-center justify-between bg-[#141414] px-[16px] py-[12px] text-white border-b border-[#2a2a2a] shadow-sm z-[10]">

            {/* Lịch sử */}
            <Drawer
                className="drawer-transaction"
                placement="right"
                open={open}
                onClose={() => setOpen(false)}
                title={<div className="text-white text-center font-semibold text-[16px]">Giao dịch gần đây</div>}
            >
                <Transactions data={data} />
            </Drawer>

            {/* Menu & Nút quay lại */}
            <div className="flex items-center gap-[10px]">

                <button
                    className="w-[34px] h-[34px] flex items-center justify-center rounded-full hover:bg-white/10 transition"
                    onClick={() => navigate(-1)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-[20px] h-[20px]"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <div>
                    <img src={logo} width={100} />
                </div>
            </div>

            {/* Tài khoản & số dư */}
            <div className="flex items-center gap-[10px]">
                <div className="flex flex-col items-end">
                    <span className="text-[15px] font-semibold text-[#f5cf6d]">${Number(user?.realBalance)?.toFixed(3)}</span>
                </div>

                {/* Menu dots + badge */}
                <div
                    className="relative w-[32px] h-[32px] flex items-center justify-center rounded-full hover:bg-white/10 transition cursor-pointer"
                    onClick={async () => {
                        setOpen(true);
                        getTransactions();
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-[18px] h-[18px]"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>

                    {!!data?.total_bet_open && (
                        <div className="absolute -top-[3px] -right-[3px] w-[16px] h-[16px] bg-red-500 text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
                            {data.total_bet_open}
                        </div>
                    )}
                </div>
            </div>
        </div>

    )
}

export default TradeHeader