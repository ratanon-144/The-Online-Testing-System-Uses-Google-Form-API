import { AppBar, Button, IconButton, Toolbar, Typography,Stack } from '@mui/material'
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';

export const Navbar = () => {
  return (
    <AppBar position='static'>
    <Toolbar>
    <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
    <QuizOutlinedIcon />
    </IconButton>
    <Typography variant='h6' component='div' sx={{ flexGrow:1}}>
    </Typography>
    <Stack direction='row' spacing={2}>
      <Button color='inherit'>1</Button>
      <Button color='inherit'>1</Button>
      <Button color='inherit'>1</Button>
      <Button color='inherit'>1</Button>
      <Button color='inherit'>1</Button>
      <Button color='inherit'>1</Button>
    </Stack>
    </Toolbar>
</AppBar>
  )
}

