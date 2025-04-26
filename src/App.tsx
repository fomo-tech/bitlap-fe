import RenderRouter from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider, Spin, theme as a } from "antd";
import Loading from "components/elements/Loading";
import { useGlobalAppStore } from "store/useGlobalApp";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import requestService from "api/request";
import useBreakpoint from "hooks/useBreakpoint";
import SupportMobile from "components/ui/SupportMobile";
import useRealMobile from "hooks/useRealMobile";
function App() {
  const isRealMobile = useRealMobile();
  const { loading, handleSetConfig } = useGlobalAppStore()
  const { t, i18n } = useTranslation();
  const breakpoint = useBreakpoint()


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
    if (breakpoint === 'mobile' && isRealMobile)
      getConfigApp()
  }, [breakpoint])

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

  if (breakpoint !== 'mobile' || !isRealMobile)
    return (
      <>
        <SupportMobile />
      </>)

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
