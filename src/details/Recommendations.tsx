import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import {KnowledgeGraph} from '../knowledgeGraph/KnowledgeGraph';

interface RecommendationsProps {
    apiKey: string;
    selectedResult: any;
    onSelectResult: Function;
}

interface RecommendationsState {
    recommendations: any[];
    loading: boolean;
}

export class Recommendations extends React.Component<RecommendationsProps, RecommendationsState> {
    protected kg: KnowledgeGraph;

    constructor(props: RecommendationsProps) {
      super(props);
  
      this.state = {recommendations: [], loading: true};
  
      this.kg = new KnowledgeGraph(props.apiKey);
    }

    async componentDidMount() {
        const {selectedResult} = this.props;

        if (selectedResult?.result?.name) {
            const recommendationsResult = await this.kg.getRecommendations(selectedResult?.result?.name)
            const recommendationsJson = await recommendationsResult.json();
            this.setState({loading: false, recommendations: recommendationsJson.itemListElement});
        }
    }

    public render() {
        const {selectedResult, onSelectResult} = this.props;
        const {recommendations, loading} = this.state;

        return (
            <Container sx={{ py: 8 }} maxWidth="md">
                <Typography variant="h6" align="left" color="text.secondary">
                    Recommendations:
                </Typography>
                {loading && (<LinearProgress color="secondary"/>)}

                <Grid container spacing={4}>
                    {recommendations.filter((recommendation) => recommendation?.result?.name !== selectedResult?.result?.name).map((recommendation) => (
                        <Card key={recommendation.result["@id"]} variant="outlined">
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {recommendation?.result?.description}
                                </Typography>
                                <Typography sx={{ fontSize: 16 }} component="div">
                                    {recommendation?.result?.name}
                                </Typography>
                                <Chip
                                    size="small"
                                    label={`Score: ${Number(recommendation?.resultScore).toFixed(2)}`}
                                    color="secondary"
                                />
                                <CardActions>
                                    <Button size="small" type="button" onClick={() => onSelectResult(recommendation)}>View</Button>
                                </CardActions>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>
            </Container>
        )
    }
}
