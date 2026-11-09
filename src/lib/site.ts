function httpsUrl(name: string, value: string | undefined): string | undefined {
  if (!value) return undefined;
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password) {
    throw new Error(`${name} must be an HTTPS URL without embedded credentials.`);
  }
  return url.toString();
}

export const site = {
  name: "Indic Thought Forum",
  tagline: "Bharateeya Sabhyata Sankalpa",
  description: "Reconnecting with Bharateeya heritage. Building a thoughtful community. Turning meaningful dialogue into purposeful action.",
  url: httpsUrl("NEXT_PUBLIC_SITE_URL", process.env.NEXT_PUBLIC_SITE_URL) ?? "https://www.indicthoughtforum.org/",
  formsEndpoint: httpsUrl("NEXT_PUBLIC_FORMS_ENDPOINT", process.env.NEXT_PUBLIC_FORMS_ENDPOINT),
  donationUrl: httpsUrl("NEXT_PUBLIC_DONATION_URL", process.env.NEXT_PUBLIC_DONATION_URL),
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || undefined,
};

if (site.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.contactEmail)) {
  throw new Error("NEXT_PUBLIC_CONTACT_EMAIL must be a valid public email address.");
}

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/sankalpas/", label: "Sankalpas" },
  { href: "/events/", label: "Updates" },
  { href: "/calendar/", label: "Calendar" },
  { href: "/contact-us/", label: "Contact" },
] as const;

export const principles = [
  { number: "01", title: "Awareness", outcome: "Accountability", description: "Awareness must lead to responsibility and conscious action.", icon: "sun" },
  { number: "02", title: "Dialogue", outcome: "Direction", description: "Meaningful conversations must guide us towards clarity and purpose.", icon: "messages" },
  { number: "03", title: "Sankalpa", outcome: "Action", description: "Strong intent must translate into real, impactful change.", icon: "flame" },
] as const;

export const steps = [
  { title: "Join ITF", description: "Find your community. Begin a journey of learning and meaningful contribution." },
  { title: "Choose your Sankalpa", description: "Choose a purpose that matters to you and make a personal commitment." },
  { title: "Commit & execute", description: "Bring your intention to life through consistent, everyday action." },
  { title: "Reflect & refine", description: "Review your progress, stay accountable, and keep learning." },
  { title: "Create impact", description: "Make your contribution visible, meaningful, and lasting." },
];

export const sankalpas = [
  { id: "heritage", title: "Preserve our heritage", category: "Culture & heritage", icon: "landmark", description: "Reconnect with the stories, traditions, languages, and knowledge that shape Bharateeya civilization.", action: "Make time to explore a local heritage site, learn its story, and share what you discover." },
  { id: "learning", title: "Learn. Question. Share.", category: "Knowledge & dialogue", icon: "book", description: "Build a habit of thoughtful reading and open, respectful conversations grounded in curiosity.", action: "Choose a book, invite a few friends, and begin a regular reading circle." },
  { id: "community", title: "Serve your community", category: "Community & seva", icon: "hands", description: "Turn care into action. Contribute your time and skills to the needs of the people around you.", action: "Identify one local need and commit a small, consistent amount of time to helping." },
  { id: "youth", title: "Inspire the next generation", category: "Youth & education", icon: "sprout", description: "Make cultural learning approachable and relevant for younger minds through mentorship and shared discovery.", action: "Share a story, teach a skill, or offer guidance to someone beginning their journey." },
  { id: "nature", title: "Care for our environment", category: "Nature & responsibility", icon: "leaf", description: "Practice the connection between our way of life and the natural world through mindful daily choices.", action: "Choose a practical habit that reduces waste and review your progress every week." },
  { id: "create", title: "Create with purpose", category: "Arts & expression", icon: "palette", description: "Bring ideas to life through writing, art, storytelling, and creative work that connects people.", action: "Use your creative skills to make one aspect of our heritage more accessible." },
] as const;

export interface ForumEvent {
  id: string;
  title: string;
  speaker: string;
  date: string;
  displayDate: string;
  startTime: string;
  venue: string;
  image: string;
  previewImage: string;
  imageWidth: number;
  imageHeight: number;
  category: "History" | "Ideas & dialogue";
}

const eventVenue = "Suchitra Cinema & Cultural Academy, Banashankari, Bengaluru";
const allianceVenue = "Alliance Francaise de Bangalore, Vasanth Nagar, Bengaluru";
const eventPosterSize = { imageWidth: 1587, imageHeight: 2245 };

export const events: ForumEvent[] = [
  { id: "ganeshaiah", title: "Pepper, Potato, Mould and Gold: How They Shaped Human History", speaker: "K. N. Ganeshaiah", date: "2026-11-29", displayDate: "29 November 2026", startTime: "15:00", venue: allianceVenue, image: "/images/ganeshaiah/event-poster/pepper-potato-mould-and-gold-2026-11-29.png", previewImage: "/images/ganeshaiah/event-poster/pepper-potato-mould-and-gold-2026-11-29.webp", ...eventPosterSize, category: "History" },
  { id: "vedanga-jyotisha", title: "Vedanga Jyotisha: Exploring the Foundations of Indian Astronomy", speaker: "Shri Ram Mohan", date: "2026-10-25", displayDate: "25 October 2026", startTime: "15:00", venue: allianceVenue, image: "/images/ram-mohan/event-poster/vedanga-jyotisha-2026-10-25.png", previewImage: "/images/ram-mohan/event-poster/vedanga-jyotisha-2026-10-25.webp", ...eventPosterSize, category: "Ideas & dialogue" },
  { id: "places-of-worship", title: "Places of Worship Act, 1991", speaker: "Sri Manjunatha Ajjampura", date: "2026-07-11", displayDate: "11 July 2026", startTime: "17:30", venue: eventVenue, image: "/images/manjunath-ajjampura/event-poster/places-of-worship-act-2026-07-11.png", previewImage: "/images/manjunath-ajjampura/event-poster/places-of-worship-act-2026-07-11.webp", ...eventPosterSize, category: "Ideas & dialogue" },
  { id: "queen-tara", title: "Queen Tara: Kali of the Deccan", speaker: "Medha Deshmukh Bhaskaran", date: "2026-06-06", displayDate: "06 June 2026", startTime: "17:30", venue: eventVenue, image: "/images/medha-bhaskaran/event-poster/queen-tara-2026-06-06.png", previewImage: "/images/medha-bhaskaran/event-poster/queen-tara-2026-06-06.webp", ...eventPosterSize, category: "History" },
  { id: "pakistan", title: "Pakistan: Failed State & Its Effect on India", speaker: "Dr. Shiv Sastry", date: "2026-05-09", displayDate: "09 May 2026", startTime: "17:30", venue: eventVenue, image: "/images/shiv-sastry/event-poster/pakistan-failed-state-2026-05-09.png", previewImage: "/images/shiv-sastry/event-poster/pakistan-failed-state-2026-05-09.webp", ...eventPosterSize, category: "Ideas & dialogue" },
  { id: "hindumisia", title: "Hindumisia: Revisiting Forgotten History", speaker: "Sri Chakravarti Sulibele & Dr. Bijeet Prasantha", date: "2026-04-02", displayDate: "02 April 2026", startTime: "17:30", venue: eventVenue, image: "/images/bijeet-prasantha/event-poster/hindumisia-2026-04-02.png", previewImage: "/images/bijeet-prasantha/event-poster/hindumisia-2026-04-02.webp", ...eventPosterSize, category: "History" },
  { id: "independent", title: "Are We Independent? The Battle for India's Mind", speaker: "Sri Sankrant Sanu", date: "2026-02-20", displayDate: "20 February 2026", startTime: "18:00", venue: eventVenue, image: "/images/sankrant-sanu/event-poster/are-we-independent-2026-02-20.png", previewImage: "/images/sankrant-sanu/event-poster/are-we-independent-2026-02-20.webp", ...eventPosterSize, category: "Ideas & dialogue" },
];

export const gallery = [
  { src: "/images/sankrant-sanu/event-photos/community-gathering.webp", title: "A community brought together by ideas", category: "Community", alt: "Participants gathered at an Indic Thought Forum event" },
  { src: "/images/sankrant-sanu/event-photos/community-conversation.webp", title: "Making room for meaningful conversations", category: "Conversations", alt: "A moment from an ITF community conversation" },
  { src: "/images/sankrant-sanu/event-photos/audience-participation.webp", title: "Learning, listening, and connecting", category: "Community", alt: "Community members taking part in an ITF gathering" },
  { src: "/images/sankrant-sanu/event-photos/speaker-and-participants.webp", title: "Perspectives that bring us closer", category: "Conversations", alt: "A speaker and participants at an ITF event" },
  { src: "/images/sankrant-sanu/event-photos/community-connections.webp", title: "Shared purpose. Lasting connections.", category: "Community", alt: "A photograph from the Indic Thought Forum community archive" },
];

export const homeStatistics = [
  { value: 500, label: "Members to bring together" },
  { value: 10, label: "Events to inspire dialogue" },
  { value: 30, label: "Sankalpas to turn into action" },
] as const;
