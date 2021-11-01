import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsJSON,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateUserBody {
  @ApiProperty()
  @IsNotEmpty()
  username: string;
  email: string;
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsJSON()
  address: object;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  last_login: Date;
  created_on: Date;
  updated_on: Date;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  active: boolean;
}

export class LoginUserBody {
  @ApiProperty()
  @IsNotEmpty()
  email: string;
  password: string;
}

export class UpdateUserBody {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsJSON()
  address: object;
}
