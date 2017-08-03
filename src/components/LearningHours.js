import React from 'react';
import translateName from '../util/translateName';
import TextInput from './TextInput';
import { learningHoursTemplate } from '../data/defaultData';
import CollapsiblePanel from './CollapsiblePanel';

export default class LearningHours extends React.Component {

	render() {
		var totalLearningHours = Object.keys(this.props.learningHours).map(a => { return { name: a, value: this.props.learningHours[a] } });

		var render = totalLearningHours.map(a => {
			return (
				<TextInput biglabels={true} inputsTemplate={learningHoursTemplate} name={translateName(a.name)} key={a.name} update={(e) => this.props.update({ name: a.name, value: e.target.value })} propertyname={a.name} value={a.value} />
			)
		})



		return (
			<CollapsiblePanel valid={this.props.valid} title="Study Hours">
				{render}
			</CollapsiblePanel>
		)
	}
}
