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
				this.setState({ value: val - 1 });
				this.updateStatus(val - 1);
			}, 12);
		}

	}

	componentWillReceiveProps(a, b) {
		this.setState({ target: a.amount }, () => { this.updateStatus(this.state.value) });

	}

	render() {
		return (


			<div style={{minHeight:'51px'}}>
				{this.props.validPerc === 100 ?
					<button type="button" className="sv-btn sv-btn-block sv-alert-success" >Complete</button>
					:
					<div style={{ fontWeight:'bold',borderRadius:'4px',padding: '6px 12px',height:'34px', width: this.state.value + '%', backgroundColor: 'hsl(' + this.state.value + ', 70%, 70%)' }}>{this.state.value}%</div>
				}
			</div>

		)
	}
}
