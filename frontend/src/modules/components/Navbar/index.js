import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'

export default class Navbar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Segment inverted>
        <Menu inverted stackable>
            <Menu.Item name="movTra"
              className="brand"
              onClick={this.handleItemClick}>
            <img src='https://react.semantic-ui.com/logo.png' alt="movtra-logo" />
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
        </Menu>
      </Segment>
    )
  }
}
//export default Navbar;