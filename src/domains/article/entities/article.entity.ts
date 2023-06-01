import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Article {
  constructor(props: Partial<Article> = {}) {
    this.title = props.title;
    this.content = props.content;
    this.cover_image_url = props.cover_image_url;
  }

  _id?: string;
  @Prop({ required: true, trim: true })
  title: string;
  @Prop({ required: true, trim: true })
  content: string;
  @Prop({ trim: true })
  cover_image_url?: string;

  @Prop()
  created_at?: Date;
  @Prop()
  updated_at?: Date;
}

export type ArticleDocument = HydratedDocument<Article>;
export const ArticleSchema = SchemaFactory.createForClass(Article);
