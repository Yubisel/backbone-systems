import Paper from '@mui/material/Paper';
import Title from '../components/Title';
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function NotFound() {
  return   <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column'}}>
  <Grid container spacing={2}>
    <Grid item xs={10}>
      <Title>Page not found</Title>
    </Grid>
    <Grid item xs={2} textAlign={"right"}>
      <Button component={Link} to={"/"} data-cy={"create-contact"}>
        <ArrowBackIcon /> Go Home
      </Button>
    </Grid>
  </Grid>
</Paper>;
}


export default NotFound;