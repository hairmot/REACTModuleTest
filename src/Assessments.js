import React from 'react';
import Assessment from './Assessment';

export default class Module extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		var assessments = '';
		if(this.props.assessments) {
		assessments = this.props.assessments.map(a => {
				return (
						<Assessment data={a} />
				)
			})
		}

		return (
			<table className="sv-table sv-table-striped sv-table-bordered">
				<tbody>
					{assessments}
				</tbody>
			</table>
		)
	}
}
