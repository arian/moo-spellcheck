SpellChecker
============

This class allows you to provide spell checking for text. It uses Google to check if the text is correct
and to get some suggestions. This is done by a PHP script that uses cURL to get some xml and translates it 
to JSON, so we can use Request.JSON for our client-side. That is where Request.SpellCheck is build on.
Request.SpellCheck will give you an array in the onSuccess event that you can use. (for mark-up things)

![Screenshot](http://github.com/arian/moo-spellcheck/raw/master/screenshot.png)

How to use
----------


== Example == 

    window.addEvent('domready', function() {
        
		var result = document.id('result');

		var spell = new Request.SpellCheck({
			url: '../Source/spellcheck.php',
			onSuccess: function(suggestions,data,response,text){
				
				result.empty();
				$each(suggestions,function(sug){
					
					new Element('span',{
						'class': sug.valid ? '' : 'error',
						text: sug.text
					}).inject(result);
					
					if(!sug.valid){
						new Element('span',{
							'class': 'suggestions',
							text: '('+sug.suggestions.join(', ')+')'
						}).inject(result);
					}
					
				});
			}
		});
		
		spell.checkspell('Testng ths spelcheckr out.');

    });

    
## Class: Request.SpellCheck

This class extends Request.JSON, so you can use all Request.JSON stuff you already know.

### Options 
- lang: (*string*: default en) The language Code
- ignoredigits: (*boolean*: default false) true to ignore digits, false to check them
- ignoreallcaps: (*boolean*: default false) true to ignore words with all caps, false to check them


### Events

All the events you know from Request.JSON

#### success

Fired when the request completes. This overrides the signature of the Request.JSON success event.

#### Signature:

	#JS
	onSuccess(suggestions, responseJSON, responseText, text)

#### Arguments:
- suggestions - (*array*) An array with the data 
	- text - (*string*) The text 
	- valid - (*boolean*) Is this little text valid or not
	- suggestions - (*array*) An array with suggestions
- responseJSON - (*object*) The JSON response object from the remote request.
- responseText - (*string*) The JSON response as string.
- text - (*string*) The original input text

