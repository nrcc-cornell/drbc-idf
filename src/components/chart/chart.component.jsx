import React, { useContext, useState, useRef } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import accessibility from 'highcharts/modules/accessibility';
import highchartsMore from 'highcharts/highcharts-more';
// import exporting from 'highcharts/modules/exporting';
NoDataToDisplay(Highcharts);
accessibility(Highcharts);
highchartsMore(Highcharts);
// exporting(Highcharts);

import { DataContext } from '../../contexts/data.context';
import { OptionsContext } from '../../contexts/options.context';

import Button from '../button/button.component';

import './chart.styles.scss';
import CiToggles from '../ci-toggles/ci-toggles.components';

const axesColor = 'rgb(150,150,150)';
const axesTextColor = 'rgb(100,100,100)';
const xLabels = [
  ['5min', 1 / 12],
  ['10min', 1 / 6],
  ['15min', 1 / 4],
  ['30min', 1 / 2],
  ['60min', 1],
  ['2hr', 2],
  ['3hr', 3],
  ['6hr', 6],
  ['12hr', 12],
  ['24hr', 24],
];

const convertToLineCoords = (values) => {
  return values.map((value, i) => [xLabels[i][1], value]);
};

const convertToArearangeCoords = (lower, upper) => {
  const results = [];
  for (let i = 0; i < xLabels.length; i++) {
    results.push([xLabels[i][1], lower[i], upper[i]]);
  }
  return results;
};

export default function Chart() {
  const [isZoomed, setIsZoomed] = useState(false);
  const chartRef = useRef(null);
  const { chartData, lastDurationHovered, setLastDurationHovered } =
    useContext(DataContext);
  const { rcp, returnPeriod, timeFrame, togglesInfo } =
    useContext(OptionsContext);

  if (!chartData)
    return <div className='no-data'>Please select a location to see data.</div>;

  const handleResetZoom = () => {
    chartRef.current.chart.zoomOut();
    setIsZoomed(false);
  };

  const series = [
    {
      id: 'projected',
      name: 'Projected',
      color: '#194186',
      data: convertToLineCoords(chartData.projectedData.median),
      zIndex: 6,
    },
    {
      id: 'atlas14',
      name: 'Atlas 14',
      color: '#36845c',
      data: convertToLineCoords(chartData.atlas14Data.median),
      zIndex: 5,
    },
  ];
  togglesInfo.forEach((toggle) => {
    if (toggle.checked) {
      let lower, upper, zIndex;
      switch (toggle.index) {
        case 0:
          lower = chartData.atlas14Data['10'];
          upper = chartData.atlas14Data['90'];
          zIndex = 1;
          break;
        case 1:
          lower = chartData.projectedData['25'];
          upper = chartData.projectedData['75'];
          zIndex = 4;
          break;
        case 2:
          lower = chartData.projectedData['17'];
          upper = chartData.projectedData['83'];
          zIndex = 3;
          break;
        case 3:
          lower = chartData.projectedData['10'];
          upper = chartData.projectedData['90'];
          zIndex = 2;
          break;

        default:
          lower = [];
          upper = [];
          zIndex = 0;
          break;
      }

      series.push({
        name: toggle.name + ' Upper',
        linkedTo: toggle.linkedTo,
        type: 'arearange',
        color: toggle.color,
        data: convertToArearangeCoords(lower, upper),
        zIndex,
      });
    }
  });

  const chartOptions = {
    credits: {
      text: 'Powered by NRCC',
      href: 'http://www.nrcc.cornell.edu/',
    },
    series,
    // exporting: {
    //   buttons: {
    //     contextButton: {
    //       menuItems: [
    //         'printChart',
    //         'separator',
    //         'downloadPNG',
    //         'downloadJPEG',
    //         'downloadPDF',
    //         'downloadSVG',
    //       ],
    //     },
    //   },
    // },
    plotOptions: {
      line: {
        marker: {
          enabled: true,
          symbol: 'circle',
          radius: 2,
          states: {
            hover: {
              enabled: false,
            },
          },
        },
      },
      arearange: {
        marker: {
          states: {
            hover: {
              enabled: false,
            },
          },
        },
      },
    },
    chart: {
      height: 500,
      width: 600,
      spacing: [13, 0, 0, 0],
      marginLeft: 35,
      marginRight: 4,
      marginTop: 30,
      marginBottom: 85,
      resetZoomButton: {
        theme: {
          style: { display: 'none' },
        },
      },
      style: {
        fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
      },
    },
    title: {
      text: `IDF Curve: ${returnPeriod}-Year Return Period Under RCP ${rcp
        .split('')
        .join('.')} From ${timeFrame}`,
      style: {
        fontFamily: "Georgia, 'Times New Roman', Times, serif",
      },
    },
    legend: {
      align: 'right',
      floating: true,
      layout: 'vertical',
      y: -90,
    },
    xAxis: {
      events: {
        setExtremes: () => setIsZoomed(true),
      },
      endOnTick: true,
      startOnTick: true,
      tickPositions: xLabels.map((arr) => arr[1]),
      labels: {
        style: {
          fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
          color: axesTextColor,
        },
        formatter: function () {
          if (this.value >= 1 / 2 || this.value < 0.1)
            return xLabels.find((arr) => arr[1] === this.value)[0];
        },
        rotation: -55,
        x: -2,
      },
      tickColor: axesColor,
      lineWidth: 1,
      lineColor: axesColor,
      crosshair: true,
    },
    yAxis: {
      title: {
        text: 'Depth (in.)',
        style: {
          fontFamily: "Georgia, 'Times New Roman', Times, serif",
          color: axesTextColor,
        },
        margin: 8,
      },
      labels: { x: -8, style: { color: axesTextColor } },
      tickWidth: 1,
      tickLength: 3,
      tickColor: axesColor,
      gridLineColor: 'rgb(240,240,240)',
      lineWidth: 1,
      lineColor: axesColor,
      endOnTick: false,
    },
    tooltip: {
      shared: true,
      hideDelay: 0,
      backgroundColor: 'rgba(0,0,0,0)',
      borderWidth: 0,
      shadow: false,
      positioner: function () {
        return { x: 0, y: 0 };
      },
      formatter: function () {
        if (!lastDurationHovered || lastDurationHovered.x !== this.x) {
          const index = xLabels.findIndex((labelArr) => labelArr[1] === this.x);
          setLastDurationHovered({
            x: this.x,
            name: `Last Hovered (${xLabels[index][0]})`,
            projectedData: {
              10: chartData.projectedData['10'][index],
              17: chartData.projectedData['17'][index],
              25: chartData.projectedData['25'][index],
              median: chartData.projectedData.median[index],
              75: chartData.projectedData['75'][index],
              83: chartData.projectedData['83'][index],
              90: chartData.projectedData['90'][index],
            },
            atlas14Data: {
              10: chartData.atlas14Data['10'][index],
              median: chartData.atlas14Data.median[index],
              90: chartData.atlas14Data['90'][index],
            },
          });
        }
        return '';
      },
    },
  };

  return (
    <div className='chart-container'>
      <CiToggles />

      <HighchartsReact
        ref={chartRef}
        highcharts={Highcharts}
        options={chartOptions}
      />

      {isZoomed && (
        <Button onClick={handleResetZoom} buttonType='chartResetZoom'>
          Reset Zoom
        </Button>
      )}
    </div>
  );
}
