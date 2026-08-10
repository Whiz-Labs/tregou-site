// Site configuration
export const config = {
  whatsappLink: 'https://wa.me/message/KRVQQD3BXQLIP1',
  presentationLink: 'https://panel.tregou.app/apresentacao.html',
  signupLink: 'https://panel.tregou.app/signup',
  // Reachable from the site, because the site is where the measurement
  // identifiers are written — a disclosure only linked from the panel would
  // not be findable by the people it is about.
  privacyLink: 'https://panel.tregou.app/privacy',
} as const;
