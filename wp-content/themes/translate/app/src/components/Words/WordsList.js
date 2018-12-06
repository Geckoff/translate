import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import {
    fetchWordsByListRequest,
    startTest,
    cancelTest,
    finishTest,
    shuffleListWordsRequest
} from "../../actions/words";
import {fetchSingleListRequest} from "../../actions/lists";
import {
    getWordsByList, 
    getSingleList,
    getTestInProgress
} from "../../reducers";
import { connect } from "react-redux";
import {SectionHeader} from "../styleComponents/SectionHeader";
//https://www.npmjs.com/package/react-draggable

class WordsList extends Component {
    constructor(props) {
        super(props);
        const listId = this.props.match.params.id,
              {singleList} = this.props;
        if (!singleList || listId !== singleList.id) {
            this.props.fetchWordsByListRequest({lists: [listId]}); // fetch list of the words by list id
            this.props.fetchSingleListRequest({id: listId}); // fetch list of the words by list id
        }
        this.state = {
            forgotWords: [],
            allWords: []
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

    handleStartTest = () => {
        this.props.startTest(this.props.match.url);    
    }

    handleCheckNoRemeber = e => {
        const {checked, name} = e.target,
              {forgotWords} = this.state;

        if (checked) {
            forgotWords.push(name);    
        }
        else {
            const index = forgotWords.indexOf(name);
            forgotWords.splice(index, 1);     
        }
        this.setState({forgotWords});
    }

    handleFinishTest = () => {
        const allWords = this.props.wordsByList.map((word) => {
            return word.id;

        });
        const {forgotWords} = this.state;
        this.props.finishTest({
            forgotWords,
            allWords
        });    
    }

    render() { 
        const {
            wordsByList,
            singleList,
            testInProgress,
            cancelTest,
            shuffleListWordsRequest
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
                                    <div key={j} className="wordslist-word-single-sectrans-single">
                                        {sec_trans.translation} {sec_trans.pos && <Fragment>({sec_trans.pos})</Fragment>}
                                    </div>
                                ))}
                            </div>
                            <div className="wordslist-word-single-stats">
                                <div>{word.times_forgot && <span>Forgot {word.times_forgot} times</span>}</div>
                                <div>{word.last_forgot && <span>Last forgot - {word.last_forgot}</span>}</div>
                                <div>{word.times_ran && <span>Ran {word.times_ran} times</span>}</div>
                                <div>{word.last_ran && <span>Last ran - {word.last_ran}</span>}</div>
                            </div>
                            {testInProgress ? 
                                    <label>
                                        <input onChange={this.handleCheckNoRemeber} name={word.id} type="checkbox" />
                                        Don't remember
                                    </label>     
                                :
                                    <Link to={`/edit-word/${word.id}` }>Edit Word</Link>
                            }
                            
                        </div>
                    ))} 
                    <div className="words-list-buttons">
                        {testInProgress ?
                            <Fragment>
                                <button onClick={cancelTest}>Cancel Test</button>
                                <button onClick={this.handleFinishTest}>Finish Test</button>
                            </Fragment>    
                        :
                            <Fragment>
                                <button onClick={this.handleStartTest}>Start Test</button>
                            </Fragment>  
                        }
                        <Fragment>
                            <button onClick={shuffleListWordsRequest}>Shuffle Words</button>
                        </Fragment>  
                    </div>
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
        },
        startTest: testPath => {
            dispatch(startTest(testPath));   
        },
        cancelTest: () => {
            dispatch(cancelTest());   
        },
        finishTest: (finishData) => {
            dispatch(finishTest(finishData));   
        },           
        shuffleListWordsRequest: () => {
            dispatch(shuffleListWordsRequest());   
        },
    }
);

const mapStateToProps = state => ({
    wordsByList: getWordsByList(state),
    singleList: getSingleList(state),
    testInProgress: getTestInProgress(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(WordsList);