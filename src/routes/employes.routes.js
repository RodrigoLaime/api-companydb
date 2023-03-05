import { Router } from 'express';
import {
    getEmployes,
    getEmploye,
    createEmployes,
    updateEmployes,
    deleteEmployes
} from '../controllers/employes.controler.js';

const employesRoutes = Router();

employesRoutes.get('/employes', getEmployes);

employesRoutes.get('/employe/:id', getEmploye);

employesRoutes.post('/employes', createEmployes);

employesRoutes.delete('/employes/:id', deleteEmployes);

employesRoutes.patch('/employes/:id', updateEmployes);


export default employesRoutes;