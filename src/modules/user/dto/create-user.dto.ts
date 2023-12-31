import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../../../base/dto/base.dto';
import { IsPhoneNumberDecorator } from '../../../utils/decorators/is-phone-number.decorator';

export class CreateUserDto extends BaseDto {
  @ApiProperty({
    example: 'playerone@gmail.com',
    description: 'Email of a user',
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    example: 'Player01',
    description: 'Password of a user',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(12)
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'Player',
    description: 'Firstname of a user',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'Blare',
    description: 'Surname of a user',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: '996555010101',
  })
  @IsPhoneNumberDecorator()
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
}
