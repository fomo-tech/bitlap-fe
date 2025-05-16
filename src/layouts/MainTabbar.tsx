import React, { useRef, useEffect, useState } from "react";
import TabItem from "./TabItem";
import j120 from 'assets/images/game.png'
import farm from 'assets/images/home.png'
import farmer from 'assets/images/farmer1.png'


const icons = [
    {
        svg: <img src={j120} className="w-[10rem]"/>,
        route:'/activity'
    },
    {
        svg: <img src={farm} className="w-[10rem]" />,
        route: '/'
    },
    {
        svg: <img src={farmer} className="w-[10rem]" />,
        route: '/profile'
    },
]

const TabBar = () => {
    const [activeIndex, setActiveIndex] = useState(2);
    const indicatorRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);


    const handleClick = (index: number) => {
        setActiveIndex(index);
    };

    useEffect(() => {
        if (containerRef.current && indicatorRef.current) {
            const activeItem = containerRef.current.children[activeIndex] as HTMLElement;
            const left = activeItem.offsetLeft - 30;
            indicatorRef.current.style.transform = `translateX(${left}px)`;
        }
    }, [activeIndex]);



    return (
        <div className="tab-bar z-[999] opacity-[.9]" ref={containerRef}>
            {icons.map((icon, i) => (
                <TabItem
                    key={i}
                    icon={icon.svg}
                    active={i === activeIndex}
                    onClick={() => handleClick(i)}
                    route={icon.route}
                />
            ))}
        </div>
    );
};

export default TabBar;
