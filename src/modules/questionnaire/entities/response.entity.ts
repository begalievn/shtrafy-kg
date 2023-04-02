import { BaseEntity } from '../../../base/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Questionnaire } from './questionnaire.entity';
import { QuestionAnswer } from './question-answer.entity';

@Entity()
export class Response extends BaseEntity {
  @ManyToOne(() => User, (user) => user.response, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Questionnaire, (questionnaire) => questionnaire.responses)
  questionnaire: Questionnaire;

  @OneToMany(
    () => QuestionAnswer,
    (questionAnswer) => questionAnswer.response,
    { cascade: true },
  )
  questionAnswers: QuestionAnswer[];
}
