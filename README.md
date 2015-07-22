# misojs-codemirror-component

A code mirror component for use in misojs

## installation

In your main misojs application directory:

```
npm install misojs-codemirror-component --save
```

## Usage

Acceess the component in your mvc entities like so:

```javascript
var CodeMirror = require('misojs-codemirror-component')();
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

## Isomorphism

The server generated code simply returns a textarea, whereas the client side code runs the code mirror editor.