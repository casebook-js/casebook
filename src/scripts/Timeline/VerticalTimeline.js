import { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { useIsScrolling } from 'react-use-is-scrolling';

import { ResetAllFilters } from '../Filters/ResetAllFilters.js';

import './VerticalTimeline.css';
import { selectPostsToShow } from '../store/rootReducer/appReducer/postsReducer/postsSelector.js';

/* eslint-disable */
const getClosest = function (elem, selector) {
    // Element.matches() polyfill
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function (s) {
                const matches = (this.document || this.ownerDocument).querySelectorAll(s);
                let i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {
                    // Ignore
                }
                return i > -1;
            };
    }

    // Get the closest matching element
    for ( ; elem && elem !== document; elem = elem.parentNode ) {
        if ( elem.matches( selector ) ) return elem;
    }
    return null;
};

const isVisible = function(ele, container) {
    const { bottom, height, top } = ele.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    return top <= containerRect.top
        ? (containerRect.top - top <= height)
        : (bottom - containerRect.bottom <= height);
};
/* eslint-enable */

const ScrollIndicator = (props) => {
    const {
        isScrollingX,
        isScrollingY
    } = useIsScrolling();
    if (isScrollingX || isScrollingY) {
        if (props.scrollOn) {
            props.scrollOn();
        }
    } else {
        if (props.scrollOff) {
            props.scrollOff();
        }
    }
    return null;
};

function mapStateToProps(state) {
    const postsToShow = selectPostsToShow(state);

    const uids = Object.keys(state.app.postsReducer);
    // eslint-disable-next-line no-shadow
    const uid = uids.reduce(function (acc, uid) {
        if (state.app.postsReducer[uid].arrIndex < state.app.postsReducer[acc].arrIndex) {
            return uid;
        } else {
            return acc;
        }
    }, (uids.length && uids[0]) || null);

    let arrIndex = state.app.postsReducer[uid]?.arrIndex;
    if (typeof arrIndex !== 'number') {
        arrIndex = uids.length;
    }

    let postToUse = postsToShow.find(function (post) {
        if (post.intersectionIsVisible && post.arrIndex === arrIndex) {
            return true;
        }
        return false;
    });
    if (!postToUse) {
        postToUse = postsToShow.find(function (post) {
            if (post.arrIndex >= arrIndex) {
                return true;
            }
            return false;
        });
    }
    arrIndex = (postToUse && postToUse.arrIndex) || arrIndex;

    const indexToSplit = postsToShow.indexOf(postToUse);

    return {
        postsArrPart1: postsToShow.slice(0, indexToSplit + 1),
        postsArrPart2: postsToShow.slice(indexToSplit + 1)
    };
}
class VerticalTimeline extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scrolling: false
        };

        this.myRef = createRef();
    }

    render() {
        const {
            postsArrPart1,
            postsArrPart2,
            itemClicked
        } = this.props;

        if (postsArrPart1.length || postsArrPart2.length) {
            return (
                <div className="VerticalTimeline">
                    <ScrollIndicator
                        scrollOn={() => {
                            setTimeout(() => {
                                if (this.state.scrolling === false) {
                                    this.setState({
                                        scrolling: true
                                    });
                                }
                            });
                        }}
                        scrollOff={() => {
                            setTimeout(() => {
                                if (this.state.scrolling === true) {
                                    this.setState({
                                        scrolling: false
                                    });

                                    if (this.props.autoScrollInContainer) {
                                        const parentEl = getClosest(this.myRef.current, this.props.autoScrollInContainer);
                                        if (parentEl) {
                                            if (!isVisible(this.myRef.current, parentEl)) {
                                                const deltaForMiddleAlign = 8;
                                                parentEl.scrollTop = (this.myRef.current.offsetTop - parseInt(parentEl.clientHeight / 2, 10)) + deltaForMiddleAlign;
                                            }
                                        }
                                    }
                                }
                            });
                        }}
                    />
                    <div className="timeline-wrapper">
                        <div className="timeline-filled">
                            <div className="vertical-line" />
                            <ul>
                                {
                                    postsArrPart1.map((post, index) => {
                                        if (index === postsArrPart1.length - 1) {
                                            return (
                                                <li key={post.uid} className="timeline-stamp" ref={this.myRef}>
                                                    <a href={`#${post.uid}`} onClick={itemClicked} style={{ textDecoration: 'none' }}>
                                                        {post.on}
                                                    </a>
                                                </li>
                                            );
                                        } else {
                                            return (
                                                <li key={post.uid} className="timeline-stamp">
                                                    <a href={`#${post.uid}`} onClick={itemClicked} style={{ textDecoration: 'none' }}>
                                                        {post.on}
                                                    </a>
                                                </li>
                                            );
                                        }
                                    })
                                }
                            </ul>
                        </div>
                        <div className="timeline-not-filled">
                            <div className="vertical-line" />
                            <ul>
                                {
                                    postsArrPart2.map((post) => {
                                        return (
                                            <li key={post.uid} className="timeline-stamp">
                                                <a href={`#${post.uid}`} onClick={itemClicked} style={{ textDecoration: 'none' }}>
                                                    {post.on}
                                                </a>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            );
        } else {
            if (this.props.showInfoAboutFilters) {
                return (
                    <div>
                        <div style={{ fontStyle: 'italic', marginBottom: 20, marginLeft: -8 }}>
                            Please update the filters to view the timeline of the posts.
                        </div>
                        <ResetAllFilters />
                    </div>
                );
            } else {
                return null;
            }
        }
    }
}
VerticalTimeline.propTypes = {
    postsArrPart1: PropTypes.array.isRequired,
    postsArrPart2: PropTypes.array.isRequired,
    itemClicked: PropTypes.func,
    showInfoAboutFilters: PropTypes.bool,
    autoScrollInContainer: PropTypes.string.isRequired
};
VerticalTimeline.defaultProps = {
    itemClicked: undefined,
    showInfoAboutFilters: undefined
};

const _VerticalTimeline = connect(mapStateToProps)(VerticalTimeline);
export { _VerticalTimeline as VerticalTimeline };
