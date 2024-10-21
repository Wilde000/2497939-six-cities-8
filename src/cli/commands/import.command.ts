import { Command } from "../../shared/interfaces/command.interfaces.js";
import { TsvFileReader } from "../../shared/libs/file-reader/tsv-file-reader.js";
import chalk from "chalk";

export class Import implements Command {
    public execute(...params: string[]): void {
        const [filename] = params;
        const FileReader = new TsvFileReader(filename.trim());

        try {
            FileReader.read();
            console.log(FileReader.toArray());

        } catch (error: unknown) {
            if (! (error instanceof Error)) {
                throw error;
            }

            console.error(chalk.red.underline(`Ошибка импорта из файла ${filename}`));
      console.error(chalk.red.underline(`Детали ошибки: ${error.message}`));
    }
  }

  public getName(): string {
    return '--import';
  }
}