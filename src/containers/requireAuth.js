import React from 'react';
import { connect } from 'react-redux';

import {replace} from 'react-router-redux';

export default function (ComposedComponent) {
    class Authentication extends React.Component {
        componentWillMount() {
            if (!this.props.authenticated) {
                this.props.redirectLogin();
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated) {
                this.props.redirectLogin();
            }
        }

        render() {
            console.log(`authenticated: ${this.props.authenticated}`);
            return <ComposedComponent {...this.props} />;
        }
    }

    const mapStateToProps = (state) => {
        const A = state.Auth;
        return {
            authenticated: A.get("authenticated"),
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return {
            redirectLogin: () => {
                console.log("user is not logged in. redirecting...");
                dispatch(replace('/login'));
            }
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(Authentication);
}
