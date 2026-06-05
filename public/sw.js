// Service Worker for OYSTR - Web Push Notifications
self.addEventListener('push', function (event) {
    if (!event.data) return;

    let data;
    try {
        data = event.data.json();
    } catch (e) {
        data = { title: 'OYSTR', body: event.data.text(), url: '/' };
    }

    const options = {
        body: data.body || 'You have a new notification',
        icon: '/logo-favicon.png',
        badge: '/logo-favicon.png',
        data: { url: data.url || '/notifications' },
        vibrate: [100, 50, 100],
        tag: data.tag || 'oystr-notification',
        renotify: true,
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'OYSTR 🚀', options)
    );
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    if (event.action === 'dismiss') return;

    const rawUrl = event.notification.data?.url || '/notifications';
    const url = rawUrl.startsWith('http') ? rawUrl : self.location.origin + rawUrl;

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (windowClients) {
            for (const client of windowClients) {
                if (client.url.includes(self.location.origin) && 'focus' in client) {
                    return client.focus().then(() => client.navigate(url));
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
