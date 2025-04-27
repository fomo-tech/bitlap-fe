import { message, Modal } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuthApp } from 'store/useAuthApp'
import rw3 from 'assets/icons/duck.png'
import rw2 from 'assets/icons/clover.png'
const Treasure = () => {
    const navigate = useNavigate()
    const { t, i18n } = useTranslation()
    const { user } = useAuthApp()
    const [openModalReward, setOpenModaReward] = useState(false)
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
                    <div className="mine-box-wrapper" onClick={()=>message.warning("Coming soon")}>
                        <div className="mine-box mineBox gold-box" id="mine1">
                            <div className="mine-box-wrapper">
                                <div className="mine-box-front">
                                    <img
                                        src="https://demo7.speedcode.online/assets/templates/sunfyre/images/mines/box.png"
                                        alt="image"
                                    />
                                </div>
                                <div className="mine-box-hidden" />
                            </div>
                        </div>
                        <div className="mine-box mineBox gold-box" id="mine2">
                            <div className="mine-box-wrapper">
                                <div className="mine-box-front">
                                    <img
                                        src="https://demo7.speedcode.online/assets/templates/sunfyre/images/mines/box.png"
                                        alt="image"
                                    />
                                </div>
                                <div className="mine-box-hidden" />
                            </div>
                        </div>
                        <div className="mine-box mineBox gold-box" id="mine3">
                            <div className="mine-box-wrapper">
                                <div className="mine-box-front">
                                    <img
                                        src="https://demo7.speedcode.online/assets/templates/sunfyre/images/mines/box.png"
                                        alt="image"
                                    />
                                </div>
                                <div className="mine-box-hidden" />
                            </div>
                        </div>
                        <div className="mine-box mineBox gold-box" id="mine4">
                            <div className="mine-box-wrapper">
                                <div className="mine-box-front">
                                    <img
                                        src="https://demo7.speedcode.online/assets/templates/sunfyre/images/mines/box.png"
                                        alt="image"
                                    />
                                </div>
                                <div className="mine-box-hidden" />
                            </div>
                        </div>
                        <div className="mine-box mineBox gold-box" id="mine5">
                            <div className="mine-box-wrapper">
                                <div className="mine-box-front">
                                    <img
                                        src="https://demo7.speedcode.online/assets/templates/sunfyre/images/mines/box.png"
                                        alt="image"
                                    />
                                </div>
                                <div className="mine-box-hidden" />
                            </div>
                        </div>
                        <div className="mine-box mineBox gold-box" id="mine6">
                            <div className="mine-box-wrapper">
                                <div className="mine-box-front">
                                    <img
                                        src="https://demo7.speedcode.online/assets/templates/sunfyre/images/mines/box.png"
                                        alt="image"
                                    />
                                </div>
                                <div className="mine-box-hidden" />
                            </div>
                        </div>
                        <div className="mine-box mineBox gold-box" id="mine7">
                            <div className="mine-box-wrapper">
                                <div className="mine-box-front">
                                    <img
                                        src="https://demo7.speedcode.online/assets/templates/sunfyre/images/mines/box.png"
                                        alt="image"
                                    />
                                </div>
                                <div className="mine-box-hidden" />
                            </div>
                        </div>
                        <div className="mine-box mineBox gold-box" id="mine8">
                            <div className="mine-box-wrapper">
                                <div className="mine-box-front">
                                    <img
                                        src="https://demo7.speedcode.online/assets/templates/sunfyre/images/mines/box.png"
                                        alt="image"
                                    />
                                </div>
                                <div className="mine-box-hidden" />
                            </div>
                        </div>
                        <div className="mine-box mineBox gold-box" id="mine9">
                            <div className="mine-box-wrapper">
                                <div className="mine-box-front">
                                    <img
                                        src="https://demo7.speedcode.online/assets/templates/sunfyre/images/mines/box.png"
                                        alt="image"
                                    />
                                </div>
                                <div className="mine-box-hidden" />
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <div className='flex justify-between px-4 items-center'>
                <div className='text-[#fff] flex items-center gap-2'>
                    <img src={"https://demo7.speedcode.online/assets/templates/sunfyre/images/mines/box.png"} width={20} />
                    <label>{t("Miễn phí")}:</label>
                    <div>0</div>
                </div>
                <div className='text-[#fff] flex items-center gap-1'>
                    <img src={rw3} width={20} />
                    <div>0</div>
                </div>
                <div className='text-[#fff] flex items-center gap-2'>
                    <label>
                        {t("Số dư")}:</label>
                    <div>
                        {user?.realBalance?.toLocaleString()}$
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