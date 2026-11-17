import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "SMS Terms",
  description: `Terms for text messages from ${site.name}: what we send, how often, and how to opt out.`,
  path: "/sms-terms",
});

export default function SmsTermsPage() {
  const { legal, phone } = site;
  return (
    <LegalPage
      eyebrow="Legal"
      title="SMS terms"
      lead={`How text messages from ${site.name} work, and how to stop them.`}
      updated={legal.updated}
      sections={[
        {
          heading: "Program",
          body: (
            <p>
              <strong>{legal.smsProgram}</strong>. Texts are sent from{" "}
              <span className="font-mono text-foreground">{phone.display}</span>{" "}
              by {legal.entity}.
            </p>
          ),
        },
        {
          heading: "How you opt in",
          body: (
            <ul>
              <li>
                By checking the optional &ldquo;Text me about my request&rdquo;
                box when you book a call or ask us to call you on{" "}
                <Link href="/book">our booking page</Link>.
              </li>
              <li>
                By texting our business line first, or by calling it. If we miss
                your call, we may send one text to follow up.
              </li>
            </ul>
          ),
        },
        {
          heading: "What we send",
          body: (
            <p>
              Replies to your inquiry, appointment confirmations and reminders,
              follow-up after a missed call, and messages about work you&apos;ve
              hired us for. No marketing unless you ask for it.
            </p>
          ),
        },
        {
          heading: "Frequency and cost",
          body: (
            <p>
              Message frequency varies with your conversation, typically a few
              messages per request. Message and data rates may apply.
            </p>
          ),
        },
        {
          heading: "Opt out and help",
          body: (
            <p>
              Reply <strong>STOP</strong> to any message to stop receiving
              texts; you&apos;ll get one confirmation and nothing further. Reply{" "}
              <strong>START</strong> to opt back in. Reply <strong>HELP</strong>{" "}
              for help, or call{" "}
              <a href={phone.href} className="font-mono">
                {phone.display}
              </a>
              .
            </p>
          ),
        },
        {
          heading: "Fine print",
          body: (
            <p>
              Consent to texts is not a condition of any purchase. Carriers are
              not liable for delayed or undelivered messages. See our{" "}
              <Link href="/privacy">privacy policy</Link>: we never share your
              mobile number or text opt-in data with third parties for
              marketing.
            </p>
          ),
        },
      ]}
    />
  );
}
