import { isNotEmpty, isNotEmptyObject, isObject, isURL } from 'class-validator';
import { UpdateLabModuleDto } from 'src/lab-module/dto';

export class UpdateLabModuleValidationHelper {
  private labModule: UpdateLabModuleDto;

  constructor(labModule: UpdateLabModuleDto) {
    this.labModule = labModule;
  }

  protected isPreTaskUrlValid() {
    if (isNotEmpty(this.labModule.pretask_url))
      if (!isURL(this.labModule.pretask_url))
        return { pretask_url: 'Link tidak valid' };
    return true;
  }

  protected isVideoUrlValid() {
    if (isNotEmpty(this.labModule.video_url))
      if (!isURL(this.labModule.video_url))
        return { video_url: 'Link tidak valid' };
    return true;
  }

  protected isSimulatorUrlValid() {
    if (isNotEmpty(this.labModule.simulator_url))
      if (!isURL(this.labModule.simulator_url))
        return { simulator_url: 'Link tidak valid' };
    return true;
  }

  protected isJournalCoverUrlValid() {
    if (isNotEmpty(this.labModule.journal_cover_url))
      if (!isURL(this.labModule.journal_cover_url))
        return { journal_cover_url: 'Link tidak valid' };
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
}
