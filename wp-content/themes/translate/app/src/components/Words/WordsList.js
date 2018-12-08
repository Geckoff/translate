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
import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
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
                            <div className="wordslist-word-single-top">
                                <div className="wordslist-word-single-prword">
                                    <span>{word.word}</span>
                                    <span className="wordslist-word-single-prword-forgot">Forgot {word.times_forgot ? word.times_forgot : 0 } times</span>
                                </div>
                                <div className="wordslist-word-single-prtranslate">
                                    <span>{word.prims_trans}</span>
                                    {word.prims_trans_pos && <span className="wordslist-word-single-prtranslate-pos">({word.prims_trans_pos})</span>}
                                </div>
                                <div className="wordslist-word-single-open">
                                    Open
                                </div>
                            </div>
                            <div className="wordslist-word-single-bottom">
                                <div className="wordslist-word-single-sectrans-block wordslist-word-single-bottom-left">
                                    {word.sec_trans.map((sec_trans, j) => (
                                        <div key={j} className="wordslist-word-single-sectrans-single">
                                            {sec_trans.translation} {sec_trans.pos && <Fragment>({sec_trans.pos})</Fragment>}
                                        </div>
                                    ))}
                                </div>
                                <div className="wordslist-word-single-bottom-right">
                                    <div className="wordslist-word-single-stats">                                
                                        <div><span>Last forgot -  {word.last_forgot ? word.last_forgot : 0 } times</span></div>
                                        <div><span>Ran {word.times_ran ? word.times_ran : 0 } times</span></div>
                                        <div><span>Last ran -  {word.last_ran ? word.last_ran : 0 } times</span></div>
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
                            </div>
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