# CHANGELOG

## 2019-08-26, Version 2.1.1 (Beta), @kmcconnell

Updated readme.

## 2019-08-26, Version 2.1.0 (Beta), @kmcconnell

Eff. 2019-08-28, Walmart is disabling digital signature based requests and now
requires token based authentication. The Consumer Key and Private Key are
replaced with Client ID and Client Secret.

### Notable Changes

- headers:
  - Changed header compilation according to Token API token request requirements.

## 2018-04-10, Version 1.1.0 (Stable), @kmcconnell

### Notable Changes

- dependencies:
  - Added `uuid` to generate a UUID for a default `CorrelationId`. (Kane McConnell) #5
- headers:
  - `Custom` constructor now sets a UUID as the `CorrelationId`, which can be
    overriden using the `setCorrelationId()` method before each request.
    (Kane McConnell) #5

## 2018-04-09, Version 1.0.1 (Stable), @kmcconnell

### Notable Changes

- README:
  - Regenerated `README.md` after updating sample object notation in commit 94e47ac.
    (Kane McConnell) #2

## 2018-04-09, Version 1.0.0 (Stable), @kmcconnell

Created new module to handle authentication headers and signature for Walmart
Marketplace API SDK.
