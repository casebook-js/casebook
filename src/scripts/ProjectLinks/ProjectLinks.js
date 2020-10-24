import { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Accordion from '@material-ui/core/Accordion/index.js';
import AccordionSummary from '@material-ui/core/AccordionSummary/index.js';
import AccordionDetails from '@material-ui/core/AccordionDetails/index.js';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore.js';

import ShareIcon from '@material-ui/icons/Share.js';

import GitHubIcon from '@material-ui/icons/GitHub.js';
import TwitterIcon from '@material-ui/icons/Twitter.js';
import FacebookIcon from '@material-ui/icons/Facebook.js';

import { configUi } from '../../../data/config/config-ui.js';

import './ProjectLinks.css';

const flagExpandProjectLinksFromLocalStorage = (function () {
    try {
        const valueFromLocalStorage = localStorage.getItem('flagExpandProjectLinks');
        if (valueFromLocalStorage) {
            return !(valueFromLocalStorage === 'no');
        } else {
            return true; // Default: true
        }
    } catch (e) {
        return true;
    }
}());
let flagExpandProjectLinksToUse = flagExpandProjectLinksFromLocalStorage;

class ProjectLinks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expandProjectLinks: flagExpandProjectLinksToUse
        };
    }

    render() {
        const {
            expandProjectLinks
        } = this.state;

        const linksConfig = configUi.share?.links || {};
        const githubConfig = linksConfig.github || {};
        const twitterConfig = linksConfig.twitter || {};
        const facebookConfig = linksConfig.facebook || {};

        return (
            configUi.share?.enabled &&
            <div className={classNames('ProjectLinks', this.props.className)} style={{ marginBottom: 20 }}>
                <Accordion
                    square
                    TransitionProps={{ unmountOnExit: true }}
                    style={{ backgroundColor: '#eee' }}
                    expanded={expandProjectLinks}
                    onChange={(evt, expanded) => {
                        this.setState({
                            expandProjectLinks: expanded
                        });
                        try {
                            if (expanded) {
                                flagExpandProjectLinksToUse = true;
                                localStorage.setItem('flagExpandProjectLinks', 'yes');
                            } else {
                                flagExpandProjectLinksToUse = false;
                                localStorage.setItem('flagExpandProjectLinks', 'no');
                            }
                        } catch (e) {
                            // Ignore
                        }
                    }}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <ShareIcon />
                        <div
                            className="accordion-summary"
                            style={{ marginLeft: 12, lineHeight: '24px' }}
                        >
                            Share
                        </div>
                    </AccordionSummary>
                    <AccordionDetails style={{ backgroundColor: '#ddd' }}>
                        <div style={{ paddingTop: 8, width: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-evenly', fontSize: '12px' }}>
                                {
                                    githubConfig.enabled &&
                                    <div>
                                        <a href={githubConfig.url} target="_blank" rel="nofollow noopener noreferrer" style={{ display: 'block', color: '#000', textDecoration: 'none' }}>
                                            <div style={{ textAlign: 'center', marginBottom: 5 }}>
                                                <GitHubIcon />
                                            </div>
                                            <div>
                                                GitHub
                                            </div>
                                        </a>
                                    </div>
                                }
                                {
                                    facebookConfig.enabled &&
                                    <div>
                                        <a href={facebookConfig.url} target="_blank" rel="nofollow noopener noreferrer" style={{ display: 'block', color: '#000', textDecoration: 'none' }}>
                                            <div style={{ textAlign: 'center', marginBottom: 5 }}>
                                                <FacebookIcon />
                                            </div>
                                            <div>
                                                Facebook
                                            </div>
                                        </a>
                                    </div>
                                }
                                {
                                    twitterConfig.enabled &&
                                    <div>
                                        <a href={twitterConfig.url} target="_blank" rel="nofollow noopener noreferrer" style={{ display: 'block', color: '#000', textDecoration: 'none' }}>
                                            <div style={{ textAlign: 'center', marginBottom: 5 }}>
                                                <TwitterIcon />
                                            </div>
                                            <div>
                                                Twitter
                                            </div>
                                        </a>
                                    </div>
                                }
                            </div>

                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
        );
    }
}
ProjectLinks.propTypes = {
    className: PropTypes.string
};
ProjectLinks.defaultProps = {
    className: undefined
};

export { ProjectLinks };
