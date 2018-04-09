import * as Util from './util';
import { createSign, Signer } from 'crypto';

/**
 * WM_SVC Authentication header namespace.
 */
export interface WMService {
  /**
   * Walmart Service Name.
   *
   * Header WM_SVC.NAME.
   */
  Name: string;
}

/**
 * WM_QOS Authentication header namespace.
 */
export interface WMQOS {
  /**
   * A unique ID to correlate a vendor's calls with the Walmart system.
   *
   * Header WM_QOS.CORRELATION_ID.
   */
  CorrelationId: string;
}

/**
 * WM_SEC Authentication header namespace.
 */
export interface WMSecurity {
  /**
   * The Epoch timestamp.
   *
   * Header WM_SEC.TIMESTAMP.
   */
  Timestamp: number;
  /**
   * The vendor's digital signature.
   *
   * Header WM_SEC.AUTH_SIGNATURE.
   */
  AuthSignature: string;
}

/**
 * WM_CONSUMER.CHANNEL Authentication header namespace.
 */
export interface Channel {
  /**
   * A unique ID to track the consumer request by channel. Use the Consumer Channel
   * Type received during onboarding.
   *
   * Header WM_CONSUMER.CHANNEL.TYPE.
   */
  Type: string;
}

/**
 * WM_CONSUMER Authentication header namespace.
 */
export interface WMConsumer {
  /**
   * WM_CONSUMER.CHANNEL Authentication header namespace.
   */
  Channel: Channel;
  /**
   * The Walmart Consumer ID from Developer Center required to access the API.
   *
   * Header WM_CONSUMER.ID.
   */
  ConsumerId: string;
}

/**
 * Walmart authentication headers. Use the custom class to set custom values to the
 * headers before adding to the request.
 *
 * @see {@link https://developer.walmart.com/#/apicenter/marketPlace/latest#apiAuthentication}
 */
export class Custom {
  /**
   * WM_SVC Authentication headers.
   */
  WMService: WMService;
  /**
   * WM_QOS Authentication headers.
   */
  WMQOS: WMQOS;
  /**
   * WM_SEC Authentication headers.
   */
  WMSecurity: WMSecurity;
  /**
   * WM_CONSUMER Authentication headers.
   */
  WMConsumer: WMConsumer;
  /**
   * The desired returned data format of the response. May override the default to
   * 'application/xml' if an XML response is preferred instead of JSON.
   */
  Accept: string;
  /**
   * The data format used in the request. May override the default to
   * 'application/xml' if an XML response is preferred instead of JSON.
   */
  ContentType: string;

  constructor() {
    this.WMService = { Name: 'Walmart Marketplace' };
    this.Accept = 'application/json';
    this.ContentType = 'application/json';
  }

  /**
   * Set the vendor's Correlation ID.
   *
   * @param correlationId A unique ID to correlate a vendor's calls with the Walmart
   *                      system.
   */
  setCorrelationId(correlationId: string): void {
    this.WMQOS = { CorrelationId: correlationId };
  }

  /**
   * Set the Consumer ID.
   *
   * @param consumer The Walmart Consumer ID from Developer Center required to access
   *                 the API.
   */
  setConsumer(consumer: WMConsumer): void {
    this.WMConsumer = consumer;
  }

  /**
   * Set the request Timestamp. Note: Resets the AuthSignature to empty string. This
   * method is primarily used by tests. Timestamp is automatically set by sign()
   * method if not otherwise set.
   *
   * @param timestamp Epoch timestamp in milliseconds.
   */
  setTimestamp(timestamp: number): void {
    this.WMSecurity = {
      Timestamp: timestamp,
      AuthSignature: ''
    }
  }
}

/**
 * The API request headers compiled according to the API spec, including the required
 * digital signature.
 */
export interface Signed {
  'WM_SVC.NAME': string;
  'WM_QOS.CORRELATION_ID': string;
  'WM_SEC.TIMESTAMP': number;
  'WM_SEC.AUTH_SIGNATURE': string;
  'WM_CONSUMER.CHANNEL.TYPE': string;
  'WM_CONSUMER.ID': string;
  'Accept': string;
  'Content-Type': string;
}

/**
 * The request properties required to generate the digital signature.
 */
export interface DigitalSignatureRequest {
  /**
   * The full URL to call, including path and query parameters.
   */
  RequestUrl: string;
  /**
   * The vendor's Base-64-encoded, PKCS#8 stored Private Key.
   */
  PrivateKey: string;
  /**
   * The HTTP request method used, in capital letters (i.e. GET, POST).
   */
  RequestMethod: string;
}

/**
 * Returns the signed headers required for the API request.
 *
 * @param custom Walmart authentication headers. Use the custom class to set custom
 *               values to the headers before adding to the request.
 * @param request The request properties required to generate the digital signature.
 */
export function sign(custom: Custom, request: DigitalSignatureRequest): Signed {
  /**
   * An Epoch timestamp is required for the digital signature.
   */
  let epoch: number = Util.epochInMilliseconds();
  /**
   * Override the generated Epoch timestamp if a timestamp was included in the
   * custom headers.
   */
  if (custom.WMSecurity && custom.WMSecurity.Timestamp) {
    epoch = custom.WMSecurity.Timestamp;
  }

  /**
   * The generated digital signature.
   */
  let signature: string = digitalSignature(custom, request, epoch);
  /**
   * Override the generated digital signature if a signature was included in the
   * custom headers.
   */
  if (custom.WMSecurity && custom.WMSecurity.AuthSignature) {
    signature = custom.WMSecurity.AuthSignature;
  }
  /**
   * The signed request headers according to Walmart API spec.
   */
  let signedHeaders: Signed = {
    'WM_SVC.NAME': custom.WMService.Name,
    'WM_QOS.CORRELATION_ID': custom.WMQOS.CorrelationId,
    'WM_SEC.TIMESTAMP': epoch,
    'WM_SEC.AUTH_SIGNATURE': signature,
    'WM_CONSUMER.CHANNEL.TYPE': custom.WMConsumer.Channel.Type,
    'WM_CONSUMER.ID': custom.WMConsumer.ConsumerId,
    'Accept': custom.Accept,
    'Content-Type': custom.Accept
  }
  return signedHeaders;
}

/**
 * Generates the digital signature required for the API request.
 *
 * @param custom  Walmart authentication headers. Use the custom class to set custom
 *                values to the headers before adding to the request.
 * @param request The request properties required to generate the digital signature.
 * @param epoch   An Epoch timestamp is required for the digital signature.
 */
function digitalSignature(custom: Custom, request: DigitalSignatureRequest, epoch: number): string {
  /**
   * Node Crypto Sign object that uses the given algorithm.
   *
   * @see {@link https://nodejs.org/api/crypto.html#crypto_class_sign}
   */
  const signer: Signer = createSign('RSA-SHA256');
  /**
   * Walmart API request string to be signed.
   */
  let stringToSign: string = custom.WMConsumer.ConsumerId + "\n" + request.RequestUrl + "\n"
    + request.RequestMethod.toUpperCase() + "\n" + epoch + "\n";
  /**
   * Updates the Sign content with the given data.
   * @see {@link https://nodejs.org/api/crypto.html#crypto_sign_update_data_inputencoding}
   */
  signer.update(stringToSign);
  /**
   * Private key wrapped in key header and footer.
   */
  let privateKey: string = "-----BEGIN PRIVATE KEY-----\n" + request.PrivateKey + "\n-----END PRIVATE KEY-----";

  return signer.sign(privateKey, 'base64');
}
