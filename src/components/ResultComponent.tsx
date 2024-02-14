

interface Question {
  id?: number;
  text: string;
  options: string[];
  correctOption: string;
}

interface Props {
  questions: Question[];
  submittedAnswers: string[];
  onResetQuiz: () => void;
}

export default function ResultComponent({ questions, submittedAnswers, onResetQuiz }: Props) {
  const correctAnswers = questions.reduce((acc, question, index) => {
    return question.correctOption === submittedAnswers[index] ? acc + 1 : acc;
  }, 0);

  const percentage = (correctAnswers / questions.length) * 100;

  return (
    <div>
      <h2>Quiz Result</h2>
      <p>Correct Answers: {correctAnswers}</p>
      <p>Incorrect Answers: {questions.length - correctAnswers}</p>
      <p>Percentage: {percentage.toFixed(2)}%</p>
      <button onClick={onResetQuiz}>Try Again</button>
    </div>
  );
}
