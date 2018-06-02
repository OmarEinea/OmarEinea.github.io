import fetch from 'fetch';

export const get = query => fetch(`https://eineao-website.firebaseio.com/${query}.json`);
export const url = image => `https://firebasestorage.googleapis.com/v0/b/eineao-website.appspot.com/o/${image}?alt=media`;
export default { get, url };
