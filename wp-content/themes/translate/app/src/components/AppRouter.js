import React, { Component } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import {AddWord} from "./AddWord";
import Lists from "./Lists";
import AddList from "./AddList";
import { getIsFetching, getIsFetched, getError, getRedirect, getIsNetworkErrorPresent } from "../reducers";
import {fetchMultipleListsRequest} from "../actions/lists";
import {resetRedirect} from "../actions/redirects";
import '../index.css';
import { withRouter } from 'react-router';

class AppRouter extends Component {
    componentDidMount() {
        this.props.fetchMultipleListsRequest();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.redirect) {
            this.props.resetRedirect();
        }
    }

    render() {  
        const {error, isFetching, isFetched, isNetworkErrorPresent, redirect} = this.props;  
        if (redirect) {
            return (
                <Redirect to={redirect}/>
            );
        } else {
            return (
                <div className="App">
                    <div className="menu">
                        <Link to={'/add-word' }>Add Word</Link>
                        <Link to={'/lists' }>Lists</Link>
                        {isFetching && 'Loading'}
                        {error && 'Error'}
                        {isNetworkErrorPresent && 'Error'}
                    </div>
                    
                    <div className="main-section">
                        <Switch>
                            <Route exact path="/add-word" component={AddWord} /> 
                            <Route exact path="/lists/add" component={AddList} /> 
                            <Route exact path="/lists" component={Lists} />                            
                            <Redirect to="/lists" />
                        </Switch>
                    </div>
                </div>
            );
        }        
    } 
}

const mapStateToProps = state => ({
    isNetworkErrorPresent: getIsNetworkErrorPresent(state),
    isFetching: getIsFetching(state),
    isFetched: getIsFetched(state),
    error: getError(state),
    redirect: getRedirect(state)
});

const mapDispatchToProps = dispatch => {
    return {
        fetchMultipleListsRequest: () => {
            dispatch(fetchMultipleListsRequest())    
        }, 
        resetRedirect: () => {
            dispatch(resetRedirect())    
        },      
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppRouter));