"use client";

import type { FormEvent } from "react";
import { useState } from "react";

const SOCIALS = [
  {
    href: "https://www.instagram.com/thelaplandtribe",
    label: "Instagram",
    handle: "@thelaplandtribe",
    icon: "ti-brand-instagram",
  },
  {
    href: "https://www.youtube.com/channel/UCp8_M1la_6G5oRBTIYQ_M8A",
    label: "YouTube",
    handle: "The Lapland Tribe",
    icon: "ti-brand-youtube",
  },
];

const SUBJECTS = [
  "Question générale",
  "Commande",
  "Partenariat",
  "Presse",
];

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sent");
  }

  return (
    <>
      <header className="bg-night text-white pt-36 pb-20">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12 text-center">
          <span className="font-script text-gold text-2xl block mb-2">
            On vous écoute
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-medium leading-tight">
            Nous contacter
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-white/70 font-light">
            Vous avez une question, un projet, une idée ? Utilisez le formulaire
            ci-dessous ou écrivez-nous directement.
          </p>
        </div>
      </header>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-[1100px] px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            <div className="lg:col-span-3 bg-white p-8 md:p-10 rounded-[4px] shadow-[0_18px_50px_rgba(27,36,48,0.07)]">
              <h2 className="font-display text-2xl md:text-[28px] font-semibold mb-2">
                Écrivez-nous
              </h2>
              <p className="text-sm text-[#5C6672] font-light mb-8">
                On répond habituellement sous 24 à 48 h ouvrées.
              </p>

              {status === "sent" ? (
                <div className="border border-forest/30 bg-forest/5 p-6 text-center">
                  <p className="font-display text-xl text-forest mb-1">
                    Merci !
                  </p>
                  <p className="text-sm text-ink/70 font-light">
                    Votre message est bien noté — on revient vers vous très vite.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="Nom" htmlFor="contact-name">
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className="w-full px-3.5 py-3 text-sm bg-cream/40 border border-ink/15 outline-none focus:border-forest"
                    />
                  </Field>
                  <Field label="Email" htmlFor="contact-email">
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="w-full px-3.5 py-3 text-sm bg-cream/40 border border-ink/15 outline-none focus:border-forest"
                    />
                  </Field>
                  <Field label="Sujet" htmlFor="contact-subject" full>
                    <select
                      id="contact-subject"
                      name="subject"
                      required
                      defaultValue=""
                      className="w-full px-3.5 py-3 text-sm bg-cream/40 border border-ink/15 outline-none focus:border-forest"
                    >
                      <option value="" disabled>
                        Choisir un sujet…
                      </option>
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Message" htmlFor="contact-message" full>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={6}
                      className="w-full px-3.5 py-3 text-sm bg-cream/40 border border-ink/15 outline-none focus:border-forest resize-y"
                    />
                  </Field>
                  <div className="md:col-span-2 flex items-center justify-between gap-4 pt-2">
                    <p className="text-xs text-[#8A929C] font-light">
                      En envoyant ce formulaire vous acceptez notre{" "}
                      <a
                        href="/pages/politique-de-confidentialite"
                        className="text-forest underline"
                      >
                        politique de confidentialité
                      </a>
                      .
                    </p>
                    <button
                      type="submit"
                      className="bg-forest hover:bg-[#33503F] text-white text-[13px] font-semibold tracking-[0.1em] px-7 py-4 transition-colors inline-flex items-center gap-2"
                    >
                      ENVOYER
                      <i className="ti ti-send" aria-hidden="true" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            <aside className="lg:col-span-2 space-y-10">
              <div>
                <h3 className="text-[11px] tracking-[0.14em] font-bold text-ink/50 mb-3">
                  PAR EMAIL
                </h3>
                <a
                  href="mailto:contact@thelaplandtribe.com"
                  className="font-display text-2xl text-forest hover:text-[#33503F] transition-colors break-all"
                >
                  contact@thelaplandtribe.com
                </a>
                <p className="mt-3 text-sm text-[#5C6672] font-light">
                  Pour toute question, commande, partenariat ou demande presse.
                </p>
              </div>

              <div>
                <h3 className="text-[11px] tracking-[0.14em] font-bold text-ink/50 mb-3">
                  ADRESSE
                </h3>
                <address className="not-italic text-sm font-light text-ink/80 leading-7">
                  David Törnqvists Väg 7
                  <br />
                  95298 Morjärv
                  <br />
                  Sverige
                </address>
              </div>

              <div>
                <h3 className="text-[11px] tracking-[0.14em] font-bold text-ink/50 mb-3">
                  RÉSEAUX SOCIAUX
                </h3>
                <ul className="space-y-3">
                  {SOCIALS.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 text-sm hover:text-forest transition-colors"
                      >
                        <span className="w-10 h-10 rounded-full border border-ink/15 flex items-center justify-center text-base text-ink/70 group-hover:bg-night group-hover:border-night group-hover:text-cream transition-colors">
                          <i className={`ti ${s.icon}`} aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block font-medium text-ink">
                            {s.label}
                          </span>
                          <span className="text-xs text-ink/60">{s.handle}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  htmlFor,
  full,
  children,
}: {
  label: string;
  htmlFor: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={`${full ? "md:col-span-2" : ""} block`}
    >
      <span className="block text-[11px] tracking-[0.14em] font-bold text-ink/60 mb-2">
        {label.toUpperCase()}
      </span>
      {children}
    </label>
  );
}
