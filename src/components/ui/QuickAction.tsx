import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Deposit from './Deposit'
import Withdraw from './Withdraw'
import TeamInvite from './home/TeamInvite'

const QuickAction = () => {
    const { t } = useTranslation()
    const [openDeposit, setOpenDeposit] = useState(false)
    const [openWithdraw, setOpenWithdraw] = useState(false)
    const [openTeam, setOpenTeam] = useState(false)
    return (
        <>
            {/* quick-actions          */}
            <Deposit
                open={openDeposit}
                setOpen={setOpenDeposit}
            />

            <Withdraw
                open={openWithdraw}
                setOpen={setOpenWithdraw}
            />

            <TeamInvite
                open={openTeam}
                setOpen={setOpenTeam}
            />

            <div data-v-caee1139="" className="quick-actions">
                <div data-v-caee1139="" className="action-item"
                    onClick={() => setOpenDeposit(true)}
                >
                    <div
                        data-v-caee1139=""
                        className="action-icon"
                        style={{ background: "rgba(25, 137, 250, 0.1)" }}
                    >
                        <svg
                            data-v-caee1139=""
                            className="inline-block"
                            viewBox="0 0 24 24"
                            width="1.2em"
                            height="1.2em"
                            style={{ color: "rgb(25, 137, 250)", width: 24, height: 24 }}
                        >
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M20.41 9.86a3 3 0 0 0-.175-.003H17.8c-1.992 0-3.698 1.581-3.698 3.643s1.706 3.643 3.699 3.643h2.433q.092.001.175-.004a1.7 1.7 0 0 0 1.586-1.581c.004-.059.004-.122.004-.18v-3.756c0-.058 0-.121-.004-.18a1.7 1.7 0 0 0-1.585-1.581m-2.823 4.611c.513 0 .93-.434.93-.971s-.417-.971-.93-.971s-.929.434-.929.971s.416.971.93.971"
                                clipRule="evenodd"
                            />
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M20.234 18.6a.214.214 0 0 1 .214.27c-.194.692-.501 1.282-.994 1.778c-.721.727-1.636 1.05-2.766 1.203c-1.098.149-2.5.149-4.272.149h-2.037c-1.771 0-3.174 0-4.272-.149c-1.13-.153-2.045-.476-2.766-1.203C2.62 19.923 2.3 19 2.148 17.862C2 16.754 2 15.34 2 13.555v-.11c0-1.785 0-3.2.148-4.306C2.3 8 2.62 7.08 3.34 6.351c.721-.726 1.636-1.05 2.766-1.202C7.205 5 8.608 5 10.379 5h2.037c1.771 0 3.174 0 4.272.149c1.13.153 2.045.476 2.766 1.202c.493.497.8 1.087.994 1.78a.214.214 0 0 1-.214.269h-2.433c-2.734 0-5.143 2.177-5.143 5.1s2.41 5.1 5.144 5.1zM5.614 8.886a.725.725 0 0 0-.722.728c0 .403.323.729.722.729H9.47c.4 0 .723-.326.723-.729a.726.726 0 0 0-.723-.728z"
                                clipRule="evenodd"
                            />
                            <path
                                fill="currentColor"
                                d="m7.777 4.024l1.958-1.443a2.97 2.97 0 0 1 3.53 0l1.969 1.451C14.41 4 13.49 4 12.483 4h-2.17c-.922 0-1.769 0-2.536.024"
                            />
                        </svg>
                    </div>
                    <span data-v-caee1139="" className="action-name">
                        {t("home.deposit")}
                    </span>
                </div>
                <div data-v-caee1139="" className="action-item" onClick={()=>setOpenTeam(true)}>
                    <div
                        data-v-caee1139=""
                        className="action-icon"
                        style={{ background: "rgba(255, 151, 106, 0.1)" }}
                    >
                        <svg
                            data-v-caee1139=""
                            className="inline-block"
                            viewBox="0 0 24 24"
                            width="1.2em"
                            height="1.2em"
                            style={{ color: "rgb(255, 151, 106)", width: 24, height: 24 }}
                        >
                            <circle cx="9.001" cy={6} r={4} fill="currentColor" />
                            <ellipse cx="9.001" cy="17.001" fill="currentColor" rx={7} ry={4} />
                            <path
                                fill="currentColor"
                                d="M21 17c0 1.657-2.036 3-4.521 3c.732-.8 1.236-1.805 1.236-2.998c0-1.195-.505-2.2-1.239-3.001C18.962 14 21 15.344 21 17M18 6a3 3 0 0 1-4.029 2.82A5.7 5.7 0 0 0 14.714 6c0-1.025-.27-1.987-.742-2.819A3 3 0 0 1 18 6.001"
                            />
                        </svg>
                    </div>
                    <span data-v-caee1139="" className="action-name">
                        {t("home.referral")}
                    </span>
                </div>
                <div data-v-caee1139="" className="action-item" onClick={() => window.$crisp?.push(["do", "chat:open"])}>
                    <div
                        data-v-caee1139=""
                        className="action-icon"
                        style={{ background: "rgba(7, 193, 96, 0.1)" }}
                    >
                        <svg
                            data-v-caee1139=""
                            className="inline-block"
                            viewBox="0 0 24 24"
                            width="1.2em"
                            height="1.2em"
                            style={{ color: "rgb(7, 193, 96)", width: 24, height: 24 }}
                        >
                            <path
                                fill="currentColor"
                                d="M13 15.4c0-2.074 0-3.111.659-3.756S15.379 11 17.5 11s3.182 0 3.841.644C22 12.29 22 13.326 22 15.4v2.2c0 2.074 0 3.111-.659 3.756S19.621 22 17.5 22s-3.182 0-3.841-.644C13 20.71 13 19.674 13 17.6zM2 8.6c0 2.074 0 3.111.659 3.756S4.379 13 6.5 13s3.182 0 3.841-.644C11 11.71 11 10.674 11 8.6V6.4c0-2.074 0-3.111-.659-3.756S8.621 2 6.5 2s-3.182 0-3.841.644C2 3.29 2 4.326 2 6.4zm11-3.1c0-1.087 0-1.63.171-2.06a2.3 2.3 0 0 1 1.218-1.262C14.802 2 15.327 2 16.375 2h2.25c1.048 0 1.573 0 1.986.178c.551.236.99.69 1.218 1.262c.171.43.171.973.171 2.06s0 1.63-.171 2.06a2.3 2.3 0 0 1-1.218 1.262C20.198 9 19.673 9 18.625 9h-2.25c-1.048 0-1.573 0-1.986-.178a2.3 2.3 0 0 1-1.218-1.262C13 7.13 13 6.587 13 5.5m-11 13c0 1.087 0 1.63.171 2.06a2.3 2.3 0 0 0 1.218 1.262c.413.178.938.178 1.986.178h2.25c1.048 0 1.573 0 1.986-.178c.551-.236.99-.69 1.218-1.262c.171-.43.171-.973.171-2.06s0-1.63-.171-2.06a2.3 2.3 0 0 0-1.218-1.262C9.198 15 8.673 15 7.625 15h-2.25c-1.048 0-1.573 0-1.986.178c-.551.236-.99.69-1.218 1.262C2 16.87 2 17.413 2 18.5"
                            />
                        </svg>
                    </div>
                    <span data-v-caee1139="" className="action-name">
                        {t("CSKH")}
                    </span>
                </div>
                <div data-v-caee1139="" className="action-item"
                    onClick={() => setOpenWithdraw(true)}
                >
                    <div
                        data-v-caee1139=""
                        className="action-icon"
                        style={{ background: "rgba(139, 114, 238, 0.1)" }}
                    >
                        <svg
                            data-v-caee1139=""
                            className="inline-block"
                            viewBox="0 0 24 24"
                            width="1.2em"
                            height="1.2em"
                            style={{ color: "rgb(139, 114, 238)", width: 24, height: 24 }}
                        >
                            <path
                                fill="currentColor"
                                d="M10 4h4c3.771 0 5.657 0 6.828 1.172c.844.843 1.08 2.057 1.146 4.078H2.026c.066-2.021.302-3.235 1.146-4.078C4.343 4 6.229 4 10 4"
                            />
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="m22 12.818l-.409-.409a2.25 2.25 0 0 0-3.182 0l-.801.801a2.251 2.251 0 0 0-4.358.79v1.764a2.25 2.25 0 0 0-1.341 3.827l.409.409H10c-3.771 0-5.657 0-6.828-1.172S2 15.771 2 12q0-.662.002-1.25h19.996Q22 11.338 22 12zM6 15.25a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 0-1.5z"
                                clipRule="evenodd"
                            />
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M15.5 13.25a.75.75 0 0 1 .75.75v4.19l.72-.72a.75.75 0 1 1 1.06 1.06l-2 2a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l.72.72V14a.75.75 0 0 1 .75-.75m3.97.22a.75.75 0 0 1 1.06 0l2 2a.75.75 0 1 1-1.06 1.06l-.72-.72V20a.75.75 0 0 1-1.5 0v-4.19l-.72.72a.75.75 0 1 1-1.06-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <span data-v-caee1139="" className="action-name">
                        {t("home.withdraw")}
                    </span>
                </div>
            </div>
        </>
    )
}

export default QuickAction