# SSL Setup für `rdf-nc.de` mit Let's Encrypt

Wir nutzen `certbot` (HTTP-01 Challenge) im selben Docker-Compose-Stack.
Cloudflare wird **nicht** vorgeschaltet, der DNS-A-Record zeigt direkt auf den VPS.

## Voraussetzungen auf dem VPS

1. **DNS** zeigt direkt auf die VPS-IP:
   ```
   rdf-nc.de       A    <VPS-IP>
   www.rdf-nc.de   A    <VPS-IP>
   ```
2. **Firewall offen** für TCP `80` und `443`.
3. **Docker + Docker Compose** installiert.
4. Repository geklont, `.env` mit allen Werten neben `docker-compose.prod.yml` abgelegt
   (siehe `env.prod.example` als Vorlage). Insbesondere `LETSENCRYPT_EMAIL` ist gesetzt.

## Initiales Zertifikat holen (einmalig)

```bash
# 1. ins Repo
cd /opt/crc-ws

# 2. .env muss vorhanden sein und LETSENCRYPT_EMAIL enthalten
grep LETSENCRYPT_EMAIL .env

# 3. Restlichen Stack einmal hochfahren, damit api/web/db gebaut/gestartet sind
docker compose -f docker-compose.prod.yml up -d db api web

# 4. Init-Script ausführen (zieht das echte Cert)
chmod +x ssl/init-letsencrypt.sh
LETSENCRYPT_EMAIL="$(grep -E '^LETSENCRYPT_EMAIL=' .env | cut -d= -f2- | tr -d '"')" \
  ./ssl/init-letsencrypt.sh

# 5. Den Rest des Stacks dazustarten (certbot-Daemon für Auto-Renewal)
docker compose -f docker-compose.prod.yml up -d
```

Danach erreicht `https://rdf-nc.de` deinen Stack mit gültigem Let's Encrypt Cert.

## Test mit Staging (gegen Rate-Limits gewappnet)

Wenn du beim Debuggen viel rumprobierst, nutze erst Staging
(Browser zeigt dann „nicht vertrauenswürdig", aber du verbrennst keine Issuance-Quote):

```bash
LETSENCRYPT_STAGING=1 LETSENCRYPT_EMAIL="..." ./ssl/init-letsencrypt.sh
```

Sobald alles klappt, mit `LETSENCRYPT_STAGING=0` (oder weglassen) für ein echtes Cert nochmal laufen lassen.

## Auto-Renewal

Der `certbot`-Container läuft permanent und versucht alle 12h `certbot renew`.
Wenn ein Cert erneuert wird, lädt der `nginx`-Container alle 6h `nginx -s reload`,
sodass das neue Cert automatisch aktiv wird. Du musst manuell nichts tun.

Status prüfen:
```bash
docker compose -f docker-compose.prod.yml logs certbot --tail 50
docker compose -f docker-compose.prod.yml exec certbot certbot certificates
```

## Troubleshooting

| Problem | Ursache / Fix |
|---|---|
| `Connection refused` beim Issue | Port 80 nicht offen oder DNS zeigt nicht auf VPS |
| `too many failed authorizations` | Du hast Staging-Limits erreicht – warte oder anderen Account |
| Nginx startet nicht („no such file: fullchain.pem") | Init-Script wurde nicht ausgeführt; Dummy-Cert fehlt |
| Cert läuft trotz Container ab | `certbot`-Container down? `docker compose ... ps` prüfen |
