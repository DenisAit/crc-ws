# Rollen & Berechtigungen — Reyes del Fuego

Wer darf was im RDF-Management-System? Kurz und ohne Technik.

> Das System liest die **Discord-Rollen** des Mitglieds und entscheidet daraus, was die Person sehen und tun darf. Wenn Roxy z.B. die Discord-Rolle „👑 La Patrona" hat, kriegt sie automatisch volle Rechte.
>
> **Wichtig**: Mehrere Rollen kombinieren sich (z.B. *5 | Soldado* + *Routenverwaltung* = Soldado-Sicht + extra Paket-Rechte). Höhere Ränge erben *nicht* automatisch tiefere Funktionsrollen — wer Pakete bestätigen darf, braucht entweder eine Leadership-Rolle ODER eine Funktionsrolle wie *Rutas*.

---

## 1. Die Hierarchie auf einen Blick

```
                        👑  La Patrona                  ← höchste Macht, kann alles
                                │
              ┌─────────────────┼─────────────────┐
       Don - El Capitán   Don - El Comandante     │     ← Leadership
                                                  │
                                  El Mano Derecha │     ← Rechte Hand
                                                  │
                              9 | El Custodio     │
                              8 | El Mentor       │
                              7 | El Encargado    │     ← Mittlere Ränge
                              6 | El Teniente     │
                              5 | Soldado         │
                              4 | El Prefecto     │
                              3 | El Confidente   │     ← Untere Ränge
                              2 | El Protector    │
                              1 | El Novato       │
                                                  │
                              Reyes del Fuego     │     ← Basis / Anwärter
                                                  │
   Funktionsrollen (zusätzlich zum Rang):         │
     • Routenverwaltung / Rutas    – Pakete & Lieferungen
     • Sicario                     – Sondereinheit
     • Logistica                   – Lager & Ausrüstung
     • Formación                   – Training (z.B. Bloodlist)
```

Die **Leadership** sind die obersten 4 Rollen: *La Patrona*, *Don - El Capitán*, *Don - El Comandante*, *El Mano Derecha*.

---

## 2. Was kann jede Rolle?

### 👑 La Patrona  *(höchste Rolle, technisch: EL_PATRON)*

**Kann alles, was sonst niemand kann:**
- Sanktions-Level einzelner Mitglieder zurücksetzen
- Geldtransaktionen ohne Zweitprüfung freigeben
- *Berechtigungen vergeben* für Module (z.B. wer Partner-Anfragen prüfen darf)
- Komplette Bloodlist-Historie einsehen (auch ältere Records)
- Inaktive Discord-Mitglieder per Knopfdruck aus dem System entfernen
- Blood-In Discord-Rollen-Settings ändern

Plus alles, was die anderen Leadership-Rollen können.

### Don - El Capitán & Don - El Comandante  *(DON_CAPITAN, DON_COMANDANTE)*

Gleiche Rechte wie *La Patrona*, **außer** den Patrona-only-Sachen oben. Das heißt:
- Sanktionen erstellen, kassieren, aufheben
- Pakete bestätigen, ablehnen, archivieren, Preis ändern
- Mitgliederakten lesen, neue Einträge anlegen, archivieren, Uprank-Anträge prüfen
- Blood In / Blood Out durchführen, Bloodlist-Stats sehen
- Tafelrunde, Aufstellungen, Familiensammeln verwalten
- Sicario-Aufstellungen erstellen
- Partner-Anfragen annehmen/ablehnen, aktive Partner verwalten
- Taxi-Schlüssel ausstellen, einziehen, Fahrer zuweisen
- Karte: Markierungen verwalten, Vorschläge prüfen
- Discord-Mitglieder synchronisieren

### El Mano Derecha  *(EL_MANO_DERECHA)*

Praktisch identisch mit *Don*. Rechte Hand der Patrona, alle Leadership-Aktionen außer den Patrona-only-Sachen.

### Mittlere & untere Ränge (1 - 9)
*El Custodio, El Mentor, El Encargado, El Teniente, Soldado, El Prefecto, El Confidente, El Protector, El Novato*

Können vor allem **lesen** und sich selbst betreffende Sachen tun:
- Eigenes Profil, eigene Kleidung, eigene Ausrüstung sehen
- Pakete einsehen und einliefern (mit Soldado-Rang aufwärts)
- An Aufstellungen / Familiensammeln teilnehmen (Anwesenheit)
- Eigene Sanktionen und Wochenabgaben sehen
- Karte ansehen, eigene Vorschläge einreichen

Sie können **nicht** Geldtransaktionen freigeben, Sanktionen verteilen, Mitglieder akzeptieren oder Lager-Inhalte ändern.

### Reyes del Fuego (Basis / Anwärter)  *(FUTURO)*

Nur **Lese-Zugriff**. Kann sich einloggen, das Dashboard sehen, eigene Daten einsehen — nicht mehr. Sobald jemand einen Rang ab *El Novato* aufwärts bekommt, fallen weitere Rechte ein.

---

## 3. Funktionsrollen (zusätzlich zur Hauptrolle)

Diese Rollen geben **gezielte Extra-Rechte** für ein bestimmtes Modul, unabhängig vom Rang.

### Routenverwaltung & Rutas

- **Pakete**: einsehen, einliefern, Wochenabgabe-Pakete bezahlen, Preis ändern, alte Pakete löschen
- **Discord-Channels**: lesen
- Behandelt wie „Logistik der Pakete"

### Logistica

- **Lager / Items**: vollen Zugriff (anlegen, bewegen, Inventur)
- **Ausrüstung**: Waffen / Westen / Munition für jedes Mitglied verwalten
- **Pakete**: einsehen, einliefern, Wochenabgabe-Werte bezahlen
- Behandelt wie „Logistik der Items"

### Sicario

- **Sicario-Modul**: Aufstellungen sehen, daran teilnehmen, eigene Bestätigung abgeben
- **Pakete**: einsehen + einliefern (wie Soldado)
- Wird zusätzlich zum Rang vergeben

### Formación (Ausbildung)

- **Bloodlist**: Blood In durchführen (Mitglieder als „im Training" markieren)
- Plus normaler Rang-Zugriff

---

## 4. Modul-Übersicht — wer darf was

| Modul                         | Wer darf was?                                                                                  |
|-------------------------------|------------------------------------------------------------------------------------------------|
| **Dashboard**                 | Alle (Inhalte je nach Rang)                                                                    |
| **Sanktionen**                | Leadership: erstellen, kassieren, aufheben.  Mitglieder: nur eigene sehen.  La Patrona: Levels resetten |
| **Cash / Geldkassa**          | Mitglieder: Transaktionen einreichen.  Leadership: bestätigen.  La Patrona: ohne Zweitprüfung |
| **Pakete (Packages)**         | Leadership + Routenverwaltung + Rutas: Vollzugriff.  Soldado/Sicario/Logistica: einsehen + einliefern |
| **Wochenabgabe**              | Leadership + Rutas: bezahlen, archivieren, Sanktionen auslösen.  Mitglieder: eigene Abgabe sehen |
| **Lager / Items**             | Leadership + Logistica: Vollzugriff (anlegen, bewegen, Inventur)                              |
| **Ausrüstung (Equipment)**    | Leadership + Logistica: Waffen/Westen/Munition für andere verwalten.  Mitglieder: eigene sehen |
| **Mitgliederakten**           | Leadership: vollen Zugriff (Einträge, Uprank, Archiv).  Andere: kein Zugriff                  |
| **Bloodlist**                 | Leadership + Formación: Blood In.  Leadership: Blood Out, Stats, Suche.  La Patrona: alle Records |
| **Tafelrunde**                | Leadership: Treffen anlegen, Familien einladen, Anwesenheit pflegen.  La Patrona: Berechtigungen vergeben |
| **Aufstellung**               | Leadership: erstellen, einladen, Sanktionen auslösen.  Mitglieder: Antworten (Ja/Nein)        |
| **Familiensammeln**           | Leadership: Wochen anlegen, Statistiken, Bearbeiter zuweisen.  Mitglieder: Teilnahme melden    |
| **Sicario**                   | Leadership + Sicario-Funktionsrolle: Team, Aufstellungen.  Andere: kein Zugriff               |
| **Partner**                   | Leadership: alle Anfragen prüfen, aktive Partner verwalten.  La Patrona: Berechtigungen vergeben.  Sondergenehmigte: prüfen |
| **Taxi**                      | Leadership: Schlüssel ausstellen, Fahrer zuweisen, Aufträge verwalten.  Andere: eigene Aufträge |
| **Karte**                     | Leadership: alle Markierungen / Vorschläge.  Mitglieder: Karte sehen + Vorschläge einreichen   |
| **Discord-Sync**              | Leadership: Sync, Mitglieder importieren.  La Patrona: inaktive Mitglieder entfernen          |
| **Casa**                      | Alle: Bilder ansehen.  Leadership: Standort ändern                                            |
| **Kleidung**                  | Mitglieder: eigene Kleidung sehen.  Leadership: Outfit-Templates pflegen                       |
| **Audit-Log**                 | Leadership: alle Aktionen einsehen                                                            |
| **Settings**                  | La Patrona: alles.  Leadership: Wochenabgabe / Xiao Motors / Bloodlist-Settings                |

---

## 5. Häufige Situationen

**„Ein neues Mitglied kann sich nicht einloggen"**
→ Es hat (noch) keine Discord-Rolle aus der Liste oben. Mindestens *Reyes del Fuego* (Anwärter) im Discord vergeben. Sobald höher gerankt → automatisch mehr Rechte.

**„Ein Mitglied soll Partner-Anfragen prüfen können, ist aber kein Leadership"**
→ La Patrona vergibt im Modul **Partner** → *Berechtigungen* die Permission an die Person.

**„Jemand soll vorübergehend Pakete bestätigen können"**
→ Discord-Rolle *Routenverwaltung* oder *Rutas* vergeben.

**„Jemand soll ins Lager arbeiten"**
→ Discord-Rolle *Logistica* vergeben.

**„Sicario-Sondereinsatz ankündigen"**
→ Leadership erstellt eine Sicario-Aufstellung. Mitglieder mit Discord-Rolle *Sicario* sehen + bestätigen.

---

## 6. Spickzettel für La Patrona

Diese Sachen kann **nur Roxy** (außer im technischen Sinn der Server-Admin):

- Sanktions-Level eines Mitglieds zurücksetzen
- Im Modul **Partner** und **Tafelrunde** Berechtigungen an Nicht-Leadership vergeben
- **Bloodlist** alle Records (auch alte/abgeschlossene) einsehen
- **Cash**: Geldtransaktionen ohne Bestätigung freigeben
- **Discord**: inaktive Geister-User in einem Rutsch entfernen
- **Settings → Bloodlist Discord-Rollen**: festlegen, welche Discord-Rollen Blood-In auslösen
