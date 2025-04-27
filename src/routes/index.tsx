
import type { RouteObject } from "react-router";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
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
import Vip from "pages/vip/Vip";
import LuckyWeel from "pages/activity/LuckyWeel";
import Treasure from "pages/activity/Treasure";
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
    path: "/vip",
    element: (
      <WrapperRouteComponent
        auth
        element={<Vip />}
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

];
const RenderRouter = () => {
  const { r } = getJSONFromUrl()
  const element = useRoutes(routeList);
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { onSetUser, logged, user } = useAuthApp()
  const { isCallBackUser } = useGlobalAppStore()
  const checkHiddenHeader = ROUTES_HEADER_HIDDEN.includes(pathname)

  const getUser = useCallback(async () => {
    try {
      const res = await requestService.get('/profile')
      if (res && res.data) {
        onSetUser(res.data?.data)
      }
    } catch (error) {
      removeLocalStoreageUser()
      navigate({ pathname: '/login' }, { replace: true });
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
    <div className="max-w-[350vw] w-full min-h-screen flex flex-col">
      <div className="min-h-screen bg-[#fff] pb-[15vw]">
        <div className="min-h-screen">
          {
            !checkHiddenHeader && <MainHeader />
          }

          <div className={clsx({
            "pt-[16vw]": !checkHiddenHeader
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