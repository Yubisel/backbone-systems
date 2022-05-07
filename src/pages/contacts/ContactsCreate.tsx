import { useState } from 'react';
import { Link } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Title from '../../components/Title';
import APP_CONFIG from "../../config/AppConfig";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { ContactType } from '../../types/ContactType';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

enum Fields {
  FirstName,
  Lastname,
  Email,
  Phone
}

export default function ContactsCreate() {
  const [oContact, setContact] = useState<ContactType>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleInputChange = ({ target: { value } }, field: Fields) => {
    switch (field) {
      case Fields.FirstName:
        setContact(oContact => ({ ...oContact, firstName: value }));
        break;
      case Fields.Lastname:
        setContact(oContact => ({ ...oContact, lastName: value }));
        break;
      case Fields.Email:
        setContact(oContact => ({ ...oContact, email: value }));
        break;
      case Fields.Phone:
        setContact(oContact => ({ ...oContact, phone: value }));
        break;
    }
  }

  const handleSave = async () => {
    console.log("salvando");
    try {
      const response = await fetch(`${APP_CONFIG.API_URL}/contacts`, {
        method: "POST",
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(oContact)
      });
      const data = await response.json();
      if (response.status === 200) {
        setIsSuccess(true);
      } else {
        setIsError(true);
        setErrorMessage(data.message);
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage("There was an error");
    }
  }

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', paddingBottom: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Title>Create contact</Title>
        </Grid>
        <Grid item xs={2} textAlign={"right"}>
          <Button onClick={handleSave}>
            <SaveIcon /> Save
          </Button>
          <Button component={Link} to={"/contacts"}>
            <CancelIcon /> Cancel
          </Button>
        </Grid>
      </Grid>

      {isSuccess &&
        <Grid item xs={12} marginBottom={3}>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            The contact was saved!!!
          </Alert>
        </Grid>
      }

      {isError &&
        <Grid item xs={12} marginBottom={3}>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {errorMessage}
          </Alert>
        </Grid>
      }

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            variant="standard"
            value={oContact.firstName}
            onChange={e => { handleInputChange(e, Fields.FirstName) }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            variant="standard"
            value={oContact.lastName}
            onChange={e => { handleInputChange(e, Fields.Lastname) }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            variant="standard"
            value={oContact.email}
            onChange={e => { handleInputChange(e, Fields.Email) }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone"
            fullWidth
            variant="standard"
            value={oContact.phone}
            onChange={e => { handleInputChange(e, Fields.Phone) }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
