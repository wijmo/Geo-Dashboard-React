// React
import * as React from 'react';
import * as wjGauge from '@grapecity/wijmo.react.gauge';
export class GdashGauge extends React.Component {
    render() {
        return <wjGauge.BulletGraph className="gauge1" min={0} max={250} showText='Value' face={{ thickness: 0.1 }} pointer={{ color: this.props.color, thickness: 0 }} bad={0} good={0} target={100} thumbSize={22} ranges={[{ min: 97, max: 103, color: 'rgb(210, 209, 207)' }]} value={Math.round(100 * this.props.value)}>
    </wjGauge.BulletGraph>;
    }
}
