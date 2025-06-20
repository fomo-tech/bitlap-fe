import { hidePhoneNumber } from 'lib/helpers'
import React from 'react'
import { useTranslation } from 'react-i18next'

const MemberItem = (props: any) => {
    const { t } = useTranslation()


    return (
        <div className="member-item bg-[#1f1f1f] rounded-[12px] px-[16px] py-[12px] text-white shadow-md mb-4 flex justify-between items-center">
            {/* Cột trái: Thông tin thành viên */}
            <div className="flex flex-col gap-[6px]">
                <div className="flex items-center gap-[8px] text-[#cca354] text-[16px] font-semibold">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>

                    {hidePhoneNumber(props?.phone)}
                </div>
                <div className="text-[13px] text-gray-400">
                    {new Date(props?.createdAt)?.toLocaleString()}
                </div>
                <div className="text-[14px] text-gray-300">
                    ID: <span className="text-white font-medium">{props?.userId}</span>
                </div>
            </div>

            {/* Cột phải: Đã mời */}
            <div className="flex flex-col items-end text-right">
                <div className="text-[13px] text-gray-400">{t("Đã mời")}</div>
                <div className="text-[20px] text-[#cca354] font-bold leading-none">
                    {props?.inviteUser?.length}
                </div>
            </div>
        </div>


    )
}

export default MemberItem