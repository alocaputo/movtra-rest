import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route 
        {...rest}
        render={props => {
            if (auth.isLoading) {
                return <h2>isLoading...</h2>
            } else if (!auth.isAuthenticated) {
                console.log(auth)
                return  <Redirect to='/login'/>
            } else {
                console.log('here')
                return <Component {...props}/>
            }
        }}
    />
)

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);