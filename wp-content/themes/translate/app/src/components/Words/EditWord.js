import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { getWordRequest } from '../../actions/words';
import { getEditedWord } from "../../reducers";
import EditWordForm from "./EditWordForm";
import { SectionHeader } from "../styleComponents/SectionHeader";

class EditWord extends Component {
    constructor(props) {
        super(props);
        this.props.getWordRequest({id: this.props.match.params.id}); // fetch the word that need to ne updated
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
            this.props.getWordRequest({id: nextProps.match.params.id});
        }
    }
    
    render() { 
        return (
            <Fragment>
                <SectionHeader title="Edit Word" />
                <div className="add-form-wrapper edit-form-wrapper">
                    {this.props.editedWord && <h3 className="edited-word">{this.props.editedWord.word}</h3>}
                    {this.props.editedWord && <EditWordForm editedWord={this.props.editedWord} />} 
                </div>
            </Fragment>
        );
    } 
}

const mapStateToProps = state => ({
    editedWord: getEditedWord(state)
});

const mapDispatchToProps = dispatch => {
    return {
        getWordRequest: (wordData) => {
            dispatch(getWordRequest(wordData));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditWord);