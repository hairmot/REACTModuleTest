import React from 'react';
import TextInput from './TextInput'
import Assessment from './Assessment'
import currentTime from './currentTime';

export default class Module extends React.Component {
	constructor(props){
		super(props);
		this.state = {inputs:this.props.inputs, savedStates: this.props.savedStates}
		this.snapshots = [this.props.inputs];
		this.saved = true;
	}

	deleteVersion = ev => {
		var savedStates = [...this.state.savedStates];
		savedStates.splice(parseInt(ev.target.id), 1);
		console.log(savedStates)
		this.setState({savedStates : savedStates})
		var newLocalStorageState = {savedStates : savedStates, inputs : this.state.inputs}
		localStorage.setItem('reactState', JSON.stringify(newLocalStorageState));
	}

	showVersion = ev =>
		this.setState({inputs:this.state.savedStates[ev.target.name].inputs})

	save = () => {
		var localStorageState = {savedStates: [...this.state.savedStates, {time: currentTime(), inputs: this.state.inputs}], inputs: this.state.inputs};
		localStorage.setItem('reactState', JSON.stringify(localStorageState));
		this.setState({savedStates: [...this.state.savedStates, {time: currentTime(), inputs: this.state.inputs}]});
		this.saved = true;
	}

	undo = () => {
			if(this.snapshots.length === 1) {
				var lastState= this.snapshots[0];
				this.setState({inputs:lastState});
				this.snapshots = [...this.snapshots];

			}
			else {
				var lastState= this.snapshots.pop();
				this.setState({inputs:lastState});
				this.snapshots = [...this.snapshots];
			}
	}

	updateValue = (event) => {
		this.saved = false;
		var newInputs = Object.assign({}, this.state.inputs);
		newInputs[event.target.name] = event.target.value;
		this.snapshots.push(this.state.inputs);
		this.setState({inputs:newInputs});
	}



	 render() {
			var inputs = Object.keys(this.state.inputs).filter(a => typeof(this.state.inputs[a]) === 'string').map(a => {
				var name = a.replace(/_/g,' ').replace(/(\w)(\w*)/g, (_, i, r) =>  i.toUpperCase() + (r != null ? r : ""));
				var value = this.state.inputs[a];
		 		return (
					<TextInput key={a} update={this.updateValue} propertyname={a} name={name} value={value} />
				)
			});
			var assessments = this.state.inputs.assessment_information.map(a => <Assessment key={a.task_no} delete={this.delete} assessment={a} />);

			var versions = this.state.savedStates.map((a,b) =>
				<div className="sv-col-md-3"><div className="sv-input-group"><button className="sv-btn sv-btn-default sv-btn-block" name={b} onClick={this.showVersion}>{a.time}</button><span onClick={this.deleteVersion} id={b} className="sv-input-group-addon sv-alert-danger" style={{cursor:"pointer"}}>X</span></div></div>
			)


			return (
			<div>
				<div className="sv-col-md-12">
					<div>{inputs}</div>
					<div className="sv-col-md-2 sv-col-md-offset-4">
						<button onClick={this.undo} className="sv-btn sv-btn-default sv-btn-block" disabled={this.snapshots.length === 1}>Undo</button>
					</div>
					<div className="sv-col-md-2">
						<button onClick={this.save} className="sv-btn sv-btn-primary sv-btn-block" disabled={this.saved}>Save</button>
					</div>
				</div>
				<div>
					<h2>Saved Versions</h2>
					{versions}
				</div>
			</div>
			)
	 }
}