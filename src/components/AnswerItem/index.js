import React, {useState} from "react";
import "./style.css";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {Container, Row, Col} from "react-bootstrap";

import WarningDropDownMessage from "../WarningDropDownMessage";
import AddQuestionInput from "../AddQuestionInput";
import {updateAnswer} from "../../lib/questions";

const AnswerItem = (props) => {
  const {signedInUserId, answerData, answerAction} = props;

  const {id, answer, userId, fullName, createdOn} = answerData;

  const [showForm, setShowForm] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [updatedAnswer, setUpdatedAnswer] = useState("");
  const responsiveButtonsClass =
    window.innerWidth > 450 ? "navbar_buttons" : "small_screen_buttons";

  /*   const setAnswerUpdate = (e) => {
    e.preventDefault();
    const name = e.target.name;
    setAnswerFileds({ [name]: e.target.value});
    setShowWarning(false);
  };
 */
  const setAnswerUpdate = (e) => {
    const {value} = e.target;
    setUpdatedAnswer(value);
    setShowWarning(false);
  };

  const votePositive = (role, id) => {
    if (role === "Member") {
      console.log("You voted negative");
    } else {
      console.log("Only Members can vote for a question");
    }
  };

  const voteNegative = (role, id) => {
    if (role === "Member") {
      console.log("You voted positive");
    } else {
      console.log("Only Members can vote for a question");
    }
  };

  return (
    <Container>
      <Row className='answer_wrapper' style={{margin: "0 auto"}}>
        <Col className='qusetion_logo'>
          <img
            id='question_mark'
            alt='question_mark'
            src={require("../../assets/icons/answer_check.png")}
          />
        </Col>
        <Col sm={8} xs={8}>
          <div className='question_link'>
            <span>answerd by {fullName}</span>
            <h5> {answer}</h5>
            {showForm && (
              <div>
                <input
                  placeholder='  Update answer!'
                  className='update_answer_input'
                  onChange={setAnswerUpdate}
                  value={updatedAnswer}
                />
                {showWarning && (
                  <WarningDropDownMessage title='To  update a answer you need to type in some proper text :) !' />
                )}
              </div>
            )}

            {userId === signedInUserId && (
              <div className='answer_button_wrapper'>
                <button
                  className={responsiveButtonsClass}
                  onClick={() => setShowForm((prevState) => !prevState)}
                >
                  {!showForm ? "Edit" : "Close"}
                </button>
                <button
                  className={responsiveButtonsClass}
                  onClick={() => answerAction(updatedAnswer, "update")}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </Col>
        <Col sm={2} xs={2} className='question_thumbs_wrapper'>
          <img
            alt='thumbsUpLogo'
            className='question_thumbs'
            onClick={() => console.log("thumb up")}
            src={require("../../assets/icons/thumb_up.png")}
            onClick={votePositive}
          />
          <span>{12}</span>
          <img
            alt='thumbsDownLogo'
            className='question_thumbs'
            onClick={() => console.log("thumb down")}
            src={require("../../assets/icons/thumb_down.png")}
            onClick={voteNegative}
          />
          <span>{12}</span>
        </Col>
      </Row>
    </Container>
  );
};

export default AnswerItem;
