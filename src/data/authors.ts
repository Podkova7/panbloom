export interface Author {
	name: string;
	slug: string;
	role: string;
	bio: string;
}

export const AUTHORS: Author[] = [
	{
		name: 'Julian Vance',
		slug: 'julian-vance',
		role: 'Senior Gaming Editor',
		bio: 'Covers mobile action RPGs, gacha economies, and turn-based mechanics for PanBloom. Focuses on endgame meta breakdowns, build guides, and frame rate stability.',
	},
	{
		name: 'Marcus Sterling',
		slug: 'marcus-sterling',
		role: 'Hardware & Emulation Specialist',
		bio: 'Specializes in retro gaming emulators, Bluetooth controller mapping, and triple-A native mobile ports. Focuses on input latency, shader pipelines, and thermal performance.',
	},
	{
		name: 'Elena Rostova',
		slug: 'elena-rostova',
		role: 'Mobile Games Columnist',
		bio: 'Writes about mobile games, endless runners, and indie touchscreen titles. Her PanBloom coverage focuses on game design philosophy, touch physics, and free-to-play economy balance.',
	},
	{
		name: 'Sophia Lin',
		slug: 'sophia-lin',
		role: 'Productivity & Privacy Lead',
		bio: 'Covers mobile productivity tools, digital security, and OS privacy settings. Focuses on zero-trust mobile configurations, multi-calendar workflows, and data protection.',
	},
	{
		name: 'Devon Brooks',
		slug: 'devon-brooks',
		role: 'Mobile Technology Analyst',
		bio: 'Covers smartphone battery chemistry, AI mobile browsers, and mobile operating system telemetry. Focuses on empirical battery cycle testing and consumer usability.',
	},
	{
		name: 'Claire Montgomery',
		slug: 'claire-montgomery',
		role: 'Creative Software Editor',
		bio: 'Writes about professional creative apps, tablet video production, and stylus interfaces across iPadOS and Android. Focuses on multi-track NLEs, color grading LUTs, and SSD workflows.',
	},
	{
		name: 'Sylvie Fox',
		slug: 'sylvie-fox',
		role: 'Mobile Features Writer',
		bio: 'Covers mobile apps, Android, and iOS platform updates for PanBloom. Her articles focus on practical guides, hidden settings, and explaining new features in everyday use.',
	},
	{
		name: 'Olivia Williams',
		slug: 'olivia-williams',
		role: 'Apps & Games Reporter',
		bio: 'Writes about mobile applications and upcoming releases. Her coverage focuses on what users can realistically expect from an app and which launch features are worth testing.',
	},
	{
		name: 'Daniel Clark',
		slug: 'daniel-clark',
		role: 'Consumer Tech Writer',
		bio: 'Focuses on digital subscription services, consumer tech pricing, and head-to-head comparisons between competing mobile applications.',
	},
	{
		name: 'Andrew Wright',
		slug: 'andrew-wright',
		role: 'Mobile Gaming Contributor',
		bio: 'Covers mobile gaming releases, controller skins, and practical iPhone and Android setup walkthroughs designed to help readers make informed gaming choices.',
	},
	{
		name: 'Michael Wilson',
		slug: 'michael-wilson',
		role: 'Staff Writer',
		bio: 'Covers Android, iOS, and mobile game updates. Focuses on straightforward explanations, battery-saver settings, and practical guidance without technical jargon.',
	},
	{
		name: 'PanBloom Editorial',
		slug: 'panbloom-editorial',
		role: 'Editorial Staff',
		bio: 'The collective byline used for collaborative guides, platform updates, and benchmark analyses produced collectively by the PanBloom editorial team.',
	},
];

export function getAuthorByName(name: string): Author {
	const slug = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
	return AUTHORS.find(a => a.slug === slug) || {
		name,
		slug,
		role: 'Staff Contributor',
		bio: `${name} writes technical analyses and independent mobile reviews for PanBloom.`
	};
}
