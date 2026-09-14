import Image from "next/image";
import type { Locale } from "@/i18n.config";
import { SERVICE_MEDIA } from "@/data/service-media";

export default function ServiceMediaGallery({
  slug,
  lang,
  title,
}: {
  slug: string;
  lang: Locale;
  title: string;
}) {
  const items = SERVICE_MEDIA[slug] ?? [];
  const zh = lang === "zh-TW";
  const portraitVideos = items.length > 0 && items.every(item => item.type === "video" && item.portrait);
  if (!items.length) return null;

  return (
    <section
      aria-labelledby="service-media-title"
      className="border-b border-[#173f5f]/10 bg-white"
    >
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#a84135]">
              Details & moments
            </p>
            <h2
              id="service-media-title"
              className="text-3xl font-black tracking-tight text-[#173f5f]"
            >
              {zh ? "從畫面，感受派對。" : "See the celebration take shape."}
            </h2>
          </div>
          {!portraitVideos && <p className="text-sm leading-6 text-[#66717b]">
            {title} · {zh ? "圖像與影片" : "Photos & films"}
          </p>}
        </div>
        <div className={portraitVideos ? "mx-auto grid w-full max-w-3xl grid-cols-3 gap-2 sm:gap-4" : "grid gap-5 md:grid-cols-2 lg:grid-cols-3"}>
          {items.map((item, index) => item.type === "instagram" ? (
            <figure key={item.id} className="min-w-0">
              <div className="overflow-hidden rounded-3xl border border-[#173f5f]/15 bg-white">
                <iframe
                  src={`${item.src.replace(/\/$/, "")}/embed/`}
                  title={item.label[lang]}
                  loading="lazy"
                  allow="encrypted-media; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="h-[620px] w-full border-0"
                />
              </div>
              <figcaption className="mt-4 space-y-2 text-sm leading-6 text-[#66717b]">
                <p>{item.caption?.[lang] ?? item.label[lang]}</p>
                <a href={item.src} target="_blank" rel="noopener noreferrer" className="inline-block font-bold text-[#173f5f] underline underline-offset-4">
                  {zh ? "在 Instagram 查看 ↗" : "View on Instagram ↗"}
                </a>
              </figcaption>
            </figure>
          ) : (
            <figure
              key={item.id}
              className={
                index === 0 && !(item.type === "video" && item.portrait) ? "min-w-0 md:col-span-2 lg:row-span-2" : "min-w-0"
              }
            >
              <div
                className={`relative overflow-hidden rounded-xl sm:rounded-3xl border border-[#173f5f]/10 ${item.type === "video" && item.portrait ? "aspect-[9/16]" : index === 0 ? "aspect-[4/3] lg:aspect-auto lg:h-[calc(100%-2.5rem)] lg:min-h-80" : "aspect-video"} ${item.type === "video" ? "bg-[#173f5f]" : "bg-[#e7efee]"}`}
              >
                {item.src ? (
                  item.type === "image" ? (
                    <Image
                      src={item.src}
                      alt={item.alt[lang] || `${title} — ${item.label[lang]}`}
                      fill
                      sizes={
                        index === 0
                          ? "(max-width: 1023px) 100vw, 66vw"
                          : "(max-width: 767px) 100vw, 33vw"
                      }
                      className="object-contain"
                    />
                  ) : (
                    <video
                      src={item.src}
                      poster={item.poster}
                      controls
                      playsInline
                      autoPlay={item.autoPlay}
                      muted={item.autoPlay}
                      loop={item.autoPlay}
                      preload={item.autoPlay ? "metadata" : "none"}
                      aria-label={`${title} — ${item.label[lang]}`}
                      className="absolute inset-0 h-full w-full object-contain"
                    >
                      {item.subtitles?.map((track) => (
                        <track
                          key={track.language}
                          kind="captions"
                          src={track.src}
                          srcLang={track.language}
                          label={track.label}
                          default={track.language === (zh ? "zh-Hant" : "en")}
                        />
                      ))}
                      {zh
                        ? "你的瀏覽器不支援影片播放。"
                        : "Your browser does not support video playback."}
                    </video>
                  )
                ) : (
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center ${item.type === "video" ? "text-white/85" : "text-[#173f5f]/75"}`}
                  >
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-full border border-current/20"
                      aria-hidden="true"
                    >
                      {item.type === "video" ? (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          className="h-6 w-6"
                        >
                          <rect x="3" y="5" width="18" height="14" rx="3" />
                          <path d="m10 9 5 3-5 3Z" />
                        </svg>
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          className="h-6 w-6"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="3" />
                          <circle cx="8" cy="8" r="1.5" />
                          <path d="m3 17 6-6 4 4 3-3 5 5" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="text-lg font-bold">{item.label[lang]}</p>
                      <p className="mt-2 text-xs tracking-wide">
                        {item.type === "video"
                          ? zh
                            ? "影片即將更新"
                            : "Film coming soon"
                          : zh
                            ? "相片即將更新"
                            : "Photos coming soon"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              {!portraitVideos && <figcaption className="mt-3 min-h-7 text-sm leading-6 text-[#66717b]">
                <span className="mr-3 text-xs font-bold text-[#a84135]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.caption?.[lang] ?? item.label[lang]}
              </figcaption>}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
