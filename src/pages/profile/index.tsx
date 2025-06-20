import requestService from "api/request";
import { AddPaymentMethod } from "components/ui/AddPaymentMethod";
import { DrawerLang } from "components/ui/DrawerLang";
import WalletSummary from "components/ui/profile/WalletSummary";
import SecurityCenter from "components/ui/SecurityCenter";
import { removeLocalStoreageUser } from "lib/helpers";
import React, { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuthApp } from "store/useAuthApp";

type MenuItem = {
    icon: ReactNode; // dùng emoji hoặc thay SVG/icon riêng
    label: string;
    value?: string;
    onClick?: () => void
};

const SettingMenu = () => {
    const navigate = useNavigate()
    const { logoutUser } = useAuthApp()
    const [openAddMethod, setOpenAddMethod] = useState(false)
    const [openSecurity, setOpenSecurity] = useState(false)
    const { t, i18n } = useTranslation()
    const [openLang, setOpenLang] = useState(false)

    const langText = () => {
        switch (i18n.language) {
            case 'en': return "English";
            case 'zh': return "中文";
            case 'vi': return "Tiếng Việt";
            case 'ko': return "한국어";         // Tiếng Hàn
            case 'ja': return "日本語";         // Tiếng Nhật
            default: return "Tiếng Việt";      // fallback
        }
    };
    const menuItems: MenuItem[] = [
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            , label: "Hồ sơ của tôi",
            onClick: () => navigate("/setting-account")
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
            </svg>
            , label: "Phân tích giao dịch",
            onClick: () => navigate("/transaction-analysis")
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
            </svg>
            , label: "Giới thiệu",
            onClick: () => navigate("/affiliate")
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
            </svg>
            , label: "Ngôn ngữ", value: langText(),
            onClick: () => setOpenLang(true)

        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            , label: "Đổi mật khẩu",
            onClick: () => setOpenSecurity(true)
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
            </svg>
            , label: "Tài khoản ngân hàng",
            onClick: () => setOpenAddMethod(true)
        },


    ];
    const handleLogout = async () => {
        try {
            const res = await requestService.delete('/profile')
            if (res && res.data) {
                logoutUser()
                removeLocalStoreageUser()
                navigate('/login')

            }
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className="min-h-screen text-white px-[12px] py-6 relative bg-[#0f0f0f]">

            <AddPaymentMethod
                open={openAddMethod}
                setOpen={setOpenAddMethod}
            />
            <SecurityCenter
                open={openSecurity}
                setOpen={setOpenSecurity}
            />
            <DrawerLang
                openLang={openLang}
                setOpenLang={setOpenLang}
            />
            <h1 className="text-center text-[18px] font-semibold mb-6 relative z-[10] text-[#f2d79b]">
                Profile
                <span
                    className="absolute top-0 left-0 cursor-pointer p-2 z-20 text-[#cca354] hover:text-[#f2d79b] transition"
                    onClick={() => navigate('/')}
                >
                    <svg className="size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </span>
            </h1>

            {/* Star background */}
            <div className="bg-animation">
                <div id="stars" />
                <div id="stars2" />
                <div id="stars3" />
                <div id="stars4" />
            </div>

            {/* Tài khoản info */}
            <div className="flex items-center space-x-3 relative z-[10] mb-4">
                <div className="bg-[#89641b] border-2 border-[#e5c27a] rounded-full w-[40px] h-[40px] flex items-center justify-center text-white">
                    <svg className="size-[30px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-[12px] text-[#f2d79b]">1720040994</div>
                    <div className="text-[12px] text-gray-400">6277729721431615390</div>
                </div>
            </div>

            {/* Tổng quan ví */}
            <WalletSummary />

            {/* Giới thiệu nền tảng */}
            <a href="/landing" target="_blank" className="bg-[#151a21] border border-[#cca35450] rounded-[10px] p-[20px] mb-[10px] flex justify-between items-center hover:bg-[#cca3541a] transition relative z-[10]">
                <span className="text-[15px] text-[#f2d79b]">Giới thiệu nền tảng</span>
                <svg className="size-5 text-[#e5c27a]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                </svg>
            </a>

            {/* Menu chính */}
            <div className="bg-[#151a21] rounded-[10px] p-[20px] divide-y divide-[#333] relative z-[10]"

            >
                {menuItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-[16px] hover:bg-[#cca3541a] cursor-pointer rounded-md transition"
                        onClick={item.onClick}
                    >
                        <div className="flex items-center space-x-4">
                            <span className="text-[18px] text-[#e5c27a]">{item.icon}</span>
                            <span>{item.label}</span>
                        </div>
                        {item.value ? (
                            <span className="text-[15px] text-gray-400">{item.value}</span>
                        ) : (
                            <span className="text-gray-500">
                                <svg className="size-[14px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </span>
                        )}
                    </div>
                ))}
            </div>

            {/* Đăng xuất */}
            <div className="mt-6 bg-[#151a21] border border-[#cca35450] rounded-xl p-4 relative z-[10]"
                onClick={handleLogout}
            >
                <div className="flex justify-between items-center p-[12px] cursor-pointer hover:bg-[#cca3541a] rounded-md transition">
                    <div className="flex items-center gap-2 text-red-400 font-semibold">
                        <svg className="size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
                        </svg>
                        <span>Đăng xuất</span>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SettingMenu;
