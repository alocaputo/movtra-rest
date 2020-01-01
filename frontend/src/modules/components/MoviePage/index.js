import React, { Component } from 'react';
import Poster from '../Poster';
import { Container } from 'semantic-ui-react'
import { Grid } from 'semantic-ui-react';
import 'react-day-picker/lib/style.css';
import Log from './Log';

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
                <section className='episode-layout'>
                {this.state.isLoaded ? 
                <Grid>

                    <Grid.Row>
                    <Grid.Column width={8}>
                    <h1>{this.state.movie.title}</h1>
                    </Grid.Column>
                    <Grid.Column width={8}>
                    <h3>{this.state.movie.original_title !== this.state.movie.title && this.state.movie.original_title}</h3>
                    </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                    <Grid.Column width={16}>
                    <p>{this.state.movie.tagline}</p>
                    </Grid.Column>
                    </Grid.Row>
            
                    <Grid.Row>
                    <Grid.Column width={3}>
                        <Poster
                            poster_path= {this.state.movie.poster_path}
                            className="poster ui centered"
                            size="154"
                            />
                            <div className='genres'>
                        {this.state.movie.genres && this.state.movie.genres.map(genre =>(<React.Fragment key={genre.id}><p>{genre.name}</p></React.Fragment>))}
                        </div>
                        <p>Runtime: {this.state.movie.runtime} min</p>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <p>{this.state.movie.overview}</p>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        
                        {this.state.isLoaded ? <Log data={this.state}/> : <p>Loading...</p>}
                    </Grid.Column>
                    </Grid.Row>
                    
                </Grid>
    : <h2>Loading..</h2>}
                </section>
                </Container>
        );
    }
}

export default MoviePage;