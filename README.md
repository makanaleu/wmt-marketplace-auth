# wmt-marketplace-auth

![npm](https://img.shields.io/npm/v/wmt-marketplace-auth.svg) ![license](https://img.shields.io/npm/l/wmt-marketplace-auth.svg) ![github-issues](https://img.shields.io/github/issues/makanaleu/wmt-marketplace-auth.svg)

Generate the authentication headers required by Walmart Marketplace API.

![nodei.co](https://nodei.co/npm/wmt-marketplace-auth.png?downloads=true&downloadRank=true&stars=true)

![stars](https://img.shields.io/github/stars/makanaleu/wmt-marketplace-auth.svg)
![forks](https://img.shields.io/github/forks/makanaleu/wmt-marketplace-auth.svg)

![](https://david-dm.org/makanaleu/wmt-marketplace-auth/status.svg)
![](https://david-dm.org/makanaleu/wmt-marketplace-auth/dev-status.svg)

## Features

- Returns the required authentication headers for Walmart Marketplace API.
- Defaults the `Accept` and `Content-Type` headers to `application/json`, which can be changed to `application/xml` if XML is preferred.
- Generates a UUID for the `CorrelationId` if one is not specified for the request.

Outputs Authentication headers as an object.

```json
{
  "WM_SVC.NAME": "Walmart Marketplace",
  "WM_QOS.CORRELATION_ID": "1234hfvgtr",
  "Authorization": "Basic E1EPWiqwuLYceSVr2XGmlj...",
  "Accept": "application/json",
  "Content-Type": "application/x-www-form-urlencoded"
}
```

```json
{
  "WM_SVC.NAME": "Walmart Marketplace",
  "WM_QOS.CORRELATION_ID": "1234hfvgtr",
  "Authorization": "Basic E1EPWiqwuLYceSVr2XGmlj...",
  "Accept": "application/json",
  "Content-Type": "application/json",
  "Access": "eyJraWQiOiIwNjI..."
}
```

## Options

#### Change the `Accept` or `Content-Type` headers from JSON to XML.

```javascript
headers.Accept = 'application/xml';
headers.ContentType = 'application/xml';
```

## Install

`npm install --save wmt-marketplace-auth`

## Scripts

 - **npm run build** : `rimraf ./lib/ && tsc -p .`

## Dependencies

Package | Version | Dev
--- |:---:|:---:
[uuid](https://www.npmjs.com/package/uuid) | 3.2.1 | ✖
[ts-node](https://www.npmjs.com/package/ts-node) | 5.0.1 | ✔
[typescript](https://www.npmjs.com/package/typescript) | 2.8.1 | ✔
[tslint](https://www.npmjs.com/package/tslint) | 5.9.1 | ✔
[mocha](https://www.npmjs.com/package/mocha) | 5.0.5 | ✔
[chai](https://www.npmjs.com/package/chai) | 4.1.2 | ✔
[nyc](https://www.npmjs.com/package/nyc) | 11.6.0 | ✔
[rimraf](https://www.npmjs.com/package/rimraf) | 2.6.2 | ✔
[@types/mocha](https://www.npmjs.com/package/@types/mocha) | 5.0.0 | ✔
[@types/chai](https://www.npmjs.com/package/@types/chai) | 4.1.2 | ✔
[@types/node](https://www.npmjs.com/package/@types/node) | 9.6.2 | ✔
[@types/uuid](https://www.npmjs.com/package/@types/uuid) | 3.4.3 | ✔
[node-readme](https://www.npmjs.com/package/node-readme) | 0.1.9 | ✔


## Contributing

We are always excited when we can make our projects open source and allow contributors to build and work on these components. To make this possible, there are a few things we kindly ask all contributors to understand and follow. Please review the [Contributing Guide](https://www.makanal.eu/contributors/).

## Author

Kane McConnell <kane@makanal.eu>

## License

 - **MIT** : http://opensource.org/licenses/MIT
