export class Class {
	id?: number;
	name: string;
	pv: number;
	gold: number;
	atk: number;

	constructor(name: string, pv: number, gold: number, atk: number, id?: number) {
		this.id = id;
		this.name = name;
		this.pv = pv;
		this.gold = gold;
		this.atk = atk;
	}
}
