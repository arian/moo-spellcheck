/*
---
description: Request.SpellCheck is a class that can check a text for spelling using Google

license: MIT-style

authors:
- Arian Stolwijk

requires:
requires: 
  core/1.2.4: 
  - Request.JSON

provides: [Request.SpellCheck,Request.SpellCheck.spellcheck]

...
*/


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

	setLang: function(lang){
		this.options.lang = lang;
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
		data.push({
			text: text.substr(i),
			suggestions: [],
			valid: true			
		});
		return data;
	},

	success: function(text){
		this.response.json = JSON.decode(text, this.options.secure);
		this.response.suggestions = this.getSuggestions(this.text,this.response.json);
		this.onSuccess(this.response.suggestions, this.response.json, text,this.text);
	}
			
});

