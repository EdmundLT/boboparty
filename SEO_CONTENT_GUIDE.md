# BoboParty pages and SEO

The site now separates the homepage into service discovery, service detail pages, inspiration, planning and contact. The cream, navy and coral visual identity is retained. Party One was used as an information-architecture reference only; its text, customer claims, packages and images were not copied.

## Content map

- `/services`: service directory.
- `/services/birthday-parties`: birthday styling and venue preparation.
- `/services/balloon-decoration`: arches, backdrops, colour and installation.
- `/services/baby-celebrations`: baby celebrations and family photo planning.
- `/services/corporate-events`: openings, brand colours and approval preparation.
- `/services/weddings-proposals`: wedding and proposal styling and scheduling.
- `/services/diy-party-supplies`: DIY planning, supplies and pickup advice.
- `/gallery`: Instagram highlights and guidance for collecting references.
- `/planning`: enquiry, scope confirmation, access and removal checklist.
- `/contact`: existing store addresses, opening hours and WhatsApp contact.

Every page has an English version under `/en`. Services are maintained in `data/services.json`; navigation and related-service links use that same data. Prices, turnaround guarantees and cancellation policies are not invented. Store details are retained from `data/stores.ts` and should be maintained there.

## Instagram

The existing six manually curated embeds remain on the homepage and the inspiration page, with links to the profile for current updates. Frames have descriptive titles and lazy loading. This change does not enable automatic Instagram feed synchronization. Update `data/instagram.ts` to change the selected posts. The previous sample Unsplash showcase is not presented as verified client work on the new inspiration page.

## SEO

`lib/seo.ts` uses `https://bobopartyhk.com` as the canonical origin; override with `NEXT_PUBLIC_SITE_URL` when necessary. Marketing pages have distinct titles/descriptions, canonical URLs, Chinese/English alternates and social share metadata. Service pages include Service and BreadcrumbList JSON-LD. Visible FAQ content answers the topic of each page without promises about search-result enhancements.

`/sitemap.xml` includes marketing pages, service detail pages and existing blog articles in both languages. It does not enumerate live Shopify products or collections. `/robots.txt` references the sitemap and excludes API/cart/checkout routes. Middleware allows these metadata endpoints through without a locale rewrite. Direct `/zh-TW` routes remain available for internal rewriting and point to the public Chinese URL through canonical metadata.

## Validation

- Production build and TypeScript validation passed during implementation.
- HTTP checks covered 26 bilingual marketing pages, one H1 per page, canonical URLs, language alternates and service structured data; sitemap, robots and unknown-service 404 were checked.
- Browser checks covered a 390px mobile menu, a service detail page, same-page language switching and a 1440px desktop navigation layout.
- The existing Instagram embeds loaded in the preview.

These changes are local. Deployment and Search Console sitemap submission have not been performed. Shopify functionality still needs the store environment variables.

## Service images and videos

All six service detail pages include a media area under the introduction. Each service starts with two image slots and one video slot, clearly marked as coming soon until real files are supplied. They do not request missing files or show inactive player controls.

Configure each service independently in `data/service-media.ts`. Put supplied assets under `public/media/services/<service-slug>/` and set `src` to `/media/services/<service-slug>/<filename>`. Use descriptive bilingual `alt` for images and optional `caption` for both types. Video slots accept a directly served video file, an optional `poster`, and optional WebVTT `subtitles`. Videos play on demand with native controls and do not preload or autoplay. Add more array entries for additional assets; Instagram remains separate and unchanged.

Birthday styling now uses three supplied Instagram posts (DAtDcXjxroa, DS0GhBRkjOU, DVvj6pyEkz_) instead of placeholders. Service media also supports `type: "instagram"` with the canonical post URL in `src`. Each embed has an always-visible link to the original post if Instagram is unavailable. Other services retain their placeholders.

The three birthday clips were subsequently downloaded as MP4s into `public/media/services/birthday-parties/` at the owner’s request. They now use native 9:16 video players with muted autoplay, looping and controls. Other services and the homepage/gallery Instagram feeds are unchanged. Autoplay remains subject to browser settings. Media extensions bypass locale middleware.

## Current service-page standard

All six services now use three compact 9:16 video slots in one row on desktop and mobile. Birthday clips remain populated; the other five services have three empty video slots each, awaiting the owner’s Instagram selections. Populated slots use muted autoplay, looping and native controls. No subtitle above the media or numbered captions below it are shown. Missing clips display a coming-soon placeholder without an empty player.

All service pages share the inline planning guide, including store details, booking steps, inspiration, preparation tips and service scope. The planning CTA links to that section on the same page. All WhatsApp entries use the exact shared message in `data/stores.ts`, including spaces around the domain. Chinese and English pages use the same service-specific media list.

## Expanded occasion library

Gender reveal, proposals and weddings now have separate bilingual service pages. The old `/services/weddings-proposals` route redirects to `/services/weddings` (and likewise in English). Shared navigation and the sitemap read the updated service catalogue.

The current local MP4 library contains 30 clips: gender reveal 3, baby celebrations 6, proposals 6, birthdays 6 (including the original 3), weddings 6, corporate events 3. All supplied posts were downloaded successfully. Sources are recorded in `data/service-video-sources.json`. Clips follow the supplied order within each batch, remain in three columns and wrap to additional rows. Balloon decoration and DIY retain empty slots.
