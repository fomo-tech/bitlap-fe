import { useNavigate } from "react-router-dom"
import rw1 from 'assets/icons/fortune-wheel.png'
import rw2 from 'assets/images/good-luck.png'
import rw3 from 'assets/images/farm.png'
import dolar from 'assets/images/dollar.png'
import { useTranslation } from "react-i18next"
import { message, Modal } from "antd"
import requestService from "api/request"
import { useState } from "react"
import { useAuthApp } from "store/useAuthApp"
import { useGlobalAppStore } from "store/useGlobalApp"
import { formatNumber } from "lib/helpers"
import ques from 'assets/images/home_advertising_tips_icon.png'
import actice_bg from 'assets/images/active.png'
import close_icon from 'assets/images/home_dialog_close.png'
const LuckyWeel = () => {
    const { user, onSetUser } = useAuthApp()
    const { handleCallbackUser, configApp } = useGlobalAppStore()
    const navigate = useNavigate()
    const { t } = useTranslation()
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [itemWinner, setItemWinner] = useState<any>(null)
    const [openDrawMoney, setOpenDrawMoney] = useState(false)
    const [openInfo, setOpenInfo] = useState(false)

    const handleLuckyWell = async (drawMoney: boolean) => {
        setItemWinner(null)
        setOpenDrawMoney(false)
        if (isSpinning) return;
        setIsSpinning(true);

        try {
            const res = await requestService.post("/checkin/draw", {
                data: {
                    drawMoney
                }
            });
            if (drawMoney && user) {
                onSetUser({
                    ...user,
                    realBalance: user?.realBalance - 0.2
                })
            }
            if (res && res.data) {
                const resultReward = res.data.data;

                const targetIndex = rewardItems.findIndex((item) => item.reward === resultReward);
                if (targetIndex === -1) throw new Error("Reward not found");

                const totalRounds = 3; // số vòng quay đầy đủ
                const totalSteps = totalRounds * rewardItems.length + targetIndex;
                let currentIndex = 0;

                const spin = setInterval(() => {
                    setActiveIndex(currentIndex % rewardItems.length);
                    currentIndex++;

                    if (currentIndex > totalSteps) {
                        clearInterval(spin);
                        setIsSpinning(false);
                        setItemWinner(rewardItems[targetIndex])
                        handleCallbackUser()
                    }
                }, getSpinSpeed(currentIndex));
            }

        } catch (error: any) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
            message.error(error?.response?.data?.message || "Something went wrong");
            setIsSpinning(false);
        }
    };


    // Optional: tạo hiệu ứng chậm dần
    const getSpinSpeed = (step: number) => {
        if (step < 20) return 80;
        if (step < 40) return 100;
        if (step < 60) return 120;
        return 150; // chậm dần
    };



    const rewardItems = [
        { id: 1, img: dolar, label: "$0.1", reward: "0.1" },
        { id: 2, img: dolar, label: "$0.3", reward: "0.3" },
        { id: 3, img: rw1, reward: "Robot_Part", label: "+2 Turn" },
        { id: 4, img: dolar, label: "$0.15", reward: "0.15" },
        { id: 5, img: dolar, label: "$0.2", reward: "0.2" },
        { id: 6, img: rw3, reward: "Duck_Sticker", label:"+1 Farm" },
        { id: 7, img: dolar, label: "$5", reward: "5" },
        { id: 8, img: rw2, label: "Good luck", reward:"Lucky_Clover" },
    ];

    return (
        <div className='' >
            <div className="absolute top-3 left-2 cursor-pointer z-[999]" onClick={() => navigate('/activity')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 text-[#fff]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </div>

            <div className="absolute top-4 right-2 cursor-pointer" onClick={() => setOpenInfo(true)}>
                <img src={ques} width={35} />
            </div>
            <Modal
                closeIcon={<img src={close_icon} />}
            open={openInfo} onCancel={() => setOpenInfo(false)} centered footer={false} width={300}>
                <h1 className="text-center font-bold text-[16px] mb-4">
                    {t("Thưởng đặt biệt")}
                </h1>
                <div>
                    <img src={process.env.REACT_APP_BASE_URL + "/uploads/vip0.png"} width={250} className="m-auto rounded-[30px]" />
                    
                    <div data-v-cde322bf="" className="nft-info p-2">
                        <div data-v-cde322bf="" className="text-[#000] text-[4rem] font-[600]">
                            {configApp?.duck_Sticker?.name}
                        </div>
             
                        <div data-v-cde322bf="" className="flex justify-between">
                            <div data-v-cde322bf="" className="font-[600]">
                                {t("home.daily_income")}
                            </div>

                            <div data-v-cde322bf="" className="ml-2">
                                +{configApp?.duck_Sticker?.incomePerDay}$
                            </div>
                        </div>
                        <div data-v-cde322bf="" className="flex justify-between">
                            <div data-v-cde322bf="" className="font-[600]">
                                {t("Số ngày thu nhập")}
                            </div>
                            <div data-v-cde322bf="" className="value ml-2">
                                {configApp?.duck_Sticker?.earningDay}
                            </div>
                        </div>


                    </div>

                </div>
            </Modal>
            <Modal width={350} open={openDrawMoney} footer={true} centered onCancel={() => setOpenDrawMoney(false)}>
                <div className="p-3">
                    <h3 className="font-[900] text-center my-[5rem]">
                        {t("Thêm một lượt quay với $0.2 nhé?")}
                    </h3>
                    <div style={{ textAlign: "center" }} className="mt-3">
                        <button className="recBtn" onClick={() => handleLuckyWell(true)}>
                            OK
                        </button>
                    </div>
                </div>

            </Modal>
            <div className="rotatebox " data-v-dd46357c="">
                <i
                    className="van-badge__wrapper van-icon van-icon-arrow-left lefticon"

                    data-v-dd46357c=""
                />
                <div className="winner z-[999] " style={{ display: !!itemWinner ? "block" : 'none' }}
                >
                    <div className="winner_container !max-w-[90rem] w-[90%] ">
                        <h3 className="congratulation">
                            {t("Congratulations")}!
                        </h3>
                        <p className="congratulation_pera">

                            {t("Get cash rewords and receive them immediately in you account")}
                        </p>



                        {
                            itemWinner?.id == 6 &&
                            <div className="flex justify-center">
                                    <img src={"https://api.rich-farmer.online/uploads/vip0.png"} width={175} />
                            </div>

                        }
                      
                        
                        {
                            itemWinner?.label && <div>
                                <>
                                    <div className="discreate">
                                        <img src={itemWinner?.img} width={100}/>
                                    </div>
                                    <h3 className="receivedable_amount">{itemWinner?.label}</h3>
                                </>

                            </div>

                        }
                        {/* <div>
                                <div className="discreate">

                                </div>
                            </div> */}


                        <div style={{ textAlign: "center" }} className="mt-3">
                            <button className="recBtn" onClick={() => setItemWinner(null)}>
                                OK
                            </button>
                        </div>

                    </div>

                </div>


                <div className="drawbox" data-v-dd46357c="">
                    {
                        rewardItems.map((item, index) => (
                            <div className="drawAmountSize" key={index} data-v-dd46357c=""

                            >
                                <div className={`listcuct item${index + 1}`} data-v-dd46357c=""
                                    style={{
                                        // filter: activeIndex === index ? "drop-shadow(black 2px 4px 6px)" : 'none'
                                        background: activeIndex === index ? `url(${actice_bg})` : "",

                                    }}
                                >
                                    <div data-v-dd46357c="" className="flex flex-col justify-center items-center h-full">
                                        <img
                                            src={
                                                item.img
                                            }
                                            data-v-dd46357c=""

                                        />
                                        {
                                            item.label && <p data-v-dd46357c="" className="!text-[12px]">{item.label}</p>
                                        }

                                    </div>
                                </div>

                            </div>
                        ))
                    }

                    <button

                        className="drawuis" data-v-dd46357c="" id="drawBtn" onClick={() => {
                            if (user && user?.drawNum <= 0) {
                                return setOpenDrawMoney(true)
                            }
                            handleLuckyWell(false)
                        }}>
                        <p data-v-dd46357c="" className="!text-[17px] !font-[900]">
                            {t("Draw")}
                        </p>
                    </button>

                </div>
                <div className="text-[3rem] font-[900] text-center my-2">
                    {t("Quay miễn phí")} : {user?.drawNum || 0}
                </div>
                <div className="text-[3rem] font-[900] text-center my-2">
                    {t("Số dư")} : {formatNumber(user?.realBalance?.toLocaleString())}
                </div>
                <div className="ruleui" data-v-dd46357c="">
                    <p data-v-dd46357c="" className="ml-[70px]">{t("Rule Of Activity")}</p>
                </div>
                <div className="currently pb-[100rem]" data-v-dd46357c="">
                    <p className="texti " data-v-dd46357c="">
                        {t("rule_luckydraw")}
                    </p>
                </div>
            </div>
        </div>

    )
}

export default LuckyWeel