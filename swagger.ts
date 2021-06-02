export default {
  swagger: '2.0',
  info: {
    description: 'Api AfyaDos',
    version: '0.0.1',
    title: 'API AfyaDos',
    contact: { email: 'afyados@gmail.com' },
  },
  host: 'localhost:5000/documentation',
  schemes: [
    'https',
    'http',
  ],
  paths: {
    '/users': {
      get: {
        tags: [
          'Users',
        ],
        summary: 'Retorna os usuários da base',
        description: 'Você deve estar autenticado para usar esta rota',
        operationId: 'addPet',
        consumes: [
          'application/json',
        ],
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              type: 'array',
              items: { $ref: '#/definitions/Users' },
            },
          },
          401: { description: 'Usuário não autenticado' },
        },
      },
      post: {
        tags: [
          'Users',
        ],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Você deve passar o email e password no body',
            required: true,
            schema: { $ref: '#/definitions/CreateUserBody' },
          },
        ],
        summary: 'Cadastra um usuário na base',
        description: '',
        operationId: 'add',
        consumes: [
          'application/json',
        ],
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              type: 'array',
              items: { $ref: '#/definitions/CreateUser' },
            },
          },
          409: { description: 'Usuário já cadastrado' },
        },
      },
    },
    '/login': {
      post: {
        tags: [
          'Login',
        ],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Você deve passar o email e password no body',
            required: true,
            schema: { $ref: '#/definitions/LoginBody' },
          },
        ],
        summary: 'Realiza o login da aplicação',
        description: '',
        operationId: 'login',
        consumes: [
          'application/json',
        ],
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              type: 'array',
              items: { $ref: '#/definitions/Login' },
            },
          },
          401: { description: 'Usuário não autorizado' },
        },
      },
    },
  },
  securityDefinitions: {
    api_key: {
      type: 'apiKey',
      name: 'api_key',
      in: 'header',
    },
  },
  definitions: {
    Users: {
      type: 'object',
      required: [
        'name',
        'email',
        'password',
      ],
      properties: {
        id: {
          type: 'integr',
          format: 'uuid',
        },
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
      },
      xml: { name: 'Usuario' },
    },
    Login: {
      type: 'object',
      required: [
        'email',
        'password',
      ],
      properties: {
        user: {
          type: 'object',
          id: {
            type: 'integr',
            format: 'uuid',
          },
          name: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' },
        },
        token: { type: 'oauth2' },
      },
      xml: { name: 'Usuario' },
    },
    LoginBody: {
      type: 'object',
      required: [
        'email',
        'password',
      ],
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
      xml: { name: 'Usuario' },
    },
    CreateUser: {
      type: 'object',
      required: [
        'email',
        'password',
      ],
      properties: {
        id: {
          type: 'integr',
          format: 'uuid',
        },
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
      },
      xml: { name: 'Usuario' },
    },
    CreateUserBody: {
      type: 'object',
      required: [
        'email',
        'password',
      ],
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
      },
      xml: { name: 'Usuario' },
    },
  },
  externalDocs: {
    description: 'Find out more about Swagger',
    url: 'http://swagger.io',
  },
};
