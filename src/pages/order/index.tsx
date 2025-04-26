import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { Progress } from 'antd'
import requestService from 'api/request'
import clsx from 'clsx'
import Empty from 'components/elements/Empty'
import RecordOrders from 'components/ui/RecordOrders'
import { formatTime } from 'lib/helpers'
import React, { useEffect, useState } from 'react'
import Countdown from 'react-countdown'
import { useTranslation } from 'react-i18next'

const Order = () => {
    const [orders, setOrders] = useState([])
    const [openRecord, setOpenRecord] = useState(false)
    const { t, i18n } = useTranslation()
    const getOrders = async () => {
        try {
            const res = await requestService.get('/tickets/orders')
            if (res && res.data) {
                setOrders(res.data?.data)
            }
        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        }
    }


    const remainingPercent = (i: any) => {
        const now = Date.now();
        const createdAt = new Date(i?.createdAt).getTime();
        const totalTime = i?.ticket?.earningDay * 24 * 60 * 60 * 1000;
        const elapsedTime = now - createdAt;

        return Math.min(100, (elapsedTime * 100) / totalTime);
    };



    useEffect(() => {
        getOrders();
        const intervalId = setInterval(() => {
            getOrders();
        }, 5000);
        return () => clearInterval(intervalId);
    }, []);
    return (
        <div data-v-cde322bf="" data-v-e697ea1f="" className="nft-list-page">

            <div data-v-cde322bf="" className="page-content !pt-0">
                <div data-v-cde322bf="" className="nft-grid" >
                    {
                        orders?.length !== 0 &&
                        orders?.map((i: any) => (
                            <div data-v-cde322bf="" className="nft-item" key={i?._id}>
                                <div data-v-cde322bf="" className="nft-header">
                                    <div data-v-cde322bf className='task-button-wrapper'>
                                        <button data-v-cde322bf className='task-button'>
                                            Active
                                        </button>
                                    </div>
                                    <div data-v-cde322bf="" className={clsx("nft-image", {
                                        "normal": i?.ticket?.vip === 1,
                                        "rare": i?.ticket?.vip === 2,
                                        "epic": i?.ticket?.vip === 3,
                                        "legendary": i?.ticket?.vip === 4,
                                        "mythic": i?.ticket?.vip === 5,
                                    })}>
                                        <div data-v-cde322bf="" className="van-image flex items-center justify-center p-1" >
                                            <img
                                                src={`${process.env.REACT_APP_BASE_URL}` + i?.ticket?.urlImage}
                                                alt="Vé vàng NFT"
                                                className="van-image__img"
                                                style={{ objectFit: "cover" }}
                                            />
                                            {/**/}
                                            {/**/}
                                        </div>
                                    </div>
                                    <div className='flex justify-center items-center'>
                                        <Progress type="circle" status="active" percent={remainingPercent(i)} strokeColor={{
                                            '0%': '#9ce33a',
                                            '100%': '#2a7d06'
                                        }}
                                            format={(p) => <div>
                                                <div className='text-[10px] text-center'>
                                                    {t("Thời gian còn lại")}
                                                </div>
                                                {
                                                    <Countdown date={new Date(i?.createdAt)?.getTime() + i?.ticket?.earningDay * 1000 * 60 * 60 * 24}
                                                        renderer={({ days, hours, minutes, seconds, completed }) => {
                                                            if (completed) {

                                                                return <div>Expired</div>;
                                                            } else {
                                                                return <span className='text-[10px] font-[900] text-[#151515]'>{days} {t("home.day")} {hours}:{minutes}:{seconds}</span>;
                                                            }
                                                        }}
                                                    />
                                                }
                                            </div>}

                                        />
                                    </div>
                                </div>
                                <div data-v-cde322bf="" className='nft-info p-2'>
                                    <div data-v-cde322bf="" className='nft-name'>
                                        {i?.ticket?.name}
                                    </div>
                                    <div data-v-cde322bf="" className='nft-rate'>
                                        <div data-v-cde322bf="" className='label'>
                                            {t("Thời gian trả thu nhập")}
                                        </div>
                                        <div data-v-cde322bf="" className='value-wrapper'>
                                            {new Date(i?.rewardTime)?.toLocaleString()}
                                        </div>
                                        <div data-v-cde322bf="" className='value ml-2'>
                                            +{i?.ticket?.incomePerDay}$
                                        </div>
                                    </div>
                                    <div data-v-cde322bf="" className='nft-rate'>
                                        <div data-v-cde322bf="" className='label'>
                                            {t("Thu nhập hiện tại")}
                                        </div>

                                        <div data-v-cde322bf="" className='value ml-2'>
                                            +{i?.currentIncome?.toFixed(5)}$
                                        </div>
                                    </div>
                                    <div data-v-cde322bf="" className='nft-details'>
                                        <div data-v-cde322bf="" className='detail-row'>
                                            <div data-v-cde322bf="" className='detail-item'>
                                                <div data-v-cde322bf="" className='label'>
                                                    {t("Ngày mua")}
                                                </div>
                                                <div data-v-cde322bf="" className='value'>
                                                    {new Date(i?.createdAt)?.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div data-v-cde322bf="" className='nft-details'>
                                        <div data-v-cde322bf="" className='detail-row'>
                                            <div data-v-cde322bf="" className='detail-item'>
                                                <div data-v-cde322bf="" className='label'>
                                                    {t("Giá mua")}
                                                </div>
                                                <div data-v-cde322bf="" className='value'>
                                                    {i?.ticket?.price?.toLocaleString()}$
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        ))

                    }
                </div>
                {
                    orders?.length === 0 && <Empty title={t('order.no_empty_ticket')} />
                }


                <div data-v-cde322bf="" className="float-button" onClick={() => setOpenRecord(true)}>
                    <i
                        data-v-cde322bf=""
                        className="van-badge__wrapper van-icon van-icon-records records-icon"
                    >
                        {/**/}
                        {/**/}
                        {/**/}
                    </i>
                    <span data-v-cde322bf="">{t("Hồ sơ giao dịch")}</span>
                </div>
            </div>
            <RecordOrders
                open={openRecord}
                setOpen={setOpenRecord}
            />

        </div>

    )
}

export default Order