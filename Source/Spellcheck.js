
var SpellCheck = {
		
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
	}
	
};
