import { optimizelySDKKey, features } from '../../config';

var optimizelySdk = require('@optimizely/optimizely-sdk');
var optimizelyClientInstance = optimizelySdk.createInstance({
    sdkKey: optimizelySDKKey,
    datafileOptions: {
        autoUpdate: true,
        updateInterval: 1 * 1000 // 1 second in milliseconds
    }
});

export async function getFeatureFlag(userId, email) {
    await optimizelyClientInstance.onReady();
    let featureFlag = {}, randomUserId = userId || 'userId', attributes = { userId: userId || '', email: email || '' };
    if (features.length > 0)
        features.map(feature => featureFlag[feature.key] = optimizelyClientInstance.isFeatureEnabled(feature.name, randomUserId, attributes));
    return featureFlag;
}