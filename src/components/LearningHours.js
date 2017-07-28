import React from 'react';
import translateName from '../util/translateName';
import TextInput from './TextInput';
import {learningHoursTemplate} from '../data/defaultData';
import ValidTick from './validTick';

export default class LearningHours extends React.Component {
	constructor(props) {
		super(props);
		this.state = {expanded:false}
	}
	render() {
		var totalLearningHours = Object.keys(this.props.learningHours).map(a => { return {name: a, value: this.props.learningHours[a]}});

		var render = totalLearningHours.map(a => {
			return (
				<TextInput biglabels={true} inputsTemplate={learningHoursTemplate} name={translateName(a.name)} key={a.name} update={(e) => this.props.update({name:a.name, value: e.target.value})} propertyname={a.name} value={a.value}/>
			)
		})



		return (
			<div className={this.props.valid ? 'sv-panel sv-panel-default' : 'sv-panel sv-panel-danger'}>
				<div className="sv-panel-heading" onClick={() => this.setState({expanded: !this.state.expanded})}>

					Learning Activities {!this.state.expanded ? '(click to expand)' : ''} <ValidTick valid={this.props.valid} />
				</div>
				<div className="sv-panel-body" style={this.state.expanded ? {display:'block'} : {display:'none'}}>

							{render}


				</div>
			</div>
		)
	}
}
