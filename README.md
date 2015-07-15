# misojs-codemirror-component

A code mirror component for use in misojs

## installation

In your main misojs application directory:

```
npm install misojs-codemirror-component --save --prefix ./public
cd public/node_modules/misojs-codemirror-component
npm install .
```

## Usage

You've now installed the component into the /public directory, and you can acceess it in your mvc entities like so:

```javascript
var CodeMirror = require('../public/node_modules/misojs-codemirror-component/codemirror.component.js')();
```

In your controller, you might set a value like so:

```javascript
this.codeMirrorValue = m.prop([
	"for(var x = 0; x < 10; x += 1){",
	"    console.log(x);",
	"}"].join("\n")
);
```

And in your view:

```javascript
m("div", [
	m("label", "Code mirror:"),
	m.component(CodeMirror, {
		value: ctrl.codeMirrorValue
	})
])
```

This will render a code mirror editor.

## Updating

Don't forget to update with the prefix as well, eg, in /public of your misojs app:

```javascript
npm update misojs-codemirror-component --prefix ./public
```

This will update the component.