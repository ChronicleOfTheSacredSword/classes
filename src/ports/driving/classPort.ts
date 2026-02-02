import { Class } from '../../domain/class';
export interface ClassPort {
  getClass(id: number): Promise<Class | null>;
  getAllClass(): Promise<Class[] | null>;
  createClass(input: Omit<Class, 'id'>): Promise<Class>;
  checkClassName(input: Omit<Class, 'id'>): Promise<Boolean>;
}