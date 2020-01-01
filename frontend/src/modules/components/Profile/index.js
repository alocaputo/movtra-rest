import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getProfile } from '../../../actions/profile';
import { Container, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';

class Profile extends Component {
    static propTypes = {
        getProfile: PropTypes.func.isRequired
      }

    componentDidMount() {
        this.props.getProfile(this.props.match.params.username);
    }

    render() {
        const profile = this.props.profile
        return (
            <Container>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <h2>{profile.username}</h2>
                            <p>{profile.bio}</p>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={10}>
                            <h2>Content</h2>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Sidebar
                                watchlist = {profile.watchlist}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
            
        );
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
  });

export default connect(mapStateToProps, {getProfile, })(Profile);