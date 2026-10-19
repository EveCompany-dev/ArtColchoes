import { photos, site } from "@/lib/site";
import Icon from "./Icon";

// PLACEHOLDER: o briefing pede Instagram integrado. Quando houver token da
// Instagram Graph API (ou widget tipo Behold/Elfsight), trocar `posts` pelo feed real.
const posts = [photos.showroomSm, photos.blackSignatureSm, photos.camaBanho, photos.roupaDeCama, photos.ambienteBox, photos.baseBau];

export default function InstagramGrid({ theme = "light" }: { theme?: "light" | "dark" }) {
  const dark = theme === "dark";
  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className={`text-xs font-semibold tracking-[0.2em] uppercase ${dark ? "text-white/70" : "text-black/65"}`}>Instagram</p>
          <p className="font-display mt-2 text-2xl sm:text-3xl">{site.instagram.handle}</p>
        </div>
        <a href={site.instagram.url} target="_blank" rel="noopener" className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium ring-1 transition ${dark ? "ring-white/20 hover:bg-white hover:text-black" : "ring-black/15 hover:bg-black hover:text-white"}`}>
          <Icon name="instagram" className="size-4" /> Seguir
        </a>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
        {posts.map((src, i) => (
          <a key={i} href={site.instagram.url} target="_blank" rel="noopener" className="ig-post group relative block aspect-square overflow-hidden rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" loading="lazy" decoding="async" className="size-full object-cover transition duration-700 group-hover:scale-110" />
            <span className="absolute inset-0 grid place-items-center bg-black/40 text-white opacity-0 transition group-hover:opacity-100">
              <Icon name="instagram" className="size-7" />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
