import React from 'react';
import { connect } from 'react-redux';
class FlashMessage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: null
        }
    }

    componentWillReceiveProps(nextProps) {
        const {message} = this.props;
        if (nextProps.message !== message) {
            this.setState({ message: nextProps.message });
        }

    }
    componentDidUpdate() {
        setTimeout(() => {
            this.setState({ message: null });
        }, 2000);
    }

    render() {

        return (
            <React.Fragment>
                {this.state.message && this.state.message.success &&
                    <div className="alert alert-success text-center">
                        {this.state.message.success}
                    </div>
                }
                {this.state.message && this.state.message.error &&
                    <div className="alert alert-danger text-center">
                        {this.state.message.error}
                    </div>
                }
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        message: state.flashmessagereducer
    }
}

export default connect(mapStateToProps)(FlashMessage);