import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects your information, including phone numbers and text messages.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  const { legal, phone } = site;
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy policy"
      lead={`${site.name} is a small Austin web studio run by ${legal.owner}. We collect only what we need to answer your request, and we never sell it.`}
      updated={legal.updated}
      sections={[
        {
          heading: "Who we are",
          body: (
            <p>
              {legal.entity}, based in {site.location}. Questions about this
              policy: call or text{" "}
              <a href={phone.href} className="font-mono">
                {phone.display}
              </a>
              .
            </p>
          ),
        },
        {
          heading: "What we collect",
          body: (
            <ul>
              <li>
                <strong>What you send us:</strong> your name, phone number,
                email, business name, trade, and any message, when you book a
                call or ask us to call you.
              </li>
              <li>
                <strong>Calls and texts:</strong> when you call or text our
                business line, we receive your phone number and the content of
                your text. If we miss your call, you can leave a voicemail,
                which is recorded and transcribed so we can respond.
              </li>
              <li>
                <strong>Site usage:</strong> anonymous, aggregated analytics
                (pages viewed, device type, and clicks on call and booking
                buttons). We don&apos;t use advertising trackers.
              </li>
            </ul>
          ),
        },
        {
          heading: "How we use it",
          body: (
            <p>
              To respond to your inquiry, schedule and confirm calls, follow up
              on your request, provide services you hire us for, and improve
              this website. We don&apos;t send marketing messages unless you ask
              for them.
            </p>
          ),
        },
        {
          heading: "Text messaging (SMS)",
          body: (
            <>
              <p>
                If you check the box to receive texts, or text us first, we may
                text you about your inquiry, appointments, and missed calls.
                Message frequency varies. Message and data rates may apply.
                Reply <strong>STOP</strong> to opt out at any time, or{" "}
                <strong>HELP</strong> for help. Consent to texts is never a
                condition of doing business with us. Details are in our{" "}
                <Link href="/sms-terms">SMS terms</Link>.
              </p>
              <p>
                <strong>
                  No mobile information will be shared with third parties or
                  affiliates for marketing or promotional purposes.
                </strong>{" "}
                Text messaging opt-in data and consent are not shared with any
                third parties, except the phone carrier and messaging provider
                that deliver our messages.
              </p>
            </>
          ),
        },
        {
          heading: "Who we share it with",
          body: (
            <>
              <p>
                We don&apos;t sell or rent your information. We share it only
                with service providers that run this website and our phones, and
                only so they can do that job:
              </p>
              <ul>
                <li>Vercel (website hosting and anonymous analytics)</li>
                <li>Google Cloud (hosts our booking calendar and records)</li>
                <li>Twilio (business phone line, voicemail, and texts)</li>
                <li>Google (email for confirmations and our own inbox)</li>
              </ul>
              <p>We may also disclose information if required by law.</p>
            </>
          ),
        },
        {
          heading: "How long we keep it",
          body: (
            <p>
              As long as needed to respond to you and keep business records,
              typically no more than three years after our last contact.
              Voicemail recordings are deleted after their transcript is saved,
              or within 90 days.
            </p>
          ),
        },
        {
          heading: "Your choices",
          body: (
            <p>
              Ask us to see, correct, or delete your information by calling or
              texting{" "}
              <a href={phone.href} className="font-mono">
                {phone.display}
              </a>
              . Reply STOP to any text to stop receiving them. Use the link in
              any booking email to cancel or reschedule.
            </p>
          ),
        },
        {
          heading: "Changes",
          body: (
            <p>
              If we change this policy, we&apos;ll update the date at the top of
              this page.
            </p>
          ),
        },
      ]}
    />
  );
}
