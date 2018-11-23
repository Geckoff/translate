import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { getTestForgottenWords } from "../../reducers";
import { connect } from "react-redux";
import {SectionHeader} from "../styleComponents/SectionHeader";

class TestFinishForgot extends Component {
    render() { 
        const {
            testForgottenWords
        } = this.props;
        return (
            <Fragment>
                {testForgottenWords && <SectionHeader title={testForgottenWords.name} />}
                {testForgottenWords.length > 0 ?
                <div className="spe-section words-list-test-results">
                    {testForgottenWords.map((word, i) => (
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
                            <Link to={`/edit-word/${word.id}` }>Edit Word</Link>                          
                        </div>                        
                    ))} 
                    <div>
                        <Link to='/lists'>Continue to Lists</Link>                     
                    </div>
                </div>
                :
                <div className="spe-section words-list-test-results"> 
                    <p>Well Done! You remember all words!</p>  
                    <Link to='/lists'>Continue to Lists</Link>  
                </div>
                }
            </Fragment>
        );
    } 
}

const mapStateToProps = state => ({
    testForgottenWords: getTestForgottenWords(state)
});

export default connect(mapStateToProps)(TestFinishForgot);