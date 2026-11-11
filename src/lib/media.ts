export interface PodcastEpisode {
  id: string;
  videoId: string;
  title: string;
  guest?: string;
  description?: string;
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

const shivSastry: PodcastEpisode = {
  id: "shiv-sastry", videoId: "lFzOmGN2o5A",
  title: "India, Pakistan and the future of the subcontinent",
  guest: "Dr. Shiv Sastry", topic: "Ideas & dialogue",
  description: "A long-form conversation with Dr. Shiv Sastry on India, Pakistan, and the questions shaping the subcontinent.",
  thumbnail: "/images/podcast-shiv-sastry.webp",
};

export const podcasts: readonly PodcastEpisode[] = [
  {
    id: "queen-tara", videoId: "UX37BufManw",
    title: "Queen Tara: The Unbreakable Queen Who Stood Against Aurangzeb | Medha Bhaskaran | Ep. 7",
    guest: "Medha Bhaskaran", topic: "History",
    description: "Explore the story of Queen Tara with author Medha Bhaskaran in the seventh episode of the ITF podcast.",
    thumbnail: "/images/podcast-queen-tara.webp",
  },
  {
    id: "sustainable-choices", videoId: "CP8G3DXbzgw",
    title: "Plastic Is Everywhere, But Where? | Plastic, Biodegradable & Sustainable Choices | ITF Podcast Ep. 6",
    guest: "ITF Podcast, Episode 6", topic: "Sustainability",
    description: "A conversation about plastic, biodegradable alternatives, and the choices behind a more sustainable everyday life.",
    thumbnail: "/images/podcast-sustainability.webp",
  },
  {
    id: "indian-history-kannada", videoId: "9zZnYfYLTsE",
    title: "ಭಾರತದ ಇತಿಹಾಸವನ್ನು ನಾವು ತಪ್ಪಾಗಿ ಕಲಿತಿದ್ದೇವೇ? | Manjunatha Ajjampura | ITF Podcast #05",
    guest: "Manjunatha Ajjampura", topic: "History",
    description: "The Kannada-language ITF Podcast episode with Manjunatha Ajjampura.",
    thumbnail: "/images/podcast-indian-history-kannada.webp",
  },
  {
    id: "northeast-india", videoId: "v-0RB4e5SNo",
    title: "The Hidden Reality of Northeast India: Demographics, Permits & Article 371 | Pankaj Saxena",
    guest: "Pankaj Saxena", topic: "Northeast India",
    description: "A long-form conversation with Pankaj Saxena on Northeast India.",
    thumbnail: "/images/podcast-northeast-india.webp",
  },
  {
    id: "medha-bhaskaran", videoId: "trB-R1Mf3PI",
    title: "Medha Deshmukh Bhaskaran on Queen Tara, Maratha History, and Her Journey | ITF & Medha Bhaskaran",
    guest: "Medha Deshmukh Bhaskaran", topic: "History",
    description: "A long-form conversation on Queen Tara, Maratha history, and Medha Bhaskaran's journey.",
    thumbnail: "/images/podcast-medha-bhaskaran.webp",
  },
  {
    ...shivSastry,
  },
  {
    id: "cjp-protest", videoId: "za2JjGqiP28",
    title: "The Truth Behind the CJP Protest | NEET, Dharmendra Pradhan & The Bigger Picture | ITF Podcast Ep.2",
    topic: "ITF Podcast",
    description: "An ITF Podcast episode on the CJP protest, NEET, and Dharmendra Pradhan.",
    thumbnail: "/images/podcast-cjp-protest.webp",
  },
  {
    id: "pakistan-failed-state", videoId: "3f_nS6Z3lhE",
    title: "Pakistan Failed State And Its Effect On India | ITF - 3 | Dr. Shiv Shastry",
    guest: "Dr. Shiv Shastry", topic: "Ideas & dialogue",
    description: "A long-form conversation with Dr. Shiv Shastry about Pakistan and its effect on India.",
    thumbnail: "/images/podcast-pakistan-failed-state.webp",
  },
  {
    id: "places-of-worship-podcast", videoId: "teN5_eTt0cs",
    title: "Places of Worship Act, 1991 | Religious Freedom | Legal Implications | ITF - 5 | Manjunath Ajjampura",
    guest: "Manjunath Ajjampura", topic: "Law & society",
    description: "An ITF episode on the Places of Worship Act, religious freedom, and its legal implications.",
    thumbnail: "/images/podcast-places-of-worship.webp",
  },
  {
    id: "hindu-genocides", videoId: "02Z4CCbVsRg",
    title: "What happens when Gen Z questions an author on Hindu Genocides | Bijeet Prasantha | ITF Podcast Ep.1",
    guest: "Bijeet Prasantha", topic: "History",
    description: "The first ITF Podcast episode, featuring a conversation with author Bijeet Prasantha.",
    thumbnail: "/images/podcast-hindu-genocides.webp",
  },
];

export const homeFeaturedPodcast = shivSastry;
