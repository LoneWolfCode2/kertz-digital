import Link from "next/link";

/**
 * Optional SMS opt-in, worded the way US carriers expect for A2P 10DLC
 * review: unchecked by default, not required to submit, states frequency,
 * rates, STOP/HELP, and links the terms and privacy policy.
 */
export function SmsConsent({ defaultChecked }: { defaultChecked?: boolean }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-sm">
      <input
        type="checkbox"
        name="smsConsent"
        value="yes"
        defaultChecked={defaultChecked}
        className="mt-0.5 size-5 shrink-0 accent-foreground"
      />
      <span className="text-muted-foreground text-pretty">
        <span className="font-semibold text-foreground">
          Text me about my request
        </span>{" "}
        (optional). Kertz Digital may text you about your inquiry and
        appointments. Msg frequency varies. Msg &amp; data rates may apply.
        Reply STOP to opt out, HELP for help.{" "}
        <Link href="/sms-terms" className="underline">
          SMS terms
        </Link>{" "}
        ·{" "}
        <Link href="/privacy" className="underline">
          Privacy
        </Link>
      </span>
    </label>
  );
}
