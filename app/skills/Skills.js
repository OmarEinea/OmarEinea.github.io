import { Component } from 'react';
import { Grid, Typography, Paper, Grow, Fade } from 'material-ui';
import { get } from 'db';
import Loading from '~/utils/Loading';
import Circle from './widgets/Circle';
import Line from './widgets/Line';
import './Skills.css';

export default class Skills extends Component {
  processData({ order, ...skills }) {
    for (const key in skills) {
      skills[key] = Object.entries(skills[key]).sort((a, b) => b[1] - a[1]);
    }
    const orderedSkills = [];
    skills = Object.entries(skills);
    order.split(',').map(index => orderedSkills.push(skills[index - 1]));
    return orderedSkills;
  }

  componentWillMount() {
    get('skills').then(({ circles, lines }) => this.setState({
      circles: this.processData(circles),
      lines: this.processData(lines)
    }));
  }

  render() {
    const { state } = this;
    return state ? (
      <Grid container class="container" style={{ marginBottom: 24 }}>
        {state.circles.map(([category, skills]) =>
          <Grid container justify="center">
            <Fade in>
              <Typography variant="h4" class="category">{category}</Typography>
            </Fade>
            {skills.map((skill, index) =>
              <Grow in timeout={(index + 1) * 200}>
                <Paper style={{ margin: 8 }} elevation={1}>
                  <Circle skill={skill} />
                </Paper>
              </Grow>
            )}
          </Grid>
        )}
        <div style={{ width: '100%' }}>
          {state.lines.map(([category, skills]) =>
            <div class="lines-list">
              <Typography variant="h4" class="category">{category}</Typography>
              <Paper style={{ margin: 8, padding: '12px 8px 16px' }} elevation={1}>
                {skills.map(skill => <Line skill={skill} />)}
              </Paper>
            </div>
          )}
        </div>
      </Grid>
    ) : <Loading />;
  }
}
