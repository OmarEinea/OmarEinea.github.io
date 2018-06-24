import { Component } from 'react';
import { get } from '../db';

export default class Skills extends Component {
  state = {circles: [], lines: []};

  processData(type) {
    return skills => {
      const order = skills.order.split(','), orderedSkills = [];
      delete skills.order;
      for(let category in skills)
        skills[category] = Object.entries(skills[category]).sort((a, b) => b[1] - a[1]);
      skills = Object.entries(skills);
      order.map(index => orderedSkills.push(skills[index - 1]));
      this.setState({[type]: orderedSkills});
    };
  }

  componentWillMount() {
    get('skills/circles').then(data => data.json()).then(skills => {
      this.processData('circles')(skills);
      get('skills/lines').then(data => data.json()).then(this.processData('lines'));
    });
  }

  render() {
    const { circles, lines } = this.state;
    return (
      <Grid container class="container">
      </Grid>
    );
  }
}
