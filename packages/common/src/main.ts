export interface Survey {
  name: string;
  subtitle: string;
  questions: Question[];
  submissions: Submission[];
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
  subtitle: string;
}

export interface ShortAnswerQuestion extends BaseQuestion {
  type: 'short_answer';
}

export interface ParagraphQuestion extends BaseQuestion {
  type: 'paragraph';
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple_choice';
  choices: string[];
}

export interface CheckboxQuestion extends BaseQuestion {
  type: 'checkbox';
  choices: string[];
}

export interface DropdownQuestion extends BaseQuestion {
  type: 'dropdown';
  choices: string[];
}

export interface LinearScaleQuestion extends BaseQuestion {
  type: 'linear_scale';
  min: number;
  max: number;
}

export interface Submission {
  responses: Response[];
}

export interface Response {
  questionId: string;
  value: string;
}
