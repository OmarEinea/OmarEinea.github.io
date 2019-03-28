const app = require('express')(), fetch = require('node-fetch'), firebase = require('firebase-admin'),
  json = data => data.json(), text = data => data.text(),
  get = (link, type) => fetch(link).then(type === 'text' ? text : json),
  database = firebase.initializeApp({
    databaseURL: 'https://eineao-website.firebaseio.com',
    credential: firebase.credential.cert({
      projectId: 'eineao-website', privateKey: process.env.KEY.replace(/\\n/g, '\n'),
      clientEmail: 'firebase-adminsdk-xxoy3@eineao-website.iam.gserviceaccount.com'
    })
  }).database().ref('profiles/Development'), update = (profile, object) => {
    database.child(profile).update(object);
    console.log('Updated', profile, 'with:', JSON.stringify(object).slice(0, 84));
  }, rect = /<rect .*?fill="#([0-9a-f]{6})".*?\/>/g, colors = [
    'ebedf0', 'c6e48b', '7bc96f', '239a3b', '196127'
  ];

app.get('/updateProfiles', (_, response) => {
  get('https://api.stackexchange.com/2.2/users/4794459?site=stackoverflow').then(data => {
    const { reputation, badge_counts: { gold, silver, bronze }} = data.items[0];
    update('StackOverflow', { reputation, gold, silver, bronze });
  });
  get('https://api.github.com/users/OmarEinea').then(({followers, public_repos}) => {
    update('GitHub', { followers, repos: public_repos });
  });
  get('https://api.github.com/users/OmarEinea/subscriptions').then(repos => {
    update('GitHub', { stars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0) });
  });
  get('https://github.com/users/OmarEinea/contributions', 'text').then(html => {
    let match, graph = '', svg = html.match(/<svg[\s\S]*?<\/svg>/)[0];
    while(match = rect.exec(svg)) graph += colors.indexOf(match[1]);
    update('GitHub', {
      commits: Number(html.match(/<h2 class="f4.*">\s*(\d+)[\s\S]*<\/h2>/)[1]), graph
    });
  });
  get('https://forum.xda-developers.com/member.php?u=4800636', 'text').then(html => {
    update('XdaDevelopers', {
      posts: Number(html.match(/<li><span .*>Total Posts:<\/span>(.+)<\/li>/)[1].replace(',', '')),
      thanks: Number(html.match(/<li><span .*>Number of Thanks:<\/span>(.+)<\/li>/)[1])
    });
  });
  get('https://forum.xda-developers.com/search.php?do=finduser&u=4800636&starteronly=1', 'text').then(html => {
    update('XdaDevelopers', { threads: Number(html.match(/>Showing results \d+ to \d+ of (\d+)</)[1]) });
  });
  setTimeout(() => fetch('https://europe-west1-eineao-website.cloudfunctions.net/update'), 10000);
  response.send('Updating Profiles...');
});

app.get('/cacheImages', (_, response) => {
  database.once('value', data => {
    data = data.val();
  });
});

app.listen(process.env.PORT || 5000);
