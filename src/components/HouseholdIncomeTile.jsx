import * as React from "react";
import * as wjcCore from '@grapecity/wijmo';
import * as wjChart from '@grapecity/wijmo.react.chart';
import { GdashTile } from '../components/GdashTile';
import * as PropTypes from 'prop-types';
export class HouseholdIncomeTile extends React.Component {
    render() {
        const { format } = wjcCore.Globalize;
        const { data, palette } = this.props;
        const incomeData = [
            {
                value1: data.numHouses75k,
                value2: data.numHouses75_150k,
                value3: data.numHouses150k
            }
        ];
        return (<GdashTile icon={<svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M5,6H23V18H5V6M14,9A3,3 0 0,1 17,12A3,3 0 0,1 14,15A3,3 0 0,1 11,12A3,3 0 0,1 14,9M9,8A2,2 0 0,1 7,10V14A2,2 0 0,1 9,16H19A2,2 0 0,1 21,14V10A2,2 0 0,1 19,8H9M1,10H3V20H19V22H1V10Z"/>
        </svg>} header="Household Income">
      <div className="tile-description">
        The average income is <b>${format(data.medianIncome, 'n0')}</b>
      </div>
      <wjChart.FlexChart className="chart chart-bar-stacked" chartType="Bar" stacking="Stacked100pc" itemsSource={incomeData} palette={palette}>
        <wjChart.FlexChartAxis wjProperty="axisY" position="None"/>
        <wjChart.FlexChartAxis wjProperty="axisX" position="None"/>
        <wjChart.FlexChartDataLabel content="{y}" position="Left" offset={0}/>
        <wjChart.FlexChartSeries name="Under 75k" binding="value1"/>
        <wjChart.FlexChartSeries name="75k to 150k" binding="value2"/>
        <wjChart.FlexChartSeries name="150k and above" binding="value3"/>
        <wjChart.FlexChartLegend position="Bottom"/>
      </wjChart.FlexChart>
    </GdashTile>);
    }
}
HouseholdIncomeTile.propTypes = {
    data: PropTypes.any.isRequired,
    palette: PropTypes.array.isRequired
};
