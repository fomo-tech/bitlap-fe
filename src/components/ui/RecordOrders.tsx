import { Drawer } from 'antd'
import requestService from 'api/request'
import clsx from 'clsx'
import { formatNumber } from 'lib/helpers'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
interface Props {
    setOpen: (val: boolean) => void,
    open: boolean
}
const RecordOrders = ({ open, setOpen }: Props) => {
    const [data, setData] = useState([])
    const { t } = useTranslation()
    const getRewards = async () => {
        try {
            const res = await requestService.get('/tickets/order-reward')
            if (res && res.data) {
                setData(res?.data?.data)
            }
        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        }
    }

    useEffect(() => {
        getRewards()
    }, [])

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
        <div data-v-08b1e8b3="" className="records-list">
            {
                data?.length > 0 &&
                data?.map((i: any) => (
                    <div data-v-08b1e8b3 className='record-item flex items-center' key={i?._id}>
                        <div data-v-08b1e8b3 className='record-left'>
                            <div data-v-08b1e8b3 className='record-time'>
                                {new Date(i?.createdAt)?.toLocaleString()}
                            </div>
                            <div data-v-08b1e8b3 className='record-balance'>
                                <div data-v-08b1e8b3 className='label'>
                                    {t("Số dư")} :
                                </div>
                                <div data-v-08b1e8b3 className='value'>
                                    {formatNumber(i?.currentBalanceUser?.toLocaleString())}
                                </div>
                                <div data-v-08b1e8b3 className='currency'>
                                    $
                                </div>
                            </div>
                        </div>
                        <div data-v-08b1e8b3 className='record-right'>
                            <div data-v-08b1e8b3 className={clsx('record-amount  flex items-center', {
                                "income": i?.transaction_type === 'reward_ticket'
                            })}>
                                <div data-v-08b1e8b3 className='amount'>
                                    {i?.value > 0 ? "+" : ""} {i?.value}
                                </div>
                                <div data-v-08b1e8b3 className='currency'>
                                    $
                                </div>
                            </div>
                            <div data-v-08b1e8b3 className='record-reason'>
                                {
                                    i?.transaction_type === 'reward_ticket' && t("Cộng tiền phân phối")
                                }
                                {
                                    i?.transaction_type === 'buy_ticket' && t("Mua ticket")
                                }
                            </div>
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

export default RecordOrders