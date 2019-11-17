verseListTemplate = null;

function compileTemplate() {
  if (verseListTemplate == null) {
    var pug = require('pug');
    var path = require('path');
    
    var verse_list_template_file = path.join(__dirname, '../../templates/verse_list.pug');
    verseListTemplate = pug.compileFile(verse_list_template_file);
  }

  self.postMessage({ cmd: "compileTemplate" });
}

function getVerses(spec, token) {
  var htmlVerses = verseListTemplate(spec);
  self.postMessage({ cmd: "getVerses", verseList: htmlVerses, token: token });
}

self.addEventListener('message', function(e) {
  var data = e.data;

  switch (data.cmd) {    
    case 'compileTemplate':
      //console.log("Engine: compiling template");
      compileTemplate();
      break;

    case 'getVerses':
      //console.log("Engine: generating verses");
      getVerses(data.spec, data.token);
      break;
    
    default:
      self.postMessage('Unknown cmd: ' + data.cmd);
  }
}, false);