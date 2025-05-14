import { Drawer, message } from 'antd'
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
            message.warning(error?.response?.data?.message)
        }

    }
    return (
        <>
            <Drawer
                open={!!openChange}
                onClose={() => setOpenChange(false)}
                placement='bottom'
                height={"auto"}
                width={"100rem"}
                zIndex={9999}
                className='security'
                closeIcon={false}
                title={
                    <div className='flex justify-between'>
                        <div className='cursor-pointer ' onClick={() => {
                            setOpenChange(false)
                        }}>
                            {
                                openChange === 'pass_login' && t("modify login password")
                            }
                            {
                                openChange === 'pass_payment' && t("modify payment password")
                            }
                        </div>
                        <div className='cursor-pointer' onClick={() => {
                            setOpenChange(false)
                            reset()

                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>

                        </div>
                    </div>
                }
            >

                <div data-v-631327fb="" className="password-popup">
                    <div data-v-631327fb="" className="popup-content">
                        <form data-v-631327fb="" className="van-form" onSubmit={handleSubmit(onChangePassWord)}>
                            <div data-v-631327fb="" className="van-cell-group van-cell-group--inset">
                                <div data-v-631327fb="" className="van-cell van-field">
                                    {/**/}
                                    <div className="van-cell__title van-field__label">
                                        <label
                                            id="van-field-1-label"
                                            htmlFor="van-field-1-input"
                                            data-allow-mismatch="attribute"
                                        >
                                            {t("Old password")}
                                        </label>
                                        {/**/}
                                    </div>
                                    <div className="van-cell__value van-field__value">
                                        <div className="van-field__body">
                                            <input
                                                type={shopPasss ? "text" : "password"}
                                                id="van-field-1-input"
                                                className="van-field__control"
                                                placeholder={t("please enter the original password")}
                                                aria-labelledby="van-field-1-label"
                                                data-allow-mismatch="attribute"
                                                {...register("oldPassword", {
                                                    required: t("Please enter the old password"),
                                                })}
                                            />
                                            {/**/}
                                            <div className="van-field__right-icon" onClick={() => setShowPass(!shopPasss)}>
                                                {
                                                    shopPasss ?
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                        </svg>
                                                        :

                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                        </svg>
                                                }


                                            </div>
                                            {/**/}
                                        </div>
                                        {/**/}
                                        {/**/}
                                    </div>
                                    {/**/}
                                    {/**/}
                                </div>
                                {errors.oldPassword && <p className='pl-2 text-red-600 text-[3rem]'>{errors.oldPassword.message}</p>}
                                <div data-v-631327fb="" className="van-cell van-field">
                                    {/**/}
                                    <div className="van-cell__title van-field__label">
                                        <label
                                            id="van-field-2-label"
                                            htmlFor="van-field-2-input"
                                            data-allow-mismatch="attribute"
                                        >
                                            {t("New Password")}
                                        </label>
                                        {/**/}
                                    </div>
                                    <div className="van-cell__value van-field__value">
                                        <div className="van-field__body">
                                            <input
                                                type={shopPasss ? "text" : "password"}
                                                id="van-field-2-input"
                                                className="van-field__control"
                                                placeholder={t("please enter the new password")}
                                                aria-labelledby="van-field-2-label"
                                                data-allow-mismatch="attribute"
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
                                                    }
                                                })}

                                            />
                                            {/**/}
                                            {/**/}
                                            {/**/}
                                        </div>
                                        {/**/}
                                        {/**/}
                                    </div>
                                    {/**/}
                                    {/**/}
                                </div>
                                {errors.newPassword && <p className='pl-2 text-red-600 text-[3rem]'>{errors.newPassword.message}</p>}

                                <div data-v-631327fb="" className="van-cell van-field">
                                    {/**/}
                                    <div className="van-cell__title van-field__label">
                                        <label
                                            id="van-field-3-label"
                                            htmlFor="van-field-3-input"
                                            data-allow-mismatch="attribute"
                                        >
                                            {t("confirm password")}
                                        </label>
                                        {/**/}
                                    </div>
                                    <div className="van-cell__value van-field__value">
                                        <div className="van-field__body">
                                            <input
                                                type={shopPasss ? "text" : "password"}
                                                id="van-field-3-input"
                                                className="van-field__control"
                                                placeholder={t("please enter the new password again")}
                                                aria-labelledby="van-field-3-label"
                                                data-allow-mismatch="attribute"
                                                {...register("confirmPassword", {
                                                    required: t("Please enter the confirmPassword"),
                                                    validate: value =>
                                                        value === newPassword || t("Passwords do not match"),
                                                })}
                                            />
                                            {/**/}
                                            {/**/}
                                            {/**/}
                                        </div>
                                        {/**/}
                                        {/**/}
                                    </div>
                                    {/**/}
                                    {/**/}
                                </div>
                                {errors.confirmPassword && <p className='pl-2 text-red-600 text-[3rem]'>{errors.confirmPassword.message}</p>}

                            </div>
                            <div data-v-631327fb="" className="submit-section">
                                <button
                                    data-v-631327fb=""
                                    type="submit"
                                    className="w-full text-[#fff] van-button van-button--primary van-button--normal van-button--block"
                                >
                                    <div className="van-button__content">
                                        {/**/}
                                        <span className="van-button__text">Save</span>
                                        {/**/}
                                    </div>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>



            </Drawer >
            <Drawer
                title={
                    <div className='text-center'>
                        {t("Security Center")}
                    </div>
                }
                placement={'right'}
                style={{
                    background: "#fff"
                }}
                closable={true}
                closeIcon={
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 hover:text-[#000]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>


                    </div>
                }
                onClose={() => setOpen(false)}
                width="100rem"
                open={open}

            >

                <div data-v-631327fb="" className="page-content">
                    <div data-v-631327fb="" className="security-list">
                        <div data-v-631327fb="" className="security-item" onClick={() => setOpenChange("pass_login")}>
                            <div data-v-631327fb="" className="item-left">
                                <svg
                                    data-v-631327fb=""
                                    className="inline-block security-icon"
                                    viewBox="0 0 24 24"
                                    width="1.2em"
                                    height="1.2em"
                                    style={{ color: "rgb(25, 137, 250)" }}
                                >
                                    <path
                                        fill="currentColor"
                                        d="M12 17a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3"
                                    />
                                </svg>
                                <div data-v-631327fb="" className="item-info">
                                    <span data-v-631327fb="" className="title">
                                        {t("login password")}
                                    </span>
                                    <span data-v-631327fb="" className="desc">
                                        {t("for account login")}
                                    </span>
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>

                        </div>
                        <div data-v-631327fb="" className="security-item" onClick={() => setOpenChange("pass_payment")}>
                            <div data-v-631327fb="" className="item-left">
                                <svg
                                    data-v-631327fb=""
                                    className="inline-block security-icon"
                                    viewBox="0 0 24 24"
                                    width="1.2em"
                                    height="1.2em"
                                    style={{ color: "rgb(7, 193, 96)" }}
                                >
                                    <path
                                        fill="currentColor"
                                        d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5zm0 6c1.4 0 2.8 1.1 2.8 2.5V11c.6 0 1.2.6 1.2 1.3v3.5c0 .6-.6 1.2-1.3 1.2H9.2c-.6 0-1.2-.6-1.2-1.3v-3.5c0-.6.6-1.2 1.2-1.2V9.5C9.2 8.1 10.6 7 12 7m0 1.2c-.8 0-1.5.5-1.5 1.3V11h3V9.5c0-.8-.7-1.3-1.5-1.3"
                                    />
                                </svg>
                                <div data-v-631327fb="" className="item-info">
                                    <span data-v-631327fb="" className="title">
                                        {t("Payment password")}
                                    </span>
                                    <span data-v-631327fb="" className="desc">
                                        {t("Used for fund-related operations")}
                                    </span>
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
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