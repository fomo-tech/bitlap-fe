import { Drawer, message, notification } from 'antd'
import requestService from 'api/request'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface Props {
    setOpen: (val: boolean) => void,
    open: boolean,

}

const SecurityCenter = ({ open, setOpen }: Props) => {
    const { t } = useTranslation()
    const [openChange, setOpenChange] = useState<string | boolean>(false)
    const [shopPasss, setShowPass] = useState(false)
    const { register, handleSubmit, watch, control, reset, setValue, formState: { errors } } = useForm<{
        oldPassword: string,
        newPassword: string,
        confirmPassword: string
    }>({
    });

    const newPassword = watch("newPassword");

    const onChangePassWord: SubmitHandler<{
        oldPassword: string,
        newPassword: string,
        confirmPassword: string
    }> = async (data) => {
        try {
            const res = await requestService.post('/profile/update-password', {
                data: {
                    oldPassword: data.oldPassword,
                    newPassword: data.newPassword,
                    type: openChange
                }
            })
            if (res && res.data) {
                message.success("Updated")
                reset()
                setOpenChange(false)
            }
        } catch (error: any) {
            setOpenChange(false)
            notification.warning({
                message: error?.response?.data?.message,
                description: 3
            })
        }

    }

    const EyeIcon = () => (
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z' />
            <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
        </svg>
    );

    const EyeSlashIcon = () => (
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88' />
        </svg>
    );
    return (
        <>
            <Drawer
                open={!!openChange}
                onClose={() => setOpenChange(false)}
                placement="bottom"
                height="auto"
                width="100rem"
                zIndex={9999}
                className="security"
                closeIcon={false}
                bodyStyle={{
                    backgroundColor: "#1a120a",
                    padding: 0,

                }}
                headerStyle={{
                    backgroundColor: "#2b1a0e",
                    borderBottom: "1px solid #4a331e",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                }}
                title={
                    <div className="flex justify-between text-[16px] font-[600] text-[#facc15] px-[16px] py-[8px]">
                        <div className="cursor-pointer" onClick={() => setOpenChange(false)}>
                            {openChange === "pass_login" && t("modify login password")}
                            {openChange === "pass_payment" && t("modify payment password")}
                        </div>
                        <div
                            className="cursor-pointer"
                            onClick={() => {
                                setOpenChange(false);
                                reset();
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" strokeWidth={1.5}
                                stroke="currentColor" className="w-[24px] h-[24px] text-[#facc15]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </div>
                }
            >
                <div className="px-[24px] py-[16px]">
                    <form className="space-y-[20px]" onSubmit={handleSubmit(onChangePassWord)}>

                        {/* OLD PASSWORD */}
                        <div className="space-y-[8px]">
                            <label htmlFor="oldPassword" className="text-[#fde68a] text-[14px] font-[500]">
                                {t("Old password")}
                            </label>
                            <div className="relative">
                                <input
                                    id="oldPassword"
                                    type={shopPasss ? "text" : openChange === "pass_payment" ? "tel" : "password"}
                                    inputMode={openChange === "pass_payment" ? "numeric" : undefined}
                                    placeholder={t("please enter the original password")}
                                    className="w-full bg-[#3a291a] text-white border border-[#facc15] rounded-[10px] px-[16px] py-[12px] pr-[40px] placeholder-[#d4d4d4] focus:outline-none focus:ring-[2px] focus:ring-[#facc15]"
                                    {...register("oldPassword", {
                                        required: t("Please enter the old password"),
                                    })}
                                />
                                <div className="absolute right-[12px] top-[12px] text-[#facc15] cursor-pointer" onClick={() => setShowPass(!shopPasss)}>
                                    {shopPasss ? <EyeIcon /> : <EyeSlashIcon />}
                                </div>
                            </div>
                            {errors.oldPassword && <p className="text-[#f87171] text-[13px]">{errors.oldPassword.message}</p>}
                        </div>

                        {/* NEW PASSWORD */}
                        <div className="space-y-[8px]">
                            <label htmlFor="newPassword" className="text-[#fde68a] text-[14px] font-[500]">
                                {t("New Password")}
                            </label>
                            <input
                                id="newPassword"
                                type={shopPasss ? "text" : openChange === "pass_payment" ? "tel" : "password"}
                                inputMode={openChange === "pass_payment" ? "numeric" : undefined}
                                placeholder={t("please enter the new password")}
                                className="w-full bg-[#3a291a] text-white border border-[#facc15] rounded-[10px] px-[16px] py-[12px] placeholder-[#d4d4d4] focus:outline-none focus:ring-[2px] focus:ring-[#facc15]"
                                {...register("newPassword", {
                                    required: t("Please enter the newPassword"),
                                    validate: value => {
                                        if (openChange === "pass_payment" && value.length !== 6) {
                                            return t("Password must be at exactly 6 characters");
                                        }
                                        if (openChange !== "pass_payment" && value.length > 10) {
                                            return t("Password must be at most 10 characters");
                                        }
                                        return true;
                                    },
                                })}
                            />
                            {errors.newPassword && <p className="text-[#f87171] text-[13px]">{errors.newPassword.message}</p>}
                        </div>

                        {/* CONFIRM PASSWORD */}
                        <div className="space-y-[8px]">
                            <label htmlFor="confirmPassword" className="text-[#fde68a] text-[14px] font-[500]">
                                {t("confirm password")}
                            </label>
                            <input
                                id="confirmPassword"
                                type={shopPasss ? "text" : openChange === "pass_payment" ? "tel" : "password"}
                                inputMode={openChange === "pass_payment" ? "numeric" : undefined}
                                placeholder={t("please enter the new password again")}
                                className="w-full bg-[#3a291a] text-white border border-[#facc15] rounded-[10px] px-[16px] py-[12px] placeholder-[#d4d4d4] focus:outline-none focus:ring-[2px] focus:ring-[#facc15]"
                                {...register("confirmPassword", {
                                    required: t("Please enter the confirmPassword"),
                                    validate: value => value === newPassword || t("Passwords do not match"),
                                })}
                            />
                            {errors.confirmPassword && <p className="text-[#f87171] text-[13px]">{errors.confirmPassword.message}</p>}
                        </div>

                        {/* SUBMIT BUTTON */}
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-[#facc15] hover:bg-[#eab308] text-black px-[16px] py-[14px] rounded-[12px] font-[700] text-[16px] shadow-md hover:shadow-lg transition duration-200"
                            >
                                {t("Save")}
                            </button>
                        </div>
                    </form>
                </div>
            </Drawer>



            {/* Add icons at top level */}

            <Drawer
                title={
                    <div className="text-center text-[16px] text-[#FFD700] font-bold">
                        {t("Security Center")}
                    </div>
                }
                placement="right"
                style={{ background: "#1A1A1A" }} // Header nền tối
                closable={true}
                closeIcon={
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="#FFD700"
                            className="w-[20px] h-[20px] hover:stroke-[#FFF5C0]"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </div>
                }
                bodyStyle={{
                    background: "#1A1A1A"
                }}
                onClose={() => setOpen(false)}
                width="100rem"
                open={open}
            >
                <div className="p-[16px]">
                    <div className="space-y-[12px]">

                        {/* Login Password */}
                        <div
                            onClick={() => setOpenChange("pass_login")}
                            className="flex justify-between items-center bg-[#2B2B2B] hover:brightness-110 transition-all px-[16px] py-[12px] rounded-[12px] shadow-sm border border-[#FFD700] cursor-pointer"
                        >
                            <div className="flex items-center gap-[12px]">
                                <img
                                    src="https://img.icons8.com/?size=100&id=63686&format=png&color=000000"
                                    width={40}
                                    className="rounded-[8px] bg-[#FFF9E3] p-[4px]"
                                />
                                <div>
                                    <span className="block text-[15px] font-medium text-[#FFD700]">
                                        {t("login password")}
                                    </span>
                                    <span className="block text-[13px] text-[#C4A94D]">
                                        {t("for account login")}
                                    </span>
                                </div>
                            </div>
                            <svg className="w-[20px] h-[20px] text-[#FFD700]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>

                        {/* Payment Password */}
                        <div
                            onClick={() => setOpenChange("pass_payment")}
                            className="flex justify-between items-center bg-[#2B2B2B] hover:brightness-110 transition-all px-[16px] py-[12px] rounded-[12px] shadow-sm border border-[#FFD700] cursor-pointer"
                        >
                            <div className="flex items-center gap-[12px]">
                                <img
                                    src="https://img.icons8.com/?size=100&id=12324&format=png&color=000000"
                                    width={40}
                                    className="rounded-[8px] bg-[#FFF9E3] p-[4px]"
                                />
                                <div>
                                    <span className="block text-[15px] font-medium text-[#FFD700]">
                                        {t("Payment password")}
                                    </span>
                                    <span className="block text-[13px] text-[#C4A94D]">
                                        {t("Used for fund-related operations")}
                                    </span>
                                </div>
                            </div>
                            <svg className="w-[20px] h-[20px] text-[#FFD700]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>

                    </div>
                </div>
            </Drawer>



        </>

    )
}

export default SecurityCenter