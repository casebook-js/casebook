import { Component } from 'react';

import Accordion from '@material-ui/core/Accordion/index.js';
import AccordionSummary from '@material-ui/core/AccordionSummary/index.js';
import AccordionDetails from '@material-ui/core/AccordionDetails/index.js';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore.js';

import LocalOfferIcon from '@material-ui/icons/LocalOffer.js';

import './FilterByTags.css';

import { TagsListForFilter } from './TagsListForFilter.js';

const flagExpandTagsFromLocalStorage = (function () {
    try {
        const valueFromLocalStorage = localStorage.getItem('flagExpandTags');
        if (valueFromLocalStorage) {
            return !(valueFromLocalStorage === 'no');
        } else {
            return true; // Default: true
        }
    } catch (e) {
        return true;
    }
}());
let flagExpandTagsToUse = flagExpandTagsFromLocalStorage;

class FilterByTags extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flagExpandTags: flagExpandTagsToUse
        };
    }

    render() {
        const {
            flagExpandTags
        } = this.state;

        return (
            <div className="FilterByTags">
                <Accordion
                    square
                    TransitionProps={{ unmountOnExit: true }}
                    style={{ backgroundColor: '#eee' }}
                    expanded={flagExpandTags}
                    onChange={(evt, expanded) => {
                        this.setState({
                            flagExpandTags: expanded
                        });
                        try {
                            if (expanded) {
                                flagExpandTagsToUse = true;
                                localStorage.setItem('flagExpandTags', 'yes');
                            } else {
                                flagExpandTagsToUse = false;
                                localStorage.setItem('flagExpandTags', 'no');
                            }
                        } catch (e) {
                            // Ignore
                        }
                    }}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <LocalOfferIcon />
                        <div
                            className="accordion-summary"
                            style={{ marginLeft: 12, lineHeight: '24px' }}
                        >
                            Tags
                        </div>
                    </AccordionSummary>
                    <AccordionDetails style={{ backgroundColor: '#ddd' }}>
                        <div style={{ paddingTop: 8, width: '100%' }}>
                            <TagsListForFilter />
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
        );
    }
}

export { FilterByTags };
