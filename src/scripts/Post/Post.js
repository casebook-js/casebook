import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { InView } from 'react-intersection-observer';

import {
    POST_SET_VISIBILITY
} from 'reducers/actionTypes.js';

import './Post.css';

// eslint-disable-next-line import/no-cycle
import { PostHeader } from './PostHeader.js';
import { PostBody } from './PostBody.js';

import { ACCOUNTS_OB } from '../../parse-data/parse-data.js';
import { scrollOffsetFromTop } from '../constants.js';
// eslint-disable-next-line import/no-cycle
import { RelatedPosts } from './RelatedPosts.js';

const threshold = [0.0001, 1];
class Post extends Component {
    constructor(props) {
        super(props);

        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    }

    handleVisibilityChange(flagVisible, entry) {
        this.props.dispatch({
            type: POST_SET_VISIBILITY,
            payload: {
                flagVisible,
                post: this.props.data,
                intersectionIsVisible: entry.isVisible,
                intersectionRatio: entry.intersectionRatio
            }
        });
    }

    render() {
        const {
            data,
            showingInModal,
            inModal,
            depth
        } = this.props;
        const accountDetails = ACCOUNTS_OB[data.author];
        return (
            <div className="Post">
                <InView
                    as="div"
                    threshold={threshold}
                    rootMargin="-60px 0px 0px 0px"
                    onChange={this.handleVisibilityChange}
                >
                    <span id={data.uid} style={{ scrollMarginTop: scrollOffsetFromTop }} />
                    <PostHeader postData={data} accountDetails={accountDetails} inModal={inModal} />
                    <RelatedPosts data={data.relatedPosts} depth={depth ? depth + 1 : 1} />
                    <PostBody type={data.type} postUid={data.uid} contents={data.contents} showingInModal={showingInModal} />
                </InView>
            </div>
        );
    }
}
Post.propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    showingInModal: PropTypes.bool,
    inModal: PropTypes.bool,
    depth: PropTypes.number
};
Post.defaultProps = {
    showingInModal: undefined,
    inModal: undefined,
    depth: undefined
};

const _Post = connect()(Post);
export { _Post as Post };
