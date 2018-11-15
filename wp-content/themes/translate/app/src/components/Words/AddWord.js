import React, { Fragment, Component } from "react";
import {translateWordRequest} from "../../actions/words";
import {getTranslatingWord} from "../../reducers";
import { connect } from "react-redux";
//import UserPage from "./UserPage";
//import AuthPage from "./AuthPage";
//import PrivateRoute from "./PrivateRoute";
import { withRouter } from 'react-router';
import WordForm from "./WordForm";

class AddWord extends Component {

    constructor(props) {
        super(props);
        props.translateWordRequest({
            lang: 'en-ru',
            text: 'on time'
        });
    }
    
    render() { 
        
        return (
            <Fragment>
                <WordForm formTitle="Add Word" buttonText="Save Changes" action={null} listTitle={null} id={null} />
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