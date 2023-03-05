import express from 'express';
import employesRoutes from './routes/employes.routes.js'
import router from './routes/index.routes.js';

const app = express();

app.use(express.json())

app.use(router);
app.use('/api', employesRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint Not Found'
    })
})

export default app;