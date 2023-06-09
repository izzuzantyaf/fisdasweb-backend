import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { isNotEmpty, isNotEmptyObject, isObject, isURL } from 'class-validator';
import { Document } from 'mongoose';
import { Language } from 'src/core/constants';

export type PracticumModuleDocument = PracticumModule & Document;

export type PreTask = {
  url: string;
  isActive: boolean;
};

export type Video = {
  url: string;
  embedUrl: string;
  isActive: boolean;
};

export type Simulator = {
  url: string;
  isActive: boolean;
};

export type JournalCover = {
  url: string;
  isActive: boolean;
};

export type PracticumModuleConstructorProps = Pick<
  PracticumModule,
  | '_id'
  | 'name'
  | 'code'
  | 'language'
  | 'faIconName'
  | 'preTask'
  | 'video'
  | 'simulator'
  | 'journalCover'
>;

@Schema({ timestamps: true, collection: 'practicum_modules' })
export class PracticumModule {
  _id?: any;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  code: string;
  @Prop({ required: true })
  language: Language;
  @Prop({ required: true })
  faIconName: string;
  @Prop(
    raw({
      url: { type: String },
      isActive: { type: Boolean },
    }),
  )
  preTask: PreTask;
  @Prop(
    raw({
      url: { type: String },
      isActive: { type: Boolean },
    }),
  )
  video: Video;
  @Prop(
    raw({
      url: { type: String },
      isActive: { type: Boolean },
    }),
  )
  simulator: Simulator;
  @Prop(
    raw({
      url: { type: String },
      isActive: { type: Boolean },
    }),
  )
  journalCover: JournalCover;

  constructor(props: PracticumModuleConstructorProps) {
    const {
      _id,
      name,
      code,
      language,
      faIconName,
      preTask,
      video,
      simulator,
      journalCover,
    } = props;
    this._id = _id;
    this.name = name;
    this.code = code;
    this.language = language;
    this.faIconName = faIconName;
    this.preTask = preTask;
    this.video = video;
    this.simulator = simulator;
    this.journalCover = journalCover;

    if (isNotEmpty(this.video))
      this.video.embedUrl = this.generateVideoEmbedURL();
  }

  protected isPreTaskUrlValid() {
    if (isNotEmpty(this.preTask.url))
      if (!isURL(this.preTask.url))
        return { preTask: { url: 'Link tidak valid' } };
    return true;
  }

  protected isVideoUrlValid() {
    if (isNotEmpty(this.video.url))
      if (!isURL(this.video.url)) return { video: { url: 'Link tidak valid' } };
    return true;
  }

  protected isSimulatorUrlValid() {
    if (isNotEmpty(this.simulator.url))
      if (!isURL(this.simulator.url))
        return { simulator: { url: 'Link tidak valid' } };
    return true;
  }

  protected isJournalCoverUrlValid() {
    if (isNotEmpty(this.journalCover.url))
      if (!isURL(this.journalCover.url))
        return { journalCover: { url: 'Link tidak valid' } };
    return true;
  }

  validateProps() {
    const validationResults = [
      this.isPreTaskUrlValid(),
      this.isVideoUrlValid(),
      this.isSimulatorUrlValid(),
      this.isJournalCoverUrlValid(),
    ];
    const validationErrors = validationResults.reduce(
      (error, result) => (isObject(result) ? { ...error, ...result } : error),
      {},
    );
    return isNotEmptyObject(validationErrors) ? validationErrors : null;
  }

  protected generateVideoEmbedURL() {
    let embedURL: string = undefined;
    if (isNotEmpty(this.video.url)) {
      const videoID = this.video.url.split('/')[3];
      embedURL = `https://www.youtube.com/embed/${videoID}`;
    }
    return embedURL;
  }
}

export const PracticumModuleSchema =
  SchemaFactory.createForClass(PracticumModule);
