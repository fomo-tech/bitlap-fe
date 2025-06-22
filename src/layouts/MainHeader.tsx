import { Drawer } from 'antd'
import logo from 'assets/new_img/logo.png'
import { DrawerLang } from 'components/ui/DrawerLang'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import avt_default from 'assets/avt/11.9a5f90bc.png'
import dolar from 'assets/images/dollar.png'
import { useAuthApp } from 'store/useAuthApp'
import { formatNumber } from 'lib/helpers'
const MainHeader = () => {
    const [openLang, setOpenLang] = useState(false)
    const { i18n } = useTranslation();
    const { user } = useAuthApp()

    const flagImages: Record<string, string> = {
        en: "https://img.icons8.com/?size=100&id=NvYRxC2UBsLO&format=png&color=ffffff",      // 🇺🇸 English
        vi: "https://img.icons8.com/?size=100&id=2egPD0I7yi4-&format=png&color=ffffff",     // 🇻🇳 Vietnamese
        zh: "https://img.icons8.com/?size=100&id=Ej50Oe3crXwF&format=png&color=ffffff",     // 🇨🇳 Chinese
        in: "https://img.icons8.com/?size=100&id=esGVrxg9VCJ1&format=png&color=000000",
        ko: "https://img.icons8.com/?size=100&id=-_RS8ho736Fs&format=png&color=000000"
        // 🇮🇳 Hindi
    };


    return (
        <div className="fixed top-0 left-0 right-0 z-[100] sm:max-w-[100rem] m-auto flex items-center justify-between p-[3.2rem] bg-[#000000]"
            style={{
                boxShadow: "0 1rem .83333rem #64656614",
                borderBottom: "1px solid rgba(240, 152, 53, 0.5)"
            }}
        >
            <div className='flex gap-2 items-center relative'>
                <img src={logo} alt='logo' className=' w-[35rem] ' />
            </div>
            <div
                className="w-[8rem] h-[8rem] flex justify-center items-center rounded-full bg-[#f5f5f5]"
                onClick={() => setOpenLang(true)}
            >
                <img
                    src={flagImages[i18n.language] || flagImages['en']}
                    alt={i18n.language}
                    width={40}
                    height={40}
                    className="rounded-full"
                />
            </div>

            <DrawerLang
                openLang={openLang}
                setOpenLang={setOpenLang}
            />
        </div>

    )
}

export default MainHeader