import React from 'react';
import '../styles/index.scss';
import Module from './components/Module';
import defaultData, { inputsTemplate } from './data/defaultData';
import AssessmentSection from './components/AssessmentSection';
import update from 'immutability-helper'
import LearningOutcomes from './components/LearningOutcomes'
import OverviewPanel from './components/OverviewPanel'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import LearningHours from './components/LearningHours';
import { validAssessments, numberOfValid, numberOfValidObj, countValidInObj } from './util/countFunctions';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { toggle: true };
	}

	render() {
		var overallValid = false;
		var overallPercentage = 0, learningHoursPercentage = 0, learningHoursLength = 0;

			var learningHoursLength = Object.keys(this.props.learningHours).length;
			var learningHoursPercentage = (100 / learningHoursLength) * (learningHoursLength - countValidInObj(this.props.learningHours));

			var overallValid = this.props.moduleProgress === 100 && numberOfValid(this.props.assessments) && numberOfValid(this.props.learningOutcomes) && numberOfValidObj(this.props.learningHours);

			var overallPercentage =
				(numberOfValid(this.props.learningOutcomes) ? 20 : 0) +
				(Math.floor(learningHoursPercentage * .25)) +
				(Math.floor(this.props.moduleProgress * .55));

		return (
			<div>
				<div className="sv-col-md-2" >
					<OverviewPanel overallPercentage={Math.ceil(overallPercentage)} overallValid={overallValid} valid={overallValid} moduleProgress={this.props.moduleProgress} learningHours={learningHoursPercentage} assessments={this.props.assessments} learningOutcomes={this.props.learningOutcomes} />
					<p style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => { this.setState({ toggle: !this.state.toggle }) }}>Toggle Layout</p>
				</div>

				<div style={{ transition: "width 1s" }} className={this.state.toggle ? 'sv-col-md-5' : 'sv-col-md-10'}>

					<Module />;

					<LearningHours valid={numberOfValidObj(this.props.learningHours)}></LearningHours>

				</div>
				<div className={this.state.toggle ? 'sv-col-md-5' : 'sv-col-md-10 sv-col-md-offset-2'}>

					<LearningOutcomes valid={numberOfValid(this.props.learningOutcomes)} />

					<AssessmentSection valid={validAssessments(this.props.assessments, this.props.learningOutcomes) === this.props.assessments.length} key={1} />

				</div>
			</div>
		)
	}
}



const mapStateToProps = function (store, ownProps) {
	var props = Object.assign({}, store);
	return props;
}

export default connect(mapStateToProps)(App);
