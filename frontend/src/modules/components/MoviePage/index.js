import React, { Component } from 'react';
import Poster from '../Poster';
import { Button, Header, Icon, Modal, Form, TextArea, Container } from 'semantic-ui-react'
import { Grid } from 'semantic-ui-react';

class MoviePage extends Component {
    state = {
        movie: []
      };
    
    async componentDidMount() {
        try {
            const data = await fetch(`http://127.0.0.1:8000/api/movies/${this.props.match.params.tmdb_id}`);
            const movie = await data.json();
            this.setState({
            movie
            });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
        <React.Fragment>
            <React.Suspense fallback={<div>Loading...</div>}>
                <Container>
                <section className='episode-layout'>
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
                        <Modal trigger={<Button>Show Modal</Button>} closeIcon>
                        <Header icon='archive' content='Log movie' />
                            <Modal.Content>
                            <Form>
                                <TextArea placeholder='Tell us more' />
                            </Form>
                            <Form>
                                <TextArea placeholder='Tell us more' />
                            </Form>
                            <Form>
                                <TextArea placeholder='Tell us more' />
                            </Form>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color='red'>
                                    <Icon name='remove' /> No
                                </Button>
                                <Button color='green'>
                                    <Icon name='checkmark' /> Yes
                                </Button>
                            </Modal.Actions>
                        </Modal>
                    </Grid.Column>
                    </Grid.Row>
                    
                </Grid>
                </section>
                </Container>
            </React.Suspense>
        </React.Fragment>
        );
    }
}

export default MoviePage;