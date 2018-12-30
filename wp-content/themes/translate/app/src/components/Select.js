import React, {Fragment, Component} from "react";

class Select extends Component {
    render() {
        const {children, input} = this.props;
        return(
            <Fragment>
                <select {...input} onChange={this.props.onChange} name='asd' className="form-label">
                    {children}
                </select>
            </Fragment>
        )
    }
}

export default Select;