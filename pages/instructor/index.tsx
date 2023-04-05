import * as React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {GridRowsProp,GridRowModesModel,GridRowModes,DataGrid,GridColumns,GridRowParams,MuiEvent,GridToolbarContainer,GridActionsCellItem,GridEventListener,GridRowId, GridRowModel, useGridApiContext,gridEditRowsStateSelector
} from "@mui/x-data-grid";
import { randomId} from "@mui/x-data-grid-generator";
import Layout from "@/components/Layouts/Layout";
import withAuth from "@/components/withAuth";
import { Card, Stack, Typography ,Box } from "@mui/material";
import { useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
const initialRows: GridRowsProp = [
  {
    id: randomId(),
    subjectid: "1",
    subjectname: "Application Layer",
    secid: "101",
  },
  {
    id: randomId(),
    
    subjectid: "2",
    subjectname: "Transport Layer",
        secid: "53",
  },
  {
    id: randomId(),
    subjectid: "3",
    subjectname: "Network Layer",
    secid: "101",
  },
  
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, subjectid: "", subjectname: "" ,secid: "", isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "subjectname" }
    }));
  };

  return ( 
    <GridToolbarContainer>
         <Box sx={{ flexGrow: 0 }}>
            <Button size='medium' sx={{color:"#FF9800" }}  startIcon={<AddIcon />} onClick={handleClick}>เพิ่มเรื่อง
                </Button>
                </Box> 
    </GridToolbarContainer>
  );
}

function SaveButton({ id, ...props }): JSX.Element {
  const apiRef = useGridApiContext();
  const editState = gridEditRowsStateSelector(apiRef.current.state);
  const subjectnameValue = editState[id]?.subjectname?.value;

  return (
     // eslint-disable-next-line react/jsx-key
    <GridActionsCellItem
      icon={<SaveIcon />}
      label="Save"
      color="primary"
      disabled={!subjectnameValue}
      {...props}
    />
  );
}
type Props = {};
const Instructor = ({}: Props) => {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const columns: GridColumns = [
    { field: "subjectid", type: "string", headerName: "ลำดับ", width: 180, headerClassName: 'super-app-theme--header', editable: true },
    { field: "subjectname", type: "string",  headerName: "ชื่อเรื่อง", flex: 1,headerClassName: 'super-app-theme--header', editable: true },
     {field: "actions",type: "actions",headerName: "Actions", width: 100, headerClassName: 'super-app-theme--header', cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [ // eslint-disable-next-line react/jsx-key
            <SaveButton onClick={handleSaveClick(id)} id={id} />, // eslint-disable-next-line react/jsx-key
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />
          ];
        }

        return [
          // eslint-disable-next-line react/jsx-key
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />, // eslint-disable-next-line react/jsx-key
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />
        ];
      }
    }
  ];

return (
<Layout>
<Stack spacing={2}>
<Typography text-align='left' variant='h3'>คลังข้อสอบ</Typography>  
 <Card  sx={{ margin: "10",   padding: "30px 25px",    textTransform: "capitalize",    }}> 
        <Stack spacing={2}>
                    <Stack  direction="row" justifyContent="flex-end"alignItems="flex-start"spacing={2}>  
                        <Button  size='large' variant='contained' href='/instructor/examLibrary/CreateLibrary'>
                           เพิ่มเรื่อง
                        </Button>
                    </Stack>
                     <Box  sx={{    height: 600,    width: "100%", "& .super-app-theme--header": {backgroundColor: "#FF9800",color:"#FFF" } }}> 
                    <DataGrid rows={rows}  columns={columns} editMode="row" rowModesModel={rowModesModel}
                     onRowEditStart={handleRowEditStart}  onRowEditStop={handleRowEditStop}processRowUpdate={processRowUpdate}
                    //   components={{ Toolbar: EditToolbar }} 
                       componentsProps={{toolbar: { setRows, setRowModesModel } }}experimentalFeatures={{ newEditingApi: true }}/></Box>
            </Stack>
        
     
           {/* <Box display='flex' justifyContent='flex-end'>
               <Button
                   sx={{ margin: 1 }}
                   size='large'
                   variant='contained'
                   onClick={handleClick}>
                   สร้างรายวิชา
                 
               </Button>
           </Box> */}
       </Card>
   </Stack>
</Layout>
  );
}
export default withAuth(Instructor);