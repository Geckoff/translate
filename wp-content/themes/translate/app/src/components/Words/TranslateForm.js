import React, { Component, Fragment } from "react";
import {SectionHeader} from "../styleComponents/SectionHeader";
import Input from "../Input";
import Select from "../Select";
import {Field, Form} from "react-final-form";
//import {deleteListRequest} from "../../actions/lists";
import { connect } from "react-redux";
import {translateWordRequest} from "../../actions/words";

class TranslateForm extends Component {

    validate = values => {
        const errors = {},
              languages_error = "Languages must be different",
              word_error = "Please enter the word";
        
        if (values.langFrom === values.langTo) {
            errors.langFrom = languages_error;      
        }
        if (Object.keys(values).includes('word') && values.word !== undefined) {
            if (values.word.length < 1) {
                errors.word = word_error;
            }
        } else {
            errors.word = word_error;     
        }
        return errors;
    }

    handleSubmit = values => {
        this.props.translateWordRequest(values);
    }

    render() { 
       return( 
            <Fragment>
                <SectionHeader title='Translate Form' />
                <Form 
                    validate = {this.validate}
                    onSubmit = {this.handleSubmit}
                    initialValues= {{
                        langFrom: 'en',
                        langTo: 'ru', 
                        word: '',   
                    }}
                    render={(data) => (
                        <form onSubmit={data.handleSubmit}>
                            <div>
                                <label>From</label>
                                <Field data={data} name="langFrom" component={Select}>
                                    <option value="en">English</option>
                                    <option value="ru">Russian</option>
                                    <option value="es">Spanish</option>
                                </Field>
                            </div>
                            <div>
                                <label>To</label>
                                <Field name="langTo" component={Select} initVal='ru'>
                                    <option value="en">English</option>
                                    <option value="ru">Russian</option>
                                    <option value="es">Spanish</option>
                                </Field>
                            </div>
                            {data.errors.langFrom && <p className="valerror">{data.errors.langFrom}</p>}
                            <Field label="" name='word' component={Input} />
                            <div className="submit-block">
                                <button disabled={data.hasValidationErrors} type='submit'>Translate</button>
                            </div>
                        </form>
                    )}
                />
            </Fragment>
       )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        translateWordRequest: (trnslateData) => {
            dispatch(translateWordRequest(trnslateData));
        }
    }
};

export default connect(null, mapDispatchToProps)(TranslateForm);