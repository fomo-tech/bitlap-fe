import React, { useEffect, useState } from 'react'
import dolar from 'assets/images/dollar.png'
import home from 'assets/images/home_bottom_icon1.png'
import mission from 'assets/images/home_bottom_icon3.png'
import friend from 'assets/images/home_bottom_icon4.png'
import { useNavigate, useParams } from 'react-router-dom'
import RecordOrders from 'components/ui/RecordOrders'
import bg_num from 'assets/images/home_znzz_bg.png'
import havertIcon from 'assets/images/home_qipao_1.png'
import home_2 from 'assets/images/home_house2.png'
import home_3 from 'assets/images/home_box_image.png'
import requestService from 'api/request'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import { notification, Popover } from 'antd'
import { useGlobalAppStore } from 'store/useGlobalApp'
type FloatingItem = {
    id: number;
    amount: number;
};

const Farm = () => {
    const navigate = useNavigate()
    const { handleCallbackUser, handleLoading } = useGlobalAppStore()
    const [items, setItems] = useState<FloatingItem[]>([]);
    const [openRecord, setOpenRecord] = useState(false)
    const [data, setData] = useState<any>()
    const { id } = useParams()

    const renderer = ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
        if (completed) {
            return <span>Hết hợp đồng</span>;
        }

        const pad = (n: number) => String(n).padStart(2, '0');

        return (
            <span>
                {days > 0 ? `${days} ngày ` : ''}
                {pad(hours)}:{pad(minutes)}:{pad(seconds)}
            </span>
        );
    };

    const getOrderDetail = async (id: string) => {

        try {
            const res = await requestService.get('/tickets/order/' + id)
            if (res && res.data) {
                setData(res?.data?.data)
            }
        } catch (error) {
            navigate('/order')
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        }

    }

    const addMoney = (amount: number) => {
        const id = Date.now() + Math.random();
        setItems((prev) => [...prev, { id, amount }]);

        setTimeout(() => {
            setItems((prev) => prev.filter((item) => item.id !== id));
        }, 1000); // Match animation duration
    };

    useEffect(() => {
        if (!data) return;

        const interval = setInterval(() => {
            addMoney(data.currentIncome5s);
        }, 1000);

        return () => clearInterval(interval);
    }, [data?.currentIncome5s]); // chỉ tạo interval khi giá trị thật sự thay đổi

    useEffect(() => {
        if (!id) return;

        // Gọi lần đầu tiên
        getOrderDetail(id);

        const interval = setInterval(() => {
            getOrderDetail(id);
        }, 2000);

        return () => clearInterval(interval);
    }, [id]);

    const handleHarvest = async () => {
        handleLoading(true)
        try {
            const res = await requestService.post('/tickets/harvest', {
                data: {
                    orderId: id
                }
            })
            if (res && res.data) {
                notification.success({
                    message: "Claim success !",
                    duration: 5
                })
                handleCallbackUser()
            }

        } catch (error: any) {
            notification.error({
                message: error?.response?.data?.message,
                duration: 5
            })
        }
        handleLoading(false)
    }

    return (
        <div className="w-full h-screen flex items-center justify-center bg-[#fff]  relative">
            <div className="relative w-full h-full">
                <img src={process.env.REACT_APP_BASE_URL + data?.ticket?.desImage} className="w-full h-full m-auto object-cover" />
                {Date.now() < data?.endTime && Date.now() < data?.rewardTime && data?.status && items.map((item) => (
                    <div
                        key={item.id}
                        className="absolute z-[999] top-[45%] text-[20px] left-[45%] -translate-y-1/2 -translate-x-1/2 text-[#fff] font-bold  animate-floatUp select-none pointer-events-none flex gap-2 items-center"
                    >
                        + {item.amount?.toFixed(6)} <img src={dolar} width={20} />
                    </div>
                ))}

                {
                    Date.now() >= data?.rewardTime || Date.now() >= data?.endTime &&
                    <div
                        className="absolute z-[999] top-[48%] text-[20px] left-1/2 -translate-y-1/2 -translate-x-1/2 text-[#fff] font-bold cursor-pointer flex gap-2 items-center"
                        onClick={handleHarvest}
                    >
                        <img src={havertIcon} width={70} />
                    </div>
                }


            </div>
            <div className='absolute bottom-[5%] rounded-tl-[30px] rounded-tr-[30px]  left-0 w-full px-5 flex justify-between items-center'>
                <img src={home} className='size-[100px] cursor-pointer sm:size-[80px]' onClick={() => navigate('/order')} />
                <img src={mission} className='size-[100px] cursor-pointer sm:size-[80px]' onClick={() => setOpenRecord(true)} />
                <img src={friend} className='size-[100px] cursor-pointer sm:size-[80px]' onClick={() => navigate('/agency')} />
            </div>
            <div className='absolute bottom-[20%] right-[10%] cursor-pointer'>
                <Popover trigger={'click'} content="Hello...Ta sẽ đến đây sớm thui">
                    <img src={home_2} width={100} />
                </Popover>

            </div>
            <div className='absolute bottom-[40%] left-[10%] cursor-pointer'>
                <Popover trigger={'click'} content="Sự kiện sắp đến rồi">
                    <img src={home_3} width={60} />
                </Popover>
            </div>
            <div className='absolute top-[50px] sm:top-[5px] left-0 w-full px-5 flex justify-between items-center'>
                <div className='w-full h-full min-h-[130px] relative'>
                    <img src={bg_num} className='w-full min-h-[150px]' />
                    <div className='absolute w-full h-full left-0 top-0 p-[4rem] text-[15px]'>
                        <div className='flex justify-between items-center mb-3'>
                            <div>Thời gian thuê</div>
                            <div className='font-[900]'>
                                {
                                    data && <Countdown
                                        renderer={renderer}
                                        date={data?.endTime}
                                    />
                                }

                            </div>
                        </div>
                        <div className='flex justify-between items-center mb-3'>
                            <div>Thu nhập hiện tại</div>
                            <div className='font-[900] text-green-600 flex items-center gap-1'>+ {data?.currentIncome?.toFixed(6)} <img src={dolar} width={20} /></div>

                        </div>
                        <div className='flex justify-between items-center mb-3'>
                            <div>Thời gian thu hoạch</div>
                            <div className='font-[900]'>{new Date(data?.rewardTime)?.toLocaleString()}</div>
                        </div>
                        <div className='flex justify-between items-center mb-3'>
                            <div>Trạng thái thu hoạch</div>
                            {
                                Date.now() >= data?.rewardTime ?
                                    <div className='font-[900] text-orange-600'>Sẵn sàng thu hoạch</div>
                                    :
                                    <div className='font-[900]'>Chưa sẵn sàng</div>
                            }

                        </div>
                    </div>
                </div>

            </div>
            <RecordOrders
                open={openRecord}
                setOpen={setOpenRecord}
            />
        </div>
    );
};

export default Farm;
