import React, { Component } from 'react';

import { Container } from 'semantic-ui-react'
import { Grid } from 'semantic-ui-react';
import 'react-day-picker/lib/style.css';
import Log from './Log';
import MovieData from './MovieData'

class MoviePage extends Component {
    state = {
        movie: [],
        isLoaded: false,
      };
    
    async componentDidMount() {
        try {
            const data = await fetch(`http://127.0.0.1:8000/api/movies/${this.props.match.params.tmdb_id}`);
            const movie = await data.json();
            this.setState({
            movie,
            isLoaded: true
            });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
                <Container>
                    <section className='movie-layout'>
                    {this.state.isLoaded ? 
                    <Grid>
                        <Grid.Column width={13}>
                        {this.state.isLoaded ? <MovieData data={this.state}/> : <p>Loading...</p>}
                        </Grid.Column>
                        
                        <Grid.Column width={3}>
                            
                            {this.state.isLoaded ? <Log data={this.state}/> : <p>Loading...</p>}
                        </Grid.Column>

                        
                    </Grid>
                    : <h2>Loading..</h2>}
                    </section>
                </Container>
        );
    }
}

export default MoviePage;