//updateProject
//context: project
//state: last format => apply last format to new logs
//state: logs with their formats
//state: selected log id

/*
keep state in a single object or obbject in a single context, 
not seprate log and project in different

arrayofproject and array of logs-->and is only of current project, 
context will only hold logs for whetever logs of project is currently selected. 
and can filter for selected logs if needed.

setProject(projectid) fetches logs
*/

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import LoggerForm from '../../Components/Logger/LoggerForm/LoggerForm';
import Formatter from '../../Components/Formatter/Formatter';
import LogList from '../../Components/LogList/LogList';
import formatLog from '../../Components/Formatter/formatLog';
import './Log.css';

class Log extends Component {
  state = {
    currentProject: 'example-project-id',
    logs: [
      { id: 'example-log-id1', start: '10-27-2020 12:00:00', end: '10-27-2020 14:00:00' },
      { id: 'example-log-id2', start: '10-27-2020 12:00:00', end: '10-27-2020 14:00:00' },
      { id: 'example-log-id3', start: '10-27-2020 12:00:00', end: '10-27-2020 14:00:00' }
    ], // logs of the project for the day
    format: {
      min: 0,
      sec: 0,
      touched: false
    }
  }

  updateProject = () => { }

  updateFormat = (type, num) => {
    let { min, sec } = this.state.format;

    num = parseInt(num);
    if (type === 'min') min = num;
    else if (type === 'sec') sec = num;
    this.setState({ format: { min, sec, touched: true } });
  }

  formatLogList = () => {
    formatLog({}, {}); //formatlogs not log?
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <article className='logger page'>
        <LoggerForm updateProject={this.updateProject} />
        <Formatter 
          format={this.state.format} 
          updateFormat={this.updateFormat} 
          formatLogList={this.formatLogList} /> {/* format logs somehow*/}
        <LogList logs={this.state.logs} status='' />
      </article>
    );
  }
}

export default withRouter(Log);
