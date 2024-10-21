import chalk from "chalk";
import { Command } from "../../shared/interfaces/command.interfaces.js";

export class Help implements Command {
    public async execute(...params: string[]): Promise<void> {
        console.info(`
            
            ${chalk.bold('Программа для подготовки данных для REST API сервера.')}

            ${chalk.underline('Пример:')} ${chalk.blue('cli.js --<comand> [--arguments]')} 

            ${chalk.underline('Команды:')}

                ${chalk.blue('--version:                      # выводит номер версии')}
                ${chalk.yellow('--help:                       # печатает этот текст')}
                ${chalk.yellow('--import <path>:              # импортирует данные из TSV')}
                ${chalk.yellow('--generate <n> <path> <url>   # генерирует произвольное количество тестовых данных')}
            `);
    }
    public getName(): string {
        return '--help';
    }
}