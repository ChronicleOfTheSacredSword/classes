import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { ClassRepo } from './adapters/driven/classRepo';
import { ClassService } from './services/classService';
import { ClassController } from './adapters/driving/classController';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const repo_class = new ClassRepo();
const class_service = new ClassService(repo_class);
const class_controller = new ClassController(class_service);

// Test route
app.get('/debug', (req: Request, res: Response) => {
	res.send('API is running');
});

class_controller.registerRoutes(app);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
