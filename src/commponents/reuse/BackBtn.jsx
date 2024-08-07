
import { Button } from '@mui/material';
import { Icon } from '@iconify/react';
import React from 'react'

import { NavLink, useNavigate } from 'react-router-dom'

export const Cancel = () => {
    let navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    }
    return (
        <Button onClick={() => handleBack()} color="error" id='btnCancel' variant="contained"
            style={{ float: 'right', marginLeft: '5px', color: '#fff', cursor: 'pointer', fontFamily: 'Roboto","Helvetica","Arial",sans-serif', fontSize: '15px' }}>
            Cancel</Button>
    );
};

export const BackBtn = () => {
    let navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    }
    return (
        <>
            <span onClick={() => handleBack()}
                style={{ float: 'right', marginLeft: '5px', color: '#551a8b', cursor: 'pointer', fontSize: '15px' }}>
                <Icon icon="vaadin:arrow-backward" height=" 22" width="22" style={{ color: '#551a8b', marginRight: '5px' }} />Go Back</span>

        </>
    );
};