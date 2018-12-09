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
import Draggable from 'react-draggable';
import 'font-awesome/css/font-awesome.min.css';

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
            allWords: [],
            closeOpen: {},
            initialClose: true
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
        // setting up closeOpen when fetching the list
        if (Object.keys(this.state.closeOpen).length < 1) {
            const closeOpen = this.checkCloseOpen(nextProps);
            this.setState({
                closeOpen,
                initialClose: false // all words initially slid up
            });
        }               
    }

    componentDidMount() {
        if (this.props.wordsByList.length > 0) {            
            // setting up closeOpen when the list is already in state
            const closeOpen = this.checkCloseOpen(this.props);
            this.setState({
                closeOpen,
                initialClose: false
            });
        }
    }

    // setting up closeOpen in state to control slide up and down word's info
    checkCloseOpen = props => {   
        const closeOpen = {}    
        if (Object.keys(this.state.closeOpen).length < 1) {
            props.wordsByList.forEach(word => {
                closeOpen[word.id] = true    
            });  
        }
        return closeOpen;
    }

    // start test
    handleStartTest = () => {
        this.props.startTest(this.props.match.url);   
        const newCloseOpenState = {}
        for (var singleWord in this.state.closeOpen) {
            newCloseOpenState[singleWord] = true;
        }  
        this.setState({closeOpen: newCloseOpenState});
    }

    // add the word to the list of forgotten words
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

    // finish the test
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

    handleSlide = e => {
        this.setState({closeOpen: {...this.state.closeOpen, [e.currentTarget.dataset.id]: !this.state.closeOpen[e.currentTarget.dataset.id]}})
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
                                    <div>
                                    {testInProgress &&
                                        <label>
                                            <input onChange={this.handleCheckNoRemeber} name={word.id} type="checkbox" />
                                            <span className="wordslist-word-single-prword-dont">Don't remember</span>
                                        </label>                                                     
                                    }
                                    <span className="wordslist-word-single-prword-forgot">Forgot {word.times_forgot ? word.times_forgot : 0 } times</span>
                                    </div>
                                </div>
                                <div className="wordslist-word-single-prtranslate">
                                    <Draggable 
                                        bounds="parent" 
                                    >
                                        <div className={testInProgress ? 'test-curtain' : 'test-curtain no-test-started'}>
                                            <i className="fa fa-chevron-left"></i>
                                            <i className="fa fa-chevron-right"></i>
                                        </div>
                                    </Draggable>
                                    <div className="wordslist-word-single-prtranslate-inner">
                                        <span>{word.prims_trans}</span>
                                        {word.prims_trans_pos && <span className="wordslist-word-single-prtranslate-pos">({word.prims_trans_pos})</span>}
                                    </div>                                    
                                </div>
                                {!testInProgress && <div className="wordslist-word-single-open" data-id={word.id} onClick={this.handleSlide}>    
                                    <i className={(this.state.initialClose || this.state.closeOpen[word.id]) ? "fa fa-chevron-down" : "fa fa-chevron-up word-desc-opened"}></i>
                                </div>}
                            </div>
                            <SlideDown className={'my-dropdown-slidedown'} closed={!this.state.initialClose ? this.state.closeOpen[word.id] : true}>
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
                                        <Link to={`/edit-word/${word.id}` }>Edit Word</Link>                                        
                                    </div>
                                </div>
                            </SlideDown>
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