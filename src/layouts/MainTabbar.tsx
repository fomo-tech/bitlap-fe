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
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>

        ,
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
        </svg>
        ,
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
        <div className="max-w-[500px] w-full mx-auto z-[999] fixed bottom-0 left-0 right-0 bg-[#0E0D0C] px-[12px] py-[10px] flex justify-between items-center shadow-[0_-4px_24px_rgba(255,215,0,0.08)] rounded-t-[20px] border-t border-[#2A2A2A] backdrop-blur-[6px]">
            {tabs.map((tab, index) => {
                const isActive = pathname === tab.to;

                if (tab.center) {
                    return (
                        <div
                            key={index}
                            onClick={() => navigate(tab.to)}
                            className="relative -mt-[28px] w-[66px] h-[66px] rounded-full 
          bg-gradient-to-br from-[#F9D776] via-[#F6C85C] to-[#B5851E] 
          shadow-[0_4px_12px_rgba(234,183,78,0.5)] 
          flex items-center justify-center cursor-pointer 
          transition-transform duration-200 hover:scale-[1.05] border-[3px] border-[#1A1A1A]"
                        >
                            <div className="absolute inset-0 rounded-full bg-[#F6D97A]/30 blur-[12px] animate-pulse pointer-events-none" />
                            <span className="text-[26px] text-[#1F1400] font-bold">{tab.icon}</span>
                        </div>
                    );
                }

                return (
                    <div
                        key={index}
                        onClick={() => navigate(tab.to)}
                        className={`flex flex-col items-center justify-center w-1/5 cursor-pointer transition-all duration-200 ${isActive
                            ? "text-[#F6C85C]"
                            : "text-[#888888] hover:text-[#CFAF5C]"
                            }`}
                    >
                        <span className={`text-[20px] mb-[2px] ${isActive ? "scale-[1.05]" : ""}`}>
                            {tab.icon}
                        </span>
                        {/* <span className="text-[11px] font-medium uppercase tracking-wide">
                            {tab.label}
                        </span> */}
                    </div>
                );
            })}
        </div>


    );
};

export default TabBar;
