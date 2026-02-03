import { Class } from '../../domain/class';
import { ClassRepositoryPort } from '../../ports/driven/classRepositoryPort';
import pool from './db';

export class ClassRepo implements ClassRepositoryPort {
	async findById(id: number): Promise<Class | null> {
		const res = await pool.query(
			`
			SELECT
				id,
				id_hero,
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
				id_hero,
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
				id_hero,
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
				id_hero,
				name,
				pv,
				gold,
				atk
			)
			VALUES ($1, $2, $3, $4, $5)
			RETURNING
				id,
				id_hero,
				name,
				pv,
				gold,
				atk
			`,
			[
				Class.id_hero,
				Class.name,
				Class.pv,
				Class.gold,
				Class.atk
			]
		);

		return res.rows[0];
  	}
}
