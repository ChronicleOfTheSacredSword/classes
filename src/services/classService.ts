import { Class } from '../domain/class';
import { ClassRepositoryPort } from "../ports/driven/classRepositoryPort";
import { ClassPort } from "../ports/driving/classPort";
import { sendLogMessage } from './sendLogMessage';

export class ClassService implements ClassPort {
  	constructor(private repo: ClassRepositoryPort) {}

	async getClass(id: number): Promise<Class | null>{
		return this.repo.findById(id);
	}

	async getAllClass(): Promise<Class[] | null>{
		return this.repo.findAll();
	}
  
	async createClass(input: Omit<Class, 'id'>): Promise<Class> {
		if (
			input.id_hero === undefined ||
			input.name.length === 0 ||
			input.pv <= 0 ||
			input.gold < 0 ||
			input.atk <= 0
		) {
			throw new Error('Input invalid');
		}

		const isClassNameValid = await this.checkClassName(input);
		if (!isClassNameValid) {
			throw new Error('Class name already exists');
		}

		const result = await this.repo.save(input);

		sendLogMessage({
			id_hero: input.id_hero,
			content: `The hero ${input.id_hero} created a new Classes ${result.id}-${result.name}.`
		}).catch(err => {
			console.error("RabbitMQ log failed:", err.message);
		});


		return result;
	}

	async checkClassName(input: Omit<Class, 'id'>): Promise<Boolean> {
		const existingClass = await this.repo.findByName(input.name);
		return existingClass === null;
	}
}
