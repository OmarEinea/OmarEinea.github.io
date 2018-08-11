import { Component } from 'react';
import { Grid, Typography, Paper } from 'material-ui';
import { get } from 'db';
import Circle from './widgets/Circle';
import Line from './widgets/Line';
import './Skills.css';

export default class Skills extends Component {
  state = {circles: [], lines: []};

  processData({ order, ...skills }, top) {
    const orderedSkills = [];
    for(const key in skills) {
      const category = skills[key];
      for(const skill in category)
        if(category[skill] === -1)
          category[skill] = top[skill];
      skills[key] = Object.entries(category).sort((a, b) => b[1] - a[1]);
    }
    skills = Object.entries(skills);
    order.split(',').map(index => orderedSkills.push(skills[index - 1]));
    return orderedSkills;
  }

  componentWillMount() {
    get('skills').then(({ top, circles, lines }) => this.setState({
      circles: this.processData(circles, top.circles),
      lines: this.processData(lines, top.lines)
    }));
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
