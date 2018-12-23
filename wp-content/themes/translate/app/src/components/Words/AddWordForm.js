import React, { Component, Fragment } from "react";
import { Field, Form } from "react-final-form";
import { getTranslatingWord } from "../../reducers";
import { getListsCollection } from "../../reducers";
import {addWordRequest} from "../../actions/words";
import { connect } from "react-redux";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


class AddWordForm extends Component {
    validate = values => {
        const errors = {},
              list_error = "At least one should be selected",
              custom_error = "Primary translation cannot be blank";

        if (!this.checkLists(values)) {
            errors.list0 = list_error;   
        }
        if (values.primTrans === 'cutomTrans') {
            if (!Object.keys(values).includes('custom_prim_trans')) {
                errors.custom_prim_trans = custom_error;
            } else if (!values.custom_prim_trans) {
                errors.custom_prim_trans = custom_error;
            }
        }

        return errors;
    };

    checkLists = values => {
        const listCount = this.props.listsCollection.length;
        for (let i = 0; i < listCount; i++) {
            if (Object.keys(values).includes(`list${i}`)) {
                if (values[`list${i}`].length > 0) {
                    return true;
                }                
            }
        }
        return false;
    }

    handleSubmit = values => {
        let wordData = {},
            {listsCollection} = this.props,
            {word, translations} = this.props.translatingWord,
            {custom_prim_trans, primTrans} = values,
            primTransFinal = '',
            primTransPosFinal = '',
            sec_trans = [],
            lists = [];

        // save primary translation depending if user's one is used or one of the trnslatior options
        if (primTrans === 'cutomTrans') {
            primTransFinal = custom_prim_trans;
            primTransPosFinal = '';
        } else {
            const primTransArr = primTrans.split('||');
            primTransFinal = primTransArr[0];
            primTransPosFinal = primTransArr[1];    
        }

        // itrate over translator translation options to save secondary translation excluding one that is used as a primary translation
        translations.forEach((translation, i) => {
            const {text, pos} = translation;
            if (text !== primTransFinal) {
                sec_trans.push({
                    translation: text,
                    pos    
                });
            }
        })

        // add custom translation to secondary translations if it exists and not used as a primary translation
        if (custom_prim_trans && custom_prim_trans !== primTransFinal) {
            sec_trans.push({
                translation: custom_prim_trans,
                pos: ''
            });
        }

        // save lists
        const listsCount = listsCollection.length;
        for (let i = 0; i < listsCount; i++) {
            if (Object.keys(values).includes(`list${i}`)) {
                if (values[`list${i}`].length > 0) {
                    lists.push(values[`list${i}`][0]);
                }                
            }
        }
        
        wordData = {
            word,
            prim_trans: primTransFinal,
            prim_trans_pos: primTransPosFinal,
            sec_trans,
            lists
        }
        
        this.props.addWordRequest(wordData);
    };

    render() {
        const { translations } = this.props.translatingWord;
        const { listsCollection } = this.props;
        return (
            <Fragment>
                <Form
                    validate={this.validate}
                    onSubmit={this.handleSubmit}
                    initialValues={{
                        primTrans: (translations.length > 0) ? `${translations[0].text}||${translations[0].pos}` : 'cutomTrans'
                    }}
                    render={data => (
                        <form onSubmit={data.handleSubmit}>
                            <div className="tr-translations">
                                <div className="tr-translations-title">
                                    <strong>Translations</strong>
                                </div>
                                {translations.map((translation, i) => (
                                    <div key={i}>
                                        <label>
                                            <Field
                                                name="primTrans"
                                                component="input"
                                                type="radio"
                                                value={`${translation.text}||${translation.pos}`}
                                            />
                                            {translation.text} {translation.pos && <span className="tr-translations-pos">({translation.pos})</span>}
                                        </label>
                                    </div>
                                ))}
                                <div className="custom-prim-trans">
                                    <label>
                                        <Field
                                            name="primTrans"
                                            component="input"
                                            type="radio"
                                            value="cutomTrans"
                                        />
                                        <Field
                                            label=""
                                            name="custom_prim_trans"
                                            component='input'
                                            placeholder="Your Tranlation"
                                        /><span>
                                            {data.errors.custom_prim_trans && <p className="valerror">{data.errors.custom_prim_trans}</p>}
                                        </span>
                                    </label>
                                </div>
                            </div>
                            
                            <div className="tr-lists">
                                <div  className="tr-translations-title">
                                    <strong className="tr-translations-title-lists">Lists</strong>
                                    {data.errors.list0 && <p className="valerror">{data.errors.list0}</p>}
                                </div>
                                {listsCollection.map((list, i) => (
                                    <div key={i}>
                                        <label>
                                            <Field
                                                name={`list${i}`}
                                                component="input"
                                                type="checkbox"
                                                value={list.id}
                                                key={i}
                                            />
                                            {list.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="submit-block">
                                <Button
                                    bsStyle="success"
                                    disabled={data.hasValidationErrors}
                                    type="submit"
                                >
                                    Add Word <i className="fa fa-plus"></i>
                                </Button>
                            </div>
                        </form>
                    )}
                />
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addWordRequest: data => {
            dispatch(addWordRequest(data));     
        }        
    }
}

const mapStateToProps = state => ({
    translatingWord: getTranslatingWord(state),
    listsCollection: getListsCollection(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(AddWordForm);
