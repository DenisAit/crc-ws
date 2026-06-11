#!/usr/bin/env bash
# =============================================================================
# Initiales Holen des Let's Encrypt Zertifikats für rdf-nc.de
#
# Pattern angelehnt an https://github.com/wmnnd/nginx-certbot (MIT)
#
# Auf dem VPS EINMALIG ausführen, BEVOR `docker compose -f docker-compose.prod.yml up -d`
# normal benutzt wird:
#
#     export LETSENCRYPT_EMAIL="deine-mail@example.com"
#     ./ssl/init-letsencrypt.sh
#
# Was passiert:
#  1. Dummy-Self-Signed-Cert wird angelegt, damit Nginx mit der HTTPS-Section starten kann
#  2. Nginx startet (bedient HTTP-01 Challenge auf Port 80 via /.well-known/acme-challenge)
#  3. Dummy-Cert wird gelöscht
#  4. certbot holt echtes Let's Encrypt Cert via HTTP-01
#  5. Nginx wird reloaded -> echtes Cert ist aktiv
#
# Voraussetzungen auf dem VPS:
#  - DNS-A-Record `rdf-nc.de` (+ www) zeigt auf die VPS-IP
#  - Port 80 + 443 sind offen und leiten auf den VPS
#  - .env mit allen Werten ist neben docker-compose.prod.yml platziert
# =============================================================================
set -euo pipefail

domains=(rdf-nc.de www.rdf-nc.de)
rsa_key_size=4096
email="${LETSENCRYPT_EMAIL:-}"
# 1 = Let's Encrypt Staging (zum Debuggen, vermeidet Rate-Limits, Browser zeigt aber Warnung)
# 0 = echtes Production-Cert
staging="${LETSENCRYPT_STAGING:-0}"
compose_file="docker-compose.prod.yml"

if ! command -v docker >/dev/null 2>&1; then
  echo "Error: docker ist nicht installiert." >&2
  exit 1
fi

if [ -z "$email" ]; then
  echo "Error: LETSENCRYPT_EMAIL ist leer. Setze sie in der .env oder als Env-Var:" >&2
  echo "       export LETSENCRYPT_EMAIL=\"deine-mail@example.com\"" >&2
  exit 1
fi

primary="${domains[0]}"

echo "### 1/4  Dummy-Zertifikat für $primary anlegen, damit Nginx starten kann ..."
docker compose -f "$compose_file" run --rm --entrypoint "\
  sh -c 'mkdir -p /etc/letsencrypt/live/$primary && \
         openssl req -x509 -nodes -newkey rsa:$rsa_key_size -days 1 \
           -keyout /etc/letsencrypt/live/$primary/privkey.pem \
           -out    /etc/letsencrypt/live/$primary/fullchain.pem \
           -subj \"/CN=localhost\"'" certbot
echo

echo "### 2/4  Nginx (neu) starten ..."
docker compose -f "$compose_file" up --force-recreate -d nginx
echo

echo "### 3/4  Dummy-Cert weg, echtes Let's Encrypt Cert holen ..."
docker compose -f "$compose_file" run --rm --entrypoint "\
  sh -c 'rm -rf /etc/letsencrypt/live/$primary \
                /etc/letsencrypt/archive/$primary \
                /etc/letsencrypt/renewal/$primary.conf'" certbot

domain_args=""
for d in "${domains[@]}"; do domain_args="$domain_args -d $d"; done

staging_arg=""
[ "$staging" != "0" ] && staging_arg="--staging"

docker compose -f "$compose_file" run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    $staging_arg \
    --email $email \
    --agree-tos --no-eff-email \
    --rsa-key-size $rsa_key_size \
    --force-renewal \
    $domain_args" certbot
echo

echo "### 4/4  Nginx reloaden, neues Cert wird aktiv ..."
docker compose -f "$compose_file" exec nginx nginx -s reload
echo
echo "### Fertig. https://$primary sollte jetzt mit gültigem Let's Encrypt Zertifikat funktionieren."
echo "###        Erneuerung passiert automatisch alle 12h durch den certbot-Container."
