import React from 'React';
import PropTypes from 'prop-types';

class AmountTracker extends React.Component {
	constructor(props) {
		super(props);
		this.height = 42;
		this.state = { currentValue: this.props.amount, offset: (this.height + 10) * -1, blocked: false }
	}

	componentWillReceiveProps(a, b) {
		if (!this.state.blocked) {
			if (a.amount < this.state.currentValue) {
				this.setState({ blocked: true }, () => { this.moveDigit(a.amount, 1) })
			} else if (a.amount > this.state.currentValue) {
				this.setState({ blocked: true }, () => {
					this.moveDigit(a.amount, -1)
				});
			}
		}
	}

	moveDigit(target, direction, counter = 0) {
		var _this = this;
		if (counter < this.height + 10) {

			setTimeout(() => {
				_this.setState({ offset: this.state.offset + (1 * direction) }, () => {
					this.moveDigit(target, direction, counter + 1);
				})

			}, 12)
		}
		else {
			setTimeout(_this.setState({ offset: -52, currentValue: target, blocked:false }), 20);
		}
	}

	render() {

		return (
			<div className="sv-col-md-6 progress-circle-text">
				<div style={{ height: this.height + 'px', overflow: 'hidden' }} className={this.state.currentValue === 0 ? this.props.zeroClass : this.props.hasValueClass}>
					<div style={{ position: 'relative', top: this.state.offset + 'px' }}>
						<p>{this.state.currentValue - 1}</p>
						<p>{this.state.currentValue}</p>
						<p>{this.state.currentValue + 1}</p>
					</div>
				</div>
				<div style={{ fontSize: '12px' }}>
					{this.props.label}
				</div>
			</div>
		)
	}
}

AmountTracker.propTypes = {
	amount: PropTypes.number,
	zeroClass: PropTypes.string,
	hasValueClass: PropTypes.string,
	label: PropTypes.string
}

export default AmountTracker;
