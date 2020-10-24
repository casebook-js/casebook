import { Component } from 'react';
import PropTypes from 'prop-types';

import MediaQuery from 'react-responsive';

import AppBar from '@material-ui/core/AppBar/index.js';
import Toolbar from '@material-ui/core/Toolbar/index.js';

import Drawer from '@material-ui/core/Drawer/index.js';
import IconButton from '@material-ui/core/IconButton/index.js';

import MenuIcon from '@material-ui/icons/Menu.js';
import HistoryIcon from '@material-ui/icons/History.js';

import './Header.css';

import useScrollTrigger from '@material-ui/core/useScrollTrigger/index.js';
import Slide from '@material-ui/core/Slide/index.js';

import { withStyles } from '@material-ui/core/styles/index.js';

import Accordion from '@material-ui/core/Accordion/index.js';
import AccordionSummary from '@material-ui/core/AccordionSummary/index.js';
import AccordionDetails from '@material-ui/core/AccordionDetails/index.js';

import { Timeline } from './Timeline/Timeline.js';
import { Filters } from './Filters/Filters.js';

import { configUi } from '../../data/config/config-ui.js';

import { topBarHeight, topBarIconWidth } from './constants.js';

const styles = {
    rootAppBar: {
        backgroundColor: '#369'
    },
    rootToolbar: {
        height: topBarHeight,
        minHeight: 'unset'
    }
};

function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}
HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func
};
HideOnScroll.defaultProps = {
    window: undefined
};

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flagLeftDrawerOpen: false,
            flagRightDrawerOpen: false
        };

        this.showLeftDrawer = this.showLeftDrawer.bind(this);
        this.hideLeftDrawer = this.hideLeftDrawer.bind(this);

        this.showRightDrawer = this.showRightDrawer.bind(this);
        this.hideRightDrawer = this.hideRightDrawer.bind(this);
    }

    showLeftDrawer() {
        this.setState({
            flagLeftDrawerOpen: true
        });
    }

    hideLeftDrawer() {
        this.setState({
            flagLeftDrawerOpen: false
        });
    }

    showRightDrawer() {
        this.setState({
            flagRightDrawerOpen: true
        });
    }

    hideRightDrawer() {
        this.setState({
            flagRightDrawerOpen: false
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <div>
                    <div className="Header_Bar">
                        <HideOnScroll>
                            <AppBar classes={{ root: classes.rootAppBar }}>
                                <Toolbar classes={{ root: classes.rootToolbar }} style={{ justifyContent: 'center' }}>
                                    <MediaQuery maxWidth={959}>
                                        <IconButton
                                            edge="start"
                                            color="inherit"
                                            onClick={this.showLeftDrawer}
                                        >
                                            <MenuIcon />
                                        </IconButton>
                                    </MediaQuery>
                                    <MediaQuery minWidth={960}>
                                        <div style={{ marginLeft: topBarIconWidth - 13 }} />
                                    </MediaQuery>

                                    <div
                                        style={{
                                            display: 'flex',
                                            fontSize: 24,
                                            paddingTop: 2,
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            marginLeft: 'auto',
                                            marginRight: 'auto'
                                        }}
                                    >
                                        <a href="." style={{ color: '#fff', textDecoration: 'none' }}>
                                            <img
                                                loading="lazy"
                                                alt="Logo"
                                                src="./images/favicons/favicon-22.png"
                                                srcSet="./images/favicons/favicon-22.png 1x, ./images/favicons/favicon-44.png 2x, ./images/favicons/favicon-66.png 3x"
                                                style={{
                                                    width: 22,
                                                    height: 22,
                                                    display: 'inline-block',
                                                    opacity: 0.8,
                                                    marginRight: 5,
                                                    marginBottom: -2
                                                }}
                                            />
                                            <span style={{ display: 'inline-block' }}>
                                                <span>Casebook</span>
                                                <span style={{ color: '#ddd', fontSize: 14 }}>
                                                    &nbsp;/ { configUi.subtitle }
                                                </span>
                                            </span>
                                        </a>
                                    </div>

                                    <MediaQuery maxWidth={1239}>
                                        <IconButton
                                            edge="end"
                                            color="inherit"
                                            onClick={this.showRightDrawer}
                                        >
                                            <HistoryIcon />
                                        </IconButton>
                                    </MediaQuery>
                                    <MediaQuery minWidth={1240}>
                                        <div style={{ marginRight: topBarIconWidth - 13 }} />
                                    </MediaQuery>
                                </Toolbar>
                            </AppBar>
                        </HideOnScroll>

                        <Toolbar classes={{ root: classes.rootToolbar }} />

                        <Drawer
                            anchor="left"
                            open={this.state.flagLeftDrawerOpen}
                            onClose={this.hideLeftDrawer}
                        >
                            <Filters />
                        </Drawer>

                        <Drawer
                            anchor="right"
                            open={this.state.flagRightDrawerOpen}
                            ModalProps={{
                                keepMounted: true,
                                disableScrollLock: true
                            }}
                            onClose={this.hideRightDrawer}
                            className="RightDrawer"
                        >
                            <div>
                                <Accordion
                                    square
                                    style={{ backgroundColor: '#eee' }}
                                    expanded
                                >
                                    <AccordionSummary>
                                        <HistoryIcon />
                                        <div className="accordion-summary" style={{ marginLeft: 20, lineHeight: '24px' }}>Timeline</div>
                                    </AccordionSummary>
                                    <AccordionDetails style={{ backgroundColor: '#ddd' }}>
                                        <div style={{ paddingTop: 16, paddingLeft: 12, paddingRight: 4 }}>
                                            <Timeline
                                                itemClicked={this.hideRightDrawer}
                                                showInfoAboutFilters
                                                autoScrollInContainer=".MuiDrawer-paper"
                                            />
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </Drawer>
                    </div>
                </div>
            </div>
        );
    }
}
Header.propTypes = {
    classes: PropTypes.object.isRequired
};

const _Header = withStyles(styles)(Header);
export { _Header as Header };
