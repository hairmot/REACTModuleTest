import React from 'react';
import '../styles/index.scss';
import Module from './components/Module';
import defaultData, { inputsTemplate } from './data/defaultData';
import AssessmentSection from './components/AssessmentSection';
import update from 'immutability-helper'
import persistState from './util/persistState';
import SavePanel from './components/SavePanel';
import LearningOutcomes from './components/LearningOutcomes'
import OverviewPanel from './components/OverviewPanel'
import retrieveState from './util/retrieveState';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = defaultData;
		this.valid = false;
	}

	componentWillMount() {
		if (retrieveState()) {
			var newState = JSON.parse(retrieveState());
			this.setState({
				inputs: newState.inputs,
				savedStates: newState.savedStates,
				assessments: newState.assessments,
				moduleProgress: newState.moduleProgress,
				learningOutcomes: newState.learningOutcomes
			}, () => {
				this.updateModuleProgress(this.state.inputs);
			});
		}

	}

	updateModuleProgress = (inputs) => {
		var inputArray = Object.keys(inputs);

		var mod = Math.floor(
			(100 / inputArray.filter(a => !inputsTemplate
				.find(b => b.fieldName === a)
				.omitFromProgress)
				.length) * inputArray.filter(a => inputs[a] !== '')
				.length);

		this.setState({ moduleProgress: mod })
	}

	updateAssessments = (assessments) => {
		this.setState({ assessments: assessments });
	}

	updateLearningOutcomes = (lo) => {
		this.setState({ learningOutcomes: lo }, () => {
			persistState(this.state)
		});
	}

	saveAssessments = (ass) => {
		this.setState({ assessments: ass }, function () {
			persistState(this.state);
		});
	}

	saveState = (state = {}) => {
		persistState(Object.assign(this.state, state));

	}

	numberOfValid = (arr) => {
		return arr.length > 0 && arr.filter(a => Object.keys(a).map(b => a[b]).filter(a => a === '').length).length === 0;
	}

	render() {


		var moduleElement = '';
		if (this.state.savedStates) {
			moduleElement = <Module moduleProgress={this.state.moduleProgress} updateModuleProgress={this.updateModuleProgress} saveState={this.saveState} inputs={this.state.inputs} savedStates={this.state.savedStates} />;
		}
		var overallValid = this.state.moduleProgress === 100 && this.numberOfValid(this.state.assessments) && this.numberOfValid(this.state.learningOutcomes);

		return (
			<div>
				<br />
				<div className="sv-col-md-2">
					<OverviewPanel valid={overallValid} moduleProgress={this.state.moduleProgress} assessments={this.state.assessments} learningOutcomes={this.state.learningOutcomes} />
					<SavePanel valid={overallValid} />

				</div>
				{moduleElement}


				<div className="sv-col-md-5">
					<AssessmentSection learningOutcomes={this.state.learningOutcomes} valid={this.numberOfValid(this.state.assessments)} updateAssessments={this.updateAssessments} key={1} saveAssessments={this.saveAssessments} removeAssessment={this.removeAssessment} addAssessment={this.addAssessment} assessments={this.state.assessments} />
					<LearningOutcomes valid={this.numberOfValid(this.state.learningOutcomes)} updateLearningOutcomes={this.updateLearningOutcomes} learningOutcomes={this.state.learningOutcomes} />
				</div>


			</div>
		)
	}
}
