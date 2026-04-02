let registros = [];

const WEBHOOK = "https://discord.com/api/webhooks/1487529671393280092/pqVVaPrgcsxEBz8dbfDxdmY-F-IHp4clbufOH2AGHHdU81I4TUjYoWGY4GOfAO21wNVt";

export default async function handler(req, res) {

  if (req.method === "POST") {
    const data = req.body;

    if (!data) {
      return res.status(400).json({ error: "Sin datos" });
    }

    const nuevo = {
      name: data.name || "Desconocido",
      generation: data.generation || "N/A",
      rarity: data.rarity || "N/A",
      value: data.value || 0,
      jobid: data.jobid || "N/A",
      players: data.players || "N/A",
      fecha: new Date().toLocaleString()
    };

    registros.push(nuevo);

    try {
      await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content:
`🔥 NUEVO ENCONTRADO 🔥

🐾 Nombre: ${nuevo.name}
👥 Jugadores: ${nuevo.players}
⚡ Generación: ${nuevo.generation}
💎 Rareza: ${nuevo.rarity}
💰 Valor: ${nuevo.value}
🌍 Server ID: ${nuevo.jobid}`
        })
      });
    } catch (err) {}

    return res.status(200).json({ success: true });
  }

  if (req.method === "GET") {

    let html = `<h1>📡 Tracker en vivo</h1>`;

    registros.slice().reverse().forEach(r => {
      html += `
        <div>
          <b>${r.name}</b><br>
          👥 ${r.players} | ⚡ ${r.generation} | 💎 ${r.rarity} | 💰 ${r.value}<br>
          🌍 ${r.jobid}<br><br>
        </div>
      `;
    });

    return res.send(html);
  }
               }
