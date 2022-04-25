import * as React from "react";
import * as wjcCore from '@grapecity/wijmo';
import * as wjChart from '@grapecity/wijmo.react.chart';
import * as wjChartAnimate from '@grapecity/wijmo.react.chart.animation';
import { GdashTile } from '../components/GdashTile';
import * as PropTypes from 'prop-types';
export class PopulationTile extends React.Component {
    render() {
        const { format } = wjcCore.Globalize;
        const { data, palette } = this.props;
        const populationData = [
            {
                label: 'Female',
                value: 100 * data.popFemale / data.popTotal
            },
            {
                label: 'Male',
                value: 100 * data.popMale / data.popTotal
            },
        ];
        return (<GdashTile icon={<svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M7.5,2A2,2 0 0,1 9.5,4A2,2 0 0,1 7.5,6A2,2 0 0,1 5.5,4A2,2 0 0,1 7.5,2M6,7H9A2,2 0 0,1 11,9V14.5H9.5V22H5.5V14.5H4V9A2,2 0 0,1 6,7M16.5,2A2,2 0 0,1 18.5,4A2,2 0 0,1 16.5,6A2,2 0 0,1 14.5,4A2,2 0 0,1 16.5,2M15,22V16H12L14.59,8.41C14.84,7.59 15.6,7 16.5,7C17.4,7 18.16,7.59 18.41,8.41L21,16H18V22H15Z"/>
          </svg>} header="Population by Sex">
        <div className="tile-description">
          Total Population: <b>{format(data.popTotal, 'n0')}</b>
        </div>
        <div className="tile-chart">
          <div className="flex-row">
            <div className="flex-col">
              <svg width="48" height="48" viewBox="0 0 24 24" fill={palette[0]}>
                <path d="M12,2A2,2 0 0,1 14,4A2,2 0 0,1 12,6A2,2 0 0,1 10,4A2,2 0 0,1 12,2M10.5,22V16H7.5L10.09,8.41C10.34,7.59 11.1,7 12,7C12.9,7 13.66,7.59 13.91,8.41L16.5,16H13.5V22H10.5Z"/>
              </svg>
              <div>Female:</div>
              <div>{format(data.popFemale, 'n0')}</div>
            </div>
            <div className="flex-col">
              <wjChart.FlexPie className="chart chart-pie" bindingName="label" binding="value" innerRadius={0.5} itemsSource={populationData} palette={palette}>
                <wjChart.FlexPieDataLabel position="Inside" content="{value:n1}%" offset={10}/>
                <wjChart.FlexChartLegend position="None"/>
                <wjChartAnimate.FlexChartAnimation />
              </wjChart.FlexPie>
            </div>
            <div className="flex-col">
              <svg width="48" height="48" viewBox="0 0 24 24" fill={palette[1]}>
                <path d="M12,2A2,2 0 0,1 14,4A2,2 0 0,1 12,6A2,2 0 0,1 10,4A2,2 0 0,1 12,2M10.5,7H13.5A2,2 0 0,1 15.5,9V14.5H14V22H10V14.5H8.5V9A2,2 0 0,1 10.5,7Z"/>
              </svg>
              <div>Male:</div>
              <div>{format(data.popMale, 'n0')}</div>
            </div>
          </div>
        </div>
      </GdashTile>);
    }
}
PopulationTile.propTypes = {
    data: PropTypes.any.isRequired,
    palette: PropTypes.array.isRequired
};
