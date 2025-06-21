import clsx from 'clsx'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import { useTranslation } from 'react-i18next'
import { DrawerLang } from 'components/ui/DrawerLang'
import bg from 'assets/new_img/bg-5.jpg'
const Auth = () => {
  const { pathname, } = useLocation()
  const { t, i18n } = useTranslation()
  const [openLang, setOpenLang] = useState(false)
  return (
    <>

      <div data-v-daf86cc3="" className="auth-page relative flex !items-center "
        style={{
          backgroundImage: `url(${bg})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: "cover"
        }}
      >
        <div
          className="absolute top-[10px] right-[10px] w-[40px] h-[40px] flex justify-center items-center rounded-full z-[10] cursor-pointer bg-[#1A1A28] hover:ring-2 hover:ring-[#facc15] transition-all duration-200"
          onClick={() => setOpenLang(true)}
        >
          {
            i18n.language === 'en' &&
            <svg
              data-v-caee1139=""
              className="inline-block flag-icon"
              viewBox="0 0 64 64"
              width="20px"
              height="20px"
            >
              <path
                fill="#2e3192"
                d="M38 54h16c1.977 0 3.657-.446 5.052-1.223L38 40.219zm25.66-7.79c.228-1.017.344-2.094.344-3.211v-5h-14.11l13.762 8.211M.35 17.759A14.6 14.6 0 0 0 0 21v5h14.164zM26 10H10c-1.963 0-3.632.44-5.021 1.206L26 23.746zM5.043 52.826C6.419 53.57 8.066 54 10 54h16V40.324zM0 38v5c0 1.151.122 2.26.363 3.303L14.282 38zm59.115-26.745C57.709 10.457 56.006 10 54 10H38v13.851zM64 26v-5c0-1.094-.113-2.149-.332-3.147L50.012 26z"
              />
              <path
                fill="#e6e7e8"
                d="m50.012 26l13.656-8.147c-.626-2.864-2.15-5.235-4.553-6.598L38 23.851V10h-2v18h28v-2zM0 36v2h14.282L.363 46.303c.661 2.855 2.231 5.199 4.68 6.523L26 40.324V54h2V36zm64 0H36v18h2V40.219l21.052 12.559c2.421-1.348 3.964-3.706 4.604-6.566L49.894 38H64zM26 10v13.746L4.979 11.206C2.549 12.546.996 14.9.349 17.759L14.164 26H0v2h28V10z"
              />
              <path fill="#be1e2d" d="M36 28V10h-8v18H0v8h28v18h8V36h28v-8z" />
              <path
                fill="#be1e2d"
                d="M21.938 26L1.888 14.031c-.431.64-.777 1.344-1.063 2.094L17.372 26h4.563M63.09 48.09L46.277 38h-4.656l20.313 12.219a10 10 0 0 0 1.156-2.125m-2.371-35.703L37.969 26l4.619.003L62.219 14.25c-.438-.797-.9-1.311-1.5-1.859M1.813 49.875a9 9 0 0 0 1.609 1.844L26.063 38H21.5z"
              />
            </svg>
          }
          {
            i18n.language === 'vi' &&
            <svg
              data-v-caee1139=""
              className="inline-block flag-icon"
              viewBox="0 0 64 64"
              width="20px"
              height="20px"
            >
              <path
                fill="#ec1c24"
                d="M64 44c0 6.075-3.373 11-10 11H10C3.373 55 0 50.075 0 44V22c0-6.075 3.373-11 10-11h44c6.627 0 10 4.925 10 11z"
              />
              <path
                fill="#f9cb38"
                d="m45.43 28.963l-9.997.015l-3.103-10.114l-3.08 10.114l-10.01-.015l8.106 6.157l-3.14 10.05l8.13-6.241l8.147 6.241l-3.147-10.05z"
              />
            </svg>
          }
          {
            i18n.language === 'zh' &&
            <svg
              data-v-caee1139=""
              className="inline-block flag-icon"
              viewBox="0 0 64 64"
              width="20px"
              height="20px"
            >
              <path
                fill="#ec1c24"
                d="M64 43c0 6.075-3.373 11-10 11H10C3.373 54 0 49.075 0 43V21c0-6.075 3.373-11 10-11h44c6.627 0 10 4.925 10 11z"
              />
              <path
                fill="#f9cb38"
                d="M12.971 16.656L15.11 21l4.795.695l-3.467 3.375l.817 4.78l-4.284-2.255l-4.285 2.255l.818-4.78l-3.464-3.375L10.827 21zm7.536-3.662l.593 1.205l1.334.193l-.963.939l.225 1.325l-1.189-.626l-1.188.626l.225-1.325l-.962-.939l1.331-.193zm3.851 4.334l.594 1.204l1.328.194l-.959.941l.226 1.323l-1.189-.625l-1.188.625l.225-1.323l-.961-.941l1.329-.194zm0 6.956l.594 1.207l1.328.193l-.959.939l.226 1.325l-1.189-.624l-1.188.624l.225-1.325l-.961-.939l1.329-.193zm-3.851 4.886l.593 1.205l1.334.192l-.963.938l.225 1.327l-1.189-.622l-1.188.622l.225-1.327l-.962-.938l1.331-.192z"
              />
            </svg>
          }


        </div>
        <DrawerLang
          openLang={openLang}
          setOpenLang={setOpenLang}
        />
        <div data-v-daf86cc3="" className="auth-container z-[999]">
          {/* <div data-v-daf86cc3="" className="auth-tabs ">
            <div data-v-daf86cc3="" className={clsx("tab", {
              "active": pathname === '/login'
            })}>
              <Link to='/login' >
                {t("auth.login")}
              </Link>
            </div>
            <div data-v-daf86cc3="" className={clsx("tab", {
              "active": pathname === '/register'
            })}>
              <Link to='/register'>
                {t("auth.regis")}
              </Link>
            </div>
          </div> */}
          {
            pathname === '/register' &&
            <Register />
          }
          {
            pathname === '/login' &&
            <Login />

          }

        </div>
        <div className="bg-animation">
          <div id="stars" />
          <div id="stars2" />
          <div id="stars3" />
          <div id="stars4" />
        </div>
      </div>
    </>


  )
}

export default Auth