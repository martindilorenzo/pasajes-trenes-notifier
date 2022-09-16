import { chromium } from 'playwright'
import notifier from 'node-notifier'
import cron from 'node-cron'
import { sendEmail } from './sendEmail';


//                    ┌────────────── second (optional)
//                    │ ┌──────────── minute
//                    │ │ ┌────────── hour
//                    │ │ │ ┌──────── day of month
//                    │ │ │ │ ┌────── month
//                    │ │ │ │ │ ┌──── day of week
//                    │ │ │ │ │ │
//                    │ │ │ │ │ │
//                    * * * * * *
const FREQUENCY = '*/10 * * * * *';

const MENSAJE = "La venta de pasajes a Mar del Plata, Pinamar, Bahía Blanca, Rufino / Justo Daract, Bragado / Pehuajó, Junín, Tucumán, Córdoba y Rosario se encuentra habilitada hasta el 31/10/22 inclusive";

let cantAvisos = 0;

cron.schedule(FREQUENCY, async () => {
  
  console.log(`Running on: ${new Date().toLocaleString('es-AR', { timeZone: 'America/Buenos_Aires' })}`)

  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto('https://www.argentina.gob.ar/transporte/trenes-argentinos/pasajes-larga-distancia')

  const content = await page.innerHTML('div[class="media-body"] strong')

  if (content === MENSAJE) {
    console.log("NO HAY PASAJES NUEVOS");
  } else {
    notifier.notify({
      title: "PASAJES NUEVOS",
      message: "HAY PASAJES NUEVOS!!!!!!!!!!"
    })
    console.log(cantAvisos);
    if (cantAvisos < 3) {
      sendEmail(); 
      cantAvisos++;
    }
  }
  
  await browser.close()
})