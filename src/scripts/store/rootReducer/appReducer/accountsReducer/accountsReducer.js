import {
    FILTER_ACCOUNTS_SELECT_ALL,
    FILTER_ACCOUNTS_SELECT_NONE,
    FILTER_ACCOUNTS_SELECT_IGNORE,
    FILTER_ACCOUNTS_SELECT_DEFAULT,
    FILTER_TOGGLE_ACCOUNTS
} from 'reducers/actionTypes.js';

import {
    ACCOUNTS_OB
} from '../../../../../parse-data/parse-data.js';

const accountsInitialState = JSON.parse(JSON.stringify(ACCOUNTS_OB));

const accountsReducer = (draft = accountsInitialState, action) => {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case FILTER_TOGGLE_ACCOUNTS: {
            const { id, selected } = payload;
            draft[id].selected = selected;
            break;
        }
        case FILTER_ACCOUNTS_SELECT_ALL: {
            Object.keys(draft).forEach(function (accountId) {
                draft[accountId].selected = true;
            });
            break;
        }
        case FILTER_ACCOUNTS_SELECT_NONE: {
            Object.keys(draft).forEach(function (accountId) {
                draft[accountId].selected = false;
            });
            break;
        }
        case FILTER_ACCOUNTS_SELECT_IGNORE: {
            Object.keys(draft).forEach(function (accountId) {
                draft[accountId].selected = null;
            });
            break;
        }
        case FILTER_ACCOUNTS_SELECT_DEFAULT: {
            Object.keys(draft).forEach(function (accountId) {
                draft[accountId].selected = accountsInitialState[accountId].selected;
            });
            break;
        }
        default: {
            break;
        }
    }

    return draft;
};

export { accountsReducer };
