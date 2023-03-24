import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Badge, Box, Button, Grid, Menu, MenuItem } from "@mui/material";
import { AccountCircle} from "@mui/icons-material";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAppDispatch } from "@/store/store";
import { signOut ,userSelectorAres,userExple} from "@/store/slices/userSlice";
import { useSelector } from "react-redux";
import { UserData } from "@/models/user.model";
import { getProfiles, profileSelector } from "@/store/slices/profileSlice";
import { getSession } from "@/store/slices/userSlice";
const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
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

type HeaderProp = {
  open: boolean;
  onDrawerOpen: () => void;
};

export default function Header({ open, onDrawerOpen }: HeaderProp) {
  const dispatch = useAppDispatch();
 
  const profileList = useSelector(userExple); 
  React.useEffect(() => {
    dispatch(getSession());
  }, [dispatch]);

  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
 
  
  const handleClose = () => {
    setShowProfileMenu(false);
  };
   
  return (
    <AppBar position="fixed"  sx={{ background: "#ff9800", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
     
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton> 
        <Typography variant="h4" noWrap component="div">Quiz Bank</Typography> 
         <Box sx={{ flexGrow: 1 }} /> 
         <Button onClick={()=>{}}></Button>
         <Typography variant="h6" noWrap component="div" fontWeight="300">
         {/* {userList[0]}{userList[1]}{userList[2]} */} 
         {profileList[0]} {profileList[1]} {profileList[2]} 
           </Typography>  
           
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>

          <Menu
            //  sx={{ mt: '50px' }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={showProfileMenu}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>โปรไฟล์</MenuItem>
            <MenuItem onClick={() => dispatch(signOut())}>ออกจากระบบ</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
