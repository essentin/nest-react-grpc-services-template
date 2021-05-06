import AWS from 'aws-sdk';
import { doSpacesAccessKey, doSpacesEndpoint, doSpacesName, doSpacesSecretKey } from '../config';

export const spacesEndpoint = new AWS.Endpoint(doSpacesEndpoint);

export const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: doSpacesAccessKey,
    secretAccessKey: doSpacesSecretKey
});

export const spaceName = doSpacesName;