import { useDeferredValue, useId, useState } from "react";

export type ReferralItem = {
  id: string;
  name: string;
  category: string;
  benefit: string;
  code?: string;
  url?: string;
  keywords?: string[];
};

type Props = {
  items: ReferralItem[];
  reportEmail?: string;
};

function buildReportMailto(
  email: string,
  item: ReferralItem
): string {
  const subject = `Broken referral: ${item.name}`;
  const body = [
    "Hi,",
    "",
    `The referral for ${item.name} (${item.id}) appears to be broken.`,
    "",
    `Code: ${item.code?.trim() || "n/a"}`,
    `URL: ${item.url?.trim() || "n/a"}`,
    "",
    "Thanks",
  ].join("\n");

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function matchesQuery(item: ReferralItem, query: string): boolean {
  if (!query) return true;
  const haystack = [
    item.name,
    item.category,
    item.benefit,
    item.code ?? "",
    ...(item.keywords ?? []),
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

export default function ReferralsIndex({
  items,
  reportEmail = "hello@farzadhayat.dev",
}: Props) {
  const searchId = useId();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const categories = Array.from(
    new Set(items.map((item) => item.category).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b));

  const filtered = items.filter((item) => {
    if (category !== "all" && item.category !== category) return false;
    return matchesQuery(item, deferredQuery);
  });

  async function copyCode(item: ReferralItem) {
    if (!item.code) return;
    try {
      await navigator.clipboard.writeText(item.code);
      setCopiedId(item.id);
      window.setTimeout(() => {
        setCopiedId((current) => (current === item.id ? null : current));
      }, 2000);
    } catch {
      setCopiedId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-10 -mx-2 bg-base-100/95 px-2 py-3 backdrop-blur supports-[backdrop-filter]:bg-base-100/80">
        <label className="sr-only" htmlFor={searchId}>
          Search referrals
        </label>
        <input
          id={searchId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by name, category, code…"
          className="input input-bordered w-full"
          autoComplete="off"
        />

        {categories.length > 1 && (
          <div
            className="mt-3 flex flex-wrap gap-2"
            role="group"
            aria-label="Filter by category"
          >
            <button
              type="button"
              className={`btn btn-sm rounded-full ${category === "all" ? "btn-primary" : "btn-ghost"}`}
              aria-pressed={category === "all"}
              onClick={() => setCategory("all")}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`btn btn-sm rounded-full ${category === cat ? "btn-primary" : "btn-ghost"}`}
                aria-pressed={category === cat}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="text-sm text-base-content/60" aria-live="polite">
        {filtered.length === items.length
          ? `${items.length} referral${items.length === 1 ? "" : "s"}`
          : `${filtered.length} of ${items.length} referrals`}
      </p>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-lg text-base-content/60">
          No referrals match your search.
        </p>
      ) : (
        <ul className="divide-y divide-base-300 border-y border-base-300">
          {filtered.map((item) => {
            const reportHref = buildReportMailto(reportEmail, item);
            const copied = copiedId === item.id;

            return (
              <li
                key={item.id}
                className="flex flex-col gap-3 py-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
              >
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <span className="text-sm text-base-content/55">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-base-content/80">{item.benefit}</p>
                  {item.code && (
                    <p className="font-mono text-sm">
                      <span className="text-base-content/55">Code: </span>
                      <span>{item.code}</span>
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 sm:shrink-0 sm:justify-end">
                  {item.code && (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline"
                      onClick={() => copyCode(item)}
                      aria-label={`Copy code for ${item.name}`}
                    >
                      {copied ? "Copied" : "Copy code"}
                    </button>
                  )}
                  {item.url && (
                    <a
                      href={item.url}
                      className="btn btn-sm btn-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open link
                    </a>
                  )}
                  <a
                    href={reportHref}
                    className="btn btn-sm btn-ghost"
                    aria-label={`Report broken referral for ${item.name}`}
                  >
                    Report
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
