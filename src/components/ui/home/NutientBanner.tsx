import { message } from 'antd';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useAuthApp } from 'store/useAuthApp';
import InviteFriend from '../InviteFriend';

const NutientBanner = () => {
    const { user } = useAuthApp()
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false)

    return (
        <>
            {/* nutrient-banner */}
            <InviteFriend
                open={open}
                onClose={() => setOpen(false)}
            />
            <div data-v-caee1139="" className="nutrient-banner">
                <div data-v-caee1139="" className="nutrient-content">
                    <div data-v-caee1139="" className="nutrient-icon">
                        <img
                            data-v-caee1139=""
                            src="https://img.icons8.com/?size=100&id=XsEEVB3VrdJo&format=png&color=000000"
                            alt="营养液"
                        />
                    </div>
                    <div data-v-caee1139="" className="nutrient-info">
                        <div data-v-caee1139="" className="nutrient-title">
                            {/* {t("home.text_banner1")} */}
                            {t("Mời bạn bè tham gia")}
                        </div>
                        <div data-v-caee1139="" className="nutrient-desc">
                            {/* {t("home.text_banner2")} */}
                            {t("Chia sẻ để nhận thêm phần thưởng")}
                        </div>
                    </div>
                    <div data-v-caee1139="" className="nutrient-action">
                        <button
                            data-v-caee1139=""
                            onClick={() => {
                                setOpen(true)
                            }}
                            type="button"
                            className="van-button p-2 text-sm rounded-xl van-button--primary van-button--small van-button--round"
                        >
                            <div className="van-button__content">
                                {/**/}
                                <span className="van-button__text">
                                    {/* {t("home.learn_more")} */}
                                    {t("Mời bạn bè")}
                                </span>
                                {/**/}
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NutientBanner