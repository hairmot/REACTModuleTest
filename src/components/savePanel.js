import React from 'react';

export default class SavePanel extends React.Component {
	render() {
		return (
			<div className="sv-panel sv-panel-primary">
				<div className="sv-panel-heading">
					Save Module
						</div>
				<div className="sv-panel-body">
					<button type="button" className={this.props.valid ? "sv-btn sv-btn-block sv-alert-success" : "sv-btn sv-btn-block sv-alert-default"} disabled={!this.props.valid}>Save</button>
				</div>
			</div>
		)
	}
}
