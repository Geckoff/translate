import React, {Component} from "react";

class Input extends Component {
    render() {
        const {label, input, meta} = this.props;
        return(
            <label className="form-label">
                {label}
                <input {...input}  />
                {!meta.active && meta.touched && meta.error && <p className="valerror">{meta.error}</p>}
            </label>
        )
    }
}

export default Input;