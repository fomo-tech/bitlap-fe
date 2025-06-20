import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import banner1 from 'assets/new_img/banner1.png'
import banner2 from 'assets/new_img/banner2.png'

import requestService from 'api/request';
import { useTranslation } from 'react-i18next';
import Marquee from 'react-fast-marquee';
import InvestCard from 'components/ui/home/InvestCard';
import { useGlobalAppStore } from 'store/useGlobalApp';
const HomePage = () => {
    const [tickets, setTickets] = useState([])
    const { i18n, t } = useTranslation();
    const { configApp } = useGlobalAppStore()


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
    const marqueeText = () => {
        const data = configApp?.HOME_NOTIFICATION && JSON.parse(configApp?.HOME_NOTIFICATION)
        if (i18n?.language === 'vi') return data?.vi
        if (i18n?.language === 'zh') return data?.zh
        return data?.en
    }
    useEffect(() => {
        getTickets()
    }, [])
    return (
        <>
            {/* <PopupWelcome /> */}

            {/* Baner */}

            <div className='h-[250px]  m-[3rem] rounded-lg overflow-hidden relative z-[10]'
                style={{
                    boxShadow: "0 .83333rem 3.2rem #64656614"
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
                        <img src={banner1} alt='banner1' className=' w-full h-full object-cover' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <a href='https://t.me/richfarmer_offical' target='_blank'>
                            <img src={banner2} alt='banner1' className=' w-full h-full object-cover' />
                        </a>
                    </SwiperSlide>
                </Swiper>
            </div>


            {/* Notice */}

            <div className="notice-bar z-10 relative">
                <div className="van-notice-bar flex items-center bg-[#1f1f1f] px-[16px] py-[12px] rounded-[12px] shadow-md gap-[12px]">
                    <div className="flex items-center justify-center w-[32px] h-[32px] bg-[#2b2b2b] rounded-full text-[#cca354]">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-[20px] h-[20px]">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                        </svg>
                    </div>

                    <div className="van-notice-bar__wrap flex-1 overflow-hidden">
                        <Marquee
                            gradient={false}
                            pauseOnHover
                            speed={40}
                            delay={1}
                            className="text-[16px] font-medium text-white">
                            {
                                configApp?.HOME_NOTIFICATION && (
                                    <div className="inline-flex items-center">
                                        <span className="font-bold text-[#cca354] mr-[8px]">
                                            {t("Thông báo")}:
                                        </span>
                                        {marqueeText()}
                                    </div>
                                )
                            }
                        </Marquee>
                    </div>
                </div>
            </div>


            <section className=" pb-[100px] z-[10] relative">
                <div className="container z-[999]">
                    <div className="flex w-full justify-content-center">
                        <div className="col-lg-6 text-center">
                            <div className="section-header">
                                <h2 className="section-title">
                                    <span className="font-weight-normal">Investment</span>{" "}
                                    <b className="base--color">Plans</b>
                                </h2>
                                <p className='text-[#fff]'>
                                    To make a solid investment, you have to know where you are
                                    investing. Find a plan which is best for you.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* row end */}
                    <div className="grid grid-cols-1 gap-[10px] px-5">
                        {
                            tickets.map((i: any) => (
                                <InvestCard key={i?._id} item={i} />
                            ))
                        }

                    </div>

                </div>
            </section>


            <div className="bg-animation">
                <div id="stars" />
                <div id="stars2" />
                <div id="stars3" />
                <div id="stars4" />
            </div>

        </>
    )
}

export default HomePage