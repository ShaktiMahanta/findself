import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  LayoutTemplate,
  Code2,
  PanelLeft,
  PenLine,
  Users,
  LifeBuoy,
  ChevronDown,
  ArrowUpRight,
  Menu,
  X,
  Search,
} from "lucide-react";

/**
 * NAV DATA
 * Kept as plain data so the menu is easy to extend — add an object here
 * and it shows up in both the desktop mega-menu and the mobile drawer.
 */
const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Features", href: "#" },
  { label: "Chat", href: "chat" },
  { label: "FindSelf", href: "findSelf" },
];

const ESSENTIALS_COLUMNS = [
  [
    {
      icon: LayoutTemplate,
      title: "Templates",
      description: "Website templates for any use cases.",
      href: "#templates",
    },
    {
      icon: Code2,
      title: "Developer",
      description: "Expert developers for web and mobile solutions.",
      href: "#developer",
    },
    {
      icon: PanelLeft,
      title: "Customer stories",
      description: "Join 100+ satisfied clients and elevate your business.",
      href: "#customer-stories",
    },
  ],
  [
    {
      icon: PenLine,
      title: "Blog",
      description: "Stay ahead with expert insights, industry trends.",
      href: "#blog",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "A group of people connected by shared interests and values.",
      href: "#community",
    },
    {
      icon: LifeBuoy,
      title: "Support",
      description: "Support means help, assistance, or encouragement.",
      href: "#support",
    },
  ],
];

const FEATURED_STORY = {
  eyebrow: "Customer Story",
  title: "Innovative & custom solutions for your digital future",
  stat: "65X",
  statLabel: "Faster xpr5v with us.",
  href: "#featured-story",
};

export default function EssentialsMegaMenu() {
  const [essentialsOpen, setEssentialsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileEssentialsOpen, setMobileEssentialsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const query = searchQuery.trim();
      if (!query) return;
      // Wire this up to real search / routing logic.
      console.log("Search submitted:", query);
    },
    [searchQuery]
  );

  const closeTimer = useRef(null);
  const navRef = useRef(null);
  const triggerRef = useRef(null);

  const openMenu = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setEssentialsOpen(true);
  }, []);

  // Small delay before closing so moving the mouse from the trigger
  // down into the panel doesn't accidentally dismiss it.
  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setEssentialsOpen(false), 120);
  }, []);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    []
  );

  // Close on outside click (covers touch devices where hover doesn't apply).
  useEffect(() => {
    function handleClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setEssentialsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close on Escape, return focus to the trigger.
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape" && essentialsOpen) {
        setEssentialsOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [essentialsOpen]);

  return (
    <header className="relative w-full bg-white font-sans">
      {/* <div
        ref={navRef}
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
      > */}

      <div
        ref={navRef}
        className="flex w-full items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        {/* <a href="#" className="flex items-center gap-2 shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M4 4h9a7 7 0 0 1 0 14H8v2H4V4Zm4 4v6h5a3 3 0 0 0 0-6H8Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            Triangle
          </span>
        </a> */}
        <a href="#" className="flex items-center gap-2 shrink-0">
          <img
            src="/triangle-logo.svg"
            alt="Triangle logo"
            className="h-9 w-9 object-contain"
          />
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            Triangle
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {/* Global search */}
          <form
            role="search"
            onSubmit={handleSearchSubmit}
            className="relative"
          >
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              aria-label="Search"
              className="w-40 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 transition-all focus:w-56 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </form>

          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[15px] font-medium text-slate-700 transition-colors hover:text-indigo-600"
            >
              {link.label}
            </a>
          ))}

          {/* Essentials trigger + mega menu */}
          <div
            className="relative"
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
          >
            <button
              ref={triggerRef}
              type="button"
              aria-haspopup="true"
              aria-expanded={essentialsOpen}
              onClick={() => setEssentialsOpen((v) => !v)}
              className="flex items-center gap-1 text-[15px] font-medium text-indigo-600"
            >
              Essentials
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  essentialsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Panel */}
            <div
              role="menu"
              className={`absolute left-1/2 top-full z-50 mt-3 w-[92vw] max-w-3xl -translate-x-1/2 transition-all duration-150 ${
                essentialsOpen
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-1 opacity-0"
              }`}
            >
              <div className="grid grid-cols-1 gap-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl md:grid-cols-[1fr_1fr_auto]">
                {ESSENTIALS_COLUMNS.map((column, colIdx) => (
                  <div
                    key={colIdx}
                    className={`flex flex-col gap-6 p-6 ${
                      colIdx === 0 ? "md:border-r md:border-slate-100" : ""
                    }`}
                  >
                    {column.map((item) => (
                      <EssentialsItem key={item.title} item={item} />
                    ))}
                  </div>
                ))}

                {/* Featured card */}
                <a
                  href={FEATURED_STORY.href}
                  role="menuitem"
                  className="group flex w-full flex-col justify-between gap-6 bg-slate-900 p-6 md:w-72"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                      {FEATURED_STORY.eyebrow}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>

                  <p className="text-lg font-semibold leading-snug text-white">
                    {FEATURED_STORY.title}
                  </p>

                  <div>
                    <p className="text-3xl font-bold text-white">
                      {FEATURED_STORY.stat}
                    </p>
                    <p className="mt-1 text-sm text-slate-300">
                      {FEATURED_STORY.statLabel}
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <a
            href="#"
            className="text-[15px] font-medium text-slate-700 transition-colors hover:text-indigo-600"
          >
            Contact
          </a>
        </nav>

        {/* Desktop auth buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#"
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-[15px] font-medium text-slate-700 transition-colors hover:border-slate-400"
          >
            Sign in
          </a>
          <a
            href="#"
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-[15px] font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Sign up
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-t border-slate-100 transition-[max-height] duration-200 lg:hidden ${
          mobileOpen ? "max-h-[80vh]" : "max-h-0"
        }`}
      >
        <div className="max-h-[80vh] overflow-y-auto px-4 py-4 sm:px-6">
          {/* Global search */}
          <form
            role="search"
            onSubmit={handleSearchSubmit}
            className="relative mb-3"
          >
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              aria-label="Search"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </form>

          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-lg px-3 py-3 text-[15px] font-medium text-slate-700 hover:bg-slate-50"
              >
                {link.label}
              </a>
            ))}

            {/* Mobile accordion for Essentials */}
            <button
              type="button"
              onClick={() => setMobileEssentialsOpen((v) => !v)}
              aria-expanded={mobileEssentialsOpen}
              className="flex items-center justify-between rounded-lg px-3 py-3 text-[15px] font-medium text-indigo-600 hover:bg-slate-50"
            >
              Essentials
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  mobileEssentialsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-[max-height] duration-200 ${
                mobileEssentialsOpen ? "max-h-[600px]" : "max-h-0"
              }`}
            >
              <div className="flex flex-col gap-1 py-1 pl-3">
                {ESSENTIALS_COLUMNS.flat().map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="flex items-start gap-3 rounded-lg px-3 py-3 hover:bg-slate-50"
                  >
                    <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-slate-500" />
                    <span>
                      <span className="block text-sm font-semibold text-slate-900">
                        {item.title}
                      </span>
                      <span className="block text-sm text-slate-500">
                        {item.description}
                      </span>
                    </span>
                  </a>
                ))}

                <a
                  href={FEATURED_STORY.href}
                  className="mt-2 flex flex-col gap-2 rounded-xl bg-slate-900 p-4"
                >
                  <span className="inline-flex w-fit items-center rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                    {FEATURED_STORY.eyebrow}
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {FEATURED_STORY.title}
                  </span>
                  <span className="text-xs text-slate-300">
                    {FEATURED_STORY.stat} — {FEATURED_STORY.statLabel}
                  </span>
                </a>
              </div>
            </div>

            <a
              href="#"
              className="rounded-lg px-3 py-3 text-[15px] font-medium text-slate-700 hover:bg-slate-50"
            >
              Contact
            </a>
          </nav>

          <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4">
            <a
              href="#"
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-center text-[15px] font-medium text-slate-700"
            >
              Sign in
            </a>
            <a
              href="#"
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-[15px] font-medium text-white"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function EssentialsItem({ item }) {
  const Icon = item.icon;
  return (
    <a
      href={item.href}
      role="menuitem"
      className="group flex items-start gap-3 rounded-lg p-1 transition-colors hover:bg-slate-50"
    >
      <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-600">
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <span>
        <span className="block text-[15px] font-semibold text-slate-900">
          {item.title}
        </span>
        <span className="mt-0.5 block max-w-[220px] text-sm leading-snug text-slate-500">
          {item.description}
        </span>
      </span>
    </a>
  );
}
