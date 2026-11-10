export interface Submission {
  type: "membership" | "contact";
  name: string;
  email: string;
  phone: string;
  area: string;
  message: string;
  city?: string;
  referralSource?: string;
  availability?: string;
  customInterest?: string;
  consent: true;
  website: string;
}

export async function sendSubmission(
  endpoint: string,
  payload: Submission,
  fetcher: typeof fetch = fetch,
): Promise<void> {
  const response = await fetcher(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(15000),
    credentials: "omit",
  });
  if (!response.ok) {
    if (response.status === 429) throw new Error("Too many requests. Please wait a few minutes before trying again.");
    throw new Error("Your message could not be sent. Please try again later.");
  }
  const result: unknown = await response.json();
  if (typeof result !== "object" || result === null || !("success" in result) || result.success !== true) {
    throw new Error("The service did not confirm your submission. Please try again or contact the team.");
  }
}
