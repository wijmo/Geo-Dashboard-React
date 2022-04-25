import * as React from 'react';
import { Globalize, isIE } from '@grapecity/wijmo';
import * as wjcChart from '@grapecity/wijmo.chart';
import * as wjcMap from '@grapecity/wijmo.chart.map';
import * as wjMap from '@grapecity/wijmo.react.chart.map';
import * as wjChart from '@grapecity/wijmo.react.chart';
import * as PropTypes from 'prop-types';
import { DataService } from '../services/DataService';
export class GdashMap extends React.Component {
    constructor() {
        super(...arguments);
        this.sources = [
            { name: 'None', value: '' },
            { name: 'Median Age', value: 'medianAge', fmtLegend: 'n0', fmtTooltip: '"Age: "n1' },
            { name: 'Home Value', value: 'medianHomeValueMort', fmtLegend: 'c0,"k"', fmtTooltip: '"Home Value: "c1,"k"' },
            { name: 'Household Income', value: 'medianIncome', fmtLegend: 'c0,"k"', fmtTooltip: '"Income: "c1,"k"' },
            { name: 'Net Worth', value: 'netWorth', fmtLegend: 'c0,"k"', fmtTooltip: '"Net Worth: "c1,"k"' },
            { name: 'Population', value: 'popTotal', fmtLegend: 'n0,,"m"', fmtTooltip: '"Population: "n1,,"m"' },
        ];
        this.selectedName = null;
        this.selectedData = null;
        this.selectedId = null;
        this.selectedDataSourceIndex = 0;
        this.zoomTo = (layer) => layer.map.zoomTo(layer.getGeoBBox());
    }
    render() {
        return <div className="map">
      <wjMap.FlexMap initialized={this.mapInitialized.bind(this)} header='Select state on the map to see its data' tooltipContent={this.tooltipContent.bind(this)}>
        <wjMap.GeoMapLayer url="assets/US.json" itemsSourceChanged={this.zoomTo}/>
        <wjChart.FlexChartLegend position="Left"/>
      </wjMap.FlexMap>
      <div className="legend">
        <label htmlFor="legend">Map Legend:</label>
        <select id="legend" className="control legend-select" defaultValue="1" onChange={({ target }) => this.selectSource(target)}>
          {this.sources.map((entity) => (<option key={`option_${entity.name}`} value={entity.value}>
              {entity.name}
            </option>))}
        </select>
      </div>
    </div>;
    }
    tooltipContent(o) {
        const source = this.sources[this.selectedDataSourceIndex];
        const val = this.binding(o, source.value);
        if (val) {
            return `<b>${o.name}</b><br>${Globalize.formatNumber(val, source.fmtTooltip)}`;
        }
        else {
            return o.name;
        }
    }
    binding(o, name) {
        const key = Number(o.fips.toString().slice(2));
        const item = DataService.getData(key);
        return item ? item[name] : 0;
    }
    mapInitialized(map) {
        this.map = map;
        map.hostElement.addEventListener('click', e => {
            if (e && e.srcElement.tagName !== 'BUTTON') {
                let ht = map.hitTest(e);
                if (ht && ht.item) {
                    this.selectedName = ht.item.name;
                    const code = Number(ht.item.fips.toString().slice(2));
                    this.props.onSelected(DataService.getData(code), ht.item.name);
                    let el = document.elementFromPoint(e.x, e.y);
                    let id = el ? el.getAttribute('wj-map:id') : null;
                    this.selectedId = id;
                    map.layers[0]._clearCache();
                    map.invalidate();
                }
                else {
                    //this.selectedName = null;
                }
            }
        });
        let self = this;
        map.rendered.addHandler(function (s, a) {
            const layer = map.layers[0];
            const g = layer._g;
            if (g && self.selectedId) {
                let list = [];
                for (let i = 0; i < g.childNodes.length; i++) {
                    const node = g.childNodes[i];
                    let id = node.getAttribute('wj-map:id');
                    if (id === self.selectedId) {
                        let sw = isIE() ? 3 * a.engine.scale : 3;
                        node.setAttribute('stroke', self.props.palette[0]);
                        node.setAttribute('stroke-width', sw.toString());
                        list.push(node);
                    }
                }
                list.forEach((el) => el.parentNode.appendChild(el));
            }
        });
    }
    selectSource(target) {
        this.selectedDataSourceIndex = target.selectedIndex;
        if (target.value) {
            this.map.layers[0].colorScale = new wjcMap.ColorScale({
                binding: (o) => this.binding(o.properties, target.value),
                colors: wjcChart.Palettes.SequentialSingle.Blues,
                format: this.sources[this.selectedDataSourceIndex].fmtLegend
            });
        }
        else {
            this.map.layers[0].colorScale = null;
            //target.selectedIndex = 0;
        }
        this.map.layers[0]._clearCache();
        this.map.invalidate();
    }
}
GdashMap.propTypes = {
    onSelected: PropTypes.func.isRequired,
    palette: PropTypes.array.isRequired
};
