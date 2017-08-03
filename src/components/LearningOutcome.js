import React from 'react'

export default class LearningOutcome extends React.Component {
	constructor(props) {
		super(props);
		this.state = { saved: true, ID: this.props.learningOutcome.ID, outcome: this.props.learningOutcome.outcome, confirmDelete: 0,timeout: {} }
	}

	componentWillReceiveProps = (a, b) => {
		this.setState({ ID: a.learningOutcome.ID, outcome: a.learningOutcome.outcome })
	}

	updateID = (e) => {
		this.setState({ saved: false, ID: e.target.value });
	}

	updateOutcome = (e) => {
		this.setState({ saved: false, outcome: e.target.value.replace(/"/g, '¨') });
	}

	saveLearningOutcome = () => {
		this.props.saveLearningOutcome({ GUID: this.props.learningOutcome.GUID, ID: this.state.ID.replace(/"/g, '¨'), outcome: this.state.outcome.replace(/"/g, '¨') })
		this.setState({ saved: true });
	}

	confirmDelete = (num) => {
		var _this = this;
		this.setState({ confirmDelete: num }, function () {
			if (num > 0) {
				_this.timeout = setTimeout(function () {
					_this.confirmDelete(num - 1);
				}, 1000)
			};
		})
	}

deleteLearningOutcome = () => {
	clearTimeout(this.timeout);
	this.props.deleteLearningOutcome(this.props.learningOutcome.GUID);
}

render() {
	return (
		<tr>
			<td className="sv-col-md-2">
				<input className="sv-form-control" onChange={(e) => this.updateID(e)} type="text" value={this.state.ID.replace(/¨/g, '"')} />
			</td>
			<td className="sv-col-md-10">
				<input className="sv-form-control" onChange={(e) => this.updateOutcome(e)} type="text" value={this.state.outcome.replace(/¨/g, '"')} />
			</td>
			<td>
				{this.state.saved ?
					this.state.confirmDelete === 0 ? <button type="button" className="sv-btn sv-alert-success" onClick={() => this.confirmDelete(5)}>Delete</button> :
						<button type="button" className="sv-btn sv-alert-warning" onClick={this.deleteLearningOutcome}>Click again to confirm delete ({this.state.confirmDelete})</button> :
					<button type="button" onClick={this.saveLearningOutcome} className="sv-btn sv-alert-danger" >Save</button>
				}
			</td>
		</tr>
	)
}
}
