import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getProfile, getDiary } from '../../../actions/profile';
import { Container, Grid, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import Recent from './Recent';

class Profile extends Component {
    static propTypes = {
        getProfile: PropTypes.func.isRequired
      }

    componentDidMount() {
        this.props.getProfile(this.props.match.params.username);
        this.props.getDiary(this.props.match.params.username);    
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
                        <Grid.Column width={12}>
                            <h4>Recent Activity</h4>
                            <Divider/>
                            {profile.diary.length > 0 ? <Recent diary = {profile.diary} /> : <></>}
                        </Grid.Column>
                        <Grid.Column width={4}>
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
    auth: state.auth,
  });

export default connect(mapStateToProps, {getProfile, getDiary})(Profile);