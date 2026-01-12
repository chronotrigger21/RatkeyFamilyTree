export interface BioSection {
	heading?: string;
	paragraphs: string[];
}

export interface Person {
	id: string;
	name: string;
	gender: 'male' | 'female';
	birthYear: number;
	deathYear?: number;
	imageUrl?: string;
	bio?: BioSection[];
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
		deathYear: 1995,
		bio: [
			{
				heading: 'Early Life',
				paragraphs: [
					'John Ratkey was born in 1920 in a small farming community in rural Pennsylvania. He was the third of five children and grew up helping on the family farm.',
					'Despite the hardships of the Great Depression, John was able to complete his high school education and developed a passion for mechanics and engineering.'
				]
			},
			{
				heading: 'Military Service',
				paragraphs: [
					'John served in the United States Army during World War II from 1942 to 1945. He was stationed in the European theater and participated in the liberation of France.',
					'He received several commendations for his service and often spoke fondly of the friendships he formed during those years.'
				]
			},
			{
				heading: 'Family Life',
				paragraphs: [
					'After returning from the war, John married Mary Smith in 1946. Together they raised four children and built a life centered around family, faith, and community.'
				]
			}
		]
	},
	children: [
		{
			person: {
				id: 'robert-ratkey',
				name: 'Robert Ratkey',
				gender: 'male',
				birthYear: 1945,
				bio: [
					{
						paragraphs: [
							'Robert is the eldest son of John and Mary Ratkey. He followed in his father\'s footsteps with an interest in engineering and went on to have a successful career in manufacturing.',
							'He married Susan Johnson in 1968 and they have two children together.'
						]
					}
				]
			},
			children: [
				{
					person: {
						id: 'michael-ratkey',
						name: 'Michael Ratkey',
						gender: 'male',
						birthYear: 1970,
						bio: [
							{
								paragraphs: [
									'Michael is the son of Robert and Susan Ratkey. He works in the technology sector and lives in California.'
								]
							}
						]
					}
				},
				{
					person: {
						id: 'sarah-ratkey',
						name: 'Sarah Ratkey',
						gender: 'female',
						birthYear: 1973,
						bio: [
							{
								paragraphs: [
									'Sarah is a teacher and lives in Ohio with her family.'
								]
							}
						]
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
				deathYear: 2010,
				bio: [
					{
						heading: 'Early Life',
						paragraphs: [
							'Mary Smith was born in 1922 in Pittsburgh, Pennsylvania. She was known for her warm personality and excellent cooking skills.'
						]
					},
					{
						heading: 'Marriage and Family',
						paragraphs: [
							'Mary met John Ratkey at a church social in 1945 and they married the following year. She was a devoted mother to their four children and was actively involved in her church community.',
							'Mary was known throughout the neighborhood for her apple pie and her willingness to help anyone in need.'
						]
					}
				]
			}
		},
		{
			person: {
				id: 'elizabeth-brown',
				name: 'Elizabeth Brown',
				gender: 'female',
				birthYear: 1948,
				bio: [
					{
						paragraphs: [
							'Elizabeth is the eldest daughter of John and Mary Ratkey. She married William Brown in 1970 and they have three children together.',
							'She worked as a nurse for over 30 years before retiring.'
						]
					}
				]
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
				deathYear: 2020,
				bio: [
					{
						paragraphs: [
							'James was the youngest son of John and Mary Ratkey. He never married and worked as an accountant for most of his career.',
							'He was known for his dry sense of humor and his love of jazz music.'
						]
					}
				]
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

// Helper function to find a person by ID
export function findPersonById(id: string, node: FamilyNode = sampleFamilyTree): Person | null {
	if (node.person.id === id) {
		return node.person;
	}
	if (node.children) {
		for (const child of node.children) {
			const found = findPersonById(id, child);
			if (found) return found;
		}
	}
	return null;
}

// Helper function to get all person IDs
export function getAllPersonIds(node: FamilyNode = sampleFamilyTree): string[] {
	const ids: string[] = [node.person.id];
	if (node.children) {
		for (const child of node.children) {
			ids.push(...getAllPersonIds(child));
		}
	}
	return ids;
}
