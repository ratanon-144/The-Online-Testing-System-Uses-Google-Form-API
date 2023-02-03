import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Badge, Box, Menu, MenuItem } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAppDispatch } from "@/store/store";
import { signOut } from "@/store/slices/userSlice";
import { blue } from "@mui/material/colors";

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
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setShowProfileMenu(false);
  };

  return (
    <AppBar position="fixed" open={open}>
      
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
        <Typography variant="h6" noWrap component="div">
        {/*ชื่อขอบบา */}
        
          {process.env.NEXT_PUBLIC_APP_VERSION}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Typography variant="h6" noWrap component="div" fontWeight="300">
         ผศ.ธนา หงษ์สุวรรณ
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
        
        
        {/* ไอคอนโปรไฟล์ */}
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
            <MenuItem onClick={() => dispatch(signOut())}>โพรไฟล์</MenuItem>
            <MenuItem onClick={handleClose}>ออกจากระบบ</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}