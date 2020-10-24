import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog/index.js';
import DialogContent from '@material-ui/core/DialogContent/index.js';
import DialogTitle from '@material-ui/core/DialogTitle/index.js';
import useMediaQuery from '@material-ui/core/useMediaQuery/index.js';
import { useTheme } from '@material-ui/core/styles/index.js';

import IconButton from '@material-ui/core/IconButton/index.js';
import ArrowBackIcon from '@material-ui/icons/ArrowBack.js';

import './ResponsiveDialog.css';

function ResponsiveDialog(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClose = () => {
        if (props.onClose) {
            props.onClose();
        }
    };

    return (
        <Dialog
            fullScreen={fullScreen}
            open
            onClose={handleClose}
            className="ResponsiveDialog"
        >
            <DialogTitle>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                >
                    <ArrowBackIcon />
                </IconButton>
                {props.headerText}
            </DialogTitle>
            <DialogContent>
                <div>
                    {props.children}
                </div>
            </DialogContent>
        </Dialog>
    );
}
ResponsiveDialog.propTypes = {
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func,
    headerText: PropTypes.element.isRequired
};
ResponsiveDialog.defaultProps = {
    onClose: undefined
};

export { ResponsiveDialog };
