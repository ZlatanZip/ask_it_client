import React, {useState} from "react";
import "./style.css";
import {Container, Row, Col} from "react-bootstrap";

import CustomForm from "../CustomForm";
import WarningDropDownMessage from "../WarningDropDownMessage";
import AddQuestionInput from "../AddQuestionInput";
import {updateAnswer} from "../../lib/questions";

import generateAPIHit from "../../helpers/generateAPIHit";
import {updateAAnswer} from "../../store/actions/questions";

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

  const classiee = showForm
    ? {
        margin: "20px 0",
        height: "2.5rem",
        transition: "1s",
      }
    : {
        height: "0",
        transition: "1s",
      };

  const width = showForm
    ? {
        width: "70%",
        transition: "1s",
        textAlign: "center",
      }
    : {width: "0", textAlign: "center", border: "2px solid white"};

  return (
    <Container>
      <Row className='answer_wrapper' style={{margin: "0 auto"}}>
        <Col md={3} xs={12} className='qusetion_logo'>
          <img
            id='question_mark'
            alt='question_mark'
            src={require("../../assets/icons/answer_check.png")}
          />
        </Col>

        <Col md={6} xs={12}>
          <div className='question_link'>
            <span>answerd by {fullName}</span>
            <h5> {answer}</h5>

            <div style={classiee}>
              <CustomForm
                id={id}
                showForm={showForm}
                placeholder=' Type in updated answer!'
                onSubmit={answerAction}
                typeOfAction='update'
              />
              {/*  <input
                placeholder='  Update answer!'
                className='update_answer_input'
                onChange={setAnswerUpdate}
                value={updatedAnswer}
              />*/}
              {/*  {showWarning && (
                  <WarningDropDownMessage title='To  update a answer you need to type in some proper text :) !' />
                )} */}
            </div>

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
                  /*  onClick={() => answerAction(id, "deleteAnswer")}*/
                  onClick={() =>
                    answerAction(id, updatedAnswer, "updateAnswer")
                  }
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </Col>
        <Col md={3} xs={12} className='question_thumbs_wrapper'>
          <span>{12}</span>{" "}
          <img
            alt='thumbsUpLogo'
            className='question_thumbs'
            onClick={() => {}}
            src={require("../../assets/icons/thumb_up.png")}
            onClick={votePositive}
          />
          <img
            alt='thumbsDownLogo'
            className='question_thumbs'
            onClick={() => console.log("thumb down")}
            src={require("../../assets/icons/thumb_down.png")}
            onClick={voteNegative}
          />{" "}
          <span>{12}</span>
        </Col>
      </Row>
    </Container>
  );
};

export default AnswerItem;
