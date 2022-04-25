import * as React from "react";
import * as wjcCore from '@grapecity/wijmo';
import * as wjChart from '@grapecity/wijmo.react.chart';
import * as wjChartAnimate from '@grapecity/wijmo.react.chart.animation';
import { GdashTile } from '../components/GdashTile';
import * as PropTypes from 'prop-types';
export class MedianAgeTile extends React.Component {
    render() {
        const { format } = wjcCore.Globalize;
        const { data, palette } = this.props;
        const ageData = [
            {
                name: 'Children',
                value: data.pop15
            },
            {
                name: 'Youth',
                value: data.pop15_24
            },
            {
                name: 'Adults',
                value: data.pop25_64
            },
            {
                name: 'Senoir',
                value: data.pop64
            }
        ];
        return (<GdashTile icon={<svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M16 9C22 9 22 13 22 13V15H16V13C16 13 16 11.31 14.85 9.8C14.68 9.57 14.47 9.35 14.25 9.14C14.77 9.06 15.34 9 16 9M2 13C2 13 2 9 8 9S14 13 14 13V15H2V13M9 17V19H15V17L18 20L15 23V21H9V23L6 20L9 17M8 1C6.34 1 5 2.34 5 4S6.34 7 8 7 11 5.66 11 4 9.66 1 8 1M16 1C14.34 1 13 2.34 13 4S14.34 7 16 7 19 5.66 19 4 17.66 1 16 1Z"/>
        </svg>} header="Median Age">
      <div className="tile-description">
        The median age is <b>{format(data.medianAge, 'n1')} years</b>
      </div>
      <wjChart.FlexChart className="chart chart-median" chartType="Column" plotMargin="40 0 60 0" itemsSource={ageData} bindingX="name" tooltipContent="{y} people <br/> are {x}" palette={palette}>
        <wjChart.FlexChartAxis wjProperty="axisX" majorTickMarks="None" majorGrid={false} axisLine={true} labels={true}/>
        <wjChart.FlexChartAxis wjProperty="axisY" position="None"/>
        <wjChart.FlexChartSeries binding="value"/>
        <wjChart.FlexChartDataLabel content="{y}" offset={5} position="Top"/>
        <wjChartAnimate.FlexChartAnimation />
      </wjChart.FlexChart>
    </GdashTile>);
    }
}
MedianAgeTile.propTypes = {
    data: PropTypes.any.isRequired,
    palette: PropTypes.array.isRequired
};
