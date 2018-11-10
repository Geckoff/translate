import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {fetchMultipleListsRequest} from "../actions/lists";
import { getListsCollection, getIsFetching, getIsFetched, getError } from "../reducers";
//import UserPage from "./UserPage";
//import AuthPage from "./AuthPage";
//import PrivateRoute from "./PrivateRoute";
import { connect } from "react-redux";

class Lists extends Component {
    componentDidMount() {
        fetch(`http://api.tvmaze.com/search/shows?q=test`, {
            method: 'GET',
            mode: 'cors'
          })
            .then(response => response.json())
        this.props.fetchMultipleListsRequest();
    }

    render() { 
        console.log(this.props.listsCollection, 'Lists Component');   
        return (
            <div className="lists">
                lists
            </div>
        );
    } 
}

const mapStateToProps = state => ({
    listsCollection: getListsCollection(state)
});

const mapDispatchToProps = dispatch => {
    return {
        fetchMultipleListsRequest: () => {
            dispatch(fetchMultipleListsRequest())    
        }         
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists);