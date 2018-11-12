import React, { Component, Fragment } from "react";
import {addListRequest} from "../actions/lists";
import { connect } from "react-redux";
import ListForm from "./ListForm";

class EditList extends Component {

    handleSubmit = data => {
        const requestData = {
            'listName': data.list_name
        }
        this.props.addListRequest(requestData);    
    }

    render() { 
        return (
            <Fragment>
                <ListForm formTitle="Edit List" buttonText="Save Changes" action={this.handleSubmit} />
            </Fragment>
        );
    } 
}

const mapDispatchToProps = dispatch => {
    return {
        addListRequest: data => {
            dispatch(addListRequest(data));     
        }        
    }
}

export default connect(null, mapDispatchToProps)(EditList);