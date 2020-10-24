import {
    POST_SET_VISIBILITY
} from 'reducers/actionTypes.js';

const postsInitialState = {};

const postsReducer = (draft = postsInitialState, action) => {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case POST_SET_VISIBILITY: {
            const {
                flagVisible,
                post,
                intersectionIsVisible,
                intersectionRatio
            } = payload;

            if (flagVisible) {
                draft[post.uid] = JSON.parse(JSON.stringify(post));
                draft[post.uid].intersectionIsVisible = intersectionIsVisible;
                draft[post.uid].intersectionRatio = intersectionRatio;
            } else {
                delete draft[post.uid];
            }

            break;
        }
        default: {
            break;
        }
    }

    return draft;
};

export { postsReducer };
