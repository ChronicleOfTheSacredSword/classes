import { Class } from '../domain/class';
import { ClassRepositoryPort } from "../ports/driven/classRepositoryPort";
import { ClassPort } from "../ports/driving/classPort";

export class ClassService implements ClassPort {
  	constructor(private repo: ClassRepositoryPort) {}

	async getClass(id: number): Promise<Class | null>{
		return this.repo.findById(id);
	}

	async getAllClass(): Promise<Class[] | null>{
		return this.repo.findAll();
	}
  
	async createClass(input: Omit<Class, 'id'>): Promise<Class> {
		if(input.name.length || input.pv <= 0 || input.gold < 0 || input.atk <= 0){
			throw new Error('Input invalid');
		}

		const isUsernameValid = await this.checkClassName(input);
		if (!isUsernameValid) {
			throw new Error('Username already exists');
		}

		return this.repo.save(input);
	}

	async checkClassName(input: Omit<Class, 'id'>): Promise<Boolean> {
		const existingClass = await this.repo.findByName(input.name);
		return existingClass === null;
	}
}
