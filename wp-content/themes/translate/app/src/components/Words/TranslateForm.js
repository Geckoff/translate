import React, { Component, Fragment } from "react";
import Input from "../Input";
//import Select from "../Select";
import {Field, Form} from "react-final-form";
import { connect } from "react-redux";
import {translateWordRequest} from "../../actions/words";
import { getTranslatingWord } from "../../reducers";
import { Button } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';

class TranslateForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            langFrom: 'en',
            langTo: 'es',     
        }
    }

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

    handleOnChangeLangFrom = e => {
        this.setState({langFrom: e.target.value});
    }

    handleOnChangeLangTo = e => {
        this.setState({langTo: e.target.value});
    }

    render() { 
        return( 
            <Fragment>
                <Form 
                    validate = {this.validate}
                    onSubmit = {this.handleSubmit}
                    initialValues= {{
                        langFrom: this.state.langFrom,
                        langTo: this.state.langTo, 
                        word: this.props.translatingWord ? this.props.translatingWord.word : '',   
                    }}
                    render={(data) => (
                        <form className="translation-form" onSubmit={data.handleSubmit}>
                            <div className="translation-form-langs">
                                <div className="translation-form-lang-picker">
                                    <label>From</label>
                                    <Field data={data} name="langFrom" onChange={this.handleOnChangeLangFrom} component="select">
                                        <option value="en">English</option>
                                        <option value="es">Spanish</option>
                                        <option value="ru">Russian</option> 
                                        <option value="de">German</option>
                                    </Field>
                                </div>
                                <div className="translation-form-lang-picker">
                                    <label>To</label>
                                    <Field name="langTo" onChange={this.handleOnChangeLangTo} component="select">
                                        <option value="en">English</option>
                                        <option value="es">Spanish</option>
                                        <option value="ru">Russian</option> 
                                        <option value="de">German</option>
                                    </Field>
                                </div>
                                {data.errors.langFrom && <p className="valerror">{data.errors.langFrom}</p>}
                            </div>   
                            <div className="translation-form-bottom">                         
                                <Field label="" name='word' component={Input} />
                                <div className="submit-block">
                                    <Button bsStyle="primary" disabled={data.hasValidationErrors} type='submit'>Translate</Button>
                                </div>
                            </div>
                        </form>
                    )}
                />
            </Fragment>
       )
    }
}

const mapStateToProps = state => ({
    translatingWord: getTranslatingWord(state)
});

const mapDispatchToProps = dispatch => {
    return {
        translateWordRequest: (trnslateData) => {
            dispatch(translateWordRequest(trnslateData));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TranslateForm);