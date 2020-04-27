import {
  addAQuestion,
  updateQuestion,
  getAllQuestions,
  getUserQuestions,
  getSingleQuestion,
  answerAQuestion,
  removeQuestion,
  deleteAnswer,
  updateAnswer,
} from "../../lib/questions";

import {
  DELETE_QUESTION,
  CREATE_QUESTION,
  UPDATE_QUESTION,
  SET_ALL_QUESTIONS,
  SET_USER_QUESTIONS,
  ADD_A_QUESTION,
  REVIEW_QUESTION,
  ANSWER_A_QUESTION,
  GET_SINGLE_QUESTION,
} from "../../constants/actionTypes";

const URL = process.env.REACT_APP_API_URL;
const PORT = process.env.REACT_APP_API_PORT;

export const addNewQuestion = (data) => {
  console.log(data);
  return async (getState, dispatch) => {
    try {
      const addedQuestionData = await addAQuestion(data);
      console.log(addedQuestionData);
      dispatch({
        type: ADD_A_QUESTION,
        addedQuestion: addedQuestionData,
      });
    } catch (err) {
      // do something with message!
      console.log(err.response);
    }
  };
};

export const fetchAllQuestions = (page) => {
  return async (dispatch) => {
    try {
      const allQuestionsData = await getAllQuestions(page);
      dispatch({
        type: SET_ALL_QUESTIONS,
        allQuestions: allQuestionsData.data,
      });
    } catch (error) {
      // SHOW ERROR ON CLIENT
      console.log(error);
    }
  };
};

export const getSingleQuestionDetails = (questionId) => {
  return async (dispatch) => {
    try {
      const singleQuestionData = await getSingleQuestion(questionId);
      console.log(singleQuestionData.data[0]);
      dispatch({
        type: GET_SINGLE_QUESTION,
        singleQuestionData: singleQuestionData.data[0],
      });
    } catch (err) {
      // do something with message!
      console.log(err.response);
    }
  };
};

export const updateAQuestion = (questionId, updatedQuestion) => {
  console.log(" hello from updated Question");
  return async (dispatch) => {
    const updateQuestionData = await updateQuestion(
      questionId,
      updatedQuestion
    );
    console.log(updateQuestionData);
    /*   dispatch({
      type: ANSWER_A_QUESTION,
      questionId: resData._id,
      updatedQuestion: resData,
    });
    if (!response.ok) {
      throw new Error("Something went wrong!");
    } */
  };
};

export const deleteQuestion = (questionId) => {
  console.log("delete");
  return async (dispatch) => {
    try {
      const removedQuestionData = await removeQuestion(questionId);
      console.log(removedQuestionData);
      dispatch({type: DELETE_QUESTION, questionId: questionId});
    } catch (err) {
      // do something with message!
      console.log(err.response);
    }
  };
};

export const answerQuestion = (questionId, answer) => {
  console.log(" hello from redux");
  return async (dispatch) => {
    const answeredQuestionData = await answerAQuestion(questionId, answer);
    console.log(answeredQuestionData);
    /*   dispatch({
      type: ANSWER_A_QUESTION,
      questionId: resData._id,
      updatedQuestion: resData,
    });
    if (!response.ok) {
      throw new Error("Something went wrong!");
    } */
  };
};

export const updateAAnswer = (questionId, answerId, answer) => {
  console.log(" hello from redux");
  return async (dispatch) => {
    const updateAnswerData = await updateAnswer(questionId, answerId, answer);
    console.log(updateAnswerData);
    /*   dispatch({
      type: ANSWER_A_QUESTION,
      questionId: resData._id,
      updatedQuestion: resData,
    });
    if (!response.ok) {
      throw new Error("Something went wrong!");
    } */
  };
};

export const deleteAAnswer = (questionId, answerId) => {
  console.log("questionId", questionId);
  console.log("answerId", answerId);
  return async (dispatch) => {
    try {
      const removedQuestionData = await deleteAnswer(questionId, answerId);
      console.log(removedQuestionData);
      /*  dispatch({type: DELETE_QUESTION, questionId: questionId}); */
    } catch (err) {
      // do something with message!
      console.log(err.response);
    }
  };
};

export const getUsersQuestions = () => {
  return async (dispatch) => {
    try {
      const getUserQuestionsData = await getUserQuestions();
      console.log(getUserQuestionsData);
      dispatch({
        type: SET_USER_QUESTIONS,
        userQuestions: getUserQuestionsData.data,
      });
    } catch (err) {
      // do something with message!
      console.log(err.response);
    }
  };
};

/* export const fetchMyQuestions = () => {
  console.log("hi there");
  return async (dispatch, getState) => {
    try {
      const userData = localStorage.getItem("userData");
      const data = JSON.parse(userData);
      const response = await fetch(
        `${URL}${PORT}/api/questions/my_questions/${data.userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + data.token,
          },
        }
      );
      const resData = await response.json();

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      return resData;
    } catch (error) {
      //send it to your own analytic server
      throw error;
    }
  };
}; */

export const voteQuestion = (questionId, votes) => {
  return async (dispatch, getState) => {
    const questions = getState().questions.allQuestions;
    const userData = await localStorage.getItem("userData");
    const data = JSON.parse(userData);
    const reviewersId = data.userId;
    const response = await fetch(
      `${URL}${PORT}/api/questions/review/${questionId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
        body: JSON.stringify({
          votes,
          reviewersId,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: REVIEW_QUESTION,
      questionId: resData._id,
      updatedQuestion: resData,
    });
    console.log(response);
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
  };
};

export const invalidateAQuestion = (questionId) => {
  return async () => {
    const userData = await localStorage.getItem("userData");
    let data = JSON.parse(userData);
    const response = await fetch(
      `${URL}${PORT}/api/Questions/invalidate/${questionId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      }
    );
    console.log(response);
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
  };
};
