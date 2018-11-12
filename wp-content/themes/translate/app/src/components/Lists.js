import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import {fetchMultipleListsRequest} from "../actions/lists";
import {getListsCollection} from "../reducers";
import { connect } from "react-redux";
import {SectionHeader} from "./styleComponents/SectionHeader";

class Lists extends Component {

    render() { 
        console.log(this.props.listsCollection);
        return (
            <Fragment>
                <SectionHeader title="Lists" />
                <div className="spe-section lists">
                    {this.props.listsCollection.map((list, i) => (
                        <div key={i} className="lists-list-single">
                            <p className="single-list-title">{list.name}</p>
                            <Link to={`/lists/edit/${list.id}`}>Edit List</Link>
                            <Link to={`/lists/start/${list.id}`}>See Words</Link>
                        </div>
                    ))}        
                </div>
                <Link className="button add-button" to="/lists/add">Add List</Link>
            </Fragment>
        );
    } 
}

const mapStateToProps = state => ({
    listsCollection: getListsCollection(state)
});

export default connect(mapStateToProps)(Lists);