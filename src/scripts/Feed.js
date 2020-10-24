import { Component, Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import IconButton from '@material-ui/core/IconButton/index.js';

import CloseIcon from '@material-ui/icons/Close.js';

import { withSnackbar } from 'notistack';

import { ResetAllFilters } from './Filters/ResetAllFilters.js';

import { Post } from './Post/Post.js';
import { Introduction } from './Introduction/Introduction.js';

import './Feed.css';
import { selectPostsToShow } from './store/rootReducer/appReducer/postsReducer/postsSelector.js';

import { POSTS_ARR } from '../parse-data/parse-data.js';

function mapStateToProps(state) {
    return {
        tags: state.app.tags,
        arrPosts: selectPostsToShow(state)
    };
}
class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prevPostsCount: null
        };
    }

    render() {
        const { arrPosts } = this.props;

        const {
            prevPostsCount
        } = this.state;

        if (arrPosts.length !== prevPostsCount) {
            setTimeout(() => {
                const action = (key) => (
                    <Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={() => { this.props.closeSnackbar(key); }}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Fragment>
                );

                let msg;
                if (POSTS_ARR.length === 1) {
                    msg = `Showing ${arrPosts.length} / ${POSTS_ARR.length} post`;
                } else {
                    msg = `Showing ${arrPosts.length} / ${POSTS_ARR.length} posts`;
                }
                this.props.enqueueSnackbar(
                    msg,
                    {
                        variant: 'info',
                        autoHideDuration: 2500,
                        action,
                        classes: {
                            test: true
                        }
                    }
                );
                this.setState({
                    prevPostsCount: arrPosts.length
                });
            });
        }

        return (
            <div className="Feed">
                <div>
                    <Introduction />
                </div>
                <div>
                    {
                        arrPosts.length === 0 &&
                        <div className="empty-feed">
                            <div style={{ fontStyle: 'italic', color: '#777', marginBottom: 20 }}>
                                Please update the filters to view the posts.
                            </div>
                            <ResetAllFilters />
                        </div>
                    }
                    {
                        arrPosts.length !== 0 &&
                        arrPosts.map(function convertToComponents(post, index) {
                            const style = {};
                            if (index === 0) {
                                style.marginTop = 0;
                            }
                            return (
                                <Post key={post.uid} data={post} style={style} />
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}
Feed.propTypes = {
    closeSnackbar: PropTypes.func.isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,

    arrPosts: PropTypes.array.isRequired
};

const _Feed = connect(mapStateToProps)(memo(withSnackbar(Feed)));
export { _Feed as Feed };
