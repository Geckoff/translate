import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Link, Route, Redirect, Switch } from "react-router-dom";

import {apiRequest} from "./api/api";

class App extends Component {
	constructor(props) {
		super(props);
		var test = window.hasOwnProperty("testval") ? window.testval : 'fromReact';
		console.log(test);
		apiRequest("getWordsByMostForgotten", {words_count: 2});
	}

    render() {
        return (
            <div className="App">
				<Link to="/application">Home</Link>
				<br />
				<Link to="/pageone">PageOne</Link>
				<br />
				<Link to="/pagetwo">PageTwo</Link>
				<Switch> 
					<Route exact path="/application" component={HomePage} />
					<Route exact path="/pageone" component={PageOne} />
					<Route exact path="/pagetwo" component={PageTwo} />
				</Switch> 
            </div>
        );
    }
}

const HomePage = ({ author, text }) => (
    <div>Home!!!</div>
);

const PageOne = ({ author, text }) => (
    <div>PageOne!!!</div>
);

const PageTwo = ({ author, text }) => (
    <div>PageTwo!!!</div>
);

export default App;
