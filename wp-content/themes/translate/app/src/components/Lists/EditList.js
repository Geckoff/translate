import React, { Component, Fragment } from "react";
import {editListRequest, fetchSingleListRequest} from "../../actions/lists";
import {getSingleList} from "../../reducers";
import { connect } from "react-redux";
import ListForm from "./ListForm";

class EditList extends Component {

    constructor(props) {
        super(props);
        this.props.fetchSingleListRequest({id: this.props.match.params.id});
    }

    handleSubmit = data => {
        const requestData = {
            'name': data.list_name,
            id: data.id
        }
        this.props.editListRequest(requestData);    
    }

    render() { 
        let name = '',
            id = false;
        if (this.props.singleList !== null) {
            name = this.props.singleList.name;
            id = this.props.singleList.id;
        }
        return (
            <Fragment>
                <ListForm formTitle="Edit List" buttonText="Save Changes" action={this.handleSubmit} listTitle={name} id={id} />
            </Fragment>
        );
    } 
}

const mapStateToProps = state => ({
    singleList: getSingleList(state)
})

const mapDispatchToProps = dispatch => {
    return {
        editListRequest: data => {
            dispatch(editListRequest(data));     
        },
        fetchSingleListRequest: data => {
            dispatch(fetchSingleListRequest(data));     
        }      
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditList);