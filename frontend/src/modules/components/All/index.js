import React, { Component } from 'react';
import Poster from '../Poster';
import { Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class All extends Component {
  state = {
    movies: []
  };
  
  async componentDidMount() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/movies/'); // fetching the data from api, before the page loaded
      const movies = await res.json();
      this.setState({
        movies
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
        <Container>
            <div>
        {this.state.movies.map(movie => (
            
          <div key={movie.tmdb_id}>
            <h2>{movie.title}</h2>
            <Link to={`movie/${movie.tmdb_id}`}>
            <Poster className="poster"
            size="154"
            poster_path={movie.poster_path}
            />
            </Link>
            <span>{movie.overview}</span>
          </div>
        ))}
      </div>
      </Container>
    );
  }
}

export default All;