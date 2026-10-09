import { Accordion, type AccordionItem } from "@/components/ui/accordion";

const FAQS: AccordionItem[] = [
  {
    q: "Is Linkbase free?",
    a: "Yes. The free plan includes unlimited links, a custom theme and basic click stats. Paid plans add scheduling and deeper analytics.",
  },
  {
    q: "Can I change my username later?",
    a: "Yes, from Settings at any time. Your old link redirects for 30 days.",
  },
  {
    q: "Where can I use my Linkbase link?",
    a: "Anywhere you can paste a URL: Instagram, TikTok, YouTube, email signatures, business cards.",
  },
  {
    q: "Do I need a website?",
    a: "No. Your Linkbase page works on its own and loads fast on any phone.",
  },
  {
    q: "Can I see who clicks my links?",
    a: "You see total clicks per link and where visitors came from. Linkbase never shows personal visitor data.",
  },
  {
    q: "How do I delete my account?",
    a: "Go to Settings · Account and choose Delete. Your page goes offline right away.",
  },
];

export function Faq() {
  return (
    <section className="bg-lb-pine px-[clamp(16px,4vw,24px)] py-[clamp(64px,10vw,120px)] text-lb-white">
      <div className="mx-auto flex max-w-[1200px] flex-wrap gap-[clamp(32px,6vw,80px)]">
        <div className="flex flex-[1_1_300px] flex-col gap-4">
          <h2 className="m-0 font-display text-[clamp(40px,6vw,64px)] leading-[1.02] font-extrabold tracking-[-0.035em] text-lb-butter">
            Questions? Answered.
          </h2>
          <p className="m-0 max-w-[360px] text-lg leading-[1.5]">
            Still stuck? Write to help@linkbase.me and a person will reply.
          </p>
        </div>
        <div className="min-w-0 flex-[2_1_520px]">
          <Accordion items={FAQS} tone="dark" defaultOpen={0} />
        </div>
      </div>
    </section>
  );
}
