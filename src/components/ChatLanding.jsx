import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Plus,
  FolderClosed,
  Shapes,
  Code2,
  SlidersHorizontal,
  Search,
  PanelLeft,
  Download,
  ArrowUp,
  Paperclip,
  ChevronDown,
  Check,
  Sparkles,
  MessageSquare,
} from "lucide-react";

/**
 * ChatLanding
 * -----------------------------------------------------------------------
 * A production-grade "new conversation" screen for an AI chat product.
 * Self-contained: no external state, no network calls. Wire up the
 * callbacks (onSend, onSelectModel, onNewChat, onOpenChat) to your app.
 *
 * Design notes:
 * - Deep charcoal ground (#17181C) rather than pure black, so the warm
 *   ember accent (#E0733F) has somewhere to sit without vibrating.
 * - Single serif display face for the greeting only; everything else is
 *   a plain grotesque so the type hierarchy carries the personality.
 * - One animated moment on load (the mark + greeting settle in) — no
 *   hover choreography scattered across every row.
 */

const NAV_ITEMS = [
  { icon: FolderClosed, label: "Projects" },
  { icon: Shapes, label: "Artifacts" },
  { icon: Code2, label: "Code", badge: "Upgrade" },
  { icon: SlidersHorizontal, label: "Customize" },
];

const RECENT_CHATS = [
  { id: "c1", title: "Optimizing resume for ATS compatibility" },
  { id: "c2", title: "Angular header bar and triangle groove layout" },
  { id: "c3", title: "How compound interest works" },
  { id: "c4", title: "Model access restrictions" },
];

const MODELS = [
  { id: "sonnet-5", name: "Sonnet 5", detail: "Balanced for everyday work" },
  { id: "opus-5", name: "Opus 5", detail: "Most capable, slower" },
  { id: "haiku-4-5", name: "Haiku 4.5", detail: "Fastest responses" },
];

const EFFORT_LEVELS = ["Quick", "Medium", "Thorough"];

function useAutosizeTextarea(value, ref, maxPx = 240) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, maxPx)}px`;
  }, [value, ref, maxPx]);
}

function ModelPicker({ model, setModel, effort, setEffort }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px] text-neutral-400 hover:bg-white/5 hover:text-neutral-200 transition-colors"
      >
        <span className="text-neutral-300">{model.name}</span>
        <span className="text-neutral-600">·</span>
        <span>{effort}</span>
        <ChevronDown className="h-3.5 w-3.5 text-neutral-500" />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute bottom-full right-0 mb-2 w-64 overflow-hidden rounded-xl border border-white/10 bg-[#202126] p-1.5 shadow-2xl shadow-black/50"
        >
          <div className="px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-wide text-neutral-500">
            Model
          </div>
          {MODELS.map((m) => (
            <button
              key={m.id}
              role="option"
              aria-selected={m.id === model.id}
              onClick={() => {
                setModel(m);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left hover:bg-white/[0.06]"
            >
              <span>
                <span className="block text-[13px] text-neutral-200">{m.name}</span>
                <span className="block text-[11px] text-neutral-500">{m.detail}</span>
              </span>
              {m.id === model.id && <Check className="h-4 w-4 shrink-0 text-[#E0733F]" />}
            </button>
          ))}

          <div className="my-1.5 h-px bg-white/10" />

          <div className="px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-wide text-neutral-500">
            Effort
          </div>
          <div className="flex gap-1 px-1.5 pb-1.5">
            {EFFORT_LEVELS.map((level) => (
              <button
                key={level}
                onClick={() => setEffort(level)}
                className={`flex-1 rounded-md px-2 py-1.5 text-[12px] transition-colors ${
                  effort === level
                    ? "bg-[#E0733F]/15 text-[#E0733F]"
                    : "text-neutral-400 hover:bg-white/[0.06] hover:text-neutral-200"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Composer({ onSend }) {
  const [value, setValue] = useState("");
  const [model, setModel] = useState(MODELS[0]);
  const [effort, setEffort] = useState("Medium");
  const textareaRef = useRef(null);
  useAutosizeTextarea(value, textareaRef);

  const canSend = value.trim().length > 0;

  const submit = useCallback(() => {
    if (!canSend) return;
    onSend?.({ text: value.trim(), model, effort });
    setValue("");
  }, [canSend, value, model, effort, onSend]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#1c1d22] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] transition-colors focus-within:border-white/20">
      <div className="px-4 pt-4">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="How can I help you today?"
          aria-label="Message"
          className="w-full resize-none bg-transparent text-[15px] leading-6 text-neutral-100 placeholder:text-neutral-500 outline-none"
        />
      </div>

      <div className="flex items-center justify-between px-3 pb-3 pt-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Add attachment"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-white/5 hover:text-neutral-200 transition-colors"
          >
            <Plus className="h-[18px] w-[18px]" />
          </button>
          <button
            type="button"
            aria-label="Attach file"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-white/5 hover:text-neutral-200 transition-colors"
          >
            <Paperclip className="h-[17px] w-[17px]" />
          </button>
        </div>

        <div className="flex items-center gap-1">
          <ModelPicker model={model} setModel={setModel} effort={effort} setEffort={setEffort} />
          <button
            type="button"
            onClick={submit}
            disabled={!canSend}
            aria-label="Send message"
            className={`ml-1 flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
              canSend
                ? "bg-[#E0733F] text-[#1c1d22] hover:bg-[#e6825480]"
                : "bg-white/[0.06] text-neutral-600"
            }`}
          >
            <ArrowUp className="h-[18px] w-[18px]" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

function SidebarNavItem({ icon: Icon, label, badge, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-[14px] transition-colors ${
        active ? "bg-white/[0.07] text-neutral-100" : "text-neutral-300 hover:bg-white/[0.05]"
      }`}
    >
      <span className="flex items-center gap-2.5">
        <Icon className="h-[17px] w-[17px] text-neutral-400" strokeWidth={1.75} />
        {label}
      </span>
      {badge && (
        <span className="rounded-full bg-[#E0733F]/15 px-2 py-0.5 text-[10.5px] font-medium text-[#E0733F]">
          {badge}
        </span>
      )}
    </button>
  );
}

function Sidebar({ open, onToggle, onNewChat, onOpenChat, activeChatId }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-[280px] shrink-0 flex-col border-r border-white/10 bg-[#17181c] transition-transform duration-200 md:relative md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 pb-4 pt-5">
          <span className="text-[19px] font-medium tracking-tight text-neutral-100">
            Moonlit
          </span>
          <button
            type="button"
            onClick={onToggle}
            aria-label="Collapse sidebar"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:bg-white/5 hover:text-neutral-200 md:hidden"
          >
            <PanelLeft className="h-[18px] w-[18px]" />
          </button>
        </div>

        <div className="px-3">
          <button
            type="button"
            onClick={onNewChat}
            className="flex w-full items-center gap-2.5 rounded-lg bg-white/[0.06] px-2.5 py-2 text-[14px] font-medium text-neutral-100 hover:bg-white/[0.1] transition-colors"
          >
            <Plus className="h-[17px] w-[17px]" />
            New chat
          </button>
        </div>

        <nav className="mt-2 space-y-0.5 px-3">
          {NAV_ITEMS.map((item) => (
            <SidebarNavItem key={item.label} {...item} />
          ))}
        </nav>

        <div className="mt-6 flex-1 overflow-y-auto px-3">
          <div className="flex items-center justify-between px-2.5 pb-1.5">
            <span className="text-[11.5px] font-medium uppercase tracking-wide text-neutral-500">
              Recent
            </span>
            <Search className="h-3.5 w-3.5 text-neutral-500" />
          </div>
          <div className="space-y-0.5">
            {RECENT_CHATS.map((chat) => (
              <button
                key={chat.id}
                type="button"
                onClick={() => onOpenChat?.(chat.id)}
                className={`flex w-full items-center gap-2.5 truncate rounded-lg px-2.5 py-2 text-left text-[13.5px] transition-colors ${
                  chat.id === activeChatId
                    ? "bg-white/[0.07] text-neutral-100"
                    : "text-neutral-400 hover:bg-white/[0.05] hover:text-neutral-200"
                }`}
              >
                <MessageSquare className="h-3.5 w-3.5 shrink-0 text-neutral-500" strokeWidth={1.75} />
                <span className="truncate">{chat.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E0733F]/20 text-[12px] font-medium text-[#E0733F]">
              S
            </div>
            <div className="leading-tight">
              <div className="text-[13px] text-neutral-200">shakti</div>
              <div className="text-[11px] text-neutral-500">Free plan</div>
            </div>
          </div>
          <Download className="h-4 w-4 text-neutral-500" />
        </div>
      </aside>
    </>
  );
}

export default function ChatLanding({
  userName = "shakti",
  onSend,
  onNewChat,
  onOpenChat,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#111214] text-neutral-100">
      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((o) => !o)}
        onNewChat={onNewChat}
        onOpenChat={onOpenChat}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between px-4 py-3 md:px-6">
          <button
            type="button"
            onClick={() => setSidebarOpen((o) => !o)}
            aria-label="Toggle sidebar"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-white/5 hover:text-neutral-200 md:hidden"
          >
            <PanelLeft className="h-[18px] w-[18px]" />
          </button>
          <div className="ml-auto flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-[12.5px] text-neutral-400">
            Free plan
            <span className="text-neutral-600">·</span>
            <a href="#upgrade" className="text-[#E0733F] hover:underline">
              Upgrade
            </a>
          </div>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center px-6">
          <div
            className={`flex w-full max-w-[640px] flex-col items-center transition-all duration-500 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <div className="mb-8 flex items-center gap-3">
              <Sparkles className="h-7 w-7 text-[#E0733F]" strokeWidth={1.75} />
              <h1 className="font-serif text-[34px] font-normal tracking-tight text-neutral-100">
                Good evening, {userName}
              </h1>
            </div>

            <div className="w-full">
              <Composer onSend={onSend} />
            </div>

            <p className="mt-4 text-center text-[13px] text-neutral-500">
              Responses may be imperfect. Verify anything important.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
