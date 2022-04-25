import * as React from "react";
import * as wjcCore from '@grapecity/wijmo';
import * as wjChart from '@grapecity/wijmo.react.chart';
import * as wjChartAnimate from '@grapecity/wijmo.react.chart.animation';
import { GdashTile } from '../components/GdashTile';
import { GdashGauge } from '../components/GdashGauge';
import * as PropTypes from 'prop-types';
export class HomeValueTile extends React.Component {
    constructor() {
        super(...arguments);
        this.state = { detailed: false };
    }
    render() {
        const { format } = wjcCore.Globalize;
        const { name, data, dataUS, palette } = this.props;
        const { detailed } = this.state;
        const homeValueData = [
            {
                name: '<300K',
                value: data.homeValue0_50K + data.homeValue50_100K + data.homeValue100_300K
            },
            {
                name: '300K-500K',
                value: data.homeValue300_500K
            },
            {
                name: '>500K',
                value: data.homeValue500_1000K + data.homeValue1000K
            },
        ];
        const homeValueDataDetails = [
            {
                name: '<50K',
                value: data.homeValue0_50K
            },
            {
                name: '50K-100K',
                value: data.homeValue50_100K
            },
            {
                name: '100K-300K',
                value: data.homeValue100_300K
            },
            {
                name: '300K-500K',
                value: data.homeValue300_500K
            },
            {
                name: '500K-1M',
                value: data.homeValue500_1000K
            },
            {
                name: '>1M',
                value: data.homeValue1000K
            },
        ];
        return (<GdashTile icon={<svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M12,3L22,12H19V20H5V12H2L12,3M9.22,8.93C8.75,9.4 8.5,10.03 8.5,10.75C8.5,12.43 10.54,13.07 11.76,13.46C13.26,13.93 13.47,14.21 13.5,14.25C13.5,15 12.15,15 12,15V15C11.37,15 11.03,14.88 10.86,14.78C10.67,14.67 10.5,14.5 10.5,14H8.5C8.5,15.43 9.24,16.16 9.85,16.5C10.18,16.7 10.57,16.84 11,16.92V18H13V16.91C14.53,16.61 15.5,15.62 15.5,14.25C15.5,12.67 13.88,12.03 12.36,11.55C10.8,11.06 10.53,10.77 10.5,10.75C10.5,10.5 10.57,10.41 10.64,10.34C10.85,10.13 11.36,10 12,10V10C12.68,10 13.5,10.13 13.5,10.75H15.5C15.5,9.34 14.56,8.37 13,8.09V7H11V8.08C10.26,8.21 9.65,8.5 9.22,8.93Z"/>
        </svg>} header="Home Values">
      <div className="tile-description">
        <b>{name}'s</b> median home value is{' '}
        <b>${format(data.medianHomeValueMort, 'n1')}</b> (
        {this.getIndexDescription(100 * data.medianHomeValueMort / dataUS.medianHomeValueMort)}).
      </div>
      <table>
        <tbody>
          <tr>
            <td>Home Value Index</td>
            <td>
              <GdashGauge value={data.medianHomeValueMort / dataUS.medianHomeValueMort} color={palette[1]}/>
            </td>
          </tr>
          <tr>
            <td>Household Income Index</td>
            <td>
              <GdashGauge value={data.medianIncome / dataUS.medianIncome} color={palette[1]}/>
            </td>
          </tr>
          <tr>
            <td>Net Worth Index</td>
            <td>
              <GdashGauge value={data.netWorth / dataUS.netWorth} color={palette[1]}/>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="tile-chart">
        <div className="btn-group btn-group-toggle">
          <label className={`btn ${detailed ? '' : 'active'}`}>
            <input type="radio" checked={!detailed} onChange={() => this.setState({ detailed: false })}/>
            Summary
          </label>
          <label className={`btn ${detailed ? 'active' : ''}`}>
            <input type="radio" checked={detailed} onChange={() => this.setState({ detailed: true })}/>
            Details
          </label>
        </div>
        <div>
          <wjChart.FlexChart style={{ height: '350px', display: detailed ? 'block' : 'none' }} className="chart chart-bar" chartType="Bar" itemsSource={homeValueDataDetails} plotMargin="10 80 10 70" tooltipContent="{y} houses <br/> are {x}" palette={palette} bindingX="name">
            <wjChart.FlexChartAxis wjProperty="axisX" axisLine={false} majorGrid={false} labels={false}/>
            <wjChart.FlexChartAxis wjProperty="axisY" majorGrid={false} axisLine={true} labels={true}/>
            <wjChart.FlexChartDataLabel content="{y}" offset={6} position="Right"/>
            <wjChart.FlexChartSeries binding="value"/>
            <wjChartAnimate.FlexChartAnimation />
          </wjChart.FlexChart>

          <wjChart.FlexChart style={{ display: detailed ? 'none' : 'block' }} className="chart chart-bar" itemsSource={homeValueData} chartType="Bar" bindingX="name" tooltipContent="{y} homes in the <br/>{x} range" palette={palette}>
            <wjChart.FlexChartAxis wjProperty="axisX" majorTickMarks="None" majorGrid={true} axisLine={false} labels={false}/>
            <wjChart.FlexChartAxis wjProperty="axisY" majorGrid={false}/>
            <wjChart.FlexChartSeries binding="value"/>
          </wjChart.FlexChart>
        </div>
      </div>
    </GdashTile>);
    }
    // get a description for an index (100 is the national average, 50 is half, 200 is double, etc)
    getIndexDescription(index) {
        if (index == 100) {
            return 'national average';
        }
        const desc = index < 50 ? 'substantially lower' :
            index < 80 ? 'lower' :
                index < 100 ? 'slightly lower' :
                    index < 120 ? 'slightly higher' :
                        index < 200 ? 'higher' :
                            'substantially higher';
        return desc + ' than the national average';
    }
}
HomeValueTile.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.any.isRequired,
    dataUS: PropTypes.any.isRequired,
    palette: PropTypes.array.isRequired
};
