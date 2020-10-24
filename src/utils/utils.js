import { Fragment } from 'react';

const nl2br = function (lines) {
    if (lines.indexOf('\n') === -1) {
        return lines;
    } else {
        return (
            lines
                .split('\n')
                .map((line, key) => {
                    // eslint-disable-next-line react/no-array-index-key
                    return <Fragment key={key}>{line}<br /></Fragment>;
                })
        );
    }
};

export {
    nl2br
};
