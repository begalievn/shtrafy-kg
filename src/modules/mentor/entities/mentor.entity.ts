import { IsNotEmpty, IsString } from "class-validator";
import { BaseEntity } from "src/base/base.entity";
import { MenteeEntity } from "src/modules/mentee/entities/mentee.entity";
import { Training } from "src/modules/training/entities/training.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class MentorEntity extends BaseEntity{
    @Column()
    @IsNotEmpty()
    @IsString()
    mentorName: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    jobTitle: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    info: string;

    @OneToMany(() => MenteeEntity, (mentee) => mentee.mentor)
    mentees: MenteeEntity[];
}
