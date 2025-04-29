import { message, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuthApp } from 'store/useAuthApp'
import rw3 from 'assets/icons/duck.png'
import rw2 from 'assets/images/mines.png'
import requestService from 'api/request'
import { useGlobalAppStore } from 'store/useGlobalApp'
import clsx from 'clsx'
import RandomReward from './components/RandomReward'
const Treasure = () => {
    const navigate = useNavigate()
    const { t, i18n } = useTranslation()
    const { handleCallbackUser, configApp, handleLoading } = useGlobalAppStore()
    const { user, onSetUser } = useAuthApp()
    const [openInfo, setOpenInfo] = useState(false)
    const [itemWinner, setItemWinner] = useState<any>(null)
    const [openModalReward, setOpenModaReward] = useState(false)
    const [isClick, setIsClick] = useState(false)
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [openModaTicker, setOpenModalTicker] = useState(false)

    const rewardItems = [
        { id: 1, img: "https://demo5.speedcode.online/public/coin (2).png", label: "$0.1", reward: "0.1" },
        { id: 2, img: "https://demo5.speedcode.online/public/coin (2).png", label: "$0.15", reward: "0.15" },
        { id: 3, img: "https://demo5.speedcode.online/public/coin (2).png", label: "$0.2", reward: "0.2" },
        { id: 4, img: "https://demo5.speedcode.online/public/coin (2).png", label: "$0.5", reward: "0.5" },
        { id: 5, img: rw3, reward: "x1_duck", label: "+1" },
        { id: 6, img: rw3, reward: "x2_duck", label: "+2" },
        { id: 7, img: rw3, reward: "x5_duck", label: "+5" },
        { id: 8, img: rw2, reward: "Lucky_Clover" },
        { id: 9, img: rw2, reward: "Lucky_Clover" },

    ];
    const randomRewardBox = () => {
        // Chọn một ID ngẫu nhiên trong phạm vi từ 0 đến 9
        let randomIndex = Math.floor(Math.random() * 10); // ID từ 0 đến 9
        return randomIndex;
    };


    const handleMine = async (index: number) => {

        setIsClick(true)
        if (isClick) return
        try {
            const res = await requestService.post('/checkin/mine')
            if (res && res.data && user) {
                onSetUser({
                    ...user,
                    realBalance: user?.realBalance - 0.2
                })
                const resultReward = res.data.data;
                const targetIndex = rewardItems.findIndex((item) => item.reward === resultReward);
                if (targetIndex === -1) throw new Error("Reward not found");
                setActiveIndex(index)
                setItemWinner(rewardItems[targetIndex])
                handleCallbackUser()
                // setTimeout(() => {
                //     setOpenItemWin(true)
                // }, 1000);
            }
        } catch (error: any) {
            message.error(error?.response?.data?.message)
            setIsClick(false)
        }


    }

    useEffect(() => {
        // Nếu itemWinner có giá trị, bắt đầu setTimeout
        if (itemWinner) {
            const timeoutId = setTimeout(() => {
                setItemWinner(null);  // Đặt lại itemWinner sau 5 giây
                setIsClick(false);    // Đặt lại trạng thái isClick
            }, 4000);

            // Dọn dẹp (cleanup) khi itemWinner thay đổi hoặc component unmount
            return () => clearTimeout(timeoutId);
        }
    }, [itemWinner]);  // Chạy lại khi itemWinner thay đổi


    const handlePostGift = async () => {
        handleLoading(true)
        try {
            const res = await requestService.post('/tickets/gift-duck')

            if (res && res.data) {
                handleCallbackUser()
                setOpenModalTicker(false)
            }
        } catch (error: any) {
            message.error(error?.response?.data?.message)
        }
        handleLoading(false)
    }

    return (
        <div className='h-screen fixed top-0 left-0 w-full bg-[#0f1924]'>

            <div className="absolute top-2 left-2 cursor-pointer z-[999]" onClick={() => navigate('/activity')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 text-[#fff]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </div>



            <section className="breadcrumb relative h-[25vw]">
                <div className="breadcrumb__overlay absolute w-full h-full">
                    <img
                        className='w-full h-full'
                        src="https://demo7.speedcode.online/assets/images/frontend/breadcrumb/658acd3f282ad1703595327.png"
                        alt="overlay-image"
                    />
                </div>

            </section>

            <section className="py-100  p-2 mt-[5vw]">
                <div className="game--card">
                    <div className="mine-box-wrapper" >
                        {Array.from({ length: 9 }).map((_, index) => (
                            <div key={index} className="mine-box mineBox gold-box " id={`mine${index + 1}`}
                                onClick={() => {
                                    // return message.warning("Open on Monday")
                                    handleMine(index)
                                }}
                            >
                                {
                                    index === activeIndex && itemWinner ?
                                        <div className="mine-box-wrapper" key={index}>
                                            <div className={clsx("mine-box-front", {
                                                "border-[2px] border-yellow-500": index === activeIndex
                                            })}>
                                                <img
                                                    src={itemWinner?.img}
                                                    alt="image"
                                                    className='animation-bounceCard !w-[50px] !h-[50px]'

                                                />
                                                {
                                                    itemWinner?.label &&
                                                    <div className='text-[15px] text-[#fff]'>
                                                        {itemWinner?.label}
                                                    </div>
                                                }
                                            </div>
                                            <div className="mine-box-hidden" />
                                        </div>
                                        :
                                        itemWinner ?

                                            <RandomReward key={index} />
                                            :
                                            <div className="mine-box-wrapper" key={index}>
                                                <div className="mine-box-front">
                                                    <img
                                                        src="https://demo7.speedcode.online/assets/templates/sunfyre/images/mines/box.png"
                                                        alt="image"
                                                        className='animation-bounceCard'
                                                    />
                                                </div>
                                                <div className="mine-box-hidden" />
                                            </div>
                                }

                            </div>
                        ))}
                    </div>


                </div>
            </section>
            <div className='flex justify-between px-4 items-center '>
                <div className='text-[#fff] flex items-center gap-2'>
                    <img src={"https://demo7.speedcode.online/assets/templates/sunfyre/images/mines/box.png"} width={20} />
                    <label>{t("Miễn phí")}:</label>
                    <div>{user?.mineNum || 0}</div>
                </div>
                <div className='text-[#fff] flex items-center gap-1'>
                    <img src={rw3} width={20} />
                    <div>{user?.duckSticker || 0}/10</div>
                    <div className='text-[14px] font-[900]' style={{
                        cursor: 'pointer'
                    }} onClick={() => {
                        if (!user || !user?.duckSticker || user?.duckSticker < 10) return
                        setOpenModalTicker(true)
                    }}>
                        <img src="https://img.icons8.com/?size=100&id=13140&format=png&color=000000" width={20} />
                    </div>
                </div>
                <div className='text-[#fff] flex items-center gap-2'>
                    <label>
                        {t("Số dư")}:</label>
                    <div>
                        {user?.realBalance?.toLocaleString()}$
                    </div>

                </div>

            </div>

            <div className="winner " style={{ display: openModaTicker ? "block" : "none" }}
            >
                <div className="winner_container !w-[90vw] relative">
                    <div className='absolute top-0 right-10'
                        onClick={() => setOpenModalTicker(false)}
                    >
                        <div className="absolute top-2 left-2 cursor-pointer " >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>

                        </div>
                    </div>
                    <h3 className="congratulation">
                        {t("Congratulations")}!
                    </h3>
                    <p className="congratulation_pera">

                        {t("Xác nhận đổi 1 vịt 5 ngày")}
                    </p>


                    <div style={{ textAlign: "center" }} className="mt-3">
                        <button className="recBtn" onClick={() => handlePostGift()}>
                            OK
                        </button>
                    </div>

                </div>

            </div>

            <Modal
                title={t("Rương thưởng")}
                open={openModalReward} footer={null} width={250} onCancel={() => setOpenModaReward(false)} centered>
                <hr />
                <div className='py-5 grid grid-cols-2 gap-2'>
                    <div className='flex  items-center'>
                        <div className='mr-1'>1.</div>
                        <div className='font-[700] text-[#aaa]'>x1 </div>
                        <div>
                            <img src={rw3} width={25} />
                        </div>
                    </div>
                    <div className='flex  items-center'>
                        <div className='mr-1'>2.</div>
                        <div className='font-[700] text-[#aaa]'>+0.1$</div>
                        <div>
                            <img src={"https://demo5.speedcode.online/public/coin (2).png"} width={25} />
                        </div>
                    </div>
                    <div className='flex  items-center'>
                        <div className='mr-1'>3.</div>
                        <div className='font-[700] text-[#aaa]'>x2 </div>
                        <div>
                            <img src={rw3} width={25} />
                        </div>
                    </div>
                    <div className='flex  items-center'>
                        <div className='mr-1'>4.</div>
                        <div className='font-[700] text-[#aaa]'>+0.15$</div>
                        <div>
                            <img src={"https://demo5.speedcode.online/public/coin (2).png"} width={25} />
                        </div>
                    </div>
                    <div className='flex  items-center'>
                        <div className='mr-1'>3.</div>
                        <div className='font-[700] text-[#aaa]'>x5 </div>
                        <div>
                            <img src={rw3} width={25} />
                        </div>
                    </div>
                    <div className='flex  items-center'>
                        <div className='mr-1'>6.</div>
                        <div className='font-[700] text-[#aaa]'>+0.2$</div>
                        <div>
                            <img src={"https://demo5.speedcode.online/public/coin (2).png"} width={25} />
                        </div>
                    </div>

                    <div className='flex  items-center'>
                        <div className='mr-1'>7.</div>
                        <div>
                            <img src={rw2} width={25} />
                        </div>

                    </div>
                    <div className='flex  items-center'>
                        <div className='mr-1'>8.</div>
                        <div className='font-[700] text-[#aaa]'>+0.5$</div>
                        <div>
                            <img src={"https://demo5.speedcode.online/public/coin (2).png"} width={25} />
                        </div>
                    </div>
                </div>
            </Modal>
            <div className=' px-4 mt-5 h-[200px] overflow-y-scroll pb-[100px] no-scollbar'>
                <h4 className='text-[#ccc] text-center font-[700] justify-center flex items-center gap-2'>{t("Quy tắc")}

                    <div className=" cursor-pointer" onClick={() => setOpenModaReward(true)} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>

                    </div>

                </h4>
                <hr className='#8888' />
                {
                    i18n?.language === 'vi' &&

                    <p className='text-[#ccc] text-[12px] mt-5'>
                        -  Mỗi ngày, người chơi sẽ nhận được một lượt mở rương miễn phí nếu đang sở hữu vé chơi (Ticket vịt).<br />
                        - Trường hợp không có vé, bạn có thể mở rương với chi phí 0.2$.<br />
                        - Bên trong rương chứa nhiều phần thưởng hấp dẫn. Khi bạn thu thập đủ 10 biểu tượng "Vịt", bạn sẽ nhận được 1 Ticket Vịt 5 ngày miễn phí.<br />
                        -  Ngoài ra, bạn cũng sẽ được tặng thêm 1 lượt chơi miễn phí mỗi khi nạp 5$ vào tài khoản.</p>
                }
                {
                    i18n?.language === 'en' &&

                    <p className='text-[#ccc] text-[12px] mt-5'>
                        - Each day, players will receive one free chest opening if they own a Duck Ticket.<br />
                        - If you don't have a ticket, you can open a chest for $0.2.<br />
                        - The chest contains many exciting rewards. Collect 10 "Duck" icons to receive a free 5-day Duck Ticket.<br />
                        - Additionally, you will receive 1 free play for every $5 top-up to your account.
                    </p>

                }
                {
                    i18n?.language === 'zh' &&
                    <p className='text-[#ccc] text-[12px] mt-5'>
                        - 每天，拥有鸭子门票的玩家将获得一次免费开宝箱的机会。<br />
                        - 如果没有门票，可以支付 $0.2 开启宝箱。<br />
                        - 宝箱中含有多种丰厚奖励。收集满 10 个“鸭子”图标可获得一个免费的 5 天鸭子门票。<br />
                        - 此外，每充值 $5 元，您还将获得一次免费游戏机会。
                    </p>
                }
            </div>
        </div>
    )
}

export default Treasure