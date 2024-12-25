import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Organigram } from 'src/organigram/entities';
import { organigramSeed } from 'src/organigram/seed';

export default class OrganigramSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Organigram);

    const result = await repository.insert(organigramSeed);

    console.log(`${Organigram.name} insterted: ${result.generatedMaps.length}`);
  }
}
