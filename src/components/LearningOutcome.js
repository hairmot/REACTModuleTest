import React from 'react'

export default class LearningOutcome extends React.Component {
	constructor(props) {
		super(props);
		this.state = { confirmDelete: 0,timeout: {} }
	}

	updateID = (e) => {
		this.props.updateLearningOutcome(this.props.learningOutcome.GUID, e.target.value, this.props.learningOutcome.outcome )

	}

	updateOutcome = (e) => {
		this.props.updateLearningOutcome(this.props.learningOutcome.GUID, this.props.learningOutcome.ID, e.target.value, false, false)
	}

	saveLearningOutcome = (e) => {
		e.preventDefault();
		this.props.saveLearningOutcome({ GUID: this.props.learningOutcome.GUID, ID: this.props.learningOutcome.ID, outcome: this.props.learningOutcome.outcome })
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
				<input disabled className="sv-form-control" onChange={(e) => this.updateID(e)} type="text" value={this.props.learningOutcome.ID.replace(/¨/g, '"')} />
			</td>
			<td className="sv-col-md-10">
				<textarea className="sv-form-control" onChange={(e) => this.updateOutcome(e)} type="text" value={this.props.learningOutcome.outcome.replace(/¨/g, '"')} />
			</td>
			<td>
				{
					this.props.learningOutcome.loading ? <button className="sv-btn sv-alert-warning" disabled="true">Saving</button> : typeof(this.props.learningOutcome.saved) === 'undefined' || this.props.learningOutcome.saved ?
					this.state.confirmDelete === 0 ? <button type="button" className="sv-btn sv-alert-success" onClick={() => this.confirmDelete(5)}>Delete</button> :
						<button type="button" className="sv-btn sv-alert-warning" onClick={this.deleteLearningOutcome} disabled={this.props.loading}>Click again to confirm delete ({this.state.confirmDelete})</button> :
					<button type="button" onClick={this.saveLearningOutcome} className="sv-btn sv-alert-danger">Save</button>
				}

			</td>
		</tr>
	)
}
}
