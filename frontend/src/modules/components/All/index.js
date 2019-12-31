import React, { Component } from 'react';
import Poster from '../Poster';
import { Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMovies } from '../../../actions/movies'

class All extends Component {
  static propTypes = {
    movies: PropTypes.array.isRequired,
    getMovies: PropTypes.func.isRequired
  }
  
  async componentDidMount() {
    this.props.getMovies();
  }

  render() {
    
    return (
        <Container>
            <div>
        {this.props.movies.map(movie => (
            
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

const mapStateToProps = state => ({
  movies: state.movies.movies
});

export default connect(mapStateToProps, { getMovies })(All);