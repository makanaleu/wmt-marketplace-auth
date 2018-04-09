Object.defineProperty(exports, "__esModule", { value: true });
const Util = require("./util");
const crypto_1 = require("crypto");
/**
 * Walmart authentication headers. Use the custom class to set custom values to the
 * headers before adding to the request.
 *
 * @see {@link https://developer.walmart.com/#/apicenter/marketPlace/latest#apiAuthentication}
 */
class Custom {
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
    setCorrelationId(correlationId) {
        this.WMQOS = { CorrelationId: correlationId };
    }
    /**
     * Set the Consumer ID.
     *
     * @param consumer The Walmart Consumer ID from Developer Center required to access
     *                 the API.
     */
    setConsumer(consumer) {
        this.WMConsumer = consumer;
    }
    /**
     * Set the request Timestamp. Note: Resets the AuthSignature to empty string. This
     * method is primarily used by tests. Timestamp is automatically set by sign()
     * method if not otherwise set.
     *
     * @param timestamp Epoch timestamp in milliseconds.
     */
    setTimestamp(timestamp) {
        this.WMSecurity = {
            Timestamp: timestamp,
            AuthSignature: ''
        };
    }
}
exports.Custom = Custom;
/**
 * Returns the signed headers required for the API request.
 *
 * @param custom Walmart authentication headers. Use the custom class to set custom
 *               values to the headers before adding to the request.
 * @param request The request properties required to generate the digital signature.
 */
function sign(custom, request) {
    /**
     * An Epoch timestamp is required for the digital signature.
     */
    let epoch = Util.epochInMilliseconds();
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
    let signature = digitalSignature(custom, request, epoch);
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
    let signedHeaders = {
        'WM_SVC.NAME': custom.WMService.Name,
        'WM_QOS.CORRELATION_ID': custom.WMQOS.CorrelationId,
        'WM_SEC.TIMESTAMP': epoch,
        'WM_SEC.AUTH_SIGNATURE': signature,
        'WM_CONSUMER.CHANNEL.TYPE': custom.WMConsumer.Channel.Type,
        'WM_CONSUMER.ID': custom.WMConsumer.ConsumerId,
        'Accept': custom.Accept,
        'Content-Type': custom.Accept
    };
    return signedHeaders;
}
exports.sign = sign;
/**
 * Generates the digital signature required for the API request.
 *
 * @param custom  Walmart authentication headers. Use the custom class to set custom
 *                values to the headers before adding to the request.
 * @param request The request properties required to generate the digital signature.
 * @param epoch   An Epoch timestamp is required for the digital signature.
 */
function digitalSignature(custom, request, epoch) {
    /**
     * Node Crypto Sign object that uses the given algorithm.
     *
     * @see {@link https://nodejs.org/api/crypto.html#crypto_class_sign}
     */
    const signer = crypto_1.createSign('RSA-SHA256');
    /**
     * Walmart API request string to be signed.
     */
    let stringToSign = custom.WMConsumer.ConsumerId + "\n" + request.RequestUrl + "\n"
        + request.RequestMethod.toUpperCase() + "\n" + epoch + "\n";
    /**
     * Updates the Sign content with the given data.
     * @see {@link https://nodejs.org/api/crypto.html#crypto_sign_update_data_inputencoding}
     */
    signer.update(stringToSign);
    /**
     * Private key wrapped in key header and footer.
     */
    let privateKey = "-----BEGIN PRIVATE KEY-----\n" + request.PrivateKey + "\n-----END PRIVATE KEY-----";
    return signer.sign(privateKey, 'base64');
}
//# sourceMappingURL=headers.js.map