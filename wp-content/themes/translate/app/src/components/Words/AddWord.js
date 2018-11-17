import React, { Fragment, Component } from "react";
import {translateWordRequest} from "../../actions/words";
import {getTranslatingWord} from "../../reducers";
import { connect } from "react-redux";
import AddWordForm from "./AddWordForm";
import TranslateForm from "./TranslateForm";

class AddWord extends Component {
    
    render() { 
        const {
            translatingWord
        } = this.props;
        return (
            <Fragment>
                <TranslateForm/>
                {translatingWord && <AddWordForm formTitle="Add Word" buttonText="Save Changes" action={null} listTitle={null} id={null} />}
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