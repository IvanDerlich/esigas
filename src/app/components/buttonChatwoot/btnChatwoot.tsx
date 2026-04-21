'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    chatwootSDK: {
      run: (config: { websiteToken: string; baseUrl: string }) => void;
    };
  }
}

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
      if (window.chatwootSDK) {
        window.chatwootSDK.run({
          websiteToken: TOKEN,
          baseUrl: BASE_URL,
        });
      }
    };

    document.body.appendChild(script);
  }, []);

  return null;
}
