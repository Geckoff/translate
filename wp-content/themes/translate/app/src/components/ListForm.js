import React, { Component, Fragment } from "react";
import {SectionHeader} from "./styleComponents/SectionHeader";
import Input from "./Input";
import {Field, Form} from "react-final-form";

class ListForm extends Component {

    validate = values => {
        const errors = {},
              list_name_error = "List Name must contain number or letters";
        if (Object.keys(values).includes('list_name')) {
            if (values.list_name.length < 1 || !values.list_name.match(/^[a-z0-9]+$/i)) {
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
                        list_name: listTitle   
                    }}
                    render={(data) => (
                        <form onSubmit={data.handleSubmit}>
                            <Field label="List Name" name='list_name' component={Input} />
                            <div className="submit-block">
                                <button disabled={data.hasValidationErrors} type='submit'>{buttonText}</button>
                            </div>
                        </form>
                    )}
                />
            </Fragment>
       )
    }
}

export default ListForm;
