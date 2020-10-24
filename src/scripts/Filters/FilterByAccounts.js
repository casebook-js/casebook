import { Component } from 'react';

import Accordion from '@material-ui/core/Accordion/index.js';
import AccordionSummary from '@material-ui/core/AccordionSummary/index.js';
import AccordionDetails from '@material-ui/core/AccordionDetails/index.js';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore.js';

import PeopleIcon from '@material-ui/icons/People.js';

import './FilterByAccounts.css';

import { AccountsListForFilter } from './AccountsListForFilter.js';

const flagExpandAccountsFromLocalStorage = (function () {
    try {
        const valueFromLocalStorage = localStorage.getItem('flagExpandAccounts');
        if (valueFromLocalStorage) {
            return !(valueFromLocalStorage === 'no');
        } else {
            return false; // Default: false
        }
    } catch (e) {
        return true;
    }
}());
let flagExpandAccountsToUse = flagExpandAccountsFromLocalStorage;

class FilterByAccounts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flagExpandAccounts: flagExpandAccountsToUse
        };
    }

    render() {
        const {
            flagExpandAccounts
        } = this.state;

        return (
            <div className="FilterByAccounts">
                <Accordion
                    square
                    TransitionProps={{ unmountOnExit: true }}
                    style={{ backgroundColor: '#eee' }}
                    expanded={flagExpandAccounts}
                    onChange={(evt, expanded) => {
                        this.setState({
                            flagExpandAccounts: expanded
                        });
                        try {
                            if (expanded) {
                                flagExpandAccountsToUse = true;
                                localStorage.setItem('flagExpandAccounts', 'yes');
                            } else {
                                flagExpandAccountsToUse = false;
                                localStorage.setItem('flagExpandAccounts', 'no');
                            }
                        } catch (e) {
                            // Ignore
                        }
                    }}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <PeopleIcon />
                        <div
                            className="accordion-summary"
                            style={{ marginLeft: 12, lineHeight: '24px' }}
                        >
                            Accounts
                        </div>
                    </AccordionSummary>
                    <AccordionDetails style={{ backgroundColor: '#ddd' }}>
                        <div style={{ paddingTop: 8, width: '100%' }}>
                            <AccountsListForFilter />
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
        );
    }
}

export { FilterByAccounts };
