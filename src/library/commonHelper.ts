// 숫자 3자리수마다 , 찍기
const numFormat = num => {
	return Intl.NumberFormat('en-IN', {
		maximumSignificantDigits: 3
	}).format(num);
};

export default { numFormat };
