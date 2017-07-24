import React, { Component } from 'react';

class Circle extends Component {
	constructor(props) {
		super(props);
		this.state = { value: 0 };
	}

	componentDidMount() {
		if (this.state.value < this.props.amount) {
			this.updateStatus(this.state.value);
		}
	}

	updateStatus(val) {
		if (val < this.props.amount) {
			setTimeout(() => {
				this.setState({ value: val + 1 });
				this.updateStatus(val + 1);
			}, 12);
		}
		else if (val > this.props.amount) {

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



		var amount = Math.floor((180 / 100) * this.state.value);
		return (
			<div className="progress-circle">
				<div className="radial-progress">
					<div className="circle">
						<div className="mask full" style={this.state.value == '100' ? {backgroundColor:'rgb(161, 232, 125)', "transform": "rotate(" + amount + "deg)"} : {"transform": "rotate(" + amount + "deg)"}}>
							<div className="fill" style={{ "transform": "rotate(" + amount + "deg)", "backgroundColor": 'hsl(' + this.state.value + ', 70%, 70%)' }}></div>
						</div>
						<div className="mask half" style={this.state.value == '100' ? {backgroundColor:'rgb(161, 232, 125)'} : {}}>
							<div className="fill" style={{ "transform": "rotate(" + amount + "deg)", "backgroundColor": 'hsl(' + this.state.value + ', 70%, 70%)' }}></div>
							<div className="fill fix" style={{ "transform": "rotate(" + (amount * 2) + "deg)", "backgroundColor": 'hsl(' + this.state.value + ', 70%, 70%)' }}></div>
						</div>
						<div className="shadow"></div>
					</div>
					<div className="inset">				<div className="progress-circle-text">
					{this.state.value + '%'}
				</div></div>
				</div>

			</div>
		)
	}
}

export default Circle;
