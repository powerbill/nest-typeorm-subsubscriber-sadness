# TypeORM Subscriber Sadness

This repo demonstrates an issue with TypeORM when both `beforeUpdate` and `afterUpdate` subscriber methods are implemented for a single subscriber

## Reproducing

```console
$ yarn install
$ yarn test
```
