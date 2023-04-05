import SaveAsIcon from '@mui/icons-material/SaveAs';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';
import {Table,TableBody, TableCell, TableContainer, TableHead,TableRow,  Paper,  TextField,  IconButton,} from '@mui/material';
import { Edit, Save, Cancel, Add } from '@mui/icons-material';

type Data = {
  id: number;
  name: string;
  email: string;
};

type Props = {
  data: Data[];
};

export default function EditableTable({ data }: Props) {
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [nextId, setNextId] = useState(0);

  const handleEdit = (id: number) => {
    const item = data.find((d) => d.id === id);
    if (item) {
      setEditId(item.id);
      setEditName(item.name);
      setEditEmail(item.email);
    }
  };

  const handleSave = (id: number) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, name: editName, email: editEmail } : item
    );
    // Save the edited data to the database or state management system
    setEditId(null);
  };

  const handleCancel = () => {
    setEditId(null);
  };

  const handleAdd = () => {
    const newItem = { id: nextId, name: '', email: '' };
    setNextId(nextId + 1);
    // Add the new item to the database or state management system
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>
                {editId === item.id ? (
                  <TextField
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  item.name
                )}
              </TableCell>
              <TableCell>
                {editId === item.id ? (
                  <TextField
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                  />
                ) : (
                  item.email
                )}
              </TableCell>
              <TableCell>
                {editId === item.id ? (
                  <>
                    <IconButton
                      color="primary"
                      onClick={() => handleSave(item.id)}
                    >
                      <Save />
                    </IconButton>
                    <IconButton onClick={() => handleCancel()}>
                      <Cancel />
                    </IconButton>
                  </>
                ) : (
                  <IconButton onClick={() => handleEdit(item.id)}>
                    <Edit />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>{nextId}</TableCell>
            <TableCell>
              <TextField
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </TableCell>
            <TableCell>
              <TextField
                value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
          />
        </TableCell>
        <TableCell>
          <IconButton color="primary" onClick={() => handleAdd()}>
            <Add />
          </IconButton>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>
);
}