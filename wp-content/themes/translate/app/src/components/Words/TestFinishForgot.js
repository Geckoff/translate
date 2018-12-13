import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { 
    getTestForgottenWords,
    getColors
} from "../../reducers";
import { connect } from "react-redux";
import {SectionHeader} from "../styleComponents/SectionHeader";
import moment from "moment";

class TestFinishForgot extends Component {
    render() { 
        const {
            testForgottenWords,
            colors
        } = this.props;
        return (
            <Fragment>
                {testForgottenWords && <SectionHeader title="Test Results" />}
                {testForgottenWords.length > 0 ?
                <div className="spe-section words-list-test-results">
                    {testForgottenWords.map((word, i) => (
                        <div key={i} className="wordslist-word-single" style={{background : (!word.times_forgot ? colors.allColors[0] : colors.allColors[parseInt(word.times_forgot)] ? colors.allColors[parseInt(word.times_forgot)] : colors.max)}}>
                            <div className="test-result-top">
                                {/*comma separated list of secondary translations*/}
                                <span className="result-prim-tr">{word.word}</span> - {word.prims_trans} {word.prims_trans_pos && <span className="result-prim-tr-pos">({word.prims_trans_pos})</span>}
                                <Link className="btn btn-warning btn-sm" to={`/edit-word/${word.id}` }>Edit Word</Link> 
                            </div>
                            <div className="test-result-bottom">
                                <div className="wordslist-word-single-sectrans-block">
                                    {word.sec_trans.map((sec_trans, j) => (
                                        <div key={j} className="wordslist-word-single-sectrans-single">
                                            {sec_trans.translation} {sec_trans.pos && <Fragment>({sec_trans.pos})</Fragment>}
                                        </div>
                                    ))}
                                </div>
                                <div className="wordslist-word-single-stats">
                                    {word.times_forgot && <div><span>Times forgot:</span> <span>{word.times_forgot}</span></div>}
                                    {word.last_forgot && <div><span>Last forgot:</span> <span>{moment.unix(word.last_forgot).format("MM/DD/YYYY, HH:mm")}</span></div>}
                                    {word.times_ran && <div><span>Times ran:</span> <span>{word.times_ran}</span></div>}
                                    {word.last_ran && <div><span>Last ran:</span> <span>{moment.unix(word.last_ran).format("MM/DD/YYYY, HH:mm")}</span></div>}
                                </div>                                  
                            </div>   
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
    testForgottenWords: getTestForgottenWords(state),
    colors: getColors(state)
});

export default connect(mapStateToProps)(TestFinishForgot);