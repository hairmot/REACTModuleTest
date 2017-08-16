import React from 'react';
import translateName from '../util/translateName';
import TextInput from './TextInput';
import { learningHoursTemplate } from '../data/defaultData';
import CollapsiblePanel from './CollapsiblePanel';

export default class LearningHours extends React.Component {
	constructor(props) {
		super(props);
		this.state = {learningHours: this.props.learningHours, saved:false}
	}

	updateLearningHours = (learningHoursItem)  => {
			var updatedItem = {};
			updatedItem[learningHoursItem.name] = learningHoursItem.value;
			var newLearningHours = Object.assign({}, this.state.learningHours, updatedItem);
			this.setState({learningHours: newLearningHours, saved:false})
	}

	save = () => {
		this.setState({saved:true})
		this.props.update(this.state.learningHours);
	}

	render() {
		var totalLearningHours = Object.keys(this.state.learningHours).map(a => { return { name: a, value: this.state.learningHours[a] } });

		var render = totalLearningHours.map(a => {
			return (
				<TextInput biglabels={true} inputsTemplate={learningHoursTemplate} name={translateName(a.name)} key={a.name} update={(e) => this.updateLearningHours({ name: a.name, value: e.target.value })} propertyname={a.name} value={a.value} />
			)
		})



		return (
			<CollapsiblePanel valid={this.props.valid} title="Study Hours">
				{render}
				<div className="sv-form-group sv-col-md-12">
					<div className="sv-col-md-3 sv-col-md-offset-9">
						<button onClick={this.save} className={this.state.saved ? 'sv-btn sv-alert-success sv-btn-block' : 'sv-btn sv-alert-danger sv-btn-block'} disabled={this.state.saved}>{this.state.saved ? 'Saved' : 'Save'}</button>
					</div>
				</div>
			</CollapsiblePanel>
		)
	}
}
