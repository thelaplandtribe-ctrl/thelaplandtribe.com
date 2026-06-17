"use client";

type NewsletterBandProps = {
  title?: React.ReactNode;
  description?: string;
  placeholder?: string;
  ctaLabel?: string;
  note?: string;
};

export default function NewsletterBand({
  title = (
    <>
      Recevez un peu de Laponie
      <br />
      dans votre boîte mail
    </>
  ),
  description = "Nouveaux articles, conseils d'expatriation, coulisses de la vie dans le Nord et nouveautés boutique.",
  placeholder = "Votre adresse e-mail",
  ctaLabel = "S'INSCRIRE",
  note = "Pas de spam, jamais. Désinscription en 1 clic.",
}: NewsletterBandProps) {
  return (
    <section
      id="news"
      className="relative overflow-hidden bg-[linear-gradient(105deg,#cdd9df_0%,#e9d2cf_48%,#e7c1cf_100%)]"
    >
      <svg
        className="absolute inset-0 w-full h-full opacity-50 pointer-events-none"
        viewBox="0 0 1440 220"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g fill="#ffffff" opacity=".6">
          <path d="M60,220 L96,90 L132,220Z" />
          <path d="M150,220 L180,110 L210,220Z" />
          <path d="M1230,220 L1266,90 L1302,220Z" />
          <path d="M1320,220 L1350,110 L1380,220Z" />
        </g>
      </svg>

      <div className="relative z-10 flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-6 md:gap-10 px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-[60px] text-center md:text-left">
        <div className="w-16 h-16 sm:w-[78px] sm:h-[78px] rounded-full border-[1.5px] border-ink/40 flex items-center justify-center text-2xl sm:text-[30px] text-ink flex-shrink-0">
          <i className="ti ti-mail" aria-hidden="true" />
        </div>
        <div className="md:flex-1 md:min-w-[230px] max-w-[420px]">
          <h3 className="font-display text-[20px] sm:text-[24px] md:text-[26px] font-semibold leading-[1.2] mb-2">
            {title}
          </h3>
          <p className="text-[13px] text-[#42505a]">{description}</p>
        </div>
        <form
          className="flex flex-col gap-2 w-full max-w-[420px] md:w-auto md:max-w-none"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col sm:flex-row">
            <input
              type="email"
              placeholder={placeholder}
              className="w-full sm:w-[240px] md:w-[260px] px-4 sm:px-[18px] py-3 sm:py-3.5 text-sm bg-white/90 outline-none border-0"
              required
            />
            <button
              type="submit"
              className="bg-night hover:bg-[#1a2c40] text-white text-xs font-bold tracking-[0.08em] px-6 sm:px-[26px] py-3 sm:py-0 mt-2 sm:mt-0 transition-colors"
            >
              {ctaLabel}
            </button>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-1.5 text-[11px] text-[#5a6670]">
            <i className="ti ti-lock" aria-hidden="true" />
            {note}
          </div>
        </form>
      </div>
    </section>
  );
}
