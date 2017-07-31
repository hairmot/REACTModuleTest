import React from 'react';

export default class PreviousVersions extends React.Component {
	constructor(props) {
		super(props);
		this.state = { assessmentsCollapse: true, expanded:false }
	}

	toggleAssessments = () => {

		this.setState({ assessmentsCollapse: !this.state.assessmentsCollapse });
	}

	render() {
		return (
			<div className="">

					<div className="sv-panel-heading" style={{cursor:'pointer'}} onClick={() => this.setState({expanded: !this.state.expanded})}>
						<strong>Edit Timeline </strong>  {!this.state.expanded ? '(click to expand)' : '(click to hide)'}
						</div>
					<div className="sv-panel-body" style={this.state.expanded ? {display:'block'} : {display:'none'}}>
						<div className="sv-col-md-2">
							<p>
								{this.props.savedStates[0].time}
							</p>
						</div>
						<div className="sv-col-md-8">
							<input type="range" onChange={this.props.showVersion} value={this.props.visibleVersion} min="0" max={this.props.savedStates.length - 1} />
						</div>
						<div className="sv-col-md-2">
							<p>
								{this.props.savedStates[this.props.savedStates.length - 1].time}
							</p>
						</div>

						<div className="sv-text-center">
							Showing snapshot from: {this.props.savedStates[this.props.visibleVersion].time}
						</div>


						<hr />
						<div className="sv-panel sv-panel-default">
							<div className="sv-panel-heading" tabIndex="0" onKeyDown={(e) => { if (e.which == 13) { this.toggleAssessments() } }} onClick={this.toggleAssessments} style={{ cursor: 'pointer' }}>
								Version History (click to expand)
								</div>
							<div className="sv-panel-body" style={this.state.assessmentsCollapse ? { display: 'none' } : { display: 'block' }}>
								<table className="sv-table sv-table-striped sv-table-bordered">
									<thead>
										<tr>
											<th>Time</th>
											<th> </th>
										</tr>
									</thead>
									<tbody>
										{this.props.versions}
									</tbody>
								</table>
							</div>
						</div>

					</div>

			</div>
		)
	}
}
