import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { CodeOfConduct } from 'src/code-of-conduct/entities';
import { codeOfConductSeed } from 'src/code-of-conduct/seed';

export default class CodeOfConductSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(CodeOfConduct);

    const result = await repository.insert(codeOfConductSeed);

    console.log(
      `${CodeOfConduct.name} insterted: ${result.generatedMaps.length}`,
    );
  }
}
