import React, {useState} from 'react';
import {connect} from 'react-redux';
import {setMenuDrawerOpen} from '../../services/configurations/actions';
import {setJWT} from '../../services/auth/actions';
import {withPage} from '../../routes/page';
import {useHistory} from 'react-router-dom';
import classnames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import List from '@material-ui/core/List';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            // width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const DashboardPage = (props) => {
    const {menuDrawerOpen, setMenuDrawerOpen, setJWT} = props;
    const classes = useStyles();
    const history = useHistory();

    /**
     * Account icon menu
     */
    const [anchorEl, setAnchorEl] = useState(null);
    const menuOpen = !!anchorEl;

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setJWT(null);
        history.push('/login');
    };

    /**
     * Side drawer menu
     */
    const toggleDrawer = () => {
        // Invert the current state of the open menu drawer
        setMenuDrawerOpen(!menuDrawerOpen);
    };


    return (
        <>
            <AppBar
                position={'fixed'}
                className={classnames(classes.appBar, {
                    [classes.appBarShift]: menuDrawerOpen,
                })}
            >
                <Toolbar>
                    <IconButton onClick={toggleDrawer} edge={'start'} className={classes.menuButton} color={'inherit'} aria-label={'menu'}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant={'h6'} className={classes.title}>
                        Dashboard
                    </Typography>
                    <IconButton
                        onClick={handleMenuOpen}
                        color={'inherit'}>
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={menuOpen}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Drawer
                variant={'permanent'}
                className={classnames(classes.drawer, {
                    [classes.drawerOpen]: menuDrawerOpen,
                    [classes.drawerClose]: !menuDrawerOpen,
                })}
                classes={{
                    paper: classnames({
                        [classes.drawerOpen]: menuDrawerOpen,
                        [classes.drawerClose]: !menuDrawerOpen,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    {/* TODO: Add logo */}
                </div>
                <Divider />
                <List>
                    {['Dashboard'].map((text) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>

                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    )
};

const mapStateToProps = (state) => {
    return {
        menuDrawerOpen: state.config.menuDrawerOpen
    }
};

// Wrap in page HOC
export default withPage(
    connect(mapStateToProps, {setJWT, setMenuDrawerOpen})(DashboardPage),
    {title: 'Dashboard'}
);