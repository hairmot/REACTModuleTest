import React from 'react';
import Quill from 'react-quill';

export default class TextInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {enlarged:''};
	}


	render() {
		var templateItem = this.props.inputsTemplate.find(a => a.fieldName === this.props.propertyname);

		var input = '';
		var value = templateItem.formatting ? templateItem.formatting(this.props.value) : this.props.value;
		switch (templateItem.type) {
			case 'text':
				input = <input className="sv-form-control" type="text" onChange={this.props.update} name={this.props.propertyname} value={value} disabled={templateItem.readOnly ? 'disabled' : ''} />
				break;
			case 'textarea':
			//	input = <textArea style={{ resize: 'none' }} className="sv-form-control" onChange={this.props.update} name={this.props.propertyname} value={value}></textArea>
				input = <Quill value={value.replace(/¨/g, '"')} onChange={(val) => {this.props.update(null, val, this.props.propertyname)}} className=""/>
				break;
			case 'number':
				input = <input className="sv-form-control" type="number" onChange={this.props.update} name={this.props.propertyname} value={value} disabled={templateItem.readOnly ? 'disabled' : ''} />
				break;
			case 'link':
				input = <a href={templateItem.formatting ? templateItem.formatting(this.props.value) : this.props.value} style={{ wordBreak: 'break-all' }}>{value}</a>
				break;
			case 'dropdown':
				input = <select className="sv-form-control">
					{
						templateItem.validation.map(a => <option value={a}>{a}</option>)
					}
				</select>
		}

		return (

			<div onFocus={() => this.setState({enlarged:'enlarged'})} onBlur={() => this.setState({enlarged:''})} tabIndex="0"  className={'sv-form-group sv-col-md-12 ' + this.state.enlarged}>
				<div className={this.props.biglabels ? 'sv-col-md-9' : 'sv-col-md-4'} >
					<label className="">{this.props.name}</label>
				</div>
				<div className={this.props.biglabels ? 'sv-col-md-3 ' : 'sv-col-md-8  ' + templateItem.type}>

					<div className="sv-input-group">
						{
							input
						}
						{
							templateItem.type !== 'link' ?
								//value.toString().length >= (templateItem.minLength || 1) && value.toString().length <= (templateItem.maxLength || 9999)?
								templateItem.validate(value.toString(), templateItem.fieldName) ?
									<span className="sv-input-group-addon sv-alert-success" style={{ cursor: 'default' }}>✔</span> :
									<span className="sv-input-group-addon sv-alert-danger" style={{ cursor: 'default' }}>✘</span>
								: ''

						}
					</div>

				</div>
			</div >
		)
	}
}
