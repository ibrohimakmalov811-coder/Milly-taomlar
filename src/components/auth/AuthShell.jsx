"use client";

import React from "react";
import { UtensilsCrossed } from "lucide-react";

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap');`;

const VARS = `
:root{
  --cream:#F6EFE0; --cream-soft:#FBF7EE;
  --ink:#241A10; --ink-soft:#5B4A38;
  --brown:#2B1D12; --green:#1E3A2C; --green-700:#27503C;
  --gold:#C69A3C; --gold-300:#E7CD8C;
  --line: rgba(43,29,18,0.12);
  --surface:#FFFFFF;
  --shadow: 0 1px 2px rgba(43,29,18,0.06), 0 8px 24px -12px rgba(43,29,18,0.18);
}
.font-display{ font-family:'Fraunces', Georgia, serif; }
.font-body{ font-family:'Inter', system-ui, sans-serif; }
.seam{
  height:4px; width:56px; margin: 0 auto;
  background-image: repeating-linear-gradient(135deg, var(--gold) 0 6px, transparent 6px 12px);
  opacity:0.5; border-radius: 2px;
}
`;

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 font-body" style={{ background: "var(--cream)" }}>
      <style>{FONT_IMPORT + VARS}</style>
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
            style={{ background: "linear-gradient(135deg, var(--gold-300), var(--gold))" }}
          >
            <UtensilsCrossed size={22} style={{ color: "var(--brown)" }} />
          </div>
          <p className="font-display text-lg font-semibold" style={{ color: "var(--brown)" }}>Milly Taomlar</p>
          <p className="text-xs font-body mt-0.5" style={{ color: "var(--ink-soft)" }}>Admin Panel</p>
        </div>

        <div
          className="rounded-3xl p-7 sm:p-8"
          style={{ background: "var(--surface)", border: "1px solid var(--line)", boxShadow: "var(--shadow)" }}
        >
          <h1 className="font-display text-2xl font-semibold text-center" style={{ color: "var(--brown)" }}>{title}</h1>
          {subtitle && <p className="text-sm font-body text-center mt-1.5" style={{ color: "var(--ink-soft)" }}>{subtitle}</p>}
          <div className="seam my-5" />
          {children}
        </div>

        {footer && <div className="mt-5 text-center">{footer}</div>}
      </div>
    </div>
  );
}