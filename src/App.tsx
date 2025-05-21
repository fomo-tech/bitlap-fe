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
import LuckyMoney from "pages/activity/components/LuckyMoney";


function App() {
  const { loading, handleSetConfig,handleSetEvents, configApp } = useGlobalAppStore()
  const { user } = useAuthApp()
  const [scale, setScale] = useState(1);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const joinApp = () => {
      if (user && socket.connected) {
        socket.emit("joinApp", user._id);
      }
    };

    // Nếu không có user thì disconnect socket
    if (!user) {
      if (socket.connected) {
        socket.disconnect();
      }
      return;
    }

    // Nếu socket đã kết nối, thực hiện join
    if (socket.connected) {
      joinApp();
    }

    // Nếu socket kết nối sau, đăng ký listener
    socket.on("connect", joinApp);

    // Cleanup
    return () => {
      socket.off("connect", joinApp);
    };
  }, [user]);
  




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
    if (user) {
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
  }, [user]);

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
