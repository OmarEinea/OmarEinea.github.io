import { Component } from 'react';
import { Grid, Typography } from 'material-ui';
import { get } from 'db';
import ProjectCard from './card/ProjectCard';

export default class Projects extends Component {
  state = {projects: []};

  componentWillMount() {
    get('projects').then(projects => {
      const { top } = projects;
      delete projects.top;
      for(let key in projects) {
        let category = projects[key];
        for(let project in category)
          if(category[project] === -1)
            category[project] = top[project];
        projects[key] = Object.entries(category);
      }
      this.setState({projects: Object.entries(projects)});
    });
  }

  render() {
    return (
      <Grid container class="container" style={{marginBottom: 24}}>
        {this.state.projects.map(([category, projects]) =>
          <Grid container justify="center">
            <Typography variant="display1" class="category">{category}</Typography>
            {projects.map(project =>
              <Grid item md={4} sm={6} xs={12}>
                <ProjectCard project={project}/>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    );
  }
}
