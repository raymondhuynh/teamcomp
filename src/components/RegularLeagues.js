import React, { Component } from 'react';
import { getLeagues } from '../actions/Leagues';
import Box from 'grommet/components/Box';
import Card from 'grommet/components/Card';
import Heading from 'grommet/components/Heading';
import Headline from 'grommet/components/Headline';
import Tile from 'grommet/components/Tile';
import Tiles from 'grommet/components/Tiles';
import LinkNextIcon from 'grommet/components/icons/base/LinkNext';
import NavAnchor from './NavAnchor';

export default class RegularLeagues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leagues: [],
      isViewReady: false
    };
  }

  componentWillMount() {
    getLeagues('regular', (leagues) => {
      this.setState({
        leagues: leagues,
        isViewReady: true
      });
    });
  }

  render() {
    const { isViewReady, leagues } = this.state;
    const listLeagues = leagues.map((league) =>
      <Tile key={league.leagueKey} >
        <Card thumbnail='https://firebasestorage.googleapis.com/v0/b/teamcomp-fecc4.appspot.com/o/lcs.jpg?alt=media'
          contentPad={{'vertical': 'medium'}}
          margin='medium'
          direction="column"
          label={ "Type: " + league.gameType }
          link={
            <NavAnchor path={"/league/" + league.leagueKey } label="Enter"
              icon={<LinkNextIcon />} />
          }>
          <Heading tag="h2">
            { league.title }
          </Heading>
        </Card>
      </Tile>
    );

    if (isViewReady) {
      return (
        <Box>
          <Tiles selectable={false}
            fill={true}
            flush={false} >
            { listLeagues }
          </Tiles>
        </Box>
      );
    } else {
      return (
        <Box align="center">
          <Headline strong={false}
            size='small'>
            Loading...
          </Headline>
        </Box>
      );
    }
  }
};
