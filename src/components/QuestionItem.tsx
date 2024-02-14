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
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectedOption(value);
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitAnswer([selectedOption]);
    setSelectedOption('');
  };

  return (
    <div>
      <h3>{question.text}</h3>
      <form onSubmit={(e) => handleSubmit (e)}>
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
      </form>
    </div>
  );
}
