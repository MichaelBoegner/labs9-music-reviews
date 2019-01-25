import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Container, Row, Col, Jumbotron, CardImg, Button } from "reactstrap";
import axios from 'axios';
import ViewStars from "../StarsRating/ViewStars";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

class AlbumReviewCard extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      nickname: ""
    };
  }

  getUser() {
    axios
      .get("https://labs9-car-reviews.herokuapp.com/users")
      .then(response => {
        const users = response.data;
        const newState = Object.assign({}, this.state, {
          users: users
        });
        this.setState(newState, () => {this.findNickname()});
      })
      .catch(err => console.log(err));
  }
  
  findNickname() {
    const currentUser = this.state.users.filter(user => {
      return user.userID === this.props.review.userID
    });
    this.setState({ nickname: currentUser.nickname})
  }

  componentDidMount() {
    this.getUser();
  }

  render() {
    return (
      <Fragment>
        <Container>
          <Jumbotron fluid style={{ display: "flex", padding: "1rem" }}>
            {/* User info */}
            <Row>
              <Col
                md="4"
                style={{
                  textAlign: "center",
                  margin: "auto",
                  padding: "1rem"
                }}
              >
                <div>
                  <img
                    src={require("../../Images/RecordThumb.png")}
                    alt="Default profile image"
                    style={{ maxWidth: '150px'}}
                  />
                </div>
                <div><strong>Nickname: </strong>{this.state.nickname}</div>
                <div>Member status</div>
                <div><strong>Reviews: </strong></div>
              </Col>
              <Col md="8" style={{ padding: "1rem 5rem" }}>
                <Row style={{ display: "flex" }}>
                <ViewStars rating={this.props.review.rating} />
                  <p style={{ margin: "auto" }}>Date Written: (DATE)</p>
                </Row>
                <Row>
                  <div align="left">
                    <p>{this.props.review.review}</p>
                  </div>
                </Row>
              </Col>
            </Row>
          </Jumbotron>
        </Container>
      </Fragment>
    );
  }
}

export default withCookies(AlbumReviewCard);
