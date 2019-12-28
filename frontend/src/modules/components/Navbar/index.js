import React, { Component } from 'react'
import { Menu, Segment, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { logout } from '../../../actions/auth'
import 'semantic-ui-css/semantic.min.css'
import logo from '../../../logo.png'

class Navbar extends Component {
  state = { activeItem: 'home' }

  static propTypes ={
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    const { isAuthenticated, user} = this.props.auth;
    const authLinks = (
      <>
        <Menu.Item>
    <span>{ user ? `Hello ${user.username}` : ''}</span>
        </Menu.Item>
        <Menu.Item>
          <Button color='red' onClick={this.props.logout}>Log out</Button>
        </Menu.Item>
      </>
    );

    const guestLinks = (
      <>
        <Menu.Item
        name='register'
        active={activeItem === 'register'}
        as={Link} to="/register"
        onClick={this.handleItemClick}
        />
        <Menu.Item
          name='login'
          active={activeItem === 'login'}
          as={Link} to="/login"
          onClick={this.handleItemClick}
        />
      </>
    );

    return (
      <Segment inverted>
        <Menu inverted stackable>
          <Menu.Item name="movTra"
            className="brand"
            onClick={this.handleItemClick}>
          <img src={logo} alt="movtra-logo" />
          </Menu.Item>
          <Menu.Item
            name='all'
            active={activeItem === 'all'}
            as={Link} to="/all"
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='upcoming'
            active={activeItem === 'upcoming'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='nowPlaying'
            active={activeItem === 'nowPlaying'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='stats'
            active={activeItem === 'stats'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position='right'>
          { isAuthenticated ? authLinks : guestLinks }
          </Menu.Menu>
        </Menu>
      </Segment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logout})(Navbar);