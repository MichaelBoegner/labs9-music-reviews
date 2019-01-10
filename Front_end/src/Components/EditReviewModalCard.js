import React from "react";
import styled from "styled-components";
import Stars from "./Stars";
import {
  Button,
  Modal,
  NavItem,
  Dropdown,
  Col,
  Card,
} from "react-materialize";

const EditReviewModalCard = props => {
  return (
    <div>
      <Col>
        {/* Create new review modal */}
        <Modal
          header="Year Make Model Trim"
          fixedFooter
          style={{ width: "35%" }}
          trigger={
            <Card title="Year Make Model Trim">
              <img
                src="https://mygoto.io/assets/web/images/placeholder-img.jpg"
                height="50%"
                width="50%"
                align="center"
              />
              Updated Time
            </Card>
          }
          actions={
            <div>
              <Button modal="close" waves="light" className="red darken-2">
                Close
              </Button>
              <Button>Delete</Button>
              <Button>Submit</Button>
            </div>
          }
        >
          <p>Review by: @name</p>
          <img
            src="https://mygoto.io/assets/web/images/placeholder-img.jpg"
            height="50%"
            width="50%"
          />
          <div>
            <Stars />
            <Dropdown trigger={<Button>Select One</Button>}>
              <NavItem>Owned</NavItem>
              <NavItem>Rented</NavItem>
              <NavItem>Driven</NavItem>
            </Dropdown>
          </div>
          <textarea
            type="textarea"
            placeholder="Type Review"
            //   onChange={props.handleReviewChange}
            //   value={props.reviews.review}
            name="review"
            style={{ height: "150px"}}
          />
        </Modal>
      </Col>
    </div>
  );
};

export default EditReviewModalCard;
