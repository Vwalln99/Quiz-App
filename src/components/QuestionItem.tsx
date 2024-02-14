import { useState } from 'react';

interface Question {
  id?: number;
  text: string;
  options: string[];
  correctOption: string;
}

interface Props {
  question: Question;
  onSubmitAnswers: (answer: string[]) => void;
  onDeleteQuestion: (questionId: number | undefined) => void;
  onUpdateQuestion: (questionId: number, updatedQuestion: Question) => void;
}

export default function QuestionItem({ question, onSubmitAnswers }: Props) {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    console.log(value);
    onSubmitAnswers([value]);
  };

  return (
    <div>
      <h3>{question.text}</h3>
      {question.options.map((option, optionIndex) => (
        <div key={optionIndex}>
          <input
            type="radio"
            id={`option${question.id}-${optionIndex}`}
            name={`option-${question.id}`}
            value={option}
            checked={selectedOption === option}
            onChange={() => handleOptionChange(option)}
          />
          <label htmlFor={`option${question.id}-${optionIndex}`}>{option}</label>
        </div>
      ))}
    </div>
  );
}
