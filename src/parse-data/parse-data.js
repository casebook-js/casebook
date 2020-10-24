const stringIncr = require('string-incr');

const contents = require('./read-contents-and-filter.js');

const arrayToObject = function (arr, property) {
    const ob = {};

    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        ob[item[property]] = item;
    }

    return ob;
};

const ACCOUNTS_ARR = contents.accounts;
const ACCOUNTS_OB = arrayToObject(ACCOUNTS_ARR, 'id');

const TAGS_ARR = contents.tags;
const TAGS_OB = arrayToObject(TAGS_ARR, 'id');

const POSTS_ARR = contents.posts;

POSTS_ARR.forEach(function (post) {
    if (!Array.isArray(post.tags)) {
        post.tags = ['untagged'];
    }
});

const tempMap = {};
for (let i = POSTS_ARR.length - 1; i >= 0; i--) {
    const post = POSTS_ARR[i];

    let uid;
    let flagAlreadyExists;

    let flagFirstAttempt = true;
    // eslint-disable-next-line prefer-template
    uid = 't-' + post.on.toLowerCase().replace(/\W+/g, '-');
    do {
        flagAlreadyExists = tempMap[uid];
        if (!flagAlreadyExists) {
            break;
        }

        if (flagFirstAttempt) {
            uid = stringIncr(`${uid}_`, '');
        } else {
            uid = stringIncr(uid);
        }
        flagFirstAttempt = false;
    } while (flagAlreadyExists);

    // eslint-disable-next-line dot-notation
    post['uid'] = uid;
    tempMap[uid] = true;
}

POSTS_ARR.forEach(function mutateAddIndex(post, index) {
    // eslint-disable-next-line dot-notation
    post['arrIndex'] = index;
});
const POSTS_OB = arrayToObject(POSTS_ARR, 'uid');

POSTS_ARR.forEach(function countPostsPerTag(post) {
    const tags = post.tags;
    tags.forEach(function calculatePostCount(tagId) {
        const tag = TAGS_OB[tagId];
        tag.postsCount = tag.postsCount || 0;
        tag.postsCount++;
    });
});
TAGS_ARR.forEach(function (tag) {
    tag.postsCount = tag.postsCount || 0;
});

POSTS_ARR.forEach(function addAccountsMutatePost(post) {
    const accounts = {};
    accounts[post.author] = true;
    if (Array.isArray(post.with)) {
        for (let i = 0; i < post.with.length; i++) {
            const accountId = post.with[i];
            accounts[accountId] = true;
        }
    }

    if (
        post.contents &&
        post.contents.text
    ) {
        const text = post.contents.text;
        (text.match(/@@[a-z_][a-z1-9_.-]+@@/ig) || []).forEach(function (item) {
            const accountId = item.replace(/^@@/, '').replace(/@@$/, '');

            accounts[accountId] = true;
        });
    }

    post.accountsOb = accounts;
    post.accountsArr = Object.keys(accounts);
});

POSTS_ARR.forEach(function countPostsPerUser(post) {
    const accountIds = post.accountsArr;
    accountIds.forEach(function calculatePostCount(accountId) {
        const account = ACCOUNTS_OB[accountId];
        account.postsCount = account.postsCount || 0;
        account.postsCount++;
    });
});
ACCOUNTS_ARR.forEach(function (account) {
    account.postsCount = account.postsCount || 0;
});

const POSTS_OB_UUID = {};
POSTS_ARR.forEach(function (post) {
    if (post.uuid) {
        POSTS_OB_UUID[post.uuid] = post;
    }
});

const RELATIONS_MAP_ARR = contents.relationsMap;
RELATIONS_MAP_ARR.forEach(function (relation) {
    // Note: The spaces are replaced with character equivalent to '&nbsp;'
    relation.title = relation.title.replace(/ /g, ' ');
});

const RELATIONS_MAP_OB = arrayToObject(RELATIONS_MAP_ARR, 'id');

const reverseRelation = function (relation) {
    if (RELATIONS_MAP_OB[relation].reverse) {
        return RELATIONS_MAP_OB[relation].reverse;
    } else {
        return relation;
    }
};

const RELATED_POSTS_ARR = contents.relatedPosts || [];
RELATED_POSTS_ARR.forEach(function (relatedPost) {
    POSTS_OB_UUID[relatedPost.first].relatedPosts = POSTS_OB_UUID[relatedPost.first].relatedPosts || [];
    POSTS_OB_UUID[relatedPost.first].relatedPosts.push({
        relation: relatedPost.relatesTo,
        relatedPostUuid: POSTS_OB_UUID[relatedPost.second].uuid
    });

    POSTS_OB_UUID[relatedPost.second].relatedPosts = POSTS_OB_UUID[relatedPost.second].relatedPosts || [];
    POSTS_OB_UUID[relatedPost.second].relatedPosts.push({
        relation: reverseRelation(relatedPost.relatesTo),
        relatedPostUuid: POSTS_OB_UUID[relatedPost.first].uuid
    });
});

window.ACCOUNTS_ARR = ACCOUNTS_ARR;
window.ACCOUNTS_OB = ACCOUNTS_OB;
window.TAGS_ARR = TAGS_ARR;
window.TAGS_OB = TAGS_OB;
window.POSTS_ARR = POSTS_ARR;
window.POSTS_OB = POSTS_OB;
window.POSTS_OB_UUID = POSTS_OB_UUID;
window.RELATIONS_MAP_ARR = RELATIONS_MAP_ARR;
window.RELATIONS_MAP_OB = RELATIONS_MAP_OB;

export {
    ACCOUNTS_ARR,
    ACCOUNTS_OB,
    TAGS_ARR,
    TAGS_OB,
    POSTS_ARR,
    POSTS_OB,
    POSTS_OB_UUID,
    RELATIONS_MAP_ARR,
    RELATIONS_MAP_OB
};
