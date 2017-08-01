export default function updateLearningActivities(learningHours) {
	document.querySelector('[data-learningactivities]').value = Object.keys(learningHours).map(a =>learningHours[a]).join('~');
}


