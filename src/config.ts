// Site configuration
export const config = {
  whatsappLink: 'https://wa.me/message/KRVQQD3BXQLIP1',
  // The same number as a plain wa.me target: the short link above opens with
  // a fixed greeting, but the courier pre-registration has to open with the
  // courier's own answers already typed. Same number as the panel's
  // TREGOU_WHATSAPP (entrego apps/dashboard/src/lib/constants/contact.ts).
  whatsappNumber: '558391427829',
  presentationLink: 'https://panel.tregou.app/apresentacao.html',
  signupLink: 'https://panel.tregou.app/signup',
  // Reachable from the site, because the site is where the measurement
  // identifiers are written — a disclosure only linked from the panel would
  // not be findable by the people it is about.
  privacyLink: 'https://panel.tregou.app/privacy',
  // Order apps the panel pulls orders from by itself. The landing's step 1
  // and the FAQ are written from this list: when an integration goes live,
  // flip `live` (or add a line) and the page follows.
  orderApps: [
    { name: 'iFood', live: true },
    { name: 'Anota AI', live: false },
  ],
} as const;
