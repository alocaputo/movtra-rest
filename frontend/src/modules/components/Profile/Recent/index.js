import React, { Component } from 'react';
import MovieCard from '../../MovieCard';
import { Grid } from 'semantic-ui-react';

class Recent extends Component {
    render() {
        const last_year = this.props.diary.length > 0 ? this.props.diary[this.props.diary.length-1] : false
        const last_month = last_year && last_year.months.length > 0 ? last_year.months[last_year.months.length-1] : false
        const last_entries = last_month && last_month.entries.length > 0 ? last_month.entries.slice(0,4) : []

        return (
            <Grid>
            <Grid.Row columns={4}>
                {last_entries.map(entry =><Grid.Column key={entry.movie.tmdb_id}> <MovieCard movie={entry.movie}/> </Grid.Column>)}
            </Grid.Row>
            </Grid>
        );
    }
}

export default Recent;