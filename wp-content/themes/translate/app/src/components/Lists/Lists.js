import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import {setRandWordsQuant} from "../../actions/words";
import {getListsCollection} from "../../reducers";
import { connect } from "react-redux";
import {SectionHeader} from "../styleComponents/SectionHeader";
import {addRedirect}  from "../../actions/redirects";

class Lists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            randQuant: false
        }
    }

    handleRandInput = e => {
        const quant = e.target.value,
              reg = /^\d+$/;
        const randQuant = (reg.test(quant) && parseInt(quant) > 0) ? parseInt(quant) : false; 
        this.setState({
            randQuant  
        })
    }

    handleClickRand = () => {
        this.props.setRandWordsQuant(this.state.randQuant);
        this.props.addRedirect('/words-list/rand');
    }

    render() { 
        return (
            <Fragment>
                <SectionHeader title="Lists" />
                <div className="spe-section lists">
                    {this.props.listsCollection.length > 0 ? this.props.listsCollection.map((list, i) => (
                        <div key={i} className="lists-list-single">
                            <div className="lists-list-name">
                                <p className="single-list-title">{list.name}</p>
                            </div>
                            <div className="lists-word-count">
                                <p className="single-list-title">{list.words_count} word{parseInt(list.words_count) !== 1 && 's'}</p>
                            </div>
                            <div className="lists-buttons">
                                <Link className="btn btn-warning" to={`/lists/edit/${list.id}`}>Edit List</Link>
                                <Link className="btn btn-primary" to={`/words-list/${list.id}`}>See Words</Link>
                            </div>
                        </div>
                    )) :
                        <p>Please, <Link to="/lists/add">add your first list</Link> to start using the app.</p>
                    }        
                </div>
                <div className="lists-list-bottom">
                    <div className="random-words-block">
                        <input placeholder="# of Words" onChange={this.handleRandInput} type="text" name="rand-word-quant" />
                        <button onClick={this.handleClickRand}  disabled={this.state.randQuant ? false : true}  className="button btn btn-primary">See Random Words</button>
                    </div>
                    <Link className="button add-button btn btn-success" to="/lists/add">Add List <i className="fa fa-plus"></i></Link>
                </div>
            </Fragment>
        );
    } 
}

const mapStateToProps = state => ({
    listsCollection: getListsCollection(state)
});

const mapDispatchToProps = dispatch => {
    return {
        setRandWordsQuant: wordsQuant => {
            dispatch(setRandWordsQuant(wordsQuant)) 
        },
        addRedirect: (url) => {
            dispatch(addRedirect(url));   
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists);