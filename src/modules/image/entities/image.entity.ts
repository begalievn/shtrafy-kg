import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../base/base.entity';
import { IsString } from 'class-validator';
import { CharacterImage } from '../../character/entities/character-image.entity';

@Entity()
export class Image extends BaseEntity {
  @Column()
  @IsString()
  url: string;

  @IsString()
  publicId: string;

  @ManyToOne(() => CharacterImage, (characterImage) => characterImage.images, {
    onDelete: 'CASCADE',
  })
  characterImage: CharacterImage;
}
