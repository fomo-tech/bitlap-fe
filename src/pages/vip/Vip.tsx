import requestService from 'api/request'
import VipReward from 'components/ui/VipReward'
import { formatNumber } from 'lib/helpers'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuthApp } from 'store/useAuthApp'
import { useGlobalAppStore } from 'store/useGlobalApp'
import { RulesTranlate } from './RulesTranlate'

const Vip = () => {
    const navigate = useNavigate()
    const { user } = useAuthApp()

    const [openVipReward, setOpenVipReward] = useState(false)
    const [data, setData] = useState<any>(null)
    const {t} = useTranslation()

    const getVipInfo = async () => {
        try {
            const res = await requestService.get('/profile/vip-info')
            if (res && res.data) {
                setData(res.data?.data)
            }
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getVipInfo()
    }, [])


    return (
        <div data-v-f443897c="" className="vip-page">
            <div data-v-f443897c="" className="nav-bar">
                <div data-v-f443897c="" className="nav-left"
                    onClick={() => navigate(-1)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer text-[#fff] hover:text-[#fff]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </div>
                <div data-v-f443897c="" className="nav-title">
                    VIP
                </div>
                <div data-v-f443897c="" className="nav-right" />
            </div>
            <div data-v-f443897c="" className="vip-header">
                <div data-v-f443897c="" className="vip-card">
                    <div data-v-f443897c="" className="vip-info">
                        <div data-v-f443897c="" className="current-level">
                            <span data-v-f443897c="" className="label">
                                {t("Current level")}
                            </span>
                            <span data-v-f443897c="" className="level">
                                VIP {user?.vip}
                            </span>
                        </div>
                        <div data-v-f443897c="" className="invite-progress">
                            <div data-v-f443897c="" className="progress-info">
                                <span data-v-f443897c="">
                                    {t("Invitation progress")}
                                </span>
                                <span data-v-f443897c="">{data?.progress}/{data?.vipLevelUp?.invite_num}</span>
                            </div>
                            <div data-v-f443897c="" className="progress-track">
                                <div
                                    data-v-f443897c=""
                                    className="progress-fill"
                                    style={{ width: `${data?.progress * 100 / data?.vipLevelUp?.invite_num}%` }}
                                />
                            </div>
                            <div data-v-f443897c="" className="action-buttons">
                                <button
                                    data-v-f443897c=""
                                    type="button"
                                    className="van-button van-button--primary van-button--small"
                                    onClick={() => setOpenVipReward(true)}
                                >
                                    <div className="van-button__content">
                                        <i className="van-badge__wrapper van-icon van-icon-cash-back van-button__icon">
                                            {/**/}
                                            {/**/}
                                            {/**/}
                                        </i>
                                        <span className="van-button__text">
                                            {t("View reward")}
                                        </span>
                                        {/**/}
                                    </div>
                                </button>
                            </div>
                        </div>
                        <VipReward
                            open={openVipReward}
                            setOpen={setOpenVipReward}
                            vipInfo={data?.vipInfo}
                            progress={data?.progress}
                        />
                    </div>
                    <div data-v-f443897c="" className="vip-benefits">
                        <div data-v-f443897c="" className="benefit-item">
                            <span data-v-f443897c="" className="value">
                                {data?.progress || 0}
                            </span>
                            <span data-v-f443897c="" className="label ">
                                {t("Total Invited")}
                            </span>
                        </div>
                        <div data-v-f443897c="" className="benefit-item">
                            <span data-v-f443897c="" className="value">
                                {formatNumber(user?.totalDep)}
                            </span>
                            <span data-v-f443897c="" className="label">
                                {t("Total deposit")}
                            </span>
                        </div>
                        <div data-v-f443897c="" className="benefit-item">
                            <span data-v-f443897c="" className="value">
                                {formatNumber(user?.totalReceiveSalary)}
                            </span>
                            <span data-v-f443897c="" className="label">
                                {t("Total Receive")}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <RulesTranlate/>
        </div>

    )
}

export default Vip