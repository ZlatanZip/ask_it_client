import Axios from "axios";
const URL = process.env.REACT_APP_API_URL;
const PORT = process.env.REACT_APP_API_PORT;

const dataFromStorage = localStorage.getItem("userData");
let userId;
if (dataFromStorage) {
  const parsedData = JSON.parse(dataFromStorage);
  userId = parsedData.userId;
}

export async function addAQuestion(data) {
  const addQuestionUrl = `${URL}${PORT}/api/questions`;
  const addedQuestionsData = await Axios.post(addQuestionUrl, {data});
  return addedQuestionsData;
}
export async function getAllQuestions() {
  const allQuestionsUrl = `${URL}${PORT}/api/questions`;
  const allQuestionsData = await Axios.get(allQuestionsUrl);
  return allQuestionsData;
}

export async function getUserQuestions() {
  const getUserQuestionsUrl = `${URL}${PORT}/api/questions/userQuestions/${userId}`;
  const getUserQuestionsData = await Axios.get(getUserQuestionsUrl);
  return getUserQuestionsData;
}

export async function mostPopularQuestions() {
  const mostPopularQuestionsUrl = `${URL}${PORT}/api/questions/mostpopular`;
  const mostPopularQuestionsData = await Axios.get(mostPopularQuestionsUrl);
  return mostPopularQuestionsData;
}

export async function getSingleQuestion(questionId) {
  const getSingleQuestionsUrl = `${URL}${PORT}/api/questions/${questionId}`;
  const singleQuestionData = await Axios.get(getSingleQuestionsUrl);
  return singleQuestionData;
}

export async function updateQuestion(questionId, updatedQuestion) {
  const updateQuestionUrl = `${URL}${PORT}/api/questions/${questionId}`;
  const updateQuestionData = await Axios.patch(updateQuestionUrl, {
    updatedQuestion,
  });
  return updateQuestionData;
}

export async function removeQuestion(userId) {
  const removeQuestionUrl = `${URL}${PORT}/api/questions/${userId}`;
  const removeQuestionData = await Axios.delete(removeQuestionUrl);
  return removeQuestionData;
}

export async function reviewAQuestion(userId) {
  const reviewAQuestionUrl = `${URL}${PORT}/api/questions/review/${userId}`;
  const reviewAQuestionData = await Axios.patch(reviewAQuestionUrl);
  return reviewAQuestionData;
}

export async function answerAQuestion(questionId, answer) {
  const answerAQuestionUrl = `${URL}${PORT}/api/questions/answer/${questionId}`;
  const answerAQuestionData = await Axios.put(answerAQuestionUrl, {
    "answer": answer,
  });
  return answerAQuestionData;
}

export async function updateAnswer(questionId, answerId, answer) {
  const updateAnswerUrl = `${URL}${PORT}/api/questions/answer/${questionId}/${answerId}`;
  const updateAnswerData = await Axios.patch(updateAnswerUrl, {answer});
  return updateAnswerData;
}

export async function deleteAnswer(questionId, answerId) {
  const deleteAnswerUrl = `${URL}${PORT}/api/questions/answer/${questionId}/${answerId}`;
  const deleteAnswerData = await Axios.delete(deleteAnswerUrl, {
    "hello": "hayyy",
  });
  return deleteAnswerData;
}

export async function invalidateQuestion(userId) {
  const answerAQuestionUrl = `${URL}${PORT}/api/questions/invalidate/${userId}`;
  const answerAQuestionData = await Axios.put(answerAQuestionUrl);
  return answerAQuestionData;
}
