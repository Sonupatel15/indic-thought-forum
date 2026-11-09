export interface SankalpaNote {
  id: string;
  updatedAt: string;
  text: string;
}

export type SankalpaStatus = "In Progress" | "To Start" | "Mostly completed" | "Completed" | "Deprioritised";

export interface SankalpaRecord {
  id: number;
  talkDate: string;
  talkTopic: string;
  speaker: string;
  sankalpa: string;
  status: SankalpaStatus;
  owner: string;
  priority: string;
  dueDate: string;
  lastUpdated: string;
  nextAction: string;
  notes: readonly SankalpaNote[];
}

const decolonising = { talkDate: "Mar 2026", talkTopic: "Decolonising the Indian Mind", speaker: "Sankrant Sanu" };
const hindumisia = { talkDate: "Apr 2026", talkTopic: "Hindumisia — A Book on Hindu Genocides", speaker: "Chakravarthy Sulibele" };
const pakistan = { talkDate: "May 2026", talkTopic: "Pakistan — A Failed State", speaker: "Shivashankar Shastri" };
const raniTara = { talkDate: "Jun 2026", talkTopic: "Rani Tara — Kali of the Deccan", speaker: "Medha Deshmukh" };
const temples = { talkDate: "Jul 2026", talkTopic: "Places of Worship Act & Decontrol of Temples", speaker: "Manjunath Ajjampura" };

export const sankalpaRecords: readonly SankalpaRecord[] = [
  { id: 1, ...decolonising, sankalpa: "Saffron Swords, in comics", status: "In Progress", priority: "P1", owner: "DJ / Naveen", dueDate: "", lastUpdated: "27 Aug 2026", nextAction: "Talk to Anamika.", notes: [] },
  { id: 2, ...decolonising, sankalpa: "A protest about inaccuracies in ICSE in freedom park. collate all learnings and print it as a document", status: "To Start", priority: "P2", owner: "DJ & Ananya", dueDate: "1st qtr", lastUpdated: "27 Aug 2026", nextAction: "Naveen to facilitate a one-day workshop to review the textbook for misrepresentations", notes: [] },
  { id: 3, ...decolonising, sankalpa: "Secondary goal - To prove English is just another language to learn - Toast masters in one government school", status: "To Start", priority: "P0", owner: "Naveen/DJ/Gayatri/Ramya (DJ's office)", dueDate: "", lastUpdated: "13 Oct 2026", nextAction: "DJ to speak to his office and Aikya and get support. Need to work on the primary goal on decolonising.", notes: [] },
  { id: 4, ...hindumisia, sankalpa: "Translation of Hindumisia into Kannada", status: "Mostly completed", priority: "P0", owner: "Jyoti", dueDate: "", lastUpdated: "05 Oct 2026", nextAction: "Final editing completed by Dr Sudarshan; Sadatana (Vigneshwara Bhat) to publish, targeted around end of December", notes: [] },
  { id: 5, ...hindumisia, sankalpa: "Launch of Hindumisia", status: "In Progress", priority: "P0", owner: "Jyoti", dueDate: "", lastUpdated: "13 Oct 2026", nextAction: "Spoke to Sri Sri Sri Nirmalananda and he is yet to get back to us with an exact date", notes: [] },
  { id: 6, ...hindumisia, sankalpa: "Recognition of Hindu Genocide Act", status: "In Progress", priority: "P2", owner: "DJ", dueDate: "", lastUpdated: "15 Sep 2026", nextAction: "DJ to hand it over to Tejaswi Surya", notes: [] },
  { id: 7, ...hindumisia, sankalpa: "REach - have 20 events in 3 months across Karnataka to sell books", status: "To Start", priority: "P1", owner: "Naveen/DJ", dueDate: "", lastUpdated: "13 Oct 2026", nextAction: "Identifying organisations to host these events where we can sell the copy for a deep discount (600 INR)", notes: [] },
  { id: 8, ...hindumisia, sankalpa: "Discources in all mathas (Sringeri, Uttaradi, Adichunchanagiri, Mantralaya etc)", status: "To Start", priority: "P1", owner: "Naveen/DJ", dueDate: "", lastUpdated: "13 Oct 2026", nextAction: "", notes: [] },
  { id: 9, ...hindumisia, sankalpa: "Genocide tour circuit - Sahana madam's idea.", status: "To Start", priority: "P1", owner: "DJ", dueDate: "1st qtr", lastUpdated: "13 Oct 2026", nextAction: "Starting with Melukote, Coorg etc. Next pan India. Proceeds of which will go to research grant. Proceeds of those research will go to Genocide Museum", notes: [] },
  { id: 10, ...hindumisia, sankalpa: "Create genocide content on Social media", status: "To Start", priority: "P1", owner: "Sonu", dueDate: "", lastUpdated: "13 Oct 2026", nextAction: "With Itiha", notes: [] },
  { id: 11, ...hindumisia, sankalpa: "Ghar Wapsi", status: "To Start", priority: "P2", owner: "DJ / Naveen", dueDate: "", lastUpdated: "27 Aug 2026", nextAction: "In conversation with Kadu Siddeshwara Swamiji and others to understand process and motivation. Case study with 1 family", notes: [] },
  { id: 12, ...pakistan, sankalpa: "Purchase and distribution of Operation Sindoor — 100 copies", status: "Deprioritised", priority: "", owner: "Suhas", dueDate: "", lastUpdated: "27 Aug 2026", nextAction: "", notes: [] },
  { id: 13, ...pakistan, sankalpa: "Translation of Aryan Invasion Myth to Kannada", status: "In Progress", priority: "P1", owner: "DJ / Naveen", dueDate: "", lastUpdated: "27 Sep 2026", nextAction: "First draft promised for November 1st week. Will be released in December. Sahithya loka to publish", notes: [] },
  { id: 14, ...raniTara, sankalpa: "Project Veerangana — Rani Tara Bai Scholarship", status: "In Progress", priority: "P1", owner: "DJ", dueDate: "", lastUpdated: "07 Oct 2026", nextAction: "The list is finalised (Sneha Prajapati, Vaishnavi Yadav, Sakshie Sharma). Training to start from the week of 12th Oct", notes: [] },
  { id: 15, ...raniTara, sankalpa: "25 Rani Tara Bai books to Yuva Tejas for the students to study and get motivated.", status: "Completed", priority: "P0", owner: "DJ", dueDate: "", lastUpdated: "13 Oct 2026", nextAction: "Sent to Yuva Tejas", notes: [] },
  { id: 16, ...raniTara, sankalpa: "Translation of the Rani Tarabai book to Kannada", status: "In Progress", priority: "P2", owner: "DJ", dueDate: "", lastUpdated: "27 Aug 2026", nextAction: "Prof. Habbu approached to take up the translation", notes: [] },
  { id: 17, ...temples, sankalpa: "Reverse Muzrai — de-control of one temple", status: "Deprioritised", priority: "", owner: "DJ / Naveen", dueDate: "", lastUpdated: "13 Oct 2026", nextAction: "Speak with Mohan to understand regulations and process", notes: [] },
  { id: 18, ...temples, sankalpa: "Translation of History of Hindu-Christian Encounters (AD 304–1996) to Kannada", status: "Deprioritised", priority: "", owner: "DJ / Naveen", dueDate: "", lastUpdated: "13 Oct 2026", nextAction: "Check with Manjunath sir to refer someone himself.", notes: [] },
  { id: 19, talkDate: "POC", talkTopic: "Building community through helping students", speaker: "Rajesh", sankalpa: "Provide coaching to Mechanical Engineering (VTU) students", status: "In Progress", priority: "P2", owner: "Suhas", dueDate: "", lastUpdated: "10 Oct 2026", nextAction: "Reach out to students and have the first batch ready for Rajesh to start", notes: [] },
  { id: 22, talkDate: "Oct 2026", talkTopic: "Ancient Indian Astronomy", speaker: "Ram Mohan", sankalpa: "Ancient Indian Astronomy workshops in school", status: "To Start", priority: "P1", owner: "Mani", dueDate: "", lastUpdated: "13 Oct 2026", nextAction: "Mohan sir will mentor Mani to conduct in Akasha schools", notes: [] },
];

export function getSankalpaNoteHistory(notes: readonly SankalpaNote[]): SankalpaNote[] {
  const ids = new Set<string>();
  for (const note of notes) {
    const timestamp = new Date(note.updatedAt);
    if (!note.id.trim() || ids.has(note.id) || !note.text.trim()) {
      throw new Error("Sankalpa notes require unique non-empty IDs and non-empty text.");
    }
    if (Number.isNaN(timestamp.getTime()) || timestamp.toISOString() !== note.updatedAt) {
      throw new Error(`Invalid update timestamp for Sankalpa note "${note.id}". Use a canonical UTC ISO timestamp.`);
    }
    ids.add(note.id);
  }
  return [...notes].sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt) || a.id.localeCompare(b.id));
}
