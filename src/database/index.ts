import { createConnection } from 'typeorm'

createConnection().then(() => console.log('conexão com o db realizada sucesso'))