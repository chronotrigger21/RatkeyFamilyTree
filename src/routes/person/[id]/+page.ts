import { error } from '@sveltejs/kit';
import { findPersonById, getAllPersonIds } from '$lib/data/familyData';
import type { PageLoad, EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
	return getAllPersonIds().map((id) => ({ id }));
};

export const load: PageLoad = ({ params }) => {
	const person = findPersonById(params.id);

	if (!person) {
		throw error(404, 'Person not found');
	}

	return { person };
};
