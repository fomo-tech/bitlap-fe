import React from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalAppStore } from 'store/useGlobalApp'

export const RulesTranlate = () => {
    const { configApp } = useGlobalAppStore()
    const { i18n } = useTranslation()

    if (i18n.language === 'en')
        return (
            <div data-v-f443897c="" className="vip-rules">
                <div data-v-f443897c="" className="rules-section">
                    <h3 data-v-f443897c="" className="section-title">
                        Upgrade rules
                    </h3>
                    <div data-v-f443897c="" className="rule-content">
                        <div data-v-f443897c="" className="rule-item">
                            <i
                                data-v-f443897c=""
                                className="van-badge__wrapper van-icon van-icon-friends-o rule-icon"
                            >
                                {/**/}
                                {/**/}
                                {/**/}
                            </i>
                            <div data-v-f443897c="" className="rule-text">
                                <h4 data-v-f443897c="">Valid invitation description</h4>
                                <p data-v-f443897c="">
                                    An invitation is only valid if the invited user has ever owned a ticket.
                                </p>
                            </div>
                        </div>
                        <div data-v-f443897c="" className="rule-item">
                            <i
                                data-v-f443897c=""
                                className="van-badge__wrapper van-icon van-icon-gold-coin-o rule-icon"
                            >
                                {/**/}
                                {/**/}
                                {/**/}
                            </i>
                            <div data-v-f443897c="" className="rule-text">
                                <h4 data-v-f443897c="">Level privileges</h4>
                                <p data-v-f443897c="">
                                    The higher the VIP level, the higher the dividend ratio and profit
                                    bonus
                                </p>
                            </div>
                        </div>
                        <div data-v-f443897c="" className="rule-item">
                            <i
                                data-v-f443897c=""
                                className="van-badge__wrapper van-icon van-icon-gift-o rule-icon"
                            >
                                {/**/}
                                {/**/}
                                {/**/}
                            </i>
                            <div data-v-f443897c="" className="rule-text">
                                <h4 data-v-f443897c="">Upgrade rewards</h4>
                                <p data-v-f443897c="">
                                    Each level upgrade can get corresponding USDT rewards
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rules-section">
                    <h3 className="section-title">
                        Benefits and Detailed Description for Downlines
                    </h3>

                    <div className="rule-content">
                        <div className="bonus-desc">
                            <p>
                                Downlines will receive a 1% commission from each ticket purchase made by their upline.
                            </p>

                            <h4>Detailed Description</h4>
                            <div className="example-item">
                                <div className="example-title">
                                    Level A (Direct Referral)
                                </div>

                                <p>
                                    Example: If a Level A user purchases a ticket worth $1,000, all their downlines will receive a total of $10.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                <div data-v-f443897c="" className="rules-section">
                    <h3 data-v-f443897c="" className="section-title">
                        Commission description
                    </h3>
                    <div data-v-f443897c="" className="rule-content">
                        <div data-v-f443897c="" className="bonus-desc">
                            <p data-v-f443897c="">
                                Different levels of downlines have different commission ratios
                            </p>
                            <p data-v-f443897c="">
                                Specific description{" "}
                                <span data-v-f443897c="" className="van-tag van-tag--primary">
                                    Level A: {configApp?.vipReward?.reward_a}%{/**/}
                                </span>{" "}
                                <span data-v-f443897c="" className="van-tag van-tag--success">
                                    Level B:{configApp?.vipReward?.reward_b}%{/**/}
                                </span>{" "}
                                <span data-v-f443897c="" className="van-tag van-tag--warning">
                                    Level C:{configApp?.vipReward?.reward_c}%{/**/}
                                </span>
                            </p>
                            <h4 data-v-f443897c="">Specific description</h4>
                            <div data-v-f443897c="" className="example-item">
                                <div data-v-f443897c="" className="example-title">
                                    Level A (direct invitation)
                                </div>
                                <p data-v-f443897c="">
                                    If a level A user purchases a project worth 1,000 dollars. You
                                    will receive a commission of {configApp?.vipReward?.reward_a}% ({1000 * configApp?.vipReward?.reward_a / 100} USD) of his purchase amount
                                </p>
                            </div>
                            <div data-v-f443897c="" className="example-item">
                                <div data-v-f443897c="" className="example-title">
                                    Level B (direct invitation of Level A)
                                </div>
                                <p data-v-f443897c="">
                                    If a Level B user purchases an item worth 1,000 USD. You will
                                    receive a commission of {configApp?.vipReward?.reward_b}% ({1000 * configApp?.vipReward?.reward_b / 100} USD) of his purchase amount
                                </p>
                            </div>
                            <div data-v-f443897c="" className="example-item">
                                <div data-v-f443897c="" className="example-title">
                                    Level C (direct invitation of Level B)
                                </div>
                                <p data-v-f443897c="">
                                    If a Level C user purchases an item worth 1,000 USD. You will
                                    receive a commission of {configApp?.vipReward?.reward_c}%  ({1000 * configApp?.vipReward?.reward_c / 100} USD) of his purchase amount
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )

    if (i18n.language === 'zh')
        return <div data-v-f443897c="" className="vip-rules">
            <div data-v-f443897c="" className="rules-section">
                <h3 data-v-f443897c="" className="section-title">
                    升级规则
                </h3>
                <div data-v-f443897c="" className="rule-content">
                    <div data-v-f443897c="" className="rule-item">
                        <i
                            data-v-f443897c=""
                            className="van-badge__wrapper van-icon van-icon-friends-o rule-icon"
                        >
                            {/**/}
                            {/**/}
                            {/**/}
                        </i>
                        <div data-v-f443897c="" className="rule-text">
                            <h4 data-v-f443897c="">有效邀请描述</h4>
                            <p data-v-f443897c="">
                                只有当被邀请者曾经拥有过票时，邀请才有效
                            </p>
                        </div>
                    </div>
                    <div data-v-f443897c="" className="rule-item">
                        <i
                            data-v-f443897c=""
                            className="van-badge__wrapper van-icon van-icon-gold-coin-o rule-icon"
                        >
                            {/**/}
                            {/**/}
                            {/**/}
                        </i>
                        <div data-v-f443897c="" className="rule-text">
                            <h4 data-v-f443897c="">等级特权</h4>
                            <p data-v-f443897c="">
                                VIP等级越高，分红比例和利润奖励越高。
                            </p>
                        </div>
                    </div>
                    <div data-v-f443897c="" className="rule-item">
                        <i
                            data-v-f443897c=""
                            className="van-badge__wrapper van-icon van-icon-gift-o rule-icon"
                        >
                            {/**/}
                            {/**/}
                            {/**/}
                        </i>
                        <div data-v-f443897c="" className="rule-text">
                            <h4 data-v-f443897c="">升级奖励</h4>
                            <p data-v-f443897c="">
                                每次等级升级可获得相应的USDT奖励。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rules-section">
                <h3 className="section-title">
                    下线的利益和详细描述
                </h3>

                <div className="rule-content">
                    <div className="bonus-desc">
                        <p>
                            下线将从每次上线购买票务中获得1%的佣金。
                        </p>

                        <h4>详细描述</h4>
                        <div className="example-item">
                            <div className="example-title">
                                A级（直接邀请）
                            </div>

                            <p>
                                示例：如果A级用户购买了一张价值1000美元的票务，那么所有他们的下线将获得总共10美元。
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            <div data-v-f443897c="" className="rules-section">
                <h3 data-v-f443897c="" className="section-title">
                    佣金说明
                </h3>
                <div data-v-f443897c="" className="rule-content">
                    <div data-v-f443897c="" className="bonus-desc">
                        <p data-v-f443897c="">
                            不同层级的下线有不同的佣金比例。
                        </p>
                        <p data-v-f443897c="">
                            具体描述{" "}
                            <span data-v-f443897c="" className="van-tag van-tag--primary">
                                A 级: {configApp?.vipReward?.reward_a}%
                            </span>{" "}
                            <span data-v-f443897c="" className="van-tag van-tag--success">
                                B 级: {configApp?.vipReward?.reward_b}%
                            </span>{" "}
                            <span data-v-f443897c="" className="van-tag van-tag--warning">
                                C 级: {configApp?.vipReward?.reward_c}%
                            </span>
                        </p>
                        <h4 data-v-f443897c="">具体说明</h4>
                        <div data-v-f443897c="" className="example-item">
                            <div data-v-f443897c="" className="example-title">
                                A 级（直接邀请）
                            </div>
                            <p data-v-f443897c="">
                                如果 A 级用户购买价值1000美元的项目，您将获得他购买金额的 {configApp?.vipReward?.reward_a}%（{1000 * configApp?.vipReward?.reward_a / 100} 美元）作为佣金。
                            </p>
                        </div>
                        <div data-v-f443897c="" className="example-item">
                            <div data-v-f443897c="" className="example-title">
                                B 级（直接邀请 A 级）
                            </div>
                            <p data-v-f443897c="">
                                如果 B 级用户购买价值1000美元的商品，您将获得他购买金额的 {configApp?.vipReward?.reward_b}%（{1000 * configApp?.vipReward?.reward_b / 100} 美元）作为佣金。
                            </p>
                        </div>
                        <div data-v-f443897c="" className="example-item">
                            <div data-v-f443897c="" className="example-title">
                                C 级（直接邀请 B 级）
                            </div>
                            <p data-v-f443897c="">
                                如果 C 级用户购买价值1000美元的商品，您将获得他购买金额的 {configApp?.vipReward?.reward_c}%（{1000 * configApp?.vipReward?.reward_c / 100} 美元）作为佣金。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    return <div data-v-f443897c="" className="vip-rules">
        <div data-v-f443897c="" className="rules-section">
            <h3 data-v-f443897c="" className="section-title">
                Quy tắc nâng cấp
            </h3>
            <div data-v-f443897c="" className="rule-content">
                <div data-v-f443897c="" className="rule-item">
                    <i
                        data-v-f443897c=""
                        className="van-badge__wrapper van-icon van-icon-friends-o rule-icon"
                    >
                        {/**/}
                        {/**/}
                        {/**/}
                    </i>
                    <div data-v-f443897c="" className="rule-text">
                        <h4 data-v-f443897c="">Mô tả lời mời hợp lệ</h4>
                        <p data-v-f443897c="">
                            Người được mời đã từng sở hữu 1 ticket để lời mời được coi là hợp lệ.
                        </p>
                    </div>
                </div>
                <div data-v-f443897c="" className="rule-item">
                    <i
                        data-v-f443897c=""
                        className="van-badge__wrapper van-icon van-icon-gold-coin-o rule-icon"
                    >
                        {/**/}
                        {/**/}
                        {/**/}
                    </i>
                    <div data-v-f443897c="" className="rule-text">
                        <h4 data-v-f443897c="">Quyền lợi theo cấp độ</h4>
                        <p data-v-f443897c="">
                            Cấp độ VIP càng cao, tỷ lệ cổ tức và thưởng lợi nhuận càng cao.
                        </p>
                    </div>
                </div>
                <div data-v-f443897c="" className="rule-item">
                    <i
                        data-v-f443897c=""
                        className="van-badge__wrapper van-icon van-icon-gift-o rule-icon"
                    >
                        {/**/}
                        {/**/}
                        {/**/}
                    </i>
                    <div data-v-f443897c="" className="rule-text">
                        <h4 data-v-f443897c="">Phần thưởng nâng cấp</h4>
                        <p data-v-f443897c="">
                            Mỗi lần nâng cấp cấp độ có thể nhận phần thưởng USDT tương ứng.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div data-v-f443897c="" className="rules-section">
            <h3 data-v-f443897c="" className="section-title">
                Lợi ích và mô tả chi tiết cho người cấp dưới
            </h3>
            <div data-v-f443897c="" className="rule-content">
                <div data-v-f443897c="" className="bonus-desc">
                    <p data-v-f443897c="">
                        Cấp dưới sẽ nhận được 1% hoa hồng từ mỗi giao dịch mua ticket của cấp trên.
                    </p>
                    
                    <h4 data-v-f443897c="">Mô tả chi tiết</h4>
                    <div data-v-f443897c="" className="example-item">
                        <div data-v-f443897c="" className="example-title">
                            Cấp A (mời trực tiếp)
                        </div>
                        <p data-v-f443897c="">
                            Ví dụ: Nếu người dùng cấp A mua một ticket có giá trị 1.000 USD, thì tất cả các cấp dưới của họ sẽ nhận được tổng cộng 10 USD.
                        </p>
                    </div>

                </div>
            </div>
        </div>
        <div data-v-f443897c="" className="rules-section">
            <h3 data-v-f443897c="" className="section-title">
                Mô tả hoa hồng
            </h3>
            <div data-v-f443897c="" className="rule-content">
                <div data-v-f443897c="" className="bonus-desc">
                    <p data-v-f443897c="">
                        Các cấp độ khác nhau của người giới thiệu có tỷ lệ hoa hồng khác nhau.
                    </p>
                    <p data-v-f443897c="">
                        Mô tả cụ thể{" "}
                        <span data-v-f443897c="" className="van-tag van-tag--primary">
                            Cấp A: {configApp?.vipReward?.reward_a}%
                        </span>{" "}
                        <span data-v-f443897c="" className="van-tag van-tag--success">
                            Cấp B: {configApp?.vipReward?.reward_b}%
                        </span>{" "}
                        <span data-v-f443897c="" className="van-tag van-tag--warning">
                            Cấp C: {configApp?.vipReward?.reward_c}%
                        </span>
                    </p>
                    <h4 data-v-f443897c="">Mô tả chi tiết</h4>
                    <div data-v-f443897c="" className="example-item">
                        <div data-v-f443897c="" className="example-title">
                            Cấp A (mời trực tiếp)
                        </div>
                        <p data-v-f443897c="">
                            Nếu người dùng cấp A mua một dự án trị giá 1.000 đô la, bạn sẽ nhận được
                            hoa hồng {configApp?.vipReward?.reward_a}% ({1000 * configApp?.vipReward?.reward_a / 100} USD) từ số tiền mua của họ.
                        </p>
                    </div>
                    <div data-v-f443897c="" className="example-item">
                        <div data-v-f443897c="" className="example-title">
                            Cấp B (mời trực tiếp cấp A)
                        </div>
                        <p data-v-f443897c="">
                            Nếu người dùng cấp B mua một món hàng trị giá 1.000 USD, bạn sẽ nhận được
                            hoa hồng {configApp?.vipReward?.reward_b}% ({1000 * configApp?.vipReward?.reward_b / 100} USD) từ số tiền mua của họ.
                        </p>
                    </div>
                    <div data-v-f443897c="" className="example-item">
                        <div data-v-f443897c="" className="example-title">
                            Cấp C (mời trực tiếp cấp B)
                        </div>
                        <p data-v-f443897c="">
                            Nếu người dùng cấp C mua một món hàng trị giá 1.000 USD, bạn sẽ nhận được
                            hoa hồng {configApp?.vipReward?.reward_c}% ({1000 * configApp?.vipReward?.reward_c / 100} USD) từ số tiền mua của họ.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

}
