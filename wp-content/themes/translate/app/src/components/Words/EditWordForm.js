import React, { Component, Fragment } from "react";
import { Field, Form } from "react-final-form";
import { getListsCollection } from "../../reducers";
import { editWordRequest } from "../../actions/words";
import { connect } from "react-redux";
import {
    deleteWordRequest,
    resetWordStatsRequest
} from "../../actions/words";
import { withLastLocation } from 'react-router-last-location';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

class EditWordForm extends Component {
    validate = values => {
        const errors = {},
              list_error = "At least one should be selected",
              custom_error = "Primary translation cannot be blank";

        if (values.lists.length < 1) {
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

    handleSubmit = values => {
        let wordData = {},
            {listsCollection} = this.props,
            {id, word, sec_trans, prims_trans, prims_trans_pos} = this.props.editedWord,
            {custom_prim_trans, primTrans, lists} = values,
            primTransFinal = '',
            primTransPosFinal = '',
            sec_trans_new = [];

        // save primary translation depending if user's one is used or one of the trnslatior options
        if (primTrans === 'cutomTrans') {
            primTransFinal = custom_prim_trans;
            primTransPosFinal = '';
        } else {
            const primTransArr = primTrans.split('||');
            primTransFinal = primTransArr[0];
            primTransPosFinal = primTransArr[1];    
        }

        sec_trans = sec_trans.slice();
        sec_trans.unshift({
            translation: prims_trans,
            pos: prims_trans_pos
        }); // add primary translation from database to the beginning of secondaey translations array from db
        // itrate over db translation options to save secondary translation excluding one that is used as a primary translation
        sec_trans.forEach((translationSingle, i) => {
            const {translation, pos} = translationSingle;
            if (translation !== primTransFinal) {
                sec_trans_new.push({
                    translation,
                    pos    
                });
            }
        })

        // add custom translation to secondary translations if it exists and not used as a primary translation
        if (custom_prim_trans && custom_prim_trans !== primTransFinal) {
            sec_trans_new.push({
                translation: custom_prim_trans,
                pos: ''
            });
        }
        
        wordData = {
            id,
            word,
            prim_trans: primTransFinal,
            prim_trans_pos: primTransPosFinal,
            sec_trans: sec_trans_new,
            lists
        }
        
        this.props.editWordRequest(wordData);
    }

    handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this word?")) {
            const redirectPath = this.props.lastLocation ? this.props.lastLocation.pathname : false;
            this.props.deleteWordRequest({
                id: this.props.editedWord.id,
                redirectPath 
            });  
        }        
    }

    handleResetStats = () => {
        if (window.confirm("Are you sure you want to reset the statistics for this word?")) {
            this.props.resetWordStatsRequest({
                id: this.props.editedWord.id
            });  
        }        
    }

    render() {
        const {  
            lists, 
            prims_trans,
            prims_trans_pos,
            sec_trans
        } = this.props.editedWord;
        const { listsCollection, lastLocation } = this.props;
        return (
            <Fragment>
                <Form
                    validate={this.validate}
                    onSubmit={this.handleSubmit}
                    initialValues={{
                        primTrans: `${prims_trans}||${prims_trans_pos}`,
                        lists: lists
                    }}
                    render={data => (
                        <form onSubmit={data.handleSubmit}>
                            <div className="tr-translations">
                                <div className="tr-translations-title">
                                    <strong>Translations</strong>
                                </div>
                                <div>
                                    <label>
                                        <Field
                                            name="primTrans"
                                            component="input"
                                            type="radio"
                                            value={`${prims_trans}||${prims_trans_pos}`}
                                        />
                                        {prims_trans} {prims_trans_pos && <span>({prims_trans_pos})</span>}
                                    </label>
                                </div>
                                {sec_trans && sec_trans.map((translation, i) => (
                                    <div key={i}>
                                        <label>
                                            <Field
                                                name="primTrans"
                                                component="input"
                                                type="radio"
                                                value={`${translation.translation}||${translation.pos}`}
                                            />
                                            {translation.translation} {translation.pos && <span>({translation.pos})</span>}
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
                                            placeholder="Your Translation"
                                        /><span>
                                            {data.errors && data.errors.custom_prim_trans && <p className="valerror">{data.errors.custom_prim_trans}</p>}
                                        </span>
                                    </label>
                                </div>
                            </div>
                            
                            <div className="tr-lists">
                                <div className="tr-translations-title">
                                    <strong className="tr-translations-title-lists">Lists</strong>
                                    {data.errors.list0 && <p className="valerror">{data.errors.list0}</p>}
                                </div>
                                {listsCollection.map((list, i) => (
                                    <div key={i}>
                                        <label>
                                            <Field
                                                name={'lists'}
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
                                    Edit Word
                                </Button>
                            </div>
                        </form>
                    )}
                />
                <Button
                    onClick={this.handleDelete}
                    bsStyle="danger"
                >
                    Delete Word
                </Button>
                <Button
                    bsStyle="warning"
                    onClick={this.handleResetStats}
                >
                    Reset Word's Statistics
                </Button>
                {lastLocation && <Link className="back-link" to={lastLocation.pathname}><i className="fa fa-arrow-left"></i>
                    {
                        (lastLocation.pathname === '/test-results')
                        ?
                        "Back to Test Results"
                        :
                        (lastLocation.pathname === '/words-stats')
                        ?
                        "Back to Statistics"    
                        :
                        "Back to List"
                    }    
                </Link>}
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editWordRequest: data => {
            dispatch(editWordRequest(data));     
        },
        deleteWordRequest: data => {
            dispatch(deleteWordRequest(data));     
        },
        resetWordStatsRequest: data => {
            dispatch(resetWordStatsRequest(data));     
        }       
    }
}

const mapStateToProps = state => ({
//    editedWord: getEditedWord(state),
    listsCollection: getListsCollection(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(withLastLocation(EditWordForm));
