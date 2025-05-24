/*
 * Copyright (c) 2025 Tuomas Ahola <taahol@utu.fi>
 *
 * Permission to use, copy, modify, and distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */


export const getJSON = (url) => {
  if (typeof fetch === 'undefined') {
    return import('https').then(({ get }) => new Promise(
      (resolve, reject) => get(url, (res) => {
        let response = "";
        res.on('data', (chunk) => { response += chunk.toString(); });
        res.on('end', () => { resolve(JSON.parse(response)); });
      }).on('error', (e) => { reject(e); })
    ));
  } else {
    return fetch(url).then((res) => res.ok && res.json());
  }
}
