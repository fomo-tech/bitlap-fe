import { Drawer, Tabs, Tag } from 'antd'
import requestService from 'api/request'
import clsx from 'clsx'
import { formatNumber } from 'lib/helpers'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import dolar from 'assets/images/dollar.png'
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

    const renderStatus =(status: string)=>{
        if(status===TRANSACTION_STATUS_PENDING) return t("Đang chờ")
        if (status === TRANSACTION_STATUS_CANCEL){
            if (transactionType===TRANSACTION_TYPE_DEPOSIT){
                return t("Không thành công")
            }
            return t("Bị từ chối")
        }
        return t("Đã giải quyết") 
    }
    useEffect(() => {
        getHistory()
    }, [transactionType])
    return <Drawer
        title={
            <div className='text-center'>
                {t("Lịch sử giao dịch")}
            </div>
        }
        placement={'right'}
        closable={true}
        closeIcon={
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 hover:text-[#000]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>


            </div>
        }
        onClose={() => setOpen(false)}
        width="100rem"
        open={open}

    >
        <Tabs
            defaultActiveKey="deposit"

            className='tab-record'
            size='large'
            centered
            onChange={(key) => {
                setData([])
                setTransactionType(key)

            }}
            items={[
                {
                    key: "deposit",
                    label: t("home.deposit"),
                },
                {
                    key: "withdraw",
                    label: t("home.withdraw"),

                },
                // {
                //     key: "reward_vip",
                //     label: t("reward_vip"),
                // },
            ]}

        />

        <div data-v-08b1e8b3="" className="records-list">

            {
                data?.length > 0 &&
                data?.map((i: any) => (
                    <div data-v-08b1e8b3 className='record-item flex items-center relative' key={i?._id}>
                        <div className='absolute left-0 top-[-1rem]'>
                            <Tag className='uppercase rounded-2xl' color={
                                i?.transaction_status === 'finish' ? "green-inverse" :
                                    i?.transaction_status === 'pending' ? "orange-inverse" : 'red-inverse'
                            }>
                                {renderStatus(i?.transaction_status)}
                            </Tag>
                        </div>
                        <div data-v-08b1e8b3 className='record-left'>
                            <div data-v-08b1e8b3 className='record-time !text-[15px]'>
                                {new Date(i?.createdAt)?.toLocaleString()}
                            </div>
                            <div data-v-08b1e8b3 className='record-balance !items-center'>

                                <div data-v-08b1e8b3 className='label !text-[15px]'>
                                    {t("Số dư")} :
                                </div>
                                <div data-v-08b1e8b3 className='value'>
                                    {formatNumber(Number(i?.currentBalanceUser)?.toFixed(1)?.toLocaleString())}
                                </div>
                                <div data-v-08b1e8b3 className='currency'>
                                    <img src={dolar} width={20} />
                                </div>
                            </div>
                        </div>
                        <div data-v-08b1e8b3 className='record-right'>
                            <div data-v-08b1e8b3 className={clsx('record-amount  flex items-center', {
                                "income": i?.transaction_type === 'reward_ticket'
                            })}>
                                <div data-v-08b1e8b3 className='amount'>
                                    {i?.value > 0 ? "+" : ""}{Number(i?.value)?.toFixed(0)}
                                </div>
                                <div data-v-08b1e8b3 className='currency'>
                                    <img src={dolar} width={20} />
                                </div>
                            </div>
                            <div data-v-08b1e8b3 className='record-reason'>
                                {
                                    i?.transaction_type === 'deposit' && t("home.deposit")
                                }
                                {
                                    i?.transaction_type === 'withdraw' && t("home.withdraw")
                                }
                            </div>
                            {
                                i?.reason && <div className='text-red-500'>
                                    {i?.reason}
                                </div>
                            }

                        </div>

                    </div>
                ))
            }

            {
                data?.length == 0 &&
                <div data-v-08b1e8b3="" role="feed" className="van-list" aria-busy="false">

                    <div className="van-list__finished-text text-center">
                        {t("Không có dữ liệu")}
                    </div>

                    <div className="van-list__placeholder" />
                </div>
            }

        </div>

    </Drawer>
}

export default RecordUserHistoires