import type { ShopLocation } from '@/types'

export const SHOP_LOCATIONS: ShopLocation[] = [
  {
    name: "屯門華都商場",
    address: "屯門華都商場 1樓24號舖",
    openingHours: "每日 13:00-21:00"
  },
  {
    name: "葵芳葵涌廣場",
    address: "葵芳葵涌廣場 1樓B69號舖",
    openingHours: "每日 12:00-22:00"
  },
  {
    name: "沙田石門京瑞廣場一期",
    address: "沙田石門京瑞廣場一期地下G39B號舖",
    openingHours: "每日 12:00-21:00"
  }
]

export const CONTACT_WHATSAPP = "85265344590"

export const WHATSAPP_MESSAGE = "你好，我在你們網站 bobopartyhk.com 看到關於派對佈置的資訊，想了解詳情。"
export const WHATSAPP_URL = `https://api.whatsapp.com/send/?phone=${CONTACT_WHATSAPP}&text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
