import { tagsReducer } from './tagsReducer/tagsReducer.js';
import { accountsReducer } from './accountsReducer/accountsReducer.js';
import { postsReducer } from './postsReducer/postsReducer.js';

const initialAppState = {};
const appReducer = (draft = initialAppState, action) => {
    draft.app.tags = tagsReducer(draft.app.tags, action);
    draft.app.accountsOb = accountsReducer(draft.app.accountsOb, action);
    draft.app.postsReducer = postsReducer(draft.app.postsReducer, action);

    return draft;
};

export { appReducer };
