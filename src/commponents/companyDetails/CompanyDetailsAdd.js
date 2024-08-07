import { Box, Button, ButtonGroup, Divider, Grid, IconButton, MenuItem, Paper, Snackbar, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import demo_logo from "../images/comany_demo_logo.png"
import { useForm } from "react-hook-form"
import CloseIcon from '@mui/icons-material/Close';
import { Icon } from '@iconify/react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { VisitorInput } from "../reuse/VisitorInput";
import { addCompanyDetails, editDeleteCompanyDetails } from "../../actions/actions";


const stateList = [
    { value: 'Andhra Pradesh', label: 'Andhra Pradesh', },
    { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh', },
    { value: 'Assam', label: 'Assam', },
    { value: 'Bihar', label: 'Bihar', },
    { value: 'Chhattisgarh', label: 'Chhattisgarh', },
    { value: 'Goa', label: 'Goa', },
    { value: 'Gujarat', label: 'Gujarat', },
    { value: 'Haryana', label: 'Haryana', },
    { value: 'Himachal Pradesh', label: 'Himachal Pradesh', },
    { value: 'Jharkhand', label: 'Jharkhand', },
    { value: 'Karnataka', label: 'Karnataka', },
    { value: 'Kerala', label: 'Kerala', },
    { value: 'Maharashtra', label: 'Maharashtra', },
    { value: 'Madhya Pradesh', label: 'Madhya Pradesh', },
    { value: 'Manipur', label: 'Manipur', },
    { value: 'Meghalaya', label: 'Meghalaya', },
    { value: 'Mizoram', label: 'Mizoram', },
    { value: 'Nagaland', label: 'Nagaland', },
    { value: 'Odisha', label: 'Odisha', },
    { value: 'Punjab', label: 'Punjab', },
    { value: 'Rajasthan', label: 'Rajasthan', },
    { value: 'Sikkim', label: 'Sikkim', },
    { value: 'Tamil Nadu', label: 'Tamil Nadu', },
    { value: 'Tripura', label: 'Tripura', },
    { value: 'Telangana', label: 'Telangana', },
    { value: 'Uttar Pradesh', label: 'Uttar Pradesh', },
    { value: 'Uttarakhand', label: 'Uttarakhand', },
    { value: 'West Bengal', label: 'West Bengal', },
];
const CompanyDetailsAdd = (props) => {
    const { handleSubmit } = useForm();
    const dispatch = useDispatch()
    const editData = props.editInfo;
    const editid = editData && editData._id;
    const [successMessage, setSuccessMessage] = useState(null)

    const [data, setData] = useState({
        _id: editid,
        company_name: editData ? editData.company_name : '',
        address: editData ? editData.address : '',
        city: editData ? editData.city : '',
        pin_code: editData ? editData.pin_code : '',
        state: editData ? editData.state : '',
        gst_in: editData ? editData.gst_in : '',
        upload_company_logo: editData ? editData.upload_company_logo : '',
        contact_person: editData ? editData.contact_person : '',
        contact_number: editData ? editData.contact_number : '',
        password: editData ? editData.password : '',
        user_name: editData ? editData.user_name : '',
    })

    const handleChange = ({ target }) => {
        const value = target.value;
        setData({
            ...data,
            [target.name]: value,
        });
        data[target.name] = target.value;

    }

    const onSubmit = async (event) => {
        let sendingData = {
            ...data,
            changedUpdatedValue: 'edit'
        }
        if (editData) {
            dispatch(editDeleteCompanyDetails(sendingData));
            setSuccessMessage("Record Updated Successfully!")
            props.onEdit();
            props.handleCloseDialog();
        } else {
            dispatch(addCompanyDetails(sendingData));
            setSuccessMessage("Record Added Successfully!")
            props.onEdit();
            props.handleCloseDialog();
        }
    }

    const handleCloseSuccessMsg = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessMessage(false)
    };

    const actionMsg = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSuccessMsg}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <>

            <Paper className='listPaper' sx={{ boxShadow: 'none' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={1} sx={{ pt: 1 }}>
                        <Grid item md={4} className="lableGrid">
                            <Grid item md={12} xs={12} >
                                <Typography sx={{ fontWeight: 'bold' }}> Company Details Entry</Typography>
                                <Typography className='Inputlable'> Create Company details for registration for the Software.
                                    <br /> Enter Company description </Typography>
                            </Grid>
                            <Grid item md={12} xs={12} >
                                <img src={demo_logo} style={{ width: '100%', height: 'auto', padding: '25px' }} />
                            </Grid>
                        </Grid>
                        {/* ----2nd col */}
                        <Grid item md={4} className="lableGrid">
                            <Grid container spacing={0} sx={{ pt: 1, pr: 2 }}>
                                <Grid item md={12} xs={12} className="lableGrid">
                                    <Typography className="Inputlable">Company Name</Typography>
                                </Grid>
                                <Grid item md={12} xs={12} className="inputGrid" >
                                    <VisitorInput
                                        size="small"
                                        fullWidth
                                        name="company_name"
                                        type="text"
                                        value={(data.company_name)}
                                        onChange={handleChange} />
                                </Grid>
                                <Grid item md={12} xs={12} className="lableGrid">
                                    <Typography className="Inputlable">Address</Typography>
                                </Grid>
                                <Grid item md={12} xs={12} className="inputGrid" >
                                    <VisitorInput
                                        size="small"
                                        fullWidth
                                        name="address"
                                        type="text"
                                        value={(data.address)}
                                        onChange={handleChange} />
                                </Grid>
                                <Grid item md={12} xs={12} className="lableGrid">
                                    <Typography className="Inputlable">City</Typography>
                                </Grid>
                                <Grid item md={12} xs={12} className="inputGrid" >
                                    <VisitorInput
                                        size="small"
                                        fullWidth
                                        name="city"
                                        type="text"
                                        value={(data.city)}
                                        onChange={handleChange} />
                                </Grid>
                                <Grid item md={12} xs={12} className="lableGrid">
                                    <Typography className="Inputlable">Contact Person</Typography>
                                </Grid>
                                <Grid item md={12} xs={12} className="inputGrid" >
                                    <VisitorInput
                                        size="small"
                                        fullWidth
                                        name="contact_person"
                                        type="text"
                                        value={(data.contact_person)}
                                        onChange={handleChange} />

                                </Grid>
                                <Grid item md={12} xs={12} className="lableGrid">
                                    <Typography className="Inputlable">User Name</Typography>
                                </Grid>
                                <Grid item md={12} xs={12} className="inputGrid" >
                                    <VisitorInput
                                        size="small"
                                        fullWidth
                                        name="user_name"
                                        type="text"
                                        value={(data.user_name)}
                                        onChange={handleChange} />

                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={4} className="lableGrid">
                            <Grid container spacing={0} sx={{ pt: 1, pr: 2 }}>
                                <Grid item md={12} xs={12} className="lableGrid">
                                    <Typography className="Inputlable">GST IN</Typography>
                                </Grid>
                                <Grid item md={12} xs={12} className="inputGrid" >
                                    <VisitorInput
                                        size="small"
                                        fullWidth
                                        name="gst_in"
                                        type="text"
                                        value={(data.gst_in)}
                                        onChange={handleChange} />
                                </Grid>
                                <Grid item md={12} xs={12} className="lableGrid">
                                    <Typography className="Inputlable">State</Typography>
                                </Grid>
                                <Grid item md={12} xs={12} className="inputGrid" >
                                    <VisitorInput
                                        select
                                        size="small"
                                        fullWidth
                                        name="state"
                                        type="text"
                                        value={(data.state)}
                                        SelectProps={{
                                            MenuProps: { disableScrollLock: true, style: { height: '200px' } },
                                        }}
                                        onChange={handleChange} >
                                        {stateList.map((option) => (
                                            <MenuItem className="menuItem" key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </VisitorInput>
                                </Grid>

                                <Grid item md={12} xs={12} className="lableGrid">
                                    <Typography className="Inputlable">Pin Code</Typography>
                                </Grid>
                                <Grid item md={12} xs={12} className="inputGrid" >
                                    <VisitorInput
                                        size="small"
                                        fullWidth
                                        name="pin_code"
                                        type="text"
                                        value={(data.pin_code)}
                                        onChange={handleChange} />
                                </Grid>

                                <Grid item md={12} xs={12} className="lableGrid">
                                    <Typography className="Inputlable">Contact Number</Typography>
                                </Grid>
                                <Grid item md={12} xs={12} className="inputGrid" >
                                    <VisitorInput
                                        size="small"
                                        fullWidth
                                        name="contact_number"
                                        type="text"
                                        value={(data.contact_number)}
                                        onChange={handleChange} />
                                </Grid>
                                <Grid item md={12} xs={12} className="lableGrid">
                                    <Typography className="Inputlable">Password</Typography>
                                </Grid>
                                <Grid item md={12} xs={12} className="inputGrid" >
                                    <VisitorInput
                                        size="small"
                                        fullWidth
                                        name="password"
                                        type="text"
                                        value={(data.password)}
                                        onChange={handleChange} />

                                </Grid>
                                <Grid item md={12} xs={12} className="lableGrid">
                                    <Typography className="Inputlable">Upload Company Logo</Typography>
                                </Grid>
                                <Grid item md={12} xs={12} className="inputGrid" >
                                    <VisitorInput
                                        InputProps={{
                                            disableUnderline: true,
                                        }}
                                        variant="standard"
                                        size="small"
                                        fullWidth
                                        name="upload_company_logo"
                                        type="file"
                                        value={(data.upload_company_logo)}
                                        onChange={handleChange} />

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Box sx={{ marginTop: '12px', float: 'right' }}>
                        <Button color="primary" id='btnSave' variant="contained" type="submit">
                            {editData ? 'Update' : 'Save'}
                        </Button>
                        {/* <Cancel />s */}
                    </Box>
                </form>
                {successMessage &&
                    <Snackbar
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        open={successMessage ? true : false}
                        autoHideDuration={2000}
                        onClose={handleCloseSuccessMsg}
                        message={successMessage}
                        action={actionMsg}
                    />
                }
            </Paper>

        </>
    )
}
export default CompanyDetailsAdd;