export default function updateLearningActivities(learningHours) {
	$('[data-learningactivities]').val(Object.keys(learningHours).map(a =>learningHours[a]).join('~'));
}


if ($ === undefined) {
	var $ = () => {
		return {
			val: () => { }, click: () => { }
		}
	};

}
