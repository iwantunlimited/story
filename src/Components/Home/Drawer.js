import React from 'react';
import MuiDrawer from '@material-ui/core/Drawer'
import {
    List,
    Divider,
    IconButton,
    Toolbar,
    Typography, ListItemButton, Collapse, Tooltip
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {experimentalStyled as styled} from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ListItemText from "@material-ui/core/ListItemText";
import {withRouter} from "react-router";
import Context from "../../Api_Services/Context";
import {contents} from "../../Api_Services/services_payloads/service";
import {ExpandLess, ExpandMore, Folder, FolderOpen} from "@material-ui/icons";

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open , drawerwidth:drawerWidth }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

function DrawerComponent(props) {
    const context = React.useContext(Context)
    const {contentApiPojo} = context
    const [listFolder , setListFolder] = React.useState([])
    const [openMenu, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!openMenu);
    };
    const folderApiCall = React.useCallback((data)=>{
        contents({...contentApiPojo, ...data}).then(
            res =>{
                if(res && res.content && res.content.length > 0){
                    setListFolder(()=>(res.content))
                }
            }
        )
    },[contentApiPojo])

    React.useEffect(()=>{
        folderApiCall({"contentType": 'dir'})
    },[folderApiCall])

    const {open , toggleDrawer , drawerWidth} = props
    return (
        <Drawer variant="permanent" open={open} drawerwidth={drawerWidth}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    px: [1],
                }}
            >
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1, paddingLeft:'10px' }}
                >
                    Story
                </Typography>
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>

            <Divider />
            <List>
                <ListItemButton onClick={()=>{
                    props.history.push('/root')
                }}>
                    <ListItemIcon>
                        <Tooltip title={'Dashboard'} placement={'right'}>
                            <DashboardIcon />
                        </Tooltip>
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                <Divider/>
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <Tooltip title={'Root Folder'} placement={'right'}>
                            <Folder />
                        </Tooltip>
                    </ListItemIcon>
                    <ListItemText primary="Folders" />
                    {openMenu ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openMenu} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                            {
                                listFolder && listFolder.map((folder, index)=>(
                                    <ListItemButton
                                        sx={{ pl: 4 }}
                                        key={index}
                                        onClick={()=>{
                                            props.history.push('/'+ folder.id)
                                        }}
                                    >
                                        <ListItemIcon>
                                            <Tooltip title={folder.name} placement={'right'}>
                                                <FolderOpen />
                                            </Tooltip>
                                        </ListItemIcon>
                                        <ListItemText primary={folder.name} />
                                    </ListItemButton>
                                ))
                            }
                    </List>
                </Collapse>
            </List>

        </Drawer>
    );
}

export default withRouter(DrawerComponent);