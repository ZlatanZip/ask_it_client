import React, {useState, useCallback, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Container, Button, Card, Accordion, CardDeck} from "react-bootstrap";
import {Link} from "react-router-dom";

import Cards from "../../components/UI/Card";
import Spinner from "../../components/Spinner";
import AnswerItem from "../../components/AnswerItem";

import {
  getSingleQuestionDetails,
  answerQuestion,
} from "../../store/actions/questions";

const QuestionDetails = (props) => {
  const {userId, role} = props;
  const questionId = props.match.params.id;
  const [error, setError] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [answerFields, setAnswerFileds] = useState({
    answer: "",
    updatedAnswer: "",
  });
  const dispatch = useDispatch();
  console.log(answerFields.answer);

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

  const setAnswer = (e) => {
    e.preventDefault();
    const name = e.target.name;
    setAnswerFileds({...answerFields, [name]: e.target.value});
    setShowWarning(false);
  };

  const answerHandler = useCallback(
    async (value, typeOfAction) => {
      let action;
      switch (typeOfAction) {
        case "answer":
          action = answerQuestion(questionId, value);
          break;
        case "update":
          action = answerQuestion(questionId, value);
          break;
        case "delete":
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

  const question = useSelector(
    (state) => state.questions.singleQuestionDetails
  );

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

  return (
    <Cards
      header={
        <button
          className='navbar_buttons sign_up_button_color'
          onClick={() => {}}
        >
          Answer the question
        </button>
      }
      title={`question by ${question && question.authorName}`}
      biggerTitle={question && question.description}
      style={{marginBottom: "5px"}}
    >
      {question &&
        question.answers.map((answer) => {
          return (
            <AnswerItem
              key={answer.id}
              signedInUserId={userId}
              answerData={answer}
              answerAction={answerHandler}
            />
          );
        })}
    </Cards>
  );
};

export default QuestionDetails;
