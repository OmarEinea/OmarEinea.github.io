const app = require('express')(), fetch = require('node-fetch'), firebase = require('firebase-admin'),
  json = data => data.json(), text = data => data.text(),
  get = (link, type) => fetch(link).then(type === 'text' ? text : json),
  database = firebase.initializeApp({
    databaseURL: 'https://eineao-website.firebaseio.com',
    credential: firebase.credential.cert({
      projectId: 'eineao-website', privateKey: process.env.KEY.replace(/\\n/g, '\n'),
      clientEmail: 'firebase-adminsdk-xxoy3@eineao-website.iam.gserviceaccount.com'
    })
  }).database().ref('home/profiles'), update = (profile, object) => {
    database.child(profile).update(object);
    console.log('Updated', profile, 'with:', JSON.stringify(object).slice(0, 84));
  };

app.get('/updateProfiles', (_, response) => {
  get('https://api.stackexchange.com/2.2/users/4794459?site=stackoverflow').then(data => {
    const { reputation, badge_counts: { gold, silver, bronze }} = data.items[0];
    update('stack', { reputation, gold, silver, bronze });
  });
  get('https://api.github.com/users/OmarEinea').then(({followers, public_repos}) => {
    update('github', { followers, repos: public_repos });
  });
  get('https://api.github.com/users/OmarEinea/subscriptions').then(repos => {
    update('github', { stars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0) });
  });
  get('https://github.com/users/OmarEinea/contributions', 'text').then(html => {
    update('github', {
      commits: Number(html.match(/<h2 class="f4.*">\s*(\d+)[\s\S]*<\/h2>/)[1]),
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
  get('https://forum.xda-developers.com/member.php?u=4800636', 'text').then(html => {
    update('xda', {
      posts: Number(html.match(/<li><span .*>Total Posts:<\/span>(.+)<\/li>/)[1].replace(',', '')),
      thanks: Number(html.match(/<li><span .*>Number of Thanks:<\/span>(.+)<\/li>/)[1])
    });
  });
  get('https://forum.xda-developers.com/search.php?do=finduser&u=4800636&starteronly=1', 'text').then(html => {
    update('xda', { threads: Number(html.match(/>Showing results \d+ to \d+ of (\d+)</)[1]) });
  });
  response.send('Updating Profiles...');
});

app.listen(process.env.PORT || 5000);
