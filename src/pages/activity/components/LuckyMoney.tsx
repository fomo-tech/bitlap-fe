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
const LuckyMoney = () => {
  const [open, setOpen] = useState(false)
  const [resultReward, setResultReward] = useState<any>(null)
  const { handleCallbackUser } = useGlobalAppStore()

  // const handleOpenLuckyMoney = async () => {
  //   try {
  //     const res = await requestService.post('/checkin/lucky-money')
  //     if (res && res?.data) {
  //       setResultReward(res?.data?.data?.value || 0);
  //     }
  //     handleCallbackUser()
  //   } catch (error: any) {
  //     console.log(error);
  //     notification.error({
  //       message: error?.response?.data?.message,
  //       duration: 3
  //     })
  //   }
  // }
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
        onCancel={() => setOpen(false)}
        footer={null}
        maskClosable={false}
        closeIcon={
          false
          //  <img src={iconClose} className='max-w-[7rem] ' />
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
                  className='absolute top-0 text-[#fff] cusor-pointer font-[700] left-0 w-full h-full flex gap-2 flex-col justify-center items-center'>
                    Đóng
                  </div>
                </div>
              </div>
              <img src={reward_bg} />
            </div>
            :

            <img src={choujiang} className='lixi-event-animation cursor-pointer'  />

        }

      </Modal>
    </>

  )
}

export default LuckyMoney