import React, { Component } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import { getIsNetworkErrorPresent } from "../reducers";
import { connect } from "react-redux";
import {AddWord} from "./AddWord";
import Lists from "./Lists";
import '../index.css';
import { withRouter } from 'react-router';

class AppRouter extends Component {
    render() {    
        return (
            <div className="App">
                <Link to={'/add-word' }>Add Word</Link>
                <Link to={'/lists' }>Lists</Link>
                <Switch>
                    <Route exact path="/add-word" component={AddWord} /> 
                    <Route exact path="/lists" component={Lists} /> 
                    <Redirect to="/lists" />
                </Switch>
            </div>
        );
    } 
}

const mapStateToProps = state => ({
    isNetworkErrorPresent: getIsNetworkErrorPresent(state)
});

export default withRouter(connect(mapStateToProps)(AppRouter));