import React, {useState, useCallback, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Container, Button, Card, Accordion, CardDeck} from "react-bootstrap";
import {Link} from "react-router-dom";

import Cards from "../../components/UI/Card";
import Spinner from "../../components/Spinner";
import AnswerItem from "../../components/AnswerItem";

import "./style.css";

import {
  updateAQuestion,
  getSingleQuestionDetails,
  answerQuestion,
  deleteQuestion,
  voteQuestion,
  deleteAAnswer,
  invalidateAQuestion,
  updateAAnswer,
} from "../../store/actions/questions";
import CustomForm from "../../components/CustomForm";

const QuestionDetails = (props) => {
  const {userId, role} = props;
  const questionId = props.match.params.id;
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [answer, setAnswer] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const question = useSelector(
    (state) => state.questions.singleQuestionDetails
  );

  const [answerFields, setAnswerFileds] = useState({
    answer: "",
    updatedAnswer: "",
  });
  const dispatch = useDispatch();

  const fetchQuestion = useCallback(async () => {
    setIsLoading(true);
    try {
      await dispatch(getSingleQuestionDetails(questionId));
    } catch (err) {
      setError(err.message);
    }
    setError(null);
    setIsLoading(false);
  }, [dispatch, questionId]);

  useEffect(() => {
    setIsLoading(true);
    fetchQuestion().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, fetchQuestion]);

  const setNewAnswer = (e) => {
    const {value} = e.target;
    setAnswer(value);
    //setShowWarning(false);
  };

  /*   const setAnswer = (e) => {
    e.preventDefault();
    const name = e.target.name;
    setAnswerFileds({...answerFields, [name]: e.target.value});
    setShowWarning(false);
  };
 */
  const actionHandler = useCallback(
    async (id, value, typeOfAction) => {
      let action;
      switch (typeOfAction) {
        case "addAQuestion":
          action = answerQuestion(questionId, value);
          break;
        case "updateAQuestion":
          action = updateAQuestion(questionId, value);
          break;
        case "deleteAQuestion":
          action = deleteQuestion(questionId, value);
          break;
        case "voteAQuestion":
          action = voteQuestion(questionId, value);
          break;
        case "invalidateAQuestion":
          action = invalidateAQuestion(questionId);
          break;
        case "addAnswer":
          action = answerQuestion(questionId, value);
          break;
        case "updateAnswer":
          action = updateAAnswer(questionId, id, value);
          break;
        case "deleteAnswer":
          console.log("heloo deleted answer");
          action = deleteAAnswer(questionId, value);
          break;
        case "voteAAnswer":
          action = answerQuestion(questionId, value);
          break;
        default:
          return;
      }
      setError(null);
      setIsLoading(true);

      try {
        await dispatch(action);
      } catch (err) {
        console.log(err.message);
      }
      window.location.reload(false);
      setIsLoading(false);
    },
    [dispatch, questionId, setError]
  );

  /*     if (role === "Member" && answer !== "") {
      dispatch(answerQuestion(questionId, answer));
      // window.location.reload(false);
      //history.push({pathname: "/my_questions"});
    } else {
      if (role === "Member") {
        setShowWarning(true);
      } else {
        setModalShow((prevstate) => !prevstate);
      }
    }
  }; */

  if (error) {
    return (
      <div className='centered'>
        <h3> The server may temporarily be unavailable!</h3>
        <button
          className='navbar_buttons sign_up_button_color'
          onClick={fetchQuestion}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='centered'>
        <Spinner />
      </div>
    );
  }

  if (!isLoading && question === null) {
    return (
      <div className='centered'>
        <h3> No Questions found.Try adding some!</h3>
      </div>
    );
  }
  /*   const test = (e, a, b) => {
    console.log(e.target.id + a + b);
  }; */

  return (
    <Cards
      title={`question by ${question && question.authorName}`}
      biggerTitle={question && question.description}
      style={{marginBottom: "5px"}}
    >
      <div>
        <div className='button_wrapper'>
          <button
            className={`navbar_buttons  ${
              userId === question.postedBy
                ? "sign_up_button_color"
                : "login_button_color"
            }`}
            onClick={() => setShowForm((prevState) => !prevState)}
          >
            {userId === question.postedBy ? "Update question" : "Add Answer"}
          </button>
        </div>

        <CustomForm
          showForm={showForm}
          placeholder='  Type in your answer!'
          onSubmit={actionHandler}
          typeOfAction={
            userId === question.postedBy ? "updateAQuestion" : "addAnswer"
          }
        />

        {/*  {showWarning && (
                  <WarningDropDownMessage title='To  update a answer you need to type in some proper text :) !' />
                )} */}
        {question &&
          question.answers.reverse().map((answer) => {
            return (
              <AnswerItem
                key={answer.id}
                signedInUserId={userId}
                answerData={answer}
                answerAction={actionHandler}
              />
            );
          })}
      </div>
    </Cards>
  );
};

export default QuestionDetails;
