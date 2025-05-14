import { Drawer, message } from 'antd'
import requestService from 'api/request'
import clsx from 'clsx'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAuthApp } from 'store/useAuthApp'
import { useGlobalAppStore } from 'store/useGlobalApp'

interface IVipInfo {
    "id": number,
    "lv": number,
    "invite_num": number,
    "dividend": number,
    "product_profit": number,
    "level_up_money": number,
    "wage": number
}


interface Props {
    setOpen: (val: boolean) => void,
    open: boolean,
    vipInfo: IVipInfo,
    progress: number | 0
}


const AgencyReward = ({ open, setOpen, vipInfo, progress }: Props) => {
    const { t } = useTranslation()
    const { user } = useAuthApp()
    const { configApp, handleCallbackUser } = useGlobalAppStore()

    const today = new Date();
    const isCheckClaim = today.getDate() >= 1 && today.getDate() <= 10

    const handleClaimSalary = async () => {
        try {
            const res = await requestService.post('/profile/receive-salary')
            if (res && res.data) {
                message.success("Claimed")
                handleCallbackUser()
            }
        } catch (error: any) {
            message.error(error?.response?.data?.message)
        }
    }

    return (
        <Drawer
            title={
                <div className='text-center'>
                    {t("Thưởng đại lý")}
                </div>
            }
            placement={'right'}
            style={{
                background: "#fff"
            }}
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
            <div data-v-0c054b6c="" className="page-content pb-[10rem]">
                <div data-v-0c054b6c="" className="current-level">
                    <div data-v-0c054b6c="" className="level-info">
                        <span data-v-0c054b6c="" className="label">
                            {t("Cấp")}
                        </span>
                        <span data-v-0c054b6c="" className="value">
                            Agency {user?.vip}
                        </span>
                    </div>
                    <div data-v-0c054b6c="" className="level-icon">
                        <i
                            data-v-0c054b6c=""
                            className="van-badge__wrapper van-icon van-icon-medal-o"
                        >
                            {/**/}
                            {/**/}
                            {/**/}
                        </i>
                    </div>
                </div>
                <div data-v-0c054b6c="" className="salary-list">
                    {
                        user && configApp?.vipList?.map((i: IVipInfo, index: number) => (
                            <div data-v-0c054b6c="" className={clsx("salary-item ", {
                                "active": user && user.vip >= i.lv
                            })} key={index}>
                                <div data-v-0c054b6c="" className="item-content ">
                                    <div data-v-0c054b6c="" className="level-badge">
                                        <span data-v-0c054b6c="" className="badge-text">
                                            Cấp {i.lv}
                                        </span>
                                    </div>
                                    <div data-v-0c054b6c="" className="salary-info">
                                        <div data-v-0c054b6c="" className="amount">
                                            <span data-v-0c054b6c="" className="value">
                                                {i.wage} USD
                                            </span>
                                            <span data-v-0c054b6c="" className="unit">
                                                /{t("month")}
                                            </span>
                                        </div>
                                    </div>
                                    <div data-v-0c054b6c="" className="status">
                                        {
                                            user && user.vip >= i.lv ?
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-[#07c160]">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                                </svg>

                                                :

                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                                </svg>
                                        }

                                    </div>
                                </div>
                                <div data-v-0c054b6c="" className="progress-bar">
                                    <div data-v-0c054b6c="" className="progress-info">
                                        <span data-v-0c054b6c="" className="progress-text">
                                            {t("Invitation progress")}
                                        </span>
                                        <span data-v-0c054b6c="" className="progress-numbers">
                                            {user.vip >= i.lv ? i.invite_num : progress || 0}/{i.invite_num}
                                        </span>
                                    </div>
                                    <div data-v-0c054b6c="" className="progress-track">
                                        <div
                                            data-v-0c054b6c=""
                                            className="progress-fill"
                                            style={{ width: user.vip >= i.lv ? "100%" : `${progress * 100 / i.invite_num}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div data-v-0c054b6c="" className="bottom-button !absolute">
                <button
                    disabled={!isCheckClaim}
                    onClick={handleClaimSalary}
                    data-v-0c054b6c=""
                    type="button"
                    className={clsx("w-full text-[#fff] van-button van-button--primary van-button--normal van-button--block", {

                    })}
                    style={{
                        background: !isCheckClaim ? "#cccc" : ""
                    }}
                >
                    <div className="van-button__content">
                        {/**/}
                        <span className="van-button__text">
                            {t("Receive reward")}
                        </span>
                        {/**/}
                    </div>
                </button>
            </div>

        </Drawer>
    )
}

export default AgencyReward