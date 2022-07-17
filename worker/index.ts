import { util } from './utils';

declare let self: any

// To disable all workbox logging during development, you can set self.__WB_DISABLE_DEV_LOGS to true
// https://developers.google.com/web/tools/workbox/guides/configure-workbox#disable_logging
//
// self.__WB_DISABLE_DEV_LOGS = true

util();

// listen to message event from window
self.addEventListener('message', (event: any) => {
    // HOW TO TEST THIS?
    // Run this in your browser console:
    //     window.navigator.serviceWorker.controller.postMessage({command: 'log', message: 'hello world'})
    // OR use next-pwa injected workbox object
    //     window.workbox.messageSW({command: 'log', message: 'hello world'})
    console.log(event?.data);
});

self.addEventListener('push', (event: any) => {
    const data = JSON.parse(event?.data.text() || '{}')
    event?.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.message,
            icon: '/icons/android-chrome-192x192.png'
        })
    )
})

self.addEventListener('notificationclick', (event: any) => {
    event?.notification.close()
    event?.waitUntil(
        self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList: any) {
            if (clientList.length > 0) {
                let client = clientList[0]
                for (let i = 0; i < clientList.length; i++) {
                    if (clientList[i].focused) {
                        client = clientList[i]
                    }
                }
                return client.focus()
            }
            return self.clients.openWindow('/')
        })
    )
})