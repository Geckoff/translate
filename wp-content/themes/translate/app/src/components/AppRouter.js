import React, { Component } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import AddWord from "./Words/AddWord";
import EditWord from "./Words/EditWord";
import WordsList from "./Words/WordsList";
import WordsStats from "./Words/WordsStats";
import TestFinishForgot from "./Words/TestFinishForgot";
import Lists from "./Lists/Lists";
import AddList from "./Lists/AddList";
import EditList from "./Lists/EditList";
import Loading from "./styleComponents/Loading";
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
import {generateColorsRequest} from "../actions/colors";
import {resetRedirect} from "../actions/redirects";
import {deleteMessage, seeMessage} from "../actions/messages";
import '../index.css';
import { withRouter } from 'react-router';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'font-awesome/css/font-awesome.min.css';

class AppRouter extends Component {
    constructor(props) {
        super(props);
        props.generateColorsRequest();
    }

    componentDidMount() {
        this.props.fetchMultipleListsRequest();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.redirect) {
            this.props.resetRedirect();
        }
        if (this.props.message) {
            NotificationManager[this.props.message.type]('', this.props.message.message, 2500);
            this.props.deleteMessage();
        }
    }

    preventScroll = e => {
        e.preventDefault();
    }

    render() {  
        const {error, isFetching, isNetworkErrorPresent, redirect} = this.props;  
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
                        <Link to={'/words-stats' }>Statistics</Link>                        
                        {isFetching && 
                            <Loading domNode={document.querySelector('#loading-block')}>
                                <div onTouchMove={this.preventScroll} className="loading-progress">
                                    <i className="fa fa-spinner fa-spin"></i>
                                </div>
                            </Loading>
                        }
                        {error && 'Error'}
                        {isNetworkErrorPresent && 'Error'}
                    </div>
                    <div className="main-section">
                        <Switch>
                            <Route exact path="/add-word" component={AddWord} /> 
                            <Route exact path="/edit-word/:id" component={EditWord} /> 
                            <Route exact path="/words-list/:id" component={WordsList} /> 
                            <Route exact path="/lists/add" component={AddList} /> 
                            <Route exact path="/lists/edit/:id" component={EditList} /> 
                            <Route exact path="/lists" component={Lists} />                            
                            <Route exact path="/test-results" component={TestFinishForgot} />                            
                            <Route exact path="/words-stats" component={WordsStats} />                            
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
        generateColorsRequest: () => {
            dispatch(generateColorsRequest())    
        }, 
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppRouter));