'use client';

import { useEffect } from 'react';

export default function VisitTracker() {
    useEffect(() => {
        if (sessionStorage.getItem('oystr_visit_logged')) return;
        sessionStorage.setItem('oystr_visit_logged', '1');

        fetch('/api/track-visit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                path: window.location.pathname,
                referrer: document.referrer || null,
            }),
        }).catch(() => {});
    }, []);

    return null;
}
