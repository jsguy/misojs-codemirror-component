//	This example works with misojs, simply save
//	this file as an mvc entity in your misojs app.
var m = require('mithril'),
	//	In misojs, the path to publically accessible 
	//	node_modules is as per below:
	//	CodeMirror = require('../public/node_modules/misojs-codemirror/codemirror.component.js')();
	CodeMirror = require('codemirror.component.js')();

module.exports.index = {
	controller: function(params) {
		this.value = m.prop([
			"for(var x = 0; x < 10; x += 1){",
			"    console.log(x);",
			"}"].join("\n"));
		return this;
	},
	view: function(ctrl) {
		with(sugartags) {
			return DIV({"class": "cw cf"}, [
				H1("Code mirror example"),
				DIV(m.component(CodeMirror, {
					value: ctrl.value
				}))
			]);
		};
	}
};