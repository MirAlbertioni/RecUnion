import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import '@progress/kendo-theme-default/dist/all.css';
import './Dashboard.css';
import { getArtists } from './../Actions/DashboardActions'
import { MyCommandCell } from "./../../common/myCommandCell";

class DashboardView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchInput: "",
            limit: 100,
            skip: 0,
            take: 5,
            addedArtists: []
        };
    }

    pageChange = (event) => {
        this.setState({
            skip: event.page.skip,
            take: event.page.take
        });
    }

    CommandCellSearched = props => (
        <MyCommandCell {...props}
            add={this.add}
            showAdd={true}
            showDelete={false}
            addedArtists={this.state.addedArtists} />
    );

    CommandCellAdded = props => (
        <MyCommandCell {...props}
            remove={this.remove}
            showAdd={false}
            showDelete={true} />
    );

    remove = dataItem => {
        var addedArtists = [...this.state.addedArtists];
        var index = addedArtists.indexOf(dataItem)
        if (index !== -1) {
            addedArtists.splice(index, 1);
            this.setState({ addedArtists });
        }
    };

    add = dataItem => {
        let addedArtists = this.state.addedArtists;
        if (addedArtists.length >= 5) {
            alert("Can not add more than 5");
            return;
            //this should be a dialog and not an alert
        }
        addedArtists.push(dataItem);
        this.setState({ addedArtists });
    };

    onKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.handleSearch();
        }
    }

    handleChange = (e) => {
        this.setState({
            searchInput: e.target.value
        });
    }

    handleSearch = () => {
        this.props.dispatch(getArtists(this.state.searchInput));
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
                                    onKeyDown={this.onKeyPress}
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
                                    <Column cell={this.CommandCellSearched} width="150px" />
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
                                    <Column field="followers.total" title="followers" width="150px" />
                                    <Column cell={this.CommandCellAdded} width="150px" />
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