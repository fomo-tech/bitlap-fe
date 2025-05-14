import React, { useState } from 'react'
import from_wood from 'assets/images/farm_wooden.png'
import timeEndIcon from 'assets/images/task_item_icon5.png'
import dolar from 'assets/images/dollar.png'
import { useTranslation } from 'react-i18next'
import { Drawer, Modal, notification } from 'antd'
import { useGlobalAppStore } from 'store/useGlobalApp'
import requestService from 'api/request'
import useBreakpoint from 'hooks/useBreakpoint'
import guide_icon from 'assets/images/me_feedback_detailed_icon.png'
import info_icon from 'assets/images/home_tx_icon.png'
const InvestCard = ({ item }: { item: any }) => {
    const { t } = useTranslation()
    const breakpoint = useBreakpoint()
    const [openConfirm, setOpenConfirm] = useState<any>(false)
    const [showInfo, setShowInfo] = useState(false)
    const [openGuide, setOpenGuide] = useState(false)
    const { loading, handleLoading, handleCallbackUser } = useGlobalAppStore()

    const handleBuyTicket = async (ticketId: string) => {
        handleLoading(true)
        try {
            const res = await requestService.post('/tickets', {
                data: {
                    ticketId
                }
            })
            if (res && res.data) {
                notification.success({
                    message: res.data?.message,
                    duration: 3
                })
                handleCallbackUser()
                setOpenConfirm(false)
            }
        } catch (error: any) {
            notification.error({
                message: error?.response?.data?.message,
                duration: 3
            })

        }
        handleLoading(false)
    }

    return (
        <>
            <div data-v-caee1139="" className="nft-card relative">
                <div data-v-caee1139="" className="nft-image">
                    <div data-v-caee1139="" className="van-image ">
                        <img
                            src={`${process.env.REACT_APP_BASE_URL}` + item?.urlImage}
                            alt="Vé vàng NFT"
                            className="van-image__img !h-full !w-full"
                            style={{ objectFit: "cover" }}

                        />

                    </div>
                    <div data-v-caee1139="" className="nft-badges">
                        <div data-v-caee1139="" className="new" />
                    </div>
                    <div data-v-caee1139="" className="nft-tags flex flex-col gap-1 !left-[10px]">

                        <div data-v-caee1139="" className="text-[#fff] font-[900]  tag-item restrict-tag flex items-center gap-2 text-[17px] ">
                          
                            <img src={timeEndIcon} width={30} className='flip-hourglass' />
                            {item?.earningDay} {t("home.day")} {/**/}
                        </div>
                        <div data-v-caee1139="" className="text-[#fff] font-[900] tag-item restrict-tag flex items-center gap-2 text-[17px] ">
                           
                            <img src={dolar} width={30} className='flip-hourglass' />
                            {item?.price}
                        </div>

                    </div>
                    <div className='absolute bottom-[10px] left-[8px] cursor-pointer'>
                        <img src={from_wood} width={100} />
                    </div>
                    <div className='absolute bottom-[80px] text-[#fff] text-[12px] font-[900] left-[26px]'
                        onClick={() => setOpenConfirm(true)}
                    >
                        Thuê ngay
                    </div>
                    <div className='absolute top-[10px] text-[13px] z-[20] font-[900] right-[10px] flex gap-3 items-center cursor-pointer'

                    >
                        <img src={info_icon}
                            width={35}
                            onClick={() => setShowInfo(true)}
                        />
                        <img src={guide_icon}
                            width={30}
                            onClick={() => setOpenGuide(true)}
                        />
                    </div>
                </div>

            </div>
            <Modal title={"Hợp đồng thuê trang trại"} open={openGuide} centered footer={null} width={400} onCancel={() => setOpenGuide(false)}>
                <p>
                    🚜 Bạn đang chuẩn bị thuê trang trại <span className='font-[700] text-orange-700'>{item?.name}</span>!<br /><br />

                    💵 <b>Giá thuê:</b> {item?.price} USD trong vòng {item?.earningDay} ngày.<br />
                    📈 <b>Thu nhập:</b> Mỗi ngày bạn sẽ nhận được {item?.incomePerDay} USD từ trang trại này.<br /><br />

                    ⏰ <b>Lưu ý quan trọng:</b><br />
                    - Hãy vào đúng thời điểm mỗi ngày bắt đầu tư lúc thuê để <b>thu hoạch</b>.<br />
                    - Nếu bạn <b>bỏ lỡ</b> không thu hoạch trong ngày, <span className="text-red-500">bạn sẽ giảm đi thu nhập của bạn</span>.<br /><br />

                    🕐 Khi hết thời gian thuê (sau {item?.earningDay} ngày), bạn sẽ có <b>1 giờ</b> để <b>thu thập toàn bộ phần thưởng còn lại</b>.<br />
                    Nếu quá thời gian này, bạn <span className="text-red-500">sẽ không thể thu hoạch nữa</span>.<br /><br />

                    ❌ Nếu muốn dừng giữa chừng, bạn có thể <b>huỷ hợp đồng thuê bất cứ lúc nào</b>.<br />
                    Khi huỷ, hệ thống sẽ hoàn lại <b>10% số tiền thuê tương đương {item?.price * 0.1} USD </b> cho bạn.<br /><br />

                    🌱 Hãy chăm chỉ thu hoạch để không bỏ lỡ phần thưởng từ trang trại nhé!
                </p>
                <div className='my-3'
                    onClick={() => {
                        setOpenGuide(false)
                        setOpenConfirm(true)
                    }}
                >
                    <button className='btn-rent w-full'>Thuê ngay</button>
                </div>
            </Modal>
            <Drawer
                className='modal-confirm-buy'
                placement={breakpoint === 'mobile' ? 'bottom' : "left"}
                height={"auto"}
                closable={false}
                onClose={() => setShowInfo(false)}
                zIndex={99999}
                title={
                    <div className='flex justify-between'>
                        <div className='text-center font-[900] text-[3.5rem] flex items-center gap-2'>


                            {t("Thông tin trang trại")}
                        </div>
                        <button className='text-yellow-700 underline text-[3rem] font-[500]'
                            onClick={() => setShowInfo(false)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-[5rem]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>

                        </button>

                    </div>
                }
                open={showInfo}
            >
                <div className='flex items-center justify-between mb-[3rem] text-[16px]'>
                    <h3>Tên nông trại</h3>
                    <div className='font-[900]'>
                        {item?.name}
                    </div>

                </div>
                <div className='flex items-center justify-between mb-[3rem] text-[16px]'>
                    <h3>Thời gian thuê</h3>
                    <div className='font-[900]'>
                        {item?.earningDay} {t('home.day')}
                    </div>
                </div>
                <div className='flex items-center justify-between mb-[3rem] text-[16px] '>
                    <h3>Thu nhập mỗi ngày</h3>
                    <div className='font-[900] flex items-center gap-2'>
                        +{item?.incomePerDay}   <img src={dolar} width={20} />
                    </div>

                </div>
                <div className='flex items-center justify-between mb-[3rem] text-[16px] '>
                    <h3>Giá thuê</h3>
                    <div className='font-[900] flex items-center gap-2'>
                        {item?.price}   <img src={dolar} width={20} />
                    </div>

                </div>
                <div className='flex items-center justify-between mb-[3rem] text-[16px] '>
                    <h3>Tổng thu nhập</h3>
                    <div className='font-[900] flex items-center gap-2'>
                        {item?.incomePerDay * item?.earningDay}   <img src={dolar} width={20} />
                    </div>

                </div>

                <div className='mb-[3rem] text-[16px] '>
                    <h3 className='text-red-600 font-[900]'>
                        Lưu ý:
                        <span className='text-[#000]'>
                            {" "} Bạn có thể huỷ thuê trang trại bất kì lúc nào. Bạn sẽ nhận lại được 10% tiền thuê
                        </span>
                    </h3>
                </div>
                <div className='mb-[3rem] text-[16px] '>
                    <button className='btn-rent w-full' onClick={() => {
                        setShowInfo(false)
                        setOpenConfirm(true)
                    }}>
                        Thuê ngay
                    </button>
                </div>
            </Drawer>
            <Drawer
                className='modal-confirm-buy'
                placement={breakpoint === 'mobile' ? 'bottom' : "left"}
                height={"auto"}
                closable={false}
                onClose={() => setOpenConfirm(false)}
                zIndex={9999}
                title={
                    <div className='flex justify-between'>
                        <div className='text-center font-[900] text-[3.5rem]'>
                            {t("Xác nhận")}
                        </div>
                        <button className='text-yellow-700 underline text-[3rem] font-[500]'
                            onClick={() => {
                                setOpenConfirm(false)

                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-[5rem]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>

                        </button>

                    </div>
                }
                open={openConfirm}
            >
                <div className='flex flex-col gap-2 rem-3 my-[20px]'>
                    <h3 className='text-center text-[16px] font-[700]'>Bạn xác nhận thuê trang trại này với giá
                        <span className='text-red-600'> {item?.price}$</span> trong
                        <span className='text-orange-600'> {item?.earningDay} ngày</span>  ?</h3>
                </div>
                <div className='flex w-full items-center justify-between py-4'>

                    <button className='btn-rent w-full'
                        onClick={() => handleBuyTicket(item)}
                        disabled={loading}
                    >{t("Xác nhận")}</button>
                </div>
            </Drawer>
        </>

    )
}

export default InvestCard