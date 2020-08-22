import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getMovie } from '../../../actions/movies';
import { Container } from 'semantic-ui-react'
import { Grid } from 'semantic-ui-react';
import 'react-day-picker/lib/style.css';
import Log from './Log';
import MovieData from './MovieData'

class MoviePage extends Component {
    componentDidMount() {
        this.props.getMovie(this.props.match.params.tmdb_id);
        
    }

    render() {
        //console.log(this.props);
        const {isLoaded, movie} = this.props.movie
        console.log(movie);
        return (
            
                <Container>
                    <section className='movie-layout'>
                    {isLoaded ? 
                    <Grid>
                        <Grid.Column width={13}>
                        {isLoaded ? <MovieData data={movie}/> : <p>Loading...</p>}
                        </Grid.Column>
                        
                        <Grid.Column width={3}>    
                            {isLoaded ? <Log data={movie}/> : <p>Loading...</p>}
                        </Grid.Column>

                        
                    </Grid>
                    : <h2>Loading..</h2>}
                    </section>
                </Container>
        );
    }
}

const mapStateToProps = state => ({
    movie: state.movies
  });

export default connect(mapStateToProps, {getMovie})(MoviePage);