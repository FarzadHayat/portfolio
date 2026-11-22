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
    <div className="referrals">
      <div className="referrals__controls">
        <label className="sr-only" htmlFor={searchId}>
          Search referrals
        </label>
        <input
          id={searchId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by name, category, code…"
          className="field"
          autoComplete="off"
        />

        {categories.length > 1 && (
          <div
            className="referrals__filters"
            role="group"
            aria-label="Filter by category"
          >
            <button
              type="button"
              className={`btn btn--sm ${category === "all" ? "btn--primary" : "btn--ghost"}`}
              aria-pressed={category === "all"}
              onClick={() => setCategory("all")}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`btn btn--sm ${category === cat ? "btn--primary" : "btn--ghost"}`}
                aria-pressed={category === cat}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="referrals__count" aria-live="polite">
        {filtered.length === items.length
          ? `${items.length} referral${items.length === 1 ? "" : "s"}`
          : `${filtered.length} of ${items.length} referrals`}
      </p>

      {filtered.length === 0 ? (
        <p className="referrals__empty">
          No referrals match your search.
        </p>
      ) : (
        <ul className="referrals__list">
          {filtered.map((item) => {
            const reportHref = buildReportMailto(reportEmail, item);
            const copied = copiedId === item.id;

            return (
              <li
                key={item.id}
                className="referral card"
              >
                <div className="referral__info">
                  <div className="referral__head">
                    <h2 className="referral__name">{item.name}</h2>
                    <span className="referral__category">
                      {item.category}
                    </span>
                  </div>
                  <p className="referral__benefit">{item.benefit}</p>
                  {item.code && (
                    <p className="referral__code">
                      <span className="referral__code-label">Code: </span>
                      <span>{item.code}</span>
                    </p>
                  )}
                </div>

                <div className="referral__actions">
                  {item.code && (
                    <button
                      type="button"
                      className="btn btn--sm"
                      onClick={() => copyCode(item)}
                      aria-label={`Copy code for ${item.name}`}
                    >
                      {copied ? "Copied" : "Copy code"}
                    </button>
                  )}
                  {item.url && (
                    <a
                      href={item.url}
                      className="btn btn--sm btn--primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open link
                    </a>
                  )}
                  <a
                    href={reportHref}
                    className="btn btn--sm btn--ghost"
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
