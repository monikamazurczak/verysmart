import React from 'react';
import './Rank.css';


class Rank extends React.Component {
  constructor() {
    super();
    this.state = {
      emoji: ''
    }
  }

  componentDidMount() {
    const { entries } = this.props
    this.generateEmoji(entries)
  }

  componentDidUpdate(prevProps) {
    if (this.props.entries !== prevProps.entries) {
      this.generateEmoji(this.props.entries);
    }
  }

  generateEmoji = (entries) => {
    fetch(`${process.env.REACT_APP_LAMBDA}?rank=${entries}`)
      .then(response => response.json())
      .then(data => this.setState({ emoji: data.input }))
      .catch(err => console.log(err))
  }

  render() {
    const { name, entries } = this.props
    const { emoji } = this.state
    let noEmptyName = (name) ? name : 'Hello';
    let unknownEntries = (isNaN(entries)) ? 'unknown' : entries;
    return (
      <div className="rank ph4">
        <div className='white f3'>
          {`${noEmptyName}, your entry count is...`}
        </div>
        <div className='white f1 flex items-center justify-center'>
          {unknownEntries} <span className="f3 ml2">{emoji}</span>
        </div>
      </div>
    );
  }
}

export default Rank;