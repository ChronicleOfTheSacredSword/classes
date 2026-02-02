import { Class } from '../../domain/class';
import { ClassRepositoryPort } from '../../ports/driven/classRepositoryPort';
import pool from './db';

export class ClassRepo implements ClassRepositoryPort {
	async findById(id: number): Promise<Class | null> {
		const res = await pool.query(
			`
			SELECT
				id,
				name,
				pv,
				gold,
				atk
			FROM classes
			WHERE id = $1
			`,
			[id]
		);

		return res.rows[0] ?? null;
	}

	async findByName(name: string): Promise<Class | null> {
		const res = await pool.query(
			`
			SELECT
				id,
				name,
				pv,
				gold,
				atk
			FROM classes
			WHERE name = $1
			`,
			[name]
		);

		return res.rows[0] ?? null;
	}

	async findAll(): Promise<Class[] | null> {
		const res = await pool.query(
			`
			SELECT
				id,
				name,
				pv,
				gold,
				atk
			FROM classes
			`
		);

		return res.rows;
	}

  	async save(Class: Omit<Class, 'id'>): Promise<Class> {
		const res = await pool.query(
			`
			INSERT INTO classes (
				name,
				pv,
				gold,
				atk
			)
			VALUES ($1, $2)
			RETURNING
				id,
				name,
				pv,
				gold,
				atk
			`,
			[
				Class.name,
				Class.pv,
				Class.gold,
				Class.atk
			]
		);

		return res.rows[0];
  	}
}
