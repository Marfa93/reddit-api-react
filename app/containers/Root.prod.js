import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import AsyncApp from './AsyncApp';

export default class Root extends Component {
    render() {
        const { store } = this.props;
        return (
            <Provider store={store}>
                <AsyncApp />
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};
