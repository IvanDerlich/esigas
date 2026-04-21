'use client';

import { useEffect } from 'react';

export default function BtnChatwoot() {
  useEffect(() => {
    const BASE_URL = process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL;
    const TOKEN = process.env.NEXT_PUBLIC_CHATWOOT_TOKEN;

    if (!BASE_URL || !TOKEN) return;

    if (document.getElementById('chatwoot-script')) return;

    const script = document.createElement('script');
    script.src = `${BASE_URL}/packs/js/sdk.js`;
    script.async = true;
    script.defer = true;
    script.id = 'chatwoot-script';

    script.onload = () => {
      if ((window as any).chatwootSDK) {
        (window as any).chatwootSDK.run({
          websiteToken: TOKEN,
          baseUrl: BASE_URL,
        });
      }
    };

    document.body.appendChild(script);
  }, []);

  return null;
}
