import React, { Component } from 'react';
import Navbar from './modules/components/Navbar'

class App extends Component {

  render() {
  return (
    <React.Fragment>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Navbar/>
        </React.Suspense>
        {this.props.children}
    </React.Fragment>
  );
  }
}

export default App;
