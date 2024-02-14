import { useState } from 'react';

interface Question {
  id?: number;
  text: string;
  options: string[];
  correctOption: string;
}

interface Props {
  question: Question;
  onSubmitAnswer: (answer: string[]) => void;
  onDeleteQuestion: (questionId: number | undefined) => void;
  onUpdateQuestion: (questionId: number, updatedQuestion: Question) => void;
}

export default function QuestionItem({ question, onSubmitAnswer }: Props) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitAnswer([selectedOption]);
    setSelectedOption(''); // Reset selected option after submission
  };

  return (
    <div>
      <h3>{question.text}</h3>
      <form onSubmit={handleSubmit}>
        {question.options.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`option${index}`}
              name="option"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
            />
            <label htmlFor={`option${index}`}>{option}</label>
          </div>
        ))}
        <button type="submit">Submit Answer</button>
      </form>
    </div>
  );
}
