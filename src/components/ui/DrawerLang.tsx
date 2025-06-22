import { Drawer } from 'antd'
import clsx from 'clsx';

import { useTranslation } from 'react-i18next';


interface Props {
    setOpenLang: (val: boolean) => void,
    openLang: boolean
}
export const DrawerLang = ({ openLang, setOpenLang }: Props) => {
    const { i18n, t } = useTranslation();
    const handleChangeLang = (lang: string) => {
        localStorage.setItem("lang", lang);
        i18n.changeLanguage(lang);
        setOpenLang(false)
    }
    //https://img.icons8.com/?size=100&id=-_RS8ho736Fs&format=png&color=000000
    const languages = [
        { code: "en", label: "English", icon: "NvYRxC2UBsLO" },
        { code: "vi", label: "Tiếng Việt", icon: "2egPD0I7yi4-" },
        { code: "zh", label: "中文", icon: "Ej50Oe3crXwF" },
        { code: "in", label: "हिन्दी", icon: "esGVrxg9VCJ1" },
        { code: "ko", label: "한국말", icon: "-_RS8ho736Fs" }
    ];
    return (
        <Drawer
            closeIcon={
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            }
            title={
                <h2 className="relative text-center text-[20px] font-semibold text-white">
                    {t("lang")}

                </h2>
            }
            placement="right"
            closable
            onClose={() => setOpenLang(false)}
            open={openLang}
            width={"100rem"}
            maskStyle={{ backdropFilter: 'blur(4px)' }}
            bodyStyle={{ background: '#1a1a1f', padding: 0 }}
            headerStyle={{ borderBottom: 'none', background: '#1a1a1f' }}
        >
            <div className="language-list px-[16px] py-[12px] space-y-[8px]">
                {languages.map(({ code, label, icon }) => (
                    <div
                        key={code}
                        onClick={() => handleChangeLang(code)}
                        className={clsx(
                            "flex items-center gap-[12px] px-[16px] py-[12px] rounded-[8px] cursor-pointer transition-colors",
                            {
                                "bg-[#2a2a2a] border-l-4 border-[#C49B06]": i18n.language === code,
                                "hover:bg-[#2a2a2a]": i18n.language !== code,
                            }
                        )}
                    >
                        <img
                            src={`https://img.icons8.com/?size=100&id=${icon}&format=png&color=ffffff`}
                            width={32}
                            height={32}
                            className="rounded-[6px]"
                            alt={code}
                        />
                        <span className="text-white text-[15px] font-semibold flex-1 capitalize">{label}</span>
                        {i18n.language === code && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-5 text-[#C49B06]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </div>
                ))}
            </div>
        </Drawer>


    )
}
