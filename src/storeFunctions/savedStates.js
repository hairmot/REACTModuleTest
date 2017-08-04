export default function saveLearningOutcome(savedStates) {
	$('[data-saved-states]').val(JSON.stringify(savedStates));

}

if ($ === undefined) {
	var $ = () => {
		return {
			val: () => { }, click: () => { }
		}
	};

}
