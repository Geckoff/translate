import React, { Component, Fragment } from "react";
import {SectionHeader} from "../styleComponents/SectionHeader";
import Input from "../Input";
import {Field, Form} from "react-final-form";
import {getTranslatingWord} from "../../reducers";
import {getListsCollection} from "../../reducers";
import { connect } from "react-redux";

class AddWordForm extends Component {

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
        console.log(values, 'add word form');
    }

    render() { 
        const {
            word,
            translations   
        } = this.props.translatingWord;
        const {
            listsCollection
        } = this.props;
       return( 
            <Fragment>
                <SectionHeader title='Translate Form' />
                <Form 
                    validate = {this.validate}
                    onSubmit = {this.handleSubmit}
                    initialValues= {{
                        list_name: 'asdf',
                    }}
                    render={(data) => (
                        <form onSubmit={data.handleSubmit}>
                            <Field label="List Name" name='list_name' component={Input} />
                            {listsCollection.map((list, i) => (  
                                <div>
                                    <Field
                                        name={`list[${i}]`}
                                        component="input"
                                        type="checkbox"
                                        value={list.id}
                                    />{list.name} 
                                </div>
                            ))}
                            <div className="submit-block">
                                <button disabled={data.hasValidationErrors} type='submit'>BUTTON word FORM</button>
                            </div>
                        </form>
                    )}
                />
            </Fragment>
       )
    }
}

const mapStateToProps = state => ({
    translatingWord: getTranslatingWord(state),
    listsCollection: getListsCollection(state),
});

export default connect(mapStateToProps)(AddWordForm);