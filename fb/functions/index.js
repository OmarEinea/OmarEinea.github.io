const functions = require('firebase-functions').region('europe-west1').https,
  fetch = require('node-fetch'), json = data => data.json(), text = data => data.text(),
  get = (link, type) => fetch(link).then(type === 'text' ? text : json)
  database = require('firebase-admin').initializeApp({
    databaseURL: "https://eineao-website.firebaseio.com",
    apiKey: process.env.APIKEY
  }).database().ref('home/profiles');

exports.updateProfiles = functions.onRequest((_, response) => {
  get('https://api.stackexchange.com/2.2/users/4794459?site=stackoverflow').then(data => {
    const { reputation, badge_counts: { gold, silver, bronze }} = data.items[0];
    database.child('stack').update({ reputation, gold, silver, bronze });
  });
  response.send('Updating Profiles...');
});
