import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import {
  Col,
  Card,
  CardHeader,
  CardText,
  CardBody,
  ListGroup,
  ListGroupItem,
  Container
} from "reactstrap";
import axios from "axios";

export function withRouter(Children) {
  return (props) => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />;
  };
}
class TrackInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lyrics: "",
      track: []
    };
  }
  componentDidMount() {
    axios
      .get(
        `https://fast-dawn-89938.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=c8be8f29717915ece068827d543d302f`
      )
      .then((resp) => {
        this.setState({
          lyrics: resp.data.message.body.lyrics.lyrics_body
        });
      });
    axios
      .get(
        `https://fast-dawn-89938.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=c8be8f29717915ece068827d543d302f`
      )
      .then((resp) => {
        this.setState({
          track: resp.data.message.body.track
        });
      });
  }
  render() {
    const { lyrics, track } = this.state;
    if (lyrics.length === 0 && track.length === 0) {
      return null;
    } else {
      return (
        <Container>
          <Link className="link2" to="/">
            Go Back
          </Link>
          <Col className="col" sm="12">
            <Card>
              <CardHeader>
                <strong>{track.track_name} by</strong>{" "}
                <span>{track.artist_name}</span>
              </CardHeader>
              <CardBody>
                <CardText>{lyrics}</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col className="col" sm="12">
            <Card>
              <CardBody>
                <ListGroup flush>
                  <ListGroupItem>
                    <strong>Album ID:</strong> <span>{track.album_id}</span>
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Song genre:</strong>{" "}
                    <span>
                      {
                        track.primary_genres?.music_genre_list[0].music_genre
                          .music_genre_name
                      }
                    </span>
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Explicit Words:</strong>{" "}
                    <span>{track.explicit}</span>
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Release Date:</strong>{" "}
                    <Moment format="MM/DD/YYYY">{track.updated_time}</Moment>
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
        </Container>
      );
    }
  }
}

export default withRouter(TrackInfo);
