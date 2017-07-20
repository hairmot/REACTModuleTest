import React from 'react';
import '../styles/index.scss';
import Module from './Module';
import defaultData from './defaultData';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {inputs: defaultData, savedStates: []};
	}

	componentWillMount() {
		if(localStorage.getItem('reactState')) {
			var newState = JSON.parse(localStorage.reactState);
			console.log(newState);
			this.setState({inputs:newState.inputs, savedStates:newState.savedStates});

		}
	}

  render() {
    return (
      <div className="sv-container"><br/>
				<div className="sv-panel sv-panel-primary">
					<div className="sv-panel-heading">
						Example form
						</div>
					<div className="sv-panel-body">
				 		<Module inputs={this.state.inputs} savedStates={this.state.savedStates} />
				 	</div>
				 </div>
      </div>
    )
  }
}
