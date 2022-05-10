import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

interface AuthenticationViewProps {
    onStart: (apiKey: string) => void;
}

export class AuthenticationView extends React.Component<AuthenticationViewProps, {}> {
  protected handleStart = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const {onStart} = this.props;

    const data = new FormData(event.currentTarget);
    console.log({
      apiKey: data.get('apiKey'),
    });
    onStart(data.get("apiKey") as string)
  };

  public render() {
    return (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
              <Typography component="h1" variant="h5">
                Please provide your API Key
              </Typography>
              <Box component="form" onSubmit={this.handleStart} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="apiKey"
                  label="API Key"
                  type="password"
                  id="apiKey"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Start
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="https://console.developers.google.com/" variant="body2">
                      {"Don't have an API key? Set up one in your Google Account"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      );
  }
}
