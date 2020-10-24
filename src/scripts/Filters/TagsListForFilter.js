/* eslint-disable jsx-a11y/anchor-is-valid */

import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from '@material-ui/core/Link/index.js';
import Checkbox from '@material-ui/core/Checkbox/index.js';
import FormControlLabel from '@material-ui/core/FormControlLabel/index.js';
import IconButton from '@material-ui/core/IconButton/index.js';

import ImportExportIcon from '@material-ui/icons/ImportExport.js';

import {
    FILTER_TAGS_SELECT_ALL,
    FILTER_TAGS_SELECT_NONE,
    FILTER_TAGS_SELECT_IGNORE,
    FILTER_TAGS_SELECT_DEFAULT,
    FILTER_TOGGLE_TAGS
} from 'reducers/actionTypes.js';

import './TagsListForFilter.css';

import { TAGS_ARR } from '../../parse-data/parse-data.js';

function mapStateToProps(state) {
    return {
        tags: state.app.tags
    };
}

class TagsListForFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sort: 'alphabetical'
        };

        this.selectAll = this.selectAll.bind(this);
        this.selectNone = this.selectNone.bind(this);
        this.selectIgnore = this.selectIgnore.bind(this);
        this.selectDefault = this.selectDefault.bind(this);

        this.toggleSort = this.toggleSort.bind(this);
    }

    selectAll(evt) {
        evt.preventDefault();

        this.props.dispatch({
            type: FILTER_TAGS_SELECT_ALL
        });
    }

    selectNone(evt) {
        evt.preventDefault();

        this.props.dispatch({
            type: FILTER_TAGS_SELECT_NONE
        });
    }

    selectIgnore(evt) {
        evt.preventDefault();

        this.props.dispatch({
            type: FILTER_TAGS_SELECT_IGNORE
        });
    }

    selectDefault(evt) {
        evt.preventDefault();

        this.props.dispatch({
            type: FILTER_TAGS_SELECT_DEFAULT
        });
    }

    toggleSort() {
        if (this.state.sort === 'alphabetical') {
            this.setState({
                sort: 'post-count'
            });
        } else {
            this.setState({
                sort: 'alphabetical'
            });
        }
    }

    render() {
        let sortFn;
        if (this.state.sort === 'post-count') {
            sortFn = function (a, b) {
                if (a.postsCount < b.postsCount) {
                    return 1;
                } else if (a.postsCount > b.postsCount) {
                    return -1;
                }
                return 0;
            };
        } else {
            sortFn = function (a, b) {
                if (a.displayName > b.displayName) {
                    return 1;
                } else if (a.displayName < b.displayName) {
                    return -1;
                }
                return 0;
            };
        }
        return (
            <div className="TagsListForFilter">
                <div style={{ display: 'flex', marginBottom: 15 }}>
                    <div style={{ marginLeft: -5, marginTop: -4, marginRight: 'auto' }}>
                        <IconButton size="small" onClick={this.toggleSort}>
                            <ImportExportIcon />
                        </IconButton>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Link href="#" className="anchor-without-visited" onClick={this.selectAll}>
                            All
                        </Link>
                        <Link href="#" className="anchor-without-visited" onClick={this.selectNone} style={{ marginLeft: 10 }}>
                            None
                        </Link>
                        <Link href="#" className="anchor-without-visited" onClick={this.selectIgnore} style={{ marginLeft: 10 }}>
                            Optional
                        </Link>
                        <Link href="#" className="anchor-without-visited" onClick={this.selectDefault} style={{ marginLeft: 10 }}>
                            Reset
                        </Link>
                    </div>
                </div>
                <div>
                    {
                        [...TAGS_ARR].sort(sortFn).map((tag) => {
                            const selected = this.props.tags[tag.id].selected;
                            let checked;
                            let indeterminate;
                            if (selected) {
                                checked = true;
                                indeterminate = false;
                            } else {
                                checked = false;
                                if (selected === null || selected === undefined) {
                                    indeterminate = true;
                                } else {
                                    indeterminate = false;
                                }
                            }

                            let label;
                            if (this.state.sort === 'post-count') {
                                label = `(${tag.postsCount}) ${tag.displayName}`;
                            } else {
                                label = `${tag.displayName} (${tag.postsCount})`;
                            }

                            return (
                                <div key={tag.id} style={{ marginTop: 7 }}>
                                    <FormControlLabel
                                        style={{ alignItems: 'flex-start' }}
                                        control={
                                            <Checkbox
                                                checked={checked}
                                                indeterminate={indeterminate}
                                                inputProps={{ 'data-indeterminate': indeterminate }}
                                                style={{
                                                    paddingTop: 0,
                                                    paddingBottom: 0
                                                }}
                                                onChange={(evt, checkedValue) => {
                                                    const prevOb = {
                                                        checked: !checkedValue,
                                                        indeterminate: (evt.target.getAttribute('data-indeterminate') === 'true')
                                                    };

                                                    let selectedVal;

                                                    if (prevOb.checked && !prevOb.indeterminate) {
                                                        selectedVal = null;
                                                    } else if (!prevOb.checked && prevOb.indeterminate) {
                                                        selectedVal = false;
                                                    } else {
                                                        selectedVal = true;
                                                    }

                                                    this.props.dispatch({
                                                        type: FILTER_TOGGLE_TAGS,
                                                        payload: {
                                                            id: tag.id,
                                                            selected: selectedVal
                                                        }
                                                    });
                                                }}
                                                color="primary"
                                                size="small"
                                            />
                                        }
                                        label={label}
                                    />
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}
TagsListForFilter.propTypes = {
    dispatch: PropTypes.func.isRequired,
    tags: PropTypes.object.isRequired
};

const _TagsListForFilter = connect(mapStateToProps)(TagsListForFilter);
export { _TagsListForFilter as TagsListForFilter };
