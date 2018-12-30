import React, { Component, Fragment } from "react";
import Input from "../Input";
import Select from "../Select";
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
        console.log(e.target.value);
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
                                    <Field data={data} name="langFrom" onChange={this.handleOnChangeLangFrom} component={Select}>
                                        <option value="en">English</option>
                                        <option value="es">Spanish</option>
                                        <option value="ru">Russian</option> 
                                        <option value="it">Italian</option> 
                                        <option value="de">German</option>  
                                        <option value="fr">French</option>
                                        <option value="hy">Armenian</option>
                                        <option value="eu">Basque</option>
                                        <option value="be">Belarusian</option>
                                        <option value="bg">Bulgarian</option>
                                        <option value="hu">Hungarian</option>
                                        <option value="vi">Vietnamese</option>
                                        <option value="nl">Dutch</option>
                                        <option value="da">Danish</option>
                                        <option value="el">Greek</option>
                                        <option value="fi">Finnish</option>
                                        <option value="id">Indonesian</option>
                                        <option value="ga">Irish</option>
                                        <option value="is">Icelandic</option>
                                        <option value="kk">Kazakh</option>
                                        <option value="ca">Catalan</option>
                                        <option value="zh">Chinese</option>
                                        <option value="ko">Korean</option>
                                        <option value="lv">Latvian</option>
                                        <option value="lt">Lithuanian</option>
                                        <option value="lb">Luxembourgish</option>
                                        <option value="mn">Mongolian</option>
                                        <option value="no">Norwegian</option>
                                        <option value="pl">Polish</option>
                                        <option value="pt">Portuguese</option>
                                        <option value="ro">Romanian</option>
                                        <option value="sk">Slovakian</option>
                                        <option value="sl">Slovenian</option>
                                        <option value="th">Thai</option>
                                        <option value="uz">Uzbek</option>
                                        <option value="uk">Ukrainian</option>
                                        <option value="hi">Hindi</option>
                                        <option value="hr">Croatian</option>
                                        <option value="cs">Czech</option>
                                        <option value="sv">Swedish</option>
                                        <option value="gd">Scottish</option>
                                        <option value="et">Estonian</option>
                                        <option value="ja">Japanese</option>                                        
                                    </Field>
                                </div>
                                <div className="translation-form-lang-picker">
                                    <label>To</label>
                                    <Field name="langTo" component={Select} initVal='ru'>
                                        <option value="en">English</option>
                                        <option value="es">Spanish</option>
                                        <option value="ru">Russian</option> 
                                        <option value="it">Italian</option> 
                                        <option value="de">German</option>  
                                        <option value="fr">French</option>
                                        <option value="hy">Armenian</option>
                                        <option value="eu">Basque</option>
                                        <option value="be">Belarusian</option>
                                        <option value="bg">Bulgarian</option>
                                        <option value="hu">Hungarian</option>
                                        <option value="vi">Vietnamese</option>
                                        <option value="nl">Dutch</option>
                                        <option value="da">Danish</option>
                                        <option value="el">Greek</option>
                                        <option value="fi">Finnish</option>
                                        <option value="id">Indonesian</option>
                                        <option value="ga">Irish</option>
                                        <option value="is">Icelandic</option>
                                        <option value="kk">Kazakh</option>
                                        <option value="ca">Catalan</option>
                                        <option value="zh">Chinese</option>
                                        <option value="ko">Korean</option>
                                        <option value="lv">Latvian</option>
                                        <option value="lt">Lithuanian</option>
                                        <option value="lb">Luxembourgish</option>
                                        <option value="mn">Mongolian</option>
                                        <option value="no">Norwegian</option>
                                        <option value="pl">Polish</option>
                                        <option value="pt">Portuguese</option>
                                        <option value="ro">Romanian</option>
                                        <option value="sk">Slovakian</option>
                                        <option value="sl">Slovenian</option>
                                        <option value="th">Thai</option>
                                        <option value="uz">Uzbek</option>
                                        <option value="uk">Ukrainian</option>
                                        <option value="hi">Hindi</option>
                                        <option value="hr">Croatian</option>
                                        <option value="cs">Czech</option>
                                        <option value="sv">Swedish</option>
                                        <option value="gd">Scottish</option>
                                        <option value="et">Estonian</option>
                                        <option value="ja">Japanese</option>
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