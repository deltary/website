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


export const addDays = (date, days) => {
  date.setDate(date.getDate() + days);
  return date;
}

export const subDays = (date, days) => addDays(date, -days);

export const setDay = (date, day) => addDays(date, day - (date.getDay() || 7));

export const startOfDay = (date) => new Date(date.toDateString());

export const addMonths = (date, months) => {
  date.setMonth(date.getMonth() + months);
  return date;
}

export const subMonths = (date, months) => addMonths(date, -months);

export const startOfMonth = (date) => new Date(startOfDay(date).setDate(1));

export const endOfMonth = (date) => startOfMonth(addMonths(new Date(date.setDate(15)), 1));

export const addYears = (date, years) => {
  date.setFullYear(date.getFullYear() + years);
  return date;
}

export const subYears = (date, years) => addYears(date, -years);

export const calendarPageRange = (date) => [
  setDay(startOfMonth(date), 1),
  setDay(subDays(endOfMonth(date), 1), 7)
]
