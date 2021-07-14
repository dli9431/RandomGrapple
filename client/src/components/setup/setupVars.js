export const defaultHandicaps = [
	{
		name: "Weight Handicap",
		unit: 'lbs',
		amount: 20,
		pts: 1
	},
	{
		name: "Experience Handicap",
		unit: 'months',
		amount: 3,
		pts: 1
	}
]

export const defaultPenalties = [
	[
		{
			category: 1,
			limit: 1,
			random: false,
			type: "Positional",
			desc: "Start in side control",
			pts: 1,
		},
		{
			category: 1,
			limit: 1,
			random: false,
			type: "Positional",
			desc: "Start in knee on belly",
			pts: 2,
		},
		{
			category: 1,
			limit: 1,
			random: false,
			type: "Positional",
			desc: "Start in kesa gatame",
			pts: 3,
		},
		{
			category: 1,
			limit: 1,
			random: false,
			type: "Positional",
			desc: "Start in mount",
			pts: 4,
		},
		{
			category: 1,
			limit: 1,
			random: false,
			type: "Positional",
			desc: "Start in high mount",
			pts: 5,
		},
		{
			category: 1,
			limit: 1,
			random: false,
			type: "Positional",
			desc: "Start on back",
			pts: 6,
		},
		{
			category: 1,
			limit: 1,
			random: false,
			type: "Positional",
			desc: "Start on back with arm trap",
			pts: 7,
		},
		{
			category: 1,
			limit: 1,
			random: false,
			type: "Positional",
			desc: "Start on back with arm trap + deep collar grip",
			pts: 8,
		},
	],
	[
		{
			category: 2,
			limit: 1,
			random: true,
			type: "Points/Subs",
			desc: "Subonly for opponent",
			pts: 10,
		},
		{
			category: 2,
			limit: 1,
			random: true,
			type: "Points/Subs",
			desc: "Start match 4-0 in points",
			pts: 10,
		},
		{
			category: 2,
			limit: 1,
			random: true,
			type: "Points/Subs",
			desc: "Start match 4-0 in points + Subonly for opponent",
			pts: 10,
		},
		{
			category: 2,
			limit: 1,
			random: true,
			type: "Points/Subs",
			desc: "Start match 4-0 in points + Subonly for opponent + doubled points for self",
			pts: 10,
		},
		{
			category: 2,
			limit: 1,
			random: true,
			type: "Points/Subs",
			desc: "Opponent must sub 3x to win",
			pts: 10,
		},
	],
	[
		{
			category: 3,
			limit: 1,
			random: false,
			type: "Time",
			desc: "-1 minute round time",
			pts: 3
		},
		{
			category: 3,
			limit: 1,
			random: false,
			type: "Time",
			desc: "-2 minute round time",
			pts: 6
		},
		{
			category: 3,
			limit: 1,
			random: false,
			type: "Time",
			desc: "-3 minute round time",
			pts: 9
		}
	],
	[
		{
			category: 4,
			limit: 2,
			random: false,
			type: "Cardio",
			desc: "Opponent does 5 burpees before match",
			pts: 1
		},
		{
			category: 4,
			limit: 2,
			random: false,
			type: "Cardio",
			desc: "Opponent does 3x front + 3x back rolls before match",
			pts: 1
		},
	],
	[
		{
			category: 5,
			limit: -1,
			random: false,
			type: "Misc",
			desc: "Free Reset",
			pts: 4,
			info: "Get out of jail card. Can be used at any time to call for a reset to original starting position."
		},
	],
	[
		{
			category: 6,
			limit: 1,
			random: true,
			type: "Finisher",
			desc: "Opponent must sub with armbar",
			pts: 4,
		},
		{
			category: 6,
			limit: 1,
			random: true,
			type: "Finisher",
			desc: "Opponent must sub with triangle",
			pts: 4,
		},
		{
			category: 6,
			limit: 1,
			random: true,
			type: "Finisher",
			desc: "Opponent must sub with kimura",
			pts: 4,
		},
		{
			category: 6,
			limit: 1,
			random: true,
			type: "Finisher",
			desc: "Opponent must sub with americana",
			pts: 4,
		},
		{
			category: 6,
			limit: 1,
			random: true,
			type: "Finisher",
			desc: "Opponent must sub with ankle lock",
			pts: 4,
		},
		{
			category: 6,
			limit: 1,
			random: true,
			type: "Finisher",
			desc: "Opponent must sub with guillotine",
			pts: 4,
		},
		{
			category: 6,
			limit: 1,
			random: true,
			type: "Finisher",
			desc: "Opponent must sub with ezekiel",
			pts: 4,
		},
	]
];