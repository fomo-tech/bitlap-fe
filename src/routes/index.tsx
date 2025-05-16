
import type { RouteObject } from "react-router";
import { useLocation, useMatch, useNavigate, useRoutes } from "react-router-dom";
import WrapperRouteComponent from "./WrapperRouteComponent";
import MainHeader from "layouts/MainHeader";
import HomePage from "pages/home";
import MainTabbar from "layouts/MainTabbar";
import Activity from "pages/activity";
import Profile from "pages/profile";
import Auth from "pages/auth";
import { ROUTES_HEADER_HIDDEN, ROUTES_TABBAR_HIDDEN } from "configs";
import clsx from "clsx";
import requestService from "api/request";
import { useAuthApp } from "store/useAuthApp";
import { useCallback, useEffect, useRef } from "react";
import { useGlobalAppStore } from "store/useGlobalApp";
import Order from "pages/order";
import DailyCheckin from "pages/activity/DailyCheckin";
import { getJSONFromUrl, removeLocalStoreageUser } from "lib/helpers";
import Agency from "pages/vip/Agency";
import LuckyWeel from "pages/activity/LuckyWeel";
import Treasure from "pages/activity/Mines";
import bg from 'assets/images/checkin-1.jpeg'
import Farm from "pages/farm";
import farm_icon from "assets/images/farm.png"
import home_txt from 'assets/images/home_tx_bg.png'
import task from 'assets/images/task_download_money.png'
import { message } from "antd";
const routeList: RouteObject[] = [
  {
    path: "/login",
    element: (
      <WrapperRouteComponent
        element={<Auth />}
        title="login"
      />
    ),

  },
  {
    path: "/register",
    element: (
      <WrapperRouteComponent
        element={<Auth />}
        title="register"
      />
    ),
  },
  {
    path: "/",
    element: (
      <WrapperRouteComponent
        auth
        element={<HomePage />}
        title="Home"
      />
    ),
  },
  {
    path: "/activity",
    element: (
      <WrapperRouteComponent
        auth
        element={<Activity />}
        title="Activity"
      />
    ),
  },
  {
    path: "/agency",
    element: (
      <WrapperRouteComponent
        auth
        element={<Agency />}
        title="VIP"
      />
    ),
  },
  {
    path: "/lucky-draw",
    element: (
      <WrapperRouteComponent
        auth
        element={<LuckyWeel />}
        title="VIP"
      />
    ),
  },
  {
    path: "/treasure",
    element: (
      <WrapperRouteComponent
        auth
        element={<Treasure />}
        title="VIP"
      />
    ),
  },
  {
    path: "/daily-checkin",
    element: (
      <WrapperRouteComponent
        auth
        element={<DailyCheckin />}
        title="Daily Checkin"
      />
    ),
  },
  {
    path: "/profile",
    element: (
      <WrapperRouteComponent
        auth
        element={<Profile />}
        title="Profile"
      />
    ),
  },
  {
    path: "/order",
    element: (
      <WrapperRouteComponent
        auth
        element={<Order />}
        title="Order"
      />
    ),

  },
  {
    path: "/farm/:id",
    element: (
      <WrapperRouteComponent
        auth
        element={<Farm />}
        title="My Farm"
      />
    ),
  }

];
const RenderRouter = () => {
  const { r } = getJSONFromUrl()
  const element = useRoutes(routeList);
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { onSetUser, logged, user } = useAuthApp()
  const { isCallBackUser, handleSetConfig } = useGlobalAppStore()
  const checkHiddenHeader = ROUTES_HEADER_HIDDEN.includes(pathname) || pathname.startsWith('/farm/')
  const isFarmDetail = useMatch(pathname)

  const getUser = useCallback(async () => {
    try {
      const res = await requestService.get('/profile')
      if (res && res.data) {
        onSetUser(res.data?.data)
      }
    } catch (error: any) {
      if (error?.response?.status === 401 || error?.response?.status === 403 ||  error?.response?.status === 500)  {
        removeLocalStoreageUser();
        navigate({ pathname: '/login' }, { replace: true });
      } else {
        // Có thể log hoặc handle lỗi khác (network...)
        console.error('Get profile failed: ', error);
      }
    }
  }, [onSetUser, navigate])

  useEffect(() => {
    if (!logged) {
      const targetPath = pathname === '/register' && r ? `/register?r=${r}` : pathname === '/register' ? '/register' : '/login';
      return navigate(targetPath);
    }

    if ((pathname === '/login' || pathname === '/register') && logged) {
      return navigate('/');
    }

    getUser();
  }, [logged, isCallBackUser]);


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return (
    <div className="max-w-[100rem] m-auto w-full min-h-screen flex flex-col viewport-fake ">
      <div className="min-h-screen bg-[#fff]">
        <div className="min-h-screen" style={{
          backgroundImage: `url(${bg})`,
          backgroundPosition: '0',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}>
          {
            !checkHiddenHeader && <MainHeader />
          }

          <div className={clsx("relative", {
            "pt-[13rem] min-h-screen": !checkHiddenHeader && !pathname.startsWith('/farm/')
          })}>
            {element}
          </div>
        </div>
      </div>
      {
        !ROUTES_TABBAR_HIDDEN.includes(pathname) && !pathname.startsWith('/farm/') && <MainTabbar />
      }
      {
        !(pathname === '/order' || pathname.startsWith('/farm/')) && user && <div className="fixed z-[999] bottom-[9%]  sm:bottom-[12%] right-[5px] sm:right-[10%] md:right-[20%] lg:right-[30%] cursor-pointer"

        >
          <div className="relative">
            <div className="absolute w-full h-full flex justify-center items-center"
              onClick={() => message.success("Coming soon")}
            >
              <div>
                <img src={task} width={50} />
              </div>
            </div>
            <img src={home_txt} width={60} />
          </div>

          <div className="relative mb-2" onClick={() => navigate('/order')}>
            <div className="absolute w-full h-full flex justify-center items-center" >
              <img src={farm_icon} width={37} />
            </div>
            <img src={home_txt} width={60} />
          </div>
          <div className="relative">
            <div className="absolute w-full h-full flex justify-center items-center">
              <a href='https://t.me/richfarmer_offical' target='_blank'>
                <img src={"https://img.icons8.com/?size=100&id=k4jADXhS5U1t&format=png&color=000000"} width={45} />
              </a>
            </div>
            <img src={home_txt} width={60} />
          </div>
        </div>
      }

    </div>
  )
};

export default RenderRouter