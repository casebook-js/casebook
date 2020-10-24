/* globals twttr */

import { Component, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';

import VisibilitySensor from 'react-visibility-sensor';

import './Twitter.css';

const ensureTwitterScript = function () {
    if (!ensureTwitterScript.loadStarted) {
        ensureTwitterScript.loadStarted = true;
        const script = document.createElement('script');
        script.src = 'https://platform.twitter.com/widgets.js';
        document.body.appendChild(script);
    }
};

function setTimeoutAsync(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const globalVariableExistsAsync = async function (globalVariableName) {
    let counter = 0;
    // eslint-disable-next-line no-constant-condition
    while (true) {
        if (window[globalVariableName] === undefined) {
            await setTimeoutAsync(10);
            counter++;
            if (counter > 0 && counter % 3000 === 0) {
                // eslint-disable-next-line no-console
                console.warn(`Warning: Variable ${globalVariableName} is not yet set.`);
            }
        } else {
            break;
        }
    }
};

class Twitter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scrolledTo: false,
            timer: null
        };

        this.myRef = createRef();

        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    }

    handleVisibilityChange(flagVisible) {
        if (flagVisible) {
            if (!this.state.timer) {
                const timer = setTimeout(() => {
                    this.setState({
                        scrolledTo: true
                    });

                    setTimeout(async () => {
                        ensureTwitterScript();
                        await globalVariableExistsAsync('twttr');
                        await twttr.widgets.load(this.myRef.current);
                    });
                }, 100);
                this.setState({
                    timer
                });
            }
        } else {
            if (this.state.timer) {
                clearTimeout(this.state.timer);
            }
        }
    }

    render() {
        const {
            url,
            fallback
        } = this.props;

        const contents = (
            <Fragment>
                <span>Loading ... </span>
                <a
                    href={url}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                >
                    {url}
                </a>
                {
                    fallback &&
                    <Fragment>
                        <br />
                        <br />
                        <span>{fallback.name} - {fallback.account}</span>
                        <br />
                        <br />
                        <span>{fallback.text}</span>
                    </Fragment>
                }
            </Fragment>
        );
        const blockquote = (
            <blockquote className="twitter-tweet" data-dnt="true">
                {contents}
            </blockquote>
        );
        return (
            <div className="Twitter" ref={this.myRef}>
                <VisibilitySensor
                    partialVisibility
                    resizeCheck
                    active={!this.state.scrolledTo}
                    resizeDelay={150}
                    onChange={this.handleVisibilityChange}
                >
                    <div>
                        {
                            this.state.scrolledTo &&
                            blockquote
                        }
                        {
                            !this.state.scrolledTo &&
                            contents
                        }
                    </div>
                </VisibilitySensor>
            </div>
        );
    }
}
Twitter.propTypes = {
    url: PropTypes.string.isRequired,
    fallback: PropTypes.object
};
Twitter.defaultProps = {
    fallback: undefined
};

export { Twitter };
