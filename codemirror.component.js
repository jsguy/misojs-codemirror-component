/*
	Codemirror component
*/
var m = require('mithril'),
	//	Assume we're installed within misojs in the "public" directory - pass in different path if needed
	basePath = "node_modules/misojs-codemirror-component/node_modules/codemirror/";

/*
	Here we have a few fixes to make CM work in node - we only setup each,
	if they don't already exist, otherwise we would override the browser
*/
global.document = global.document || {};
global.document.createElement = global.document.createElement || function(){
	return {
		setAttribute: function(){}
	};
};
global.window = global.window || {};
global.window.getSelection = global.window.getSelection || function(){
	return false;
};
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.130 Safari/537.36";

//	Grab code mirror and the javascript language
var CodeMirror = require('codemirror');
require("codemirror/mode/javascript/javascript.js");

//	Our component
var CodemirrorComponent = {
	//	Returns a textarea
	view: function(ctrl, attrs) {
		return m("div", [
			//	It is ok to include CSS here - the browser will cache it,
			//	though a more ideal setup would be the ability to load only
			//	once when required.
			m("LINK", { href: basePath + "lib/codemirror.css", rel: "stylesheet"}),
			m("textarea", {config: CodemirrorComponent.config(attrs)}, attrs.value())
		]);
	},
	config: function(attrs) {
		return function(element, isInitialized) {
			if(typeof CodeMirror !== 'undefined') {
				if (!isInitialized) {
					var editor = CodeMirror.fromTextArea(element, {
						lineNumbers: true
					});
					editor.on("change", function(instance, object) {
						m.startComputation();
						attrs.value(editor.doc.getValue());
						if (typeof attrs.onchange == "function"){
							attrs.onchange(instance, object);
						}
						m.endComputation();
					});
				}
			} else {
				console.warn('ERROR: You need Codemirror in the page');	
			}
		};
	}
};

//	Allw the user to pass in arguments when loading.
module.exports = function(args){
	if(args && args.basePath) {
		basePath = args.basePath;
	}
	return CodemirrorComponent;
};