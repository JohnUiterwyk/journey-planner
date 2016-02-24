/**
 * Created by johnuiterwyk on 2/22/16.
 */
import React from "react";
import TripAction from "../../actions/TripAction";


class TripFilterView extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state =
        {
            filterString : ""
        }
    }

    componentWillMount()
    {
        if(this.props.filterString)
        {
            this.setState({filterString:this.props.filterString});
        }
    }

    updateFilterString(filterString)
    {
        this.setState({filterString: filterString});
        TripAction.updateFilterString(filterString);
    }
    handleFilterChange(e) {
        this.updateFilterString(e.target.value);
    }
    handleClear(e) {
        this.updateFilterString("");
    }

    render() {

        return (

            <div class="row trip-filter-view">
                <div class="col-sm-2">
                    <input
                        type="text"
                        placeholder="Filter destination"
                        value={this.state.filterString}
                        onChange={this.handleFilterChange.bind(this)}
                        className="form-control"
                        id="filter-string"
                        ref="filter-string"
                    />
                </div>
                <div class="col-sm-1">
                    <button class="btn btn-default" onClick={this.handleClear.bind(this)}>Clear</button>
                </div>
            </div>
        );
    }
}
export default TripFilterView;