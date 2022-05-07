import { useState } from 'react';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Paper from '@mui/material/Paper';
import Title from '../../components/Title';
import APP_CONFIG from "../../config/AppConfig";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function ContactsCreate() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const isValidEmail = email =>
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );

  const onSubmit = async (formData) => {
    try {
      const response = await fetch(`${APP_CONFIG.API_URL}/contacts`, {
        method: "POST",
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.status === 200) {
        setIsError(false);
        setIsSuccess(true);
        reset();
      } else {
        setIsError(true);
        setErrorMessage(data.message);
      }
    } catch (error) {
      setIsSuccess(false);
      setIsError(true);
      setErrorMessage("There was an error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', paddingBottom: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <Title>Create contact</Title>
          </Grid>
          <Grid item xs={2} textAlign={"right"}>
            <Button type='submit'>
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
              error={!!errors?.firstName?.message}
              label="First name"
              fullWidth
              variant="standard"
              {...register("firstName", { required: "This is required." })}
              helperText={errors?.firstName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              error={!!errors?.lastName?.message}
              label="Last name"
              fullWidth
              variant="standard"
              {...register("lastName", { required: "This is required." })}
              helperText={errors?.lastName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              error={!!errors?.email?.message}
              label="Email"
              fullWidth
              variant="standard"
              {...register("email", {
                required: "This is required.", validate: email => {
                  const isValid = isValidEmail(email);
                  return isValid || "Enter a valid email.";
                }
              })}
              helperText={errors?.email?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              error={!!errors?.phone?.message}
              label="Phone"
              fullWidth
              variant="standard"
              {...register("phone", { required: "This is required." })}
              helperText={errors?.phone?.message}
            />
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
}
