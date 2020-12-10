import React, { Component } from 'react';
import './Overview.css';

class Overview extends Component {
  handleNext = (e) => {
    e.preventDefault();
    this.props.history.push('/getting-started');
  }

  render() {    
    return (
      <div>
        <article>
          <h2>Welcome to the logging app!</h2>
          <p>You can create logs by starting and stopping the clock.</p>
          <p>View your logs by clicking on the View page at the top.</p>
          <p>Highlight logs you want to adjust or export, also from the View page.</p>
          <button onClick={(e) => { this.handleNext(e) }}>Next</button>
        </article>
      </div>
    );
  }
}

export default Overview;