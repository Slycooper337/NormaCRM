"use client";

import { useMemo, useState } from "react";
import type { Metadata } from "next";

type Lead = {
  id: number;
  name: string;
  type: string;
  city: string;
  state: string;
  country: string;
  range: string;
  fit: number;
  tier: "A" | "B" | "C" | "D";
  contact: string;
  title: string;
  email: string;
  website: string;
  status: string;
  next: string;
  note: string;
  tags: string[];
};

const seedLeads: Lead[] = [
  { id: 1, name: "Buffalo 8", type: "Production", city: "Los Angeles", state: "CA", country: "USA", range: "$250K–$5M", fit: 9, tier: "A", contact: "Matt Miller", title: "Founder & CEO", email: "submissions@buffalo8.com", website: "buffalo8.com", status: "Researching", next: "Jul 24", note: "Integrated production, financing, and post partner for filmmaker-led features. Strong emerging filmmaker signal.", tags: ["Production", "Financing", "Emerging filmmakers"] },
  { id: 2, name: "The Film Collaborative", type: "Producer Rep", city: "Los Angeles", state: "CA", country: "USA", range: "$50K–$2M", fit: 8, tier: "A", contact: "Orly Ravid", title: "Founder", email: "info@thefilmcollaborative.org", website: "thefilmcollaborative.org", status: "To contact", next: "Jul 22", note: "Nonprofit distributor and producer-services partner with an independent film focus; useful for package strategy and introductions.", tags: ["Producer Rep", "Indie film", "Packaging"] },
  { id: 3, name: "Buffalo Gal Pictures", type: "Production", city: "Winnipeg", state: "MB", country: "Canada", range: "$500K–$8M", fit: 7, tier: "B", contact: "Mynette Louie", title: "President", email: "info@buffalogalpictures.com", website: "buffalogalpictures.com", status: "Researching", next: "Jul 29", note: "Established independent production company with feature experience and a history of creative partnerships.", tags: ["Production", "Co-production"] },
  { id: 4, name: "The Exchange", type: "Packaging", city: "Los Angeles", state: "CA", country: "USA", range: "$1M–$15M", fit: 6, tier: "B", contact: "Brian O’Shea", title: "CEO", email: "info@theexchange.ws", website: "theexchange.ws", status: "Needs warm intro", next: "Aug 05", note: "International sales and financing conversations can be relevant when a package has cast and a clear market angle.", tags: ["Packaging", "Sales", "Finance"] },
  { id: 5, name: "FilmHedge", type: "Finance", city: "Los Angeles", state: "CA", country: "USA", range: "$1M–$20M", fit: 5, tier: "C", contact: "Investment Team", title: "Film Finance", email: "info@filmhedge.com", website: "filmhedge.com", status: "Researching", next: "Aug 12", note: "Film-focused financing platform. Budget floor and current mandate need verification before outreach.", tags: ["Equity", "Debt", "Film fund"] },
  { id: 6, name: "Moonstruck Pictures", type: "Production", city: "Austin", state: "TX", country: "USA", range: "$100K–$3M", fit: 9, tier: "A", contact: "Independent Projects", title: "Development", email: "hello@moonstruckpictures.com", website: "moonstruckpictures.com", status: "To contact", next: "Jul 23", note: "Texas-based filmmaker-first company; geographic fit is high for a Texas / Louisiana financing path.", tags: ["Production", "Texas", "Emerging filmmakers"] },
  { id: 7, name: "New Orleans Film Society", type: "Film Lab", city: "New Orleans", state: "LA", country: "USA", range: "$50K–$500K", fit: 9, tier: "A", contact: "Artist Services", title: "Program Team", email: "info@neworleansfilmsociety.org", website: "neworleansfilmsociety.org", status: "To contact", next: "Jul 26", note: "Local ecosystem partner with filmmaker support, labs, and grant intelligence valuable to a Louisiana shoot.", tags: ["Film lab", "Louisiana", "Grants"] },
  { id: 8, name: "Impact24 PR", type: "Packaging", city: "Los Angeles", state: "CA", country: "USA", range: "$100K–$5M", fit: 7, tier: "B", contact: "Production Team", title: "Film & TV", email: "info@impact24pr.com", website: "impact24pr.com", status: "Researching", next: "Aug 01", note: "Packaging and campaign strategy can help strengthen a first-look financing approach once the deck is ready.", tags: ["Packaging", "EP services"] },
  { id: 9, name: "Sundance Institute Catalyst", type: "Film Lab", city: "Park City", state: "UT", country: "USA", range: "$100K–$5M", fit: 8, tier: "A", contact: "Catalyst Programs", title: "Program Team", email: "catalyst@sundance.org", website: "sundance.org", status: "Deadline watch", next: "Sep 10", note: "High-signal development and financing program for independent narrative work; eligibility and cycle timing to confirm.", tags: ["Film lab", "Narrative", "Emerging filmmakers"] },
  { id: 10, name: "FilmAlabama", type: "Tax Credit", city: "Montgomery", state: "AL", country: "USA", range: "$50K–$10M", fit: 6, tier: "B", contact: "Production Incentives", title: "Film Office", email: "film@film.alabama.gov", website: "film.alabama.gov", status: "Researching", next: "Aug 15", note: "Useful benchmark for incentive stack research; compare against Louisiana and neighboring states.", tags: ["Tax credit", "Film commission"] },
  { id: 11, name: "Film Independent", type: "Film Lab", city: "Los Angeles", state: "CA", country: "USA", range: "$50K–$1M", fit: 9, tier: "A", contact: "Artist Development", title: "Project Involve / Labs", email: "info@filmindependent.org", website: "filmindependent.org", status: "Deadline watch", next: "Oct 02", note: "Strong fit for emerging filmmaker support, mentorship, and package credibility.", tags: ["Film lab", "Narrative", "Mentorship"] },
  { id: 12, name: "Cine Qua Non", type: "Attorney", city: "New York", state: "NY", country: "USA", range: "$100K–$10M", fit: 7, tier: "B", contact: "Entertainment Group", title: "Counsel", email: "info@cineqn.com", website: "cineqn.com", status: "Researching", next: "Aug 19", note: "Potential counsel for chain-of-title, investor documents, and independent feature financing structure.", tags: ["Attorney", "Finance", "Packaging"] },
  { id: 13, name: "Film London", type: "Film Market", city: "London", state: "—", country: "UK", range: "$100K–$10M", fit: 5, tier: "C", contact: "Industry Team", title: "Film Support", email: "info@filmlondon.org.uk", website: "filmlondon.org.uk", status: "Researching", next: "Sep 18", note: "International market and funding intelligence; lower priority until the package has a stronger finance hook.", tags: ["Market", "Funding"] },
  { id: 14, name: "Georgia Film, Music & Digital Entertainment", type: "Tax Credit", city: "Atlanta", state: "GA", country: "USA", range: "$50K–$20M", fit: 8, tier: "A", contact: "Production Incentives", title: "Film Office", email: "film@georgia.org", website: "georgia.org", status: "To contact", next: "Jul 31", note: "Important incentive comparison for a Southeast production plan; confirm minimum spend and audit mechanics.", tags: ["Tax credit", "Georgia", "Film commission"] },
];

const categories = ["All leads", "Packaging", "Production", "Finance", "Producer Rep", "Tax Credit", "Film Lab", "Attorney", "Film Market"];

export default function Home() {
  const [leads, setLeads] = useState(seedLeads);
  const [activeCategory, setActiveCategory] = useState("All leads");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeView, setActiveView] = useState<"list" | "compact">("list");
  const [workspace, setWorkspace] = useState("Lead database");
  const [toast, setToast] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");

  const filtered = useMemo(() => leads.filter((lead) => {
    const matchesCategory = activeCategory === "All leads" || lead.type === activeCategory;
    const haystack = `${lead.name} ${lead.city} ${lead.state} ${lead.country} ${lead.tags.join(" ")}`.toLowerCase();
    const matchesStatus = statusFilter === "All statuses" || lead.status === statusFilter;
    return matchesCategory && matchesStatus && haystack.includes(query.toLowerCase());
  }), [leads, activeCategory, query, statusFilter]);
  const selected = leads.find((lead) => lead.id === selectedId) ?? filtered[0] ?? leads[0];
  const aCount = leads.filter((lead) => lead.tier === "A").length;

  function exportCsv() {
    const headers = ["Company", "Type", "City", "State", "Country", "Budget range", "Fit", "Tier", "Contact", "Title", "Email", "Website", "Status", "Why they fit Norma"];
    const rows = leads.map((lead) => [lead.name, lead.type, lead.city, lead.state, lead.country, lead.range, lead.fit, lead.tier, lead.contact, lead.title, lead.email, lead.website, lead.status, lead.note]);
    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const link = document.createElement("a"); link.href = url; link.download = "norma-financing-crm.csv"; link.click(); URL.revokeObjectURL(url);
  }

  function addLead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const next: Lead = { id: Date.now(), name: String(form.get("name")), type: String(form.get("type")), city: String(form.get("city")), state: String(form.get("state")), country: "USA", range: "$50K–$1M", fit: 6, tier: "C", contact: "—", title: "—", email: "—", website: String(form.get("website")), status: "New", next: "Set date", note: "New lead added to the Norma financing pipeline.", tags: [String(form.get("type")), "New lead"] };
    setLeads((current) => [next, ...current]); setSelectedId(next.id); setShowAdd(false);
  }

  function announce(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }

  function cycleStatus() {
    if (!selected) return;
    const statuses = ["Researching", "To contact", "Needs warm intro", "Follow-up", "Closed"];
    const nextStatus = statuses[(statuses.indexOf(selected.status) + 1) % statuses.length];
    setLeads((current) => current.map((lead) => lead.id === selected.id ? { ...lead, status: nextStatus } : lead));
    announce(`Status moved to ${nextStatus}`);
  }

  function openWebsite() {
    if (selected?.website && selected.website !== "—") window.open(`https://${selected.website.replace(/^https?:\/\//, "")}`, "_blank", "noopener,noreferrer");
  }

  return <main className="shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-logo"><img src="/scope-creep-logo.png" alt="Scope Creep" /></div><div><div className="eyebrow">Scope Creep LLC</div><div className="brand-name">Norma / financing</div></div></div>
      <div className="project-card"><span className="pulse" /> <span>Active project</span><strong>Norma</strong><small>Feature film · $90K budget</small></div>
      <nav><div className="nav-label">Workspace</div>{[["Lead database", "◈", String(leads.length)], ["Outreach queue", "✦", "4"], ["Follow-ups", "◷", "7"], ["Research notes", "▣", ""]].map(([label, icon, count]) => <button key={label} onClick={() => { setWorkspace(label); announce(`${label} selected`); }} className={`nav-item ${workspace === label ? "active" : ""}`}><span>{icon}</span> {label} <b>{count}</b></button>)}</nav>
      <div className="sidebar-bottom"><div className="nav-label">Project snapshot</div><div className="mini-row"><span>Raised</span><strong>$28K <em>/ $90K</em></strong></div><div className="progress"><i /></div><div className="mini-row"><span>Production</span><strong>Jan 2027</strong></div><div className="mini-row"><span>Package</span><strong>65% ready</strong></div><div className="avatar-row"><div className="avatar">AM</div><span>Alex Morgan<br /><small>Producer</small></span><button aria-label="Settings">⚙</button></div></div>
    </aside>
    <section className="content">
      <header className="topbar"><div className="crumb">PROJECTS <span>/</span> NORMA <span>/</span> {workspace.toUpperCase()}</div><div className="top-actions"><span className="sync"><i /> Synced just now</span><button className="icon-button" onClick={() => announce("Tip: select a lead to inspect its Norma fit and next touchpoint")} aria-label="Help">?</button><button className="avatar top-avatar" onClick={() => announce("Producer profile: Alex Morgan")} aria-label="Open profile">AM</button></div></header>
      <div className="headline"><div><div className="kicker">INDEPENDENT FEATURE · FINANCING CRM</div><h1>Find the people<br /><i>who get films made.</i></h1><p className="subhead">A focused pipeline for the Norma package — from first signal to financing partner.</p></div><div className="headline-actions"><button className="button quiet" onClick={exportCsv}>↧ Export CSV</button><button className="button primary" onClick={() => setShowAdd(true)}>＋ Add lead</button></div></div>
      <div className="stats"><div className="stat"><span className="stat-icon gold">◎</span><div><strong>{leads.length}</strong><small>Total leads</small></div><em>+3 this week</em></div><div className="stat"><span className="stat-icon coral">★</span><div><strong>{aCount}</strong><small>Priority A</small></div><em>Needs action</em></div><div className="stat"><span className="stat-icon blue">↗</span><div><strong>$70K</strong><small>Still to raise</small></div><em>Target gap</em></div><div className="stat deadline"><span className="stat-icon green">◷</span><div><strong>164</strong><small>Days to prep</small></div><em>Jan 2027 start</em></div></div>
      <div className="toolbar"><div className="search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search companies, people, locations..." /></div><button className={`filter-button ${showFilters ? "pressed" : ""}`} onClick={() => setShowFilters((current) => !current)}>☷ Filters <span>{statusFilter === "All statuses" ? 0 : 1}</span></button><button className={`view-button ${activeView === "list" ? "active" : ""}`} onClick={() => setActiveView("list")} aria-label="List view">▤</button><button className={`view-button ${activeView === "compact" ? "active" : ""}`} onClick={() => setActiveView("compact")} aria-label="Compact view">☷</button></div>
      {showFilters && <div className="filter-popover"><label>Status<select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option>All statuses</option><option>Researching</option><option>To contact</option><option>Needs warm intro</option><option>Deadline watch</option><option>New</option></select></label><button onClick={() => { setStatusFilter("All statuses"); setShowFilters(false); }}>Clear</button></div>}
      <div className="category-tabs">{categories.map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={activeCategory === category ? "active" : ""}>{category}{category === "All leads" && <span>{leads.length}</span>}</button>)}</div>
      <div className={`workspace-grid ${activeView === "compact" ? "compact-view" : ""}`}><section className="lead-list"><div className="list-head"><div><h2>{activeCategory === "All leads" ? "All leads" : activeCategory}</h2><span>{filtered.length} records · ranked by Norma fit</span></div><button className="sort" onClick={() => { setLeads((current) => [...current].sort((a, b) => b.fit - a.fit)); announce("Leads sorted by fit score"); }}>Fit score ↓</button></div>{filtered.map((lead) => <button className={`lead-row ${selected?.id === lead.id ? "selected" : ""}`} key={lead.id} onClick={() => setSelectedId(lead.id)}><div className={`tier tier-${lead.tier.toLowerCase()}`}>{lead.tier}</div><div className="lead-main"><strong>{lead.name}</strong><span>{lead.type} <i>·</i> {lead.city}, {lead.state}</span></div><div className="lead-range">{lead.range}</div><div className="fit"><strong>{lead.fit}/10</strong><span>fit</span></div><div className="row-arrow">→</div></button>)}{filtered.length === 0 && <div className="empty">No leads match that search yet.</div>}</section>
        {selected && <aside className="detail"><div className="detail-top"><span className={`tier tier-${selected.tier.toLowerCase()}`}>{selected.tier}</span><span className="detail-type">{selected.type}</span><button onClick={() => announce("More lead actions coming soon")} aria-label="More lead actions">•••</button></div><h2>{selected.name}</h2><div className="location">⌖ {selected.city}, {selected.state} · {selected.country}</div><div className="detail-fit"><div><small>NORMA FIT SCORE</small><strong>{selected.fit}<span>/10</span></strong></div><div className="score-ring"><i style={{"--score": `${selected.fit * 10}%`} as React.CSSProperties} /></div></div><div className="detail-actions"><button className="button primary" onClick={() => announce(`Outreach draft started for ${selected.name}`)}>✉ Draft outreach</button><button className="button quiet" onClick={openWebsite}>↗ Open website</button></div><div className="detail-section"><h3>Why it fits Norma</h3><p>{selected.note}</p></div><div className="detail-section"><h3>Contact</h3><div className="contact-card"><div className="contact-avatar">{selected.contact.split(" ").map((part) => part[0]).join("").slice(0,2)}</div><div><strong>{selected.contact}</strong><span>{selected.title}</span></div></div><div className="contact-line">✉ <a href={`mailto:${selected.email}`}>{selected.email}</a></div><div className="contact-line">◉ {selected.website}</div></div><div className="detail-section"><h3>Pipeline status <button className="edit" onClick={cycleStatus}>Edit</button></h3><button className="status-pill" onClick={cycleStatus}><span /> {selected.status}<b>⌄</b></button><div className="next-step"><span>Next touchpoint</span><button onClick={() => announce("Next touchpoint picker opened")}><strong>{selected.next} <small>⌄</small></strong></button></div></div><div className="tag-list">{selected.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></aside>}
      </div>
    </section>
    {showAdd && <div className="modal-backdrop" onClick={() => setShowAdd(false)}><form className="modal" onSubmit={addLead} onClick={(event) => event.stopPropagation()}><div className="modal-head"><div><div className="kicker">NEW RECORD</div><h2>Add a lead</h2></div><button type="button" onClick={() => setShowAdd(false)}>×</button></div><label>Company name<input name="name" required placeholder="e.g. Bright Harbor Films" /></label><div className="form-grid"><label>Type<select name="type" defaultValue="Production">{categories.slice(1).map((category) => <option key={category}>{category}</option>)}</select></label><label>City<input name="city" placeholder="Los Angeles" /></label><label>State<input name="state" placeholder="CA" /></label><label>Website<input name="website" placeholder="company.com" /></label></div><button className="button primary full">Add to database</button></form></div>}
    {toast && <div className="toast">{toast}</div>}
  </main>;
}
