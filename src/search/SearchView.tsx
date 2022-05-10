import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SearchResult } from './SearchResult';
import { KnowledgeGraph } from '../knowledgeGraph/KnowledgeGraph';

const theme = createTheme();

interface SearchViewProps {
  apiKey: string;
  onSelectResult: Function;
}

interface SearchViewState {
  query: string;
  searchResults: any[]; // TODO
  loading: boolean;
  error: boolean;
}

export class SearchView extends React.Component<SearchViewProps, SearchViewState> {
  protected kg: KnowledgeGraph;

  constructor(props: SearchViewProps) {
    super(props);

    this.state = {query: "", searchResults: [], loading: false, error: false};

    this.kg = new KnowledgeGraph(props.apiKey);
  }

  protected onQueryChange = (event: any): void => {
    this.setState({
      query: event?.target?.value as string,
    });
  }

  protected onPerformSearch = async (): Promise<void> => {
    const {query} = this.state;

    this.setState({searchResults: [], loading: true, error: false})

    try {
      const response = await this.kg.search(query);
      const responseJson = await response.json();
      console.log(responseJson);
  
      this.setState({searchResults: responseJson.itemListElement, loading: false, error: false});
    } catch(error) {
      this.setState({searchResults: [], loading: false, error: true});
      console.error(error);
    }
  }

  public render () {
      const {onSelectResult} = this.props;
      const {query, loading, searchResults, error} = this.state;
      console.log({searchResults})

      return (
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
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
                    onClick={this.onPerformSearch}
                    disabled={loading}
                  >
                    Search
                  </Button>
                  {loading && (<LinearProgress />)}
                </Container>
              </Box>
              <Container sx={{ py: 8 }} maxWidth="md">
                <Grid container spacing={4}>
                  {!error && searchResults?.length === 0 && (
                    <Grid
                      container
                      spacing={0}
                      direction="column"
                      alignItems="center"
                    >
                      <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        No results
                      </Typography>
                    </Grid>
                  )}

                  {(error || !searchResults) && (
                    <Grid
                      container
                      spacing={0}
                      direction="column"
                      alignItems="center"
                    >
                      <Typography variant="h5" align="center" paragraph>
                        Incorrect API Key
                      </Typography>
                      <Typography variant="h6" color="text.secondary" align="center" paragraph>
                        Please refresh the page and try again.
                      </Typography>
                    </Grid>
                  )}


                  {!error && searchResults?.map((searchResult) => (
                    <SearchResult
                      key={searchResult.result["@id"]}
                      searchResult={searchResult}
                      onSelectResult={onSelectResult}
                    />
                  ))}
                </Grid>
              </Container>
            </main>
          </ThemeProvider>
        );
  }
}