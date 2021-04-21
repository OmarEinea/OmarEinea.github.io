import 'fetch';

const projectId = 'eineao-website',
  storageURL = `https://firebasestorage.googleapis.com/v0/b/${projectId}.appspot.com/o/`,
  databaseURL = `https://europe-west1-${projectId}.cloudfunctions.net/get/`,
  json = data => data.json(),
  getCache = key => {
    const cache = sessionStorage.getItem(key.split('/')[0]);
    return cache ? { then: handle => handle(JSON.parse(cache)) } : false;
  }, setCache = key => result => ({
    then: handle => {
      sessionStorage.setItem(key.split('/')[0], JSON.stringify(result));
      handle(result);
    }
  });

export const age = new Date(Date.now() - 801954000000).getFullYear() - 1970;
export const colors = ['#C4086E', '#Cf1D61', '#DB3255', '#E64749', '#F25C3D', '#FE7131', '#FF8533'];
export const url = image => storageURL + image.replace(/\//g, '%2F') + '?alt=media';
export const skill = name => url(`skills/${name.replace(' ', '%20')}.png`);
export const profile = name => url(`profiles/${name}/logo.png`);
export const get = query => getCache(query) || fetch(databaseURL + query).then(json).then(setCache(query));
