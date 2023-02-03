import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { blue} from "@mui/material/colors";




import { ListItem, Stack } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { BarChart, Person,MenuBook, Group, PersonAdd, LibraryAddCheck, Quiz, TableChart } from "@mui/icons-material";
import { useRouter } from "next/router";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

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

type MenuProp = {
  open: boolean;
  onDrawerClose: () => void;
};

export default function Menu({ open, onDrawerClose }: MenuProp) {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ backgroundColor: blue }}
        >
          <Image
            src="/static/img/logo.png"
            width={200}
            height={40}
            objectFit="contain"
            alt="logo"
          />
          <IconButton onClick={onDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
            
          </IconButton>
        </Stack>
      </DrawerHeader>
      <Divider />

      <Divider />
      <List>
        {/* รายวิชา*/}
        <Link href="/รายวิชา" passHref>
          <ListItem
            button
            className={router.pathname === "/รายวิชา" ? "Mui-selected" : ""}
          >
            <ListItemIcon>
              <MenuBook 
              color=""/>
            </ListItemIcon>
            <ListItemText primary="รายวิชา" />
          </ListItem>
        </Link>

        {/* การทดสอบ */}
        <Link href="/การทดสอบ" passHref>
          <ListItem
            button
            className={router.pathname === "/การทดสอบ" ? "Mui-selected" : ""}
          >
            <ListItemIcon>
              <LibraryAddCheck />
            </ListItemIcon>
            <ListItemText primary="การทดสอบ" />
          </ListItem>
        </Link>

        {/* รายชื่อ */}
        <Link href="/รายชื่อ" passHref>
          <ListItem
            button
            className={router.pathname === "/รายชื่อ" ? "Mui-selected" : ""}
          >
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText primary="รายชื่อ" />
          </ListItem>
        </Link>

        {/*เพิ่มผู้สอน */}
        <Link href="/เพิ่มผู้สอน" passHref>
          <ListItem
            button
            className={router.pathname === "/เพิ่มผู้สอน" ? "Mui-selected" : ""}
          >
            <ListItemIcon>
              <PersonAdd />
            </ListItemIcon>
            <ListItemText primary="เพิ่มผู้สอน" />
          </ListItem>
        </Link>

        {/* คลังข้อสอบ */}
        <Link href="/คลังข้อสอบ" passHref>
          <ListItem
            button
            className={router.pathname === "/คลังข้อสอบ" ? "Mui-selected" : ""}
          >
            <ListItemIcon>
              <Quiz />
            </ListItemIcon>
            <ListItemText primary="คลังข้อสอบ" />
          </ListItem>
        </Link>

        {/* คะแนน */}
        <Link href="/คะแนน" passHref>
          <ListItem
            button
            className={router.pathname === "/คะแนน" ? "Mui-selected" : ""}
          >
            <ListItemIcon>
              <TableChart
              color=""
              />
              
            </ListItemIcon>
            <ListItemText primary="คะแนน" />
          </ListItem>
        </Link>
  {/* วิเคราะห์ข้อมูล */}
  <Link href="/วิเคราะห์ข้อมูล" passHref>
          <ListItem
            button
            className={router.pathname === "/วิเคราะห์ข้อมูล" ? "Mui-selected" : ""}
          >
            <ListItemIcon>
              <BarChart
              color=""
              />
            </ListItemIcon>
            <ListItemText primary="วิเคราะห์ข้อมูล" />
          </ListItem>
        </Link>

      </List>
    </Drawer>
  );
}
