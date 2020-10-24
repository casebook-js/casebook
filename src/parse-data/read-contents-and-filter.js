const contents = require('../../data/contents/contents.json');

const removeSkippedObjects = function (ob) {
    if (ob) {
        if (ob.skip) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
};

const keepObjectsWithOnly = function (ob) {
    if (ob.only) {
        return true;
    } else {
        return false;
    }
};

const getFirstOrLastArrIndexOfObjectWithProperty = function (arr, property, lookFor = 'first') {
    if (lookFor === 'last') {
        for (let i = arr.length - 1; i >= 0; i--) {
            const item = arr[i];
            if (item[property]) {
                return i;
            }
        }
        return arr.length - 1;
    } else {
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            if (item[property]) {
                return i;
            }
        }
        return 0;
    }
};

const arrProps = [
    'accounts',
    'tags',
    'posts',
    'relationsMap',
    'relatedPosts'
];
for (let i = 0; i < arrProps.length; i++) {
    const arrProp = arrProps[i];
    contents[arrProp] = contents[arrProp] || [];
    contents[arrProp] = contents[arrProp].filter(removeSkippedObjects);

    const entriesWithOnly = contents[arrProp].filter(keepObjectsWithOnly);
    if (entriesWithOnly.length) {
        contents[arrProp] = entriesWithOnly;
    }

    const firstEntryIndexWithRangeBegin = getFirstOrLastArrIndexOfObjectWithProperty(contents[arrProp], 'rangeBegin', 'first');
    const lastEntryIndexWithRangeBegin = getFirstOrLastArrIndexOfObjectWithProperty(contents[arrProp], 'rangeEnd', 'last');

    contents[arrProp] = contents[arrProp].slice(firstEntryIndexWithRangeBegin, lastEntryIndexWithRangeBegin + 1);
}

module.exports = {
    accounts: contents.accounts,
    tags: contents.tags,
    posts: contents.posts,
    relationsMap: contents.relationsMap,
    relatedPosts: contents.relatedPosts
};
