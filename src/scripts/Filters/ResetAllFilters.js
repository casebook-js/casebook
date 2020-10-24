import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button/index.js';

import {
    FILTER_ACCOUNTS_SELECT_DEFAULT,
    FILTER_TAGS_SELECT_DEFAULT
} from 'reducers/actionTypes.js';

import './ResetAllFilters.css';

class ResetAllFilters extends Component {
    constructor(props) {
        super(props);

        this.selectDefaultFilters = this.selectDefaultFilters.bind(this);
    }

    selectDefaultFilters(evt) {
        evt.preventDefault();

        this.props.dispatch({
            type: FILTER_ACCOUNTS_SELECT_DEFAULT
        });

        this.props.dispatch({
            type: FILTER_TAGS_SELECT_DEFAULT
        });
    }

    render() {
        return (
            <div className="ResetAllFilters" style={{ textAlign: 'center' }}>
                <Button
                    onClick={this.selectDefaultFilters}
                    variant="outlined"
                    color="primary"
                    style={{ textTransform: 'none' }}
                >
                    Reset all filters
                </Button>
            </div>
        );
    }
}
ResetAllFilters.propTypes = {
    dispatch: PropTypes.func.isRequired
};

const _ResetAllFilters = connect()(ResetAllFilters);
export { _ResetAllFilters as ResetAllFilters };
