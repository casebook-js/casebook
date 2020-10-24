import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import {
    Link,
    Route
} from 'react-router-dom';

import VisibilitySensor from 'react-visibility-sensor';
import { SizeMe } from 'react-sizeme';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import './Images.css';

class Images extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scrolledTo: false,
            timer: null,
            showLightBox: false,
            photoIndex: 0
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
            images,
            postUid
        } = this.props;
        const image = images[0];
        const alt = image.alt;
        const url = `./data/images/posts/${image.src}`;

        const {
            photoIndex
        } = this.state;
        const mainSrc = `./data/images/posts/${images[photoIndex].src}`;

        let prevSrc;
        let nextSrc;
        if (images.length >= 2) {
            prevSrc = `./data/images/posts/${images[(photoIndex + images.length - 1) % images.length].src}`;
            nextSrc = `./data/images/posts/${images[(photoIndex + 1) % images.length].src}`;
        }

        return (
            <div className="Images">
                <SizeMe>
                    {
                        (ob) => {
                            const elSize = ob.size;
                            const elWidth = elSize.width;
                            let elMinHeight;
                            if (elWidth) {
                                elMinHeight = Math.round(elWidth * (image.height / image.width));
                            }

                            return (
                                <div style={{ minHeight: elMinHeight, width: '100%' }}>
                                    <VisibilitySensor
                                        active={!this.state.scrolledTo}
                                        partialVisibility
                                        resizeCheck
                                        resizeDelay={150}
                                        onChange={this.handleVisibilityChange}
                                        style={{ minHeight: elMinHeight, height: '100%' }}
                                    >
                                        <Fragment>
                                            {
                                                !this.state.scrolledTo &&
                                                <div style={{ minHeight: elMinHeight, width: '100%' }}>&nbsp;</div>
                                            }
                                            {
                                                this.state.scrolledTo &&
                                                ((() => {
                                                    let srcset = [];
                                                    const sizes = [350, 700, 1050, 1400, 2100, 3150];
                                                    let sizeIndexToUse = 0;
                                                    for (let i = sizes.length - 1; i >= 0; i--) {
                                                        const requiredWidth = sizes[i];
                                                        if (elSize.width <= requiredWidth) {
                                                            sizeIndexToUse = i;
                                                        }
                                                    }
                                                    const widthToUse = sizes[sizeIndexToUse];

                                                    for (let i = 0; i < 3; i++) {
                                                        let path = url.split('.');
                                                        const widthForCalculation = widthToUse * (i + 1);
                                                        if (widthForCalculation < image.width) {
                                                            const requiredHeight = Math.round((widthForCalculation * image.height) / image.width);
                                                            path.splice(path.length - 1, 0, `resized-${widthForCalculation}x${requiredHeight}`);
                                                            path = path.join('.');
                                                            srcset.push(`${path} ${i + 1}x`);
                                                        }
                                                    }

                                                    srcset = srcset.join(', ');

                                                    return (
                                                        <div className="images-container" style={{ minHeight: elMinHeight, width: '100%' }}>
                                                            <Link
                                                                to={(loc) => {
                                                                    return {
                                                                        pathname: '',
                                                                        state: {
                                                                            ...loc.state,
                                                                            locationStateShowLightBox: postUid
                                                                        }
                                                                    };
                                                                }}
                                                                onClick={() => {
                                                                    this.setState({
                                                                        showLightBox: true
                                                                    });
                                                                }}
                                                            >
                                                                <img
                                                                    loading="lazy"
                                                                    alt={alt}
                                                                    src={url}
                                                                    srcSet={srcset}
                                                                    style={{
                                                                        width: '100%',
                                                                        cursor: 'pointer',
                                                                        minHeight: elMinHeight
                                                                    }}
                                                                />
                                                                {
                                                                    images.length >= 2 &&
                                                                    <div className="more-images">
                                                                        {`+${images.length - 1}`}
                                                                    </div>
                                                                }
                                                            </Link>
                                                        </div>
                                                    );
                                                })())
                                            }
                                        </Fragment>
                                    </VisibilitySensor>
                                    {
                                        true &&
                                        <Route
                                            // eslint-disable-next-line react/no-children-prop
                                            children={(props) => {
                                                if (
                                                    props.location.state &&
                                                    props.location.state.locationStateShowLightBox === postUid &&
                                                    this.state.showLightBox
                                                ) {
                                                    return (
                                                        <Lightbox
                                                            mainSrc={mainSrc}
                                                            nextSrc={nextSrc}
                                                            prevSrc={prevSrc}
                                                            reactModalStyle={{
                                                                overlay: {
                                                                    zIndex: 20000
                                                                }
                                                            }}
                                                            onCloseRequest={() => {
                                                                props.history.goBack();
                                                                setTimeout(() => {
                                                                    this.setState({ showLightBox: false });
                                                                });
                                                            }}
                                                            onMovePrevRequest={() => {
                                                                this.setState({
                                                                    photoIndex: (photoIndex + images.length - 1) % images.length
                                                                });
                                                            }}
                                                            onMoveNextRequest={() => {
                                                                this.setState({
                                                                    photoIndex: (photoIndex + 1) % images.length
                                                                });
                                                            }}
                                                        />
                                                    );
                                                } else {
                                                    return null;
                                                }
                                            }}
                                        />
                                    }
                                </div>
                            );
                        }
                    }
                </SizeMe>
            </div>
        );
    }
}
Images.propTypes = {
    images: PropTypes.array.isRequired,
    postUid: PropTypes.string.isRequired
};

export { Images };
