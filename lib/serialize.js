'use strict';

var milliseconds = require( 'string-milliseconds' );

/**
 * @method module:cookie.serialize
 * @param  {string}        key
 * @param  {string}        value
 * @param  {object}        options
 * @param  {string|number} [options.MaxAge]
 * @param  {Date}          [options.Expires]
 * @param  {boolean}       [options.HttpOnly=true]
 * @param  {boolean}       [options.Secure=true]
 * @param  {string}        [options.Domain]
 * @param  {string}        [options.Path]
 * @return {string}
 * @example
 * serialize( 'theme', 'light', { Path: '/', MaxAge: 'year', HttpOnly: false } );
 * // -> 'theme=light; Expires=Sun, 08 Sep 2019 10:03:23 GMT; Max-Age=31536000; Secure; Path=/'
 */
function serialize ( key, value, options ) {
  var result = key + '=' + value;
  var MaxAge, Expires;

  if ( typeof options.MaxAge !== 'undefined' || typeof options.Expires !== 'undefined' ) {
    if ( typeof options.MaxAge !== 'undefined' ) {
      MaxAge  = milliseconds( options.MaxAge );
      Expires = new Date( Date.now() + MaxAge );
    } else {
      MaxAge  = options.Expires - Date.now();
      Expires = options.Expires;
    }

    result += '; Expires=' + Expires.toGMTString() + '; Max-Age=' + MaxAge * 0.001;
  }

  if ( typeof options.HttpOnly === 'undefined' || options.HttpOnly ) {
    result += '; HttpOnly';
  }

  if ( typeof options.Secure === 'undefined' || options.Secure ) {
    result += '; Secure';
  }

  if ( typeof options.Domain !== 'undefined' ) {
    result += '; Domain=' + options.Domain;
  }

  if ( typeof options.Path !== 'undefined' ) {
    result += '; Path=' + options.Path;
  }

  return result;
}

module.exports = serialize;
