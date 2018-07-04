import { Component } from 'react';
import { Grid, Typography, Paper } from 'material-ui';
import { get } from '../db';
import Circle from './widgets/Circle';
import Line from './widgets/Line';
import './Skills.css';

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
    get('skills/circles').then(skills => {
      this.processData('circles')(skills);
      get('skills/lines').then(this.processData('lines'));
    });
  }

  render() {
    const { circles, lines } = this.state;
    return (
      <Grid container class="container" style={{marginBottom: 24}}>
        {circles.map(([category, skills]) =>
          <Grid container justify="center">
            <Typography variant="display1" class="category">{category}</Typography>
            {skills.map(skill =>
              <Paper style={{margin: 8}}><Circle skill={skill}/></Paper>
            )}
          </Grid>
        )}
        <div style={{width: '100%'}}>
          {lines.map(([category, skills]) =>
            <div id="lines-list">
              <Typography variant="display1" class="category">{category}</Typography>
              <Paper style={{margin: 8, padding: '12px 8px 16px'}}>
                {skills.map(skill => <Line skill={skill}/>)}
              </Paper>
            </div>
          )}
        </div>
      </Grid>
    );
  }
}
