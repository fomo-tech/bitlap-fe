import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import banner1 from 'assets/images/banner1.png'
import banner2 from 'assets/images/banner2.png'
import banner3 from 'assets/images/banner3.png'
import requestService from 'api/request';
import { useTranslation } from 'react-i18next';
import { useGlobalAppStore } from 'store/useGlobalApp';
import { Drawer, message, Modal } from 'antd';
import { useAuthApp } from 'store/useAuthApp';
import Countdown from 'react-countdown';
import QuickAction from 'components/ui/QuickAction';
import NutientBanner from 'components/ui/home/NutientBanner';
import telegram from 'assets/icons/telegram.png'
import clsx from 'clsx';
import PopupWelcome from 'components/ui/home/PopupWelcome';
import Marquee from 'react-fast-marquee';
const HomePage = () => {
    const [tickets, setTickets] = useState([])
    const { loading, handleLoading, handleCallbackUser } = useGlobalAppStore()
    const { user } = useAuthApp()
    const { t, i18n } = useTranslation();
    const [openConfirm, setOpenConfirm] = useState<any>(false)
    const [run, setRun] = useState(true);
    const [marqueeKey, setMarqueeKey] = useState(0);


    const handleBuyTicket = async (ticketId: string) => {
        handleLoading(true)
        try {
            const res = await requestService.post('/tickets', {
                data: {
                    ticketId
                }
            })
            if (res && res.data) {
                message.success(res.data?.message)
                handleCallbackUser()
                setOpenConfirm(false)
            }
        } catch (error: any) {
            message.error(error?.response?.data?.message)
        }
        handleLoading(false)
    }
    const getTickets = async () => {
        try {
            const res = await requestService.get('/tickets')
            if (res && res.data) {
                setTickets(res.data?.data)
            }
        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        }
    }
    function getRandomId(existingIds: any) {
        let id;
        do {
            id = Math.floor(10000 + Math.random() * 30000); // Tạo id từ 23000 đến 23999
        } while (existingIds.has(id));
        existingIds.add(id);
        return id;
    }

    function getRandomAmount() {
        return `${Math.floor(Math.random() * 10) * 10 + 30}$`; // Bước nhảy 50$, từ 50$ đến 500$
    }

    function generateRandomObjects(count: number) {
        const objects = [];
        const existingIds = new Set();

        for (let i = 0; i < count; i++) {
            objects.push({
                id: getRandomId(existingIds),
                amount: getRandomAmount(),
                type: Math.random() < 0.5 ? t('home.deposit') : t('home.withdraw')
            });
        }

        return objects;
    }
    useEffect(() => {
        getTickets()
    }, [])
    return (
        <>
            {/* <PopupWelcome /> */}
            <div className='fixed z-[9999] bottom-[80px] right-[20px]'>
                <a href='https://t.me/duck_earning' target='_blank' >
                    <img src={telegram} className='w-[48px]' />
                </a>
            </div>
            {/* Baner */}

            <div className='h-[42vw] m-[3vw] rounded-lg overflow-hidden'
                style={{
                    boxShadow: "0 .53333vw 3.2vw #64656614"
                }}
            >
                <Swiper className="mySwiper" autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,

                }}
                    loop
                    modules={[Autoplay]}
                >
                    <SwiperSlide>
                        <img src={banner2} alt='banner1' className='object-contain w-full h-full' />
                    </SwiperSlide>
                    <SwiperSlide className='object-contain w-full h-full'>
                        <img src={banner3} alt='banner1' className='object-contain w-full h-full' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={banner1} alt='banner1' className='object-contain w-full h-full' />
                    </SwiperSlide>
                </Swiper>
            </div>


            {/* Notice */}

            <div className='notice-bar'>
                <div className='van-notice-bar'>
                    <div className="size-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                        </svg>
                    </div>
                    <div className='van-notice-bar__wrap'>
                        {/* <Swiper autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                            modules={[Autoplay]}
                            direction='vertical'
                            loop={true}
                            slidesPerView={1}
                            style={{
                                height: "50px"
                            }}
                        >
                            {generateRandomObjects(10).map((item) => (
                                <SwiperSlide key={item.id} style={{
                                    height: "50px"
                                }}>
                                    <div className='h-full w-full flex
                                    items-center'>ID: {item.id} {item.type} {item.amount}</div>
                                </SwiperSlide>
                            ))}
                        </Swiper> */}
                        <Marquee className='text-[14px]' gradient={false} pauseOnHover speed={40} delay={1} >
                            {
                                i18n?.language === 'vi' && <div>
                                    <span className='font-[900] text-red-600'>
                                        &nbsp;   &nbsp;  &nbsp;   &nbsp; &nbsp; Thông báo:&nbsp; 
                                    </span>
                                    Chỉ giải quyết rút tiền từ 9:00 - 23:00  từ Thứ 2 - Thứ 6. Xin cám ơn 😘😘😘
                                </div>
                            }
                            {
                                i18n?.language === 'en' && <div>
                                    <span className='font-[900] text-red-600'>
                                        &nbsp;   &nbsp;  &nbsp;   &nbsp; &nbsp;  Announcement: &nbsp;
                                    </span>Withdrawals are processed from 9:00 to 23:00, Monday to Friday 😘😘😘
                                </div>
                            }
                            {
                                i18n?.language === 'zh' && <div>
                                    <span className='font-[900] text-red-600'>
                                        &nbsp;   &nbsp;  &nbsp;   &nbsp; &nbsp; Announcement:&nbsp;
                                    </span> 公告：提款时间为周一至周五的 9:00 至 23:00 😘😘😘
                                </div>
                            }
                        </Marquee>


                    </div>
                </div>
            </div>

            <QuickAction />

            <NutientBanner />

            {/* nft-section */}
            <div className='nft-section pb-[50px]' data-v-caee1139>
                <div data-v-caee1139="" className="nft-list">
                    {
                        tickets.map((i: any) => (
                            <div data-v-caee1139="" className="nft-card ">
                                <div data-v-caee1139="" className="nft-image">
                                    <div data-v-caee1139="" className="van-image animation-bounceCard" style={{ width: 180 }}>
                                        <img
                                            src={`${process.env.REACT_APP_BASE_URL}` + i?.urlImage}
                                            alt="Vé vàng NFT"
                                            className="van-image__img"
                                            style={{ objectFit: "cover" }}
                                        />
                                        {/**/}
                                        {/**/}
                                    </div>
                                    <div data-v-caee1139="" className="nft-badges">
                                        <div data-v-caee1139="" className="new" />
                                    </div>
                                    <div data-v-caee1139="" className="nft-tags">
                                        <div data-v-caee1139="" className="tag-item rate-tag">

                                            <span
                                                data-v-caee1139=""
                                                className="van-tag van-tag--round van-tag--warning"
                                            >
                                                {/* {t("home.discount")}: 4% */}
                                                {t("home.order")}: {i?.order || 0}
                                            </span>
                                        </div>
                                        <div data-v-caee1139="" className="tag-item restrict-tag">
                                            <span
                                                data-v-caee1139=""
                                                className="van-tag van-tag--medium van-tag--warning"
                                            >
                                                {t("home.amount")}  {i?.inventory} {/**/}
                                            </span>
                                        </div>
                                        <div data-v-caee1139="" className="tag-item cycle-tag">
                                            <span
                                                data-v-caee1139=""
                                                className="van-tag van-tag--round van-tag--warning"
                                            >
                                                {i?.earningDay} {t("home.day")}
                                            </span>
                                        </div>
                                    </div>

                                </div>
                                <div data-v-caee1139="" className="nft-footer">
                                    <div data-v-caee1139="" className="nft-info">
                                        <div data-v-caee1139="" className="nft-title">
                                            <span data-v-caee1139="" className="name">
                                                {i?.name}
                                            </span>
                                        </div>
                                        <div data-v-caee1139="" className="countdown-wrapper">
                                            <span data-v-caee1139="" className="label">
                                                {t("home.expiration_time")}：
                                            </span>
                                            <div data-v-caee1139="" role="timer" className="van-count-down">
                                                <Countdown date={new Date(i?.soldOutAt)?.getTime()}
                                                    renderer={({ days, hours, minutes, seconds, completed }) => {
                                                        if (completed) {

                                                            return <div>Expired</div>;
                                                        } else {
                                                            return <span>{days} {t("home.day")} {hours}:{minutes}:{seconds}</span>;
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div data-v-caee1139="" className="nft-price">
                                            <span data-v-caee1139="" className="price-label">
                                                {t("home.price")}
                                            </span>
                                            <span data-v-caee1139="" className="price-value">
                                                {i?.price}$
                                            </span>
                                        </div>
                                        <div data-v-caee1139="" className="nft-earnings">
                                            <div data-v-caee1139="" className="earnings-item">
                                                <span data-v-caee1139="" className="label">
                                                    {t("home.daily_income")}
                                                </span>
                                                <span data-v-caee1139="" className="value">
                                                    +{i?.incomePerDay} $
                                                </span>
                                            </div>
                                            <div data-v-caee1139="" className="earnings-item">
                                                <span data-v-caee1139="" className="label">
                                                    {t("home.total_revenue")}
                                                </span>
                                                <span data-v-caee1139="" className="value">
                                                    {i?.price + i?.incomePerDay * i?.earningDay} $
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        data-v-caee1139=""
                                        disabled={!user || user.realBalance < i?.price}
                                        type="button"
                                        onClick={() => setOpenConfirm(i)}
                                        className={clsx("w-full rounded-md text-[#fff] van-button van-button--primary van-button--small van-button--block", {

                                        })}
                                        style={{
                                            background: !user || user.realBalance < i?.price ? "#bbb" : ""
                                        }}
                                    >
                                        <div className="van-button__content">
                                            {/**/}
                                            <span className="van-button__text">
                                                {!user || user.realBalance < i?.price ? t("Insufficient balance") : t("home.buy_now")}
                                            </span>
                                            {/**/}
                                        </div>
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <Drawer
                className='modal-confirm-buy'
                placement='bottom'
                height={"40vh"}
                closable={false}
                onClose={() => setOpenConfirm(false)}
                zIndex={9999}
                title={
                    <div className='flex justify-between'>
                        <div className='text-center font-[900] text-[18px]'>
                            {t("Xác nhận")}
                        </div>
                        <button className='text-yellow-700 underline text-[15px] font-[500]'
                            onClick={() => setOpenConfirm(false)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>

                        </button>

                    </div>
                }
                open={openConfirm}
            >
                <div className='flex flex-col gap-2 my-3 px-3'>
                    <div className='flex w-full items-center justify-between'>
                        <div>
                            {t("Tên Ticket")}
                        </div>
                        <div className='text-[15px] font-[900]'>
                            {openConfirm?.name}
                        </div>
                    </div>
                    <div className='flex w-full items-center justify-between'>
                        <div>
                            Vip
                        </div>
                        <div className='text-[15px] font-[900]'>
                            {openConfirm?.vip}
                        </div>
                    </div>
                    <div className='flex w-full items-center justify-between'>
                        <div>
                            {t("Giá")}
                        </div>
                        <div className='text-[15px] font-[900]'>
                            {openConfirm?.price}$
                        </div>
                    </div>
                    <div className='flex w-full items-center justify-between'>
                        <div>
                            {t("home.daily_income")}
                        </div>
                        <div className='text-[15px] font-[900]'>
                            {openConfirm?.incomePerDay}$
                        </div>
                    </div>
                    <div className='flex w-full items-center justify-between'>
                        <div>
                            {t("home.day")}
                        </div>
                        <div className='text-[15px] font-[900]'>
                            {openConfirm?.earningDay}
                        </div>
                    </div>
                </div>
                <div className='flex w-full items-center justify-between py-4'>

                    <button className='buy-btn w-full'
                        onClick={() => handleBuyTicket(openConfirm)}
                        disabled={loading}
                    >{t("Xác nhận")}</button>
                </div>
            </Drawer>

        </>
    )
}

export default HomePage