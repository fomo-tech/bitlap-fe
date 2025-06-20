/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import $ from "jquery";
import BuySellBox from './components/BuySellBox';
import TradeHeader from './components/TradeHeader';
import LastResults from './components/LastResults';
import { getTradeChartDefault } from 'lib/tradeDataChart';
import Highcharts from "highcharts/highstock";
import Indicators from "highcharts/indicators/indicators";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more.js";
import { socket } from 'lib/socket';
import { useAuthApp } from 'store/useAuthApp';
import { formatDecimalNotRound } from 'helper';
import requestService from 'api/request';
import { useNavigate } from 'react-router-dom';
import { useGlobalAppStore } from 'store/useGlobalApp';
import PopupCongralation from './components/PopupCongralation';
import BBIndicator from 'highcharts/indicators/bollinger-bands';
import IndicatorsAll from 'highcharts/indicators/indicators-all';

IndicatorsAll(Highcharts);
Indicators(Highcharts);
highchartsMore(Highcharts);
BBIndicator(Highcharts);

const columnLength = 24;
type Transaction = {
    user: string;
    value: number;
    bet_value: number;
    bet_condition: "up" | "down";
    open_price: number;
    close_price: number;
};

const Trade = () => {
    const chartRef = useRef<any>(null);
    const { handleCallbackUser, transaction_type_trading } = useGlobalAppStore()
    const [options, setOptions] = useState<any>(getTradeChartDefault());
    const [initChart, setInitChart] = useState(false);
    const [tradingData, setTradingData] = useState([])
    const [transactions, setTransactions] = useState<any>()
    const [openResult, setOpenResult] = useState<any>()
    const { user } = useAuthApp()
    const [showChunks, setShowChunks] = useState(false);

    const getTradingData = async () => {
        try {
            const res = await requestService.get('/trading/data')
            if (res && res.data) {
                setTradingData(res.data.data)
            }
        } catch (error) {
            console.log(error);

        }
    }

    const getTransactions = async () => {
        try {
            const res = await requestService.get('/trading/transactions', {
                params: {
                    transaction_status: transaction_type_trading
                }
            })
            if (res && res.data) {
                setTransactions(res.data.data)
            }
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getTradingData()
    }, [])
    useEffect(() => {
        getTransactions()
    }, [transaction_type_trading])

    useEffect(() => {
        if (!initChart && tradingData.length) {
            setInitChart(true);

            const btcDataList: {
                x: number,
                open: number,
                high: number,
                low: number,
                close: number,
                vol: number
            }[] = [];

            const volDataList: {
                x: number,
                y: number,
                color: string
            }[] = [];

            const dataForOption = tradingData.slice(-columnLength);

            dataForOption.forEach(({ createDateTime, openPrice, closePrice, baseVolume, highPrice, lowPrice }) => {
                const btcData = {
                    x: createDateTime,
                    open: openPrice,
                    high: highPrice,
                    low: lowPrice,
                    close: closePrice,
                    vol: baseVolume,
                };
                const volData = {
                    x: createDateTime,
                    y: baseVolume,
                    color: closePrice >= openPrice ? '#3ae64e' : '#e62a2a',
                };
                btcDataList.push(btcData);
                volDataList.push(volData);
            });

            const chartOptions = getTradeChartDefault({
                "series[0].data": btcDataList,
                "series[1].data": volDataList,
                "series[2].data": {
                    // Middle band có thể dùng hoặc ẩn
                    type: 'bb',
                    name: 'Bollinger Bands',
                    linkedTo: 'aapl',
                    color: '#fff',
                    lineWidth: 0.5,
                    params: {
                        period: 20,
                        standardDeviation: 2
                    },
                    tooltip: { valueDecimals: 2 },
                },

            });

            setOptions(chartOptions);

        }



    }, [user, tradingData]);

    function analyzeTransactions(transactions: Transaction[], currentUserId: string) {
        let totalValue = 0;
        let totalBets = 0;
        let winCount = 0;
        let loseCount = 0;

        const results = transactions
            .filter((tx) => tx.user === currentUserId) // chỉ lấy giao dịch của user hiện tại
            .map((tx) => {
                const isWin =
                    (tx.bet_condition === "up" && tx.close_price > tx.open_price) ||
                    (tx.bet_condition === "down" && tx.close_price < tx.open_price);

                const result = isWin ? "win" : "lose";

                if (isWin) winCount++;
                else loseCount++;

                totalValue += tx.value;
                totalBets += tx.bet_value;

                return {
                    ...tx,
                    result, // "win" | "lose"
                };
            });

        return {
            results,      // Danh sách từng giao dịch kèm result
            totalValue,   // Tổng tiền thắng/thua
            totalBets,    // Tổng tiền cược
            winCount,     // Số lần thắng
            loseCount,    // Số lần thua
        };
    }


    useEffect(() => {
        if (!user) return;

        const chart = chartRef.current?.chart;
        if (!chart) return;

        const handlePriceUpdate = (we_price: any) => {

            const { createDateTime, openPrice, closePrice, baseVolume, highPrice, lowPrice, second, isBet } = we_price;



            const btcData = {
                x: createDateTime,
                open: openPrice,
                high: highPrice,
                low: lowPrice,
                close: closePrice,
                vol: baseVolume,
            };

            const volData = {
                x: createDateTime,
                y: baseVolume,
                color: openPrice < closePrice ? "#3ae64e" : "#e62a2a",
            };

            const seriesBTC = chart.series[0];
            const seriesVolume = chart.series[1];

            const latestBTCPoint = seriesBTC.points.at(-1);
            const latestVolumePoint = seriesVolume.points.at(-1);

            chart.yAxis[0].options.plotLines[0].value = closePrice;
            chart.xAxis[0].options.plotLines[0].value = createDateTime;

            const closePriceFormat = Number(closePrice)?.toLocaleString();
            const secondFormat = "00:" + (second > 9 ? second : "0" + second);
            chart.yAxis[0].options.plotLines[0].label.x = -10;
            chart.yAxis[0].options.plotLines[0].label.text = `
            <div class="justify-start gap-2 flex flex-col">
              <span class="text-[#cca354] font-[900]" id="plotLinePrice">${closePriceFormat}</span>
              <span class="time font-[800]" id="timeSecond">${secondFormat}</span>
            </div>
          `;
            $("#plotLinePrice").text(closePriceFormat);
            $("#timeSecond").text(secondFormat);

            if (latestBTCPoint && createDateTime === latestBTCPoint.x) {
                latestBTCPoint.update(btcData);
                latestVolumePoint.update(volData);
            } else {
                seriesBTC.addPoint(btcData, true, seriesBTC.data.length > columnLength);
                seriesVolume.addPoint(volData, true, seriesVolume.data.length > columnLength);
            }
        };

        socket.on("WE_PRICE", handlePriceUpdate);

        return () => {
            socket.off("WE_PRICE", handlePriceUpdate);
        };
    }, [user]);

    useEffect(() => {
        if (!user) return;

        socket.on("WE_RESULT", (val: any) => {
            handleCallbackUser()
            getTransactions()
            const data = analyzeTransactions(val?.result as any, user?._id
            )
            setOpenResult(data)

        })

        return () => {
            socket.off("WE_RESULT");
        };
    }, [user])

    return (
        <div className='flex flex-col h-screen'>
            <PopupCongralation data={openResult} setOpenResult={setOpenResult} />
            <TradeHeader data={transactions} getTransactions={getTransactions} />
            <div className='flex flex-1 relative z-[10]'>
                <HighchartsReact
                    ref={chartRef}
                    highcharts={Highcharts}
                    constructorType={"stockChart"}
                    options={options}
                    containerProps={{
                        className: "chart-instance flex-1",
                        id: "chart-instance",
                    }}
                />
            </div>
            <div id="footer_trade">
                <LastResults tradingData={tradingData} showChunks={showChunks} setShowChunks={setShowChunks} />
                <BuySellBox getTransactions={getTransactions} />
            </div>
            <div className="bg-animation">
                <div id="stars" />
                <div id="stars2" />
                <div id="stars3" />
                <div id="stars4" />
            </div>
        </div>
    );
};

export default Trade;
