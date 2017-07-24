import React from 'react';
import update from 'immutability-helper'

export default class Assessment extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		var inputs = Object.keys(this.props.values).map((a, b) => {
		var name = a.replace(/_/g,' ').replace(/(\w)(\w*)/g, (_, i, r) =>  i.toUpperCase() + (r != null ? r : ""));
				var value = <input type="text" onChange={this.props.updateVal} className="sv-form-control" id={this.props.index} name={a} value={this.props.values[a]} />;
		 		return (
					<td key={b}>
						{value}
					</td>

				)
		})
		return (
			<tr>
				{inputs}
				<td>
					<button onClick={this.props.removeAssessment} id={this.props.index} className="sv-btn sv-btn-warning">Delete</button>
				</td>
			</tr>
		)
	}
}
