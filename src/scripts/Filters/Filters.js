import { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FilterByTags } from './FilterByTags.js';
import { FilterByAccounts } from './FilterByAccounts.js';
import { ProjectLinks } from '../ProjectLinks/ProjectLinks.js';

import './Filters.css';

class Filters extends Component {
    render() {
        return (
            <div className={classNames('Filters', this.props.className)}>
                <div>
                    <ProjectLinks />
                </div>

                <div>
                    <FilterByAccounts />
                </div>

                <div>
                    <FilterByTags />
                </div>
            </div>
        );
    }
}
Filters.propTypes = {
    className: PropTypes.string
};
Filters.defaultProps = {
    className: undefined
};

export { Filters };
