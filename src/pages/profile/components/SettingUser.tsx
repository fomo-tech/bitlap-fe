import React from "react";
import { CopyOutlined, EditOutlined } from "@ant-design/icons";
import { useAuthApp } from "store/useAuthApp";
import { useNavigate } from "react-router-dom";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { useTranslation } from "react-i18next";

interface InfoRowProps {
    label: string;
    value: React.ReactNode;
    copyable?: boolean;
    editable?: boolean;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value, copyable, editable }) => {
    const [_, copyToClipboard] = useCopyToClipboard();
    const { t } = useTranslation()
    return (
        <div className="flex justify-between items-center hover:bg-[#23262d] px-[8px] py-[6px] rounded-[8px] transition-all">
            <span className="text-[#888888] text-[13px]">{label}</span>
            <div className="flex items-center gap-[8px]">
                <span className="text-white text-[14px] font-medium truncate max-w-[160px] text-right">{value}</span>
                {copyable && (
                    <CopyOutlined
                        onClick={() => copyToClipboard(value?.toString() || "")}
                        className="text-[#FFD700] cursor-pointer hover:text-[#FFF5C0] transition"
                    />
                )}
                {editable && (
                    <EditOutlined className="text-[#FFD700] cursor-pointer hover:text-[#FFF5C0] transition" />
                )}
            </div>
        </div>
    );
};

const SettingUser: React.FC = () => {
    const { user } = useAuthApp();
    const navigate = useNavigate();
    const { t } = useTranslation()
    return (
        <div className="min-h-screen bg-[#0f1014] text-white font-sans">
            {/* Header */}
            <div className="relative h-[180px] bg-gradient-to-r from-[#1e1e2e] to-[#0f1117] shadow-lg">
                <button
                    className="absolute  top-[16px] left-[16px] w-[32px] h-[32px] flex items-center justify-center z-10"
                    onClick={() => navigate("/profile")}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[20px] h-[20px] text-[#FFD700]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-[18px] font-bold text-white text-center pt-[20px] tracking-wide drop-shadow-md">
                    {t("Hồ sơ của tôi")}
                </h1>
            </div>

            {/* Avatar */}
            <div className="flex flex-col items-center -mt-[64px]">
                <div className="relative">
                    <div className="w-[116px] h-[116px] rounded-full p-[3px] bg-gradient-to-br from-[#f9d776] via-[#e6b24c] to-[#c8961e] shadow-[0_0_12px_rgba(255,215,0,0.4)]">
                        <img
                            src="https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8="
                            alt="avatar"
                            className="w-full h-full rounded-full object-cover bg-[#1c1c1c]"
                        />
                    </div>
                </div>
                <div className="mt-[12px] flex items-center gap-[6px]">
                    <span className="text-[20px] font-semibold text-white">{user?.userName}</span>
                </div>
            </div>

            {/* Info Card */}
            <div className="mt-[28px] mx-[16px] bg-[#1a1c22] rounded-[16px] p-[16px] shadow-[0_2px_16px_rgba(0,0,0,0.5)] border border-[#ffffff14]">
                <h2 className="text-[15px] font-semibold text-[#FFD700] mb-[12px] tracking-wider">
                    {t("Thông tin")}
                </h2>
                <div className="space-y-[10px]">
                    <InfoRow label="ID" value={user?._id} copyable />
                    <InfoRow label="User ID" value={user?.userId} copyable />
                    <InfoRow label={t("Loại tài khoản")} value={"Normal"} />
                    <InfoRow label={t("Số điện thoại")} value={"+84 " + user?.phone} />
                    <InfoRow label="IP" value={user?.registerIp} />
                </div>
                <div className="bg-animation">
                    <div id="stars" />
                    <div id="stars2" />
                    <div id="stars3" />
                    <div id="stars4" />
                </div>
            </div>
        </div>
    );
};

export default SettingUser;
