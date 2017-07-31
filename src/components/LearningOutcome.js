import React from 'react'

export default class LearningOutcome extends React.Component {
	constructor(props) {
		super(props);
		this.state = { saved: true, ID: this.props.learningOutcome.ID, outcome: this.props.learningOutcome.outcome  }
	}

	updateID = (e) => {
		this.setState({ saved: false, ID: e.target.value});
	}

	updateOutcome = (e) => {
		this.setState({ saved: false, outcome: e.target.value});
	}

	saveLearningOutcome = () => {
		this.props.saveLearningOutcome({GUID:this.props.learningOutcome.GUID, ID: this.state.ID, outcome : this.state.outcome})
		this.setState({saved : true});
	}

	render() {
		return (
			<tr>
				<td className="sv-col-md-2">
					<input className="sv-form-control" onChange={(e) => this.updateID(e)} type="text" value={this.state.ID} />
				</td>
				<td className="sv-col-md-10">
					<input className="sv-form-control" onChange={(e) => this.updateOutcome(e)} type="text" value={this.state.outcome} />
				</td>
				<td>
					{this.state.saved ?
						<button type="button" className="sv-btn sv-alert-danger" onClick={() => this.props.deleteLearningOutcome(this.props.learningOutcome.GUID)}>Delete</button> :
						<button type="button" onClick={this.saveLearningOutcome} className="sv-btn sv-alert-success" >Save</button>
					}
				</td>
			</tr>
		)
	}
}
