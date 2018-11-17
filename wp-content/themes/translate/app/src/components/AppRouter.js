import React, { Component } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import AddWord from "./Words/AddWord";
import Lists from "./Lists/Lists";
import AddList from "./Lists/AddList";
import EditList from "./Lists/EditList";
import {
    getIsFetching, 
    getIsFetched, 
    getError, 
    getRedirect, 
    getIsNetworkErrorPresent,
    getMessage,
    getMessageSeen
} from "../reducers";
import {fetchMultipleListsRequest} from "../actions/lists";
import {resetRedirect} from "../actions/redirects";
import {deleteMessage, seeMessage} from "../actions/messages";
import '../index.css';
import { withRouter } from 'react-router';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class AppRouter extends Component {

    componentDidMount() {
        this.props.fetchMultipleListsRequest();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.redirect) {
            this.props.resetRedirect();
        }
        if (this.props.message) {
            NotificationManager[this.props.message.type]('', this.props.message.message);
            this.props.deleteMessage();
        }
    }

    render() {  
        const {error, isFetching, isFetched, isNetworkErrorPresent, redirect, message} = this.props;  
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
                            <Route exact path="/lists/edit/:id" component={EditList} /> 
                            <Route exact path="/lists" component={Lists} />                            
                            <Redirect to="/lists" />
                        </Switch>
                    </div>
                    <NotificationContainer/>
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
    redirect: getRedirect(state),
    message: getMessage(state),
    messageSeen: getMessageSeen(state),
});

const mapDispatchToProps = dispatch => {
    return {
        fetchMultipleListsRequest: () => {
            dispatch(fetchMultipleListsRequest())    
        }, 
        resetRedirect: () => {
            dispatch(resetRedirect())    
        },  
        deleteMessage: () => {
            dispatch(deleteMessage())    
        },     
        seeMessage: () => {
            dispatch(seeMessage())    
        },  
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppRouter));