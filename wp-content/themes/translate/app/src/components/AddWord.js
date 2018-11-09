import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
//import { getIsNetworkErrorPresent } from "../reducers";
import { connect } from "react-redux";
//import UserPage from "./UserPage";
//import AuthPage from "./AuthPage";
//import PrivateRoute from "./PrivateRoute";
import { withRouter } from 'react-router';

class AddWord extends Component {
    render() {    
        return (
            <div className="addword">
                addword
            </div>
        );
    } 
}

// const mapStateToProps = state => ({
//     isNetworkErrorPresent: getIsNetworkErrorPresent(state)
// });

//export default withRouter(connect(mapStateToProps)(AppRouter));
export {AddWord};