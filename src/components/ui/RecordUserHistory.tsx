import { Drawer, Tabs, Tag } from 'antd'
import requestService from 'api/request'
import clsx from 'clsx'
import { formatNumber } from 'lib/helpers'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { TRANSACTION_STATUS_CANCEL, TRANSACTION_STATUS_PENDING, TRANSACTION_TYPE_DEPOSIT } from 'constants/define'
interface Props {
    setOpen: (val: boolean) => void,
    open: boolean
}
const RecordUserHistoires = ({ open, setOpen }: Props) => {
    const [data, setData] = useState([])
    const [transactionType, setTransactionType] = useState('deposit')
    const { t } = useTranslation()

    const getHistory = async () => {
        try {
            const res = await requestService.get('/profile/history-user', {
                params: {
                    transaction_type: transactionType
                }
            })
            if (res && res.data) {
                setData(res?.data?.data)
            }
        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        }
    }

    const renderStatus = (status: string) => {
        if (status === TRANSACTION_STATUS_PENDING) return t("Đang chờ")
        if (status === TRANSACTION_STATUS_CANCEL) {
            if (transactionType === TRANSACTION_TYPE_DEPOSIT) {
                return t("Không thành công")
            }
            return t("Bị từ chối")
        }
        return t("Đã giải quyết")
    }
    useEffect(() => {
        getHistory()
    }, [transactionType])
    return (
        <Drawer
            title={<div className="text-center text-[18px] font-semibold text-[#FFD700]">{t("Lịch sử giao dịch")}</div>}
            placement="right"
            width={"100rem"}
            closable
            closeIcon={
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-[20px] h-[20px] text-[#fff] hover:text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </div>
            }
            onClose={() => setOpen(false)}
            bodyStyle={{
                background: "linear-gradient(145deg, #0e0e0e 0%, #1a1a1f 100%)",
                padding: 0,
            }}
            headerStyle={{
                borderBottom: "1px solid #333",
                background: "#111",
                color: "#FFD700",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "18px",
            }}
            open={open}

        >
            {/* Tabs */}
            <div className="flex justify-around mb-[16px] text-[14px] font-semibold bg-[#1e1b16] px-[4px] py-[4px] rounded-[12px] border border-[#3a3227]">
                <div
                    className={clsx(
                        "w-[90px] text-center py-[6px] rounded-[8px] cursor-pointer transition-all duration-200",
                        transactionType === 'deposit'
                            ? "bg-[#e0b054]/10 text-[#e0b054] shadow-inner"
                            : "text-white/60 hover:text-white"
                    )}
                    onClick={() => setTransactionType('deposit')}
                >
                    {t("NẠP")}
                </div>
                <div
                    className={clsx(
                        "w-[90px] text-center py-[6px] rounded-[8px] cursor-pointer transition-all duration-200",
                        transactionType === 'withdraw'
                            ? "bg-[#e0b054]/10 text-[#e0b054] shadow-inner"
                            : "text-white/60 hover:text-white"
                    )}
                    onClick={() => setTransactionType('withdraw')}
                >
                    {t("RÚT")}
                </div>
                <div
                    className={clsx(
                        "w-[90px] text-center py-[6px] rounded-[8px] cursor-pointer transition-all duration-200",
                        transactionType === 'reward_refferal'
                            ? "bg-[#e0b054]/10 text-[#e0b054] shadow-inner"
                            : "text-white/60 hover:text-white"
                    )}
                    onClick={() => setTransactionType('reward_refferal')}
                >
                    {t("THƯỞNG")}
                </div>
            </div>


            {/* Record List */}
            <div className="records-list space-y-[20px] p-[16px] rounded-[20px] max-w-[480px] mx-auto bg-transparent">
                {data?.length > 0 ? (
                    data.map((i: any) => (
                        <div
                            className="record-item flex items-center relative p-[16px] rounded-[16px] bg-[#131313] border border-[#2b2b2b] hover:shadow-[0_0_12px_rgba(255,215,0,0.2)] transition-all duration-300 group"
                            style={{
                                background: "linear-gradient(145deg, #161616 0%, #1e1e1e 100%)",
                                boxShadow: "inset 0 0 0 1px #2b2b2b",
                            }}
                            key={i?._id}
                        >
                            {/* STATUS */}
                            {i?.transaction_type !== "reward_refferal" && (
                                <div className="absolute left-[-6px] top-[-12px] z-10">
                                    <Tag
                                        className="uppercase rounded-[12px] px-[5px] py-[1px] text-[7px] tracking-wide"
                                        color={
                                            i?.transaction_status === "finish"
                                                ? "green-inverse"
                                                : i?.transaction_status === "pending"
                                                    ? "orange-inverse"
                                                    : "red-inverse"
                                        }
                                    >
                                        {renderStatus(i?.transaction_status)}
                                    </Tag>
                                </div>
                            )}

                            {/* LEFT */}
                            <div className="flex-1 pr-[12px]">
                                <div className="text-[#FFD700] text-[14px] font-semibold tracking-wide group-hover:text-[#FFE98A]">
                                    {new Date(i?.createdAt)?.toLocaleString()}
                                </div>
                                <div className="flex items-center gap-[6px] mt-[6px]">
                                    <div className="text-[#999] text-[14px]">{t("Số dư")}:</div>
                                    <div className="text-white text-[14px] font-semibold">
                                        {formatNumber(Number(i?.currentBalanceUser?.toFixed(3)))}
                                    </div>
                                    <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png" width={20} />
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div className="text-right min-w-[130px]">
                                <div
                                    className={clsx(
                                        "flex items-center justify-end gap-[4px] text-[17px] font-bold",
                                        {
                                            "text-[#FFD700]": i?.transaction_type === "reward_ticket",
                                            "text-white": i?.transaction_type !== "reward_ticket",
                                        }
                                    )}
                                >
                                    <div>{i?.value > 0 ? "+" : ""}{Number(i?.value?.toFixed(3))}</div>
                                    <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png" width={20} />
                                </div>
                                <div className="text-[#C0C0C0] text-[13px] mt-[4px] font-light tracking-wide">
                                    {i?.transaction_type === "deposit" && t("home.deposit")}
                                    {i?.transaction_type === "withdraw" && t("home.withdraw")}
                                    {i?.transaction_type === "reward_refferal" && t("Thưởng giới thiệu")}
                                </div>
                                {i?.reason && (
                                    <div className="text-red-400 text-[12px] mt-[2px] italic">{i?.reason}</div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-[#777] text-[14px] py-[12px] italic">
                        {t("Không có dữ liệu")}
                    </div>
                )}
            </div>
        </Drawer>
    );

}

export default RecordUserHistoires