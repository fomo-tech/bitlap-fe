import { useLocation, useNavigate } from "react-router-dom";


const tabs = [
    {
        label: "Home", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>,
        to: "/"
    },
    {
        label: "Progress", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
        </svg>,
        to: "/order"
    },
    {
        label: "", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
        </svg>

        , center: true,
        to: "/trading"
    },
    {
        label: "Rewards", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
        </svg>,
        to: "/activity"

    },
    {
        label: "Profile", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>,
        to: "/profile"
    },
];

const TabBar = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    return (
        <div className="tab-bar z-[999] fixed bottom-0 left-0 right-0 bg-[#11100E] px-[12px] py-[8px] flex justify-between items-center shadow-t-md rounded-t-[24px] border-t border-[#3B3B3B]">
            {tabs.map((tab, index) => {
                const isActive = pathname === tab.to;

                // nút chính giữa
                if (tab.center) {
                    return (
                        <div
                            key={index}
                            onClick={() => navigate(tab.to)}
                            className="relative -mt-[28px] w-[70px] h-[70px] rounded-full 
                           bg-gradient-to-br from-[#F9E6B1] via-[#F6C85C] to-[#A37000] 
                           shadow-[0_8px_24px_rgba(202,154,84,0.6)] 
                           flex items-center justify-center cursor-pointer 
                           transition-transform duration-200 hover:scale-[1.1]"
                        >
                            {/* glow pulse */}
                            <div className="absolute inset-0 rounded-full animate-pulse bg-gradient-to-br from-[#F9E6B1]/30 to-transparent blur-[10px] opacity-50 pointer-events-none" />
                            <span className="text-[28px] text-[#1A1300]">{tab.icon}</span>
                        </div>
                    );
                }

                // các tab thường
                return (
                    <div
                        key={index}
                        onClick={() => navigate(tab.to)}
                        className={`flex flex-col items-center justify-center w-1/5 cursor-pointer transition-colors duration-200 ${isActive
                            ? "text-[#CCA354]"
                            : "text-[#777777] hover:text-[#BFA450]"
                            }`}
                    >
                        <span className="text-[22px] mb-[2px]">{tab.icon}</span>
                        <span className="text-[12px] font-medium uppercase tracking-wide">
                            {tab.label}
                        </span>
                    </div>
                );
            })}
        </div>

    );
};

export default TabBar;
