// ─────────────────────────────────────────────────────────────
//  All editable site content lives here: text, links, singles,
//  videos, contact details. Images live in src/assets/images/.
// ─────────────────────────────────────────────────────────────
import type { ImageMetadata } from 'astro';
import coverOmds from '../assets/images/cover-omds.jpg';
import coverPolo from '../assets/images/cover-polo.jpg';
import coverMata from '../assets/images/cover-mata.jpg';
import coverPayme from '../assets/images/cover-payme.jpg';

export const artist = {
  name: 'LOP3Z',
  roles: ['Singer', 'Rapper', 'Songwriter'],
  genre: 'Afropop',
  tagline: 'Afropop for survivors who choose joy.',
  statement: 'Shake off the negativity. Take control of your happiness.',
  bio: [
    'LOP3Z makes Afropop for survivors who choose joy.',
    "Her new single ‘OMDs’ (Oh My Days) is a mid-tempo, feel-good record about shaking off negativity and taking control of your happiness. Produced by Rhaffy.",
  ],
};

export const seo = {
  title: 'LOP3Z — Singer // Rapper // Songwriter | New single “OMDs” out now',
  description:
    'Official site of LOP3Z, Afropop singer, rapper and songwriter. Stream the new single “OMDs” (Oh My Days), watch the videos, and book LOP3Z for shows.',
  ogImage: '/og-image.jpg',
  ogImageAlt: 'LOP3Z — new single “OMDs” out now. Cover art shows LOP3Z on a swing against a lilac sky.',
  twitterHandle: '@vibezbylop3z',
  locale: 'en_NG',
};

export const featured = {
  title: 'OMDs',
  spotify: 'https://open.spotify.com/track/7g9ydOiV6tTccXO3GE1zqJ',
  spotifyEmbed: 'https://open.spotify.com/embed/track/7g9ydOiV6tTccXO3GE1zqJ?utm_source=generator&theme=0',
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
    subtitle: 'Oh My Days · New single',
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
}

export const streaming: Profile[] = [
  { label: 'Spotify', url: 'https://open.spotify.com/artist/6TEycOYjOevjKnp5WN1UjI', icon: 'spotify' },
  { label: 'Apple Music', url: 'https://music.apple.com/us/artist/lop3z/1801808605', icon: 'applemusic' },
  { label: 'Audiomack', url: 'https://audiomack.com/vibez-lop3z', icon: 'audiomack' },
];

export const socials: Profile[] = [
  { label: 'Instagram', url: 'https://instagram.com/vibezbylop3z', icon: 'instagram' },
  { label: 'TikTok', url: 'https://www.tiktok.com/@vibezbylop3z', icon: 'tiktok' },
  { label: 'YouTube', url: 'https://www.youtube.com/@vibezbylop3z', icon: 'youtube' },
  { label: 'X', url: 'https://x.com/vibezbylop3z', icon: 'x' },
];

export const nav = [
  { label: 'Music', href: '#music' },
  { label: 'Videos', href: '#videos' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];
