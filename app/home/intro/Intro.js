import { Component } from 'react';
import { Grid, Typography, Avatar, Paper, Button, Grow } from 'material-ui';
import { Table, TableBody, TableRow, TableCell } from 'material-ui';
import { url, colors } from 'db';
import './Intro.css';

const third = 33.333;

export default class Intro extends Component {
  state = { content: {}, expand: null };
  papers = Object.entries({
    Occupation: { icon: 'address-card' },
    Origin: { style: { top: `${third}%` }, icon: 'globe-africa' },
    Discipline: { style: { top: `${2 * third}%` }, icon: 'pencil-ruler' },
    Goals: { style: { left: `${third}%`, top: `${2 * third}%` }, icon: 'check-double' },
    Education: { style: { left: `${third}%` }, icon: 'user-graduate' },
    Experience: { style: { left: `${2 * third}%` }, icon: 'briefcase' },
    Publications: { style: { left: `${2 * third}%`, top: `${third}%` }, icon: 'clipboard' }
  });
  process = data => {
    const content = {}, { resume, ...papers } = data;
    this.resume = resume;
    this.papers.map(([title, _], index) => {
      if (index <= 3)
        content[title] = papers[title].slice(1).map(line => {
          const [text, icon] = line.split(';').reverse();
          const [body, head] = text.split(':').reverse();
          return <Typography class="line" variant="subtitle1">
            {icon && <i class={'fas fa-fw fa-' + icon} style={{ marginRight: 8 }} />}
            {head && <b>{head}:</b>}{body}
          </Typography>;
        });
      else
        content[title] = <Table style={{ marginTop: 8 }}>
          <TableBody>{papers[title].map(row =>
            <TableRow>{row.split(',').map(cell =>
              <TableCell dangerouslySetInnerHTML={{ __html: cell }}
                style={{ padding: '16px 12px', fontSize: '0.82rem' }} />
            )}</TableRow>
          )}</TableBody>
        </Table>;
    });
    return content;
  };

  constructor(props) {
    super(props);
    if (props.data) this.state.content = this.process(props.data);
  }

  componentWillReceiveProps(props) {
    if (props.data) this.setState({ content: this.process(props.data) });
  }

  openResume(event) {
    event.preventDefault();
    window.open(url('my/' + this.resume), '_self');
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.expand !== nextState.expand;
  }

  render() {
    const { content, expand } = this.state;
    return (
      <Grow in>
        <Grid container class="container" style={{ paddingBottom: 80 }}>
          <Grid item md={4} xs={12} align="center" id="intro">
            <div style={{ position: 'relative', width: 324, height: 324 }}>
              <Avatar class={'avatar' + (expand !== 'logo' ? ' expand' : '')} style={{ left: 0 }}
                src={url('my/photo')} onClick={() => this.setState({ expand: null })} />
              <Avatar class={'avatar' + (expand === 'logo' ? ' expand' : '')} style={{ right: 0 }}
                src={url('my/logo')} onClick={() => this.setState({ expand: 'logo' })} />
            </div>
            <Typography variant="h4" style={{ color: '#4F4D4E', margin: '12px 0' }}>
              Omar Einea
            </Typography>
            <Typography style={{ fontSize: 18, color: '#616161', whiteSpace: 'nowrap' }}>
              App Developer. Web, Mobile & PC.
            </Typography>
            <Button variant="contained" href="my/resume" onClick={this.openResume.bind(this)}>
              <i class="fas fa-file-download" style={{ marginRight: 8, fontSize: 16 }} />
              Resume
            </Button>
            <Button variant="contained" target="_self" href="mailto:hello@omareinea.com">
              <i class="fas fa-lg fa-envelope" />
            </Button>
            <Button variant="contained" target="_blank" href="my/linkedin">
              <i class="fab fa-lg fa-linkedin" />
            </Button>
            <Button variant="contained" target="_blank" href="my/github">
              <i class="fab fa-lg fa-github" />
            </Button>
          </Grid>
          <Grid item md={8} xs={12} id="bio">
            <Grid container>
              {this.papers.map(([title, paper], index) =>
                <Paper style={paper.style} elevation={expand === title ? 3 : 1}
                  class={'paper' + (expand === title ? ' expand' : '')}
                  onMouseEnter={() => this.setState({ expand: title })}
                  onMouseLeave={() => this.setState({ expand: null })}>
                  <div style={{ borderTopColor: colors[index] }} class="content">{content[title]}</div>
                  <Grid container class="title" layout="column" justify="center">
                    <i class={'fas fa-fw fa-' + paper.icon} />
                    <Typography><span>{title}</span></Typography>
                  </Grid>
                </Paper>
              )}
              <div class="paper" style={{ left: `${2 * third}%`, top: `${2 * third}%` }}>
                <Grid container class="title" layout="column" justify="center" onClick={() => window.scrollBy(
                  0, document.getElementById('bio').getBoundingClientRect().bottom + 100)
                }>
                  <i class="fas fa-fw fa-arrow-down clickable" />
                  <Typography class="clickable">More&nbsp;Below</Typography>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grow>
    );
  }
}
