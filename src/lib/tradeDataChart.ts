import $ from "jquery";
import _ from 'lodash';
import Highcharts from 'highcharts/highstock';
import moment from 'moment';

// Helper types
interface Rank {
  index: number;
  min: number;
  max: number;
  class: string;
}

interface Meter {
  numberValue: number;
  textValue: string;
}

interface IndicatorItems {
  [key: string]: number;
}

interface IndicatorSection {
  items: IndicatorItems;
  buy: number;
  sell: number;
  neutral: number;
  meter: Meter;
}

interface Indicators {
  reconnect: boolean;
  gaugeMeter: any;
  gaugeMeterOs: any;
  gaugeMeterSu: any;
  gaugeMeterMa: any;
  oscillators: IndicatorSection;
  summary: IndicatorSection;
  movingAverages: IndicatorSection;
}

const m: Rank[] = [
  { index: 1, min: -90, max: -55, class: "rank-1" },
  { index: 2, min: -54, max: -19, class: "rank-2" },
  { index: 3, min: -18, max: 17, class: "rank-3" },
  { index: 4, min: 18, max: 53, class: "rank-4" },
  { index: 5, min: 54, max: 90, class: "rank-5" }
];

const p = 3;

const t: Indicators = {
  reconnect: false,
  gaugeMeter: null,
  gaugeMeterOs: null,
  gaugeMeterSu: null,
  gaugeMeterMa: null,
  oscillators: {
    items: {
      relativeStrengthIndex: p,
      stochasticOscillator: p,
      commodityChannelIndex: p,
      awesomeOscillator: p,
      momentum: p,
      macd: p,
      stochasticRSIFast: p,
      williamsPercentRange: p,
      ultimateOscillator: p
    },
    buy: 0,
    sell: 0,
    neutral: 0,
    meter: { numberValue: 0, textValue: "" }
  },
  summary: {
    buy: 0,
    sell: 0,
    neutral: 0,
    items: {},
    meter: { numberValue: 0, textValue: "" }
  },
  movingAverages: {
    items: {
      exponentialMovingAverage5: p,
      exponentialMovingAverage10: p,
      exponentialMovingAverage20: p,
      exponentialMovingAverage30: p,
      exponentialMovingAverage50: p,
      exponentialMovingAverage100: p,
      simpleMovingAverage5: p,
      simpleMovingAverage10: p,
      simpleMovingAverage20: p,
      simpleMovingAverage30: p,
      simpleMovingAverage50: p,
      simpleMovingAverage100: p
    },
    buy: 0,
    sell: 0,
    neutral: 0,
    meter: { numberValue: 0, textValue: "" }
  }
};

interface TradeChartUpdates {
  [key: string]: any;
}

export function getTradeChartDefault(updates: TradeChartUpdates = {}) {
  const chartHeight = getChartHeight();
  const isPC = deviceVersion === 'pc';

  const data: any = {
    rangeSelector: {
			enabled: !1
		},
		credits: {
			enabled: !1
		},
		scrollbar: {
			enabled: !1
		},
		navigator: {
			enabled: !1
		},
    title: {
      text: `
        <div class="flex justify-center items-center gap-4">
          <span class="iconBTC iconBTC">
            <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"  style="width:20px" alt="" />
          </span>
          <span class="text-[#ffff]">BTC/USDT</span>
        </div>`,
      align: 'left',
      useHTML: true,
    },
    chart: {
      panning: !1,
			followTouchMove: !1,
			zoomType: "",
      height: chartHeight,
      width:isPC ? 500 : window.innerWidth,
      backgroundColor: 'transparent',
      plotBackgroundImage: '/images/world_map.png',
      marginRight: 80,
      marginLeft: 10,
      marginBottom:20,
      pinchType: 'x',
      resetZoomButton: { theme: { display: 'none' } },
      animation: { duration: 500 },
    },
    navigation: {
      bindingsClassName: 'tools-container',
    },
    stockTools: { gui: { enabled: false } },
    plotOptions: {
      candlestick: {
        lineColor: '#e62a2a',
        upLineColor: '#3ae64e',
        pointWidth: isPC ? 10 : 9,
        maxPointWidth: isPC ? 10 : 9,
      },
      column: {
        minPointLength: 2,
        pointWidth: isPC ? 11 : 11.2,
        maxPointWidth: isPC ? 11 : 11.2,
        borderWidth: 0,
        pointPadding: 0,
        groupPadding: 0,
      },
      series: [
        {
          id: "aapl",
          type: "candlestick",
          name: "BTC/USDT",
          color: "#e62a2a",
          upColor: "#3ae64e",
          point: {},
          data: []
        },
        {
          type: "column",
          name: "Volume",
          point: {},
          data: [],
          yAxis: 1
        },
      ]
    },
    xAxis: [{
        type: 'datetime',
        labels: {
          enabled: true,
          formatter: function (this: any) {
     
            return moment(this.value).format('HH:mm:ss');
          },
          style: { fontSize: 7, color: '#fff' },
        },
        plotLines: [{
          value: 1580717085410,
          color: '#ffffff',
          width: 0.75,
          id: 'current-pricex',
          zIndex: 1000,
          dashStyle: 'Dash',
        }],
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        minorTickLength: 0,
        tickLength: 0,
    }],
    yAxis: [{
      gridLineColor: '#182738',
      gridLineDashStyle: 'Dash',
      labels: {
        align: 'right',
        x: isPC ? 50 : 45,
        style: { color: '#fff', fontSize: '11px' },
        formatter: function (this: any) {
          return this.value / 1000 + 'k';
        },
      },
      height: '85%',
      top: isPC ? 0 : undefined,
      plotLines: [{
        value: 0,
        color: '#ffffff',
        width: 0.5,
        id: 'current-price',
        zIndex: 100,
        label: {
          useHTML: true,
          text: '0',
          x: isPC ? 70 : 60,
          align: 'right',
          style: {
            color: '#fff',
            fontSize: '11px',
            background: 'transparent',
            borderRadius: '4px',
          },
        },
      }],
      lineWidth: 0,
      resize: { enabled: true },
    }, {
      visible: false,
      top:  '85%',
      height: '15%',
      lineWidth: 0,
      offset: 0,
    }],
    tooltip: {
      split: false,
      enabled: true,
      animation: false,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderWidth: 0,
      useHTML: true,
      style: {
        color: '#fff',
        fontSize: '12px',
      },
      formatter: function (this: any) {
        const name = this.series.name;
        if (name === 'BTC/USDT') {
          return `
            <span style="margin-right: 10px;"><b>O</b>: ${formatDecimalNotRound(this.point.open, '', 2)}</span>
            <span style="margin-right: 10px;"><b>C</b>: ${formatDecimalNotRound(this.point.close, '', 2)}</span>
            <br/>
            <span style="margin-right: 10px;"><b>H</b>: ${formatDecimalNotRound(this.point.high, '', 2)}</span>
            <span style="margin-right: 10px;"><b>L</b>: ${formatDecimalNotRound(this.point.low, '', 2)}</span>
            <span><b>Vol</b>: ${formatDecimalNotRound((this.point as any).vol, '', 2)}</span>
          `;
        } else if (name === 'Volume') {
          return `<b>Vol</b>: ${formatDecimalNotRound(this.y as number, '', 2)}`;
        }
        return '';
      },
      positioner: function (this: any) {
        let x = 20, y = 60;

        if (deviceHeight <= 667 && deviceWidth <= 414) {
          x = 50;
          y = this.chart.plotSizeY - 50;
        } else if (deviceWidth <= 1024) {
          x = 50;
          y = this.chart.plotSizeY - 100;
        }

        return { x, y };
      },
    },
    series: [
      {
        id: 'aapl',
        type: 'candlestick',
        name: 'BTC/USDT',
        color: '#e62a2a',
        upColor: '#3ae64e',
        point: {},
        data: [],
      },
      {
        type: 'column',
        name: 'Volume',
        point: {},
        data: [],
        yAxis: 1,
      },
    ],
  };

  Object.keys(updates).forEach(key => {
    _.set(data, key, updates[key]);
  });

  return data;
}
function getChartHeight() {
  const header = document.getElementById('header_trade')?.clientHeight || 60;
  const footer = document.getElementById('footer_trade')?.clientHeight || 60;
  return window.innerHeight - header - footer - 50;
}

function formatDecimalNotRound(value: number, unit: string = "", decimals: number = 2): string {
  if (!value && value !== 0) return "";
  return value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }) + unit;
}

const deviceVersion = window.innerWidth > 768 ? "pc" : "mobile";
const deviceHeight = window.innerHeight;
const deviceWidth = window.innerWidth;
