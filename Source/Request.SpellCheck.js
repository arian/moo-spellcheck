

Request.SpellCheck = new Class({
	
	Extends: Request.JSON,
		
	options: {
		// Request
		url: 'spellcheck.php',
		method: 'get',
		
		// Spellchecker
		lang: 'en',
		ignoredigits: false,
		ignoreallcaps: false
	},
	
	spellcheck: function(text){
		this.text = text;
		this.send({
			data: {
				lang: this.options.lang,
				ignoredigits: this.options.ignoredigits,
				ignoreallcaps: this.options.ignoreallcaps,
				text: text
			}
		});
	},

	getSuggestions: function(text,spellCheckRes){
		var data = [];
		var i = 0;
		$each(spellCheckRes,function(row){
			data.push({
				text: text.substr(i,row.o-i),
				suggestions: [],
				valid: true
			});
			data.push({
				text: text.substr(row.o,row.l),
				suggestions: row.a,
				valid: false
			});
			i = row.o+row.l;
		});
		return data;
	},

	success: function(text){
		this.response.json = JSON.decode(text, this.options.secure);
		this.response.suggestions = this.getSuggestions(this.text,this.response.json);
		this.onSuccess(this.response.suggestions, this.response.json, text,this.text);
	}	
});

