import React from 'react'
import { useTranslation } from 'react-i18next'

const GuideInvest = () => {
    const { i18n } = useTranslation()

    if (i18n?.language === 'en') return (
        <div data-v-f443897c="" className="vip-rules !pb-[20rem]">
            <div data-v-f443897c="" className="rules-section">
                <h3 data-v-f443897c="" className="section-title">
                    Farm Investment Guide
                </h3>
                <div data-v-f443897c="" className="rule-content">

                    <div data-v-f443897c="" className="rule-item">
                        <i
                            data-v-f443897c=""
                            className="van-badge__wrapper van-icon van-icon-friends-o rule-icon"
                        ></i>
                        <div data-v-f443897c="" className="rule-text">
                            <h4 data-v-f443897c="">Rent a Farm</h4>
                            <p data-v-f443897c="">
                                Each farm has a different rental cost. Make sure your account has enough balance to start renting and growing your farm.
                            </p>
                        </div>
                    </div>

                    <div data-v-f443897c="" className="rule-item">
                        <i
                            data-v-f443897c=""
                            className="van-badge__wrapper van-icon van-icon-gold-coin-o rule-icon"
                        ></i>
                        <div data-v-f443897c="" className="rule-text">
                            <h4 data-v-f443897c="">Harvest Profits</h4>
                            <p data-v-f443897c="">
                                You can harvest profits every 24 hours from the time of rental. If you miss the harvest time, the profits will gradually decrease. When the farm rental expires, you will have 1 hour to collect your earnings before it is reclaimed. Additionally, you have a chance to receive “Phu Ong Coins” – a valuable reward that can be redeemed in the future.
                            </p>
                        </div>
                    </div>

                    <div data-v-f443897c="" className="rule-item">
                        <i
                            data-v-f443897c=""
                            className="van-badge__wrapper van-icon van-icon-gift-o rule-icon"
                        ></i>
                        <div data-v-f443897c="" className="rule-text">
                            <h4 data-v-f443897c="">Cancel Farm Rental</h4>
                            <p data-v-f443897c="">
                                If your farm is still within the rental period, you can cancel at any time. The system will refund 10% of the rental amount as support.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
    if (i18n?.language === 'zh') return (
        <div data-v-f443897c="" className="vip-rules !pb-[20rem]">
            <div data-v-f443897c="" className="rules-section">
                <h3 data-v-f443897c="" className="section-title">
                    农场投资指南
                </h3>
                <div data-v-f443897c="" className="rule-content">

                    <div data-v-f443897c="" className="rule-item">
                        <i
                            data-v-f443897c=""
                            className="van-badge__wrapper van-icon van-icon-friends-o rule-icon"
                        ></i>
                        <div data-v-f443897c="" className="rule-text">
                            <h4 data-v-f443897c="">租赁农场</h4>
                            <p data-v-f443897c="">
                                每个农场的租金不同。请确保您的账户余额充足，以便开始租赁并发展您的农场。
                            </p>
                        </div>
                    </div>

                    <div data-v-f443897c="" className="rule-item">
                        <i
                            data-v-f443897c=""
                            className="van-badge__wrapper van-icon van-icon-gold-coin-o rule-icon"
                        ></i>
                        <div data-v-f443897c="" className="rule-text">
                            <h4 data-v-f443897c="">收获收益</h4>
                            <p data-v-f443897c="">
                                从租赁开始后每24小时您可以收获一次收益。如果未及时收获，收益将逐渐减少。租赁期满后，您还有1小时的时间可以收割，之后农场将被系统回收。此外，您还有机会获得“富翁币”——未来可兑换的有价值奖励。
                            </p>
                        </div>
                    </div>

                    <div data-v-f443897c="" className="rule-item">
                        <i
                            data-v-f443897c=""
                            className="van-badge__wrapper van-icon van-icon-gift-o rule-icon"
                        ></i>
                        <div data-v-f443897c="" className="rule-text">
                            <h4 data-v-f443897c="">取消租赁</h4>
                            <p data-v-f443897c="">
                                如果农场还在租赁期内，您可以随时取消。系统将退还10%的租金作为补偿。
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
    return (
        <div data-v-f443897c="" className="vip-rules !pb-[20rem]">
            <div data-v-f443897c="" className="rules-section">
                <h3 data-v-f443897c="" className="section-title">
                    Hướng dẫn đầu tư trang trại
                </h3>
                <div data-v-f443897c="" className="rule-content">
                    <div data-v-f443897c="" className="rule-item">
                        <i
                            data-v-f443897c=""
                            className="van-badge__wrapper van-icon van-icon-friends-o rule-icon"
                        ></i>
                        <div data-v-f443897c="" className="rule-text">
                            <h4 data-v-f443897c="">Thuê trang trại</h4>
                            <p data-v-f443897c="">
                                Mỗi trang trại có mức giá thuê khác nhau. Hãy đảm bảo tài khoản của bạn có đủ số dư để có thể bắt đầu thuê và phát triển nông trại.
                            </p>
                        </div>
                    </div>

                    <div data-v-f443897c="" className="rule-item">
                        <i
                            data-v-f443897c=""
                            className="van-badge__wrapper van-icon van-icon-gold-coin-o rule-icon"
                        ></i>
                        <div data-v-f443897c="" className="rule-text">
                            <h4 data-v-f443897c="">Thu hoạch lợi nhuận</h4>
                            <p data-v-f443897c="">
                                Bạn có thể thu hoạch lợi nhuận mỗi 24 giờ kể từ thời điểm thuê. Nếu không thu hoạch đúng hạn, lợi nhuận sẽ giảm dần. Khi nông trại hết hạn thuê bạn sẽ có 1 tiếng để thu hoạch lợi nhuận trước khi bị thu hồi. Ngoài ra, bạn còn có cơ hội nhận Coin Phú Ông – phần thưởng giá trị quy đổi trong tương lai.
                            </p>
                        </div>
                    </div>

                    <div data-v-f443897c="" className="rule-item">
                        <i
                            data-v-f443897c=""
                            className="van-badge__wrapper van-icon van-icon-gift-o rule-icon"
                        ></i>
                        <div data-v-f443897c="" className="rule-text">
                            <h4 data-v-f443897c="">Hủy thuê trang trại</h4>
                            <p data-v-f443897c="">
                                Nếu trang trại vẫn đang trong thời gian thuê, bạn có thể hủy bất cứ lúc nào. Hệ thống sẽ hoàn lại 10% số tiền thuê như một khoản hỗ trợ.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default GuideInvest