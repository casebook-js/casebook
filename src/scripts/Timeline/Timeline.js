import { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Timeline.css';
import { VerticalTimeline } from './VerticalTimeline.js';

class Timeline extends Component {
    render() {
        return (
            <div className={classNames('Timeline', this.props.className)}>
                <div className="Timeline-container">
                    <VerticalTimeline
                        itemClicked={this.props.itemClicked}
                        showInfoAboutFilters={this.props.showInfoAboutFilters}
                        autoScrollInContainer={this.props.autoScrollInContainer}
                    />
                </div>
            </div>
        );
    }
}
Timeline.propTypes = {
    className: PropTypes.string,
    itemClicked: PropTypes.func,
    showInfoAboutFilters: PropTypes.bool,
    autoScrollInContainer: PropTypes.string.isRequired
};
Timeline.defaultProps = {
    className: undefined,
    itemClicked: undefined,
    showInfoAboutFilters: undefined
};

export { Timeline };
