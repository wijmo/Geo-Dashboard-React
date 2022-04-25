import * as React from 'react';
import { TabPanel, Tab } from '@grapecity/wijmo.react.nav';
import { HomeValueTile } from './components/HomeValueTile';
import { HouseholdIncomeTile } from './components/HouseholdIncomeTile';
import { MedianAgeTile } from './components/MedianAgeTile';
import { NetWorthTile } from './components/NetWorthTile';
import { PopulationTile } from './components/PopulationTile';
import { GdashMap } from './components/GdashMap';
import { DataService } from './services/DataService';
export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            data: null,
            palette: ['#00b075', '#f8ce45', '#ecf0ee'],
        };
    }
    componentDidMount() {
        DataService.init(() => {
            const data = DataService.getData(0);
            this.setState({
                name: 'US', data: data
            });
        });
    }
    // render the dashboard
    render() {
        const onSelected = (data, name) => {
            this.setState({
                name: name, data: data
            });
        };
        return (<React.Fragment>
        <div className="container">
          <GdashMap palette={this.state.palette} onSelected={onSelected}/>

          <div className="data">
            <div className="row">{this.renderTiles()}</div>
          </div>
        </div>
      </React.Fragment>);
    }
    renderTiles() {
        const { name, data, palette } = this.state;
        if (!name || !data) {
            return null;
        }
        const dataUS = DataService.getData(0);
        return (<div className="data-group">
        <div className="group">
          <div className="group-title">{name}</div>
        </div>

        <TabPanel selectedIndex={0}>
          <Tab>
            <a href="#">Demographics</a>
            <div>
              <div className="data-col">{<PopulationTile data={data} palette={palette}/>}</div>
              <div className="data-col">{<MedianAgeTile data={data} palette={palette}/>}</div>
            </div>
          </Tab>
          <Tab>
            <a href="#">Affluence</a>
            <div>
              <div className="data-col">{<NetWorthTile data={data} palette={palette}/>}</div>
              <div className="data-col">{<HouseholdIncomeTile data={data} palette={palette}/>}</div>
            </div>
          </Tab>
          <Tab>
            <a href="#">Home Value</a>
            <div>
              <div className="data-col">{<HomeValueTile name={name} data={data} dataUS={dataUS} palette={palette}/>}</div>
            </div>
          </Tab>
        </TabPanel>
      </div>);
    }
}
