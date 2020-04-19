const publicVapidKey='BIe6mxOIVZTA9OBKXgfZzdJe_dqhqrMEU7QbPVdwHDLvdEL1hJ0Z8Qjt0x8EByWSAkGOYOKqbKc2dDJvTSF6vF0'

//Check for service worker
if('serviceWorker' in navigator){
    send().catch(err => console.error(err))
}

//Register SW, Register Push, Send Push
async function send(){
    //Register Service Worker
    console.log('Registering Service Worker')
    const register = await navigator.serviceWorker.register('/app.js',{
        scope:'/'
    })
    console.log('Service Worker Registered...');

    //Register Push
    console.log('Registering Push...')
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly:true,
        applicationServerKey:urlBase64ToUint8Array(publicVapidKey)
    })
    console.log('push registered...')

    //Send push notification
    console.log('Sending Push...')
    await fetch('/subscribe',{
        method:'POST',
        body: JSON.stringify(subscription),
        header: {
            'content-type' : 'application/json'
        }
    })
    console.log('Push sent...')
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }