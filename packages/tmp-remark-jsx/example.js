var React = require('react');
var fs = require('fs');
var unified = require('unified');
var markdown = require('remark-parse');
var jsx = require('.');

class MyComponent extends React.Component {
  render() {
    return React.createElement('span', {}, 'Hello ', this.props.name, '!');
  }
}

unified()
  .use(markdown)
  .use(jsx, {componentMap: {
    MyComponent: MyComponent
  }})
  .process('<MyComponent name="markdown" /> This is **amazing**', function (err, file) {
    if (err) throw err;
    var jsxElement = file.contents[0];
    console.log('jsxElement', JSON.stringify(jsxElement));
  });