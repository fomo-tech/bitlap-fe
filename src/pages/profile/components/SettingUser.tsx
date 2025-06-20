import React from "react";
import { CopyOutlined, EditOutlined } from "@ant-design/icons";
import { useAuthApp } from "store/useAuthApp";
import { useNavigate } from "react-router-dom";
import { useCopyToClipboard } from "@uidotdev/usehooks";

interface User {
    avatar: string;
    id: string;
    verified: boolean;
    onusId: string;
    accountType: string;
    name: string;
    email?: string;
    phone: string;
    address?: string;
}

interface InfoRowProps {
    label: string;
    value: React.ReactNode;
    copyable?: boolean;
    editable?: boolean;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value, copyable, editable }) => (
    <div className="flex justify-between items-center">
        <span className="text-[#AAA] text-[14px]">{label}</span>
        <div className="flex items-center gap-[8px]">
            <span className="text-white text-[14px] font-medium">{value}</span>
            {copyable && (
                <CopyOutlined className="text-[#FFD700] cursor-pointer" />
            )}
            {editable && (
                <EditOutlined className="text-[#FFD700] cursor-pointer" />
            )}
        </div>
    </div>
);



const SettingUser: React.FC = () => {
    const { user } = useAuthApp()
    const navigate = useNavigate()
    const [_, copyToClipboard] = useCopyToClipboard();
    return (
        <div className="min-h-screen bg-[#121418] text-white font-sans ">
            {/* Header */}
            <div className="relative h-[180px] bg-gradient-to-r from-[#1f1f2e] to-[#0f1117] shadow-md">
                <button
                    className="absolute top-[16px]  z-[10] left-[16px] w-[32px] h-[32px] flex items-center justify-center"
                    onClick={() => navigate('/profile')}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[20px] h-[20px] text-[#facc15]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-[18px] font-bold text-white text-center pt-[16px] tracking-wide drop-shadow-sm">
                    Hồ sơ của tôi
                </h1>
            </div>

            {/* Avatar */}
            <div className="flex flex-col items-center -mt-[60px]">
                <div className="relative">
                    <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-[#2e2e2e] to-[#1c1c1c] p-[2px] shadow-[0_0_10px_rgba(255,215,0,0.25)]">
                        <img
                            src={"https://img.icons8.com/?size=100&id=7820&format=png&color=facc15"}
                            alt="avatar"
                            className="w-[116px] h-[116px] rounded-full object-cover bg-[#2e2e2e]"
                        />
                    </div>
                    {/* <button className="absolute bottom-[4px] right-[4px] w-[28px] h-[28px] bg-[#1c1c1c] rounded-full flex items-center justify-center shadow-md border border-[#2d2d2d]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-[16px] h-[16px] text-[#facc15]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                    </button> */}
                </div>

                <div className="mt-[12px] flex items-center gap-[6px]">
                    <span className="text-[20px] font-semibold">{user?.userName}</span>
                </div>
            </div>

            {/* Info Card */}
            <div className="mt-[24px] mx-[16px] bg-[#1d1f26] rounded-[16px] p-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.6)] border border-[#ffffff14]">
                <h2 className="text-[16px] font-semibold text-[#facc15] mb-[12px] tracking-wide">
                    Thông tin
                </h2>
                <div className="space-y-[12px] text-[14px]">
                    <InfoRow label="ID" value={user?._id} copyable />
                    <InfoRow label="User ID" value={user?.userId} copyable />
                    <InfoRow label="Loại tài khoản" value={"Normal"} />
                    <InfoRow label="Số điện thoại" value={"+84 " + user?.phone} />
                    <InfoRow label="IP" value={user?.registerIp} />
                </div>
            </div>
        </div>


    );
};

export default SettingUser;
