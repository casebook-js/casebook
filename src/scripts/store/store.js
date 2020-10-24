import { createStore } from 'redux';

import { rootReducer } from './rootReducer/rootReducer.js';

const store = createStore(rootReducer);

window.store = store;

export { store };
