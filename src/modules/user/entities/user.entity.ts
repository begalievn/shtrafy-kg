import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../../base/base.entity';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRoleEnum } from '../enums/user-role.enum';
import { UserGenderEnum } from '../enums/user-gender.enum';
import { StatusEnum } from '../enums/user-status.enum';
import { Image } from '../../image/entities/image.entity';
import { RegionEnum } from 'src/utils/enum/region.enum';
import { Character } from '../../character/entities/character.entity';
import { Feedback } from 'src/modules/feedback/entities/feedback.entity';

@Entity()
export class User extends BaseEntity {
  @Column({
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column({
    unique: true,
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Column({
    nullable: true,
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Column({
    nullable: true,
  })
  @IsDate()
  @IsOptional()
  dateOfBirth: Date;

  @Column({
    type: 'enum',
    enum: UserGenderEnum,
    default: UserGenderEnum.FEMALE,
  })
  gender: UserGenderEnum;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
  })
  role: UserRoleEnum;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.VISITOR,
  })
  status: StatusEnum;

  @Column({
    type: 'enum',
    enum: RegionEnum,
    nullable: true,
  })
  region: RegionEnum;

  @Column({
    type: 'boolean',
    default: false,
  })
  confirmed: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  isDeleted: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  isBlocked: boolean;

  @Column({
    nullable: true,
  })
  review: string;

  @Column({
    nullable: true,
  })
  info: string;

  @OneToOne(() => Image, { cascade: true })
  @JoinColumn()
  image: Image;

  @OneToOne(() => Character, (character) => character.user, { cascade: true })
  @JoinColumn()
  character: Character;

  @OneToMany(() => Feedback, (feedback) => feedback.user)
  @JoinColumn()
  feedback: Feedback[];

  @Column({
    nullable: true,
  })
  refresh_token: string;
}
