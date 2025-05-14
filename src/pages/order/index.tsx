import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { Progress } from 'antd'
import requestService from 'api/request'
import clsx from 'clsx'
import Empty from 'components/elements/Empty'
import RecordOrders from 'components/ui/RecordOrders'
import { formatTime } from 'lib/helpers'
import dolar from 'assets/images/dollar.png'
import React, { useEffect, useState } from 'react'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import { useTranslation } from 'react-i18next'
import bg_order from 'assets/images/d2a7ec6d39f2a709844f1b935c241855cd3ce0.jpg'
import bg_23 from 'assets/images/23.webp'
import { useNavigate } from 'react-router-dom'
const Order = () => {
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()

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

    const renderer = ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
        if (completed) {
            return <span>Đã kết thúc</span>;
        }

        const pad = (n: number) => String(n).padStart(2, '0');

        return (
            <span>
                {days > 0 ? `${days} ngày ` : ''}
                {pad(hours)}:{pad(minutes)}:{pad(seconds)}
            </span>
        );
    };

    useEffect(() => {
        getOrders();
    }, []);
    return (
        <div data-v-cde322bf="" data-v-e697ea1f="" className="nft-list-page">

            <div data-v-cde322bf="" className="page-content !pt-0">
                <div data-v-cde322bf="" className="nft-grid" >
                    {
                        orders?.length > 0 &&
                        orders.map((i: any, index) => (
                            <div
                                key={index}
                                data-v-a5db015c=""
                                data-v-5fcece6c=""
                                className="bg-[#ccc] w-full h-[167px] rounded-[10px] p-[10px] flex justify-between mb-[15px] relative"

                            >
                                <div
                                    className="rounded-[10px] absolute inset-0 bg-no-repeat bg-[length:100%] bg-[position:0%_80%] z-0  opacity-[.8] "
                                    style={{
                                        backgroundImage: `url(${process.env.REACT_APP_BASE_URL + i?.ticket?.urlImage})`,
                                    }}
                                />
                                <div data-v-a5db015c="" className="flex flex-col  z-10 justify-center items-center">
                                    <div data-v-a5db015c="" className="font-[700]">
                                        <div data-v-a5db015c="">
                                            <div data-v-a5db015c="" className="text-[20px] font-[900] text-[#fff] mr-[7px] mt-[11px]">
                                                {i?.ticket?.name}
                                            </div>
                                            <div data-v-a5db015c="" className="mt-[9px] text-[17px] text-[#fff]">
                                                <Countdown
                                                    renderer={renderer}
                                                    date={i?.endTime}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div data-v-a5db015c="" className="flex flex-col justify-evenly w-[184px] h-full z-10"
                                    style={{
                                        background: `url(${bg_23}) no-repeat`,
                                        backgroundSize: "100% 100%"
                                    }}
                                >
                                    <div data-v-a5db015c="" className="text-[15px text-[#999] ml-[32px]">
                                        Tổng thu hoạch
                                    </div>
                                    <div data-v-a5db015c=""
                                        style={{
                                            alignSelf: 'center',
                                            padding: '0 19px 0 32px'
                                        }} className='flex gap-2 items-center'
                                    >
                                        <div
                                            data-v-278ee21a=""
                                            data-v-a5db015c=""
                                            className='flex gap-2 items-center'
                                        >
                                            

                                            <p
                                                data-v-278ee21a=""
                                                className="u-icon__label"
                                                style={{
                                                    color: "rgb(51, 51, 51)",
                                                    fontSize: 20,
                                                    margin: "0px 0px 0px 5px"
                                                }}
                                            >
                                                <span>{i?.totalEarn}</span>
                                            </p>
                                            <div
                                                data-v-278ee21a=""
                                                className="u-icon__img"
                                                style={{ width: 34, height: 34 }}
                                            >
                                                <img src={dolar} draggable="false" />

                                            </div>
                                        </div>
                                    </div>
                                    <div data-v-a5db015c="" className="ml-[32px]">
                                        <button className='w-[138px] h-[36px] rounded-[10px] text-[15px] text-[#fff] font-[800]' style={{
                                            background: "linear-gradient(90deg, #0ca66b, #0a98a7)"
                                        }}
                                            onClick={() => navigate('/farm/'+i?._id)}
                                        >
                                            Thăm
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))

                    }



                </div>
                {
                    orders?.length === 0 && <Empty title={t('Bạn chưa thuê trang trại ')} />
                }


                {/* <div data-v-cde322bf="" className="float-button" onClick={() => setOpenRecord(true)}>
                    <i
                        data-v-cde322bf=""
                        className="van-badge__wrapper van-icon van-icon-records records-icon"
                    >
               
                    </i>
                    <span data-v-cde322bf="">{t("Hồ sơ giao dịch")}</span>
                </div> */}
            </div>


        </div>

    )
}

export default Order