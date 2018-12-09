import ReactDOM from 'react-dom';
import React, { Component } from "react";

class Loading extends Component {
    render() {
        return ReactDOM.createPortal(this.props.children, this.props.domNode);
    }
}

export default Loading;