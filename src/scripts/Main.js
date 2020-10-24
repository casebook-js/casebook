import { Component } from 'react';
import MediaQuery from 'react-responsive';

import { Feed } from './Feed.js';
import { Filters } from './Filters/Filters.js';
import { Timeline } from './Timeline/Timeline.js';
import './reset.css';

import './Main.css';
import { Header } from './Header.js';

import { topBarHeight } from './constants.js';

class Main extends Component {
    render() {
        return (
            <div className="Main">
                <Header />
                <div className="main-body" style={{ display: 'flex' }}>
                    <MediaQuery minWidth={710}>
                        <div style={{ marginLeft: 15 }} />
                    </MediaQuery>

                    <MediaQuery minWidth={960}>
                        <div style={{ display: 'flex' }}>
                            <div style={{ marginLeft: 15 }} />
                            <Filters />
                        </div>
                    </MediaQuery>

                    <div className="FeedContainer">
                        <MediaQuery minWidth={710}>
                            <div style={{ marginLeft: 15 }} />
                        </MediaQuery>
                        <Feed />
                        <MediaQuery minWidth={710}>
                            <div style={{ marginRight: 15 }} />
                        </MediaQuery>
                    </div>

                    <MediaQuery minWidth={1240}>
                        <div style={{ display: 'flex' }}>
                            <div style={{ width: 250 }}>
                                <div
                                    className="main-right-fixed"
                                    style={{
                                        position: 'fixed',
                                        top: topBarHeight + 20,
                                        bottom: topBarHeight + 20,
                                        width: 'inherit'
                                    }}
                                >
                                    <Timeline
                                        autoScrollInContainer=".main-right-fixed"
                                    />
                                </div>
                            </div>
                            <div style={{ marginRight: 15 }} />
                        </div>
                    </MediaQuery>

                    <MediaQuery minWidth={710}>
                        <div style={{ marginRight: 15 }} />
                    </MediaQuery>
                </div>
            </div>
        );
    }
}

export { Main };
