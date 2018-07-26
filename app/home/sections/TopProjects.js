import { Component } from 'react';
import { Grid } from 'material-ui';
import { get } from 'db';
import ProjectCard from '~/projects/card/ProjectCard';

export default class Certificates extends Component {
  state = {projects: []};

  componentWillMount() {
    get('projects/top').then(projects => this.setState({projects: Object.entries(projects)}));
  }

  render() {
    return (
      <Grid container>
        {this.state.projects.map((project) =>
          <Grid item md={4} sm={6} xs={12}>
            <ProjectCard project={project}/>
          </Grid>
        )}
      </Grid>
    );
  }
}
