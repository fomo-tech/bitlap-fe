import requestService from 'api/request'
import { getUrl } from 'lib/helpers'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuthApp } from 'store/useAuthApp'
import { useCopyToClipboard } from '@uidotdev/usehooks'
import { message, Modal, notification } from 'antd'
import QRCode from 'react-qr-code'
import { useGlobalAppStore } from 'store/useGlobalApp'
import clsx from 'clsx'
import TeamInvite from 'components/ui/home/TeamInvite'


const Agency = () => {
    const navigate = useNavigate()
    const { user } = useAuthApp()
    const { configApp, handleCallbackUser } = useGlobalAppStore()
    const [_, copyToClipboard] = useCopyToClipboard();
    const [tab, setTab] = useState<'milestone' | 'list'>('milestone');
    const [openQr, setOpenQr] = useState(false)
    const [data, setData] = useState<any>(null)
    const { t } = useTranslation()

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


    const handleClaimSalary = async () => {
        try {
            const res = await requestService.post('/profile/receive-salary')
            if (res && res.data) {
                notification.success({
                    message: "Claimed",
                    duration: 3,
                    placement: "top"
                })
                // message.success("Claimed")
                handleCallbackUser()
            }
        } catch (error: any) {
            notification.error({
                message: error?.response?.data?.message,
                duration: 3,
                placement: "top"
            })
        }
    }



    return (
        <div className="">

            <Modal
                width={380}
                open={openQr}
                onCancel={() => setOpenQr(false)}
                footer={null}
                centered
                closeIcon={false}
                title={null}
                className="custom-yellow-modal"
            >
                <div className="bg-gradient-to-b from-[#1d1d1d] to-[#0f0f0f] rounded-[16px] p-[16px] shadow-[0_0_20px_rgba(251,191,36,0.4)] text-center">
                    <h2 className="text-yellow-400 text-[20px] font-bold mb-[12px]">BITCOIN LAB</h2>

                    <div className="relative mx-auto p-[8px] rounded-[12px] bg-[#0d0d0d] border border-yellow-500 shadow-[0_0_10px_rgba(251,191,36,0.5)] w-fit">
                        <div className="w-[250px] h-[250px]">
                            <QRCode
                                size={270}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                value={getUrl(`register?r=${user?.refCode}`)}
                                viewBox={`0 0 256 256`}
                            />
                        </div>

                        {/* Góc viền vàng */}
                        <div className="absolute top-0 left-0 w-[10px] h-[10px] border-t-[2px] border-l-[2px] border-yellow-400 rounded-tl-[2px]" />
                        <div className="absolute top-0 right-0 w-[10px] h-[10px] border-t-[2px] border-r-[2px] border-yellow-400 rounded-tr-[2px]" />
                        <div className="absolute bottom-0 left-0 w-[10px] h-[10px] border-b-[2px] border-l-[2px] border-yellow-400 rounded-bl-[2px]" />
                        <div className="absolute bottom-0 right-0 w-[10px] h-[10px] border-b-[2px] border-r-[2px] border-yellow-400 rounded-br-[2px]" />
                    </div>

                    <p className="mt-[16px] text-[14px] text-yellow-300 font-medium tracking-wide">
                        {t("Scan QR code to join")}
                    </p>
                </div>
            </Modal>



            {/* Banner Giới thiệu */}

            <div
                className="text-white px-[24px] mt-[20px] py-[20px] rounded-[24px]"
                style={{
                    background: 'linear-gradient(45deg, #89641b 0%, #a97f30 40%, #cca354 55%, #e5c27a 74%, #f2d79b 100%)',
                }}
            >
                <div className="text-[28px] font-semibold mb-[16px]">
                    Mời bạn bè, cùng nhau nhận thưởng USDT
                </div>

                <div className="flex justify-between text-[16px] font-medium mb-[24px]">
                    <div>
                        <div>Người giới thiệu</div>
                        <div className="text-yellow-300">+0.5 USDT</div>
                        <div className="text-[14px] opacity-80">Cho mỗi lượt mời đã nạp tiền<br />  đầu tiên</div>
                    </div>
                    <div className="text-right">
                        <div>Người mới</div>
                        <div className="text-yellow-300">Giảm 10%</div>
                        <div className="text-[14px] opacity-80">Cho gói đầu tư đầu tiên</div>
                    </div>
                </div>

                {/* Link */}
                <div className="bg-white text-black rounded-[12px] px-[16px] py-[10px] mb-[24px] flex justify-between items-center">
                    <div className="text-[16px] font-medium"> {getUrl(`register?r=${user?.refCode}`)}</div>
                    <div className="flex gap-[12px]">
                        <button
                            className="text-white text-[14px] px-[16px] py-[6px] rounded-[8px]"
                            style={{ backgroundColor: '#89641b' }}
                            onClick={() => {
                                copyToClipboard(getUrl(`register?r=${user?.refCode}`))
                                message.success("Copied")
                            }}
                        >
                            <svg

                                data-v-7e679115=""
                                className="inline-block copy-icon"
                                viewBox="0 0 24 24"
                                width="1.2em"
                                height="1.2em"
                            >
                                <path
                                    fill="currentColor"
                                    d="M19 21H8V7h11m0-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m-3-4H4a2 2 0 0 0-2 2v14h2V3h12z"
                                />
                            </svg>
                        </button>
                        <button className="bg-gray-200 px-[12px] py-[6px] rounded-[8px]"
                            onClick={() => setOpenQr(true)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
                            </svg>

                        </button>
                    </div>
                </div>



                <div className="text-[14px] mb-[24px]">

                    <div className="flex items-start gap-[8px] mb-4">
                        <span className="">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                            </svg>

                        </span>
                        <span>Lời mời hợp lệ cho người dùng đã nạp tối thiểu 5 usdt</span>
                    </div>
                    <div className="flex items-start gap-[8px] mb-[12px]">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                            </svg>

                        </span>
                        <span>Cấp trên nhận hoa hồng 3 cấp: 10% (F1), 5% (F2), 2% (F3) khi cấp dưới mua gói hoặc trade bất kể thắng thua.</span>
                    </div>
                </div>

            </div>

            {/* Phần Thưởng */}
            <div className="bg-[#1c1c1c] text-white px-[24px] py-[20px] pb-[100px]">
                <div className="text-[20px] font-semibold mb-[24px]">Bạn bè</div>

                <div className="flex gap-[20px] text-[16px] font-medium mb-[16px]">
                    <div
                        onClick={() => setTab('milestone')}
                        className={`cursor-pointer pb-[4px] ${tab === 'milestone' ? 'text-[#cca354] border-b-[2px]' : 'text-gray-400'
                            }`}
                        style={tab === 'milestone' ? { borderColor: '#cca354' } : {}}
                    >
                        Thưởng cán mốc
                    </div>
                    <div
                        onClick={() => setTab('list')}
                        className={`cursor-pointer pb-[4px] ${tab === 'list' ? 'text-[#cca354] border-b-[2px]' : 'text-gray-400'
                            }`}
                        style={tab === 'list' ? { borderColor: '#cca354' } : {}}
                    >
                        Danh sách
                    </div>
                </div>
                {
                    tab === 'milestone' &&
                    <>
                        <div className="mb-[16px] flex items-center gap-4 text-[16px]">
                            Phần thưởng tiếp theo: <span className="font-semibold">{data?.vipLevelUp?.wage} USDT</span>
                            <button
                                disabled={!user || user?.agencyReward >= user.vip}
                                onClick={handleClaimSalary}
                                className={clsx(
                                    "inline-flex items-center gap-[8px] text-[14px] font-semibold px-[10px] py-[3px] rounded-full transition-all duration-200 shadow-md",
                                    user && user?.agencyReward < user.vip
                                        ? "text-black bg-gradient-to-r from-[#f9d776] to-[#cca354] hover:from-[#ffd77f] hover:to-[#e6b95f] hover:shadow-lg"
                                        : "bg-gray-700 text-gray-400 cursor-not-allowed opacity-60"
                                )}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-[18px] h-[18px]"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                                    />
                                </svg>
                                Nhận
                            </button>

                        </div>

                        <div className="w-full bg-gray-700 h-[8px] rounded-full mb-[12px]">
                            <div
                                className="h-[8px] rounded-full"
                                style={{ backgroundColor: '#cca354', width: `${data?.progress * 100 / data?.vipLevelUp?.invite_num}%` }}
                            />
                        </div>
                        <div className="text-[14px] mb-[24px]">{data?.progress} / {data?.vipLevelUp?.invite_num} bạn bè - <span className="text-gray-400">
                            {data?.progress * 100 / data?.vipLevelUp?.invite_num}%</span></div>

                        {/* Timeline */}
                        <div className="relative pl-[5px] border-l-[2px] border-gray-600 space-y-[24px]">
                            {user && configApp?.vipList?.map((i: any, index: number) => {
                                const isActive = i?.lv <= user?.vip;

                                return (
                                    <div key={index} className="relative flex gap-[12px]">
                                        {/* Icon 🎁 */}

                                        <div className={`absolute -left-[20px] top-0 w-[30px] h-[30px] rounded-full border-[2px] flex items-center justify-center 
          ${isActive
                                                ? 'bg-yellow-400 border-yellow-300 text-black shadow-[0_0_10px_rgba(251,191,36,0.5)]'
                                                : 'bg-[#1c1c1e] border-gray-400 text-gray-300'
                                            }`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-[15px] h-[15px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                            </svg>
                                        </div>

                                        {/* Nội dung */}
                                        <div className="ml-[5px] bg-[#121212] px-[16px] py-[12px] rounded-[10px] w-full ">
                                            {user && user.agencyReward >= i.lv && (
                                                <div className="absolute top-[-3px] right-[-3px]">
                                                    <div className="bg-green-500/15 border border-green-400 rounded-full p-[2px] shadow-sm">
                                                        <img
                                                            src="https://s2.coinmarketcap.com/static/cloud/img/loyalty-program/Check.svg"
                                                            alt="claimed"
                                                            className="w-[10px] h-[10px]"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            <div className="flex justify-between text-[14px] font-medium mb-[4px]">
                                                <div className="flex gap-[4px] items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                                                    </svg>
                                                    <span>Bạn bè</span>
                                                </div>
                                                <span>Phần thưởng</span>
                                            </div>
                                            <div className="flex justify-between text-[16px] font-semibold">
                                                <span>{i?.invite_num}</span>
                                                <span className="text-[#cca354]">+{i?.wage} USDT</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Chấm tròn dưới cùng */}
                            <div className="absolute left-[-7px] bottom-[-12px] w-[12px] h-[12px] bg-gray-700 rounded-full" />
                        </div>
                    </>
                }

                {
                    tab === 'list' &&
                    <TeamInvite />
                }

            </div>
        </div>

    );

}

export default Agency