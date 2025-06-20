import { message, notification } from 'antd';
import requestService from 'api/request';
import clsx from 'clsx'
import { getJSONFromUrl, getRecaptchaToken } from 'lib/helpers';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuthApp } from 'store/useAuthApp';
import { useGlobalAppStore } from 'store/useGlobalApp';
import logo from 'assets/new_img/logo.png'

interface IFormInput {
    phone: string;
    password: string;
    payment_password: string;
    inviteCode: string,
    isCheckPolicy: boolean
}


const Register = () => {
    const { r } = getJSONFromUrl()
    const { loading, handleLoading } = useGlobalAppStore()
    const [shopPasss, setShowPass] = useState(false)
    const { onSetUser } = useAuthApp()
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { register, handleSubmit, watch, control, setValue, formState: { errors } } = useForm<IFormInput>({
        defaultValues: {
            isCheckPolicy: false
        }
    });
    const isCheckPolicy = watch('isCheckPolicy')
    const payment_password = watch('payment_password')

    useEffect(() => {
        setValue('inviteCode', r)
    }, [r])



    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        if (!isCheckPolicy) return message.error(t("Bạn chưa đồng ý với điều khoản dịch vụ"))
        handleLoading(true)
        try {
            // const token = await getRecaptchaToken();
            const res = await requestService.post('/auth/register', {
                data: {
                    ...data,
                    recaptchaToken: "token"
                }
            })

            if (res && res.data) {

                localStorage.setItem(
                    "accessToken",
                    res?.data?.data?.tokens?.accessToken
                );
                localStorage.setItem(
                    "refreshToken",
                    res?.data?.data?.tokens?.refreshToken
                );
                onSetUser(res?.data?.data?.user)
                // message.success(res?.data?.message)
                setTimeout(() => {
                    handleLoading(false)
                    navigate('/')
                }, 500)

            }
        } catch (error: any) {
            console.log(error);

            notification.error({
                message: error?.response?.data?.message,
                duration: 3
            })

            handleLoading(false)
        }

    };


    return (
        <div data-v-fed939fe="" data-v-daf86cc3="" className="register-content">
            <img
                data-v-544b5ac9=""
                src={logo}
                alt="Login"
                className='w-[55rem] flex mx-auto mb-5'

            />

            <form data-v-fed939fe="" className={clsx("register-form")} onSubmit={handleSubmit(onSubmit)}>
                <div data-v-fed939fe="" className="form-item">
                    <div data-v-fed939fe="" className="van-cell van-field">
                        <div className="van-field__left-icon">
                            <div data-v-fed939fe="" className="country-code">
                                +84
                            </div>
                        </div>
                        {/**/}
                        <div className="van-cell__value van-field__value">
                            <div className="van-field__body">
                                <input
                                    type="tel"
                                    inputMode="numeric"
                                    id="van-field-52-input"
                                    className="van-field__control"
                                    placeholder={t("auth.phone")}
                                    autoComplete="tel"
                                    data-allow-mismatch="attribute"
                                    {...register("phone", {
                                        required: t("auth.phone_required"),
                                        pattern: {
                                            value: /^(?:\d{9})$|^(?:\d{3}[-\s]?\d{3}[-\s]?\d{3,4})$|^(?:\(\d{3}\)[-\s]?\d{3}[-\s]?\d{3,4})$/,
                                            message: t("auth.invalid_phone_number_format")
                                        }


                                    })}
                                />

                            </div>
                            {/**/}
                            {/**/}
                        </div>
                        {/**/}
                        {/**/}
                    </div>
                    {errors.phone && <p className='pl-2 text-red-600 text-[2.5rem]'>{errors.phone.message}</p>}
                </div>
                {/**/}
                <div data-v-fed939fe="" className="form-item">
                    <div data-v-fed939fe="" className="van-cell van-field">
                        <div className="van-field__left-icon">
                            <i className="van-badge__wrapper van-icon van-icon-shield-o">
                                {/**/}
                                {/**/}
                                {/**/}
                            </i>
                        </div>
                        {/**/}
                        <div className="van-cell__value van-field__value">
                            <div className="van-field__body">
                                <input
                                    type={shopPasss ? "text" : "password"}
                                    id="van-field-53-input"
                                    className="van-field__control"
                                    placeholder={t("auth.password")}
                                    autoComplete="new-password"
                                    data-allow-mismatch="attribute"
                                    {...register("password", {
                                        required: t("auth.password_required"),

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

                        </div>
                        {/**/}
                        {/**/}
                    </div>
                    {errors.password && <p className='pl-2 text-red-600 text-[2.5rem]'>{errors.password.message}</p>}
                </div>
                <div data-v-fed939fe="" className="form-item">
                    <div
                        data-v-fed939fe=""
                        className="van-cell van-field payment-password"
                    >
                        <div className="van-field__left-icon">
                            <i className="van-badge__wrapper van-icon van-icon-lock">

                            </i>
                        </div>
                        {/**/}
                        <div className="van-cell__value van-field__value">
                            <div className="van-field__body">
                                <input
                                    type={shopPasss ? "text" : "password"}
                                    inputMode="numeric"
                                    id="van-field-54-input"
                                    className="van-field__control"
                                    placeholder={t("auth.payment_password")}
                                    autoComplete="new-password"
                                    data-allow-mismatch="attribute"
                                    maxLength={6}
                                    {...register("payment_password", {
                                        required: t("auth.payment_password_required"),
                                        pattern: {
                                            value: /^[0-9]{6}$/,  // Chỉ chấp nhận 6 ký tự số
                                            message: t("payment_password_maximum_6_characters") // Lỗi thông báo nếu không khớp
                                        }
                                    })}
                                />

                            </div>
                            <div className="van-field__word-limit">
                                <span className="van-field__word-num">{payment_password?.length || 0}</span>/6
                            </div>
                            {/**/}
                        </div>
                        {/**/}
                        {/**/}
                    </div>
                    {errors.payment_password && <p className='pl-2 text-red-600 text-[2.5rem]'>{errors.payment_password.message}</p>}
                </div>
                <div data-v-fed939fe="" className="form-item">
                    <div data-v-fed939fe="" className="van-cell van-field">
                        <div className="van-field__left-icon">
                            <i className="van-badge__wrapper van-icon van-icon-friends-o">
                                {/**/}
                                {/**/}
                                {/**/}
                            </i>
                        </div>
                        {/**/}
                        <div className="van-cell__value van-field__value">
                            <div className="van-field__body">
                                <input
                                    type="text"
                                    id="van-field-55-input"
                                    className="van-field__control"
                                    placeholder={t("auth.inviteCode")}
                                    data-allow-mismatch="attribute"
                                    {...register("inviteCode")}
                                    disabled={r}
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
                </div>
                <div data-v-544b5ac9="" className="form-item text-[#cdcdcd]">
                    {t("Bạn đã có tài khoản")} ? <span className='font-[700] cursor-pointer text-[#a97f30]' onClick={() => navigate(r ? `/login?r=${r}` : '/login')}>{t("Đăng nhập ngay")}</span>
                </div>
                <div data-v-fed939fe="" className="terms">
                    <div
                        data-v-fed939fe=""
                        role="checkbox"
                        className="van-checkbox flex gap-4 items-start"
                        tabIndex={0}
                        aria-checked="false"
                    >
                        <div
                            className=" w-[4rem] h-[4rem] border cursor-pointer rounded-sm mt-4 flex justify-center items-center" style={{ fontSize: 16 }}
                            onClick={() => setValue('isCheckPolicy', !isCheckPolicy)}
                        >
                            {
                                isCheckPolicy &&

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-20 text-[#a97f30]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                            }


                        </div>
                        <span className="van-checkbox__label">
                            {t("auth.agree")}{" "}
                            <span data-v-fed939fe="" className="terms-link">
                                {t("auth.policy")}
                            </span>
                        </span>
                    </div>
                </div>

                <div data-v-fed939fe="" className="submit-btn">
                    <button
                        data-v-fed939fe=""
                        type="submit"
                        className="w-full rounded-[20px] text-[#fff] van-button van-button--primary van-button--normal van-button--block van-button--round van-button--disabled"

                    >
                        <div className="van-button__content">
                            {/**/}
                            <span className="van-button__text">
                                {t("auth.regis")}
                            </span>
                            {/**/}
                        </div>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Register