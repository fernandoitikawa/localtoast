// List of services to scan for.
const services = [
    {
        url: 'http://localhost:10000',
        name: 'Touch Client',
    },
    {
        url: 'http://www.quadrix.org.br',
        name: 'Site HTTP',
    },
];

// Start scan of all services.
async function scan() {
    await Promise.all(
        services.map(x => {
            let handler;
            if (x.type === 'img') {
                handler = handleImg;
            } else {
                handler = handleFetch;
            }
            return handler(x.url).then(res => {
                const el = document.createElement('div');
                el.innerText = 'Found: ' + x.name;
                document.body.appendChild(el);
            }).catch(e => e);
        })
    );
    document.querySelector('h1').innerText = 'Results:';
}

// Handle fetch scans.
// These are limited to localhost and can only determine if the connection
// succeeded or not.
function handleFetch(url) {
    return fetch(url, {mode: 'no-cors', cache: 'no-cache'});
}

// Handle img scans.
// These allow non-localhost connections with mixed-content and are able to
// verify the presence of specific assets.
function handleImg(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
    });
}

window.onload = scan;
