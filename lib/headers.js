Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Walmart authentication headers. Use the custom class to set custom values to the
 * headers before adding to the request.
 *
 * @see {@link https://developer.walmart.com/#/apicenter/marketPlace/latest#apiAuthentication}
 */
class Custom {
    constructor() {
        this.WMQOS = { CorrelationId: uuid() };
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
    setCorrelationId(correlationId) {
        this.WMQOS = { CorrelationId: correlationId };
    }
}
exports.Custom = Custom;
function getTokenRequestHeaders(custom, credentials) {
    let headers = {
        'WM_SVC.NAME': custom.WMService.Name,
        'WM_QOS.CORRELATION_ID': custom.WMQOS.CorrelationId,
        'Authorization': 'Basic ' + Buffer.from(credentials.ClientID + ':' + credentials.ClientSecret).toString('base64'),
        'Accept': custom.Accept,
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    return headers;
}
exports.getTokenRequestHeaders = getTokenRequestHeaders;
function uuid() {
    return "00000000-0000-4000-8000-000000000000".replace(/0/g, function () { return (0 | Math.random() * 16).toString(16); });
}
exports.uuid = uuid;
//# sourceMappingURL=headers.js.map