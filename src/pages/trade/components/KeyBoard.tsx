import { formatNumber } from 'lib/helpers';
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useAuthApp } from 'store/useAuthApp';
interface Props {
    setMoneyValue: (val: number) => void,
    moneyValue: number,
    setIsShowKeyBoard: (val: boolean) => void
}
const KeyBoard = ({ setMoneyValue, moneyValue, setIsShowKeyBoard }: Props) => {
    const { user } = useAuthApp()
    const { t } = useTranslation()
    const [moneyInput, setMoneyInput] = useState("0"); // string hiển thị

    const onSetMoneyValue = (label: string) => {
        const balance = user?.realBalance || 0;

        // Trích số từ chuỗi như "+5"
        const amount = parseFloat(label.replace("+", ""));

        if (isNaN(amount)) return;

        const next = Math.min(moneyValue + amount, balance);
        setMoneyInput(next.toString());
        setMoneyValue(next);
    };


    const onClear = () => {
        setMoneyValue(0);
        setMoneyInput("0")
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

        if (input === "ALL" || input === "Tất cả") {
            setMoneyInput(balance.toString());
            setMoneyValue(balance);
            return;
        }

        if (input === "ADD") {
            const next = Math.min(moneyValue + 1, balance);
            setMoneyInput(next.toString());
            setMoneyValue(next);
            return;
        }

        if (input === "SUB") {
            const next = Math.max(moneyValue - 1, 0);
            setMoneyInput(next.toString());
            setMoneyValue(next);
            return;
        }

        if (input === "⌫") {
            const newStr = moneyInput.slice(0, -1) || "0";
            setMoneyInput(newStr);
            const parsed = parseFloat(newStr);
            setMoneyValue(isNaN(parsed) ? 0 : parsed);
            return;
        }

        if (input === "Xong") {
            setIsShowKeyBoard(false);
            return;
        }

        if (input === "." && moneyInput.includes(".")) {
            return; // Chỉ cho 1 dấu chấm
        }

        const strInput = String(input);
        if (input === "." || /^\d$/.test(strInput)) {
            const newStr =
                moneyInput === "0" && strInput !== "." ? strInput : moneyInput + strInput;
            setMoneyInput(newStr);

            const parsed = parseFloat(newStr);
            if (!isNaN(parsed)) {
                setMoneyValue(parsed > balance ? balance : parsed);
            }
        }
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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

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
                {t("Lợi nhuận")} <span className="text-[#e0b054] font-semibold">97%</span>{" "}
                <span className="text-green-500 font-bold">+${Number((moneyValue * 97 / 100)?.toFixed(3))}</span>
            </div>

            {/* Tăng nhanh */}
            <div className="grid grid-cols-4 gap-[8px]">
                {["+5", "+10", "+50", "+100"].map((label) => (
                    <button
                        onClick={() => onSetMoneyValue(label)}
                        key={label}
                        className="bg-gradient-to-br from-[#e0b054] to-[#c89d3f] text-black py-[10px] rounded-[10px] text-[14px] font-semibold hover:opacity-90 shadow-md"
                    >
                        {t(label)}
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
