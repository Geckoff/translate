import React, { Component } from "react";
import {editListRequest, fetchSingleListRequest} from "../../actions/lists";
import {getSingleList} from "../../reducers";
import { connect } from "react-redux";
import ListForm from "./ListForm";

class EditList extends Component {

    constructor(props) {
        super(props);
        this.props.fetchSingleListRequest(this.props.match.params.id); // fetch the list that need to ne updated
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
            <div className="spe-section list-form">
                <ListForm formTitle="Edit List" buttonText="Save Changes" action={this.handleSubmit} listTitle={name} id={id} />
            </div>
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