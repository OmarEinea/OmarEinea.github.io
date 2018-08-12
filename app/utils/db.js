import 'fetch';

export const colors = ['#9E125E', '#DB236B', '#E32f4C', '#F24354', '#FA5E35', '#FE7131'];
export const json = data => data.json();
export const get = query => fetch(`https://eineao-website.firebaseio.com/${query}.json`).then(json);
export const url = image => `https://firebasestorage.googleapis.com/v0/b/eineao-website.appspot.com/o/${image.replace(/\//g, '%2F')}?alt=media`;
export const logo = name => url(`logos/${name.replace(' ', '%20')}.png`);
export default { get, url, logo, json, colors };
