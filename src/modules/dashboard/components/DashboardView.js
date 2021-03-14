import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import '@progress/kendo-theme-default/dist/all.css';
import './Dashboard.css';
import { getArtists } from './../Actions/DashboardActions'

class DashboardView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchInput: "",
            selectedArtists: [],
            limit: 100,
            skip: 0,
            take: 10,
            addedArtists: []
        };
    }

    handleChange = (e) => {
        this.setState({
            searchInput: e.target.value
        });
    }

    handleSearch = () => {
        this.props.dispatch(getArtists(this.state.searchInput));
    }

    headerSelectionChange = (event) => {
        const checked = event.syntheticEvent.target.checked;
        const data = this.props.artists.map(item => {
            item.selected = checked;
            return item;
        });
        this.setState({ data });
    }

    rowClick = event => {
        let last = this.lastSelectedIndex;
        const data = [...this.props.artists];
        const current = data.findIndex(dataItem => dataItem === event.dataItem);

        if (!event.nativeEvent.shiftKey) {
            this.lastSelectedIndex = last = current;
        }

        if (!event.nativeEvent.ctrlKey) {
            data.forEach(item => (item.selected = false));
        }
        const select = !event.dataItem.selected;
        let addedArtists = this.state.addedArtists;
        for (let i = Math.min(last, current); i <= Math.max(last, current); i++) {
            data[i].selected = select;
            addedArtists.push(data[i]);
        }

        this.setState({
            artists: data,
            addedArtists
        });
    }

    selectionChange = (event) => {
        const data = this.props.artists.map(item => {
            if (item.ProductID === event.dataItem.ProductID) {
                item.selected = !event.dataItem.selected;
            }
            return item;
        });
        this.setState({ artists: data });
    }

    pageChange = (event) => {
        this.setState({
            skip: event.page.skip,
            take: event.page.take
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="dashboard">
                    <div className="container-fluid form-body">
                        <div className="row">
                            <div className="searchFields">
                                <input
                                    onChange={this.handleChange}
                                    value={this.state.searchInput}
                                />
                                <button
                                    className="add-todo"
                                    onClick={this.handleSearch}>Search for artist</button>
                            </div>
                        </div>

                        <div className="row">
                            <div className="grid-one">
                                <Grid
                                    data={this.props.artists.slice(this.state.skip, this.state.take + this.state.skip)}
                                    selectedField="selected"
                                    onSelectionChange={this.selectionChange}
                                    onHeaderSelectionChange={this.headerSelectionChange}
                                    onRowClick={this.rowClick}
                                    skip={this.state.skip}
                                    take={this.state.take}
                                    total={this.props.artists.length}
                                    pageable={true}
                                    onPageChange={this.pageChange} >
                                    <Column field="name" title="name" width="300px" />
                                    <Column field="type" title="type" width="100px" />
                                    <Column field="genres" title="genres" width="200px" />
                                    <Column field="followers.total" title="followers" width="150px" />
                                </Grid>
                            </div>
                        
                            <div className="grid-two">
                                <Grid
                                    data={this.state.addedArtists}
                                    onPageChange={this.pageChange} >
                                    <Column field="name" title="name" width="300px" />
                                </Grid>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >);
    }
}

DashboardView.propTypes = {
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        artists: state.dashboard.artists
    };
}

export default connect(mapStateToProps)(DashboardView);