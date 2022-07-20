import { IsNumber, Min, IsOptional, IsString, Matches } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetDataParams {
  @ApiProperty({ default: 1 })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number;

  @ApiProperty({ default: 10 })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  size: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => String)
  @IsString()
  keyword?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Matches(/^[A-Za-z]+:(ASC|DESC)$/, { message: 'invalid query params sort' })
  sort?: string;
}

export class RequestUser {
  userId: string;
  role?: string;
}

export class ResponseJson {
  data: Record<string, any>;
  meta?: string;
}

export class KafkaMessagePayload {
  body: any;
  messageId: string;
  messageType: string;
  topicName: string;
  createdTime?: string;
}

export class KafkaMessage {
  key?: any;
  value: KafkaMessagePayload;
  headers: any;
  topic: string;
  partition: number;
}
