import React from 'react';
import '../styles/index.scss';
import Module from './components/Module';
import defaultData from './data/defaultData';
import AssessmentSection from './components/AssessmentSection';
import update from 'immutability-helper'
import persistState from './util/persistState';
import SavePanel from './components/savePanel';
import LearningOutcomes from './components/LearningOutcomes'
import OverviewPanel from './components/overviewPanel'

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputs: defaultData.inputs,
			savedStates: defaultData.savedStates,
			assessments: defaultData.assessments,
			moduleProgress: 0,
			learningOutcomes: defaultData.learningOutcomes
		}

	}

	componentWillMount() {
		var data = document.querySelector('[data-ajax]').value;
		if (data != '') {
			var newState = JSON.parse(data)
			this.setState({
				inputs: newState.inputs,
				savedStates: newState.savedStates,
				assessments: newState.assessments,
				moduleProgress: newState.moduleProgress,
				learningOutcomes: newState.learningOutcomes
			});
		}
	}

	updateModuleProgress = (inputs) => {
		var inputArray = Object.keys(inputs);

		var mod = Math.floor((100 / inputArray.length) * inputArray.filter(a => inputs[a] !== '').length);

		this.setState({ moduleProgress: mod })
	}

	updateAssessments = (assessments) => {
		this.setState({ assessments: assessments });
	}

	updateLearningOutcomes =(lo) => {
		this.setState({ learningOutcomes: lo }, () => {persistState(this.state)});
	}

	saveAssessments = (ass) => {
		this.setState({ assessments: ass }, function () {
			persistState(this.state);
		});
	}

	saveState = (state = {}) => {
		persistState(Object.assign(this.state, state));

	}

	render() {


		var moduleElement = '';
		if (this.state.savedStates) {
			moduleElement = <Module updateModuleProgress={this.updateModuleProgress} saveState={this.saveState} inputs={this.state.inputs} savedStates={this.state.savedStates} />;
		}

		return (
			<div>
				<br />
				<div className="sv-col-md-2">
					<OverviewPanel moduleProgress={this.state.moduleProgress} assessments={this.state.assessments} learningOutcomes={this.state.learningOutcomes} />
					<SavePanel />

				</div>
				{moduleElement}


				<div className="sv-col-md-5">
					<div className="sv-panel sv-panel-primary">
						<div className="sv-panel-heading">
							Assessments
							</div>
						<div className="sv-panel-body">
							<AssessmentSection updateAssessments={this.updateAssessments} key={1} saveAssessments={this.saveAssessments} removeAssessment={this.removeAssessment} addAssessment={this.addAssessment} assessments={this.state.assessments} />
						</div>
					</div>
					<LearningOutcomes updateLearningOutcomes={this.updateLearningOutcomes} learningOutcomes={this.state.learningOutcomes} />
				</div>


			</div>
		)
	}
}
