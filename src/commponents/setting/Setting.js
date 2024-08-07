import { Box, Button, ButtonGroup, Divider, Grid, IconButton, MenuItem, Paper, Snackbar, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import visitor from "../images/guest_pass.jpeg"
import { useForm } from "react-hook-form"
import CloseIcon from '@mui/icons-material/Close';
import { Icon } from '@iconify/react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';



const Setting = (props) => {
    // const { handleSubmit } = useForm();
    // const dispatch = useDispatch()
    // const editData = props.editInfo;
    // const editid = editData && editData._id;
    // const [successMessage, setSuccessMessage] = useState(null)

    // const [data, setData] = useState({
    //     _id: editid,
    //     account_name: editData ? editData.account_name : '',
    //     bank_name: editData ? editData.bank_name : '',
    //     account_no: editData ? editData.account_no : '',
    //     account_type: editData ? editData.account_type : '',
    //     branch_name: editData ? editData.branch_name : '',
    //     ifsc_code: editData ? editData.ifsc_code : '',
    // })

    // const handleChange = ({ target }) => {
    //     const value = target.value;
    //     setData({
    //         ...data,
    //         [target.name]: value,
    //     });
    //     data[target.name] = target.value;

    // }

    // const onSubmit = async (event) => {
    //     let sendingData = {
    //         ...data,
    //         changedUpdatedValue: 'edit'
    //     }
    //     if (editData) {
    //         dispatch(editDeleteBank(sendingData));
    //         setSuccessMessage("Record Updated Successfully!")
    //         props.onEdit();
    //         props.handleCloseDialog();
    //     } else {
    //         dispatch(addBank(sendingData));
    //         setSuccessMessage("Record Added Successfully!")
    //         props.onEdit();
    //         props.handleCloseDialog();
    //     }
    // }

    // const handleCloseSuccessMsg = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }
    //     setSuccessMessage(false)
    // };

    // const actionMsg = (
    //     <React.Fragment>
    //         <IconButton
    //             size="small"
    //             aria-label="close"
    //             color="inherit"
    //             onClick={handleCloseSuccessMsg}
    //         >
    //             <CloseIcon fontSize="small" />
    //         </IconButton>
    //     </React.Fragment>
    // );

    return (
        <>
            <Paper sx={{ boxShadow: 'none', maxWidth: '500px' }}>
               <Typography>Setting  </Typography>
            </Paper>
        </>
    )
}
export default Setting;