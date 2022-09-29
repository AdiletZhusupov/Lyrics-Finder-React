import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";
import Search from "./Search";
import MyCard from "./MyCard";
import { Container, Row } from "reactstrap";
import axios from "axios";

class Tracks extends Component {
  constructor() {
    super();
    this.state = {
      tracks: [],
      searchText: ""
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://fast-dawn-89938.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1&apikey=c8be8f29717915ece068827d543d302f`
      )
      .then((resp) => {
        this.setState({
          tracks: resp.data.message.body.track_list
        });
      })
      .catch((err) => {
        console.error("Something went wrong", err.message);
      });
  }
  handleChange = (e) => {
    const inputValue = e.target.value;
    this.setState({ searchText: inputValue });
  };
  handleClick = () => {
    const { searchText } = this.state;
    if (searchText) {
      axios
        .get(
          `https://fast-dawn-89938.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${searchText}&page_size=10&page=1&s_track_rating=desc&apikey=c8be8f29717915ece068827d543d302f`
        )
        .then((resp) => {
          const newTracks = resp.data.message.body.track_list;
          this.setState({
            tracks: newTracks
          });
        })
        .catch((err) => {
          console.error("Something went wrong", err);
        });
    }
  };
  handlePress = (e) => {
    const { searchText } = this.state;
    if (e.key === "Enter") {
      if (searchText) {
        axios
          .get(
            `https://fast-dawn-89938.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${searchText}&page_size=10&page=1&s_track_rating=desc&apikey=c8be8f29717915ece068827d543d302f`
          )
          .then((resp) => {
            const newTracks = resp.data.message.body.track_list;
            this.setState({
              tracks: newTracks
            });
          })
          .catch((err) => {
            console.error("Something went wrong", err);
          });
      }
    }
  };
  render() {
    const { tracks, searchText } = this.state;
    return (
      <div>
        <Search
          searchText={searchText}
          handlePress={this.handlePress}
          handleChange={this.handleChange}
          handleClick={this.handleClick}
          text1="Search For A Song"
          text2="Get the lyrics for any song"
          text3="Click Me"
          placeholder="Song title..."
        />
        <h4>Search Results</h4>
        <Container className="my-3">
          <Row>
            {tracks.map((item, index) => {
              return (
                <MyCard
                  key={index}
                  trackID={item.track.track_id}
                  artistName={item.track.artist_name}
                  trackName={item.track.track_name}
                  albumName={item.track.album_name}
                  linkText="View Lyrics"
                />
              );
            })}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Tracks;
