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
    getTestInProgress,
    getColors
} from "../../reducers";
import { connect } from "react-redux";
import {SectionHeader} from "../styleComponents/SectionHeader";
import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import Draggable from 'react-draggable';
import 'font-awesome/css/font-awesome.min.css';
import moment from "moment";
import { Button } from 'react-bootstrap';


class WordsList extends Component {
    constructor(props) { 
        super(props);
        const listId = this.props.match.params.id,
              {singleList} = this.props;

        if (!singleList || listId !== singleList.id) {
            this.props.fetchWordsByListRequest(listId); // fetch list of the words by list id
            this.props.fetchSingleListRequest(listId);
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
                this.props.fetchWordsByListRequest(listId); // fetch list of the words by list id
                this.props.fetchSingleListRequest(listId); // fetch list of the words by list id
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
            shuffleListWordsRequest,
            colors
        } = this.props;
        return (
            <Fragment>
                {singleList && <SectionHeader title={singleList.name} />}

                {wordsByList.length > 0 ?
                <div className="spe-section words-list">
                    <div className="words-list-buttons">
                        {testInProgress ?
                            <Fragment>
                                <Button bsStyle="danger" onClick={cancelTest}>Cancel Test</Button>  
                                <Button bsStyle="success" onClick={this.handleFinishTest}>Finish Test</Button>                      
                            </Fragment>    
                        :
                            <Fragment>
                                <Button bsStyle="success" onClick={this.handleStartTest}>Start Test</Button>
                            </Fragment>  
                        }
                        <Fragment>
                            {!testInProgress && <Button bsStyle="primary" onClick={shuffleListWordsRequest}>Shuffle Words</Button>}
                        </Fragment>  
                    </div>
                    <div className="words-list-table">
                        {wordsByList.map((word, i) => (
                            <div key={i} className="wordslist-word-single">
                                <div className="wordslist-word-single-top" style={{background : (!word.times_forgot ? colors.allColors[0] : colors.allColors[parseInt(word.times_forgot)] ? colors.allColors[parseInt(word.times_forgot)] : colors.max)}}>
                                    <div className="wordslist-word-single-prword">
                                        <span>{word.word}</span>
                                        <div className="wordslist-word-single-prword-inner">
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
                                                    {sec_trans.translation} {sec_trans.pos && <Fragment><span className="wordslist-word-single-sectrans-single-pos">({sec_trans.pos})</span></Fragment>}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="wordslist-word-single-bottom-right">
                                            <div className="wordslist-word-single-stats">                                
                                                {(word.last_forgot && word.last_forgot !== '0') && <div><span  className="wordslist-word-single-stats-name">Last forgot:</span> <span className="wordslist-word-single-stats-value">{moment.unix(word.last_forgot).format("MM/DD/YYYY, HH:mm")}</span></div>}
                                                
                                                {(word.times_ran && word.times_ran !== '0') && <div><span  className="wordslist-word-single-stats-name">Times ran:</span> <span className="wordslist-word-single-stats-value">{word.times_ran}</span></div>}

                                                {(word.last_ran && word.last_ran !== '0') && <div><span  className="wordslist-word-single-stats-name">Last ran:</span> <span className="wordslist-word-single-stats-value">{moment.unix(word.last_ran).format("MM/DD/YYYY, HH:mm")}</span></div>}
                                            </div>
                                            <Link className="btn btn-warning btn-sm" to={`/edit-word/${word.id}` }>Edit Word</Link>                                        
                                        </div>
                                    </div>
                                </SlideDown>
                            </div>
                        ))} 
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
        }
    }
);

const mapStateToProps = state => ({
    wordsByList: getWordsByList(state),
    singleList: getSingleList(state),
    testInProgress: getTestInProgress(state),
    colors: getColors(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(WordsList);