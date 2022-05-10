import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

interface SearchResultProps {
    searchResult: any; // TODO
}

export class SearchResult extends React.Component<SearchResultProps, {}> {
    render () {
        const {searchResult} = this.props;
        console.log({searchResult})
        return searchResult && (
        <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h4" component="h2">
                  {searchResult?.result?.name}
                </Typography>
                <Typography gutterBottom variant="h5" component="h3">
                    {searchResult?.result?.description}
                </Typography>
                <Typography>
                    {searchResult?.result?.detailedDescription?.articleBody}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">View</Button>
              </CardActions>
            </Card>
        </Grid>
        )
    }
}
