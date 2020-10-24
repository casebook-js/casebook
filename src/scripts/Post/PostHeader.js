import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Route, Link } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton/index.js';
import MoreVertIcon from '@material-ui/icons/MoreVert.js';
import Menu from '@material-ui/core/Menu/index.js';
import MenuItem from '@material-ui/core/MenuItem/index.js';

import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

import { nl2br } from '../../utils/utils.js';

import { ResponsiveDialog } from './ResponsiveDialog/ResponsiveDialog.js';
// eslint-disable-next-line import/no-cycle
import { Post } from './Post.js';

import { ACCOUNTS_OB } from '../../parse-data/parse-data.js';

import './PostHeader.css';

class AccountName extends Component {
    render() {
        const accountId = this.props.id;
        return (
            <span className="AccountName">
                {ACCOUNTS_OB[accountId].name}
            </span>
        );
    }
}
AccountName.propTypes = {
    id: PropTypes.string.isRequired
};

class IsWith extends Component {
    render() {
        const {
            is,
            _with
        } = this.props;

        return (
            <span className="IsWith">
                {
                    (is || _with.length) &&
                    <span style={{ color: '#65676b' }}> is</span>
                }
                {
                    is &&
                    <span style={{ color: '#65676b' }}> { is }</span>
                }
                {
                    _with.length &&
                    <span style={{ color: '#65676b' }}> with</span>
                }
                {
                    _with.length === 1 &&
                    <span> <AccountName id={_with[0]} /></span>
                }
                {
                    _with.length >= 2 &&
                    <Fragment>
                        <span> <AccountName id={_with[0]} /></span>
                        <span style={{ color: '#65676b' }}> and</span>
                        {/* <span
                            style={{ fontWeight: 'bold' }}
                            data-tip={
                                _with.slice(1).reduce(function concatAccountNames(acc, accountId) {
                                    return acc + (acc === '' ? '' : '<br />') + ACCOUNTS_OB[accountId].name;
                                }, '')
                            }
                            // title={
                            //     _with.slice(1).reduce(function concatAccountNames(acc, accountId) {
                            //         return acc + (acc === '' ? '' : '\n') + ACCOUNTS_OB[accountId].name;
                            //     }, '')
                            // }
                        >
                            {_with.length - 1}
                            &nbsp;
                            {_with.length - 1 === 1 ? 'other' : 'others'}
                        </span> */}
                        <Tooltip
                            placement="bottom"
                            overlay={
                                <span>
                                    {
                                        nl2br(
                                            _with.slice(1).reduce(function concatAccountNames(acc, accountId) {
                                                return acc + (acc === '' ? '' : '\n') + ACCOUNTS_OB[accountId].name;
                                            }, '')
                                        )
                                    }
                                </span>
                            }
                            overlayStyle={{
                                zIndex: 100000
                            }}
                        >
                            <span style={{ fontWeight: 'bold' }}> {_with.length - 1} {_with.length - 1 === 1 ? 'other' : 'others'}</span>
                        </Tooltip>
                    </Fragment>
                }
            </span>
        );
    }
}
IsWith.propTypes = {
    is: PropTypes.string,
    _with: PropTypes.array.isRequired
};
IsWith.defaultProps = {
    is: undefined
};

class PostHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPostModal: false,
            showMoreMenu: false,
            anchorEl: null
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClick(evt) {
        this.setState({
            anchorEl: evt.currentTarget,
            showMoreMenu: true
        });
    }

    handleClose() {
        this.setState({
            showMoreMenu: false
        });
    }

    render() {
        const {
            accountDetails,
            postData,
            inModal
        } = this.props;

        const {
            showMoreMenu,
            anchorEl
        } = this.state;

        let available = true;
        let smallImage;
        if (accountDetails?.images?.thumbnail) {
            smallImage = `./data/images/profile-images/${accountDetails?.images?.thumbnail}`;
        } else {
            smallImage = './data/images/profile-images/not-available.svg';
            available = false;
        }

        let src = '';
        let srcset;

        if (available) {
            srcset = [];

            const sizes = [40, 80, 120];
            for (let i = 0; i < sizes.length; i++) {
                let path = smallImage.split('.');
                path.splice(path.length - 1, 0, `resized-${sizes[i]}x${sizes[i]}`);
                path = path.join('.');
                srcset.push(`${path} ${i + 1}x`);

                if (i === 0) {
                    src = path;
                }
            }
            srcset = srcset.join(', ');
        } else {
            src = smallImage;
        }

        return (
            <div className="PostHeader">
                <div style={{ paddingRight: 8 }}>
                    <img
                        loading="lazy"
                        src={src}
                        srcSet={srcset}
                        alt={`Profile display of ${accountDetails.name}`}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 999
                        }}
                    />
                </div>

                <div style={{ marginTop: 4 }}>
                    <div>
                        <span style={{ fontWeight: 'bold' }}>
                            {accountDetails.name}
                        </span>

                        {
                            postData.with &&
                            Array.isArray(postData.with) &&
                            postData.with.length >= 1 &&
                            <span>
                                <IsWith is={postData.is} _with={postData.with} />
                            </span>
                        }

                        {
                            postData.at &&
                            <Fragment>
                                <span style={{ color: '#65676b' }}> at </span>
                                <span style={{ fontWeight: 'bold' }}>{postData.at}</span>
                            </Fragment>
                        }
                    </div>
                    <div
                        className="on"
                        style={{
                            fontSize: 13,
                            marginTop: 5,
                            marginBottom: 5
                        }}
                    >
                        {
                            inModal &&
                            <span>
                                {postData.on}
                            </span>
                        }
                        {
                            !inModal &&
                            <Fragment>
                                <Link
                                    to={(loc) => {
                                        return {
                                            pathname: '',
                                            state: {
                                                ...loc.state,
                                                locationStateShowPostModal: postData.uid
                                            }
                                        };
                                    }}
                                    onClick={() => {
                                        this.setState({
                                            showPostModal: true
                                        });
                                    }}
                                    style={{ color: 'rgb(101, 103, 107)', textDecoration: 'none' }}
                                >
                                    {postData.on}
                                </Link>
                                <Route
                                    // eslint-disable-next-line react/no-children-prop
                                    children={(props) => {
                                        if (
                                            this.state.showPostModal &&
                                            props.location.state &&
                                            props.location.state.locationStateShowPostModal === postData.uid
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
                                                            Post
                                                        </span>
                                                    }
                                                    willUnmount={() => {
                                                        this.setState({
                                                            showPostModal: false
                                                        });
                                                    }}
                                                >
                                                    <Post data={postData} showingInModal inModal />
                                                </ResponsiveDialog>
                                            );
                                        } else {
                                            return null;
                                        }
                                    }}
                                />
                            </Fragment>
                        }
                    </div>
                </div>

                <div className="menu-more" style={{ marginLeft: 'auto' }}>
                    <IconButton onClick={this.handleClick} size="small">
                        <MoreVertIcon />
                    </IconButton>
                    {
                        showMoreMenu &&
                        <Menu
                            anchorEl={anchorEl}
                            open={showMoreMenu}
                            onClose={this.handleClose}
                        >
                            <MenuItem onClick={this.handleClose}>
                                <a
                                    href={`#${postData.uid}`}
                                    target="_blank"
                                    rel="nofollow noopener noreferrer"
                                    style={{
                                        textDecoration: 'none',
                                        color: 'rgba(0, 0, 0, 0.87)'
                                    }}
                                >
                                    Direct link
                                </a>
                            </MenuItem>
                            {
                                postData.credits?.url &&
                                <MenuItem onClick={this.handleClose}>
                                    <a
                                        href={postData.credits.url}
                                        target="_blank"
                                        rel="nofollow noopener noreferrer"
                                        style={{
                                            textDecoration: 'none',
                                            color: 'rgba(0, 0, 0, 0.87)'
                                        }}
                                    >
                                        Credits
                                    </a>
                                </MenuItem>
                            }
                        </Menu>
                    }
                </div>
            </div>
        );
    }
}
PostHeader.propTypes = {
    accountDetails: PropTypes.object.isRequired,
    postData: PropTypes.object.isRequired,
    inModal: PropTypes.bool
};
PostHeader.defaultProps = {
    inModal: undefined
};

export { PostHeader };
