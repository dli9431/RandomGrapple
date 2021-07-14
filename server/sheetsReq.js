module.exports = {
	create: function () {
		const init = {
			resource: {
				properties: {
					title: "RandomGrapple[default]",
					locale: "en_US",
					timeZone: "America/Los_Angeles",
				},				
				sheets: [
					{ 
						properties: {
							title: "Players",
						},
						data: [
							{
								rowData: [
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "Name"
												}
											},
											{
												userEnteredValue: {
													stringValue: "Nickname"
												}
											},
											{
												userEnteredValue: {
													stringValue: "Handicap"
												}
											},
											{
												userEnteredValue: {
													stringValue: "Record"
												}
											}
										]
									}
								]
							}
						]
					},
					{ 
						properties: {
							title: "Gym Average",
						},
						data: [
							{
								rowData: [
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "Gym Averages"
												}
											},
											{
												userEnteredValue: {
													stringValue: "Amount"
												}
											},
											{
												userEnteredValue: {
													stringValue: "Unit"
												}
											}
										]
									},
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "Weight"
												}
											},
											{
												userEnteredValue: {
													numberValue: 150
												}
											},
											{
												userEnteredValue: {
													stringValue: "lbs"
												}
											}
										]
									},
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "Exp"
												}
											},
											{
												userEnteredValue: {
													numberValue: 6
												}
											},
											{
												userEnteredValue: {
													stringValue: "months"
												}
											}
										]
									}
								],
							}
						]
					},
					{ 
						properties: {
							title: "Handicaps",
						},
						data: [
							{
								rowData: [
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "Handicaps"
												}
											},
											{
												userEnteredValue: {
													stringValue: "Amount"
												}
											},
											{
												userEnteredValue: {
													stringValue: "Unit"
												}
											},
											{
												userEnteredValue: {
													stringValue: "Points"
												}
											},
											{
												userEnteredValue: {
													stringValue: "Condition"
												}
											},
											{
												userEnteredValue: {
													stringValue: "Optional"
												}
											}
										]
									},
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "Weight"
												}
											},
											{
												userEnteredValue: {
													numberValue: 20
												}
											},
											{
												userEnteredValue: {
													stringValue: "lbs"
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													stringValue: "per 20 lbs"
												}
											},
											{
												userEnteredValue: {
													boolValue: false
												}
											}
										]
									},
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "Experience"
												}
											},
											{
												userEnteredValue: {
													numberValue: 3
												}
											},
											{
												userEnteredValue: {
													stringValue: "months"
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													stringValue: "per 3 months"
												}
											},
											{
												userEnteredValue: {
													boolValue: false
												}
											}
										]
									},
								],
							}
						]
					},
					{ 
						properties: {
							title: "Penalties",
						},
						data: [
							{
								rowData: [
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "Description"
												}
											},
											{
												userEnteredValue: {
													stringValue: "Points"
												}
											},
											{
												userEnteredValue: {
													stringValue: "Type"
												}
											},
											{
												userEnteredValue: {
													stringValue: "Random"
												}
											},
											{
												userEnteredValue: {
													stringValue: "Limit"
												}
											},
											{
												userEnteredValue: {
													stringValue: "Category"
												}
											},
											{
												userEnteredValue: {
													stringValue: "Info"
												}
											}
										]
									},
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "Start in side control"
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													stringValue: "Positional"
												}
											},
											{
												userEnteredValue: {
													boolValue: false
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													stringValue: ""
												}
											},
										]
									},
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "Start in knee on belly"
												}
											},
											{
												userEnteredValue: {
													numberValue: 2
												}
											},
											{
												userEnteredValue: {
													stringValue: "Positional"
												}
											},
											{
												userEnteredValue: {
													boolValue: false
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													stringValue: ""
												}
											},
										]
									},
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "Start in kesa"
												}
											},
											{
												userEnteredValue: {
													numberValue: 3
												}
											},
											{
												userEnteredValue: {
													stringValue: "Positional"
												}
											},
											{
												userEnteredValue: {
													boolValue: false
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													stringValue: ""
												}
											},
										]
									},
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "Start in mount"
												}
											},
											{
												userEnteredValue: {
													numberValue: 4
												}
											},
											{
												userEnteredValue: {
													stringValue: "Positional"
												}
											},
											{
												userEnteredValue: {
													boolValue: false
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													stringValue: ""
												}
											},
										]
									},
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "Start in high mount"
												}
											},
											{
												userEnteredValue: {
													numberValue: 5
												}
											},
											{
												userEnteredValue: {
													stringValue: "Positional"
												}
											},
											{
												userEnteredValue: {
													boolValue: false
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													stringValue: ""
												}
											},
										]
									},
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "Start on back"
												}
											},
											{
												userEnteredValue: {
													numberValue: 6
												}
											},
											{
												userEnteredValue: {
													stringValue: "Positional"
												}
											},
											{
												userEnteredValue: {
													boolValue: false
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													stringValue: ""
												}
											},
										]
									},
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "Start on back with arm trap"
												}
											},
											{
												userEnteredValue: {
													numberValue: 7
												}
											},
											{
												userEnteredValue: {
													stringValue: "Positional"
												}
											},
											{
												userEnteredValue: {
													boolValue: false
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													stringValue: ""
												}
											},
										]
									},
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "Start on back with arm trap and deep collar grip"
												}
											},
											{
												userEnteredValue: {
													numberValue: 8
												}
											},
											{
												userEnteredValue: {
													stringValue: "Positional"
												}
											},
											{
												userEnteredValue: {
													boolValue: false
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													stringValue: ""
												}
											},
										]
									},
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "Sub only for opponent"
												}
											},
											{
												userEnteredValue: {
													numberValue: 10
												}
											},
											{
												userEnteredValue: {
													stringValue: "Points/Subs"
												}
											},
											{
												userEnteredValue: {
													boolValue: true
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													numberValue: 2
												}
											},
											{
												userEnteredValue: {
													stringValue: ""
												}
											},
										]
									},
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "Start match 4-0 in points"
												}
											},
											{
												userEnteredValue: {
													numberValue: 10
												}
											},
											{
												userEnteredValue: {
													stringValue: "Points/Subs"
												}
											},
											{
												userEnteredValue: {
													boolValue: true
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													numberValue: 2
												}
											},
											{
												userEnteredValue: {
													stringValue: ""
												}
											},
										]
									},
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "Start match 4-0 in points AND sub only for opponent"
												}
											},
											{
												userEnteredValue: {
													numberValue: 10
												}
											},
											{
												userEnteredValue: {
													stringValue: "Points/Subs"
												}
											},
											{
												userEnteredValue: {
													boolValue: true
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													numberValue: 2
												}
											},
											{
												userEnteredValue: {
													stringValue: ""
												}
											},
										]
									},
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "Start match 4-0 in points AND sub only for opponent AND doubled points for self"
												}
											},
											{
												userEnteredValue: {
													numberValue: 10
												}
											},
											{
												userEnteredValue: {
													stringValue: "Points/Subs"
												}
											},
											{
												userEnteredValue: {
													boolValue: true
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													numberValue: 2
												}
											},
											{
												userEnteredValue: {
													stringValue: ""
												}
											},
										]
									},
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "Opponent must sub 3x to win"
												}
											},
											{
												userEnteredValue: {
													numberValue: 10
												}
											},
											{
												userEnteredValue: {
													stringValue: "Points/Subs"
												}
											},
											{
												userEnteredValue: {
													boolValue: true
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													numberValue: 2
												}
											},
											{
												userEnteredValue: {
													stringValue: ""
												}
											},
										]
									},
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "-1 minute round time"
												}
											},
											{
												userEnteredValue: {
													numberValue: 3
												}
											},
											{
												userEnteredValue: {
													stringValue: "Time"
												}
											},
											{
												userEnteredValue: {
													boolValue: false
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													numberValue: 3
												}
											},
											{
												userEnteredValue: {
													stringValue: "Round time based on lower belt's IBJJF standard time (ex: white belt 5->4 mins)"
												}
											},
										]
									},
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "-2 minute round time"
												}
											},
											{
												userEnteredValue: {
													numberValue: 6
												}
											},
											{
												userEnteredValue: {
													stringValue: "Time"
												}
											},
											{
												userEnteredValue: {
													boolValue: false
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													numberValue: 3
												}
											},
											{
												userEnteredValue: {
													stringValue: "Round time based on lower belt's IBJJF standard time (ex: white belt 5->3 mins)"
												}
											},
										]
									},
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "-3 minute round time"
												}
											},
											{
												userEnteredValue: {
													numberValue: 9
												}
											},
											{
												userEnteredValue: {
													stringValue: "Time"
												}
											},
											{
												userEnteredValue: {
													boolValue: false
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													numberValue: 3
												}
											},
											{
												userEnteredValue: {
													stringValue: "Round time based on lower belt's IBJJF standard time (ex: white belt 5->2 mins)"
												}
											},
										]
									},
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "Opponent does 5 burpees before match"
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													stringValue: "Cardio"
												}
											},
											{
												userEnteredValue: {
													boolValue: false
												}
											},
											{
												userEnteredValue: {
													numberValue: 2
												}
											},
											{
												userEnteredValue: {
													numberValue: 4
												}
											},
											{
												userEnteredValue: {
													stringValue: ""
												}
											},
										]
									},
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "Opponent does 3x front AND back rolls before match"
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													stringValue: "Cardio"
												}
											},
											{
												userEnteredValue: {
													boolValue: false
												}
											},
											{
												userEnteredValue: {
													numberValue: 2
												}
											},
											{
												userEnteredValue: {
													numberValue: 4
												}
											},
											{
												userEnteredValue: {
													stringValue: ""
												}
											},
										]
									},
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "Free reset"
												}
											},
											{
												userEnteredValue: {
													numberValue: 4
												}
											},
											{
												userEnteredValue: {
													stringValue: "Misc"
												}
											},
											{
												userEnteredValue: {
													boolValue: false
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													numberValue: 5
												}
											},
											{
												userEnteredValue: {
													stringValue: "Get out of jail free card, can be used at any time to call for a reset to starting position"
												}
											},
										]
									},
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "Opponent must sub with armbar"
												}
											},
											{
												userEnteredValue: {
													numberValue: 4
												}
											},
											{
												userEnteredValue: {
													stringValue: "Finisher"
												}
											},
											{
												userEnteredValue: {
													boolValue: true
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													numberValue: 6
												}
											},
											{
												userEnteredValue: {
													stringValue: "Only armbar finishes count"
												}
											},
										]
									},
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "Opponent must sub with triangle"
												}
											},
											{
												userEnteredValue: {
													numberValue: 4
												}
											},
											{
												userEnteredValue: {
													stringValue: "Finisher"
												}
											},
											{
												userEnteredValue: {
													boolValue: true
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													numberValue: 6
												}
											},
											{
												userEnteredValue: {
													stringValue: "Only triangle finishes count"
												}
											},
										]
									},
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "Opponent must sub with kimura"
												}
											},
											{
												userEnteredValue: {
													numberValue: 4
												}
											},
											{
												userEnteredValue: {
													stringValue: "Finisher"
												}
											},
											{
												userEnteredValue: {
													boolValue: true
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													numberValue: 6
												}
											},
											{
												userEnteredValue: {
													stringValue: "Only kimura finishes count"
												}
											},
										]
									},
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "Opponent must sub with americana"
												}
											},
											{
												userEnteredValue: {
													numberValue: 4
												}
											},
											{
												userEnteredValue: {
													stringValue: "Finisher"
												}
											},
											{
												userEnteredValue: {
													boolValue: true
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													numberValue: 6
												}
											},
											{
												userEnteredValue: {
													stringValue: "Only americana finishes count"
												}
											},
										]
									},
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "Opponent must sub with ankle lock"
												}
											},
											{
												userEnteredValue: {
													numberValue: 4
												}
											},
											{
												userEnteredValue: {
													stringValue: "Finisher"
												}
											},
											{
												userEnteredValue: {
													boolValue: true
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													numberValue: 6
												}
											},
											{
												userEnteredValue: {
													stringValue: "Only ankle lock finishes count"
												}
											},
										]
									},
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "Opponent must sub with ezekiel"
												}
											},
											{
												userEnteredValue: {
													numberValue: 4
												}
											},
											{
												userEnteredValue: {
													stringValue: "Finisher"
												}
											},
											{
												userEnteredValue: {
													boolValue: true
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													numberValue: 6
												}
											},
											{
												userEnteredValue: {
													stringValue: "Only ezekiel finishes count"
												}
											},
										]
									},
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "Opponent must sub with guillotine"
												}
											},
											{
												userEnteredValue: {
													numberValue: 4
												}
											},
											{
												userEnteredValue: {
													stringValue: "Finisher"
												}
											},
											{
												userEnteredValue: {
													boolValue: true
												}
											},
											{
												userEnteredValue: {
													numberValue: 1
												}
											},
											{
												userEnteredValue: {
													numberValue: 6
												}
											},
											{
												userEnteredValue: {
													stringValue: "Only guillotine finishes count"
												}
											},
										]
									},
								],
							}
						]
					},
					{ 
						properties: {
							title: "Matches",
						},
						data: [
							{
								rowData: [
									{
										values: [
											{
												userEnteredValue: {
													stringValue: "Player 1"
												}
											},
											{
												userEnteredValue: {
													stringValue: "Player 2"
												}
											},
											{
												userEnteredValue: {
													stringValue: "Winner"
												}
											},
											{
												userEnteredValue: {
													stringValue: "Point differential"
												}
											},
											{
												userEnteredValue: {
													stringValue: "Handicaps"
												}
											}
										]
									}
								]
							}
						]
					}
				]
			}
		}
		return init;
	}	
}