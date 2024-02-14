
import QuestionItem from './QuestionItem';

interface Question {
  id?: number;
  text: string;
  options: string[];
  correctOption: string;
}

interface Props {
  questions: Question[];
  onSubmitAnswers: (answer: string[]) => void;
  onDeleteQuestion: (id: number | undefined) => void;
  onUpdateQuestion: (id: number | undefined, updatedQuestion: Question) => void;
}

export default function QuestionList({ questions,onSubmitAnswers, onDeleteQuestion, onUpdateQuestion }: Props) {
  return (
    <div>
      {questions.map(question => (
        <div key={question.id}>
          <QuestionItem question={question} onSubmitAnswers={onSubmitAnswers} onUpdateQuestion={onUpdateQuestion} onDeleteQuestion={onDeleteQuestion}/>
          <button type="button" onClick={() => onDeleteQuestion(question.id)}>Delete</button>
          <button type="button" onClick={() => onUpdateQuestion(question.id, question)}>Edit</button>
        </div>
      ))}
    </div>
  );
}
