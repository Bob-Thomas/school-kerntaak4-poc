var issue = function() {
	return { 
		name:'',
		description:'',
		author:'',
		assigned:'',
		testedBy:'',
		status:'',
		priority:'',
		comments:[
			{
				name:'Bob Thomas',
				content:'Ah zeer interesante fout'
			},
			{
				name:'Dave Janmaat',
				content:'Ja zeker hoe gaan we dit oplossen'
			},
			{
				name:'Nick Bout',
				content:'Ah ik weet het antwoord zet hem maar op mijn naam'
			},
			{
				name:'Bob Thomas',
				content:'Heb hem op je naam gezet nick'
			}

		]
	}
}

module.exports = issue;