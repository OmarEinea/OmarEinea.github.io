import 'fetch';

const projectId = 'eineao-website',
  databaseURL = `https://firebasestorage.googleapis.com/v0/b/${projectId}.appspot.com/o/`,
  storageURL = `https://${projectId}.firebaseio.com/`,
  json = data => data.json(), text = data => data.text(),
  getCache = key => {
    const cache = sessionStorage.getItem(key);
    return cache ? {then: handle => handle(JSON.parse(cache))} : false;
  }, setCache = key => result => ({then: handle => {
    sessionStorage.setItem(key, JSON.stringify(result));
    handle(result);
  }});

export const age = new Date(Date.now() - 801954000000).getFullYear() - 1970;
export const colors = ['#C4086E', '#Cf1D61', '#DB3255', '#E64749', '#F25C3D', '#FE7131'];
export const url = image => databaseURL + image.replace(/\//g, '%2F') + '?alt=media';
export const logo = name => url(`logos/${name.replace(' ', '%20')}.png`);
export const bring = (link, key, type) => getCache(key) || fetch(link).then(type === 'text' ? text : json).then(setCache(key));
export const get = query => getCache(query) || fetch(storageURL + query + '.json').then(json).then(setCache(query));
