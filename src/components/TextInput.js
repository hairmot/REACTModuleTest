import React from 'react';
import { inputsTemplate } from '../data/defaultData';

export default class TextInput extends React.Component {

	render() {
		var templateItem = inputsTemplate.find(a => a.fieldName === this.props.propertyname);

		var input = '';
		var value = templateItem.formatting ? templateItem.formatting(this.props.value) : this.props.value;
		switch (templateItem.type) {
			case 'text':
				input = <input className="sv-form-control" type="text" onChange={this.props.update} name={this.props.propertyname} value={value} disabled={templateItem.readOnly ? 'disabled' : ''} />
				break;
			case 'textarea':
				input = <textArea style={{resize:'none'}} className="sv-form-control" onChange={this.props.update} name={this.props.propertyname} value={value}></textArea>
				break;
			case 'number':
				input = <input className="sv-form-control" type="number" onChange={this.props.update} name={this.props.propertyname} value={value} disabled={templateItem.readOnly ? 'disabled' : ''} />
				break;
			case 'link':
				input = <a href={templateItem.formatting ? templateItem.formatting(this.props.value) : this.props.value}>{value}</a>
				break;
		}

		return (
			<div className="sv-form-group sv-col-md-12">
				<div className="sv-col-md-4">
					<label className="">{this.props.name}</label>
				</div>
				<div className="sv-col-md-8">

					<div className="sv-input-group">
						{
							input
						}
						{
						templateItem.type !== 'link' ?
							value.toString().length >= (templateItem.minLength || 1) && value.toString().length <= (templateItem.maxLength || 9999)?
							<span className="sv-input-group-addon sv-alert-success">✔</span>:
							< span className="sv-input-group-addon sv-alert-danger">✘</span>
						:''

					}
					</div>

			</div>
			</div >
		)
	}
}
