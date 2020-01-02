import React, { Component } from 'react';
import MovieCard from '../../MovieCard';

class Recent extends Component {
    render() {
        const last_four = this.props.watched.length >= 4 ? this.props.watched.slice(0,4) : this.props.watched

        return (
            <div>
                {last_four.map(mov => <MovieCard key={mov.tmdb_id} movie={mov}/>)}
            </div>
        );
    }
}

export default Recent;