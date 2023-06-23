self.addEventListener('install', function(){

    const miCache = caches.open('mi-cache-v1').then( cache => {
        return cache.addAll([
            '/',
            'index.html',
            'app.js',
            'sw.js',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'
        ]);
    })

})

self.addEventListener('active', function(){
    console.info('El Service worker está instalado')
})


// Network Firt
self.addEventListener('fetch', function(evento){
    // Buscamos en la web
    const respuesta = fetch(evento.request).then( respuestaNetwork => {
        return caches.open( 'mi-cache-v1' ).then(  cache => {
            // Si la web responde lo guardo en cache
            cache.put(  evento.request, respuestaNetwork.clone() );
            return respuestaNetwork;
        } )
    }).catch( error => {
        // Si falla busco en el cache
        return caches.match( evento.request)
    })
   
    evento.respondWith( respuesta  )
})