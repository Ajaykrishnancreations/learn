import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import { makeStyles } from '@mui/styles';
import { FiMenu } from 'react-icons/fi';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { TbLogout } from 'react-icons/tb';
import { RxAvatar } from 'react-icons/rx';


const root = document.querySelector(':root');
const primary = root ? getComputedStyle(root).getPropertyValue('--primaryColor') : ''

const useStyles = makeStyles((theme) => ({
  MenuItem: {
    color: '#332620',
    fontSize: '14px',
    '&:hover': {
      color: primary,
    },
  },
  line: {
    borderBottom: '2px solid',
    borderImage: 'linear-gradient(to Left,rgba(255, 255, 255, 0) 4.11%, #E057171A 100%)1',
  },
}));

export default function Header({ handleSideBar }: { handleSideBar: () => void }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const location = useLocation();
  const [User, setUser] = useState<UserData | null>(null);
  const path = location.pathname.split('/');
  const title = path ? path[path.length - 1] : null;
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  interface UserData {
    email:string
    name: string
    password:any
    phone:string
    role:string
    _id:any
  }
  useEffect(() => {
    const storedData = localStorage.getItem("session");
    if (storedData) {
      const data: UserData = JSON.parse(storedData);
      setUser(data);
    }
    const handleScroll = () => {
      const position = window.pageYOffset;
      if (position > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const themes = useTheme();
  const isMobileScreen = useMediaQuery(themes.breakpoints.down('sm'));

  return (
    <div>
      <AppBar position='static' sx={{ boxShadow: 'none' }} className={`${isScrolled ? 'bg-white' : 'bg-transparent'}`}>
        <Toolbar className={'justify-content-between'}>
          {isMobileScreen && (
            <IconButton onClick={handleSideBar}>
              <FiMenu />
            </IconButton>
          )}
          <span className='text-dark'>{title}</span>
          <div className='d-flex align-items-center gap-1'>
            {isMobileScreen ? null : (
              <Grid container>
                <Grid style={{ color: 'black', paddingRight: '30px' }}>
                  <RxAvatar color='#000' size={28} />
                  <span style={{paddingLeft:"5px"}}>{User?.name}</span>
                </Grid>
                <Grid>
                  <span onClick={handleMenu}>
                    <TbLogout color='#000' size={28} />
                  </span>
                </Grid>
              </Grid>
            )}

            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              onClose={handleCloseMenu}
              sx={{ marginTop: '15px' }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
            >
              {isMobileScreen && <MenuItem className={classes.MenuItem}>Notifications</MenuItem>}
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  handleLogout();
                }}
                data-testId='header-startup-button'
                className={classes.MenuItem}
              >
                <h6 className={`text-decoration-none font-black-16-normal ${classes.MenuItem}`}>Logout</h6>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
        {!isScrolled && <div className='divider' />}
      </AppBar>
    </div>
  );
}