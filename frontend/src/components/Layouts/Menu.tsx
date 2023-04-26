import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ListItem } from "@mui/material";
import Link from 'next/link';
import {
  BarChart,
  MenuBook,
  Group,
  PersonAdd,
  LibraryAddCheck,
  Quiz,
  TableChart,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store/store";
import { getSession, userID } from "@/store/slices/userSlice";
import { useSelector } from "react-redux";

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
  const dispatch = useAppDispatch();

  const checkLevel = useSelector(userID);
  React.useEffect(() => {
    dispatch(getSession());
  }, [dispatch]);

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader />
      <Divider />
      <List>
        {/* รายวิชา */}
        <ListItem
          button
          selected={router.pathname === "/instructor"}
          component={Link}
          href="/instructor"
        >
          <ListItemIcon>
            <MenuBook />
          </ListItemIcon>
          <ListItemText primary="รายวิชา" />
        </ListItem>

        {/* การทดสอบ */}
        <ListItem
          button
          selected={router.pathname === "/instructor/testStatus"}
          component={Link}
          href="/instructor/testStatus"
        >
          <ListItemIcon>
            <LibraryAddCheck />
          </ListItemIcon>
          <ListItemText primary="การทดสอบ" />
        </ListItem>

        {/* รายชื่อ */}
        <ListItem
          button
          selected={router.pathname === "/instructor/studentList"}
          component={Link}
          href="/instructor/studentList"
        >
          <ListItemIcon>
            <Group />
          </ListItemIcon>
          <ListItemText primary="รายชื่อ" />
        </ListItem>

        {/* เพิ่มผู้สอน */}
        <ListItem
          button
          selected={router.pathname === "/instructor/addInstructor"}
          component={Link}
          href="/instructor/addInstructor"
        >
          <ListItemIcon>
            <PersonAdd />
          </ListItemIcon>
          <ListItemText primary="เพิ่มผู้สอน" />
        </ListItem>

        {/* คลังข้อสอบ */}
        <ListItem
          button
          selected={router.pathname === "/instructor/examLibrary"}
          component={Link}
          href="/instructor/examLibrary"
        >
          <ListItemIcon>
            <Quiz />
          </ListItemIcon>
          <ListItemText primary="คลังข้อสอบ" />
        </ListItem>

        {/* คะแนน */}
        <ListItem
          button
          selected={router.pathname === "/instructor/score"}
          component={Link}
          href="/instructor/score"
        >
          <ListItemIcon>
            <TableChart />
          </ListItemIcon>
          <ListItemText primary="คะแนน" />
        </ListItem>

        {/* วิเคราะห์ข้อมูล */}
        <ListItem
          button
          selected={router.pathname === "/instructor/analyze"}
          component={Link}
          href="/instructor/analyze"
        >
          <ListItemIcon>
            <BarChart />
          </ListItemIcon>
          <ListItemText primary="วิเคราะห์ข้อมูล" />
        </ListItem>
      </List>

      <Divider />
    </Drawer>
  );
}
