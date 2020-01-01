import React, { Component } from 'react';
import Poster from '../Poster';
import { Button, Header, Rating, Modal, Form, Checkbox, Container } from 'semantic-ui-react'
import { Grid } from 'semantic-ui-react';
import { logMovie } from "../../../actions/movies";
import { connect } from 'react-redux'
import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

class MoviePage extends Component {
    state = {
        movie: [],
        review: '',
        rating: '',
        favorite: false,
        date: new Date()
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

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    toggle = () => this.setState((prevState) => ({ favorite: !prevState.favorite }))
    setDate = date => this.setState({ date })

    handleRate = (e, { rating }) => this.setState({ rating })

    onSubmit = e => {
        e.preventDefault();
        const { movie, review, rating, favorite, date } = this.state;
        this.props.logMovie(this.state);
    }

    render() {
        const { movie, review, rating, favorite, date } = this.state
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
                                <Form onSubmit={this.onSubmit}>
                                    <Form.Field>
                                    <DayPickerInput  
                                        onChange={this.setDate}
                                        value={this.state.date}
                                        />
                                    </Form.Field>
                                    <Form.Field>

                                        
                                    <Rating maxRating={5} onRate={this.handleRate} />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>review</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="review"
                                            onChange={this.onChange}
                                            value={review}
                                        />
                                    </Form.Field>
                                    <Form.Field>              
                                        <Checkbox label='favorite' onChange={this.toggle} />
                                    </Form.Field>
                                    <Button type='submit'>Log</Button>
                            </Form>
                            </Modal.Content>
                            <Modal.Actions>
                            
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

const mapStateToProps = state => ({
    movie: state
  });

export default connect(mapStateToProps, {logMovie})(MoviePage);