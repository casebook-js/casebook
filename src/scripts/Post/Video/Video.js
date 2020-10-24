import { Component } from 'react';
import PropTypes from 'prop-types';

import VisibilitySensor from 'react-visibility-sensor';

import './Video.css';

class Video extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scrolledTo: false,
            timer: null
        };

        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    }

    handleVisibilityChange(flagVisible) {
        if (flagVisible) {
            const timer = setTimeout(() => {
                this.setState({
                    scrolledTo: true
                });
            }, 100);
            this.setState({
                timer
            });
        } else {
            if (this.state.timer) {
                clearTimeout(this.state.timer);
            }
        }
    }

    render() {
        const {
            id,
            start,
            end
        } = this.props;
        let url = `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
        if (start || end) {
            if (start) {
                url += `&start=${start}`;
            }
            if (end) {
                url += `&end=${end}`;
            }
        }
        return (
            <div className="Video">
                {
                    !this.state.scrolledTo &&
                    <VisibilitySensor
                        partialVisibility
                        resizeCheck
                        resizeDelay={150}
                        onChange={this.handleVisibilityChange}
                    >
                        <div style={{ height: 300 }}>&nbsp;</div>
                    </VisibilitySensor>
                }
                {
                    this.state.scrolledTo &&
                    <iframe
                        title="YouTube Video"
                        width="100%"
                        height="300"
                        src={url}
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                }
            </div>
        );
    }
}
Video.propTypes = {
    id: PropTypes.string.isRequired,
    start: PropTypes.number,
    end: PropTypes.number
};
Video.defaultProps = {
    start: undefined,
    end: undefined
};

export { Video };
