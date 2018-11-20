import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import {fetchWordsByListRequest} from "../../actions/words";
import {fetchSingleListRequest} from "../../actions/lists";
import {getWordsByList, getSingleList} from "../../reducers";
import { connect } from "react-redux";
import {SectionHeader} from "../styleComponents/SectionHeader";

class WordsList extends Component {
    constructor(props) {
        super(props);
        const listId = this.props.match.params.id,
              {singleList} = this.props;
        if (!singleList || listId !== singleList.id) {
            this.props.fetchWordsByListRequest({lists: [listId]}); // fetch list of the words by list id
            this.props.fetchSingleListRequest({id: listId}); // fetch list of the words by list id
        }
        
    }

    componentWillReceiveProps(nextProps) {
        const listId = this.props.match.params.id,
              {singleList} = this.props;
        if (nextProps.match.params.id !== listId) {
            if (!singleList || listId !== singleList.id) {
                this.props.fetchWordsByListRequest({lists: [listId]}); // fetch list of the words by list id
                this.props.fetchSingleListRequest({id: listId}); // fetch list of the words by list id
            }
        }
    }

    render() { 
        const {
            wordsByList,
            singleList
        } = this.props;
        return (
            <Fragment>
                {singleList && <SectionHeader title={singleList.name} />}
                {wordsByList.length > 0 ?
                <div className="spe-section words-list">
                    {wordsByList.map((word, i) => (
                        <div key={i} className="wordslist-word-single">
                            {word.word} - {word.prims_trans} {word.prims_trans_pos && <Fragment>({word.prims_trans_pos})</Fragment>}
                            <div className="wordslist-word-single-sectrans-block">
                                {word.sec_trans.map((sec_trans, j) => (
                                    <div class="wordslist-word-single-sectrans-single">
                                        {sec_trans.translation} {sec_trans.pos && <Fragment>({sec_trans.pos})</Fragment>}
                                    </div>
                                ))}
                            </div>
                            <div className="wordslist-word-single-stats">
                                {word.times_forgot && <span>Forgor {word.times_forgot} times</span>}
                            </div>
                            <Link to={'/edit-word/69' }>Edit Word</Link>
                        </div>
                    ))}        
                </div>
                : <p>No Words in this list</p>  }
            </Fragment>
        );
    } 
}

const mapDispatchToProps = dispatch => (
    {
        fetchWordsByListRequest: listData => {
            dispatch(fetchWordsByListRequest(listData));   
        },
        fetchSingleListRequest: listData => {
            dispatch(fetchSingleListRequest(listData));   
        }      
    }
);

const mapStateToProps = state => ({
    wordsByList: getWordsByList(state),
    singleList: getSingleList(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(WordsList);