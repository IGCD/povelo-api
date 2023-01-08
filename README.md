<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

# Povelo API
## Description
개발자 포트폴리오 작성을 위한 서비스입니다. 이곳에서 여러분의 포트폴리오를 업데이트하고 배포하세요 !

## Environment
Node: v18.12.1 (lts)
npm: v8.19.2
Prisma: 4.8.1
Typescript
Nest.js

## Structure
```bash
.
├── dist                    # Compiled files
├── logs                    # Log files
├── docs                    # Documents (etc. README.md)
├── prisma                  # Database Schema
├── src                     # Source Files
│   ├── config/             # Configuration env
│   ├── errors/             # Error constants
│   ├── helper/             # Helper functions
│   ├── library/            # Helper classes
│   ├── modules/            # Services
│   ├── providers/          # Externally providers
│   ├── app.module.ts       # Main module
│   └── main.ts             # Bootstrap
└── README.md
```
## Installation

```bash
$ npm install
```

## Schema generate

```bash
$ npx prisma generate
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - srpn
- Website - [https://povelo.ksrpn.com]

## License

Nest is [MIT licensed](LICENSE).
