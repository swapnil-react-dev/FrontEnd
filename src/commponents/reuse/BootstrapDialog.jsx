import React from 'react';
import {DialogTitle, Dialog,IconButton} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
// ----dilog ---- 
export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        paddingLeft: theme.spacing(4),
        // padding: theme.spacing(1),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
    return (
        <DialogTitle sx={{ m: 0, p: 1,pl:4, backgroundColor: '#336699', color: '#ffff',float:'left' }} {...other} >
            {children}
            {onClose ? (
               <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        float:'right'
                    }}
                >
                    <CloseIcon style={{ height: '18px',color:'white' }} />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};
// ----- dilog end