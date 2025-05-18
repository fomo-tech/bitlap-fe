import React from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalAppStore } from 'store/useGlobalApp'

export const RulesTranlate = () => {
    const { configApp } = useGlobalAppStore()
    const { i18n } = useTranslation()

    if (i18n.language === 'en')
        return (
            <div data-v-f443897c="" className="vip-rules !pb-[20rem]">
                <div data-v-f443897c="" className="rules-section">
                    <h3 data-v-f443897c="" className="section-title">
                        Upgrade Rules
                    </h3>
                    <div data-v-f443897c="" className="rule-content">
                        <div data-v-f443897c="" className="rule-item">
                            <i
                                data-v-f443897c=""
                                className="van-badge__wrapper van-icon van-icon-friends-o rule-icon"
                            >
                                {/**/}
                            </i>
                            <div data-v-f443897c="" className="rule-text">
                                <h4 data-v-f443897c="">Valid Invitation Description</h4>
                                <p data-v-f443897c="">
                                    The invited person must rent a farm for the invitation to be considered valid.
                                </p>
                            </div>
                        </div>
                        <div data-v-f443897c="" className="rule-item">
                            <i
                                data-v-f443897c=""
                                className="van-badge__wrapper van-icon van-icon-gold-coin-o rule-icon"
                            >
                                {/**/}
                            </i>
                            <div data-v-f443897c="" className="rule-text">
                                <h4 data-v-f443897c="">Benefits by Level</h4>
                                <p data-v-f443897c="">
                                    The higher the agency level, the higher the dividend and profit bonus rates.
                                </p>
                            </div>
                        </div>
                        <div data-v-f443897c="" className="rule-item">
                            <i
                                data-v-f443897c=""
                                className="van-badge__wrapper van-icon van-icon-gift-o rule-icon"
                            >
                                {/**/}
                            </i>
                            <div data-v-f443897c="" className="rule-text">
                                <h4 data-v-f443897c="">Upgrade Rewards</h4>
                                <p data-v-f443897c="">
                                    Each level upgrade can earn the corresponding USDT rewards.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div data-v-f443897c="" className="rules-section">
                    <h3 data-v-f443897c="" className="section-title">
                        Benefits and Detailed Description for Subordinates
                    </h3>
                    <div data-v-f443897c="" className="rule-content">
                        <div data-v-f443897c="" className="bonus-desc">
                            <p data-v-f443897c="">
                                Subordinates will receive 1% commission from each farm rental and harvest transaction of their uplines.
                            </p>

                            <h4 data-v-f443897c="">Detailed Description</h4>
                            <div data-v-f443897c="" className="example-item">
                                <div data-v-f443897c="" className="example-title">
                                    Level A (Direct Invitation)
                                </div>
                                <p data-v-f443897c="">
                                    Example: <br />
                                    - If a Level A user rents a farm worth 1,000 USD, all their subordinates will receive a total of 10 USD. <br />
                                    - If a Level A user harvests farm rewards worth 2 USD/day, all their subordinates will receive a total of 0.02 USD. <br />
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                <div data-v-f443897c="" className="rules-section">
                    <h3 data-v-f443897c="" className="section-title">
                        Commission Description
                    </h3>
                    <div data-v-f443897c="" className="rule-content">
                        <div data-v-f443897c="" className="bonus-desc">
                            <p data-v-f443897c="">
                                Different referral levels have different commission rates.
                            </p>
                            <p data-v-f443897c="">
                                Specific description{" "}
                                <span data-v-f443897c="" className="van-tag van-tag--primary">
                                    Level A: {configApp?.vipReward?.reward_a}%
                                </span>{" "}
                                <span data-v-f443897c="" className="van-tag van-tag--success">
                                    Level B: {configApp?.vipReward?.reward_b}%
                                </span>{" "}
                                <span data-v-f443897c="" className="van-tag van-tag--warning">
                                    Level C: {configApp?.vipReward?.reward_c}%
                                </span>
                            </p>
                            <h4 data-v-f443897c="">Detailed Description</h4>
                            <div data-v-f443897c="" className="example-item">
                                <div data-v-f443897c="" className="example-title">
                                    Level A (Direct Invitation)
                                </div>
                                <p data-v-f443897c="">
                                    If a Level A user rents a farm worth 1,000 USD, you will receive a commission of {configApp?.vipReward?.reward_a}% ({1000 * configApp?.vipReward?.reward_a / 100} USD) from their purchase amount.
                                </p>
                                <p data-v-f443897c="">
                                    If a Level A user harvests farm rewards worth 10 USD/day, you will receive a commission of {configApp?.vipReward?.reward_a}% ({10 * configApp?.vipReward?.reward_a / 100} USD) from their harvest amount.
                                </p>
                            </div>
                            <div data-v-f443897c="" className="example-item">
                                <div data-v-f443897c="" className="example-title">
                                    Level B (Invited by Level A)
                                </div>
                                <p data-v-f443897c="">
                                    If a Level B user rents a farm worth 1,000 USD, you will receive a commission of {configApp?.vipReward?.reward_b}% ({1000 * configApp?.vipReward?.reward_b / 100} USD) from their purchase amount.
                                </p>
                                <p data-v-f443897c="">
                                    If a Level B user harvests farm rewards worth 10 USD/day, you will receive a commission of {configApp?.vipReward?.reward_b}% ({10 * configApp?.vipReward?.reward_b / 100} USD) from their harvest amount.
                                </p>
                            </div>
                            <div data-v-f443897c="" className="example-item">
                                <div data-v-f443897c="" className="example-title">
                                    Level C (Invited by Level B)
                                </div>
                                <p data-v-f443897c="">
                                    If a Level C user rents a farm worth 1,000 USD, you will receive a commission of {configApp?.vipReward?.reward_c}% ({1000 * configApp?.vipReward?.reward_c / 100} USD) from their purchase amount.
                                </p>
                                <p data-v-f443897c="">
                                    If a Level C user harvests farm rewards worth 10 USD/day, you will receive a commission of {configApp?.vipReward?.reward_c}% ({10 * configApp?.vipReward?.reward_c / 100} USD) from their harvest amount.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div data-v-f443897c="" className="rules-section">
                    <h3 data-v-f443897c="" className="section-title">
                        Salary Collection Time for Agents
                    </h3>
                    <div data-v-f443897c="" className="rule-content">
                        <div data-v-f443897c="" className="bonus-desc">
                            <p data-v-f443897c="">
                                Agents at eligible levels will receive their salary from the 1st to the 5th day of each month. If you forget to collect your salary for the month, the reward will be forfeited and will not be carried over to the next month.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
          
        )

    if (i18n.language === 'zh')
        return <div data-v-f443897c="" className="vip-rules !pb-[20rem]">
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
                        </i>
                        <div data-v-f443897c="" className="rule-text">
                            <h4 data-v-f443897c="">有效邀请说明</h4>
                            <p data-v-f443897c="">
                                被邀请人必须租用农场，邀请才被视为有效。
                            </p>
                        </div>
                    </div>
                    <div data-v-f443897c="" className="rule-item">
                        <i
                            data-v-f443897c=""
                            className="van-badge__wrapper van-icon van-icon-gold-coin-o rule-icon"
                        >
                            {/**/}
                        </i>
                        <div data-v-f443897c="" className="rule-text">
                            <h4 data-v-f443897c="">等级福利</h4>
                            <p data-v-f443897c="">
                                代理等级越高，分红和利润奖励比例越高。
                            </p>
                        </div>
                    </div>
                    <div data-v-f443897c="" className="rule-item">
                        <i
                            data-v-f443897c=""
                            className="van-badge__wrapper van-icon van-icon-gift-o rule-icon"
                        >
                            {/**/}
                        </i>
                        <div data-v-f443897c="" className="rule-text">
                            <h4 data-v-f443897c="">升级奖励</h4>
                            <p data-v-f443897c="">
                                每次升级等级可获得相应的USDT奖励。
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div data-v-f443897c="" className="rules-section">
                <h3 data-v-f443897c="" className="section-title">
                    下级的福利和详细说明
                </h3>
                <div data-v-f443897c="" className="rule-content">
                    <div data-v-f443897c="" className="bonus-desc">
                        <p data-v-f443897c="">
                            下级将从每笔租赁农场和收获农场的交易中获得1%的佣金。
                        </p>

                        <h4 data-v-f443897c="">详细说明</h4>
                        <div data-v-f443897c="" className="example-item">
                            <div data-v-f443897c="" className="example-title">
                                A级（直接邀请）
                            </div>
                            <p data-v-f443897c="">
                                例如：<br />
                                - 如果A级用户租用价值1000美元的农场，则他们所有的下级将总共获得10美元。<br />
                                - 如果A级用户每天收获价值2美元的农场奖励，则他们所有的下级将总共获得0.02美元。<br />
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
                            不同推荐等级有不同的佣金比例。
                        </p>
                        <p data-v-f443897c="">
                            具体说明{" "}
                            <span data-v-f443897c="" className="van-tag van-tag--primary">
                                A级: {configApp?.vipReward?.reward_a}%
                            </span>{" "}
                            <span data-v-f443897c="" className="van-tag van-tag--success">
                                B级: {configApp?.vipReward?.reward_b}%
                            </span>{" "}
                            <span data-v-f443897c="" className="van-tag van-tag--warning">
                                C级: {configApp?.vipReward?.reward_c}%
                            </span>
                        </p>
                        <h4 data-v-f443897c="">详细说明</h4>
                        <div data-v-f443897c="" className="example-item">
                            <div data-v-f443897c="" className="example-title">
                                A级（直接邀请）
                            </div>
                            <p data-v-f443897c="">
                                如果A级用户租用价值1000美元的农场，您将从他们的购买金额中获得
                                {configApp?.vipReward?.reward_a}%（{1000 * configApp?.vipReward?.reward_a / 100}美元）的佣金。
                            </p>
                            <p data-v-f443897c="">
                                如果A级用户每天收获价值10美元的农场奖励，您将从他们的收获金额中获得
                                {configApp?.vipReward?.reward_a}%（{10 * configApp?.vipReward?.reward_a / 100}美元）的佣金。
                            </p>
                        </div>
                        <div data-v-f443897c="" className="example-item">
                            <div data-v-f443897c="" className="example-title">
                                B级（由A级邀请）
                            </div>
                            <p data-v-f443897c="">
                                如果B级用户租用价值1000美元的农场，您将从他们的购买金额中获得
                                {configApp?.vipReward?.reward_b}%（{1000 * configApp?.vipReward?.reward_b / 100}美元）的佣金。
                            </p>
                            <p data-v-f443897c="">
                                如果B级用户每天收获价值10美元的农场奖励，您将从他们的收获金额中获得
                                {configApp?.vipReward?.reward_b}%（{10 * configApp?.vipReward?.reward_b / 100}美元）的佣金。
                            </p>
                        </div>
                        <div data-v-f443897c="" className="example-item">
                            <div data-v-f443897c="" className="example-title">
                                C级（由B级邀请）
                            </div>
                            <p data-v-f443897c="">
                                如果C级用户租用价值1000美元的农场，您将从他们的购买金额中获得
                                {configApp?.vipReward?.reward_c}%（{1000 * configApp?.vipReward?.reward_c / 100}美元）的佣金。
                            </p>
                            <p data-v-f443897c="">
                                如果C级用户每天收获价值10美元的农场奖励，您将从他们的收获金额中获得
                                {configApp?.vipReward?.reward_c}%（{10 * configApp?.vipReward?.reward_c / 100}美元）的佣金。
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div data-v-f443897c="" className="rules-section">
                <h3 data-v-f443897c="" className="section-title">
                    代理工资领取时间
                </h3>
                <div data-v-f443897c="" className="rule-content">
                    <div data-v-f443897c="" className="bonus-desc">
                        <p data-v-f443897c="">
                            享受工资等级的代理将在每月1日至5日领取工资。如果您忘记领取当月工资，奖励将作废且不会累积到下个月。
                        </p>
                    </div>
                </div>
            </div>
        </div>
  
    return (
        <div data-v-f443897c="" className="vip-rules !pb-[20rem]">
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
                                Người được mời phải thuê trang trại thì lời mời được coi là hợp lệ.
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
                                Cấp độ Đại lý càng cao, tỷ lệ cổ tức và thưởng lợi nhuận càng cao.
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
                            Cấp dưới sẽ nhận được 1% hoa hồng từ mỗi giao dịch thuê trang trại và thu hoạch trang trại của cấp trên.
                        </p>

                        <h4 data-v-f443897c="">Mô tả chi tiết</h4>
                        <div data-v-f443897c="" className="example-item">
                            <div data-v-f443897c="" className="example-title">
                                Cấp A (mời trực tiếp)
                            </div>
                            <p data-v-f443897c="">
                                Ví dụ: <br />
                                - Nếu người dùng cấp A thuê một trang trại có giá trị 1.000 USD, thì tất cả các cấp dưới của họ sẽ nhận được tổng cộng 10 USD. <br />
                                - Nếu người dùng cấp A thu hoạch phần thưởng trang trại có giá trị 2 USD / ngày, thì tất cả các cấp dưới của họ sẽ nhận được tổng cộng 0.02 USD. <br />
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
                                Nếu người dùng cấp A thuê trang trại trị giá 1.000 đô la, bạn sẽ nhận được
                                hoa hồng {configApp?.vipReward?.reward_a}% ({1000 * configApp?.vipReward?.reward_a / 100} USD) từ số tiền mua của họ.
                            </p>
                            <p data-v-f443897c="">
                                Nếu người dùng cấp A thu hoạch trang trại trị giá 10 USD/ ngày, bạn sẽ nhận được
                                hoa hồng {configApp?.vipReward?.reward_a}% ({10 * configApp?.vipReward?.reward_a / 100} USD) từ số tiền thu hoach của họ.
                            </p>
                        </div>
                        <div data-v-f443897c="" className="example-item">
                            <div data-v-f443897c="" className="example-title">
                                Cấp B (mời trực tiếp cấp A)
                            </div>
                            <p data-v-f443897c="">
                                Nếu người dùng cấp B thuê trang trại trị giá 1.000 USD, bạn sẽ nhận được
                                hoa hồng {configApp?.vipReward?.reward_b}% ({1000 * configApp?.vipReward?.reward_b / 100} USD) từ số tiền mua của họ.
                            </p>
                            <p data-v-f443897c="">
                                Nếu người dùng cấp B thu hoạch trang trại trị giá 10 USD/ ngày, bạn sẽ nhận được
                                hoa hồng {configApp?.vipReward?.reward_b}% ({10 * configApp?.vipReward?.reward_b / 100} USD) từ số tiền thu hoach của họ.
                            </p>
                        </div>
                        <div data-v-f443897c="" className="example-item">
                            <div data-v-f443897c="" className="example-title">
                                Cấp C (mời trực tiếp cấp B)
                            </div>
                            <p data-v-f443897c="">
                                Nếu người dùng cấp C thuê trang trại trị giá 1.000 USD, bạn sẽ nhận được
                                hoa hồng {configApp?.vipReward?.reward_c}% ({1000 * configApp?.vipReward?.reward_c / 100} USD) từ số tiền mua của họ.
                            </p>
                            <p data-v-f443897c="">
                                Nếu người dùng cấp C thu hoạch trang trại trị giá 10 USD/ ngày, bạn sẽ nhận được
                                hoa hồng {configApp?.vipReward?.reward_c}% ({10 * configApp?.vipReward?.reward_c / 100} USD) từ số tiền thu hoach của họ.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div data-v-f443897c="" className="rules-section">
                <h3 data-v-f443897c="" className="section-title">
                    Thời gian để nhận thưởng cho đại lý
                </h3>
                <div data-v-f443897c="" className="rule-content">
                    <div data-v-f443897c="" className="bonus-desc">
                        <p data-v-f443897c="">
                            Các đại lý đạt được cấp độ nhận thưởng sẽ được nhận thưởng từ ngày 1 - 5 đầu tháng.Đại lý sẽ nhận được cấp độ thưởng cao nhấ. Nếu bạn quên nhận thưởng tháng này thì phần thưởng sẽ mất không được cộng dồn vào tháng sau
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
