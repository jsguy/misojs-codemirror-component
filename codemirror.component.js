/*
	Codemirror component
*/
var m = require('mithril'),
	//	Assume we're installed within misojs in the 
	//	/public directory - pass in different path if needed
	basePath = "node_modules/misojs-codemirror/node_modules/codemirror/";

var CodemirrorComponent = {
	//	Returns a textarea
	view: function(ctrl, attrs) {
		return m("div", [
			//	Code mirror includes (it's ok to include 
			//	these each time - browser will cache it!)
			//	TODO: Allow more modes!
			m("SCRIPT", { src:  basePath + "lib/codemirror.js"}),
			m("LINK", {   href: basePath + "lib/codemirror.css", rel: "stylesheet"}),
			m("SCRIPT", { src:  basePath + "mode/javascript/javascript.js"}),
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

module.exports = function(args){
	if(args.basePath) {
		basePath = args.basePath;
	}
	return CodemirrorComponent;
};