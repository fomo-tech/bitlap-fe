import { formatNumber } from 'lib/helpers';
import React, { useRef } from 'react'
import { useAuthApp } from 'store/useAuthApp';
interface Props {
    setMoneyValue: (val: number) => void,
    moneyValue: number
}
const KeyBoard = ({ setMoneyValue, moneyValue }: Props) => {
    const { user } = useAuthApp()

    const onSetMoneyValue = (value: any) => {
        if (!user) return;

        let balance = user?.realBalance || 0;

        let money_value = parseFloat(
            moneyValue === 0 ? value : moneyValue + "" + value
        );
        if (money_value > balance) {
            money_value = balance;
        }
        setMoneyValue(money_value);
    };

    const onClear = () => {
        setMoneyValue(0);
    };

    const removeMoney = () => {
        let money_value = moneyValue.toString();
        money_value =
            money_value.length > 1
                ? money_value.substr(0, money_value.length - 1)
                : "0";
        setMoneyValue(parseFloat(money_value));
    };


    const onClickMoney = (input: string | number) => {
        if (!user) return;

        const balance = user?.realBalance || 0;
        let current = moneyValue.toString();

        if (input === "ALL" || input === "Tất cả") {
            setMoneyValue(balance);
            return;
        }

        if (input === "ADD") {
            return setMoneyValue(Math.min(moneyValue + 0.5, balance));
        }

        if (input === "SUB") {
            return setMoneyValue(Math.max(moneyValue - 0.5, 0));
        }

        if (input === "⌫") {
            const newStr = current.slice(0, -1) || "0";
            setMoneyValue(parseFloat(newStr));
            return;
        }

        if (input === "Xong") {
            // setIsShowKeyBoard(false);
            return;
        }

        if (input === ".") {
            if (!current.includes(".")) {
                current += ".";
                setMoneyValue(parseFloat(current));
            }
            return;
        }

        const strInput = String(input);
        if (!/^\d$/.test(strInput)) return;

        // Ghép số vào string rồi parse lại
        const newStr = current === "0" ? strInput : current + strInput;
        const parsed = parseFloat(newStr);
        setMoneyValue(parsed > balance ? balance : parsed);
    };


    const onChangeMoneyValue = (e: any) => {
        let money_value =
            parseFloat(e.target.value.toString().replace(/,/g, "")) || 0;
        setMoneyValue(money_value);
    };
    return (
        <div className="text-white px-[16px] pt-[16px] pb-[12px] rounded-t-[20px] w-full bg-[#2b2419] space-y-[12px]">

            {/* Tăng giảm tiền */}
            <div className="flex items-center space-x-[8px]">
                <button
                    onClick={() => onClickMoney("SUB")}
                    className="bg-[#e0b054]/20 w-[90px] h-[45px] rounded-[8px] text-[18px] font-semibold hover:bg-[#c89d3f] hover:text-black transition"
                >
                    −
                </button>
                <div className="flex-1 h-[45px] flex items-center border border-[#e0b054]/30 rounded-[8px] bg-[#1f1a13]">
                    <input
                        onChange={onChangeMoneyValue}
                        value={formatNumber(moneyValue)}
                        type="text"
                        className="h-full w-full px-[16px] text-white bg-transparent outline-none text-[16px] text-left"
                    />
                    <span className="mx-[12px] cursor-pointer" onClick={onClear}>
                        <img
                            src="data:image/svg+xml;base64,..."
                            alt=""
                            width="16"
                            height="16"
                        />
                    </span>
                </div>
                <button
                    onClick={() => onClickMoney("ADD")}
                    className="bg-[#e0b054]/20 w-[90px] h-[45px] rounded-[8px] text-[18px] font-semibold hover:bg-[#c89d3f] hover:text-black transition"
                >
                    +
                </button>
            </div>

            {/* Lợi nhuận */}
            <div className="text-center text-[14px] text-[#d2b67e]">
                Lợi nhuận <span className="text-[#e0b054] font-semibold">97%</span>{" "}
                <span className="text-green-500 font-bold">+$39</span>
            </div>

            {/* Tăng nhanh */}
            <div className="grid grid-cols-4 gap-[8px]">
                {["+5", "+10", "+50", "+100"].map((label) => (
                    <button
                        onClick={() => onSetMoneyValue(label)}
                        key={label}
                        className="bg-gradient-to-br from-[#e0b054] to-[#c89d3f] text-black py-[10px] rounded-[10px] text-[14px] font-semibold hover:opacity-90 shadow-md"
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Bàn phím số */}
            <div className="grid grid-cols-4 gap-[8px]">
                {[
                    "1", "2", "3", "Tất cả",
                    "4", "5", "6", "",
                    "7", "8", "9", "",
                    ".", "0", "⌫", "Xong",
                ].map((label, idx) => (
                    <button
                        key={idx}
                        onClick={() => onClickMoney(label)}
                        className={`py-[12px] text-[16px] font-semibold rounded-[10px] transition
                        ${label
                                ? "bg-[#3d321c] text-white hover:bg-[#4e3f23] shadow-sm"
                                : "bg-transparent pointer-events-none"}
                        ${label === "Tất cả" || label === "Xong"
                                ? "text-[13px] font-semibold"
                                : ""}
                    `}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>


    )
}

export default KeyBoard
