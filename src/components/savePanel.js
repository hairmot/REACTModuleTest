import React from 'react';

export default class SavePanel extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: 0 };
	}

	componentDidMount() {
		if (this.state.value < this.props.validPerc) {
			this.updateStatus(this.state.value);
		}
	}

	updateStatus(val) {
		if (val < this.props.validPerc) {
			setTimeout(() => {
				this.setState({ value: val + 1 });
				this.updateStatus(val + 1);
			}, 12);
		}
		else if (val > this.props.validPerc) {

			setTimeout(() => {
				this.setState({ value: val -1  });
				this.updateStatus(val -1 );
			}, 12);
		}

	}

	componentWillReceiveProps(a,b) {
			this.setState({target:a.amount}, () => {this.updateStatus(this.state.value)});

	}

	render() {
		return (
			<div className={this.props.valid ? 'sv-panel sv-panel-success' : 'sv-panel sv-panel-default'}>
				<div className="sv-panel-heading">
					<div>	{this.props.validPerc === 100 ? 'Save' : 'Overall progress'}</div>
				</div>
				<div className="sv-panel-body">
					{this.props.validPerc === 100 ?
					<button type="button" className={this.props.valid ? "sv-btn sv-btn-block sv-alert-success" : "sv-btn sv-btn-block sv-alert-default"} disabled={!this.props.valid}>Save</button>
					:
					<div style={{paddingLeft:'4px',width: this.state.value + '%', backgroundColor:'hsl(' + this.state.value + ', 70%, 70%)'}}>{this.state.value}%</div>
					}
					</div>
			</div>
		)
	}
}
