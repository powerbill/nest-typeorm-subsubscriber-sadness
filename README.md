# TypeORM Subscriber Sadness

This repo demonstrates an [issue](https://github.com/typeorm/typeorm/issues/9948) with TypeORM when both `beforeUpdate` and `afterUpdate` subscriber methods are implemented for a single subscriber

## Reproducing

```console
$ yarn install
$ yarn test
```
