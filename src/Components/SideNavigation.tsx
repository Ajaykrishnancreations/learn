import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@mui/styles';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Logo from '../Assets/Icon1.png';
import { useNavigate } from 'react-router-dom';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { AppBar as MuiAppBar, Drawer as MuiDrawer } from "@mui/material";
import Header from './Header';
import { useMediaQuery, useTheme } from '@mui/material';
import { Theme, CSSObject } from '@mui/material/styles';
import { SideNavConfigs } from '../Helpers/UserDetails';
import { GrHomeRounded } from 'react-icons/gr';
import { GrDocumentUser } from "react-icons/gr";

const root = document.querySelector(":root");
const primary = root ? getComputedStyle(root).getPropertyValue("--primaryColor") : '';
const navbar = "#193389";

interface IProps{
  children:React.ReactNode
}

const useStyles = makeStyles({
  bgColorFixed: {
    background: `${primary} !important`,
  },
  tcUser: {
    minWidth: '45px',
  },
  popIcon: {
    '&:focus': {
      outline: 'none',
    },
    '&:hover': {},
    position: 'fixed',
    backgroundColor: `${navbar} !important`,
    top: '2% !important',
    borderRadius: '0px 8px 8px 0px !important',
    borderLeft: 'none !important',
  },
});


const drawerWidth:number = 200;
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

//Navbar Theme Customization
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

//Drawer Theme Customization
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Index({ children }: IProps) {
  const [open, setOpen] = useState(true);
  const [responsiveOpen, setResponsiveopen] = useState(false);
  const [active, setActive] = useState(1);
  const classes = useStyles();
  const themes = useTheme();
  const isMobileScreen = useMediaQuery(themes.breakpoints.down('sm'));
  const navigate = useNavigate();
  const handleDrawer = () => {
    setOpen(!open);
  };
  const location123 = window.location.pathname;
  console.log(location123, 'location123');
  console.log(typeof (location123), 'location1234');
  const handleMobileDrawer = () => {
    setResponsiveopen(!responsiveOpen);
  };
  const Home_Tabs = SideNavConfigs?.Home;
  const Profile_Tabs=SideNavConfigs?.Profile;
  const navStyle = (index: string) => {
    return {
      backgroundColor: location123 === index ? '#6EC9E8' : null,
      padding: open ? null:'20px',
      '&:hover': {
        backgroundColor: location123 === index ? '#6EC9E8' : null
      }
    }
  }
  const handleNavstyle = (index: number) => {
    setActive(index)
  }

  const ListTabs = () => {
    return (
      <List className='w-100 text-black pt-4' sx={{ bgcolor: `${navbar}`, }} component='nav' aria-labelledby='nested-list-subheader'>
        {/* Home */}
        {Home_Tabs ? (
          <ListItemButton onClick={() => { handleNavstyle(1); navigate('/home') }} sx={navStyle('/home')} >
            <ListItemIcon>
              <GrHomeRounded size={18} color='#050505' opacity={'75%'} />
            </ListItemIcon>
            {open ? <ListItemText primary={'Home'} /> : null}
          </ListItemButton>
        ) : null
        }
        {Profile_Tabs ? (
          <ListItemButton onClick={() => { handleNavstyle(2); navigate('/Profile') }} sx={navStyle('/Profile')} >
            <ListItemIcon>
              <GrDocumentUser size={18} color='#050505' opacity={'75%'} />
            </ListItemIcon>
            {open ? <ListItemText primary={'Profile'} /> : null}
          </ListItemButton>
        ) : null
        }
      </List>
    );
  };
  return (
    <>
      {isMobileScreen ? (
        <>
          <MuiDrawer sx={{ '& .MuiDrawer-paper': { bgcolor: `${navbar}!important`, borderRight: 'none' } }} anchor='left' variant='temporary' open={responsiveOpen}>
            <DrawerHeader color={navbar} className='d-flex justify-content-between gap-5 align-items-center'>
              <Box />
              {open && <img className="mt-3" width={'50px'} src={Logo} />}
              <IconButton onClick={handleMobileDrawer}>
                <KeyboardDoubleArrowLeftIcon className='text-black' />
              </IconButton>
            </DrawerHeader>
            {ListTabs()}
          </MuiDrawer>
          <Box component='main' flexGrow={1} minHeight={'100vh'} maxHeight={'max-content'} sx={{ scrollBehavior: 'smooth' }}>
            <Box component={'div'} position={'sticky'} top={0} zIndex={9}>
              <Header handleSideBar={handleMobileDrawer} />
            </Box>
            <Box position={'relative'}>{children}</Box>
          </Box>
        </>
      ) : (
        <div className='d-flex'>
          <Drawer sx={{ '& .MuiDrawer-paper': { backgroundColor: `${navbar}!important`, borderRight: 'none' } }} variant='permanent' open={open}>
            <DrawerHeader color={`${navbar}!important`} className='d-flex justify-content-between align-items-center'>
              <div className='d-flex align-items-center gap-3'>
                <Box left={'1%'} />
                {open && <img className="mt-3" width={'50px'} src={Logo} />}
              </div>
              <div>
                {open ? (
                  <IconButton onClick={handleDrawer}>
                    <KeyboardDoubleArrowLeftIcon className='text-black' />
                  </IconButton>
                ) : (
                  <IconButton onClick={handleDrawer} className={classes.popIcon}>
                    <KeyboardDoubleArrowRightIcon className='text-black' />
                  </IconButton>
                )}
              </div>
            </DrawerHeader>
            {ListTabs()}
          </Drawer>
          <Box component='main' flexGrow={1} minHeight={'100vh'} maxHeight={'max-content'} sx={{ width: '900px', scrollBehavior: 'smooth' }}>
            <Box component={'div'} position={'sticky'} top={0} zIndex={9}>
              <Header handleSideBar={handleMobileDrawer}/>
            </Box>
            <Box position={'relative'}>{children}</Box>
          </Box>
        </div>
      )}
    </>
  );
}