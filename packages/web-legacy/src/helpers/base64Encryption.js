import { Base64 } from 'js-base64';

export function encode(request) {
  if (request) {
    return Base64.encode(request);
  } else {
    return null;
  }
}

export function decode(request) {
  if (request) {
    return Base64.decode(request);
  } else {
    return null;
  }
}
