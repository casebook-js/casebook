import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Route, Link } from 'react-router-dom';

import { ResponsiveDialog } from './ResponsiveDialog/ResponsiveDialog.js';

import './RelatedPosts.css';

// eslint-disable-next-line import/no-cycle
import { Post } from './Post.js';

import {
    POSTS_OB_UUID,
    ACCOUNTS_OB,
    RELATIONS_MAP_OB
} from '../../parse-data/parse-data.js';

const relationToDisplay = function (relationName) {
    if (
        RELATIONS_MAP_OB[relationName] &&
        RELATIONS_MAP_OB[relationName].title
    ) {
        return RELATIONS_MAP_OB[relationName].title;
    } else {
        return relationName;
    }
};

class RelatedPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPostModal: false
        };
    }

    render() {
        const {
            relatedPost,
            relationEntry,
            depth
        } = this.props;
        const relatedPostAuthorName = ACCOUNTS_OB[relatedPost.author].name;
        const relationToDisplayValue = relationToDisplay(relationEntry.relation);
        return (
            <Fragment>
                <tr style={{ fontSize: 13 }}>
                    <td
                        style={{
                            fontVariant: 'small-caps',
                            verticalAlign: 'top',
                            paddingTop: 3,
                            paddingBottom: 3
                        }}
                    >
                        {relationToDisplayValue}:<span> </span>
                    </td>
                    <td style={{ paddingLeft: 8, paddingTop: 3, paddingBottom: 3 }}>
                        <Link
                            to={(loc) => {
                                return {
                                    pathname: '',
                                    state: {
                                        ...loc.state,
                                        [`locationStateShowRelatedPostModal-${relatedPost.uuid}-${depth}`]: true
                                    }
                                };
                            }}
                            onClick={() => {
                                this.setState({
                                    showPostModal: true
                                });
                            }}
                            className="anchor-without-visited no-underline underline-on-hover"
                            style={{ color: 'rgb(101, 103, 107)' }}
                        >
                            {relatedPostAuthorName.replace(/ /g, ' ')} on&nbsp;{relatedPost.on.replace(/ /g, ' ')}
                        </Link>

                        <Route
                            // eslint-disable-next-line react/no-children-prop
                            children={(props) => {
                                if (
                                    this.state.showPostModal &&
                                    props.location.state &&
                                    props.location.state[`locationStateShowRelatedPostModal-${relatedPost.uuid}-${depth}`] === true
                                ) {
                                    return (
                                        <ResponsiveDialog
                                            onClose={() => {
                                                props.history.goBack();
                                                setTimeout(() => {
                                                    this.setState({
                                                        showPostModal: false
                                                    });
                                                });
                                            }}
                                            headerText={
                                                <span style={{ fontVariant: 'small-caps' }}>
                                                    {relationToDisplayValue}
                                                </span>
                                            }
                                            willUnmount={() => {
                                                this.setState({
                                                    showPostModal: false
                                                });
                                            }}
                                        >
                                            <Post data={relatedPost} showingInModal inModal depth={depth} />
                                        </ResponsiveDialog>
                                    );
                                } else {
                                    return null;
                                }
                            }}
                        />
                    </td>
                </tr>
            </Fragment>
        );
    }
}
RelatedPost.propTypes = {
    relatedPost: PropTypes.object.isRequired,
    relationEntry: PropTypes.object.isRequired,
    depth: PropTypes.number.isRequired
};

class RelatedPosts extends Component {
    render() {
        const {
            data,
            depth
        } = this.props;
        if (data) {
            return (
                <div
                    style={{
                        paddingLeft: 12,
                        paddingRight: 12,
                        marginTop: 10,
                        marginBottom: 20
                    }}
                >
                    <table>
                        <tbody>
                            {
                                data.map((relationEntry, index) => {
                                    const relatedPost = POSTS_OB_UUID[relationEntry.relatedPostUuid];
                                    return (
                                        // eslint-disable-next-line react/no-array-index-key
                                        <Fragment key={relationEntry.relatedPostUuid + relationEntry.relation + index}>
                                            <RelatedPost relationEntry={relationEntry} relatedPost={relatedPost} depth={depth} />
                                        </Fragment>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return null;
        }
    }
}
RelatedPosts.propTypes = {
    data: PropTypes.array,
    depth: PropTypes.number.isRequired
};
RelatedPosts.defaultProps = {
    data: undefined
};

const _RelatedPosts = connect()(RelatedPosts);
export { _RelatedPosts as RelatedPosts };
