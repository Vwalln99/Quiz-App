import { useState } from 'react';
import DeleteDialog from './DeleteDialog';
import QuestionItem from './QuestionItem';
import { Delete, Edit } from '@mui/icons-material';
import FormComponent from './FormComponent';

interface Question {
  id?: number;
  text: string;
  options: string[];
  correctOption: string;
}

interface Props {
  questions: Question[];
  onAddQuestion: (formData: Question) => void;
  onSubmitAnswers: (answer: string[]) => void;
  onDeleteQuestion: (id: number | undefined) => void;
  onUpdateQuestion: (id: number | undefined, updatedQuestion: Question) => void;
}

export default function QuestionList({ questions, onSubmitAnswers, onDeleteQuestion, onAddQuestion, onUpdateQuestion }: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [questionIdToDelete, setQuestionIdToDelete] = useState<number | undefined>(undefined);
  const [editQuestion, setEditQuestion] = useState<Question | null>(null);

  const handleDeleteButtonClick = (id: number | undefined) => {
    setQuestionIdToDelete(id);
    setOpenDialog(true);
  };

  const handleDeleteConfirmed = () => {
    onDeleteQuestion(questionIdToDelete);
    setOpenDialog(false);
  };

  const handleEditButtonClick = (question: Question) => {
    setEditQuestion(question); 
  };


  return (
    <div className='question-list'>
      {questions.map(question => (
        <div key={question.id}>
          <QuestionItem
          question={question} 
          onSubmitAnswers={onSubmitAnswers}
           onUpdateQuestion={onUpdateQuestion} 
           onDeleteQuestion={onDeleteQuestion}
           />
          <Delete onClick={() => handleDeleteButtonClick(question.id)} style={{ cursor: "pointer" }} />
          <Edit onClick={() => handleEditButtonClick(question)} style={{ cursor: "pointer" }} />
          </div>
      ))}
      <DeleteDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)} 
        onConfirm={handleDeleteConfirmed} 
      />
      {editQuestion && ( 
                <FormComponent
                onAddQuestion={onAddQuestion}
                onDeleteQuestion={onDeleteQuestion}
          question={editQuestion}
          onUpdateQuestion={(id, updatedQuestion) => {
            onUpdateQuestion(id, updatedQuestion);
            setEditQuestion(null);           }}
          />
      )}
    </div>
  );
}
