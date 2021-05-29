import 'reflect-metadata';
import app from './server';

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server linener in port ${port}`));
