"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, LoaderCircle, LockKeyhole } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { site, sankalpas } from "@/lib/site";
import { sendSubmission, type Submission } from "@/lib/forms";

type FormKind = "join" | "contribute";
type Status = { type: "idle" | "pending" | "success" | "error"; message: string };

const interestOptions = ["Events & collaboration", "General enquiry"];

export function SubmissionForm({ kind }: { kind: FormKind }) {
  const isJoin = kind === "join";
  const formId = isJoin ? "contact-form" : "contribute-form";
  const prefix = isJoin ? "join" : "contribute";
  const params = useSearchParams();
  const requestedArea = params.get("area");
  const initialArea = sankalpas.find(item => item.id === requestedArea)?.category ?? "";
  const [interest, setInterest] = useState("");
  const [customInterest, setCustomInterest] = useState("");
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });

  function invalid() {
    setStatus({ type: "error", message: "Please complete all required fields and correct any invalid values." });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (status.type === "pending") return;
    if (!form.reportValidity()) return;
    if (!site.formsEndpoint) {
      setStatus({ type: "error", message: "Sending is unavailable: a form service connection is required." });
      return;
    }

    const data = new FormData(form);
    const selectedArea = String(data.get(isJoin ? "interest" : "area") ?? "").trim();
    const customValue = String(data.get("customInterest") ?? "").trim();
    const payload: Submission = {
      type: isJoin ? "membership" : "contact",
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      area: selectedArea,
      message: String(data.get("message") ?? "").trim(),
      ...(isJoin
        ? {
          city: String(data.get("city") ?? "").trim(),
          referralSource: String(data.get("referralSource") ?? "").trim(),
          ...(selectedArea === "Other" ? { customInterest: customValue } : {}),
        }
        : { availability: String(data.get("availability") ?? "").trim() }),
      consent: true,
      website: String(data.get("website") ?? ""),
    };

    const requiredValues = isJoin
      ? [payload.name, payload.email, payload.area, payload.city ?? "", payload.referralSource ?? "", ...(selectedArea === "Other" ? [customValue] : [])]
      : [payload.name, payload.email, payload.area, payload.availability ?? "", payload.message];
    if (requiredValues.some(value => !value)) {
      setStatus({ type: "error", message: "Please complete all required fields before sending." });
      return;
    }

    setStatus({ type: "pending", message: "" });
    try {
      await sendSubmission(site.formsEndpoint, payload);
      form.reset();
      setInterest("");
      setCustomInterest("");
      setStatus({
        type: "success",
        message: isJoin
          ? "Thank you. Your Join the Community enquiry has been received."
          : "Thank you. Your contribution enquiry has been received.",
      });
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "The connection failed. Please try again later." });
    }
  }

  const requiredMark = <span aria-hidden="true">*</span>;

  return <form id={formId} className={`submission-form submission-form--${kind}`} aria-labelledby={`${prefix}-form-title`} onSubmit={submit} onInvalid={invalid} onChange={() => {
    if (status.type === "error") setStatus({ type: "idle", message: "" });
  }} onReset={() => {
    setStatus({ type: "idle", message: "" });
    if (isJoin) {
      setInterest("");
      setCustomInterest("");
    }
  }}>
    <h2 id={`${prefix}-form-title`}>{isJoin ? "Join the Community" : "Contribute to the Community"}</h2>
    <p>{isJoin ? "Tell us a little about yourself and how you would like to take part." : "Share the contribution area, availability, and skills you would like to bring."}</p>
    <div className="form-grid">
      <div className="field"><label htmlFor={`${prefix}-name`}>Full name {requiredMark}</label><input id={`${prefix}-name`} name="name" autoComplete="name" placeholder="Your full name" minLength={2} maxLength={100} required /></div>
      <div className="field"><label htmlFor={`${prefix}-email`}>Email address {requiredMark}</label><input id={`${prefix}-email`} name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} required /></div>
      <div className="field"><label htmlFor={`${prefix}-phone`}>Phone number <span>(optional)</span></label><input id={`${prefix}-phone`} name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" pattern={String.raw`[+0-9 \(\)\-]{7,20}`} title="Use 7 to 20 characters: digits, spaces, +, -, or parentheses." maxLength={20} /></div>
      {isJoin ? <>
        <div className="field"><label htmlFor="join-city">City {requiredMark}</label><input id="join-city" name="city" autoComplete="address-level2" placeholder="Your city" minLength={2} maxLength={100} required /></div>
        <div className="field"><label htmlFor="join-referral">How did you hear about us? {requiredMark}</label><input id="join-referral" name="referralSource" placeholder="A friend, an event, online..." minLength={2} maxLength={200} required /></div>
        <div className="field"><label htmlFor="join-interest">I&apos;m interested in {requiredMark}</label><select id="join-interest" name="interest" value={interest} onChange={event => {
          setInterest(event.target.value);
          if (event.target.value !== "Other") setCustomInterest("");
        }} required><option value="" disabled>Select an area</option>{sankalpas.map(item => <option key={item.id} value={item.category}>{item.category}</option>)}{interestOptions.map(option => <option key={option} value={option}>{option}</option>)}<option value="Other">Other</option></select></div>
        {interest === "Other" && <div className="field"><label htmlFor="join-custom-interest">Please describe your interest {requiredMark}</label><input id="join-custom-interest" name="customInterest" value={customInterest} onChange={event => setCustomInterest(event.target.value)} minLength={2} maxLength={200} required /></div>}
        <div className="field field--full"><label htmlFor="join-message">Message <span>(optional)</span></label><textarea id="join-message" name="message" rows={4} placeholder="Anything else you would like us to know?" minLength={10} maxLength={3000} /></div>
      </> : <>
        <div className="field"><label htmlFor="contribute-area">Area of contribution {requiredMark}</label><select id="contribute-area" name="area" defaultValue={initialArea} required><option value="" disabled>Select an area</option>{sankalpas.map(item => <option key={item.id} value={item.category}>{item.category}</option>)}{interestOptions.map(option => <option key={option} value={option}>{option}</option>)}</select></div>
        <div className="field"><label htmlFor="contribute-availability">Availability {requiredMark}</label><input id="contribute-availability" name="availability" placeholder="Days, times, or a schedule that works for you" minLength={2} maxLength={200} required /></div>
        <div className="field field--full"><label htmlFor="contribute-message">How would you like to contribute? {requiredMark}</label><textarea id="contribute-message" name="message" rows={5} placeholder="Share your interests, skills, or contribution idea..." minLength={10} maxLength={3000} required /><small>A minimum of 10 characters. Please do not include sensitive information.</small></div>
      </>}
    </div>
    <div className="honeypot" aria-hidden="true"><label htmlFor={`${prefix}-website`}>Leave this field empty</label><input id={`${prefix}-website`} name="website" tabIndex={-1} autoComplete="off" /></div>
    <label className="consent" htmlFor={`${prefix}-consent`}><input id={`${prefix}-consent`} name="consent" type="checkbox" required /><span>I agree to the <Link href="/privacy/">privacy policy</Link> and consent to being contacted about this enquiry. {requiredMark}</span></label>
    <div className="form-actions"><button className="button" type="submit" aria-describedby={!site.formsEndpoint ? `${prefix}-service-status` : undefined} disabled={!site.formsEndpoint || status.type === "pending"}>{status.type === "pending" ? <><LoaderCircle className="spin" size={18} aria-hidden="true" /> Sending...</> : <>{isJoin ? "Send Join enquiry" : "Send contribution enquiry"} <ArrowRight size={18} aria-hidden="true" /></>}</button><button className="reset-button" type="reset" disabled={status.type === "pending"}>Reset {isJoin ? "Join" : "contribution"} form</button></div>
    {!site.formsEndpoint && <p id={`${prefix}-service-status`} className="form-service-status" role="status">Sending unavailable: service connection required. Details entered here are not transmitted or stored.{site.contactEmail && <> Contact us by <a href={`mailto:${site.contactEmail}`}>email</a>.</>}</p>}
    {site.formsEndpoint && <p className="form-security"><LockKeyhole size={13} aria-hidden="true" />Your details are used only to respond to this enquiry.</p>}
    <div aria-live="polite" aria-atomic="true">{status.message && <div className={`notice ${status.type === "success" ? "notice--success" : "notice--error"}`} role={status.type === "error" ? "alert" : "status"}>{status.type === "success" ? <CheckCircle2 size={20} aria-hidden="true" /> : <AlertCircle size={20} aria-hidden="true" />}<p>{status.message}</p></div>}</div>
  </form>;
}
