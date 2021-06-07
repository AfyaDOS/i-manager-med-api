import { Router } from 'express';
import { MedRecordController } from '../../controllers/MedRecordController';

const routesMedRecord = Router();

const medRecordController = new MedRecordController();

routesMedRecord.post('/create', medRecordController.set);
routesMedRecord.get('/get/:id', medRecordController.getByClient);
routesMedRecord.put('/update/:id', medRecordController.update);
routesMedRecord.delete('/delete/:id', medRecordController.delete);

export { routesMedRecord };
