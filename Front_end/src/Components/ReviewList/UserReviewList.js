import React, { Component, Fragment } from "react";
import styled from "styled-components";
import axios from "axios";
import { Row, Col, Container, CardImg } from "reactstrap";
import AlbumProfileReviewCard from "./AlbumProfileReviewCard";
import TrackProfileReviewCard from "./TrackProfileReviewCard";

const Sidebar = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
  height: 100%;
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class UserReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albumReviews: [],
      trackReviews: [],
      input: "",
      loggedIn: false,
      userID: 0,
      username: ""
    };
  }

  componentDidMount() {
    this.setState({
      userID: this.props.userID,
      loggedIn: this.props.loggedIn
    });
    this.getAlbumReviews();
    this.getTrackReviews();
    this.getNickname(this.state.userID)
  }

  getAlbumReviews() {
    axios
      .get("https://labs9-car-reviews.herokuapp.com/albumReviews")
      .then(response => {
        const userAlbumReviews = response.data;
        const newState = Object.assign({}, this.state, {
          albumReviews: userAlbumReviews
        });
        this.setState(newState);
      })
      .catch(err => console.log(err));
  }

  getTrackReviews() {
    axios
      .get("https://labs9-car-reviews.herokuapp.com/trackReviews")
      .then(response => {
        const userTrackReviews = response.data;
        const newState = Object.assign({}, this.state, {
          trackReviews: userTrackReviews
        });
        this.setState(newState);
      })
      .catch(err => console.log(err));
  }

  getNickname(userID) {
    axios
      .get(`https://labs9-car-reviews.herokuapp.com/user/${userID}/nickname`)
      .then(response => {
        const userNickname = response.data;
        const newState = Object.assign({}, this.state, {
          nickname: userNickname
        });
        this.setState(newState);
      })
      .catch(err => console.log(err));
  }

  handleReviewChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const userAlbumReviews = this.state.albumReviews.filter(review => {
      return review.userID === parseInt(this.props.match.params.id);
    });
    const userTrackReviews = this.state.trackReviews.filter(review => {
      return review.userID === parseInt(this.props.match.params.id);
    });
    console.log(this.props.nickname)
    return (
      <Fragment>
        <Container
          fluid={true}
          style={{
            display: "flex",
            justifyItems: "space-around",
            margin: "0 auto",
            maxWidth: "1600px",
            paddingTop: "10rem",
          }}
        >
          <Col xs="12" md="4">
            <Sidebar>
              <Row>
                <CardImg
                  src={require("../../Images/RecordThumb.png")}
                  alt="Default profile image"
                  style={{ maxWidth: "250px", maxHeight: "250px", padding: "2rem", margin: "0 auto" }}
                />
              </Row>
  
              <div style={{ alignSelf: "center" }}>
                <h3><strong>Nickname:</strong> {this.state.nickname}</h3>
              </div>
              <div style={{ alignSelf: "center" }}>
                <h5>Status</h5>
              </div>
              <div style={{ alignSelf: "center" }}>
                <h5>
                  Reviews:{" "}
                  {userAlbumReviews.length + userTrackReviews.length}
                </h5>
              </div>
            </Sidebar>
          </Col>
        </Container>
        <Container fluid={true} style={{ maxWidth: "1150px" }}>
          <Col md="8" sm="12">
            {userAlbumReviews.map(review => (
              <AlbumProfileReviewCard
                review={review}
                loggedIn={this.props.loggedIn}
                userID={this.props.userID}
                key={review.id}
                nickname={this.props.nickname}
              />
            ))}
            {userTrackReviews.map(review => (
              <TrackProfileReviewCard
                review={review}
                loggedIn={this.props.loggedIn}
                userID={this.props.userID}
                key={review.id}
                nickname={this.props.nickname}
              />
            ))}  
          </Col>
        </Container>
      </Fragment>
    );
  }
}

export default UserReviewList;
