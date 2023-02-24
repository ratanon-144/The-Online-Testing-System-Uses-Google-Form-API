import Layout from "@/components/Layouts/Layout";
import { Edit, LocationOn, PersonAdd } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Card,
    Chip,
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    Switch,
    Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

type Props = {};

export default function library({}: Props) {
    return (
        <Layout>
            <div>library</div>
            <Box display="flex" justifyContent="flex-end" >
        <Button  sx={{ margin: 1 }}  size="large" variant="contained"  href='/instructor/examLibrary/CreateLibrary'> Click </Button>
      </Box> 
        </Layout>
    );
}
