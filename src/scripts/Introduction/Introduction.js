import { Component } from 'react';

import Accordion from '@material-ui/core/Accordion/index.js';
import AccordionSummary from '@material-ui/core/AccordionSummary/index.js';
import AccordionDetails from '@material-ui/core/AccordionDetails/index.js';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore.js';

import { configUi } from '../../../data/config/config-ui.js';

import { nl2br } from '../../utils/utils.js';

import './Introduction.css';

const flagExpandIntroduction = (function () {
    try {
        return !(localStorage.getItem('expandIntroduction') === 'no');
    } catch (e) {
        return true;
    }
}());

const configIntroduction = configUi?.introduction;

const renderTextOrReactElement = function (item) {
    if (typeof item === 'string') {
        return nl2br(item);
    } else if (item) {
        return item;
    } else {
        return null;
    }
};

class Introduction extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expandIntroduction: flagExpandIntroduction
        };
    }

    render() {
        const {
            expandIntroduction
        } = this.state;

        return (
            configIntroduction?.enabled &&
            <div className="Introduction">
                <Accordion
                    square
                    TransitionProps={{ unmountOnExit: true }}
                    expanded={expandIntroduction}
                    onChange={(evt, expanded) => {
                        this.setState({
                            expandIntroduction: expanded
                        });
                        try {
                            if (expanded) {
                                localStorage.setItem('expandIntroduction', 'yes');
                            } else {
                                localStorage.setItem('expandIntroduction', 'no');
                            }
                        } catch (e) {
                            // Ignore
                        }
                    }}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <div
                            className="accordion-summary"
                            style={{ paddingTop: 4 }}
                        >
                            <div style={{ fontSize: '22px' }}>
                                {renderTextOrReactElement(configIntroduction?.title)}
                            </div>
                            <div style={{ paddingTop: 2, color: 'rgba(0, 0, 0, 0.54)' }}>
                                {renderTextOrReactElement(configIntroduction?.subtitle)}
                            </div>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails style={{ backgroundColor: '#ddd' }}>
                        <div style={{ paddingTop: 8, width: '100%' }}>
                            {
                                renderTextOrReactElement(configIntroduction?.description)
                            }
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
        );
    }
}

export { Introduction };
