import React from 'react'
import rw3 from 'assets/icons/duck.png'
import rw2 from 'assets/images/mines.png'

const RandomReward = () => {

    const rewardItems = [
        { id: 1, img: "https://demo5.speedcode.online/public/coin (2).png", label: "$0.1", reward: "0.1" },
        { id: 2, img: "https://demo5.speedcode.online/public/coin (2).png", label: "$0.15", reward: "0.15" },
        { id: 3, img: "https://demo5.speedcode.online/public/coin (2).png", label: "$0.2", reward: "0.2" },
        { id: 4, img: "https://demo5.speedcode.online/public/coin (2).png", label: "$0.5", reward: "0.5" },
        { id: 5, img: rw3, reward: "x1_duck", label: "+1" },
        { id: 6, img: rw3, reward: "x2_duck", label: "+2" },
        { id: 7, img: rw3, reward: "x5_duck", label: "+5" },
        { id: 8, img: rw2, reward: "Lucky_Clover" },
        { id: 9, img: rw2, reward: "Lucky_Clover" },

    ];

    const randomRewardBox = () => {
        // Chọn một ID ngẫu nhiên trong phạm vi từ 0 đến 9
        let randomIndex = Math.floor(Math.random() * 9); // ID từ 0 đến 9
        return randomIndex;
    };

    const index = randomRewardBox()
    return (
        <div className="mine-box-wrapper">
            <div className="mine-box-front">
                <img
                    src={rewardItems[index]?.img}
                    alt="image"
                    className='animation-bounceCard !w-[40px] !h-[40px]'

                />
                {
                    rewardItems[index]?.label &&
                    <div className='text-[15px] text-[#fff]'>
                        {rewardItems[index]?.label}
                    </div>
                }
            </div>


            <div className="mine-box-hidden" />
        </div>
    )
}

export default RandomReward