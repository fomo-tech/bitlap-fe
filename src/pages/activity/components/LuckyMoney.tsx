import { message, Modal, notification } from 'antd'
import choujiang from 'assets/images/lixi.png'
import iconClose from 'assets/images/home_dialog_close.png'
import home_red from 'assets/images/red-coin.png'
import home_txt from 'assets/images/home_tx_bg.png'
import { useState } from 'react'
import requestService from 'api/request'
import { useAuthApp } from 'store/useAuthApp'
import { useGlobalAppStore } from 'store/useGlobalApp'
import reward_bg from 'assets/images/reward_case_bg.png'
import dolar from 'assets/images/dollar.png'
import home_h_an1 from 'assets/images/home_h_an1.png'
import { TRANSACTION_TYPE_LIXI_REWARD } from 'constants/define'
import Countdown from 'react-countdown'
import { useTranslation } from 'react-i18next'
const LuckyMoney = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resultReward, setResultReward] = useState<any>(null)
  const { t } = useTranslation()
  const { handleCallbackUser, events, handleLoading } = useGlobalAppStore()

  const handleOpenLuckyMoney = async () => {
 
    if (loading) return
    try {
      setLoading(true)
      handleLoading(true)
      const res = await requestService.post('/checkin/lucky-money')
      if (res && res?.data) {
        setTimeout(() => {
          setResultReward(res?.data?.data?.value || 0);
        }, 200);
      }
      handleCallbackUser()
    } catch (error: any) {
      console.log(error);
      setOpen(false)
      notification.error({
        message: error?.response?.data?.message,
        duration: 3
      })
      setLoading(false)
    }
    setLoading(false)
    handleLoading(false)
  }
  const event = events && events?.find((i: any) => i?.event_type === TRANSACTION_TYPE_LIXI_REWARD)

  return (
    <>
      <div className="relative">
        <div className="absolute w-full h-full flex justify-center items-center"
          onClick={() => {
            setOpen(true)
            setResultReward(null)
          }}
        >
          <div>
            <img src={home_red} width={50} />
          </div>
        </div>
        <img src={home_txt} width={60} />
      </div>
      <Modal open={open}
        onCancel={() => {
          setOpen(false)
          setResultReward(null)
        }}
        footer={null}
        maskClosable={!resultReward}
        closeIcon={
          !resultReward && <img src={iconClose} className='max-w-[7rem] ' />
        }
        centered width={400} style={{
          background: "none"
        }} className='lixi-event' >
        {
          resultReward ?
            <div className='relative'>
              <div className='absolute top-0 left-0 w-full h-full flex gap-2 flex-col justify-center items-center'>
                <div className='flex gap-2 items-center'>
                  <div className='text-[#fff] font-[900] text-[70px]'>+ {resultReward}</div>
                  <div>
                    <img src={dolar} />
                  </div>
                </div>
                <div className='relative'>
                  <img src={home_h_an1} className='max-w-[120px]' />
                  <div
                    onClick={() => {
                      setOpen(false)
                      setResultReward(null)
                    }}
                    className='cursor-pointer absolute top-0 text-[#fff] cusor-pointer font-[700] left-0 w-full h-full flex gap-2 flex-col justify-center items-center'>
                    {t("Đóng")}
                  </div>
                </div>
              </div>
              <img src={reward_bg} />
            </div>
            :
            <div className='relative lixi-event-animation cursor-pointer' onClick={() => handleOpenLuckyMoney()}>
              <img src={choujiang} className=' cursor-pointer' />
              <div className='absolute top-[25%] left-0 w-full h-full flex flex-col justify-center items-center '>
                <div className=' flex gap-[5rem] items-center text-[2rem] mb-[20px]'>
                  <div className='text-[#fff] font-[900]'>
                    {t("Thời gian kết thúc")} : <>
                      {
                        Date.now() > event?.timeEnd ? (
                          <span>-</span>
                        ) : (
                          Date.now() < event?.timeStart ?
                            "-"
                            :
                            <Countdown
                              date={event?.timeEnd}
                              renderer={({ days, hours, minutes, seconds, completed }) => {
                                if (completed) {
                                  return <span>{t("Đã kết thúc")}</span>;
                                }

                                const pad = (n: any) => String(n)?.padStart(2, '0');
                                const formatted = `${days > 0 ? `${days} ngày ` : ''}${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
                                return <span>{formatted}</span>;
                              }}
                            />
                        )
                      }

                    </>
                  </div>
                </div>
                <div className=' flex gap-[5rem] items-center text-[2rem]'>
                  <div className='text-[#fff] font-[900]'>
                    {t("Còn lại")} : {
                      Date.now() > event?.timeEnd ? (
                        <span>-</span>
                      ) :
                        event?.quantity}
                  </div>
                </div>
                {/* <div className=' flex gap-[5rem] items-center text-[2rem]'>
                  <div className='text-[#fff] font-[900]'>
                    Yêu cầu nông trại
                  </div>
                </div> */}
              </div>
            </div>

        }

      </Modal>
    </>

  )
}

export default LuckyMoney