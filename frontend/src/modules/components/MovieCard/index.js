import React from 'react';
import { Card } from 'semantic-ui-react'
import Poster from '../Poster';

function MovieCard(props) {
    console.log(props.movie);
    return (
        <Card>
            <Poster
                poster_path= {props.movie.poster_path}
                className="poster ui centered"
                size="154"
            />
            <Card.Content>
            <Card.Header>{props.movie.title}</Card.Header>
            <Card.Meta>
                {props.movie.release_date && <span className='date'>{props.movie.release_date.substring(0,4)}</span>}
            </Card.Meta>
            </Card.Content>
        </Card>
    );
}

export default MovieCard;