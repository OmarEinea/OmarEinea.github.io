const functions = require('firebase-functions');
const { onRequest } = functions.region('europe-west1').https;
const database = require('firebase-admin').initializeApp(functions.config().firebase).database().ref();

exports.update = onRequest((request, response) => {
  const job = request.url.slice(1) || 'default';
  database.child('home/' + job).once('value', entries => {
    const { resume = 'resume.docx', ...sections } = entries.val();
    for (const key in sections) {
      if (typeof (sections[key]) === 'object') {
        for (const sub in sections[key])
          sections[key + '/' + sub] = sections[key][sub]
        delete sections[key];
      }
    }
    const data = {}, queries = Object.entries(sections).map(([section, picks]) => {
      data[section] = [];
      return database.child(section).once('value', content => {
        const items = Object.values(content.val()).reduce((all, some) => Object.assign(all, some), {});
        picks.split(',').map(pick => data[section].push([pick, items[pick]]));
      });
    });
    Promise.all(queries).then(() => {
      database.child('home/intro').once('value', intro => {
        data.intro = intro.val();
        data.intro.resume = resume;
        database.child('home/_/' + job).update(data);
        response.send('Updated ' + job);
      });
    });
  });
});

exports.get = onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Credentials', 'true');
  database.child(request.url.replace('home', 'home/_')).once('value', data => response.send(data.val()));
});