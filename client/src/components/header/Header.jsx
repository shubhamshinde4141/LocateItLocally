
import React from 'react';
import { useState } from 'react';
import {AppBar,Toolbar,makeStyles,Box, Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Popover from '@mui/material/Popover';
import AccountMenu from '../home/PopOverModals/AccountMenu';
import GetDrawer from '../home/DrawerComponent/Drawer.component';
import logo from "../Logo/LocateItLocally Logo.png"

 
const useStyle = makeStyles(theme => (

  {

    // This is the root NavBar For LG
    header: {
      background: '#F7F8F9',
      height: '90px',
            
            
            
    },
       
    // Css For Logo
    logoLg: {
      height: '150px',
      margin: 0,
           
    },

    // CSS For Options ( Home , About)
    containerOptions: {
            
      // For Large Screen
      display: 'flex',
      marginLeft: 350,
      justifyContent: 'space-between',
      gap: 20,
            
      // For Mobile Screen - Disable
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
             
      // For medium Screen - Enable 
      [theme.breakpoints.between('sm', 'md')]: {
        display: 'flex',
        marginLeft: 20,
      },
    },
       

    txt: {
      color: 'black',
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      fontSize: '17px',
      textDecoration: 'none',


    },

      
    // Icons - Enable For large and Medium Screen
    endContainerIcons: {
      display: 'flex',
      marginLeft: 400,
      gap: 15,
            
      // Disable For Mobile Sceen
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
            
      // Enable For Medium Screen
      [theme.breakpoints.between('sm', 'md')]: {
        display: 'flex',
        marginLeft: 50,
      },
    },

        
  }

)
    
);



const Header = (props) => {
  
   

  const classes = useStyle();

  // UseState
  const [anchorEl, setAnchorEl] = useState(null);
  



 
  
  
  // This are the functions for handling Hover Events
  //For Open
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    
  };
  
  // For Close
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };



  

  
  const open = Boolean(anchorEl);
  

    return (
        <>
        <AppBar className={classes.header}>
            <Toolbar >
                
                <img src={logo} alt="icon" className={classes.logoLg} />
                
                <Box className={classes.containerOptions}>

                    <Link to='/' className={classes.txt}>
                        Home
                    </Link>
                    
                    <Link to='/' className={classes.txt}>
                        Demo
                    </Link>
                    
                    <Link to='/contact' className={classes.txt}>
                        Contact
                    </Link>
                    <Link to='/about' className={classes.txt}>
                        About Us
                    </Link>
                   

                    
                </Box>

          <Box className={classes.endContainerIcons}>
            
                {/** Write extra properties for the icon - onClick(),onMouseOver() */}
                <Link to='/login'>
                  <PersonOutlineIcon
                    aria-owns={open ? 'show-Account-menu' : undefined}
                    aria-haspopup="true"
                    className={classes.endicons}
                    onClick={handlePopoverOpen}
                    onMouseOver={handlePopoverOpen}
                  
              />
            </Link>

                  {/** This is the PopOver Element which will be shown after hovering on button/icon */}
                  <Popover
                  id="show-Account-menu"
                
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handlePopoverClose}
                  //onMouseOut={handlePopoverClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  disableRestoreFocus
                >
                  <AccountMenu  /> {/** This item will be displayed after hovering */}
                </Popover>

                   
                    <Link to='/favourites'><FavoriteBorderIcon className={classes.endicons} /></Link>

                    <Link to='/cart'><ShoppingCartOutlinedIcon className={classes.endicons} /></Link>
                   
                    
                 


            </Box>
            
            {/** This is the Drawer Component  */}
                <GetDrawer />
  
            </Toolbar>
        </AppBar>

        
        </>
    );

};


export default Header;
