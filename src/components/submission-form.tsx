"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, LoaderCircle, LockKeyhole } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { site, sankalpas } from "@/lib/site";
import { sendSubmission, type Submission } from "@/lib/forms";

type Status = { type: "idle" | "pending" | "success" | "error"; message: string };

export function SubmissionForm({ membership = false }: { membership?: boolean }) {
  const params = useSearchParams();
  const requestedArea = params.get("area");
  const initialArea = sankalpas.find(item => item.id === requestedArea)?.category ?? "";
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (status.type === "pending") return;
    if (!site.formsEndpoint) {
      setStatus({ type: "error", message: "Sending is unavailable: a form service connection is required." });
      return;
    }
    const data = new FormData(form);
    const payload: Submission = {
      type: membership ? "membership" : "contact",
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      area: String(data.get("area") ?? ""),
      message: String(data.get("message") ?? "").trim(),
      consent: true,
      website: String(data.get("website") ?? ""),
    };
    if (!payload.name || !payload.message) {
      setStatus({ type: "error", message: "Please enter your name and a message, not just spaces." });
      return;
    }
    setStatus({ type: "pending", message: "" });
    try {
      await sendSubmission(site.formsEndpoint, payload);
      setStatus({ type: "success", message: membership ? "Thank you for your interest. Your membership enquiry has been received. The team will be in touch." : "Thank you. Your message has been received by the team." });
      form.reset();
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "The connection failed. Please try again later." });
    }
  }

  return <form id="contact-form" className="submission-form" onSubmit={submit} onReset={() => setStatus({ type: "idle", message: "" })}>
    <h2>{membership ? "Your journey starts here." : "Let's start a conversation."}</h2>
    <p>{membership ? "Tell us a little about yourself and how you would like to contribute." : "Share your thoughts, a question, or an idea for collaboration."}</p>
    {!site.formsEndpoint && membership && <div className="notice" role="status"><AlertCircle size={20} aria-hidden="true" /><p>Online registration is not available yet. This form does not send or save your information until our service is connected.{site.contactEmail && <> Please email <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.</>}</p></div>}
    <div className="form-grid">
      <div className="field"><label htmlFor="name">Full name <span>*</span></label><input id="name" name="name" autoComplete="name" placeholder="Your full name" minLength={2} maxLength={100} required /></div>
      <div className="field"><label htmlFor="email">Email address <span>*</span></label><input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} required /></div>
      <div className="field"><label htmlFor="phone">Phone number {membership && <span>*</span>}</label><input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" pattern={String.raw`[+0-9 \(\)\-]{7,20}`} title="Use 7 to 20 characters: digits, spaces, +, -, or parentheses." maxLength={20} required={membership} /></div>
      <div className="field"><label htmlFor="area">{membership ? "Area of contribution" : "I'm interested in"} <span>*</span></label><select id="area" name="area" defaultValue={initialArea} required><option value="" disabled>Select an area</option>{sankalpas.map(s => <option key={s.id} value={s.category}>{s.category}</option>)}<option value="Events & collaboration">Events & collaboration</option><option value="General enquiry">General enquiry</option></select></div>
      <div className="field field--full"><label htmlFor="message">{membership ? "Why would you like to join?" : "Your message"} <span>*</span></label><textarea id="message" name="message" rows={5} placeholder={membership ? "Your interests, your motivation, your ideas..." : "How can we help?"} minLength={10} maxLength={3000} required /><small>A minimum of 10 characters. Please do not include sensitive information.</small></div>
    </div>
    <div className="honeypot" aria-hidden="true"><label htmlFor="website">Leave this field empty</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
    <label className="consent"><input name="consent" type="checkbox" required /><span>I agree to the <Link href="/privacy/">privacy policy</Link> and consent to being contacted about this enquiry. <span aria-hidden="true">*</span></span></label>
    <div className="form-actions"><button className="button" type="submit" aria-describedby={!site.formsEndpoint && !membership ? "contact-service-status" : undefined} disabled={!site.formsEndpoint || status.type === "pending"}>{status.type === "pending" ? <><LoaderCircle className="spin" size={18} aria-hidden="true" /> Sending...</> : <>{membership ? "Send membership enquiry" : "Send message"} <ArrowRight size={18} aria-hidden="true" /></>}</button><button className="reset-button" type="reset" disabled={status.type === "pending"}>Reset form</button></div>
    {!site.formsEndpoint && !membership && <p id="contact-service-status" className="form-service-status" role="status">Sending unavailable: service connection required.{site.contactEmail && <> Contact us by <a href={`mailto:${site.contactEmail}`}>email</a>.</>}</p>}
    {(site.formsEndpoint || membership) && <p className="form-security"><LockKeyhole size={13} aria-hidden="true" /> {site.formsEndpoint ? "Your details are used only to respond to your enquiry." : "Details entered here are not transmitted or stored."}</p>}
    <div aria-live="polite" aria-atomic="true">{status.message && <div className={`notice ${status.type === "success" ? "notice--success" : "notice--error"}`}>{status.type === "success" ? <CheckCircle2 size={20} aria-hidden="true" /> : <AlertCircle size={20} aria-hidden="true" />}<p>{status.message}</p></div>}</div>
  </form>;
}
