import LuckyMoney from 'pages/activity/components/LuckyMoney'
import home_txt from 'assets/img_custom/color_task_active_icon_1.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthApp } from 'store/useAuthApp'
import store_icon from 'assets/images/farm.png'
import vipFarm from 'assets/img_custom/color_invite_reward_vip_icon1.png'
import service from 'assets/img_custom/my_service_icon_customer.png'
import game_icon from 'assets/img_custom/color_task_items_icon2.png'
import { useGlobalAppStore } from 'store/useGlobalApp'
const RightSidebar = () => {
    const navigate = useNavigate()
    // const { handleToggleModal } = useGlobalAppStore()
    const { pathname } = useLocation()
    const { user } = useAuthApp()
    return (
        <>
            {
                !(pathname === '/order' || pathname.startsWith('/farm/')) && user &&
                <div className="fixed z-[999] bottom-[20%]  sm:bottom-[12%] right-[5px] sm:right-[10%] md:right-[20%] lg:right-[30%] cursor-pointer"

                >

                    <div className="relative">
                        <div className="absolute w-full h-full flex justify-center items-center">
                            <a href='https://t.me/richfarmer_offical' target='_blank'>
                                <img src={game_icon} width={40} className='rounded-full' />
                            </a>
                        </div>
                        <img src={home_txt} width={60} />
                    </div>

                    <LuckyMoney />

                    <div className="relative mb-2" >
                        <div className="absolute w-full h-full flex justify-center items-center" >
                            <img src={vipFarm} width={50} />
                        </div>
                        <img src={home_txt} width={60} />
                    </div>
                    <div className="relative mb-2" onClick={() => window.$crisp?.push(["do", "chat:open"])}>
                        <div className="absolute top-[2px] left-[0.5px] w-full h-full flex justify-center items-center" >
                            <img src={service} width={50} />
                        </div>
                        <img src={home_txt} width={60} />
                    </div>
                </div >
            }
        </>
    )
}

export default RightSidebar