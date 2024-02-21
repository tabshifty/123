import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GameDocument = HydratedDocument<Game>;

@Schema()
export class Game {
  @Prop()
  name_cn: string[];

  @Prop()
  name_en: string;

  @Prop()
  release_date: number;

  @Prop()
  cover: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
