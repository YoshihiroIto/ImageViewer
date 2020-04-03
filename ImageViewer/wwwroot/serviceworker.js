console.log("This is service worker talking");
var cacheName = 'blazor-pwa-sample';
var filesToCache = [
    //wwwroot
    '/',
    '/index.html',
    '/manifest.json',
    '/serviceworker.js',
    '/favicon.ico',
    //css
    '/css/site.css',
    '/css/bootstrap/bootstrap.min.css',
    '/css/open-iconic/font/css/open-iconic-bootstrap.min.css',
    '/css/open-iconic/font/fonts/open-iconic.woff',
    //images
    '/images/icon-192x192.png',
    '/images/icon-512x512.png',
    // カレントプロジェクトのdll
    '/_framework/_bin/ImageViewer.dll',
    //.net framework
    '/_framework/blazor.webassembly.js',
    '/_framework/blazor.boot.json',
    '/_framework/wasm/dotnet.3.2.0-preview2.20159.2.js',
    '/_framework/wasm/dotnet.wasm',
    '/_framework/_bin/Microsoft.AspNetCore.Blazor.HttpClient.dll',
    '/_framework/_bin/Microsoft.AspNetCore.Components.dll',
    '/_framework/_bin/Microsoft.AspNetCore.Components.Web.dll',
    '/_framework/_bin/Microsoft.AspNetCore.Components.WebAssembly.dll',
    '/_framework/_bin/Microsoft.Bcl.AsyncInterfaces.dll',
    '/_framework/_bin/Microsoft.Extensions.Configuration.Abstractions.dll',
    '/_framework/_bin/Microsoft.Extensions.Configuration.dll',
    '/_framework/_bin/Microsoft.Extensions.DependencyInjection.Abstractions.dll',
    '/_framework/_bin/Microsoft.Extensions.DependencyInjection.dll',
    '/_framework/_bin/Microsoft.Extensions.Logging.Abstractions.dll',
    '/_framework/_bin/Microsoft.Extensions.Primitives.dll',
    '/_framework/_bin/Microsoft.JSInterop.dll',
    '/_framework/_bin/Microsoft.JSInterop.WebAssembly.dll',
    '/_framework/_bin/mscorlib.dll',
    '/_framework/_bin/System.Core.dll',
    '/_framework/_bin/System.dll',
    '/_framework/_bin/System.Net.Http.dll',
    '/_framework/_bin/System.Reactive.dll',
    '/_framework/_bin/System.Runtime.CompilerServices.Unsafe.dll',
    '/_framework/_bin/System.Text.Encodings.Web.dll',
    '/_framework/_bin/System.Text.Json.dll',
    '/_framework/_bin/WebAssembly.Bindings.dll',
    '/_framework/_bin/WebAssembly.Net.Http.dll'
];

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then(response => {
            return response || fetch(event.request).then(response => {
                caches.put(event.request, response.clone());
                return response;
            });
        })
    );
});
