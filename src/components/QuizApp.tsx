import { useState, useEffect } from "react";
import QuestionList from "./QuestionList";
import ResultComponent from "./ResultComponent";
import FormComponent from "./FormComponent";
import { Add } from "@mui/icons-material";

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
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          "https://vwalln99.github.io/quizdata/data.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        setQuestions(data.questions);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuestions();

    /* fetch("https://vwalln99.github.io/quizdata/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        return response.json();
      })
      .then((data: Question[]) => setQuestions(data))
      .catch((error) => console.error(error)); */
  }, []);

  const handleSubmitAnswers = (answers: string[]) => {
    setSubmittedAnswers((prevAnswers) => [...prevAnswers, ...answers]);
  };

  const handleAddQuestion = (question: Question) => {
    fetch("https://vwalln99.github.io/quizdata/data.json", {
      method: "POST",
      mode:"cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add question");
        }
        return response.json();
      })
      .then((data: Question) => setQuestions([...questions, data]))
      .catch((error) => console.error("Error adding question:", error));
    setShowForm(false);
  };

  const handleUpdateQuestion = (
    id: number | undefined,
    updatedQuestion: Question
  ) => {
    fetch(`https://vwalln99.github.io/quizdata/data.json/questions/${id}`, {
      method: "PUT",
      mode:"cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedQuestion),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update question");
        }
        return response.json();
      })
      .then((data: Question) => {
        const updatedQuestions = questions.map((q) => (q.id === id ? data : q));
        setQuestions(updatedQuestions);
        setShowForm(false);
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteQuestion = (id: number | undefined) => {
    if (id !== undefined) {
      fetch(`https://vwalln99.github.io/quizdata/data.json/questions/${id}`, {
        method: "DELETE",
        mode:"cors",
      })
        .then(() => {
          const updatedQuestions = questions.filter((q) => q.id !== id);
          setQuestions(updatedQuestions);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleResetQuiz = () => {
    setSubmittedAnswers([]);
    setShowResult(false);
    setQuizSubmitted(false);
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      {!showResult && !quizSubmitted && (
        <>
          <QuestionList
            questions={questions}
            onAddQuestion={handleAddQuestion}
            onSubmitAnswers={handleSubmitAnswers}
            onDeleteQuestion={handleDeleteQuestion}
            onUpdateQuestion={handleUpdateQuestion}
          />
          {showForm && (
            <FormComponent
              question={{
                text: "",
                options: ["", "", "", ""],
                correctOption: "",
              }}
              onAddQuestion={handleAddQuestion}
              onUpdateQuestion={handleUpdateQuestion}
              onDeleteQuestion={handleDeleteQuestion}
            />
          )}
          <button onClick={() => setShowResult(true)}>Submit Quiz</button>
          <Add onClick={() => setShowForm(true)} />
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
