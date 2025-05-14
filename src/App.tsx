import RenderRouter from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider, Spin, theme as a } from "antd";
import Loading from "components/elements/Loading";
import { useGlobalAppStore } from "store/useGlobalApp";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import requestService from "api/request";

function App() {
  const { loading, handleSetConfig } = useGlobalAppStore()
  const [scale, setScale] = useState(1);
  const { t, i18n } = useTranslation();
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

  useEffect(() => {
    getConfigApp()

  }, [])

  useEffect(() => {
    if (localStorage.getItem('lang')) {
      i18n.changeLanguage(localStorage.getItem('lang') || "vi");
    }
    else {
      i18n.changeLanguage('en')
    }
  }, [])


  useEffect(() => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "006820a2-81db-4d6a-9047-d01c88665919";

    (function () {
      const d = document;
      const s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = true;
      d.getElementsByTagName("head")[0].appendChild(s);
    })();
  }, []);


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
