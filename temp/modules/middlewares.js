import Raven from 'raven-js';
export const logger = store => next => action => {
	console.log('Action:', action);

	let result = next(action);

	console.log('After action:', store.getState());

	return result;
};

export const crashReports = store => next => action => {
	try {
		return next(action);
	} catch (err) {
		console.error('Caught an exception!', err);
		Raven.captureException(err, {
			extra: {
				action,
				state: store.getState(),
			},
		});

		throw err;
	}
};
