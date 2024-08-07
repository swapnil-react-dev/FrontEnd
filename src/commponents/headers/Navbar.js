import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ReduceCapacityIcon from '@mui/icons-material/ReduceCapacity';
import SettingsIcon from '@mui/icons-material/Settings';

import { Badge, Button, Collapse, Menu, MenuItem } from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TourIcon from '@mui/icons-material/Tour';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import NotificationBar from './NotificationBar';
import { Icon } from '@iconify/react';
import EmployeeMasterList from '../employee/EmployeeMasterList';
import EmployeeMasterAdd from '../employee/EmployeeMasterAdd';
import DepartmentList from '../department/DepartmentList';
import VisitorPurposeList from '../visitorPurpose/VisitorPurposeList';
import InvitationOrVisitorList from '../invitationOrVisitor/InvitationOrVisitorList';
import GuestPass from '../invitationOrVisitor/GuestPass';
import Authorization from '../invitationOrVisitor/Authorization';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import Setting from '../setting/Setting';
import Dashboard from '../dashboard/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import SelfRegistration from '../selfRegistration/SelfRegistration';
import SelfRegistrationAdd from '../selfRegistration/SelfRegistrationAdd';
import SelfRegistrationMsg from '../selfRegistration/SelfRegistrationMsg';
import CompanyDetailsList from '../companyDetails/CompanyDetailsList';
import SecurityList from '../security/SecurityList';
import SecurityIcon from '@mui/icons-material/Security';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import PendingRequest from '../invitationOrVisitor/PendingRequest';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { logout } from '../../actions/actions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import DashboardAdmin from '../dashboard/DashboardAdmin';
import CompanyMasterList from '../company/CompanyMasterList';

const drawerWidth = 170;

function Navbar(props) {
    const loginData = localStorage.getItem('loginUser');
    const loginInfor = JSON.parse(loginData);
    const loginUser = loginInfor.userInfo;
    console.log("login", loginUser)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // localStorage.removeItem('loginUser');
        // localStorage.removeItem('token');
        dispatch(logout())
        navigate('/')

    };

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    const location = useLocation();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const drawer = (
        <div >
            {/* <Toolbar /> */}
            <List
                sx={{ width: '100%', maxWidth: 360, }}
                component="nav"
            >
                <NavLink to="/dashboard"
                    style={({ isActive }) => ({
                        color: isActive ? '#1cff52' : '#ffffff',
                        background: isActive ? '#7600dc' : '#f0f0f0',
                        textDecoration: 'none'
                    })}> 
                    <ListItemButton className='sidbarTab'>
                        <ListItemIcon style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                            {(location.pathname == '/dashboard') ?
                                <DashboardIcon style={{ color: '#1cff52' }} />
                                :
                                <DashboardIcon style={{ color: '#ffffff' }} />}
                        </ListItemIcon>
                        <ListItemText
                            //  primary="Dashboard" ok security 
                            // primary={loginUser.userRole == "Security" ? "Dashboard" : "Visitors"}
                            primary={loginUser.userRole == "Security" || loginUser.userRole == "Employee" ? "Visitors" : "Dashboard"}
                            //  primary="Invitations" 
                            primaryTypographyProps={{ fontSize: '15px', fontWeight: 'bold', }} />
                    </ListItemButton>
{/* <h1>wihwhiw</h1> */}
                </NavLink>
                <Divider style={{ background: '#9e9e9e' }} />
                {loginUser.userRole == "Admin" &&
                    <>
                        <ListItemButton onClick={handleClick} >

                            <ListItemText primary="Master" primaryTypographyProps={{ color: '#ffffff', marginLeft: '22px', fontSize: '15px', fontWeight: 'bold', }} />
                            {open ? <><ExpandLess style={{ color: '#ffffff' }} />   </> : <> <ExpandMore style={{ color: '#ffffff' }} /> </>}

                        </ListItemButton>
                        {open ? <>      <Divider style={{ background: '#9e9e9e' }} /> </> : <>   </>}

                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <NavLink to="/employeeList" style={({ isActive }) => ({
                                    color: isActive ? '#1cff52' : '#ffffff',
                                    backgroundColor: isActive ? '#f0af18' : '#f0af18',
                                    textDecoration: 'none'
                                })}>
                                    <ListItemButton className='sidbarTab'>
                                        <ListItemIcon style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                            {(location.pathname == '/employeeList') ?
                                                <GroupsIcon style={{ color: '#1cff52' }} />
                                                :
                                                <GroupsIcon style={{ color: '#ffffff' }} />}
                                        </ListItemIcon>
                                        <ListItemText primary="Employee" primaryTypographyProps={{ fontSize: '15px', fontWeight: 'bold', }} />
                                    </ListItemButton>
                                </NavLink>
                                <Divider style={{ background: '#9e9e9e' }} />
                                <NavLink to="/security" style={({ isActive }) => ({
                                    color: isActive ? '#1cff52' : '#ffffff',
                                    backgroundColor: isActive ? '#f0af18' : '#f0af18',
                                    textDecoration: 'none'
                                })}>
                                    <ListItemButton className='sidbarTab'>
                                        <ListItemIcon style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                            {(location.pathname == '/security') ?
                                                <SecurityIcon style={{ color: '#1cff52' }} />
                                                :
                                                <SecurityIcon style={{ color: '#ffffff' }} />}
                                        </ListItemIcon>
                                        <ListItemText primary="Security" primaryTypographyProps={{ fontSize: '15px', fontWeight: 'bold', }} />
                                    </ListItemButton>
                                </NavLink>
                                <Divider style={{ background: '#9e9e9e' }} />
                                <NavLink to="/purposeList" style={({ isActive }) => ({
                                    color: isActive ? '#1cff52' : '#ffffff',
                                    backgroundColor: isActive ? '#f0af18' : '#f0af18',
                                    textDecoration: 'none'
                                })}>
                                    <ListItemButton className='sidbarTab'>
                                        <ListItemIcon style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                            {/* <TourIcon style={{ color: '#000000' }} /> */}
                                            {(location.pathname == '/purposeList') ?
                                                <Icon icon="octicon:goal-24" width="25" height="25" color='#1cff52' />
                                                :
                                                <Icon icon="octicon:goal-24" width="25" height="25" color='#ffffff' />}

                                        </ListItemIcon>
                                        <ListItemText primary="Purpose " primaryTypographyProps={{ fontSize: '15px', fontWeight: 'bold', }} />
                                    </ListItemButton>
                                </NavLink>
                                <Divider style={{ background: '#9e9e9e' }} />
                                <NavLink to="/departmentList" style={({ isActive }) => ({
                                    color: isActive ? '#1cff52' : '#ffffff',
                                    backgroundColor: isActive ? '#f0af18' : '#f0af18',
                                    textDecoration: 'none'
                                })}>
                                    <ListItemButton className='sidbarTab'>
                                        <ListItemIcon style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                            {(location.pathname == '/departmentList') ?
                                                <Icon icon="icon-park-outline:network-tree" width="25" height="25" color='#1cff52' />
                                                :
                                                <Icon icon="icon-park-outline:network-tree" width="25" height="25" color='#ffff' />}

                                        </ListItemIcon>
                                        <ListItemText primary="Department" primaryTypographyProps={{ fontSize: '15px', fontWeight: 'bold', }} />
                                    </ListItemButton>
                                </NavLink>
                            </List>
                        </Collapse>
                        {/* company  */}

                        <Divider style={{ background: '#9e9e9e' }} />
                        <NavLink to="/companyList" style={({ isActive }) => ({
                            color: isActive ? '#1cff52' : '#ffffff',
                            backgroundColor: isActive ? '#f0af18' : '#f0af18',
                            textDecoration: 'none'
                        })}>
                            <ListItemButton className='sidbarTab'>
                                <ListItemIcon style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                    {(location.pathname == '/companyList') ?
                                        <Icon icon="icon-park-outline:network-tree" width="25" height="25" color='#1cff52' />
                                        :
                                        <Icon icon="icon-park-outline:network-tree" width="25" height="25" color='#ffff' />}

                                </ListItemIcon>
                                <ListItemText primary="Company" primaryTypographyProps={{ fontSize: '15px', fontWeight: 'bold', }} />
                            </ListItemButton>
                        </NavLink>

                        <Divider style={{ background: '#9e9e9e' }} />
                        <NavLink to="/invitationList" style={({ isActive }) => ({
                            color: isActive ? '#1cff52' : '#ffffff',
                            backgroundColor: isActive ? '#f0af18' : '#f0af18',
                            textDecoration: 'none'
                        })}>
                            <ListItemButton className='sidbarTab'>
                                <ListItemIcon style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                    {(location.pathname == '/invitationList') ?
                                        < InsertInvitationIcon style={{ color: '#1cff52' }} /> :
                                        <InsertInvitationIcon style={{ color: '#ffffff' }} />}
                                </ListItemIcon>
                                <ListItemText primary="Visitors" primaryTypographyProps={{ fontSize: '15px', fontWeight: 'bold', }} />
                            </ListItemButton>
                        </NavLink>
                        

                    </>

                }



                <Divider style={{ background: '#9e9e9e' }} />
                <NavLink to="/invitationList" style={({ isActive }) => ({
                    color: isActive ? '#1cff52' : '#ffffff',
                    backgroundColor: isActive ? '#f0af18' : '#f0af18',
                    textDecoration: 'none'
                })}>
                    {(loginUser.userRole == "Security" || loginUser.userRole == "Employee") &&
                        <ListItemButton className='sidbarTab'>
                            <ListItemIcon style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                {(location.pathname == '/invitationList') ?
                                    < InsertInvitationIcon style={{ color: '#1cff52' }} /> :
                                    <InsertInvitationIcon style={{ color: '#ffffff' }} />}
                            </ListItemIcon>
                            {(loginUser.userRole == "Security" || loginUser.userRole == "Employee") &&
                                <ListItemText primary="Invitation" primaryTypographyProps={{ fontSize: '15px', fontWeight: 'bold', }} />
                            }
                        </ListItemButton>
                    }
                </NavLink>

                {loginUser.userRole == "Employee" &&
                    <NavLink to="/pendingRequest" style={({ isActive }) => ({
                        color: isActive ? '#1cff52' : '#ffffff',
                        backgroundColor: isActive ? '#f0af18' : '#f0af18',
                        textDecoration: 'none'
                    })}>
                        <ListItemButton className='sidbarTab'>
                            <ListItemIcon style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                {(location.pathname == '/pendingRequest') ?
                                    < PendingActionsIcon style={{ color: '#1cff52' }} /> :
                                    <PendingActionsIcon style={{ color: '#ffffff' }} />}
                            </ListItemIcon>
                            <ListItemText primary="Pending Request" primaryTypographyProps={{ fontSize: '15px', fontWeight: 'bold', }} />
                        </ListItemButton>
                    </NavLink>
                }
                {/* <Divider /> */}
                {loginUser.userRole == "Security" &&
                    <>
                        <NavLink to="/selfRegistration" style={({ isActive }) => ({
                            color: isActive ? '#1cff52' : '#ffffff',
                            backgroundColor: isActive ? '#f0af18' : '#f0af18',
                            textDecoration: 'none'
                        })}>

                            <ListItemButton className='sidbarTab'>
                                <ListItemIcon style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                    {(location.pathname == '/selfRegistration') ?
                                        < SettingsSuggestIcon style={{ color: '#1cff52' }} /> :
                                        <SettingsSuggestIcon style={{ color: '#ffffff' }} />}
                                </ListItemIcon>
                                <ListItemText primary="Self Registraion " primaryTypographyProps={{ fontSize: '15px', fontWeight: 'bold', }} />
                            </ListItemButton>
                        </NavLink>
                        <Divider style={{ background: '#9e9e9e' }} />
                    </>
                }

            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: '#ffffff',
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon sx={{ color: '#000000' }} />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" color="black">
                        {/* Visitor */}
                        {loginUser.userRole == "Admin" ? "Dashboard" : "Visitor"}
                    </Typography>
                    <Box sx={{ flexGrow: 2 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <MessagesBar />
                        </IconButton> */}

                        <NotificationBar />
                        <Box onClick={handleMenu} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                            {/* <Button sx={{ backgroundColor: '#ffffff', float: 'right' }}> */}
                            <AccountCircle sx={{ color: '#000000' }} />
                            {/* </Button> */}
                            <Typography noWrap component="div" sx={{ fontSize: '12px', color: '#000000', pl: 0.5 }}>{loginUser.fullName} </Typography>
                        </Box>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {/* <NavLink to="/"> */}
                            <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
                            {/* </NavLink> */}
                        </Menu>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            // aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            // onClick={            }
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer

                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#336699', },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#336699', },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />

                {/* {(location.pathname == '/dashboard') &&
                    <Dashboard />
                }*/}
                {(location.pathname == '/employeeList') &&
                    <EmployeeMasterList />
                }
                {(location.pathname == '/departmentList') &&
                    <DepartmentList />
                }
                {(location.pathname == '/companyList') &&
                    <CompanyMasterList />
                }
                {(location.pathname == '/purposeList') &&
                    <VisitorPurposeList />
                }
                {(location.pathname == '/invitationList') &&
                    // <InvitationOrVisitorList />
                    <Dashboard />
                }

                {(location.pathname == '/invitationList') &&
                    loginUser.userRole === "Admin" &&
                    <InvitationOrVisitorList />
                }

            
                {(location.pathname == '/guestpass') &&
                    <GuestPass />
                }
                {
                    (location.pathname == '/authorization') &&
                    <Authorization />
                }
                {(location.pathname == '/setting') &&
                    <Setting />
                }
                {/* {(location.pathname == '/dashboard') &&
                    // <Dashboard />
                    <InvitationOrVisitorList />
                } */}

                {/* {(location.pathname == '/dashboard') &&
                    loginUser.userRole === "Admin" ?
                    <DashboardAdmin/> : <InvitationOrVisitorList /> 
                } */}
                {(location.pathname == '/dashboard') &&
                    loginUser.userRole === "Admin" &&
                    <DashboardAdmin />
                }

                {(location.pathname == '/dashboard') &&
                    loginUser.userRole == "Employee" &&
                    <InvitationOrVisitorList />
                }

                {(location.pathname == '/dashboard') &&
                    loginUser.userRole == "Security" &&
                    <InvitationOrVisitorList />
                }


                {(location.pathname == '/selfRegistration') &&
                    <SelfRegistration />
                }
                {(location.pathname == '/selfRegistrationMob') &&
                    <SelfRegistrationAdd />
                }
                {(location.pathname == '/selfRegistrationMgs') &&
                    <SelfRegistrationMsg />
                }
                {(location.pathname == '/comapnyDetails') &&
                    <CompanyDetailsList />
                }
                {(location.pathname == '/security') &&
                    <SecurityList />
                }
                {(location.pathname == '/pendingRequest') &&
                    <PendingRequest />
                }
                {/* {(location.pathname == '/dashboardadmin') &&
                    <DashboardAdmin />
                } */}
            </Box>
        </Box>
    );
}

Navbar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Navbar;