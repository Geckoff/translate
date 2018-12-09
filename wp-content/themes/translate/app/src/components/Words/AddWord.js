import React, { Fragment, Component } from "react";
import {translateWordRequest} from "../../actions/words";
import {getTranslatingWord} from "../../reducers";
import { connect } from "react-redux";
import AddWordForm from "./AddWordForm";
import TranslateForm from "./TranslateForm";
import {SectionHeader} from "../styleComponents/SectionHeader";

class AddWord extends Component {
    
    render() { 
        const {
            translatingWord
        } = this.props;
        return (
            <Fragment>
                <SectionHeader title='Word Translation' />
                <div className="add-word-page">
                    <div className="translate-form-wrapper">
                        <TranslateForm/>
                    </div>
                    <div className="add-form-wrapper">
                        {translatingWord && <AddWordForm formTitle="Add Word" buttonText="Save Changes" action={null} listTitle={null} id={null} />}
                    </div>
                </div>
                
                
            </Fragment>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(AddWord);