import React, { Component, Fragment } from "react";
import {SectionHeader} from "../styleComponents/SectionHeader";
import Input from "../Input"; // input field with custom functinality
import {Field, Form} from "react-final-form";
import {deleteListRequest} from "../../actions/lists";
import { connect } from "react-redux";
import { Button } from 'react-bootstrap';

class ListForm extends Component {

    validate = values => {
        const errors = {},
              list_name_error = "List Name may contain numbers, letters, spaces and dash character";
        if (Object.keys(values).includes('list_name') && values.list_name !== undefined) {
            if (values.list_name.length < 1 || !values.list_name.match(/^[a-z0-9 -]+$/i)) {
                errors.list_name = list_name_error;
            }
        } else {
            errors.list_name = list_name_error;     
        }
        return errors;
    }

    handleSubmit = values => {
        this.props.action(values);
    }

    handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this list?")) {
            this.props.deleteListRequest({id: this.props.id});  
        }        
    }

    render() { 
        const {
            listTitle = "",
            formTitle,
            buttonText,
            id = false
        } = this.props;
       return( 
            <Fragment>
                <SectionHeader title={formTitle} />
                <Form 
                    validate = {this.validate}
                    onSubmit = {this.handleSubmit}
                    initialValues= {{
                        list_name: listTitle,
                        id   
                    }}
                    render={(data) => (
                        <form onSubmit={data.handleSubmit}>
                            <Field label="List Name" name='list_name' component={Input} />
                            <Field name='id' component='input' type="hidden"  />
                            <div className="submit-block">
                                <Button bsStyle="success" disabled={data.hasValidationErrors} type='submit'>{buttonText}</Button>
                            </div>
                        </form>
                    )}
                />
                {id && <Button bsStyle="danger" onClick={this.handleDelete}>Delete List</Button>}
            </Fragment>
       )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteListRequest: data => {
            dispatch(deleteListRequest(data));     
        }     
    }
}

export default connect(null, mapDispatchToProps)(ListForm);
