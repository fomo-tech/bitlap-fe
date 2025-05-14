import React, { useState } from 'react'
import coin_icon from 'assets/images/tu.webp'
import { useNavigate } from 'react-router-dom'
import { message, Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import requestService from 'api/request'
import { useGlobalAppStore } from 'store/useGlobalApp'
import { useAuthApp } from 'store/useAuthApp'
import ques from 'assets/images/home_advertising_tips_icon.png'
import dolar from 'assets/images/dollar.png'
import bg_btn from 'assets/images/time_reward_btn1_sel.png'
const DailyCheckin = () => {
    const { t, i18n } = useTranslation()
    const navigate = useNavigate()
    const [openRule, setOpenRule] = useState(false)
    const { configApp, handleCallbackUser } = useGlobalAppStore()
    const { user } = useAuthApp()

    const handleCheckin = async () => {
        if (user?.isCheckinToday) return
        try {
            const res = await requestService.post('/checkin')
            if (res && res.data) {
                handleCallbackUser()
            }
        } catch (error: any) {
            message.error(error?.response?.data?.message)
        }
    }

    return (
        <div data-v-11ffe290="" className="mian h-screen  w-full ">
            <Modal
                title={
                    <h4 className='text-center text-[4.5rem]'>{t("Quy tắc nhận thưởng mỗi ngày")}</h4>
                }
                open={openRule} footer={null} onCancel={() => setOpenRule(false)} width={400} centered>

                {i18n.language === 'vi' && (
                    <div className="con m-b-5">
                        <p>
                            <strong>1. ✅ Vui lòng check-in mỗi ngày</strong> để nhận phần thưởng.<br />
                            <em>Lưu ý: Nếu bạn quên check-in hôm nay, bạn sẽ mất đi 1 phần thưởng.</em>
                        </p>

                        <p><strong>2. 💰 Điều kiện mở tính năng check-in hằng ngày:</strong></p>
                        <ul>
                            <li>
                                - Tài khoản của bạn phải có <strong>tổng số tiền nạp lớn hơn 10 USD</strong> mới được check-in liên tục.
                                Nếu không, bạn chỉ có thể check-in <strong>tối đa 3 ngày liên tiếp</strong>.
                            </li>
                        </ul>

                        <p>
                            <strong>3. 🎁 Mẹo:</strong> Hãy thường xuyên kiểm tra và mời bạn bè để không bỏ lỡ bất kỳ phần thưởng nào nhé!
                        </p>
                    </div>
                )}

                {i18n.language === 'zh' && (
                    <div className="con m-b-5">
                        <p>
                            <strong>1. ✅ 请每天签到</strong>以领取奖励。<br />
                            <em>注意：如果您今天忘记签到，将会失去一个奖励。</em>
                        </p>

                        <p><strong>2. 💰 开启每日签到功能的条件：</strong></p>
                        <ul>
                            <li>
                                - 您的账户<strong>总充值金额需超过10美元</strong>才能连续签到。
                                否则，您<strong>最多只能连续签到3天</strong>。
                            </li>
                        </ul>

                        <p>
                            <strong>3. 🎁 小贴士：</strong>请经常查看并邀请好友，以免错过任何奖励！
                        </p>
                    </div>
                )}
                {i18n.language === 'en' && (
                    <div className="con m-b-5">
                        <p>
                            <strong>1. ✅ Please check in daily</strong> to receive your reward.<br />
                            <em>Note: If you forget to check in today, you will lose one reward.</em>
                        </p>

                        <p><strong>2. 💰 Condition to unlock the daily check-in feature:</strong></p>
                        <ul>
                            <li>
                                - Your account must have a <strong>total deposit greater than 10 USD</strong> to enable continuous check-ins.
                                Otherwise, you can only check in for a <strong>maximum of 3 consecutive days</strong>.
                            </li>
                        </ul>

                        <p>
                            <strong>3. 🎁 Tip:</strong> Check regularly and invite your friends so you don’t miss any rewards!
                        </p>
                    </div>
                )}



            </Modal>
            <div data-v-11ffe290="" className="check-box h-full px-[5px]">
                <div data-v-11ffe290="" className="check-header c-tc relative">
                    <div onClick={() => navigate(-1)} className='absolute top-2 left-2 cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#fff]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>

                    </div>
                    <h4 data-v-11ffe290="" className="tit text-center mb-5 !text-[4rem] flex items-center gap-2 justify-center">
                        {t("Checkin hôm nay")}
                        <span className='cursor-pointer' onClick={() => setOpenRule(true)}>
                            <img src={ques} width={25} />
                        </span>
                    </h4>

                </div>
                <div data-v-11ffe290="" className="list grid grid-cols-3 gap-[5px] !my-3">
                    {
                        configApp?.checkIn?.map((i: any, index: number) => (
                            <div
                                style={{
                                    opacity: index < (user?.checkInToday || 0) ? "0.6" : "1"
                                }}
                                key={i} data-v-11ffe290="" data-dpr={1} className="item action cursor-pointer" >
                                {/**/}
                                <div className='flex gap-2 items-center'>
                                    <div data-v-11ffe290="" className="num c-row c-row-middle c-row-center">
                                        {" "}
                                        {i}
                                        {/* <span data-v-11ffe290="" className="des">
                                        $
                                    </span> */}
                                    </div>
                                    <img data-v-11ffe290="" src={dolar} className="img" />
                                </div>
                                <span data-v-11ffe290="" className="txt" >
                                    {index < (user?.checkInToday || 0) ? t("Đã nhận") : t("Ngày") + ` ${index + 1}`}
                                </span>
                                {/**/}
                            </div>
                        ))
                    }


                </div>

                <div className='flex justify-center'>
                    {

                        !user?.isCheckinToday && <div className='max-w-[150px] w-full h-[50px]'
                            onClick={handleCheckin}
                        >
                            <div className='w-full h-full relative cursor-pointer'

                            >
                                <img src={bg_btn} className='w-full h-full' />
                                <div className='absolute w-full h-full top-0 left-0 flex justify-center items-center font-[900]'>
                                    Checkin
                                </div>
                            </div>

                        </div>
                    }

                    {/* <button
                        onClick={handleCheckin}
                        data-v-1ad66f02=""
                        type="button"
                        disabled={user?.isCheckinToday}
                        className={clsx("max-w-[50rem] rounded-[20px] w-full m-auto text-[#fff]  p-[20px] ", {
                            '!bg-[#ccc]': user?.isCheckinToday,

                            "bg-[linear-gradient(45deg,#ff6b6b,#ff3434)]": !user?.isCheckinToday
                        })}
                    >
                        Checkin
                    </button> */}
                </div>
            </div>


        </div>


    )
}

export default DailyCheckin