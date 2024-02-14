import { useState, useEffect } from "react";
import QuestionList from "./QuestionList";
import ResultComponent from "./ResultComponent";
import FormComponent from "./FormComponent";

interface Question {
  id?: number;
  text: string;
  options: string[];
  correctOption: string;
}

export default function QuizApp() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [submittedAnswers, setSubmittedAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://localhost:3000/questions")
      .then((response) => response.json())
      .then((data: Question[]) => setQuestions(data))
      .catch((error) => console.error(error));
  }, []);

  const handleSubmitAnswers = (answers: string[]) => {
    console.log(answers);
    setSubmittedAnswers(answers);
    setQuizSubmitted(true);
  };

  const handleResetQuiz = () => {
    setSubmittedAnswers([]);
    setShowResult(false);
    setQuizSubmitted(false);
  };

  const handleAddQuestion = (question: Question) => {
    fetch("http://localhost:3000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    })
      .then((response) => response.json())
      .then((data: Question) => setQuestions([...questions, data]))
      .catch((error) => console.error("Error adding question:", error));
  };

  const handleUpdateQuestion = (
    id: number | undefined,
    updatedQuestion: Question
  ) => {
    fetch(`http://localhost:3000/questions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedQuestion),
    })
      .then((response) => response.json())
      .then((data: Question) => {
        const updatedQuestions = questions.map((q) => (q.id === id ? data : q));
        setQuestions(updatedQuestions);
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteQuestion = (id: number | undefined) => {
    if (id !== undefined) {
      fetch(`http://localhost:3000/questions/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          const updatedQuestions = questions.filter((q) => q.id !== id);
          setQuestions(updatedQuestions);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div>
      <h1>Quiz App</h1>
      {!showResult && !quizSubmitted && (
        <>
          <QuestionList
            questions={questions}
            onSubmitAnswers={handleSubmitAnswers}
            onDeleteQuestion={handleDeleteQuestion}
            onUpdateQuestion={handleUpdateQuestion}
          />
          <FormComponent
            questions={questions}
            onAddQuestion={handleAddQuestion}
            onUpdateQuestion={handleUpdateQuestion}
            onDeleteQuestion={handleDeleteQuestion}
          />
          <button onClick={() => setShowResult(true)}>Submit Quiz</button>
        </>
      )}
      {showResult && (
        <ResultComponent
          questions={questions}
          submittedAnswers={submittedAnswers}
          onResetQuiz={handleResetQuiz}
        />
      )}
    </div>
  );
}
