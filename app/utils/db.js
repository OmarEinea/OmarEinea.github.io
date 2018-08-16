import 'fetch';

const json = data => data.json(),
  text = data => data.text(),
  getCache = key => {
    const cache = sessionStorage.getItem(key);
    return cache ? {then: handle => handle(JSON.parse(cache))} : false;
  }, setCache = key => result => ({then: handle => {
    sessionStorage.setItem(key, JSON.stringify(result));
    handle(result);
  }});

export const colors = ['#9E125E', '#DB236B', '#E32f4C', '#F24354', '#FA5E35', '#FE7131'];
export const url = image => `https://firebasestorage.googleapis.com/v0/b/eineao-website.appspot.com/o/${image.replace(/\//g, '%2F')}?alt=media`;
export const logo = name => url(`logos/${name.replace(' ', '%20')}.png`);
export const bring = (link, key, type) => getCache(key) || fetch(link).then(type === 'text' ? text : json).then(setCache(key));
export const get = query => getCache(query) || fetch(`https://eineao-website.firebaseio.com/${query}.json`).then(json).then(setCache(query));
