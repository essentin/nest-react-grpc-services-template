import { inspect } from 'util';

// Server side redux action logger
export default function createLogger() {
  // eslint-disable-next-line no-unused-vars
  let d = new Date();
  let h = d.getHours();
  let m = d.getMinutes();
  let s = d.getSeconds();
  let ms = d.getMilliseconds();
  let stamp = '[' + h + ':' + m + ':' + s + '.' + ms + ']';
  return (store) => (next) => (action) => {
    const formattedPayload = inspect(action.payload, {
      colors: true,
    });
    // not printing messages or currencies to conolse, as it clutters it
    if (  
      action.type !== 'SET_LOCALE_SUCCESS' )
      console.log(stamp, ` ${action.type}: ${formattedPayload}`); // eslint-disable-line no-console
    return next(action);
  };
}
