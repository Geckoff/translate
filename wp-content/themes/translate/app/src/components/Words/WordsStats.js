import React, { Fragment, Component } from "react";
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
                                            Header: "Word",
                                            id: 'word',
                                            accessor: d => `<strong>${d.word}</strong> - ${d.prims_trans}`
                                        },
                                        {
                                            Header: "Times Forgot",
                                            accessor: 'times_forgot'
                                        },
                                        {
                                            Header: "Last Forgot",
                                            id: 'last_forgot',
                                            accessor: d => moment.unix(d.last_forgot).format("DD/MM/YYYY, HH:mm")
                                        },
                                        {
                                            Header: "Forgot/Ran Ratio",
                                            id: 'forgot_ran_ratio',
                                            accessor: d => d.times_forgot / d.times_ran * 100
                                        }
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
