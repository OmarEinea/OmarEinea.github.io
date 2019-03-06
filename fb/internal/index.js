const functions = require('firebase-functions'), { onRequest } = functions.region('europe-west1').https,
  database = require('firebase-admin').initializeApp(functions.config().firebase).database().ref();

exports.update = onRequest((request, response) => {
  const resume = request.url.slice(1) || 'default';
  database.child('home/' + resume).once('value', sections => {
    sections = sections.val();
    for(const key in sections)
      if(typeof(sections[key]) === 'object') {
        for(const sub in sections[key])
          sections[key + '/' + sub] = sections[key][sub]
        delete sections[key];
      }
    const data = {}, queries = Object.entries(sections).map(([ section, picks ]) => {
      data[section] = [];
      return database.child(section).once('value', content => {
        const items = Object.values(content.val()).reduce((all, some) => Object.assign(all, some), {});
        picks.split(',').map(pick => data[section].push([pick, items[pick]]));
      });
    });
    Promise.all(queries).then(() => {
      database.child('home/intro').once('value', intro => {
        data.intro = intro.val();
        database.child('home/_/' + resume).update(data);
        response.send('Updated ' + resume);  
      });
    });
  });
});

exports.get = onRequest((request, response) => {
  database.child(request.url.replace('home', 'home/_')).once('value', data => response.send(data.val()));
});