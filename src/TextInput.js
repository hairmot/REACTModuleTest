import React from 'react';

export default class TextInput extends React.Component {

	 render() {
		 return (
		  <div className="sv-form-group sv-col-md-12">
					<div className="sv-col-md-4">
						<label className="sv-pull-right sv-text-right">{this.props.name}</label>
					</div>
					<div className="sv-col-md-4">
						<input className="sv-form-control" type="text" onChange={this.props.update} name={this.props.propertyname} value={this.props.value} />
					</div>
				</div>
		 )
	}
}
