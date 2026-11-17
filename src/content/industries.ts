// Trades we serve. Each one gets its own landing page at /industries/<slug>,
// targeting searches like "HVAC website design Austin" and
// "marketing for Austin plumbers". Keep every page's copy specific to the
// trade: near-duplicate pages get ignored by Google.

export type Faq = { question: string; answer: string };

export type Industry = {
  slug: string;
  label: string;
  /** Plural noun for the people in this trade, used in copy and titles. */
  pros: string;
  /** Why missed calls hurt this trade in particular (index card). */
  note: string;
  /** <title> without the brand suffix. Aim for ≤ 50 characters. */
  seoTitle: string;
  /** Meta description, ≤ 155 characters. */
  seoDescription: string;
  headline: string;
  intro: string;
  /** What homeowners in Austin actually type into Google for this trade. */
  searches: string[];
  /** Where leads leak for this trade. */
  leaks: { title: string; body: string }[];
  /** What we set up, specific to the trade. */
  build: string[];
  faqs: Faq[];
};

export const industries: Industry[] = [
  {
    slug: "hvac",
    label: "HVAC",
    pros: "HVAC contractors",
    note: "Emergency calls go to whoever answers first.",
    seoTitle: "HVAC Websites & Lead Systems in Austin",
    seoDescription:
      "Websites, Google visibility, and missed-call text-back for Austin HVAC companies. Catch every no-AC call in July, even after hours. Book a free call.",
    headline: "When the AC dies in August, be the company that answers.",
    intro:
      "An Austin homeowner with a dead system at 9pm calls three companies and books the first one that responds. We build HVAC websites and lead systems that make sure that's you, day or night.",
    searches: [
      "AC repair near me",
      "emergency AC repair Austin",
      "HVAC company Round Rock",
      "furnace not working Cedar Park",
      "AC tune-up Pflugerville",
    ],
    leaks: [
      {
        title: "Peak-season overflow",
        body: "From June to September your phones ring while your techs are on roofs and in attics. Calls that hit voicemail rarely leave a message; they dial the next listing.",
      },
      {
        title: "After-hours emergencies",
        body: "No-cool calls at night are high-value and urgent. Without an instant reply, they go to whichever company has a live answer.",
      },
      {
        title: "Maintenance-plan follow-up",
        body: "Tune-up reminders and plan renewals are easy money that slips when nobody has time to send them.",
      },
    ],
    build: [
      "Service pages for AC repair, installation, heating, and maintenance plans, each targeting the searches above",
      "Instant text-back on missed calls, so a homeowner hears from you in seconds",
      "After-hours capture that collects the address and problem, then flags emergencies",
      "Google Business Profile tuned for 'AC repair near me' in the suburbs you serve",
      "Automatic review requests after each completed job",
    ],
    faqs: [
      {
        question: "Can you help us handle the summer call spike?",
        answer:
          "Yes. Missed-call text-back and after-hours capture are built for exactly that. Every caller gets a reply in seconds, and you see every lead in one inbox to call back in order of urgency.",
      },
      {
        question: "Do you work with our dispatch or field-service software?",
        answer:
          "In most cases leads can be sent to the tools you already use by email or integration. We'll confirm on the first call what you run and how leads should arrive.",
      },
      {
        question: "Will this help us rank for 'AC repair near me'?",
        answer:
          "'Near me' results come mostly from your Google Business Profile, reviews, and how clearly your site says where you work. We work on all three. Nobody can honestly guarantee a ranking, but these are the levers that move it.",
      },
    ],
  },
  {
    slug: "plumbing",
    label: "Plumbing",
    pros: "plumbers",
    note: "A burst pipe won't wait for a callback.",
    seoTitle: "Plumber Websites & Lead Systems in Austin",
    seoDescription:
      "Websites and lead systems for Austin plumbers. Show up for 'emergency plumber near me', answer every call, and turn more water heater and leak calls into jobs.",
    headline: "Water on the floor means the first plumber who answers wins.",
    intro:
      "Plumbing emergencies don't leave room for a callback. We build plumbing websites and lead systems that put you at the top of the list and reply to every caller in seconds, even when you're under a sink.",
    searches: [
      "emergency plumber near me",
      "plumber Austin TX",
      "water heater repair Georgetown",
      "slab leak repair Austin",
      "drain cleaning Leander",
    ],
    leaks: [
      {
        title: "Hands-full calls",
        body: "You can't answer the phone mid-repair. Every unanswered emergency call is a job going to the next name on Google.",
      },
      {
        title: "Quote requests that go cold",
        body: "Water heater and repipe quotes need a quick follow-up. When it takes a day, the homeowner has already booked someone else.",
      },
      {
        title: "Thin or missing service pages",
        body: "A single 'Services' page can't rank for water heaters, slab leaks, and drain cleaning at once. Each needs its own page.",
      },
    ],
    build: [
      "Dedicated pages for emergency service, water heaters, leaks, drains, and repipes",
      "Missed-call text-back so emergency callers hear from you right away",
      "Short quote forms with photo-friendly follow-up by text",
      "Google Business Profile categories and service areas set up correctly",
      "Review requests that go out after each job, while the customer is happy",
    ],
    faqs: [
      {
        question: "We get a lot of after-hours calls. What happens to those?",
        answer:
          "They get an instant text back, the system collects the address and what's wrong, and urgent ones are flagged so you can decide whether to roll a truck or call first thing.",
      },
      {
        question: "Do we need a new website, or can you work with ours?",
        answer:
          "If your current site is fast and you can edit it, we can often add the missing pages and lead capture to it. If it's slow or hard to change, a rebuild usually pays for itself sooner.",
      },
      {
        question: "How do reviews fit in?",
        answer:
          "Reviews are one of the biggest factors in local search and in who the homeowner trusts. We automate the ask after each job so the count keeps climbing without anyone remembering to do it.",
      },
    ],
  },
  {
    slug: "electrical",
    label: "Electrical",
    pros: "electricians",
    note: "High-ticket jobs, short decision windows.",
    seoTitle: "Electrician Websites & Lead Systems in Austin",
    seoDescription:
      "Websites and lead systems for Austin electricians. Win panel upgrade, EV charger, and generator jobs with fast replies and pages homeowners trust.",
    headline: "Big electrical jobs go to the electrician who looks the part.",
    intro:
      "Panel upgrades, EV chargers, and whole-home generators are big decisions. Homeowners compare a few electricians and pick the one who looks licensed, local, and quick to respond. We build the site and system that make that easy.",
    searches: [
      "electrician near me",
      "panel upgrade Austin",
      "EV charger installation Round Rock",
      "whole home generator Cedar Park",
      "licensed electrician Pflugerville",
    ],
    leaks: [
      {
        title: "Trust gaps",
        body: "No license number, no photos of real work, no reviews on the page. Homeowners spending thousands want proof before they call.",
      },
      {
        title: "Slow quote follow-up",
        body: "High-ticket jobs get several quotes. The electrician who follows up the same day usually gets the job.",
      },
      {
        title: "Missing project pages",
        body: "EV chargers and generators are fast-growing searches in Austin. Without a page for each, you're invisible for them.",
      },
    ],
    build: [
      "Pages for panel upgrades, EV chargers, generators, lighting, and repairs",
      "Your TECL license number, insurance, and project photos placed where buyers look",
      "Quote forms that capture the details you need to price the job",
      "Automatic follow-up texts so warm quotes don't go cold",
      "Google Business Profile and review requests for local search",
    ],
    faqs: [
      {
        question: "Can you help us get more EV charger and generator jobs?",
        answer:
          "We build dedicated pages for each, aimed at what Austin homeowners search, and connect them to quote forms. That's usually the fastest way to start showing up for those jobs.",
      },
      {
        question: "Should our license number be on the website?",
        answer:
          "Yes. Texas electrical contractors are licensed by TDLR, and showing the number clearly builds trust with homeowners and with Google.",
      },
      {
        question: "Do you do commercial electrical marketing too?",
        answer:
          "We focus on residential home service work. If you do both, we can still help with the residential side.",
      },
    ],
  },
  {
    slug: "roofing",
    label: "Roofing",
    pros: "roofers",
    note: "Storm season means a flood of leads at once.",
    seoTitle: "Roofing Websites & Lead Systems in Austin",
    seoDescription:
      "Websites and lead systems for Austin roofers. Capture every hail and storm-damage lead, reply instantly, and win more inspections and replacements.",
    headline: "After the hail, every roofer's phone rings. Answer first.",
    intro:
      "A Central Texas hailstorm can bring a week's worth of leads in a day. We build roofing websites and lead systems that catch every inquiry, reply in seconds, and keep follow-up moving while your crews are busy.",
    searches: [
      "roof repair near me",
      "hail damage roof inspection Austin",
      "roof replacement Round Rock",
      "roofing company Georgetown TX",
      "storm damage roofer Leander",
    ],
    leaks: [
      {
        title: "Storm-day overload",
        body: "Lead volume spikes overnight after a storm. Without an automatic reply, most of those calls and forms go unanswered for days.",
      },
      {
        title: "Long sales cycles",
        body: "Replacements and insurance claims take weeks. Leads drop off when nobody follows up between inspection and signature.",
      },
      {
        title: "Generic trust signals",
        body: "Homeowners worry about storm chasers. A clearly local company, with real project photos and reviews, stands out.",
      },
    ],
    build: [
      "Pages for repair, replacement, storm and hail damage, and inspections",
      "Instant replies to every call and form, so storm-day leads are never ignored",
      "Inspection booking that captures the address and damage details up front",
      "Follow-up sequences that keep replacement leads warm",
      "Local trust signals: real addresses served, crew photos, and reviews",
    ],
    faqs: [
      {
        question: "Can the system handle a storm-day surge?",
        answer:
          "Yes. Auto-replies don't care if there are five leads or five hundred. Every lead gets an answer, lands in one inbox, and can be sorted by area so you can schedule inspections efficiently.",
      },
      {
        question: "How do we stand out from storm chasers?",
        answer:
          "Show that you're local and accountable: your service area, real job photos, reviews from nearby homeowners, and a phone number that gets answered. We build all of that into the site.",
      },
      {
        question: "Do you run paid ads?",
        answer:
          "Our focus is your website, Google Business Profile, and lead handling, which make any ad spend work harder. We can talk through ads on the call if you're running them.",
      },
    ],
  },
  {
    slug: "landscaping",
    label: "Landscaping",
    pros: "landscapers",
    note: "Seasonal demand, lots of quote requests.",
    seoTitle: "Landscaping Websites & Lead Systems in Austin",
    seoDescription:
      "Websites and lead systems for Austin landscapers. Show off your projects, sort quote requests fast, and turn spring demand into booked jobs and recurring clients.",
    headline: "Turn spring quote requests into a full schedule.",
    intro:
      "Landscaping buyers shop with their eyes and send a lot of quote requests in a short season. We build landscaping websites that show your best work and lead systems that keep every request organized and answered.",
    searches: [
      "landscaping company near me",
      "landscaper Austin TX",
      "xeriscaping Austin",
      "lawn care Cedar Park",
      "landscape design Georgetown",
    ],
    leaks: [
      {
        title: "Weak project galleries",
        body: "Buyers judge landscapers on photos. A thin gallery, or no gallery at all, sends them to a competitor whose work they can see.",
      },
      {
        title: "Unsorted quote requests",
        body: "Spring brings a pile of requests, from a hedge trim to a full redesign. Without triage, the big jobs wait in line behind the small ones.",
      },
      {
        title: "One-and-done customers",
        body: "A design job is the perfect start to a maintenance contract, but only if someone follows up.",
      },
    ],
    build: [
      "Project galleries organized by job type, built to load fast on phones",
      "Pages for design, installs, xeriscaping, irrigation, and maintenance",
      "Quote forms that capture budget, size, and photos so you can sort leads fast",
      "Follow-up that offers maintenance plans after an install",
      "Google Business Profile with regular project photo updates",
    ],
    faqs: [
      {
        question: "Can we filter out small jobs we don't want?",
        answer:
          "Yes. The quote form can ask for project type and budget range, so you see right away which requests fit and can reply to the rest with a polite referral.",
      },
      {
        question: "Will lots of photos slow the site down?",
        answer:
          "Not if they're handled properly. We compress and size images automatically so galleries stay fast on phones, which also helps search rankings.",
      },
      {
        question: "Is xeriscaping worth its own page in Austin?",
        answer:
          "Usually, yes. Water restrictions make it a common search here, and a dedicated page is how you show up for it.",
      },
    ],
  },
  {
    slug: "pest-control",
    label: "Pest control",
    pros: "pest control companies",
    note: "Recurring plans start with one call.",
    seoTitle: "Pest Control Websites & Lead Systems in Austin",
    seoDescription:
      "Websites and lead systems for Austin pest control companies. Answer every call, rank for termite, scorpion, and rodent searches, and convert one-time calls into plans.",
    headline: "Every recurring plan starts with one answered call.",
    intro:
      "Someone who just found scorpions in the bathtub wants help today, and they'll call whoever answers. We build pest control websites and lead systems that win that first call and turn it into a quarterly plan.",
    searches: [
      "pest control near me",
      "scorpion control Austin",
      "termite inspection Round Rock",
      "rodent removal Pflugerville",
      "mosquito treatment Cedar Park",
    ],
    leaks: [
      {
        title: "Urgent calls that hit voicemail",
        body: "Pest problems feel urgent. Callers who don't get through try the next company within minutes.",
      },
      {
        title: "One-time treatments that never convert",
        body: "The real value is the recurring plan. Without follow-up after the first visit, most customers never sign up.",
      },
      {
        title: "Pest-specific searches",
        body: "Austin homeowners search by pest: scorpions, termites, rodents, mosquitoes. A page for each is how you show up.",
      },
    ],
    build: [
      "Pages for scorpions, termites, rodents, mosquitoes, ants, and general pest plans",
      "Missed-call text-back so urgent callers hear from you right away",
      "Follow-up after one-time treatments that offers a recurring plan",
      "Review requests timed after each service visit",
      "Google Business Profile tuned for the neighborhoods you treat",
    ],
    faqs: [
      {
        question: "Can you help us sell more recurring plans?",
        answer:
          "Yes. We set up follow-up after one-time treatments that explains the plan and makes it easy to say yes. It's often the highest-return piece of the system.",
      },
      {
        question: "Should we have a page for every pest?",
        answer:
          "For the pests you treat most and that people search for here, yes. Scorpions, termites, and rodents are common Austin searches, and each page can rank on its own.",
      },
      {
        question: "Do you need access to our scheduling software?",
        answer:
          "Not to start. Leads can arrive by email and text. If you want them sent straight into your software, we'll look at what's possible on the first call.",
      },
    ],
  },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}
