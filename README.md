<div align="center">
	<img src="https://github.com/techmmunity/compass/raw/master/resources/logo.gif" width="300" height="300">
</div>

<div align="center">

# Techmmunity - Compass

<a href="https://www.codefactor.io/repository/github/techmmunity/compass">
	<img src="https://www.codefactor.io/repository/github/techmmunity/compass/badge" alt="CodeFactor">
</a>
<a href="https://deepscan.io/dashboard#view=project&tid=13883&pid=18101&bid=434906">
	<img src="https://deepscan.io/api/teams/13883/projects/18101/branches/434906/badge/grade.svg" alt="DeepScan">
</a>
<a href="https://coveralls.io/github/techmmunity/compass?branch=master">
	<img src="https://coveralls.io/repos/github/techmmunity/compass/badge.svg?branch=master" alt="Coveralls">
</a>
<a href="https://github.com/techmmunity/compass/actions/workflows/coverage.yml">
	<img src="https://github.com/techmmunity/compass/actions/workflows/coverage.yml/badge.svg" alt="Tests">
</a>
<a href="https://www.npmjs.com/package/@techmmunity/compass">
	<img src="https://img.shields.io/npm/v/@techmmunity/compass.svg?color=CC3534" alt="Npm">
</a>
<a href="https://www.npmjs.com/package/@techmmunity/compass">
	<img src="https://img.shields.io/npm/dw/@techmmunity/compass.svg" alt="Downloads">
</a>

## ALERT: THIS IS UNDER DEVELOPMENT AND TESTING. WE DO NOT RECOMMEND USE THIS IN PRODUCTION YET!!!

<!--
Once that the message of development and testing be removed,
uncomment this

<br>
<br>
-->

</div>

Compass is an [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping) based on [TypeORM syntax](https://github.com/typeorm/typeorm) and [ESLint plugable approach](https://eslint.org/). Our intention here is standardize the connection and implementation of **every database** with the best performance possible, and for this, we use an plugable approach, so more people can contribute and create their on integration. This package alone can't do anything besides typing, the plugins do all the "dirt work".

Currently it only works with TypeScript (and transpiled JavaScript), and we plan to keep this way.

[![Discord Badge](https://img.shields.io/badge/join%20our%20community-7289DA?style=for-the-badge&labelColor=7289DA&logo=discord&logoColor=white)](https://discord.gg/qCJXz6P4qw)

## Why use Techmmunity Compass?

- Easy to use and standardize. Regardless of the database, the implementation will be the same in all cases (except the most complex ones).
- The plugable approach. With the community support, this ORM can work with **all** the databases, be they NoSQL or SQL, as long as it has a plugin for it.

## Install and Config

With Yarn:

```sh
yarn add @techmmunity/compass \
	reflect-metadata
```

With NPM:

```sh
npm i @techmmunity/compass reflect-metadata --save
```

Configure `tsconfig.json`:

```json
{
	"compilerOptions": {
		"experimentalDecorators": true,
		"emitDecoratorMetadata": true
	}
}
```

## Available Plugins

### [Plugins List](https://www.npmjs.com/search?q=keywords:techmmunity-compass)

All the Compass Plugins have the `techmmunity-compass` tag, so you can easily found all the plugins in [this link](https://www.npmjs.com/search?q=keywords:techmmunity-compass).

### DynamoDB

- [@techmmunity/compass-dynamo](https://github.com/techmmunity/compass-dynamo)

## Usage

Compass only supports the [Data Mapper](https://en.wikipedia.org/wiki/Data_mapper_pattern) pattern, so we can avoid mutability and bad code practices.

```ts
import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	Repository,
} from "@techmmunity/compass";
// All connections from the plugins follow this naming pattern
import { ExampleConnection } from "example-compass-plugin";

const Connection = new ExampleConnection({
	// Connection config here
});

@Entity()
class FooEntity {
	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	bar: string;
}

type FooRepository = Repository<FooEntity>;

const FooRepository = Connection.getRepository(FooEntity);

FooRepository.save({
	bar: "foo",
}).then(...);
```

## Documentation

This is an documentation for the final user, if you want to know how to make a plugin or how to contribute to this project, give a look at [this doc](https://github.com/techmmunity/compass/blob/master/CONTRIBUTING.md).

### Connection

Each plugin has his own connection options, but we recommend to follow at least this base:

#### tableNamingPattern

The naming pattern for the tables. Accept the values: `snake_case`, `PascalCase`, `CamelCase`, `kebab-case`, `UPPER_CASE` and a custom function that receives a string and must return also a string.

#### columnNamingPattern

The naming pattern for the tables. Accept the values: `snake_case`, `PascalCase`, `CamelCase`, `kebab-case`, `UPPER_CASE` and a custom function that receives a string and must return also a string.

#### maxQueryExecutionTime

The maximum time to execute a "query", like a "timeout". Accepts a number.

### Decorators

> TODO

### Repository

> TODO

## Limitations and warnings

- It's **NOT** our focus to ensure that this is a lightweight lib, so if it's necessary, we will add more things that increase the package size, **BUT** we will try our best to keep the size smallest as possible
- You cannot have two class entities with the same name, or it will cause malfunctioning
- Prefix and Suffix aren't applied to SubEntities fields
- The data used to identify the entities are **stored in memory**, so be careful to not have a memory overload (More entities = More memory required), but relax, it's not that much, you can safely have dozens of entities with no significantly memory usage increase. This package is designed to work with micro-services and serverless applications, so you will only have trouble if you use it in a monolithic application.

## How to contribute?

All the details about contributing to the project are [described here](https://github.com/techmmunity/compass/blob/master/CONTRIBUTING.md).

See [here](https://github.com/techmmunity/compass/blob/master/TODO.md) our to-dos.

## Special Thanks

### Contributors

This project exists thanks to all the people who contribute:

### "Cool Kids" who helped with the initial idea

- [Diozin](https://www.linkedin.com/in/diozhn/), who suggested the name "Compass"
- [Zaetic](https://www.linkedin.com/in/joaoggs/), who make our _gorgeous_ logo
- A very special thanks to [Umed Khudoiberdiev](https://github.com/pleerock) and [Attila Oláh](https://github.com/NoNameProvided), how created TypeORM. Without their code, this package would never exists.
