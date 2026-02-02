import { Class } from '../../domain/class';

export interface ClassRepositoryPort {
  findById(id: number): Promise<Class | null>;
  findAll(): Promise<Class[] | null>;
  findByName(name: string): Promise<Class | null>;
  save(input: Omit<Class, 'id'>): Promise<Class>;
}