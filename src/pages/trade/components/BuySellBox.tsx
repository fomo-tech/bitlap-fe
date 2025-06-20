import { Drawer, notification } from "antd";
import clsx from "clsx";
import { socket } from "lib/socket";
import { useEffect, useRef, useState } from "react";
import { useAuthApp } from "store/useAuthApp";
import KeyBoard from "./KeyBoard";
import useOnClickOutside from "hooks/useOnCliclOutSide";
import requestService from "api/request";
import { formatNumber } from "lib/helpers";
import { useGlobalAppStore } from "store/useGlobalApp";

interface Props {
    getTransactions: () => void
}

export default function BuySellBox({ getTransactions }: Props) {
    const { user } = useAuthApp()
    const { handleCallbackUser } = useGlobalAppStore()
    const [dataButonTrade, setDataButonTrade] = useState<{
        isBet: boolean;
        second: number;
    }>({ isBet: false, second: 0 })
    const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);
    const [moneyValue, setMoneyValue] = useState<number>(0);
    const keyBoardRef = useRef<any>();

    useEffect(() => {
        const handleUpdateState = (data: { isBet: boolean, second: number }) => {
            setDataButonTrade({ ...data });
        };

        if (!user) return;

        const handleWePrice = ({ isBet, second }: { isBet: boolean, second: number }) => {
            handleUpdateState({ isBet, second });
        };

        socket.on("WE_PRICE", handleWePrice);

        return () => {
            socket.off("WE_PRICE", handleWePrice);
        };
    }, [user]);


    useOnClickOutside(keyBoardRef, () => {
        isShowKeyBoard && setIsShowKeyBoard(false);
    });

    const onBet = async (bet_condition: 'up' | 'down') => {
        try {
            const res = await requestService.post("/trading/bet", {
                data: {
                    bet_condition,
                    bet_value: moneyValue,
                },
            });
            if (res && res.data) {

                // if (current_point_type === "demo")
                //     dispatch(
                //         onSetUser({
                //             ...user,
                //             demo_balance: user?.demo_balance - moneyValue,
                //         })
                //     );
                // if (current_point_type === "real") {
                //     dispatch(
                //         onSetUser({
                //             ...user,
                //             real_balance: user?.real_balance - moneyValue,
                //         })
                //     );
                // }
                notification.success({ message: res?.data?.message, duration: 3, placement: "top" });
                handleCallbackUser()
                getTransactions()

                // const sound = window.document.getElementById(
                //     "bet"
                // ) as HTMLVideoElement | null;
                // if (sound) {
                //     sound.play();
                // }
            }
        } catch (error: any) {
            notification.error({
                message:
                    error?.response?.data?.message ||
                    "Có lỗi xảy ra. Vui lòng thử lại sau",
                duration: 5,
            });
            console.log("====================================");
            console.log(error);
            console.log("====================================");
        }
        setMoneyValue(0);
    };

    const onChangeMoneyValue = (e: any) => {
        let money_value =
            parseFloat(e.target.value.toString().replace(/,/g, "")) || 0;
        setMoneyValue(money_value);
    };

    const onClickMoney = (input: string | number) => {
        if (!user) return;

        const balance = user?.realBalance || 0;

        if (input === "ALL" || input === "Tất cả") {
            setMoneyValue(balance);
            return;
        }
        if (input === "ADD") {
            return setMoneyValue(moneyValue + 1);
        }
        if (input === "SUB") {
            let value = moneyValue - 1;
            value = value < 0 ? 0 : value;
            return setMoneyValue(value);
        }


        if (input === "⌫") {
            const newValue = Math.floor(moneyValue / 10);
            setMoneyValue(newValue);
            return;
        }

        if (input === "Xong") {
            // Submit logic nếu cần
            return;
        }

        if (input === ".") {
            // Bỏ qua nếu không xử lý số thực
            return;
        }

        const parsed = parseInt(String(input));
        if (isNaN(parsed)) return;

        const newValue = moneyValue * 10 + parsed;
        setMoneyValue(newValue > balance ? balance : newValue);
    };

    const onClear = () => {
        setMoneyValue(0);
    };
    return (
        <div className="text-white space-y-[8px] mb-[8px] relative z-[10]">
            {/* Input row */}
            <Drawer

                zIndex={1000}
                title={
                    <div className="text-center text-[15px] text-white font-semibold">
                        Giá trị đặt
                    </div>
                }
                className="keybord-drawer"
                getContainer={false}
                onClose={() => setIsShowKeyBoard(false)}
                open={isShowKeyBoard}
                placement="bottom"
                height="auto"

            >
                <div ref={keyBoardRef}>
                    <KeyBoard moneyValue={moneyValue} setMoneyValue={setMoneyValue} />
                </div>
            </Drawer>

            <div className="flex items-center space-x-[8px]">
                <button
                    onClick={() => onClickMoney("SUB")}
                    className="bg-[#e0b054cc] w-[90px] h-[45px] rounded-[6px] text-[#2b2419] text-[20px] font-semibold hover:opacity-90 transition shadow-sm">
                    −
                </button>

                <div className="flex-1 h-[45px] flex items-center border border-white/20 rounded-[6px] bg-[#1f1a13]">
                    <input
                        type="text"
                        readOnly
                        onChange={onChangeMoneyValue}
                        value={formatNumber(moneyValue)}
                        onClick={() => setIsShowKeyBoard(true)}
                        className="text-left h-full w-full px-5 text-white bg-transparent outline-none text-[18px]"
                    />
                    <span className="mx-4 cursor-pointer" onClick={onClear}>
                        <img
                            src="data:image/svg+xml;base64,..."
                            alt=""
                        />
                    </span>
                </div>

                <button
                    onClick={() => onClickMoney("ADD")}
                    className="bg-[#e0b054cc] w-[90px] h-[45px] rounded-[6px] text-[#2b2419] text-[20px] font-semibold hover:opacity-90 transition shadow-sm"
                >
                    +
                </button>
            </div>


            {/* Action buttons row */}
            <div className="grid grid-cols-3 gap-[8px]">
                <button
                    onClick={() => onBet('down')}
                    disabled={!dataButonTrade.isBet}
                    className={clsx(" h-[45px] rounded-[6px] font-bold text-[16px] hover:opacity-90 transition flex justify-center items-center gap-4", {
                        "bg-[#cccc]": !dataButonTrade.isBet,
                        "bg-[#e62a2a]": dataButonTrade.isBet
                    })}>
                    BÁN <svg
                        data-v-05054441=""
                        xmlns="http://www.w3.org/2000/svg"
                        width="23.587"
                        height="11.921"
                        viewBox="0 0 23.587 11.921"
                    >
                        <g data-v-05054441="" id="trend-down" transform="translate(-0.342 -8)">
                            <path
                                data-v-05054441=""
                                id="Path_26234"
                                data-name="Path 26234"
                                d="M23.929,19.921H14.988l3.944-3.944L12.785,9.831,7.35,15.945a.744.744,0,0,1-1.048.066L.342,10.8l.981-1.122,5.4,4.729L12.2,8.25A.747.747,0,0,1,12.731,8h.022a.743.743,0,0,1,.527.218l6.705,6.705,3.944-3.944Z"
                                fill="#fff"
                            />
                        </g>
                    </svg>

                </button>
                <div className="bg-[#2f281e] h-[45px] rounded-[6px] flex flex-col items-center justify-center text-[14px] leading-[16px] text-white">
                    <span>{dataButonTrade.isBet ? "Hãy đặt lệnh" : "Chờ Kết Quả"}</span>
                    <span className="text-yellow-400 font-bold text-[13px]">{dataButonTrade.second}s</span>
                </div>
                <button
                    onClick={() => onBet('up')}
                    disabled={!dataButonTrade.isBet}
                    className={clsx(" h-[45px] rounded-[6px] font-bold text-[16px] hover:opacity-90 transition flex justify-center items-center gap-4", {
                        "bg-[#cccc]": !dataButonTrade.isBet,
                        "bg-[#3ae64e]": dataButonTrade.isBet
                    })}>
                    MUA <svg data-v-05054441="" xmlns="http://www.w3.org/2000/svg" width="23.087" height="11.668" viewBox="0 0 23.087 11.668"><path data-v-05054441="" id="Path_26233" data-name="Path 26233" d="M23.429,8H14.678l3.86,3.86-6.016,6.016L7.2,11.891a.728.728,0,0,0-1.025-.065l-5.834,5.1.96,1.1L6.592,13.4l5.353,6.022a.732.732,0,0,0,.524.245h.021a.727.727,0,0,0,.516-.214l6.563-6.563,3.86,3.86Z" transform="translate(-0.342 -8)" fill="#fff"></path></svg>
                </button>
            </div>
        </div>
    );
}
