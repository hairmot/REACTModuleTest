import React from 'react'

export default class LearningOutcomes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {learningOutcomes : this.props.learningOutcomes}
	}

	addLearningOutcome = () => {
		var newLO = [...this.state.learningOutcomes, { ID: '', outcome: '' }];
			this.setState({learningOutcomes: newLO}, this.props.updateLearningOutcomes(newLO));
	}

	delete = (ev) => {
		var newLO = [...this.state.learningOutcomes];
		newLO.splice(ev.target.name, 1);
		this.setState({learningOutcomes: newLO}, this.props.updateLearningOutcomes(newLO));
	}

	update = (ev, index, field) => {
		 var newLO = [...this.state.learningOutcomes];
		 newLO[index][field] = ev.target.value;
		 this.setState({learningOutcomes: newLO}, this.props.updateLearningOutcomes(newLO));
	}

	render() {
		var outcomes = <tr></tr>;
		if (this.state.learningOutcomes) {
			outcomes = this.state.learningOutcomes.map((a,b) => {
				return (
					<tr key={b}>
						<td className="sv-col-md-2">
							<input className="sv-form-control" onChange={(e) => this.update(e, b, 'ID')} type="text" value={a.ID} />
						</td>
						<td className="sv-col-md-10">
							<input className="sv-form-control" onChange={(e) => this.update(e, b, 'outcome')} type="text" value={a.outcome} />
						</td>
						<td>
							<button type="button" className="sv-btn sv-alert-danger" name={b} onClick={this.delete}>Delete</button>
						</td>
					</tr>
				)
			});
		}

		return (
			<div className="">
				<div className="sv-panel sv-panel-primary">
					<div className="sv-panel-heading">
						Learning Outcomes
					</div>
					<div className="sv-panel-body">
						<table className="sv-table sv-table-striped sv-table-bordered">
							<thead>
								<tr>
									<th>ID</th>
									<th>Outcome</th>
									<th> </th>
								</tr>
							</thead>
							<tbody>
								{outcomes}
								<tr>

									<td colSpan="3"><button type="button" onClick={this.addLearningOutcome} className="sv-btn sv-btn-default sv-btn-block">Add Learning Outcome</button></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		)
	}
}
