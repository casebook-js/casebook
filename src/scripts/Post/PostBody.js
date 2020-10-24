/* eslint-disable jsx-a11y/no-static-element-interactions */

import {
    Component,
    Fragment,
    createRef,
    memo
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Linkify from 'react-linkify';

import TruncateMarkup from 'react-truncate-markup';

import scrollIntoView from 'scroll-into-view';

import cleanSplit from './clean-split.js';

import { Images } from './Images/Images.js';
import { Video } from './Video/Video.js';
import { Twitter } from './Twitter/Twitter.js';

import { scrollOffsetFromTop } from '../constants.js';

import { ACCOUNTS_OB } from '../../parse-data/parse-data.js';

import './PostBody.css';

const atToAccount = function (line) {
    let matches = cleanSplit(line, /@@[a-z_][a-z1-9_.-]+@@/i);

    matches = matches.map(function (str, index) {
        if (str.match(/^@@[a-z_][a-z1-9_.-]+@@$/i)) {
            let val = str.replace(/^@@/, '').replace(/@@$/, '');
            if (
                ACCOUNTS_OB[val] &&
                ACCOUNTS_OB[val].name
            ) {
                val = ACCOUNTS_OB[val].name;
            }

            return (
                // eslint-disable-next-line react/no-array-index-key
                <span key={index} className="tagged-account">
                    {val}
                </span>
            );
        } else {
            return str;
        }
    });

    return matches;
};

const parseTextString = function (lines) {
    const output = (
        lines
            .split('\n')
            .map((line, key) => {
                // eslint-disable-next-line react/no-array-index-key
                return <Fragment key={key}>{atToAccount(line)}<br /></Fragment>;
            })
    );

    return output;
};

function inViewport(element) {
    const rect = element.getBoundingClientRect();
    const height = window.innerHeight || document.documentElement.clientHeight;
    const width = window.innerWidth || document.documentElement.clientWidth;

    return (
        rect.top >= 0 &&
        rect.bottom <= height &&
        rect.left >= 0 &&
        rect.right <= width
    );
}

class PostBody extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shouldTruncate: true
        };

        this.myRef = createRef();

        this.toggleTruncate = this.toggleTruncate.bind(this);
    }

    toggleTruncate() {
        const update = () => {
            this.setState((prevState) => {
                return {
                    shouldTruncate: !prevState.shouldTruncate
                };
            });
        };
        if (
            this.props.showingInModal ||
            this.state.shouldTruncate ||
            inViewport(this.myRef.current.parentNode)
        ) {
            update();
        } else {
            scrollIntoView(this.myRef.current.parentNode, {
                time: 100,
                align: {
                    topOffset: scrollOffsetFromTop
                }
            }, () => {
                setTimeout(update, 1000);
            });
        }
    }

    render() {
        const {
            contents,
            type,
            postUid
        } = this.props;

        let contentLength;
        if (contents.text) {
            if (contents.text.length <= 160) {
                if ((contents.text.match(/\n/g) || []).length <= 2) {
                    contentLength = 'text-short';
                } else {
                    contentLength = 'text-long';
                }
            } else {
                contentLength = 'text-long';
            }
        }

        const readMoreEllipsis = (
            <span>
                ...{' '}
                <span onClick={this.toggleTruncate} className="anchor noselect">
                    Show more
                </span>
            </span>
        );

        return (
            <div
                className={classNames(
                    'PostBody',
                    type === 'image' && 'type-image',
                    type === 'video' && 'type-video',
                    type === 'text' && 'type-text',
                    type === 'twitter' && 'type-twitter'
                )}
                ref={this.myRef}
            >
                <div style={{ paddingLeft: 12, paddingRight: 12 }}>
                    {
                        contents.text &&
                        <div
                            className={classNames(
                                'PostBody-text',
                                contentLength
                            )}
                        >
                            <Linkify
                                componentDecorator={(decoratedHref, decoratedText, key) => (
                                    <a href={decoratedHref} key={key} target="_blank" rel="nofollow noopener noreferrer">
                                        {decoratedText}
                                    </a>
                                )}
                            >
                                {(() => {
                                    const markup = (
                                        <span>
                                            {parseTextString(contents.text)}
                                        </span>
                                    );
                                    if (this.state.shouldTruncate) {
                                        return (
                                            <TruncateMarkup
                                                lines={10}
                                                ellipsis={readMoreEllipsis}
                                            >
                                                {markup}
                                            </TruncateMarkup>
                                        );
                                    } else {
                                        return (
                                            <span>
                                                {markup}
                                                <span
                                                    onClick={this.toggleTruncate}
                                                    className="anchor noselect"
                                                    style={{
                                                        display: 'inline-block',
                                                        marginTop: 8
                                                    }}
                                                >
                                                    Show less
                                                </span>
                                            </span>
                                        );
                                    }
                                })()}
                            </Linkify>
                        </div>
                    }
                    {
                        contents.images &&
                        <Images
                            className="PostBody-images"
                            images={contents.images}
                            postUid={postUid}
                            showingInModal={this.props.showingInModal}
                        />
                    }
                    {
                        contents.video &&
                        <Video
                            className="PostBody-video"
                            id={contents.video.id}
                            start={contents.video.start}
                            end={contents.video.end}
                        />
                    }
                    {
                        contents.twitter &&
                        <Twitter
                            className="PostBody-twitter"
                            url={contents.twitter.url}
                            fallback={contents.twitter.fallback}
                        />
                    }
                </div>
            </div>
        );
    }
}
PostBody.propTypes = {
    contents: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    showingInModal: PropTypes.bool,
    postUid: PropTypes.string.isRequired
};
PostBody.defaultProps = {
    showingInModal: undefined
};

const _PostBody = memo(PostBody);
export { _PostBody as PostBody };
