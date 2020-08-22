import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { register } from '../../../actions/auth';
import { Form, Button, Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        password2: ''
    };

    static propTypes = {
      register: PropTypes.func.isRequired,
      isAuthenticated: PropTypes.bool
    };

    onSubmit = e => {
        e.preventDefault();
        const { username, email, password, password2 } = this.state;
        if (password !== password2 ) {
          console.log('Password do not match');
        } else {
          const newUser = {
            username,
            password,
            email
          };
          this.props.register(newUser);
        }
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    render() {
        const { username, email, password , password2 } = this.state;
        if (this.props.isAuthenticated) {
          return <Redirect to="/" />;
        }
        return (
          <Container>
          <Form onSubmit={this.onSubmit}>
              <Form.Field>
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={this.onChange}
                value={username}
              />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={this.onChange}
                  value={email}
                />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={this.onChange}
                  value={password}
                />
              </Form.Field>
              <Form.Field>
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password2"
                  onChange={this.onChange}
                  value={password2}
                />
              </Form.Field>
              <Button type='submit'>Register</Button>
              <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
            </Form>
          </Container>
        );
    }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {register})(Register);