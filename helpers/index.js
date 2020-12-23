export const formDataBuilder = params => {
	const formData = new FormData();
	Object.entries({
		...params
	}).forEach(item => {
  	console.log("%c 🙊: item ", "font-size:16px;background-color:#6e15a3;color:white;", item)
		formData.append(item[0], item[1]);
	});
	return formData;
};

export const formUrlencodeBuilder = params => {
	const formData = new URLSearchParams();
	Object.entries({
		...params
	}).forEach(item => {
		console.log('%c 🐾: item ', 'font-size:16px;background-color:#e8c615;color:black;',  item);
		formData.append(item[0], item[1]);
	});
	return formData;
};