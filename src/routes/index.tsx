
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
import Farm from "pages/farm";
import Trade from "pages/trade";
import Deposit from "components/ui/Deposit";
import Withdraw from "components/ui/Withdraw";
import SettingUser from "pages/profile/components/SettingUser";
import TransactionAnalysis from "pages/transaction-analysis";
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
    path: "/deposit",
    element: (
      <WrapperRouteComponent
        element={<Deposit />}
        title="Deposit"
      />
    ),

  },
  {
    path: "/withdraw",
    element: (
      <WrapperRouteComponent
        element={<Withdraw />}
        title="Deposit"
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
    path: "/setting-account",
    element: (
      <WrapperRouteComponent
        auth
        element={<SettingUser />}
        title="Account"
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
    path: "/trading",
    element: (
      <WrapperRouteComponent
        auth
        element={<Trade />}
        title="Trading"
      />
    ),
  },
  {
    path: "/affiliate",
    element: (
      <WrapperRouteComponent
        auth
        element={<Agency />}
        title="VIP"
      />
    ),
  },
  {
    path: "/transaction-analysis",
    element: (
      <WrapperRouteComponent
        auth
        element={<TransactionAnalysis />}
        title="Transaction Analysis"
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
      if (error?.response?.status === 401 || error?.response?.status === 403 || error?.response?.status === 500) {
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
    <div className="max-w-[100rem] m-auto w-full min-h-screen flex flex-col viewport-fake z-[9999] ">
      <div className="min-h-screen bg-[#101113]">
        <div className="min-h-screen" >
          {
            !checkHiddenHeader && <MainHeader />
          }

          <div className={clsx("relative", {
            "pt-[18rem] min-h-screen": !checkHiddenHeader && !pathname.startsWith('/farm/')
          })}>
            {element}
          </div>
        </div>
      </div>
      {
        !ROUTES_TABBAR_HIDDEN.includes(pathname) && <MainTabbar />
      }


    </div>
  )
};

export default RenderRouter