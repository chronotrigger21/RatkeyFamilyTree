export interface Person {
	id: string;
	name: string;
	gender: 'male' | 'female';
	birthYear: number;
	deathYear?: number;
	imageUrl?: string;
}

export interface FamilyNode {
	person: Person;
	children?: FamilyNode[];
}

// Sample family tree data - 3 generations, ~12 people
export const sampleFamilyTree: FamilyNode = {
	person: {
		id: 'john-ratkey',
		name: 'John Ratkey',
		gender: 'male',
		birthYear: 1920,
		deathYear: 1995
	},
	children: [
		{
			person: {
				id: 'robert-ratkey',
				name: 'Robert Ratkey',
				gender: 'male',
				birthYear: 1945
			},
			children: [
				{
					person: {
						id: 'michael-ratkey',
						name: 'Michael Ratkey',
						gender: 'male',
						birthYear: 1970
					}
				},
				{
					person: {
						id: 'sarah-ratkey',
						name: 'Sarah Ratkey',
						gender: 'female',
						birthYear: 1973
					}
				}
			]
		},
		{
			person: {
				id: 'mary-ratkey',
				name: 'Mary Ratkey',
				gender: 'female',
				birthYear: 1922,
				deathYear: 2010
			}
		},
		{
			person: {
				id: 'elizabeth-brown',
				name: 'Elizabeth Brown',
				gender: 'female',
				birthYear: 1948
			},
			children: [
				{
					person: {
						id: 'david-brown',
						name: 'David Brown',
						gender: 'male',
						birthYear: 1972
					}
				},
				{
					person: {
						id: 'jennifer-brown',
						name: 'Jennifer Brown',
						gender: 'female',
						birthYear: 1975
					}
				},
				{
					person: {
						id: 'emily-brown',
						name: 'Emily Brown',
						gender: 'female',
						birthYear: 1978
					}
				}
			]
		},
		{
			person: {
				id: 'james-ratkey',
				name: 'James Ratkey',
				gender: 'male',
				birthYear: 1952,
				deathYear: 2020
			}
		},
		{
			person: {
				id: 'susan-ratkey',
				name: 'Susan Ratkey',
				gender: 'female',
				birthYear: 1948
			}
		},
		{
			person: {
				id: 'william-brown',
				name: 'William Brown',
				gender: 'male',
				birthYear: 1945
			}
		}
	]
};
