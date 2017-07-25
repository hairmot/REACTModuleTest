import React from 'react';
import TextInput from './TextInput'
import currentTime from '../util/currentTime';
import PreviousVersions from './previousVersions';
import persistState from '../util/persistState';

export default class Module extends React.Component {
	constructor(props) {
		super(props);

		this.state = { inputs: this.props.inputs, savedStates: this.props.savedStates, visibleVersion: this.props.savedStates.length - 1 }
		this.snapshots = [this.props.inputs];
		this.saved = true;
	}

	deleteVersion = ev => {
		if (ev.target.id !== '0') {

			var savedStates = [...this.state.savedStates];
			savedStates.splice(parseInt(ev.target.id), 1);
			this.setState({ savedStates: savedStates, visibleVersion: this.state.visibleVersion - 1 }, function () {
				this.props.saveState(this.state);
			});
		}
	}

	showVersion = ev => {
		this.setState({ inputs: this.state.savedStates[ev.target.value || ev.target.name].inputs, visibleVersion: ev.target.value || ev.target.name },
			() => {
				this.props.updateModuleProgress(this.state.inputs)
			});
	}

	save = () => {
		this.setState({ savedStates: [...this.state.savedStates, { time: currentTime(), inputs: this.state.inputs }], visibleVersion: this.state.savedStates.length }, function () {
			this.props.saveState(this.state);
			this.props.updateModuleProgress(this.state.inputs);
		});
		this.saved = true;
	}

	undo = () => {
		if (this.snapshots.length === 1) {
			var lastState = this.snapshots[0];
			this.setState({ inputs: lastState });
			this.snapshots = [...this.snapshots];

		}
		else {
			var lastState = this.snapshots.pop();
			this.setState({ inputs: lastState });
			this.snapshots = [...this.snapshots];
			this.props.updateModuleProgress(lastState);
		}
	}

	clear = () => {
		this.snapshots.push(this.state.inputs);
		var newInputs = Object.assign({}, this.state.inputs);
		Object.keys(newInputs).map(a => newInputs[a] = '');
		this.setState({inputs:newInputs});
		this.props.updateModuleProgress(newInputs);
	}

	updateValue = (event) => {
		this.saved = false;
		var newInputs = Object.assign({}, this.state.inputs);
		newInputs[event.target.name] = event.target.value;
		this.props.updateModuleProgress(newInputs);
		this.snapshots.push(this.state.inputs);
		this.setState({ inputs: newInputs });
	}





	render() {
		var inputs = Object.keys(this.state.inputs).filter(a => typeof (this.state.inputs[a]) === 'string').map(a => {
			var name = a.replace(/_/g, ' ').replace(/(\w)(\w*)/g, (_, i, r) => i.toUpperCase() + (r != null ? r : ""));
			var value = this.state.inputs[a];
			return (
				<TextInput key={a} update={this.updateValue} propertyname={a} name={name} value={value} />
			)
		});

		var versions = this.state.savedStates.map((a, b) => {
			var col = b == this.state.visibleVersion ? 'sv-alert-info' : ' sv-btn-default';
			return (
				<tr key={b}>
					<td><button type="button" className={col + ' sv-btn sv-btn-block'} name={b} onClick={this.showVersion}>{a.time}</button></td>
					<td><button type="button" onClick={this.deleteVersion} id={b} disabled className={b != 0 ? 'sv-btn sv-btn-block sv-alert-danger' : 'sv-btn sv-btn-block'} style={b != 0 ? { cursor: 'pointer' } : { cursor: 'arrow', color: 'lightgrey' }}>Delete</button></td>
				</tr>
			)
		})



		return (
			<div>
				<div className="sv-col-md-5">
					<div className="">
						<div className="sv-panel sv-panel-primary">
							<div className="sv-panel-heading">
								Module Info
							</div>
							<div className="sv-panel-body">
								<div className="">
									<div>{inputs}</div>
									<div className="sv-col-md-2 sv-col-md-offset-4">
										<button type="button" onClick={this.clear} className="sv-btn sv-btn-default sv-btn-block" disabled={Object.keys(this.state.inputs).filter(a => this.state.inputs[a] !== '').length === 0}>Clear</button>
									</div>
									<div className="sv-col-md-2">
										<button type="button" onClick={this.undo} className="sv-btn sv-btn-default sv-btn-block" disabled={this.snapshots.length === 1}>Undo</button>
									</div>
									<div className="sv-col-md-2">
										<button type="button" onClick={this.save} className="sv-btn sv-btn-primary sv-btn-block" disabled={this.saved}>Save</button>
									</div>
								</div>
							</div></div>
					</div>

				</div>
				<div className="sv-col-md-5">

					<PreviousVersions versions={versions.reverse()} showVersion={this.showVersion} visibleVersion={this.state.visibleVersion} savedStates={this.state.savedStates} />

				</div>
			</div>


		)
	}
}
