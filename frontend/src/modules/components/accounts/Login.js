import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { login } from '../../../actions/auth';
import { Form, Button, Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

class Login extends Component {
    state = {
        username: '',
        password: '',
    };

    static propTypes = {
      login: PropTypes.func.isRequired,
      isAuthenticated: PropTypes.bool
    };

    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    render() {
      if (this.props.isAuthenticated) {
        return <Redirect to="/" />;
      }
        const { username, password } = this.state;
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
            <label>Password</label>
            <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password}
              />
          </Form.Field>
          <Button type='submit'>Login</Button>
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        </Form>
        </Container>
        );
    }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);