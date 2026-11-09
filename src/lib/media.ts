export interface PodcastEpisode {
  id: string;
  videoId: string;
  title: string;
  guest: string;
  description: string;
  topic: string;
  thumbnail: string;
}

export function getYouTubeEmbedUrl(videoId: string): string {
  if (!/^[A-Za-z0-9_-]{11}$/.test(videoId)) {
    throw new Error("A YouTube video ID must contain exactly 11 letters, digits, underscores, or hyphens.");
  }
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
}

export const socialProfiles = [
  { platform: "YouTube", label: "Watch & listen", handle: "@IndicThoughtForum", url: "https://www.youtube.com/@IndicThoughtForum", description: "Long-form podcasts, talks, and community conversations." },
  { platform: "Instagram", label: "In the moment", handle: "@indicthoughtforum", url: "https://www.instagram.com/indicthoughtforum/", description: "Event announcements, short perspectives, and moments from the forum." },
  { platform: "Facebook", label: "Stay connected", handle: "Indic Thought Forum", url: "https://www.facebook.com/indicthoughtforum", description: "Follow the forum and discover updates on Facebook." },
  { platform: "X (Twitter)", label: "Follow the conversation", handle: "@IndicthoughtFor", url: "https://x.com/IndicthoughtFor", description: "Follow Indic Thought Forum on X." },
  { platform: "WhatsApp", label: "Join the conversation", handle: "ITF WhatsApp group", url: "https://chat.whatsapp.com/Lr7Bu6azh5JBJmZpETf7Jf", description: "Stay in touch with the ITF community on WhatsApp." },
] as const;

export const podcasts: PodcastEpisode[] = [
  {
    id: "shiv-sastry", videoId: "lFzOmGN2o5A",
    title: "India, Pakistan and the future of the subcontinent",
    guest: "Dr. Shiv Sastry", topic: "Ideas & dialogue",
    description: "A long-form conversation with Dr. Shiv Sastry on India, Pakistan, and the questions shaping the subcontinent.",
    thumbnail: "/images/podcast-shiv-sastry.webp",
  },
  {
    id: "queen-tara", videoId: "UX37BufManw",
    title: "Queen Tara: The Unbreakable Queen Who Stood Against Aurangzeb",
    guest: "Medha Bhaskaran", topic: "History",
    description: "Explore the story of Queen Tara with author Medha Bhaskaran in the seventh episode of the ITF podcast.",
    thumbnail: "/images/podcast-queen-tara.webp",
  },
  {
    id: "sustainable-choices", videoId: "CP8G3DXbzgw",
    title: "Plastic Is Everywhere, But Where?",
    guest: "ITF Podcast, Episode 6", topic: "Sustainability",
    description: "A conversation about plastic, biodegradable alternatives, and the choices behind a more sustainable everyday life.",
    thumbnail: "/images/podcast-sustainability.webp",
  },
];

export const socialPosts = [
  {
    id: "queen-tara-announcement",
    title: "A conversation around Queen Tara",
    description: "Revisit the original community announcement for our conversation with Medha Deshmukh Bhaskaran.",
    url: "https://www.youtube.com/post/UgkxmzQetNNgUKlGLNtj0L_1yj-ISRBlz9fm",
    image: "/images/medha-bhaskaran/event-poster/queen-tara-2026-06-06.webp",
    type: "Event announcement",
  },
  {
    id: "places-of-worship",
    title: "Talk #05: Places of Worship Act, 1991",
    description: "An ITF community recap of a discussion with Sri Manjunatha Ajjampura about the Act and its historical and constitutional context.",
    url: "https://www.youtube.com/post/UgkxumPIs7-TmRNqR4Ocf599dJBcAIXGNz-0",
    image: null,
    type: "Community recap",
  },
] as const;
