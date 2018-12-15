import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchWordsStatsRequest } from "../../actions/words";
import { getWordsStats } from "../../reducers";
import { SectionHeader } from "../styleComponents/SectionHeader";
import ReactTable from "react-table";
import moment from "moment";
import "react-table/react-table.css";

class WordsStats extends Component {
    constructor(props) {
        super(props);
        this.props.fetchWordsStatsRequest(); // get words statistics
    }

    render() {
        const { wordsStats } = this.props;
        return (
            <Fragment>
                <SectionHeader title="Words Statistics" />
                {wordsStats.length > 0 ? (
                    <div className="spe-section words-list">
                        <ReactTable
                            data={wordsStats}
                            columns={[
                                {
                                    columns: [
                                        {
                                            Header: 'Word',
                                            id: 'word',
                                            resizable: true,
                                            accessor: d => d,
                                            sortMethod: (a, b) => {
                                                return a.word > b.word ? 1 : -1;
                                            },
                                            Cell: row => (
                                              <span>
                                                <strong>{row.value.word}</strong> - {row.value.prims_trans}
                                                <div>
                                                    <Link to={`/edit-word/${row.value.id}` }>Edit Word</Link>
                                                </div>
                                              </span>
                                            )
                                        },
                                        {
                                            Header: "Times Forgot",
                                            accessor: 'times_forgot',
                                            minWidth: 30,
                                        },
                                        {
                                            Header: "Last Forgot",
                                            id: 'last_forgot',
                                            minWidth: 30,
                                            accessor: d => d,
                                            sortMethod: (a, b) => a.last_forgot > b.last_forgot ? 1 : -1,
                                            Cell: row => (
                                                <Fragment>
                                                    {moment.unix(row.value.last_forgot).format("MM/DD/YYYY, HH:mm")}
                                                </Fragment>
                                              )
                                        },
                                        {
                                            Header: "Forgot/Ran Ratio",
                                            id: 'forgot_ran_ratio',
                                            minWidth: 30,
                                            accessor: d => d,
                                            sortMethod: (a, b) => {
                                                const ratioA = a.times_forgot / a.times_ran,
                                                      ratioB = b.times_forgot / b.times_ran;
                                                return ratioA > ratioB ? 1 : -1;
                                            },
                                            Cell: d => parseFloat(d.value.times_forgot / d.value.times_ran * 100).toFixed(2)
                                        },
                                    ]
                                }
                            ]}
                            minRows={3}
                            className="-striped -highlight"
                        />
                    </div>
                ) : (
                    <p>No Words in this list</p>
                )}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    wordsStats: getWordsStats(state)
});

const mapDispatchToProps = dispatch => {
    return {
        fetchWordsStatsRequest: () => {
            dispatch(fetchWordsStatsRequest());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WordsStats);
