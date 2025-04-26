import { Drawer, message } from 'antd'
import React from 'react'
import { useAuthApp } from 'store/useAuthApp'
import QRCode from "react-qr-code";
import { getUrl } from 'lib/helpers';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import { useGlobalAppStore } from 'store/useGlobalApp';
import { useTranslation } from 'react-i18next';

interface Props {
    open: boolean,
    onClose: () => void
}

const InviteFriend = ({ onClose, open }: Props) => {
    const { user } = useAuthApp()
    const {configApp} = useGlobalAppStore()
    const [_, copyToClipboard] = useCopyToClipboard();
    const {t} = useTranslation()
    return (
        <>
            <Drawer
                title={
                    <div className='text-center'>
                        {t("Mời bạn bè")}
                    </div>
                }
                placement={'right'}
                closable={true}
                closeIcon={
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 hover:text-[#000]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>


                    </div>
                }
                onClose={() => onClose()}
                width="100VW"
                open={open}

            >
                <div data-v-7e679115="" className="page-content">
                    <div data-v-7e679115="" className="invite-card">
                        <div data-v-7e679115="" className="card-content">
                            <div data-v-7e679115="" className="card-title">
                                {t("Invite friends to join")}
                            </div>
                            <div data-v-7e679115="" className="card-subtitle">
                                {t("Share to get more rewards")}
                            </div>
                            <div data-v-7e679115="" className="reward-info">
                                <div data-v-7e679115="" className="reward-item">
                                    <span data-v-7e679115="" className="value">
                                        {configApp?.vipReward?.reward_a}%
                                    </span>
                                    <span data-v-7e679115="" className="label">
                                        Level A
                                    </span>
                                </div>
                                <div data-v-7e679115="" className="divider" />
                                <div data-v-7e679115="" className="reward-item">
                                    <span data-v-7e679115="" className="value">
                                        {configApp?.vipReward?.reward_b}%
                                    </span>
                                    <span data-v-7e679115="" className="label">
                                        Level B
                                    </span>
                                </div>
                                <div data-v-7e679115="" className="divider" />
                                <div data-v-7e679115="" className="reward-item">
                                    <span data-v-7e679115="" className="value">
                                        {configApp?.vipReward?.reward_c}%
                                    </span>
                                    <span data-v-7e679115="" className="label">
                                        Level C
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div data-v-7e679115="" className="card-bg" />
                    </div>
                    <div data-v-7e679115="" className="qrcode-section">
                        <div data-v-7e679115="" className="qrcode-wrapper">
                            <div data-v-7e679115="" className="qrcode-border flex justify-center items-center">
                                <div
                                    data-v-7e679115=""
                                    className="van-image "

                                    style={{ width: 190, height: 190 }}
                                >
                                    <QRCode
                                        size={256}
                                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                        value={getUrl(`register?r=${user?.refCode}`)}
                                        viewBox={`0 0 256 256`}
                                    />
                                </div>
                                <div data-v-7e679115="" className="corner-decoration top-left" />
                                <div data-v-7e679115="" className="corner-decoration top-right" />
                                <div data-v-7e679115="" className="corner-decoration bottom-left" />
                                <div data-v-7e679115="" className="corner-decoration bottom-right" />
                            </div>
                        </div>
                        <p data-v-7e679115="" className="qrcode-tip">
                            {t("Scan QR code to join")}
                        </p>
                    </div>
                    <div data-v-7e679115="" className="invite-info">
                        <div data-v-7e679115="" className="info-item">
                            <div data-v-7e679115="" className="item-content">
                                <span data-v-7e679115="" className="label">
                                    {t("Invite code")}
                                </span>
                                <span data-v-7e679115="" className="value">
                                    {user?.refCode}
                                </span>
                            </div>
                            <svg
                                onClick={() => {
                                    copyToClipboard(`${user?.refCode}`)
                                    message.success("Copied")
                                }}
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
                        </div>
                        <div data-v-7e679115="" className="info-item">
                            <div data-v-7e679115="" className="item-content">
                                <span data-v-7e679115="" className="label">
                                    {t("Invite link")}
                                </span>
                                <span data-v-7e679115="" className="value">
                                    {getUrl(`register?r=${user?.refCode}`)}
                                </span>
                            </div>
                            <svg
                                onClick={() => {
                                    copyToClipboard(getUrl(`register?r=${user?.refCode}`))
                                    message.success("Copied")
                                }}
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
                        </div>
                    </div>
                </div>

            </Drawer>
        </>
    )
}

export default InviteFriend