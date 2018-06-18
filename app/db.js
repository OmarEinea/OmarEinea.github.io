import fetch from 'fetch';

export const get = query => fetch(`https://eineao-website.firebaseio.com/${query}.json`);
export const url = image => `https://firebasestorage.googleapis.com/v0/b/eineao-website.appspot.com/o/${image.replace('/', '%2F')}?alt=media`;
export const logo = name => url(`logos/${name.replace(' ', '%20')}.png`);
export default { get, url, logo };
