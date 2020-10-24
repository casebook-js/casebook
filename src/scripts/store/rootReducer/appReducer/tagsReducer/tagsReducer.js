import {
    FILTER_TAGS_SELECT_ALL,
    FILTER_TAGS_SELECT_NONE,
    FILTER_TAGS_SELECT_IGNORE,
    FILTER_TAGS_SELECT_DEFAULT,
    FILTER_TOGGLE_TAGS
} from 'reducers/actionTypes.js';

import {
    TAGS_OB
} from '../../../../../parse-data/parse-data.js';

const tagsInitialState = JSON.parse(JSON.stringify(TAGS_OB));

const tagsReducer = (draft = tagsInitialState, action) => {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case FILTER_TOGGLE_TAGS: {
            const { id, selected } = payload;
            draft[id].selected = selected;
            break;
        }
        case FILTER_TAGS_SELECT_ALL: {
            Object.keys(draft).forEach(function (tagId) {
                draft[tagId].selected = true;
            });
            break;
        }
        case FILTER_TAGS_SELECT_NONE: {
            Object.keys(draft).forEach(function (tagId) {
                draft[tagId].selected = false;
            });
            break;
        }
        case FILTER_TAGS_SELECT_IGNORE: {
            Object.keys(draft).forEach(function (tagId) {
                draft[tagId].selected = null;
            });
            break;
        }
        case FILTER_TAGS_SELECT_DEFAULT: {
            Object.keys(draft).forEach(function (tagId) {
                draft[tagId].selected = tagsInitialState[tagId].selected;
            });
            break;
        }
        default: {
            break;
        }
    }

    return draft;
};

export { tagsReducer };
