import React from "react";
import { Container, Grid, Image, Loader } from "semantic-ui-react";
import Actions from './actions/Actions';
import axios from "axios";
import Moment from "react-moment";
import "./Game.css";
import ContentLoader from "react-content-loader"

const TitleLoader = () => (
  <ContentLoader
    height={25}
    width={400}
    speed={1}
    primaryColor="#9ab"
    secondaryColor="#7a8895"
    gradientRatio={1}

  >
    <rect x="0" y="0" rx="7" ry="7" width="370" height="13" />
  </ContentLoader>
)

const ImageLoader = () => (
  <ContentLoader
    height={160}
    width={200}
    speed={1}
    primaryColor="#9ab"
    secondaryColor="#7a8895"
  >
    <rect x="0" y="0" rx="6" ry="6" width="180" height="160" />
  </ContentLoader>
)

const ListLoader = () => (
  <ContentLoader
    height={110}
    width={400}
    speed={1}
    primaryColor="#9ab"
    secondaryColor="#7a8895"
    gradientRatio={1}
  >
    <rect x="0" y="0" rx="5" ry="5" width="300" height="10" />
    <rect x="20" y="20" rx="5" ry="5" width="270" height="10" />
    <rect x="20" y="40" rx="5" ry="5" width="220" height="10" />
    <rect x="0" y="60" rx="5" ry="5" width="300" height="10" />
    <rect x="20" y="80" rx="5" ry="5" width="250" height="10" />
    <rect x="20" y="100" rx="5" ry="5" width="130" height="10" />
  </ContentLoader>
)

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: "",
      game: {},
      isLoading: true,
      isCoverLoading: true,
      cover: {},
    };
  }

  // componentWillReceiveProps(props) {
  //   if (props.location.state !== this.state.gameId) {
  //     const gameId = props.location.state;
  //     this.resetState(gameId);
  //     this.loadGame(gameId);
  //   }
  // }

  // componentWillMount() {
  //   const gameId = this.props.location.state;
  //   this.resetState(gameId);

  //   this.loadGame(gameId);
  // }

  resetState = gameId => {
    this.setState({
      gameId: gameId,
      game: {},
      isLoading: true,
      isCoverLoading: true,
      cover: {},
    });
  };

  loadGame = gameId => {
    axios.get(`/api/games/${gameId}`).then(response => {
      const game = response.data[0];
      this.setState({ isLoading: false, game: game });
      this.getGameData(game);
    });
  };

  getGameData = game => {
    axios.all([this.getCover(game.cover)]).then(
      axios.spread((cover) => {
        this.setState({
          isCoverLoading: false,
          cover: {
            cover: cover.data[0].image_id,
            width: cover.data[0].width,
            height: cover.data[0].height
          },
        });
      })
    );
  };

  getCover = id => {
    return axios.get(`/api/covers/${id}`);
  };

  render() {
    const {
      game,
      isLoading,
      isCoverLoading,
      cover,
    } = this.state;

    return (
      <Container>
        <Grid
          className="game"
          centered
        >
          <Grid.Row>
            <Grid.Column width={4}>
              {!isCoverLoading ? (
                <Image
                  rounded
                  className="cover frame"
                  src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${
                    cover.cover
                    }.jpg`}
                />
              ) : (
                  <ImageLoader />
                  // <Loader active inline="centered" size="medium" />
                )}
            </Grid.Column>
            <Grid.Column width={8}>
              <section className="game-header margin-bottom-sm">
                {!isLoading ?
                  <React.Fragment>
                    <h1>{game.name}</h1>
                    <small className="release-date">
                      <a href="#">
                        <Moment unix format="YYYY">
                          {game.first_release_date}
                        </Moment>
                      </a>
                    </small>
                  </React.Fragment>
                  : <TitleLoader />
                }
              </section>
              <section className="game-info margin-bottom-sm">
                {!isLoading ?
                  <small className="company">
                    A game by <a href="#">{game.developer.name}</a>
                  </small>
                  :
                  <ListLoader />
                }
              </section>
              <section>
                <p style={{ textAlign: 'justify' }}>
                  {game.summary}
                </p>
              </section>
            </Grid.Column>
            <Grid.Column width={4}>
              <Actions />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Game;
