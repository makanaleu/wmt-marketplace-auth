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
     * The short-lived token, (which expires after 15 minutes), receiving after
     * using the Token API.
     *
     * Header WM_SEC.ACCESS_TOKEN.
     */
    AccessToken: string;
}
/**
 * Walmart authentication headers. Use the custom class to set custom values to the
 * headers before adding to the request.
 *
 * @see {@link https://developer.walmart.com/#/apicenter/marketPlace/latest#apiAuthentication}
 */
export declare class Custom {
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
     *
     */
    WMSecurity: WMSecurity;
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
    constructor();
    /**
     * Set the vendor's Correlation ID.
     *
     * @param correlationId A unique ID to correlate a vendor's calls with the Walmart
     *                      system.
     */
    setCorrelationId(correlationId: string): void;
}
/**
 * The Token API request headers compiled according to the API specs.
 */
export interface TokenRequestHeaders {
    'WM_SVC.NAME': string;
    'WM_QOS.CORRELATION_ID': string;
    'Authorization': string;
    'Accept': string;
    'Content-Type': string;
}
/**
 * The standard request headers including the granted access token.
 */
export interface TokenHeaders extends TokenRequestHeaders {
    'WM_SEC.ACCESS_TOKEN': string;
}
export interface Credentials {
    /**
     * The API ClientID, provided by Walmart.
     */
    ClientID: string;
    /**
     * The API ClientSecret, provided by Walmart.
     */
    ClientSecret: string;
}
export interface TokenResponse {
    'access_token': string;
    'token_type': string;
    'expires_in': number;
}
export declare function getTokenRequestHeaders(custom: Custom, credentials: Credentials): TokenRequestHeaders;
export declare function uuid(): string;
