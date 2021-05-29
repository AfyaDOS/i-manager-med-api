import { Request, Response } from 'express';

class ServiceController {
  async set(req: Request, res: Response) {
    try {
      const data = [];

      return res.send(200).end();
    } catch (error) {
      return res.send(400).json({
        error: true,
        message: error.message,
      });
    }
  }
}

export { ServiceController };
