import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchWordsStatsRequest } from "../../actions/words";
import { 
	getWordsStats,
	getColors
} from "../../reducers";
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
        const { 
			wordsStats ,
			colors
		} = this.props;
		// USE ICONS INSTEAD OF BUTTON
        return (
            <Fragment>
                <SectionHeader title="Words Statistics" />
                {wordsStats.length > 0 ? (
                    <div className="spe-section words-stats">
                        <ReactTable
                            data={wordsStats}
							defaultPageSize={50}
							resizable={false}
                            columns={[
                                {
                                    columns: [
                                        {
                                            Header: "Word",
                                            id: "word",
											resizable: true,
											headerClassName: 'stats-cell-word',
                                            accessor: d => d,
                                            sortMethod: (a, b) => {
                                                return a.word > b.word ? 1 : -1;
                                            },
                                            Cell: row => (
												<div className="stats-table-cell stats-word"
													style={{
														background: colors.allColors[parseInt(row.value.times_forgot)] ? colors.allColors[parseInt(row.value.times_forgot)] : colors.max
													}}	
												>
                                                    <div className="stats-word-itself">
                                                        <strong>
                                                            {row.value.word}
                                                        </strong>{" "}
                                                        -{" "}
														{row.value.prims_trans}
													</div>
													<div className="stats-word-button">
														<Link
															to={`/edit-word/${
																row.value.id
															}`}
															className="btn btn-warning btn-sm"
														>
															Edit Word
														</Link>
													</div>
                                                    
                                                </div>
                                            )
                                        },
                                        {
                                            Header: "Times Forgot",
                                            accessor: "times_forgot",
											minWidth: 24,
											headerClassName: 'stats-cell-times-forgot',
											Cell: row => (
												<div className="stats-table-cell"
													style={{
														background: colors.allColors[parseInt(row.value)] ? colors.allColors[parseInt(row.value)] : colors.max
													}}	
												>
													{row.value}
												</div>
											)
                                        },
                                        {
                                            Header: "Last Forgot",
                                            id: "last_forgot",
											minWidth: 38,
											headerClassName: 'stats-cell-last-forgot',
											className: 'stats-content-cell-last-forgot',
                                            accessor: d => d,
                                            sortMethod: (a, b) =>
                                                a.last_forgot > b.last_forgot
                                                    ? 1
                                                    : -1,
                                            Cell: row => (
                                                <div className="stats-table-cell"
													style={{
														background: colors.allColors[parseInt(row.value.times_forgot)] ? colors.allColors[parseInt(row.value.times_forgot)] : colors.max
													}}	
												>
                                                    {moment
                                                        .unix(
                                                            row.value
                                                                .last_forgot
                                                        )
                                                        .format(
                                                            "MM/DD/YYYY, HH:mm"
                                                        )}
                                                </div>
                                            )
                                        },
                                        {
                                            Header: "Forgot/Ran Ratio",
                                            id: "forgot_ran_ratio",
											minWidth: 28,
											headerClassName: 'stats-cell-ratio',
                                            accessor: d => d,
                                            sortMethod: (a, b) => {
                                                const ratioA =
                                                        a.times_forgot /
                                                        a.times_ran,
                                                    ratioB =
                                                        b.times_forgot /
                                                        b.times_ran;
                                                return ratioA > ratioB ? 1 : -1;
                                            },
                                            Cell: d => (
												<div className="stats-table-cell"
													style={{
														background: colors.allColors[parseInt(d.value.times_forgot)] ? colors.allColors[parseInt(d.value.times_forgot)] : colors.max
													}}	
												>
													{parseFloat(
														(d.value.times_forgot /
															d.value.times_ran) *
															100
													).toFixed(2)}
												</div>
											)
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
	wordsStats: getWordsStats(state),
	colors: getColors(state)
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
