export class Class {
	id?: number;
	id_hero: number;
	name: string;
	pv: number;
	gold: number;
	atk: number;

	constructor(name: string, pv: number, gold: number, atk: number, id_hero: number, id?: number) {
		this.id = id;
		this.id_hero = id_hero;
		this.name = name;
		this.pv = pv;
		this.gold = gold;
		this.atk = atk;
	}
}
