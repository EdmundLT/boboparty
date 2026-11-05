import type { Locale } from "@/i18n.config";

type LocalizedText = Record<Locale, string>;
type MediaBase = {
  id: string;
  src: string | null;
  label: LocalizedText;
  caption?: LocalizedText;
};
export type ServiceMedia =
  | (MediaBase & { type: "instagram"; src: string })
  | (MediaBase & { type: "image"; alt: LocalizedText })
  | (MediaBase & {
      type: "video";
      autoPlay?: boolean;
      portrait?: boolean;
      poster?: string;
      subtitles?: { src: string; language: string; label: string }[];
    });

export const SERVICE_MEDIA: Record<string, ServiceMedia[]> = {
"birthday-parties": [
  {
    "id": "DAtDcXjxroa",
    "type": "video",
    "autoPlay": true,
    "portrait": true,
    "src": "/media/services/birthday-parties/DAtDcXjxroa.mp4",
    "label": {
      "zh-TW": "生日派對佈置 · 影片 01",
      "en": "Birthday party styling · Film 01"
    }
  },
  {
    "id": "DS9gle9EtM2",
    "type": "video",
    "autoPlay": true,
    "portrait": true,
    "src": "/media/services/birthday-parties/DS9gle9EtM2.mp4",
    "label": {
      "zh-TW": "生日派對佈置 · 影片 02",
      "en": "Birthday party styling · Film 02"
    }
  },
  {
    "id": "DVvj6pyEkz_",
    "type": "video",
    "autoPlay": true,
    "portrait": true,
    "src": "/media/services/birthday-parties/DVvj6pyEkz_.mp4",
    "label": {
      "zh-TW": "生日派對佈置 · 影片 03",
      "en": "Birthday party styling · Film 03"
    }
  },
  {
    "id": "C7l0xpCvuG6",
    "type": "video",
    "autoPlay": true,
    "portrait": true,
    "src": "/media/services/birthday-parties/C7l0xpCvuG6.mp4",
    "label": {
      "zh-TW": "生日派對佈置 · 影片 04",
      "en": "Birthday party styling · Film 04"
    }
  },
  {
    "id": "DUFG1gMEgvr",
    "type": "video",
    "autoPlay": true,
    "portrait": true,
    "src": "/media/services/birthday-parties/DUFG1gMEgvr.mp4",
    "label": {
      "zh-TW": "生日派對佈置 · 影片 05",
      "en": "Birthday party styling · Film 05"
    }
  },
  {
    "id": "DPLpzyPEnRp",
    "type": "video",
    "autoPlay": true,
    "portrait": true,
    "src": "/media/services/birthday-parties/DPLpzyPEnRp.mp4",
    "label": {
      "zh-TW": "生日派對佈置 · 影片 06",
      "en": "Birthday party styling · Film 06"
    }
  }
],
"balloon-decoration": [
  {
    "id": "IMG_4417",
    "type": "image",
    "src": "/media/services/balloon-decoration/IMG_4417.jpg",
    "label": {
      "zh-TW": "粉紅童話動物與熱氣球生日背景牆設計圖及氣球佈置實景",
      "en": "Pink woodland fairy and hot-air balloon birthday backdrop design and balloon setup"
    },
    "alt": {
      "zh-TW": "粉紅童話動物與熱氣球生日背景牆設計圖及氣球佈置實景",
      "en": "Pink woodland fairy and hot-air balloon birthday backdrop design and balloon setup"
    }
  },
  {
    "id": "IMG_0125",
    "type": "image",
    "src": "/media/services/balloon-decoration/IMG_0125.jpg",
    "label": {
      "zh-TW": "馬戲團主題背景牆與甜品車設計圖及實景",
      "en": "Circus backdrop and dessert cart design and installation"
    },
    "alt": {
      "zh-TW": "馬戲團主題背景牆與甜品車設計圖及實景",
      "en": "Circus backdrop and dessert cart design and installation"
    }
  },
  {
    "id": "IMG_3555",
    "type": "image",
    "src": "/media/services/balloon-decoration/IMG_3555.jpg",
    "label": {
      "zh-TW": "粉彩甜品主題百日宴背景與氣球佈置設計及實景",
      "en": "Pastel dessert-themed baby celebration backdrop and balloons, design and setup"
    },
    "alt": {
      "zh-TW": "粉彩甜品主題百日宴背景與氣球佈置設計及實景",
      "en": "Pastel dessert-themed baby celebration backdrop and balloons, design and setup"
    }
  },
  {
    "id": "IMG_5583",
    "type": "image",
    "src": "/media/services/balloon-decoration/IMG_5583.jpg",
    "label": {
      "zh-TW": "紅藍金馬戲團生日背景牆設計與氣球拱門實景",
      "en": "Red, navy and gold circus birthday backdrop design and balloon installation"
    },
    "alt": {
      "zh-TW": "紅藍金馬戲團生日背景牆設計與氣球拱門實景",
      "en": "Red, navy and gold circus birthday backdrop design and balloon installation"
    }
  },
  {
    "id": "IMG_3154",
    "type": "image",
    "src": "/media/services/balloon-decoration/IMG_3154.jpg",
    "label": {
      "zh-TW": "藍白寶寶主題百日宴訂製背景設計圖與實景",
      "en": "Blue-and-white baby celebration custom backdrop design and setup"
    },
    "alt": {
      "zh-TW": "藍白寶寶主題百日宴訂製背景設計圖與實景",
      "en": "Blue-and-white baby celebration custom backdrop design and setup"
    }
  },
  {
    "id": "IMG_8527",
    "type": "image",
    "src": "/media/services/balloon-decoration/IMG_8527.jpg",
    "label": {
      "zh-TW": "粉藍粉紅性別揭曉拱門背景牆設計圖與氣球佈置實景",
      "en": "Pastel blue and pink gender reveal arch backdrop design and balloon setup"
    },
    "alt": {
      "zh-TW": "粉藍粉紅性別揭曉拱門背景牆設計圖與氣球佈置實景",
      "en": "Pastel blue and pink gender reveal arch backdrop design and balloon setup"
    }
  }
],
"baby-celebrations": [
  {
    "id": "DM9Fy6wTxUk",
    "type": "video",
    "autoPlay": true,
    "portrait": true,
    "src": "/media/services/baby-celebrations/DM9Fy6wTxUk.mp4",
    "label": {
      "zh-TW": "百日宴與寶寶派對 · 影片 01",
      "en": "Baby celebrations · Film 01"
    }
  },
  {
    "id": "DOAf-GzEuOI",
    "type": "video",
    "autoPlay": true,
    "portrait": true,
    "src": "/media/services/baby-celebrations/DOAf-GzEuOI.mp4",
    "label": {
      "zh-TW": "百日宴與寶寶派對 · 影片 02",
      "en": "Baby celebrations · Film 02"
    }
  },
  {
    "id": "DYoJFmQy_5C",
    "type": "video",
    "autoPlay": true,
    "portrait": true,
    "src": "/media/services/baby-celebrations/DYoJFmQy_5C.mp4",
    "label": {
      "zh-TW": "百日宴與寶寶派對 · 影片 03",
      "en": "Baby celebrations · Film 03"
    }
  },
  {
    "id": "DG0eQURz1Ga",
    "type": "video",
    "autoPlay": true,
    "portrait": true,
    "src": "/media/services/baby-celebrations/DG0eQURz1Ga.mp4",
    "label": {
      "zh-TW": "百日宴與寶寶派對 · 影片 04",
      "en": "Baby celebrations · Film 04"
    }
  },
  {
    "id": "DG-7uAfzAGs",
    "type": "video",
    "autoPlay": true,
    "portrait": true,
    "src": "/media/services/baby-celebrations/DG-7uAfzAGs.mp4",
    "label": {
      "zh-TW": "百日宴與寶寶派對 · 影片 05",
      "en": "Baby celebrations · Film 05"
    }
  },
  {
    "id": "DHkisE7ToCp",
    "type": "video",
    "autoPlay": true,
    "portrait": true,
    "src": "/media/services/baby-celebrations/DHkisE7ToCp.mp4",
    "label": {
      "zh-TW": "百日宴與寶寶派對 · 影片 06",
      "en": "Baby celebrations · Film 06"
    }
  }
],
"corporate-events": [
  {
    "id": "DaZ3saHyOjt",
    "type": "video",
    "autoPlay": true,
    "portrait": true,
    "src": "/media/services/corporate-events/DaZ3saHyOjt.mp4",
    "label": {
      "zh-TW": "企業活動與開幕佈置 · 影片 01",
      "en": "Corporate events & openings · Film 01"
    }
  },
  {
    "id": "DX1XB6myc0P",
    "type": "video",
    "autoPlay": true,
    "portrait": true,
    "src": "/media/services/corporate-events/DX1XB6myc0P.mp4",
    "label": {
      "zh-TW": "企業活動與開幕佈置 · 影片 02",
      "en": "Corporate events & openings · Film 02"
    }
  },
  {
    "id": "DWA28jrks-w",
    "type": "video",
    "autoPlay": true,
    "portrait": true,
    "src": "/media/services/corporate-events/DWA28jrks-w.mp4",
    "label": {
      "zh-TW": "企業活動與開幕佈置 · 影片 03",
      "en": "Corporate events & openings · Film 03"
    }
  }
],

"gender-reveal": [
  {
    "id": "DMwgrOQyXZE",
    "type": "video",
    "autoPlay": true,
    "portrait": true,
    "src": "/media/services/gender-reveal/DMwgrOQyXZE.mp4",
    "label": {
      "zh-TW": "性別揭曉派對佈置 · 影片 01",
      "en": "Gender reveal party styling · Film 01"
    }
  },
  {
    "id": "DG4vCa3Tztg",
    "type": "video",
    "autoPlay": true,
    "portrait": true,
    "src": "/media/services/gender-reveal/DG4vCa3Tztg.mp4",
    "label": {
      "zh-TW": "性別揭曉派對佈置 · 影片 02",
      "en": "Gender reveal party styling · Film 02"
    }
  },
  {
    "id": "DC4CfZ9zx10",
    "type": "video",
    "autoPlay": true,
    "portrait": true,
    "src": "/media/services/gender-reveal/DC4CfZ9zx10.mp4",
    "label": {
      "zh-TW": "性別揭曉派對佈置 · 影片 03",
      "en": "Gender reveal party styling · Film 03"
    }
  }
],
"proposals": [
  {
    "id": "C9RFaI9vLf-",
    "type": "video",
    "autoPlay": true,
    "portrait": true,
    "src": "/media/services/proposals/C9RFaI9vLf-.mp4",
    "label": {
      "zh-TW": "求婚佈置 · 影片 01",
      "en": "Proposal styling · Film 01"
    }
  },
  {
    "id": "CzyYHzDPTJy",
    "type": "video",
    "autoPlay": true,
    "portrait": true,
    "src": "/media/services/proposals/CzyYHzDPTJy.mp4",
    "label": {
      "zh-TW": "求婚佈置 · 影片 02",
      "en": "Proposal styling · Film 02"
    }
  },
  {
    "id": "Cws63Ouy_yn",
    "type": "video",
    "autoPlay": true,
    "portrait": true,
    "src": "/media/services/proposals/Cws63Ouy_yn.mp4",
    "label": {
      "zh-TW": "求婚佈置 · 影片 03",
      "en": "Proposal styling · Film 03"
    }
  },
  {
    "id": "Cu7HOjVgSzz",
    "type": "video",
    "autoPlay": true,
    "portrait": true,
    "src": "/media/services/proposals/Cu7HOjVgSzz.mp4",
    "label": {
      "zh-TW": "求婚佈置 · 影片 04",
      "en": "Proposal styling · Film 04"
    }
  },
  {
    "id": "DGDrrZ4TT8_",
    "type": "video",
    "autoPlay": true,
    "portrait": true,
    "src": "/media/services/proposals/DGDrrZ4TT8_.mp4",
    "label": {
      "zh-TW": "求婚佈置 · 影片 05",
      "en": "Proposal styling · Film 05"
    }
  },
  {
    "id": "DEocKIjTWVr",
    "type": "video",
    "autoPlay": true,
    "portrait": true,
    "src": "/media/services/proposals/DEocKIjTWVr.mp4",
    "label": {
      "zh-TW": "求婚佈置 · 影片 06",
      "en": "Proposal styling · Film 06"
    }
  }
],
"weddings": [
  {
    "id": "C0lrhZ2PdGZ",
    "type": "video",
    "autoPlay": true,
    "portrait": true,
    "src": "/media/services/weddings/C0lrhZ2PdGZ.mp4",
    "label": {
      "zh-TW": "婚禮佈置 · 影片 01",
      "en": "Wedding styling · Film 01"
    }
  },
  {
    "id": "C08YF9lPxSE",
    "type": "video",
    "autoPlay": true,
    "portrait": true,
    "src": "/media/services/weddings/C08YF9lPxSE.mp4",
    "label": {
      "zh-TW": "婚禮佈置 · 影片 02",
      "en": "Wedding styling · Film 02"
    }
  },
  {
    "id": "DD1-gmmzJwG",
    "type": "video",
    "autoPlay": true,
    "portrait": true,
    "src": "/media/services/weddings/DD1-gmmzJwG.mp4",
    "label": {
      "zh-TW": "婚禮佈置 · 影片 03",
      "en": "Wedding styling · Film 03"
    }
  },
  {
    "id": "DWV4Dn0klrY",
    "type": "video",
    "autoPlay": true,
    "portrait": true,
    "src": "/media/services/weddings/DWV4Dn0klrY.mp4",
    "label": {
      "zh-TW": "婚禮佈置 · 影片 04",
      "en": "Wedding styling · Film 04"
    }
  },
  {
    "id": "DBsesoORvJ6",
    "type": "video",
    "autoPlay": true,
    "portrait": true,
    "src": "/media/services/weddings/DBsesoORvJ6.mp4",
    "label": {
      "zh-TW": "婚禮佈置 · 影片 05",
      "en": "Wedding styling · Film 05"
    }
  },
  {
    "id": "C87ayw3Pniv",
    "type": "video",
    "autoPlay": true,
    "portrait": true,
    "src": "/media/services/weddings/C87ayw3Pniv.mp4",
    "label": {
      "zh-TW": "婚禮佈置 · 影片 06",
      "en": "Wedding styling · Film 06"
    }
  }
],
};
