import React, { Component } from 'react';
import ExportOption from '../ExportOption/ExportOption';
import './Exporter.css';

class Exporter extends Component {
  state = {
    orientation: '',
    selectedOptions: [],
    exporting: false,
    fetchError: {
      code: '',
      message: ''
    }
  }

  orientationRef = React.createRef();

  updateOrientation = (orientation) => {
    this.setState({ orientation });
  }

  updateSelectedOptions = (option) => {
    let selectedOptions = this.state.selectedOptions;
    if (selectedOptions.includes(option))
      selectedOptions = selectedOptions.filter(selected => selected !== option);
    else selectedOptions.push(option);
    this.setState({ selectedOptions });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    //exporting/error
    //this.props.exportLogs(orientation, selectedOptions)
  }

  /**
   * Render radio button for row and column
   * options.
   */
  renderOrientationOptions = () => {
    return ['As columns', 'As rows']
      .map(option => {
        return (
          <ExportOption
            key={option}
            type='radio'
            ref={el => this.orientationRef = el}
            option={option}
            name='orientation'
            form='export-form'
            selected={[this.state.orientation]}
            update={this.updateOrientation}
            role='presentation' />
        );
      });
  }

  /**
   * Render checkbox for each export format.
   */
  renderExportOptions = () => {
    const exportOptions = [
      'Excel', 'SQL', 'Dataframe',
      'TXT', 'Array', 'Formatted String',
      'Object', 'CSV', 'JSON'
    ].map(option => {
      return (
        <ExportOption
          key={option}
          type='checkbox'
          option={option}
          name='export-options'
          form='export-form'
          update={this.updateSelectedOptions}
          role='gridcell' />
      );
    });

    // Position checkboxes into rows
    let rows = [];
    let perRow = 3;
    for (let i = 0; i < exportOptions.length; i += perRow) {
      rows.push(
        <div key={`export-options-col-${i}`} role='row'>
          {exportOptions.slice(i, i + perRow)}
        </div>
      );
    }
    return rows;
  }

  render() {
    return (
      <section className='exporter'>
        <output form='export-form' className='form-status'>{this.state.fetchError.message || (this.state.exporting && 'Exporting...')}</output>
        <div className='group-row' role='presentation'> {/*<!--Check how this affects DOM-->*/}
          <h3 id='export-heading'>Export Logs</h3>
          <fieldset className='group-column'>
            {this.renderOrientationOptions()}
          </fieldset>
        </div>
        <form action='' id='export-form' className='group-column' role='grid' aria-labelledby='export-heading'>
          <fieldset form='export-form' className='group-row'>
            {this.renderExportOptions()}
          </fieldset>
          <button
            type='submit'
            form='export-form'
            onClick={(e) => { this.handleSubmit(e) }}
            disabled={!this.state.orientation || !this.state.selectedOptions.length}
          > Export
          </button>
        </form>
      </section>
    );
  }
}

export default Exporter;