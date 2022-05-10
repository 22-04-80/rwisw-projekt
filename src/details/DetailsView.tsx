import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface DetailsViewProps {
    searchResult: any; // TODO
    onSelectResult: any;
}

const theme = createTheme();

export class DetailsView extends React.Component<DetailsViewProps, {}> {
    public render() {
        const {searchResult, onSelectResult} = this.props;

        console.log(searchResult)

        return (
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AppBar position="relative">
                <Toolbar>
                  <Typography variant="h6" color="inherit" noWrap onClick={() => onSelectResult(null)}>
                    &lt; Back to search
                  </Typography>
                </Toolbar>
              </AppBar>
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
                        {searchResult?.result?.name}
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        {searchResult?.result?.description}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <Typography variant="h6" align="left" color="text.secondary" paragraph>
                            Type: {searchResult?.result["@type"].join(", ")}
                        </Typography>
                        <Chip label={`Score: ${Number(searchResult?.resultScore).toFixed(2)}`} color="primary"></Chip>
                    </Stack>
                    <Typography>
                        {searchResult?.result?.detailedDescription?.articleBody}
                    </Typography>
                    {searchResult?.result?.url && (
                        <Link href={searchResult.result.url}>See more</Link>
                    )}
                    <Typography variant="caption" display="block" gutterBottom color="text.secondary">
                        License: {searchResult?.result?.detailedDescription?.license}
                    </Typography>
                    </Container>
                </Box>
                </main>
            </ThemeProvider>
          );
    }
}
