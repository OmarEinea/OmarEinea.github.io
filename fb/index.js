const app = require('express')(), fetch = require('node-fetch'), firebase = require('firebase-admin'), 
  json = data => data.json(), text = data => data.text(),
  get = (link, type) => fetch(link).then(type === 'text' ? text : json)
  database = firebase.initializeApp({
    databaseURL: 'https://eineao-website.firebaseio.com',
    credential: firebase.credential.cert({
      projectId: 'eineao-website', privateKey: process.env.KEY.replace(/\\n/g, '\n'),
      clientEmail: 'firebase-adminsdk-xxoy3@eineao-website.iam.gserviceaccount.com'
    })
  }).database().ref('home/profiles');

app.get('/updateProfiles', (_, response) => {
  get('https://api.stackexchange.com/2.2/users/4794459?site=stackoverflow').then(data => {
    const { reputation, badge_counts: { gold, silver, bronze }} = data.items[0];
    database.child('stack').update({ reputation, gold, silver, bronze });
  });
  get('https://api.github.com/users/OmarEinea').then(({followers, public_repos}) => {
    database.child('github').update({ followers, repos: public_repos });
  });
  get('https://github.com/users/OmarEinea/contributions', 'text').then(html => {
    database.child('github').update({
      commits: Number(html.match(/<h2 class="f4.*">\s*([0-9]+)[\s\S]*<\/h2>/)[1]),
      graph: html.match(/<svg([\s\S]*?)<\/svg>/)[0]
        .replace('translate(16, 20)', 'translate(20, 24)')
        .replace('height="104"', 'height="108"')
        .replace(/dx="-14"/g, 'dx="-20"')
        .replace(/ data-hydro-click=".*">/, '>')
        .replace(/ data-count=".*"\/>/g, '/>')
        .replace(/ class="(month|day|wday)"/g, '')
        .replace(/.*style="display: none;".*\n/g, '')
        .replace(/"/g, "'").replace(/\n */g, '')
    });
  });
  response.send('Updating Profiles...');
});

app.listen(process.env.PORT || 5000);
