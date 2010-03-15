
Request.SpellCheck = new Class({
	
	Extends: Request,
		
	options: {
		// Request
		url: 'spellcheck.php',
		method: 'get',
		
		// Spellchecker
		lang: 'en',
		ignoredigits: false,
		ignoreallcaps: false
	},
	
	check: function(text){
		this.send({
			lang: this.options.lang,
			ignoredigits: this.options.ignoredigits,
			ignoreallcaps: this.options.ignoreallcaps,
			text: text
		});
	},

	success: function(text){ 
		this.onSuccess(text);
	}	
});

