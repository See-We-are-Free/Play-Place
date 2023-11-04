function getRandomInt(min: number, max: number) {
	const MIN = Math.ceil(min);
	const MAX = Math.floor(max);
	return Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
}

export default getRandomInt;
