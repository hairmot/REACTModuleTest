import React from 'react';


export default class Assessment extends React.Component {
	render() {
		var inputs = Object.keys(this.props.data).map(a => {
		var name = a.replace(/_/g,' ').replace(/(\w)(\w*)/g, (_, i, r) =>  i.toUpperCase() + (r != null ? r : ""));
				var value = this.props.data[a];
		 		return (
					<td key={a}>
						{value}
					</td>
				)
		})
		return (
			<tr>
				{inputs}
			</tr>
		)
	}
}
