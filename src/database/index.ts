import { createConnection } from 'typeorm';

export default createConnection().then(() => console.log('conexão com o db realizada sucesso'));
