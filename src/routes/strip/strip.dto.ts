import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrderBody {
  @ApiProperty()
  @IsNotEmpty()
  amount: number;

  @IsOptional()
  description: string;
}
