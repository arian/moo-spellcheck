SpellChecker
============

This class allows you to provide spell checking for text. It uses Google to check if the text is correct
and to get some suggestions. This is done by a PHP script that uses cURL to get some xml and translates it 
to JSON, so we can use Request.JSON for our client-side. That is where Request.SpellCheck is build on.
Request.SpellCheck will give you an array in the onSuccess event that you can use. (for mark-up things)

![Screenshot](http://github.com/arian/moo-spellcheck/raw/master/screenshot.png)

How to use
----------

var spell = new Request.SpellCheck([options]);
