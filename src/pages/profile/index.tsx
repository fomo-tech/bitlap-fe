import requestService from 'api/request'
import { AddPaymentMethod } from 'components/ui/AddPaymentMethod'
import { DrawerLang } from 'components/ui/DrawerLang'
import TeamInvite from 'components/ui/home/TeamInvite'
import InviteFriend from 'components/ui/InviteFriend'
import RecordUserHistoires from 'components/ui/RecordUserHistory'
import SecurityCenter from 'components/ui/SecurityCenter'
import { formatNumber } from 'lib/helpers'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuthApp } from 'store/useAuthApp'

const Profile = () => {
    const { user } = useAuthApp()
    const navigate = useNavigate()
    const [openLang, setOpenLang] = useState(false)
    const [openAddMethod, setAddMethod] = useState(false)
    const [openInvitefriend, setOpenInviteFriend] = useState(false)
    const [openTeam, setOpenTeam] = useState(false)
    const [openSecurity, setOpenSecurity] = useState(false)
    const [openRecord,setOpenRecord] = useState(false)
    const { t, i18n } = useTranslation();

    const handleLogout = async () => {
        try {
            const res = await requestService.delete('/profile')
            if (res && res.data) {
                localStorage.clear()
                navigate('/login')
            }
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div data-v-4f0a6390="" data-v-e697ea1f="" className="profile-page">
            <div data-v-4f0a6390="" className="user-info">
                <div data-v-4f0a6390="" className="user-header">
                    <div data-v-4f0a6390="" className="avatar-wrapper">
                        <div
                            data-v-4f0a6390=""
                            className="van-image van-image--round"
                            style={{ width: 80, height: 80 }}
                        >
                            <img
                                src="https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png"
                                className="van-image__img"
                            />
                            {/**/}
                            {/**/}
                        </div>
                        <div data-v-4f0a6390="" className="vip-badge">
                            <span data-v-4f0a6390="" className="vip-icon">
                                VIP-{user?.vip}
                            </span>
                        </div>
                    </div>
                    <div data-v-4f0a6390="" className="user-detail">
                        <div data-v-4f0a6390="" className="nickname">
                            {user?.userName}
                        </div>
                        <div data-v-4f0a6390="" className="user-id">
                            ID: {user?.userId}
                        </div>
                    </div>
                    <div data-v-4f0a6390="" className="balance">
                        {t("Số dư")}: {user?.realBalance?.toLocaleString()}
                    </div>
                </div>
                <div data-v-4f0a6390="" className="user-stats bg-[#ddd] opacity-[.8] !p-2.5 rounded-xl">
                    <div data-v-4f0a6390="" className="stat-item">
                        <div data-v-4f0a6390="" className="stat-value">
                            {formatNumber(user?.totalbuyTicket)}
                        </div>
                        <div data-v-4f0a6390="" className="stat-label">
                            {t("Tổng đầu tư")}
                        </div>
                    </div>
                    <div data-v-4f0a6390="" className="divider" />
                    <div data-v-4f0a6390="" className="stat-item">
                        <div data-v-4f0a6390="" className="stat-value">
                            {formatNumber(Number(user?.totalWithdrawValue)?.toFixed(2)?.toLocaleString())}
                        </div>
                        <div data-v-4f0a6390="" className="stat-label">
                            {t("Tổng số tiền rút")}
                        </div>
                    </div>
                    <div data-v-4f0a6390="" className="divider" />
                    <div data-v-4f0a6390="" className="stat-item">
                        <div data-v-4f0a6390="" className="stat-value">
                            {formatNumber(user?.totalRewardToday)}
                        </div>
                        <div data-v-4f0a6390="" className="stat-label">
                            {t("Thu nhập hôm nay")}
                        </div>
                    </div>
                </div>
            </div>
            <InviteFriend
                open={openInvitefriend}
                onClose={() => setOpenInviteFriend(false)}
            />
            <div data-v-4f0a6390="" className="invite-card">
                <div data-v-4f0a6390="" className="invite-content">
                    <div data-v-4f0a6390="" className="invite-text">
                        <div data-v-4f0a6390="" className="title">
                            {t("Mời bạn bè tham gia")}
                        </div>
                        <div data-v-4f0a6390="" className="subtitle">
                            {t("Chia sẻ để nhận thêm phần thưởng")}
                        </div>
                    </div>
                    <button
                        onClick={() => setOpenInviteFriend(true)}
                        data-v-4f0a6390=""
                        type="button"
                        className="van-button van-button--default van-button--small invite-btn !px-2 min-w-[120px] flex justify-center items-center "
                    >
                        <div className="van-button__content w-fit">
                            {/**/}
                            <span className="van-button__text w-full text-center">
                                {t("Mời bạn bè")}
                            </span>
                            {/**/}
                        </div>
                    </button>
                </div>
            </div>
            <div data-v-4f0a6390="" className="action-list">
                <div data-v-4f0a6390="" className="action-group">
                    <RecordUserHistoires
                        open={openRecord}
                        setOpen={setOpenRecord}
                    />
                    <div data-v-4f0a6390="" className="action-item" onClick={()=>setOpenRecord(true)}>
                        <div data-v-4f0a6390="" className="action-left">
                            <svg
                                data-v-4f0a6390=""
                                className="inline-block action-icon"
                                viewBox="0 0 24 24"
                                width="1.2em"
                                height="1.2em"
                                style={{ color: "rgb(25, 137, 250)" }}
                            >
                                <path
                                    fill="currentColor"
                                    d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m9 16v-2H6v2zm3-4v-2H6v2z"
                                />
                            </svg>
                            <span data-v-4f0a6390="">
                                {t("Lịch sử giao dịch")}
                            </span>
                        </div>
                        <i
                            data-v-4f0a6390=""
                            className="van-badge__wrapper van-icon van-icon-arrow"
                        >
                            {/**/}
                            {/**/}
                            {/**/}
                        </i>
                    </div>
                    <div data-v-4f0a6390="" className="action-item" onClick={() => setOpenTeam(true)}>
                        <div data-v-4f0a6390="" className="action-left">
                            <svg
                                data-v-4f0a6390=""
                                className="inline-block action-icon"
                                viewBox="0 0 24 24"
                                width="1.2em"
                                height="1.2em"
                                style={{ color: "rgb(0, 200, 53)" }}
                            >
                                <path
                                    fill="currentColor"
                                    d="M12 5.5A3.5 3.5 0 0 1 15.5 9a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8.5 9A3.5 3.5 0 0 1 12 5.5M5 8c.56 0 1.08.15 1.53.42c-.15 1.43.27 2.85 1.13 3.96C7.16 13.34 6.16 14 5 14a3 3 0 0 1-3-3a3 3 0 0 1 3-3m14 0a3 3 0 0 1 3 3a3 3 0 0 1-3 3c-1.16 0-2.16-.66-2.66-1.62a5.54 5.54 0 0 0 1.13-3.96c.45-.27.97-.42 1.53-.42M5.5 18.25c0-2.07 2.91-3.75 6.5-3.75s6.5 1.68 6.5 3.75V20h-13zM0 20v-1.5c0-1.39 1.89-2.56 4.45-2.9c-.59.68-.95 1.62-.95 2.65V20zm24 0h-3.5v-1.75c0-1.03-.36-1.97-.95-2.65c2.56.34 4.45 1.51 4.45 2.9z"
                                />
                            </svg>
                            <span data-v-4f0a6390="">
                                {t("home.referral")}
                            </span>
                        </div>
                        <i
                            data-v-4f0a6390=""
                            className="van-badge__wrapper van-icon van-icon-arrow"
                        >
                            {/**/}
                            {/**/}
                            {/**/}
                        </i>
                    </div>

                    <TeamInvite
                        open={openTeam}
                        setOpen={setOpenTeam}
                    />
                    <div data-v-4f0a6390="" className="action-item" onClick={() => navigate("/order")}>
                        <div data-v-4f0a6390="" className="action-left">
                            <svg
                                data-v-4f0a6390=""
                                className="inline-block action-icon"
                                viewBox="0 0 24 24"
                                width="1.2em"
                                height="1.2em"
                                style={{ color: "rgb(223, 69, 69)" }}
                            >
                                <path
                                    fill="currentColor"
                                    d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18s-.41-.06-.57-.18l-7.9-4.44A.99.99 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18s.41.06.57.18l7.9 4.44c.32.17.53.5.53.88zM12 4.15L6.04 7.5L12 10.85l5.96-3.35zM5 15.91l6 3.38v-6.71L5 9.21zm14 0v-6.7l-6 3.37v6.71z"
                                />
                            </svg>
                            <span data-v-4f0a6390="">
                                {t("tabbar.earn")}
                            </span>
                        </div>
                        <i
                            data-v-4f0a6390=""
                            className="van-badge__wrapper van-icon van-icon-arrow"
                        >
                            {/**/}
                            {/**/}
                            {/**/}
                        </i>
                    </div>
                </div>
                <div data-v-4f0a6390="" className="action-group">
                    {/* <div data-v-4f0a6390="" className="action-item">
                        <div data-v-4f0a6390="" className="action-left">
                            <svg
                                data-v-4f0a6390=""
                                className="inline-block action-icon"
                                viewBox="0 0 24 24"
                                width="1.2em"
                                height="1.2em"
                                style={{ color: "rgb(25, 137, 250)" }}
                            >
                                <path
                                    fill="currentColor"
                                    d="M10 4a4 4 0 0 0-4 4a4 4 0 0 0 4 4a4 4 0 0 0 4-4a4 4 0 0 0-4-4m7 8a.26.26 0 0 0-.26.21l-.19 1.32c-.3.13-.59.29-.85.47l-1.24-.5c-.11 0-.24 0-.31.13l-1 1.73c-.06.11-.04.24.06.32l1.06.82a4.2 4.2 0 0 0 0 1l-1.06.82a.26.26 0 0 0-.06.32l1 1.73c.06.13.19.13.31.13l1.24-.5c.26.18.54.35.85.47l.19 1.32c.02.12.12.21.26.21h2c.11 0 .22-.09.24-.21l.19-1.32c.3-.13.57-.29.84-.47l1.23.5c.13 0 .26 0 .33-.13l1-1.73a.26.26 0 0 0-.06-.32l-1.07-.82c.02-.17.04-.33.04-.5s-.01-.33-.04-.5l1.06-.82a.26.26 0 0 0 .06-.32l-1-1.73c-.06-.13-.19-.13-.32-.13l-1.23.5c-.27-.18-.54-.35-.85-.47l-.19-1.32A.236.236 0 0 0 19 12zm-7 2c-4.42 0-8 1.79-8 4v2h9.68a7 7 0 0 1-.68-3a7 7 0 0 1 .64-2.91c-.53-.06-1.08-.09-1.64-.09m8 1.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5c-.84 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5"
                                />
                            </svg>
                            <span data-v-4f0a6390="">
                                {t("Cài đặt tài khoản")}
                            </span>
                        </div>
                        <i
                            data-v-4f0a6390=""
                            className="van-badge__wrapper van-icon van-icon-arrow"
                        >
                           
                        </i>
                    </div> */}
                    <div data-v-4f0a6390="" className="action-item" onClick={() => setAddMethod(true)}>
                        <div data-v-4f0a6390="" className="action-left">
                            <svg
                                data-v-4f0a6390=""
                                className="inline-block action-icon"
                                viewBox="0 0 24 24"
                                width="1.2em"
                                height="1.2em"
                                style={{ color: "rgb(65, 56, 229)" }}
                            >
                                <path
                                    fill="currentColor"
                                    d="M11.5 1L2 6v2h19V6m-5 4v7h3v-7M2 22h19v-3H2m8-9v7h3v-7m-9 0v7h3v-7z"
                                />
                            </svg>
                            <span data-v-4f0a6390="">
                                {t("Cài đặt thẻ ngân hàng")}
                            </span>
                        </div>
                        <i
                            data-v-4f0a6390=""
                            className="van-badge__wrapper van-icon van-icon-arrow"
                        >

                        </i>
                    </div>
                    <AddPaymentMethod
                        open={openAddMethod}
                        setOpen={setAddMethod}
                    />
                    <div data-v-4f0a6390="" className="action-item" onClick={() => setOpenSecurity(true)}>
                        <div data-v-4f0a6390="" className="action-left">
                            <svg
                                data-v-4f0a6390=""
                                className="inline-block action-icon"
                                viewBox="0 0 24 24"
                                width="1.2em"
                                height="1.2em"
                                style={{ color: "rgb(7, 193, 96)" }}
                            >
                                <path
                                    fill="currentColor"
                                    d="m10 17l-4-4l1.41-1.41L10 14.17l6.59-6.59L18 9m-6-8L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5z"
                                />
                            </svg>
                            <span data-v-4f0a6390="">
                                {t("Trung tâm bảo mật")}
                            </span>
                        </div>
                        <i
                            data-v-4f0a6390=""
                            className="van-badge__wrapper van-icon van-icon-arrow"
                        >

                        </i>
                    </div>
                    <SecurityCenter
                        open={openSecurity}
                        setOpen={setOpenSecurity}
                    />
                    <div data-v-4f0a6390="" className="action-item" onClick={() => setOpenLang(true)}>
                        <div data-v-4f0a6390="" className="action-left">
                            <svg
                                data-v-4f0a6390=""
                                className="inline-block action-icon"
                                viewBox="0 0 24 24"
                                width="1.2em"
                                height="1.2em"
                                style={{ color: "rgb(156, 39, 176)" }}
                            >
                                <path
                                    fill="currentColor"
                                    d="M22.401 4.818h-9.927L10.927 0H1.599C.72 0 .002.719.002 1.599v16.275c0 .878.72 1.597 1.597 1.597h10L13.072 24H22.4c.878 0 1.597-.707 1.597-1.572V6.39c0-.865-.72-1.572-1.597-1.572zm-15.66 8.68c-2.07 0-3.75-1.68-3.75-3.75s1.68-3.75 3.75-3.75c1.012 0 1.86.375 2.512.976l-.99.952a2.2 2.2 0 0 0-1.522-.584c-1.305 0-2.363 1.08-2.363 2.409S5.436 12.16 6.74 12.16c1.507 0 2.13-1.08 2.19-1.808l-2.188-.002V9.066h3.51c.05.23.09.457.09.764c0 2.147-1.434 3.669-3.602 3.669zm16.757 8.93c0 .59-.492 1.072-1.097 1.072h-8.875l3.649-4.03h.005l-.74-2.302l.006-.005s.568-.488 1.277-1.24c.712.771 1.63 1.699 2.818 2.805l.771-.772c-1.272-1.154-2.204-2.07-2.89-2.805c.919-1.087 1.852-2.455 2.049-3.707h2.034v.002h.002v-.94h-4.532v-1.52h-1.471v1.52H14.3l-1.672-5.21l.006.022h9.767c.605 0 1.097.48 1.097 1.072zm-6.484-7.311c-.536.548-.943.873-.943.873l-.008.004l-1.46-4.548h4.764c-.307 1.084-.988 2.108-1.651 2.904c-1.176-1.392-1.18-1.844-1.18-1.844h-1.222s.05.678 1.7 2.61z"
                                />
                            </svg>
                            <span data-v-4f0a6390="">
                                {t("Ngôn ngữ")}
                            </span>
                        </div>
                        <div data-v-4f0a6390="" className="action-right">
                            {
                                i18n.language === 'vi' &&
                                <span data-v-4f0a6390="" className="action-value">
                                    Tiếng Việt
                                </span>
                            }
                            {
                                i18n.language === 'en' &&
                                <span data-v-4f0a6390="" className="action-value">
                                    English
                                </span>
                            }
                            {
                                i18n.language === 'zh' &&
                                <span data-v-4f0a6390="" className="action-value">
                                    中文
                                </span>
                            }
                            <i
                                data-v-4f0a6390=""
                                className="van-badge__wrapper van-icon van-icon-arrow"
                            >

                            </i>
                        </div>
                    </div>
                    <DrawerLang openLang={openLang} setOpenLang={setOpenLang} />
                    <div data-v-4f0a6390="" className="action-item" onClick={() => window.$crisp?.push(["do", "chat:open"])}>
                        <div data-v-4f0a6390="" className="action-left">
                            <svg
                                data-v-4f0a6390=""
                                className="inline-block action-icon"
                                viewBox="0 0 24 24"
                                width="1.2em"
                                height="1.2em"
                                style={{ color: "rgb(33, 150, 243)" }}
                            >
                                <path
                                    fill="currentColor"
                                    d="M12 1c-5 0-9 4-9 9v7a3 3 0 0 0 3 3h3v-8H5v-2a7 7 0 0 1 7-7a7 7 0 0 1 7 7v2h-4v8h4v1h-7v2h6a3 3 0 0 0 3-3V10c0-5-4.03-9-9-9"
                                />
                            </svg>
                            <span data-v-4f0a6390="">
                                {t("Dịch vụ khách hàng")}
                            </span>
                        </div>
                        <i
                            data-v-4f0a6390=""
                            className="van-badge__wrapper van-icon van-icon-arrow"
                        >
                            {/**/}
                            {/**/}
                            {/**/}
                        </i>
                    </div>
                    {/**/}
                </div>
                <div data-v-4f0a6390="" className="action-group">
                    <div data-v-4f0a6390="" className="action-item logout">
                        <div data-v-4f0a6390="" className="action-left" onClick={handleLogout}>
                            <svg
                                data-v-4f0a6390=""
                                className="inline-block action-icon"
                                viewBox="0 0 24 24"
                                width="1.2em"
                                height="1.2em"
                                style={{ color: "rgb(244, 67, 54)" }}
                            >
                                <path
                                    fill="currentColor"
                                    d="m17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5M4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"
                                />
                            </svg>
                            <span data-v-4f0a6390="">
                                {t("Đăng xuất")}
                            </span>
                        </div>
                        <i
                            data-v-4f0a6390=""
                            className="van-badge__wrapper van-icon van-icon-arrow"
                        >
                            {/**/}
                            {/**/}
                            {/**/}
                        </i>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profile