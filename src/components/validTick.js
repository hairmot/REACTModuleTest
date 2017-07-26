import React from 'react';

export default class SavePanel extends React.Component {
	render() {
	 return	<span className={this.props.valid ? 'sv-pull-right sv-text-success' : 'sv-pull-right sv-text-danger' }><strong style={{fontSize:'1.2em', cursor:'default'}}>{this.props.valid ? '✔' : '✘'}</strong></span>
	}
}
