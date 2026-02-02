import { Express, Request, Response } from 'express';
import { ClassService } from '../../services/classService';

export class ClassController {
	private service_class: ClassService;

	constructor(private readonly classService: ClassService) {
		this.service_class = classService;
	}

	registerRoutes(app: Express) {
		app.get('/class/:id', this.getClass.bind(this));
		app.get('/class', this.getAllClass.bind(this));
		app.post('/class', this.createClass.bind(this));
	}

	async getClass(req: Request, res: Response) {
		const id = Number(req.params.id);
		const classBuffer = await this.service_class.getClass(id);
		if (!classBuffer) return res.status(404).json({ message: 'Not found' });
		res.json(classBuffer);
	}

	async getAllClass(req: Request, res: Response) {
		const classBuffer = await this.service_class.getAllClass();
		res.json(classBuffer);
	}

	async createClass(req: Request, res: Response) {
		try {
			const classBuffer = await this.service_class.createClass(req.body);
			return res.status(201).json(classBuffer);
		} catch (error: any) {
			if (error.message === 'Class name already exists') {
				return res.status(409).json({ message: error.message });
			}

			if (error.message.startsWith('Input')) {
				return res.status(400).json({ message: error.message });
			}

			return res.status(500).json({ message: 'Internal server error' });
		}
	}
}