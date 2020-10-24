/* eslint-disable quotes */

import configBuild from './config-build.js';

const configUi = {
    "subtitle": configBuild.subtitle,
    "share": {
        "enabled": true,
        "links": {
            "github": {
                "enabled": true,
                "url": "https://github.com/casebook-js/casebook"
            },
            "twitter": {
                "enabled": true,
                "url": `http://twitter.com/intent/tweet?url=https://casebook-js.github.io/casebook/&text=${encodeURIComponent('Casebook is a general purpose, static timeline presentation UI. It is available as an open source project on GitHub.')}&via=casebookJs`
            },
            "facebook": {
                "enabled": true,
                "url": `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://casebook-js.github.io/casebook/')}`
            }
        }
    },
    "introduction": {
        "enabled": true,
        "title": "Welcome to Casebook!",
        "subtitle": "This live demo shows timeline of events related to the COVID-19 pandemic.",
        "description": (
            <div>
                <div>
                    With Casebook, you can create a timeline presentation. Basically, it is a filter-able timeline about a topic.
                </div>

                <div>
                    <br />
                    <div>
                        How to create your own?
                    </div>
                    <ul style={{ listStyle: 'disc', paddingLeft: 40, marginTop: 10 }}>
                        <li>
                            <span>Fork the code repository from </span>
                            <a
                                href="https://github.com/casebook-js/casebook"
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                            >
                                GitHub
                            </a>
                        </li>
                        <li style={{ marginTop: 4 }}>
                            Run:
                            <code
                                style={{
                                    background: '#dbf7db',
                                    border: '1px solid #ddd',
                                    fontFamily: 'monospace',
                                    paddingTop: 1,
                                    paddingBottom: 1,
                                    paddingLeft: 5,
                                    marginLeft: 5,
                                    paddingRight: 5,
                                    fontSize: 12,
                                    borderRadius: 3
                                }}
                            >
                                npm install
                            </code>
                        </li>
                        <li style={{ marginTop: 4 }}>
                            Run:
                            <code
                                style={{
                                    background: '#dbf7db',
                                    border: '1px solid #ddd',
                                    fontFamily: 'monospace',
                                    paddingTop: 1,
                                    paddingBottom: 1,
                                    paddingLeft: 5,
                                    marginLeft: 5,
                                    paddingRight: 5,
                                    fontSize: 12,
                                    borderRadius: 3
                                }}
                            >
                                npm start
                            </code>
                        </li>
                        <li style={{ marginTop: 4 }}>
                            <span>For detailed instructions about setup and customization of contents or functionality, view project&apos;s  </span>
                            <a
                                href="https://github.com/casebook-js/casebook/blob/master/README.md"
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                            >
                                README.md
                            </a>
                        </li>
                    </ul>
                </div>

                <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
                    <div style={{ paddingRight: 10 }}>
                        <a
                            href="https://github.com/casebook-js/casebook"
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                            style={{
                                display: 'flex',
                                background: '#336699',
                                padding: '10px 15px',
                                borderRadius: 5,
                                color: '#fff',
                                textDecoration: 'none',
                                alignItems: 'center',
                                textAlign: 'center'
                            }}
                        >
                            <span style={{ display: 'inline-block' }}>
                                <svg height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true" fill="#fff">
                                    <path fillRule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z" />
                                </svg>
                            </span>
                            <span style={{ display: 'inline-block', marginLeft: 7 }}>
                                Star us on GitHub
                            </span>
                        </a>
                    </div>
                    <div style={{ paddingLeft: 10 }}>
                        <a
                            href="https://github.com/casebook-js/casebook/issues"
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                            style={{
                                display: 'flex',
                                background: '#336699',
                                padding: '10px 15px',
                                borderRadius: 5,
                                color: '#fff',
                                textDecoration: 'none',
                                alignItems: 'center',
                                textAlign: 'center'
                            }}
                        >
                            <span style={{ display: 'inline-block' }}>
                                <svg display="none inline" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true" fill="#fff">
                                    <path fillRule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z" />
                                </svg>
                            </span>
                            <span style={{ display: 'inline-block', marginLeft: 7 }}>
                                Create issue
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
};

export { configUi };
