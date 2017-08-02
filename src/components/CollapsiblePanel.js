import React from 'react';
import ValidTick from './validTick';

export default class collapsiblePanel extends React.Component {
	constructor(props) {
		super(props);
		this.state = { expanded: true }
	}

	render() {
		return (
			<div className={this.props.valid ? 'sv-panel sv-panel-default' : 'sv-panel sv-panel-danger'}>
				<div className="sv-panel-heading" style={{ cursor: 'pointer' }} onClick={() => this.setState({ expanded: !this.state.expanded })}>
					{this.props.title} {!this.state.expanded ? '(click to expand)' : '(click to hide)'} <ValidTick valid={this.props.valid} />
				</div>
				<div className="sv-panel-body" style={this.state.expanded ? { display: 'block' } : { display: 'none' }}>
					{this.props.children}
				</div>
			</div>
		)
	}

}
