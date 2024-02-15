import { useState, useEffect } from 'react';

interface Question {
  id?: number;
  text: string;
  options: string[];
  correctOption: string;
}

interface Props {
  question: Question;
  onAddQuestion: (formData: Question) => void;
  onUpdateQuestion: (questionId: number, updatedQuestion: Question) => void;
  onDeleteQuestion: (questionId: number | undefined) => void;
}
export default function FormComponent({ question, onAddQuestion, onUpdateQuestion }: Props) {
  const [formData, setFormData] = useState<Question>({ text: '', options: ['', '', '', ''], correctOption: '' });

  useEffect(() => {
    setFormData(question);
  }, [question]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData(prevData => ({
      ...prevData,
      options: newOptions
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.text && formData.options.every(option => option !== '') && formData.correctOption !== '') {
      if (formData.id) {
        onUpdateQuestion(formData.id, formData);
      } else { 
        onAddQuestion(formData);
      }
      setFormData({ text: '', options: ['', '', '', ''], correctOption: '' });
    }
  };

  return (
    <>
      <h2>{formData.id ? 'Update Question' : 'Add Question'}</h2>
      <form onSubmit={handleSubmit} className='form-container'>
        <input type="text" name="text" placeholder="Question" value={formData.text} onChange={handleChange} />
        {formData.options.map((option, index) => (
          <input key={index} type="text" placeholder={`Option ${index + 1}`} value={option} onChange={(e) => handleOptionChange(index, e.target.value)} />
        ))}
        <select name="correctOption" value={formData.correctOption} onChange={handleChange}>
          <option value="">Select Correct Option</option>
          {formData.options.map((option, index) => (
            <option key={index} value={option}>Option {index + 1}</option>
          ))}
        </select>
        <button type="submit">{formData.id ? 'Update Question' : 'Add Question'}</button> 
      </form>
    </>
  );
}
