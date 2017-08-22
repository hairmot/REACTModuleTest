import { inputsTemplate } from '../data/defaultData';

export default function(inputs) {

			var inputArray = Object.keys(inputs);
			var eligible = inputArray.filter(a => !inputsTemplate.find(b => b.fieldName === a).omitFromProgress);
			var validInputs = eligible.filter(a => inputsTemplate.find(b => b.fieldName === a).validate(inputs[a], a));
			var mod = Math.floor((100 / eligible.length) * validInputs.length);
			return mod;
}
