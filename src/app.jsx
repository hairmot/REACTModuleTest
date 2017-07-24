import React from 'react';
import '../styles/index.scss';
import Module from './components/Module';
import defaultData from './data/defaultData';
import AssessmentSection from './components/AssessmentSection';
import update from 'immutability-helper'
import persistState from './util/persistState';
import Circle from './components/circle';
import AssessmentOverview from './components/AssessmentOverview'
import LearningOutcomesOverview from './components/LearningOutcomesOverview'
import LearningOutcomes from './components/LearningOutcomes'

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
		if (localStorage.getItem('reactState')) {
			var newState = JSON.parse(localStorage.reactState);
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


		var modules = '';
		if (this.state.savedStates) {
			modules = <Module updateModuleProgress={this.updateModuleProgress} saveState={this.saveState} inputs={this.state.inputs} savedStates={this.state.savedStates} />;
		}

		return (
			<div>
				<br />
				<div className="sv-col-md-2">
					<div className="sv-panel sv-panel-primary">
						<div className="sv-panel-heading">
							Progress Overview
						</div>
						<div className="sv-panel-body" className="">
							<table className="sv-table-striped sv-table" style={{ marginBottom: '0' }}>
								<tbody>
									<tr>
										<th className="sv-text-center">
											Module Info
									</th>
									</tr>
									<tr>
										<td className="sv-text-center">
											<Circle amount={this.state.moduleProgress} /></td>
									</tr>

									<tr>
										<th className="sv-text-center">
											Assessments
									</th>
									</tr>
									<tr>
										<td className="sv-text-center">
											<AssessmentOverview assessments={this.state.assessments} />
										</td>
									</tr>
									<tr>
										<th className="sv-text-center">
											Learning Outcomes
									</th>
									</tr>
									<tr>
										<td className="sv-text-center">

											<LearningOutcomesOverview learningOutcomes={this.state.learningOutcomes}/></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				{modules}


				<div className="sv-col-md-5">
					<div className="sv-panel sv-panel-primary">
						<div className="sv-panel-heading">
							Assessments
							</div>
						<div className="sv-panel-body">
							<AssessmentSection updateAssessments={this.updateAssessments} key={1} saveAssessments={this.saveAssessments} removeAssessment={this.removeAssessment} addAssessment={this.addAssessment} assessments={this.state.assessments} />
						</div>
					</div>
				</div>

				<LearningOutcomes updateLearningOutcomes={this.updateLearningOutcomes} learningOutcomes={this.state.learningOutcomes} />
			</div>
		)
	}
}
