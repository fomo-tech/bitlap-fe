import React from 'react'
import win_icon from 'assets/new_img/icon_win.svg'
import { useTranslation } from 'react-i18next';
const PopupCongralation = ({ data, setOpenResult }: { data: any; setOpenResult: any }) => {
    const { t } = useTranslation()
    if (!data?.winCount) return null
    return (
        <div data-v-d291ee96="" data-v-5b2de64c="" className="popupCongratulation relative z-[100]">
            <div data-v-d291ee96="" className="mask" />
            <div data-v-d291ee96="" className="popupCongratulationContent">
                <div data-v-d291ee96="" className="winLive flex justify-center">
                    <div data-v-d291ee96="" className="wrapNotify congratulation h-full">
                        <div data-v-d291ee96="" className="boxNotify h-full">
                            <img data-v-d291ee96="" src={win_icon} alt="" className="iconWin" />
                            <div data-v-d291ee96=""
                                className="boxContent flex justify-center items-center flex-col  h-full relative z-[10]">
                                <div data-v-d291ee96="" className="flex items-center" />
                                <p data-v-d291ee96="" className="text-[20px] font-[700]">{t("Xin chúc mừng")}!</p>
                                <span data-v-d291ee96=""
                                    className="message !text-[40px] font-bold">+${data?.totalValue || 0}</span>
                                <span data-v-d291ee96="" className="z-[20] absolute top-[-50px] right-[50px] cursor-pointer" onClick={() => setOpenResult(null)}>
                                    <svg data-v-d291ee96=""
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="13.21"
                                        height="13.21"
                                        viewBox="0 0 13.21 13.21"
                                        className="iconClose">
                                        <path
                                            data-v-d291ee96="" id="Path_2957" data-name="Path 2957"
                                            d="M13.823,1.387a1.321,1.321,0,0,0-1.868,0L7.6,5.737l-4.35-4.35A1.321,1.321,0,1,0,1.387,3.255L5.737,7.6l-4.35,4.35a1.321,1.321,0,1,0,1.868,1.868L7.6,9.473l4.35,4.35a1.321,1.321,0,1,0,1.868-1.868L9.473,7.6l4.35-4.35A1.321,1.321,0,0,0,13.823,1.387Z"
                                            transform="translate(-1 -1)" fill="#fff" />
                                    </svg>
                                </span>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PopupCongralation