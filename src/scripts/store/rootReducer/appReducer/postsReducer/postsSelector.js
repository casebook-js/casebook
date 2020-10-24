import { createSelector } from 'reselect';

import { POSTS_ARR } from '../../../../../parse-data/parse-data.js';

const postsToUse = POSTS_ARR.filter(function removeSkippedPosts(post) {
    if (post) {
        if (post.skip) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
});

const selectPostsToShow = createSelector(
    function (state) {
        return {
            appTags: state.app.tags,
            appAccountsOb: state.app.accountsOb
        };
    },
    function ({ appTags, appAccountsOb }) {
        let arrPosts = postsToUse;
        arrPosts = arrPosts.filter((post) => {
            let flagShow = true;

            // Tags
            {
                const anyoneSaysHide = (post.tags || []).some(function (tagId) {
                    if (appTags[tagId].selected === false) {
                        return true;
                    } else {
                        return false;
                    }
                });
                if (anyoneSaysHide) {
                    flagShow = false;
                }
                if (flagShow) {
                    const anyoneSaysShow = (post.tags || []).some(function (tagId) {
                        if (appTags[tagId].selected === true) {
                            return true;
                        } else {
                            return false;
                        }
                    });
                    if (!anyoneSaysShow) {
                        flagShow = false;
                    }
                }
            }

            // Accounts
            if (flagShow) {
                const anyoneSaysHide = (post.accountsArr || []).some(function (accountId) {
                    if (appAccountsOb[accountId].selected === false) {
                        return true;
                    } else {
                        return false;
                    }
                });
                if (anyoneSaysHide) {
                    flagShow = false;
                }
                if (flagShow) {
                    const anyoneSaysShow = (post.accountsArr || []).some(function (accountId) {
                        if (appAccountsOb[accountId].selected === true) {
                            return true;
                        } else {
                            return false;
                        }
                    });
                    if (!anyoneSaysShow) {
                        flagShow = false;
                    }
                }
            }

            if (flagShow) {
                return true;
            } else {
                return false;
            }
        });
        return arrPosts;
    }
);

export { selectPostsToShow };
