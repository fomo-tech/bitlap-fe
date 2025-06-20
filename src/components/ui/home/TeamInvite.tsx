import { Drawer, Tabs } from 'antd'
import requestService from 'api/request'
import { formatNumber } from 'lib/helpers'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import MemberItem from '../MemberItem'


const TeamInvite = () => {
    const { t } = useTranslation()
    const [summary, setSummary] = useState<any>()



    const getSummaryTeam = async () => {
        try {
            const res = await requestService.get('/profile/summary-team')
            if (res && res?.data) {
                setSummary(res.data?.data)
            }

        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        }
    }

    useEffect(() => {
        getSummaryTeam()
    }, [])
    return (
        <>
            <div className="team-header px-[20px] py-[20px] bg-[#1a1a1a] rounded-[16px] shadow-lg text-white mb-[24px]">
                <div className="team-card flex flex-col justify-between gap-[20px] md:items-stretch">
                    {/* Tổng quan thành viên */}
                    <div className="team-overview flex-1 space-y-[16px] flex flex-col justify-between bg-[#1a1a1a]">
                        <div className="total-count flex flex-col items-center justify-center">
                            <p className="text-[14px] text-gray-400 mb-[4px]">{t("Total team members")}</p>
                            <p className="text-[24px] font-bold text-[#cca354]">{summary?.totalTeamMembers}</p>
                        </div>
                        <div className="level-counts flex gap-[16px] justify-center">
                            {[
                                { label: "F1", value: summary?.levelA?.length },
                                { label: "F2", value: summary?.levelB?.length },
                                { label: "F3", value: summary?.levelC?.length },
                            ].map((lvl, idx) => (
                                <div key={idx} className="flex flex-col items-center bg-[#2b2b2b] px-[16px] py-[12px] rounded-[12px] min-w-[80px]">
                                    <p className="text-[18px] font-semibold text-[#cca354]">{lvl.value}</p>
                                    <p className="text-[13px] text-gray-400">{lvl.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Thu nhập */}
                    <div className="team-earnings flex-1 flex flex-col justify-between bg-[#1a1a1a]">
                        <div className="flex gap-[16px] h-full md:items-stretch">
                            {[
                                { label: t("Total earnings"), value: formatNumber(summary?.totalEarningValue?.toLocaleString()) },
                                { label: t("Today's earnings"), value: formatNumber(summary?.totalEarningValueToday?.toLocaleString()) },
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex-1 flex flex-col justify-center text-center bg-[#2b2b2b] px-[20px] py-[12px] rounded-[12px]">
                                    <p className="text-[18px] font-semibold text-[#cca354]">{item.value}</p>
                                    <p className="text-[13px] text-gray-400 mt-[4px]">{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


            {/* Tabs custom style */}
            <Tabs
                defaultActiveKey="a"
                className="custom-tab-team"
                centered
                items={[
                    {
                        key: "a",
                        label: (
                            <span className="tab-label px-[14px] py-[6px] text-[16px] font-semibold">
                                Bạn bè F1
                            </span>
                        ),
                        children: (
                            <div className="member-list py-[12px]">
                                {summary?.levelA?.map((i: any, index: number) => (
                                    <MemberItem key={index} {...i} />
                                ))}
                                {!summary?.levelA?.length && (
                                    <div className="text-center text-[#aaa]">No Member</div>
                                )}
                            </div>
                        ),
                    },
                    {
                        key: "b",
                        label: (
                            <span className="tab-label px-[14px] py-[6px] text-[16px] font-semibold">
                                Bạn bè F2
                            </span>
                        ),
                        children: (
                            <div className="member-list py-[12px]">
                                {summary?.levelB?.map((i: any, index: number) => (
                                    <MemberItem key={index} {...i} />
                                ))}
                                {!summary?.levelB?.length && (
                                    <div className="text-center text-[#aaa]">No Member</div>
                                )}
                            </div>
                        ),
                    },
                    {
                        key: "c",
                        label: (
                            <span className="tab-label px-[14px] py-[6px] text-[16px] font-semibold">
                                Bạn bè F3
                            </span>
                        ),
                        children: (
                            <div className="member-list py-[12px]">
                                {summary?.levelC?.map((i: any, index: number) => (
                                    <MemberItem key={index} {...i} />
                                ))}
                                {!summary?.levelC?.length && (
                                    <div className="text-center text-[#aaa]">No Member</div>
                                )}
                            </div>
                        ),
                    },
                ]}
            />

        </>


    )
}

export default TeamInvite