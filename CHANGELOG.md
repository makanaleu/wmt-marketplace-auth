# CHANGELOG

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
