export interface Survey {
  id: string;
  name: string;
  subtitle?: string;
  questions: Question[];
  submissions?: Submission[];
}

export enum QuestionType {
  ShortAnswer = 'short_answer',
  Paragraph = 'paragraph',
  MultipleChoice = 'multiple_choice',
  Checkbox = 'checkbox',
  Dropdown = 'dropdown',
  LinearScale = 'linear_scale',
}

export type Question =
  | ShortAnswerQuestion
  | ParagraphQuestion
  | MultipleChoiceQuestion
  | CheckboxQuestion
  | DropdownQuestion
  | LinearScaleQuestion;

export interface BaseQuestion {
  id: string;
  title: string;
  subtitle?: string;
  required?: boolean;
}

export interface ShortAnswerQuestion extends BaseQuestion {
  type: QuestionType.ShortAnswer;
}

export interface ParagraphQuestion extends BaseQuestion {
  type: QuestionType.Paragraph;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: QuestionType.MultipleChoice;
  choices: string[];
}

export interface CheckboxQuestion extends BaseQuestion {
  type: QuestionType.Checkbox;
  choices: string[];
}

export interface DropdownQuestion extends BaseQuestion {
  type: QuestionType.Dropdown;
  choices: string[];
}

export interface LinearScaleQuestion extends BaseQuestion {
  type: QuestionType.LinearScale;
  min: number;
  max: number;
}

export interface Submission {
  id: string;
  surveyId: string;
  responses: Response[];
  date: string;
}

export interface Response {
  id: string;
  questionId: string;
  value: string;
}

export interface PostSubmissionRequest {
  surveyId: string;
  responses: Response[];
}
