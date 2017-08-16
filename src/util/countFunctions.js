export function numberOfValid  (arr)  {
	var res = arr.length > 0 && arr.filter(a => Object.keys(a).map(b => a[b]).filter(a => a === '').length).length === 0;
	return res;
};

export function validAssessments(arr, outcomes) {

	var valid = arr.map(a => a.LO_Ref.map(c => outcomes.some(d => d.GUID === c)).length > 0	).filter(c => c);
	return valid.length
}

export function numberOfValidObj (obje) {
		return  countValidInObj(obje) === 0
	};
export function countValidInObj (obje)  {
		return Object.keys(obje).map(a => obje[a] === '').filter(a => a).length;
	};
