import React from 'react';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validation: {
                rules: {},
                messages: {},
            },
            valid: false,
            formValue: {},
            form:null
        }
    }
    componentDidMount() {

    }
    getLabelFromFieldName(fieldName) {
        return fieldName.replace(/_/g, ' ')
            .replace(/-/g, ' ')
    }
    submitHandeler = ($event) => {

        $event.preventDefault();
        const formData = {};
        const errorMessages = {};
        var formValidStatus = true;
        let formDom = document[this.props.config.name];
        Object.keys(this.props.config.elements).map((elementName) => {
            let name = elementName;
            let value = formDom[elementName].value;
            formData[elementName] = value;
            let validation = this.props.config.elements[elementName].validation;
            if (validation) {
                errorMessages[name] = {};
                if (validation.indexOf('required') > -1) {
                    if (value === '') {
                        errorMessages[name]['required'] = 'field is required';
                        formValidStatus = false;
                    }
                }
                if (value !== '' && validation.indexOf('email') > -1) {
                    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(value)) {
                        errorMessages[name]['email'] = 'Email is not valid';
                        formValidStatus = false;
                    }
                }
                if (value !== '' && validation.find((i) => i.startsWith('min'))) {
                    let minValue = validation.find((i) => i.startsWith('min')).split(':');
                    minValue = parseInt(minValue[1]);
                    if (value.length < minValue) {
                        errorMessages[name]['min'] = 'minimum ' + minValue + ' character is required';
                        formValidStatus = false;
                    }
                }
                if (value !== '' && validation.find((i) => i.startsWith('max'))) {
                    let maxValue = validation.find((i) => i.startsWith('max')).split(':');
                    maxValue = parseInt(maxValue[1]);
                    if (value.length > maxValue) {
                        errorMessages[name]['max'] = 'max ' + maxValue + ' character is required';
                        formValidStatus = false;
                    }
                }
                if (value !== '' && validation.find((i) => i.startsWith('match_to'))) {
                    let matchField = validation.find((i) => i.startsWith('match_to')).split(':')
                    matchField = matchField[1];
                    if (value !== formDom[matchField].value) {
                        errorMessages[name]['match_to'] = `value is not matching with ${this.getLabelFromFieldName(matchField)}`;
                        formValidStatus = false;
                    }
                }
            }

            return {
                name: name,
                value: value
            }
        });
        setTimeout(() => {
            this.setState(prevState => ({
                ...prevState,
                validation: {
                    ...prevState.validation,
                    messages: errorMessages,

                },
                valid: formValidStatus,
                formValue: formData,
                form:formDom
            }));
            this.props.onSubmit(this.state);
        }, 50);
        // this.props.config.submitHandeler();
    }
    render() {

        return (
            <form name={this.props.config.name} onSubmit={this.submitHandeler}>
                {Object.keys(this.props.config.elements).map((formElementName) => {
                    let formElement = this.props.config.elements[formElementName];
                    return <div className="form-group" key={formElementName}>
                        <label>{this.getLabelFromFieldName(formElementName)}</label>
                        {(() => {
                            switch (formElement.type) {
                                case "text":
                                    return <input key={formElementName} type="text" className="form-control" name={formElementName} defaultValue={formElement.value} />
                                case "email":
                                    return <input key={formElementName} type="email" className="form-control" name={formElementName} defaultValue={formElement.value} />
                                case "password":
                                    return <input key={formElementName} type="password" className="form-control" name={formElementName} defaultValue={formElement.value} />
                                default:
                                    return null;
                            }
                        })()}
                        {(this.state.validation.messages[formElementName] && this.state.validation.messages[formElementName].required) &&
                            <p className="form-err">
                                {this.state.validation.messages[formElementName].required}
                            </p>}
                        {(this.state.validation.messages[formElementName] && this.state.validation.messages[formElementName].email) &&
                            <p className="form-err">
                                {this.state.validation.messages[formElementName].email}
                            </p>
                        }
                        {(this.state.validation.messages[formElementName] && this.state.validation.messages[formElementName].match_to) &&
                            <p className="form-err">
                                {this.state.validation.messages[formElementName].match_to}
                            </p>
                        }

                    </div>
                })}
                <div className="form-group">
                    {this.props.config.buttons.map((i) => {
                        return <input type={i.type} value={i.value} className={i.cssClass} />
                    })}
                </div>
            </form>
        );
    }
}

export default Form;