// ─────────────────────────────────────────────────────────────
//  All editable site content lives here: text, links, singles,
//  videos, contact details. Images live in src/assets/images/.
// ─────────────────────────────────────────────────────────────
import type { ImageMetadata } from 'astro';
import coverOmds from '../assets/images/cover-omds.jpg';
import coverPolo from '../assets/images/cover-polo.jpg';
import coverMata from '../assets/images/cover-mata.jpg';
import coverPayme from '../assets/images/cover-payme.jpg';
import coverSkelewu from '../assets/images/cover-skelewu.jpg';

export const artist = {
  name: 'LOP3Z',
  roles: ['Singer', 'Rapper', 'Songwriter'],
  genre: 'Afropop',
  tagline: 'Afropop with bars, bounce and zero bad energy.',
  statement: 'Leave the bad vibes at the door. Turn it all the way up.',
  bio: [
    'LOP3Z sings, raps and writes her own records: Afropop that hits like a party and sticks like a hook.',
    'Every release is its own world. The feel-good bounce of ‘OMDs’ (Oh My Days, prod. Rhaffy). The swagger of ‘POLO’ with Konga & Bfrans. The courtroom drama of ‘MATA’. The boss energy of ‘PAY ME’.',
    'Next up: ‘Skelewu’. Dance-floor ready, out everywhere 23 October 2026.',
  ],
  handle: '@vibezbylop3z',
  spotifyArtist: 'https://open.spotify.com/artist/6TEycOYjOevjKnp5WN1UjI',
};

// ─── Upcoming release ────────────────────────────────────────
//  The teaser + countdown switch to "Out now" automatically once
//  `releaseAt` passes. Add the Spotify link (and pre-save link, if
//  the distributor gives one) here when they exist.
export const upcoming = {
  title: 'Skelewu',
  releaseAt: '2026-10-23T00:00:00+01:00', // midnight, Lagos time (WAT)
  releaseLabel: 'Friday 23 October 2026',
  cover: coverSkelewu,
  coverAlt:
    'Skelewu cover art: illustrated LOP3Z in a white suit and blue sunglasses DJing at a party, with dancers on either side and a crowd behind.',
  presave: '' as string, // e.g. a pre-save link from the distributor
  spotify: '' as string, // Spotify track link, once it's live
};

export const seo = {
  title: 'LOP3Z — Singer // Rapper // Songwriter | New single “Skelewu” out 23 October',
  description:
    'Official site of LOP3Z, Afropop singer, rapper and songwriter. New single “Skelewu” drops 23 October 2026. Stream OMDs, POLO, MATA and PAY ME, watch the videos, and book LOP3Z for shows.',
  ogImage: '/og-image.jpg',
  ogImageAlt: 'LOP3Z — new single “Skelewu” out 23 October 2026. Cover art shows LOP3Z DJing at a party in a white suit.',
  twitterHandle: '@vibezbylop3z',
  locale: 'en_NG',
};

export interface Single {
  title: string;
  subtitle?: string;
  spotify: string;
  cover?: ImageMetadata;
  coverAlt?: string;
}

export const singles: Single[] = [
  {
    title: 'OMDs',
    subtitle: 'Oh My Days · prod. Rhaffy',
    spotify: 'https://open.spotify.com/track/7g9ydOiV6tTccXO3GE1zqJ',
    cover: coverOmds,
    coverAlt: 'OMDs cover art: LOP3Z on a rope swing, seen from behind, against a lilac sky with birds.',
  },
  {
    title: 'POLO',
    subtitle: 'feat. Konga & Bfrans',
    spotify: 'https://open.spotify.com/track/2MoA5nk5HqjaVn0eWDDswQ',
    cover: coverPolo,
    coverAlt: 'POLO cover art: illustrated LOP3Z in sunglasses between Konga and Bfrans on a red background.',
  },
  {
    title: 'MATA',
    subtitle: 'Single',
    spotify: 'https://open.spotify.com/track/39G3YUemFEYWVJgik9xa3O',
    cover: coverMata,
    coverAlt: 'MATA cover art: illustrated LOP3Z facing a judge in a sepia-toned courtroom.',
  },
  {
    title: 'PAY ME',
    subtitle: 'Single',
    spotify: 'https://open.spotify.com/track/5b3h1PAF103cjujbtPPGBJ',
    cover: coverPayme,
    coverAlt: 'PAY ME cover art: illustrated LOP3Z in a black hat and suspenders at a desk with a cigar, a glass of whisky and stacks of cash.',
  },
];

export interface Video {
  title: string;
  youtubeId: string;
  url: string;
  poster: ImageMetadata;
  posterAlt: string;
}

export const videos: Video[] = [
  {
    title: 'OMDS',
    youtubeId: '1d4_FHZ8UYM',
    url: 'https://youtu.be/1d4_FHZ8UYM',
    poster: coverOmds,
    posterAlt: 'OMDs cover art',
  },
  {
    title: 'POLO',
    youtubeId: 'fzYF8tLOEkY',
    url: 'https://youtu.be/fzYF8tLOEkY',
    poster: coverPolo,
    posterAlt: 'POLO cover art',
  },
  {
    title: 'MATA',
    youtubeId: 'euzFWpzff5M',
    url: 'https://youtu.be/euzFWpzff5M',
    poster: coverMata,
    posterAlt: 'MATA cover art',
  },
];

export const contact = {
  email: 'vibezbylop3z@gmail.com',
  phone: '+2347045907209',
  phoneDisplay: '+234 704 590 7209',
  whatsapp: 'https://wa.me/2347045907209',
  management: 'Neon Records Entertainment',
};

export type IconKey = 'spotify' | 'applemusic' | 'audiomack' | 'instagram' | 'tiktok' | 'youtube' | 'x';

export interface Profile {
  label: string;
  url: string;
  icon: IconKey;
  cta?: string;
}

export const streaming: Profile[] = [
  { label: 'Spotify', url: 'https://open.spotify.com/artist/6TEycOYjOevjKnp5WN1UjI', icon: 'spotify' },
  { label: 'Apple Music', url: 'https://music.apple.com/us/artist/lop3z/1801808605', icon: 'applemusic' },
  { label: 'Audiomack', url: 'https://audiomack.com/vibez-lop3z', icon: 'audiomack' },
];

export const socials: Profile[] = [
  { label: 'Instagram', url: 'https://instagram.com/vibezbylop3z', icon: 'instagram', cta: 'Photos, stories & behind the scenes' },
  { label: 'TikTok', url: 'https://www.tiktok.com/@vibezbylop3z', icon: 'tiktok', cta: 'Dance it, duet it, use the sound' },
  { label: 'YouTube', url: 'https://www.youtube.com/@vibezbylop3z', icon: 'youtube', cta: 'Official videos & visualizers' },
  { label: 'X', url: 'https://x.com/vibezbylop3z', icon: 'x', cta: 'Talk to LOP3Z directly' },
];

export const nav = [
  { label: 'Music', href: '#music' },
  { label: 'Videos', href: '#videos' },
  { label: 'About', href: '#about' },
  { label: 'Booking', href: '#contact' },
];

/** Spotify track ID from an open.spotify.com/track/… link. */
export const spotifyId = (url: string) => url.split('/track/')[1]?.split('?')[0] ?? '';
