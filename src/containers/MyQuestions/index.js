import React, {useEffect, useState, useCallback} from "react";
import {useSelector, useDispatch} from "react-redux";

import {getUsersQuestions, deleteQuestion} from "../../store/actions/questions";

import "./style.css";
import Spinner from "../../components/Spinner";
import Card from "../../components/UI/Card";
import QuestionItem from "../../components/QuestionItem";
import SideBar from "../../components/Sidebar";

const MyQuestions = (props) => {
  console.log(props);
  const {userId} = props;
  const {pathname} = props.location;
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const userQuestions = useSelector((state) => state.questions.userQuestions);

  const fetchQuestions = useCallback(async () => {
    setIsLoading(true);
    try {
      await dispatch(getUsersQuestions());
    } catch (err) {
      console.log(err.message);
    }
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    fetchQuestions().then(() => {
      setIsLoading(false);
    });
  }, [fetchQuestions]);

  const questionHandler = useCallback(
    async (questionId, value, typeOfAction) => {
      let action;
      switch (typeOfAction) {
        case "addAQuestion":
          action = deleteQuestion(questionId, value);
          break;
        case "updateAQuestion":
          action = deleteQuestion(questionId, value);
          break;
        case "deleteAQuestion":
          action = deleteQuestion(questionId, value);
          break;
        case "voteAQuestion":
          action = deleteQuestion(questionId, value);
          break;
        case "addAnswer":
          action = deleteQuestion(questionId, value);
          break;
        case "updateAnswer":
          action = deleteQuestion(questionId, value);
          break;
        case "deleteAnswer":
          action = deleteQuestion(questionId, value);
          break;
        case "voteAAnswer":
          action = deleteQuestion(questionId, value);
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
    [dispatch, setError]
  );

  if (error) {
    return (
      <div className='centered'>
        <h3> The server may temporarily be unavailable!</h3>
        <button
          className='navbar_buttons sign_up_button_color'
          onClick={fetchQuestions}
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

  if (!isLoading && userQuestions.length === 0) {
    return (
      <div className='centered'>
        <h3> No Questions found.Try adding some!</h3>
      </div>
    );
  }

  return (
    <Card
      biggerTitle='My Questions'
      title='Curiosity killed the cat'
      footer={
        <button
          onClick={fetchQuestions}
          className='navbar_buttons login_button_color'
        >
          Show More
        </button>
      }
      style={{marginBottom: "5px"}}
    >
      <div className='my_questions_wrapper'>
        {userQuestions.reverse().map((question) => (
          <QuestionItem
            key={question._id}
            signedInUserId={userId}
            questionDetails={question}
            questionAction={questionHandler}
          />
        ))}
      </div>
    </Card>
  );
};

export default MyQuestions;
