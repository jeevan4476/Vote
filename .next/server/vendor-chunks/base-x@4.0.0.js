"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/base-x@4.0.0";
exports.ids = ["vendor-chunks/base-x@4.0.0"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/base-x@4.0.0/node_modules/base-x/src/index.js":
/*!**************************************************************************!*\
  !*** ./node_modules/.pnpm/base-x@4.0.0/node_modules/base-x/src/index.js ***!
  \**************************************************************************/
/***/ ((module) => {

eval("\n// base-x encoding / decoding\n// Copyright (c) 2018 base-x contributors\n// Copyright (c) 2014-2018 The Bitcoin Core developers (base58.cpp)\n// Distributed under the MIT software license, see the accompanying\n// file LICENSE or http://www.opensource.org/licenses/mit-license.php.\nfunction base (ALPHABET) {\n  if (ALPHABET.length >= 255) { throw new TypeError('Alphabet too long') }\n  var BASE_MAP = new Uint8Array(256)\n  for (var j = 0; j < BASE_MAP.length; j++) {\n    BASE_MAP[j] = 255\n  }\n  for (var i = 0; i < ALPHABET.length; i++) {\n    var x = ALPHABET.charAt(i)\n    var xc = x.charCodeAt(0)\n    if (BASE_MAP[xc] !== 255) { throw new TypeError(x + ' is ambiguous') }\n    BASE_MAP[xc] = i\n  }\n  var BASE = ALPHABET.length\n  var LEADER = ALPHABET.charAt(0)\n  var FACTOR = Math.log(BASE) / Math.log(256) // log(BASE) / log(256), rounded up\n  var iFACTOR = Math.log(256) / Math.log(BASE) // log(256) / log(BASE), rounded up\n  function encode (source) {\n    if (source instanceof Uint8Array) {\n    } else if (ArrayBuffer.isView(source)) {\n      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength)\n    } else if (Array.isArray(source)) {\n      source = Uint8Array.from(source)\n    }\n    if (!(source instanceof Uint8Array)) { throw new TypeError('Expected Uint8Array') }\n    if (source.length === 0) { return '' }\n        // Skip & count leading zeroes.\n    var zeroes = 0\n    var length = 0\n    var pbegin = 0\n    var pend = source.length\n    while (pbegin !== pend && source[pbegin] === 0) {\n      pbegin++\n      zeroes++\n    }\n        // Allocate enough space in big-endian base58 representation.\n    var size = ((pend - pbegin) * iFACTOR + 1) >>> 0\n    var b58 = new Uint8Array(size)\n        // Process the bytes.\n    while (pbegin !== pend) {\n      var carry = source[pbegin]\n            // Apply \"b58 = b58 * 256 + ch\".\n      var i = 0\n      for (var it1 = size - 1; (carry !== 0 || i < length) && (it1 !== -1); it1--, i++) {\n        carry += (256 * b58[it1]) >>> 0\n        b58[it1] = (carry % BASE) >>> 0\n        carry = (carry / BASE) >>> 0\n      }\n      if (carry !== 0) { throw new Error('Non-zero carry') }\n      length = i\n      pbegin++\n    }\n        // Skip leading zeroes in base58 result.\n    var it2 = size - length\n    while (it2 !== size && b58[it2] === 0) {\n      it2++\n    }\n        // Translate the result into a string.\n    var str = LEADER.repeat(zeroes)\n    for (; it2 < size; ++it2) { str += ALPHABET.charAt(b58[it2]) }\n    return str\n  }\n  function decodeUnsafe (source) {\n    if (typeof source !== 'string') { throw new TypeError('Expected String') }\n    if (source.length === 0) { return new Uint8Array() }\n    var psz = 0\n        // Skip and count leading '1's.\n    var zeroes = 0\n    var length = 0\n    while (source[psz] === LEADER) {\n      zeroes++\n      psz++\n    }\n        // Allocate enough space in big-endian base256 representation.\n    var size = (((source.length - psz) * FACTOR) + 1) >>> 0 // log(58) / log(256), rounded up.\n    var b256 = new Uint8Array(size)\n        // Process the characters.\n    while (source[psz]) {\n            // Decode character\n      var carry = BASE_MAP[source.charCodeAt(psz)]\n            // Invalid character\n      if (carry === 255) { return }\n      var i = 0\n      for (var it3 = size - 1; (carry !== 0 || i < length) && (it3 !== -1); it3--, i++) {\n        carry += (BASE * b256[it3]) >>> 0\n        b256[it3] = (carry % 256) >>> 0\n        carry = (carry / 256) >>> 0\n      }\n      if (carry !== 0) { throw new Error('Non-zero carry') }\n      length = i\n      psz++\n    }\n        // Skip leading zeroes in b256.\n    var it4 = size - length\n    while (it4 !== size && b256[it4] === 0) {\n      it4++\n    }\n    var vch = new Uint8Array(zeroes + (size - it4))\n    var j = zeroes\n    while (it4 !== size) {\n      vch[j++] = b256[it4++]\n    }\n    return vch\n  }\n  function decode (string) {\n    var buffer = decodeUnsafe(string)\n    if (buffer) { return buffer }\n    throw new Error('Non-base' + BASE + ' character')\n  }\n  return {\n    encode: encode,\n    decodeUnsafe: decodeUnsafe,\n    decode: decode\n  }\n}\nmodule.exports = base\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vYmFzZS14QDQuMC4wL25vZGVfbW9kdWxlcy9iYXNlLXgvc3JjL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0Esa0JBQWtCLHFCQUFxQjtBQUN2QztBQUNBO0FBQ0Esa0JBQWtCLHFCQUFxQjtBQUN2QztBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLDJDQUEyQztBQUMzQywrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiw2Q0FBNkM7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFlBQVksU0FBUztBQUNoQztBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEMsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0EsK0JBQStCLDZDQUE2QztBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RlbXBsYXRlLW5leHQtdGFpbHdpbmQtY291bnRlci8uL25vZGVfbW9kdWxlcy8ucG5wbS9iYXNlLXhANC4wLjAvbm9kZV9tb2R1bGVzL2Jhc2UteC9zcmMvaW5kZXguanM/Y2M1MyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcbi8vIGJhc2UteCBlbmNvZGluZyAvIGRlY29kaW5nXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTggYmFzZS14IGNvbnRyaWJ1dG9yc1xuLy8gQ29weXJpZ2h0IChjKSAyMDE0LTIwMTggVGhlIEJpdGNvaW4gQ29yZSBkZXZlbG9wZXJzIChiYXNlNTguY3BwKVxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIE1JVCBzb2Z0d2FyZSBsaWNlbnNlLCBzZWUgdGhlIGFjY29tcGFueWluZ1xuLy8gZmlsZSBMSUNFTlNFIG9yIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwLlxuZnVuY3Rpb24gYmFzZSAoQUxQSEFCRVQpIHtcbiAgaWYgKEFMUEhBQkVULmxlbmd0aCA+PSAyNTUpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQWxwaGFiZXQgdG9vIGxvbmcnKSB9XG4gIHZhciBCQVNFX01BUCA9IG5ldyBVaW50OEFycmF5KDI1NilcbiAgZm9yICh2YXIgaiA9IDA7IGogPCBCQVNFX01BUC5sZW5ndGg7IGorKykge1xuICAgIEJBU0VfTUFQW2pdID0gMjU1XG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBBTFBIQUJFVC5sZW5ndGg7IGkrKykge1xuICAgIHZhciB4ID0gQUxQSEFCRVQuY2hhckF0KGkpXG4gICAgdmFyIHhjID0geC5jaGFyQ29kZUF0KDApXG4gICAgaWYgKEJBU0VfTUFQW3hjXSAhPT0gMjU1KSB7IHRocm93IG5ldyBUeXBlRXJyb3IoeCArICcgaXMgYW1iaWd1b3VzJykgfVxuICAgIEJBU0VfTUFQW3hjXSA9IGlcbiAgfVxuICB2YXIgQkFTRSA9IEFMUEhBQkVULmxlbmd0aFxuICB2YXIgTEVBREVSID0gQUxQSEFCRVQuY2hhckF0KDApXG4gIHZhciBGQUNUT1IgPSBNYXRoLmxvZyhCQVNFKSAvIE1hdGgubG9nKDI1NikgLy8gbG9nKEJBU0UpIC8gbG9nKDI1NiksIHJvdW5kZWQgdXBcbiAgdmFyIGlGQUNUT1IgPSBNYXRoLmxvZygyNTYpIC8gTWF0aC5sb2coQkFTRSkgLy8gbG9nKDI1NikgLyBsb2coQkFTRSksIHJvdW5kZWQgdXBcbiAgZnVuY3Rpb24gZW5jb2RlIChzb3VyY2UpIHtcbiAgICBpZiAoc291cmNlIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xuICAgIH0gZWxzZSBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KHNvdXJjZSkpIHtcbiAgICAgIHNvdXJjZSA9IG5ldyBVaW50OEFycmF5KHNvdXJjZS5idWZmZXIsIHNvdXJjZS5ieXRlT2Zmc2V0LCBzb3VyY2UuYnl0ZUxlbmd0aClcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoc291cmNlKSkge1xuICAgICAgc291cmNlID0gVWludDhBcnJheS5mcm9tKHNvdXJjZSlcbiAgICB9XG4gICAgaWYgKCEoc291cmNlIGluc3RhbmNlb2YgVWludDhBcnJheSkpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgVWludDhBcnJheScpIH1cbiAgICBpZiAoc291cmNlLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gJycgfVxuICAgICAgICAvLyBTa2lwICYgY291bnQgbGVhZGluZyB6ZXJvZXMuXG4gICAgdmFyIHplcm9lcyA9IDBcbiAgICB2YXIgbGVuZ3RoID0gMFxuICAgIHZhciBwYmVnaW4gPSAwXG4gICAgdmFyIHBlbmQgPSBzb3VyY2UubGVuZ3RoXG4gICAgd2hpbGUgKHBiZWdpbiAhPT0gcGVuZCAmJiBzb3VyY2VbcGJlZ2luXSA9PT0gMCkge1xuICAgICAgcGJlZ2luKytcbiAgICAgIHplcm9lcysrXG4gICAgfVxuICAgICAgICAvLyBBbGxvY2F0ZSBlbm91Z2ggc3BhY2UgaW4gYmlnLWVuZGlhbiBiYXNlNTggcmVwcmVzZW50YXRpb24uXG4gICAgdmFyIHNpemUgPSAoKHBlbmQgLSBwYmVnaW4pICogaUZBQ1RPUiArIDEpID4+PiAwXG4gICAgdmFyIGI1OCA9IG5ldyBVaW50OEFycmF5KHNpemUpXG4gICAgICAgIC8vIFByb2Nlc3MgdGhlIGJ5dGVzLlxuICAgIHdoaWxlIChwYmVnaW4gIT09IHBlbmQpIHtcbiAgICAgIHZhciBjYXJyeSA9IHNvdXJjZVtwYmVnaW5dXG4gICAgICAgICAgICAvLyBBcHBseSBcImI1OCA9IGI1OCAqIDI1NiArIGNoXCIuXG4gICAgICB2YXIgaSA9IDBcbiAgICAgIGZvciAodmFyIGl0MSA9IHNpemUgLSAxOyAoY2FycnkgIT09IDAgfHwgaSA8IGxlbmd0aCkgJiYgKGl0MSAhPT0gLTEpOyBpdDEtLSwgaSsrKSB7XG4gICAgICAgIGNhcnJ5ICs9ICgyNTYgKiBiNThbaXQxXSkgPj4+IDBcbiAgICAgICAgYjU4W2l0MV0gPSAoY2FycnkgJSBCQVNFKSA+Pj4gMFxuICAgICAgICBjYXJyeSA9IChjYXJyeSAvIEJBU0UpID4+PiAwXG4gICAgICB9XG4gICAgICBpZiAoY2FycnkgIT09IDApIHsgdGhyb3cgbmV3IEVycm9yKCdOb24temVybyBjYXJyeScpIH1cbiAgICAgIGxlbmd0aCA9IGlcbiAgICAgIHBiZWdpbisrXG4gICAgfVxuICAgICAgICAvLyBTa2lwIGxlYWRpbmcgemVyb2VzIGluIGJhc2U1OCByZXN1bHQuXG4gICAgdmFyIGl0MiA9IHNpemUgLSBsZW5ndGhcbiAgICB3aGlsZSAoaXQyICE9PSBzaXplICYmIGI1OFtpdDJdID09PSAwKSB7XG4gICAgICBpdDIrK1xuICAgIH1cbiAgICAgICAgLy8gVHJhbnNsYXRlIHRoZSByZXN1bHQgaW50byBhIHN0cmluZy5cbiAgICB2YXIgc3RyID0gTEVBREVSLnJlcGVhdCh6ZXJvZXMpXG4gICAgZm9yICg7IGl0MiA8IHNpemU7ICsraXQyKSB7IHN0ciArPSBBTFBIQUJFVC5jaGFyQXQoYjU4W2l0Ml0pIH1cbiAgICByZXR1cm4gc3RyXG4gIH1cbiAgZnVuY3Rpb24gZGVjb2RlVW5zYWZlIChzb3VyY2UpIHtcbiAgICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gJ3N0cmluZycpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgU3RyaW5nJykgfVxuICAgIGlmIChzb3VyY2UubGVuZ3RoID09PSAwKSB7IHJldHVybiBuZXcgVWludDhBcnJheSgpIH1cbiAgICB2YXIgcHN6ID0gMFxuICAgICAgICAvLyBTa2lwIGFuZCBjb3VudCBsZWFkaW5nICcxJ3MuXG4gICAgdmFyIHplcm9lcyA9IDBcbiAgICB2YXIgbGVuZ3RoID0gMFxuICAgIHdoaWxlIChzb3VyY2VbcHN6XSA9PT0gTEVBREVSKSB7XG4gICAgICB6ZXJvZXMrK1xuICAgICAgcHN6KytcbiAgICB9XG4gICAgICAgIC8vIEFsbG9jYXRlIGVub3VnaCBzcGFjZSBpbiBiaWctZW5kaWFuIGJhc2UyNTYgcmVwcmVzZW50YXRpb24uXG4gICAgdmFyIHNpemUgPSAoKChzb3VyY2UubGVuZ3RoIC0gcHN6KSAqIEZBQ1RPUikgKyAxKSA+Pj4gMCAvLyBsb2coNTgpIC8gbG9nKDI1NiksIHJvdW5kZWQgdXAuXG4gICAgdmFyIGIyNTYgPSBuZXcgVWludDhBcnJheShzaXplKVxuICAgICAgICAvLyBQcm9jZXNzIHRoZSBjaGFyYWN0ZXJzLlxuICAgIHdoaWxlIChzb3VyY2VbcHN6XSkge1xuICAgICAgICAgICAgLy8gRGVjb2RlIGNoYXJhY3RlclxuICAgICAgdmFyIGNhcnJ5ID0gQkFTRV9NQVBbc291cmNlLmNoYXJDb2RlQXQocHN6KV1cbiAgICAgICAgICAgIC8vIEludmFsaWQgY2hhcmFjdGVyXG4gICAgICBpZiAoY2FycnkgPT09IDI1NSkgeyByZXR1cm4gfVxuICAgICAgdmFyIGkgPSAwXG4gICAgICBmb3IgKHZhciBpdDMgPSBzaXplIC0gMTsgKGNhcnJ5ICE9PSAwIHx8IGkgPCBsZW5ndGgpICYmIChpdDMgIT09IC0xKTsgaXQzLS0sIGkrKykge1xuICAgICAgICBjYXJyeSArPSAoQkFTRSAqIGIyNTZbaXQzXSkgPj4+IDBcbiAgICAgICAgYjI1NltpdDNdID0gKGNhcnJ5ICUgMjU2KSA+Pj4gMFxuICAgICAgICBjYXJyeSA9IChjYXJyeSAvIDI1NikgPj4+IDBcbiAgICAgIH1cbiAgICAgIGlmIChjYXJyeSAhPT0gMCkgeyB0aHJvdyBuZXcgRXJyb3IoJ05vbi16ZXJvIGNhcnJ5JykgfVxuICAgICAgbGVuZ3RoID0gaVxuICAgICAgcHN6KytcbiAgICB9XG4gICAgICAgIC8vIFNraXAgbGVhZGluZyB6ZXJvZXMgaW4gYjI1Ni5cbiAgICB2YXIgaXQ0ID0gc2l6ZSAtIGxlbmd0aFxuICAgIHdoaWxlIChpdDQgIT09IHNpemUgJiYgYjI1NltpdDRdID09PSAwKSB7XG4gICAgICBpdDQrK1xuICAgIH1cbiAgICB2YXIgdmNoID0gbmV3IFVpbnQ4QXJyYXkoemVyb2VzICsgKHNpemUgLSBpdDQpKVxuICAgIHZhciBqID0gemVyb2VzXG4gICAgd2hpbGUgKGl0NCAhPT0gc2l6ZSkge1xuICAgICAgdmNoW2orK10gPSBiMjU2W2l0NCsrXVxuICAgIH1cbiAgICByZXR1cm4gdmNoXG4gIH1cbiAgZnVuY3Rpb24gZGVjb2RlIChzdHJpbmcpIHtcbiAgICB2YXIgYnVmZmVyID0gZGVjb2RlVW5zYWZlKHN0cmluZylcbiAgICBpZiAoYnVmZmVyKSB7IHJldHVybiBidWZmZXIgfVxuICAgIHRocm93IG5ldyBFcnJvcignTm9uLWJhc2UnICsgQkFTRSArICcgY2hhcmFjdGVyJylcbiAgfVxuICByZXR1cm4ge1xuICAgIGVuY29kZTogZW5jb2RlLFxuICAgIGRlY29kZVVuc2FmZTogZGVjb2RlVW5zYWZlLFxuICAgIGRlY29kZTogZGVjb2RlXG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gYmFzZVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/base-x@4.0.0/node_modules/base-x/src/index.js\n");

/***/ })

};
;