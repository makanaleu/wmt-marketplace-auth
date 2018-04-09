# wmt-marketplace-auth

![npm](https://img.shields.io/npm/v/wmt-marketplace-auth.svg) ![license](https://img.shields.io/npm/l/wmt-marketplace-auth.svg) ![github-issues](https://img.shields.io/github/issues/makanaleu/wmt-marketplace-auth.svg)

Generate the authentication headers required by Walmart Marketplace API.

![nodei.co](https://nodei.co/npm/wmt-marketplace-auth.png?downloads=true&downloadRank=true&stars=true)

![stars](https://img.shields.io/github/stars/makanaleu/wmt-marketplace-auth.svg)
![forks](https://img.shields.io/github/forks/makanaleu/wmt-marketplace-auth.svg)

![](https://david-dm.org/makanaleu/wmt-marketplace-auth/status.svg)
![](https://david-dm.org/makanaleu/wmt-marketplace-auth/dev-status.svg)

## Features

- Returns the required authentication headers including the digital signature.
- Defaults the `Accept` and `Content-Type` headers to `application/json`, which can be changed to `application/xml` if XML is preferred.
- Timestamp can be directly set or default to current time.

## Typical Usage

Set the custom headers, then use `Authenticate.sign()` for the specified request.

```javascript
import { Authenticate } from 'wmt-marketplace-auth';

let headers = new Authenticate.Custom;
headers.setCorrelationId('1234hfvgtr');
headers.setConsumer({
    Channel: { Type: '38b7eb6c-3672-4022-93a2-f47794f36338' },
    ConsumerId: 'f091ae58-774c-45ff-9d8a-e30a83344e42'
});

let request = {
  RequestUrl: 'https://marketplace.walmartapis.com/v3/feeds',
  PrivateKey: 'MIIBVgIBADANBgkqhkiG9w0BAQEFAASCAUAwggE8A...',
  RequestMethod: 'GET'
}

let signedHeaders = Authenticate.sign(headers, request);
```

Outputs Authentication headers as an object.

```json
{
  "WM_SVC.NAME": "Walmart Marketplace",
  "WM_QOS.CORRELATION_ID": "1234hfvgtr",
  "WM_SEC.TIMESTAMP": 1523287838530,
  "WM_SEC.AUTH_SIGNATURE": "E1EPWiqwuLYceSVr2XGmljo7qq1+EDI5++1XvFcVf+/klas+mLMAJbDihfAwkjyDxi3WkJDdTCNfle0O+4V/9g==",
  "WM_CONSUMER.CHANNEL.TYPE": "38b7eb6c-3672-4022-93a2-f47794f36338",
  "WM_CONSUMER.ID": "f091ae58-774c-45ff-9d8a-e30a83344e42",
  "Accept": "application/json",
  "Content-Type": "application/json"
}
```

## Options

#### Change the `Accept` or `Content-Type` headers from JSON to XML.

```javascript
headers.Accept = 'application/xml';
headers.ContentType = 'application/xml';
```

#### Set a custom timestamp.

```javascript
headers.setTimestamp(1523287838530);
```

## Install

`npm install --save wmt-marketplace-auth`

## Scripts

 - **npm run build** : `rimraf ./lib/ && tsc -p .`
 - **npm run readme** : `rm ./README.md && node ./node_modules/.bin/node-readme`
 - **npm run test** : `mocha --require ts-node/register $(find ./test/ -name "*.spec.ts")`

## Dependencies

Package | Version | Dev
--- |:---:|:---:
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
[node-readme](https://www.npmjs.com/package/node-readme) | 0.1.9 | ✔


## Contributing

We are always excited when we can make our projects open source and allow contributors to build and work on these components. To make this possible, there are a few things we kindly ask all contributors to understand and follow. Please review the [Contributing Guide](https://www.makanal.eu/contributors/).

## Author

Kane McConnell <kane@makanal.eu>

## License

 - **MIT** : http://opensource.org/licenses/MIT
