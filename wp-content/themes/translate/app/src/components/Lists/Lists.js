import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import {fetchMultipleListsRequest} from "../../actions/lists";
import {getListsCollection} from "../../reducers";
import { connect } from "react-redux";
import {SectionHeader} from "../styleComponents/SectionHeader";

class Lists extends Component {

    render() { 
        return (
            <Fragment>
                <SectionHeader title="Lists" />
                <div className="spe-section lists">
                    {this.props.listsCollection.map((list, i) => (
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
                    ))}        
                </div>
                <Link className="button add-button btn btn-success" to="/lists/add">Add List <i className="fa fa-plus"></i></Link>
            </Fragment>
        );
    } 
}

const mapStateToProps = state => ({
    listsCollection: getListsCollection(state)
});

export default connect(mapStateToProps)(Lists);