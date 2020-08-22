import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import 'react-day-picker/lib/style.css';
import Poster from '../../Poster';

class index extends Component {
    render() {
        return (
            <>
                <Grid.Row>
                    <Grid.Column width={2}>
                    <h1>{this.props.data.title}</h1>
                    </Grid.Column>
                    <Grid.Column width={2}>
                    <h4>{this.props.data.original_title !== this.props.data.title && this.props.data.original_title}</h4>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={13}>
                    <p>{this.props.data.tagline}</p>
                    </Grid.Column>
                </Grid.Row>
        
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Poster
                            poster_path= {this.props.data.poster_path}
                            className="poster ui centered"
                            size="154"
                            />
                            <div className='genres'>
                        {this.props.data.genres && this.props.data.genres.map(genre =>(<React.Fragment key={genre.id}><p>{genre.name}</p></React.Fragment>))}
                        </div>
                        <p>Runtime: {this.props.data.runtime} min</p>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <p>{this.props.data.overview}</p>
                    </Grid.Column>
                    </Grid.Row>    
             </>
        );
    }
}

export default index;