import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

export default function configureStore(preloadedState) {
    const store = createStore(
        rootReducer,
        preloadedState,
        compose(
            applyMiddleware(thunkMiddleware),
            DevTools.instrument()
        )
    );

    return store;
}
