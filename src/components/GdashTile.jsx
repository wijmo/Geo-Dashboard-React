// React
import * as React from "react";
export class GdashTile extends React.Component {
    render() {
        return (<div className="tile" onClick={this.handleClick.bind(this)}>
        <div className="tile-header">
          {this.props.icon && (<React.Fragment>{this.props.icon}</React.Fragment>)}
          <span>{this.props.header}</span>
        </div>
        <div className="tile-content">{this.props.children}</div>
      </div>);
    }
    handleClick() {
        if (this.props.onTileClick) {
            this.props.onTileClick();
        }
    }
}
