// Calendar file for the "Add to calendar" button on the Skelewu teaser.
import type { APIRoute } from 'astro';
import { artist, upcoming } from '../data/site';

export const GET: APIRoute = ({ site }) => {
  const day = upcoming.releaseAt.slice(0, 10).replaceAll('-', '');
  const next = new Date(`${upcoming.releaseAt.slice(0, 10)}T00:00:00Z`);
  next.setUTCDate(next.getUTCDate() + 1);
  const nextDay = next.toISOString().slice(0, 10).replaceAll('-', '');
  const url = new URL('/#skelewu', site).href;
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//LOP3Z//Release//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:skelewu-${day}@lop3z`,
    'DTSTAMP:20261003T000000Z',
    `DTSTART;VALUE=DATE:${day}`,
    `DTEND;VALUE=DATE:${nextDay}`,
    `SUMMARY:${artist.name} – “${upcoming.title}” out now`,
    `DESCRIPTION:New single from ${artist.name}. Stream it: ${url}`,
    `URL:${url}`,
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ].join('\r\n');
  return new Response(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="lop3z-skelewu.ics"',
    },
  });
};
