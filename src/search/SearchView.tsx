import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SearchResult } from './SearchResult';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

interface SearchViewProps {
  apiKey: string;
}

interface SearchViewState {
  query: string;
}

export class SearchView extends React.Component<SearchViewProps, SearchViewState> {
  constructor(props: SearchViewProps) {
    super(props);

    this.state = {query: ""};
  }

  protected onQueryChange = (event: any): void => {
    this.setState({
      query: event?.target?.value as string,
    });
  }

  public render () {
      const {apiKey} = this.props;
      const {query} = this.state;

      return (
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
              {/* Hero unit */}
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  pt: 8,
                  pb: 6,
                }}
              >
                <Container maxWidth="sm">
                  <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                  >
                    Book finder with recommendations
                  </Typography>
                  <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    Use search below to find your favourite books
                  </Typography>
                  <TextField fullWidth label="Query" id="query" value={query} onChange={this.onQueryChange} />
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => console.log(query)}
                  >
                    Search
                  </Button>
                </Container>
              </Box>
              <Container sx={{ py: 8 }} maxWidth="md">
                {/* End hero unit */}
                <Grid container spacing={4}>
                  {cards.map((searchResult) => <SearchResult key={searchResult} searchResult={searchResult} />)}
                </Grid>
              </Container>
            </main>
          </ThemeProvider>
        );
  }
}