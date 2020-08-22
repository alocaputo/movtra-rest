import React, { Component } from 'react';
import { Button, Header, Rating, Modal, Form, Checkbox } from 'semantic-ui-react'
import { logMovie } from "../../../../actions/movies";
import { connect } from 'react-redux'
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
    
      componentDidMount(){
          this.setState({movie: this.props.data})
      }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    toggle = () => this.setState((prevState) => ({ favorite: !prevState.favorite }))
    setDate = date => this.setState({ date })

    handleRate = (e, { rating }) => this.setState({ rating })

    onSubmit = e => {
        e.preventDefault();
        this.props.logMovie(this.state);
    }

    onRequestClose = () => { this.visibleModal(false); } 

    render() {
        const { movie, review, rating, favorite, date } = this.state
        return (
        
            <Modal trigger={<Button>Log this movie</Button>} closeIcon>
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
        );
    }
}

const mapStateToProps = state => ({
    movie: state
  });

export default connect(mapStateToProps, {logMovie})(MoviePage);