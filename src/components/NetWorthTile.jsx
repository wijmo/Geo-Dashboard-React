import * as React from "react";
import * as wjcCore from '@grapecity/wijmo';
import * as wjGauge from '@grapecity/wijmo.react.gauge';
import { GdashTile } from '../components/GdashTile';
import * as PropTypes from 'prop-types';
export class NetWorthTile extends React.Component {
    render() {
        const { format } = wjcCore.Globalize;
        const { data, palette } = this.props;
        return (<GdashTile icon={<svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M20,18H4V6H20M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4M11,17H13V16H14A1,1 0 0,0 15,15V12A1,1 0 0,0 14,11H11V10H15V8H13V7H11V8H10A1,1 0 0,0 9,9V12A1,1 0 0,0 10,13H13V14H9V16H11V17Z"/>
        </svg>} header="Median Household Net Worth">
      <div className="tile-description">
        <p>
          The median net worth is <b>${format(data.netWorth, 'n0')}</b>
        </p>
      </div>
      <div className="tile-chart">
        <wjGauge.LinearGauge className="gauge gauge-linear" min={50000} max={150000} value={data.netWorth} showTicks={true} showRanges={false} tickSpacing={25000}>
          <wjGauge.Range min={0} max={300000} color={palette[0]}/>
        </wjGauge.LinearGauge>
      </div>
    </GdashTile>);
    }
}
NetWorthTile.propTypes = {
    data: PropTypes.any.isRequired,
    palette: PropTypes.array.isRequired
};
