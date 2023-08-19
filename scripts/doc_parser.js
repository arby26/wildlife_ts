const createDocs = (elem) => {
  const docs = {};
  let currentFunction = '';
  const add = str => docs[currentFunction] = (docs[currentFunction] ?? '') + ' * ' + str + '\n';
  const addMultiple = str => str.split(/\n/).forEach(add);
  let last = '';

  while(elem) {
    if(elem.id?.startsWith('wl_')) {
      if(last) addMultiple(last);
      currentFunction = elem.id;
      last = `\n\n{@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#${elem.id} | View online documentation}`;
    } else if(elem.innerText === 'Example:') {
      addMultiple('\n@example');
    } else if(elem.tagName === 'PRE') {
      add('```lua');
      addMultiple(elem.innerText);
      add('```');
    } else {
      const value = elem.innerText;
      if(value.length > 1) {
        addMultiple(elem.innerText);
      }
    }

    elem = elem.nextElementSibling;
  }

  addMultiple(last);

  return docs;
}

const parseTsDocs = (str) => {
  const lines = str.split(/\n/g);
  const map = {};
  let buffer = '';

  for(const line of lines) {
    if(line.startsWith(' * @')) {
      buffer+=line + '\n';
    } else if(/^[\t ]*declare/g.test(line)) {
      const name = line.match(/wl_[^(]+/)[0];
      map[name] = {doc: buffer, def: line};
      buffer = '';
    }
  }
  return map;
}

const combine = (tsDocs, otherDocs) => {
  let result = '';

  for(const key of Object.keys(tsDocs)) {
    const {doc, def} = tsDocs[key];
    const otherDoc = otherDocs[key];
    result+='/**\n';
    result+=otherDoc.trimEnd();
    result+='\n';
    result+=doc.trimEnd();
    result+='\n */\n';
    result+=def;
    result+='\n';
    result+='\n';
  }

  return result;
}