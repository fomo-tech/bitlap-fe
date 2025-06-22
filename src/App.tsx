/* eslint-disable react-hooks/exhaustive-deps */
import RenderRouter from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider, Spin, theme as a } from "antd";
import Loading from "components/elements/Loading";
import { useGlobalAppStore } from "store/useGlobalApp";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import requestService from "api/request";
import { useAuthApp } from "store/useAuthApp";
import { socket } from "lib/socket";


function App() {
  const { loading, handleSetConfig, handleSetEvents, configApp } = useGlobalAppStore()
  const { user, logged } = useAuthApp()
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const joinApp = () => {
      if (user && user._id && socket.connected) {
        socket.emit("joinApp", user._id);
      }
    };

    socket.on("connect", joinApp);

    if (user && user._id && socket.connected) {
      joinApp();
    }

    return () => {
      socket.off("connect", joinApp);
    };
  }, [user?._id]);

  useEffect(() => {
    if (logged && !socket.connected) {
      socket.connect();
    }
  }, [logged]);





  const getConfigApp = async () => {
    try {
      const res = await requestService.get('/config')
      if (res && res.data) {
        handleSetConfig(res?.data?.data)
      }
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  }

  const getEvents = async () => {
    try {
      const res = await requestService.get('/checkin/get-events')
      if (res && res.data) {
        handleSetEvents(res?.data?.data)
      }
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  }

  useEffect(() => {
    // Initial fetch on mount



    // Listen to socket events only if user exists
    if (logged) {
      getEvents();
      getConfigApp();
      socket.on("getConfig", () => {
        getConfigApp();
        getEvents();
      });
    }

    // Cleanup socket listener
    return () => {
      socket.off("getConfig");
    };
  }, [logged]);

  useEffect(() => {
    if (localStorage.getItem('lang')) {
      i18n.changeLanguage(localStorage.getItem('lang') || "vi");
    }
    else {
      i18n.changeLanguage('vi')
    }
  }, [])


  useEffect(() => {
    if (configApp?.LIVECHAT_ID) {
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = configApp?.LIVECHAT_ID;


      (function () {
        const d = document;
        const s = d.createElement("script");
        s.src = "https://client.crisp.chat/l.js";
        s.async = true;
        d.getElementsByTagName("head")[0].appendChild(s);
      })();
    }

  }, [configApp?.LIVECHAT_ID]);


  const BASE_WIDTH = 430; // chiều rộng mobile mong muốn



  return (
    <ConfigProvider>
      {
        loading && <Loading />
      }

      <Router>
        <RenderRouter />
      </Router>

    </ConfigProvider>
  );
}

export default App;
