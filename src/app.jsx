import React from 'react';
import '../styles/index.scss';
import Module from './Module';
import defaultData from './defaultData';
import Assessments from './Assessments';


export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {inputs : defaultData.inputs, savedStates: defaultData.savedStates, assessments: defaultData.assessments}
	}

	componentWillMount() {
		if(localStorage.getItem('reactState')) {
			var newState = JSON.parse(localStorage.reactState);
			this.setState({inputs:newState.inputs, savedStates:newState.savedStates});

		}
	}

  render() {
		var modules = '';

		if(this.state.savedStates) {
			modules = 	<Module inputs={this.state.inputs} savedStates={this.state.savedStates}/>;
		}

    return (
      <div className="sv-container"><br/>
				<div className="sv-panel sv-panel-primary">
					<div className="sv-panel-heading">
						Example form
						</div>
					<div className="sv-panel-body">
							{modules}
						<Assessments assessments={this.state.assessments} />
				 	</div>
				 </div>
      </div>
    )
  }
}
