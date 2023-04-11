import { Request, Response } from 'express';
import { z } from 'zod';

function errorHandler(err:any, req: Request, res: Response) {
	if (err instanceof z.ZodError) {
		const issues = err.issues.map((issue) => ({ path: issue.path[0], message: issue.message }));
		return res.status(400).json(issues);
	}

	const statusCode = err.statusCode ?? 500;
	const message = err.statusCode ? err.message : 'Internal Server Error';
	return res.status(statusCode).json({ message });
}

export default errorHandler;
