import { Fragment } from "react";
import { getSankalpaNoteHistory, type SankalpaNote, type SankalpaRecord, type SankalpaStatus } from "@/lib/sankalpas";

const statusClasses: Record<SankalpaStatus, string> = {
  "In Progress": "sankalpa-status--progress",
  "To Start": "sankalpa-status--planned",
  "Mostly completed": "sankalpa-status--complete",
  "Completed": "sankalpa-status--complete",
  "Deprioritised": "sankalpa-status--paused",
};

const noteDateFormatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric",
  hour: "numeric", minute: "2-digit", hour12: true,
});

function Note({ note }: { note: SankalpaNote }) {
  return <><p>{note.text}</p><time dateTime={note.updatedAt}>{noteDateFormatter.format(new Date(note.updatedAt))} IST</time></>;
}

function SankalpaNotes({ notes }: { notes: readonly SankalpaNote[] }) {
  const [latest, ...previous] = getSankalpaNoteHistory(notes);
  if (!latest) return <span>No notes yet</span>;
  return <div className="sankalpa-notes">
    <div className="sankalpa-latest-note"><Note note={latest} /></div>
    {previous.length > 0 && <details className="sankalpa-note-history"><summary>Previous notes ({previous.length})</summary><ol>{previous.map(note => <li key={note.id}><Note note={note} /></li>)}</ol></details>}
  </div>;
}

function MobileSankalpaDetails({ entry }: { entry: SankalpaRecord }) {
  return <details className="sankalpa-mobile-details">
    <summary>
      <span>{entry.sankalpa}</span>
      <span className={`sankalpa-status ${statusClasses[entry.status]}`}>{entry.status}</span>
    </summary>
    <dl>
      <div><dt>Talk date</dt><dd>{entry.talkDate}</dd></div>
      <div><dt>Talk topic</dt><dd>{entry.talkTopic}</dd></div>
      <div><dt>Speaker</dt><dd>{entry.speaker}</dd></div>
      <div><dt>Owner</dt><dd>{entry.owner}</dd></div>
      {entry.notes.length > 0 && <div><dt>Notes</dt><dd><SankalpaNotes notes={entry.notes} /></dd></div>}
    </dl>
  </details>;
}

export function SankalpaTable({ entries }: { entries: readonly SankalpaRecord[] }) {
  return <div className="sankalpa-table-wrap">
    <table className="sankalpa-table">
      <caption className="sr-only">Sankalpa tracker: talk date, talk topic, speaker, Sankalpa, status, owner, and notes.</caption>
      <thead><tr>{["Talk date", "Talk topic", "Speaker", "Sankalpa", "Status", "Owner", "Notes"].map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead>
      <tbody>{entries.map(entry => <tr key={entry.id} id={`sankalpa-${entry.id}`}>
        <td data-label="Talk date">{entry.talkDate}</td>
        <td data-label="Talk topic">{entry.talkTopic}</td>
        <td data-label="Speaker">{entry.speaker}</td>
        <td data-label="Sankalpa" className="sankalpa-title"><span className="sankalpa-desktop-title">{entry.sankalpa}</span><MobileSankalpaDetails entry={entry} /></td>
        <td data-label="Status"><span className={`sankalpa-status ${statusClasses[entry.status]}`}>{entry.status}</span></td>
        <td data-label="Owner"><span>{entry.owner.split("/").map((owner, index) => <Fragment key={index}>{index > 0 && <>/<wbr /></>}{owner}</Fragment>)}</span></td>
        <td data-label="Notes" className="sankalpa-notes-cell"><SankalpaNotes notes={entry.notes} /></td>
      </tr>)}</tbody>
    </table>
  </div>;
}
