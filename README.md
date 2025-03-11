# Finanzmanager Setup-Anleitung

## Installation und Einrichtung

Um dieses Projekt einzurichten, befolge die folgenden Schritte:

### Schritt 1: Das Setup-Skript ausführen

#### Shell-Skripte auf verschiedenen Betriebssystemen ausführen

##### macOS/Linux

1. Terminal öffnen
2. Zum Verzeichnis mit dem Skript navigieren:
   ```
   cd /pfad/zum/verzeichnis
   ```
3. Das Skript ausführbar machen:
   ```
   chmod +x setup.sh
   ```
4. Das Skript ausführen:
   ```
   ./setup.sh
   ```
   oder
   ```
   bash setup.sh
   ```

##### Windows

**Option 1: Verwendung des Windows-Subsystems für Linux (WSL)**

1. WSL über den Microsoft Store oder PowerShell installieren
2. WSL-Terminal öffnen
3. Zum Verzeichnis mit dem Skript navigieren:
   ```
   cd /pfad/zum/verzeichnis
   ```
4. Das Skript ausführen:
   ```
   chmod +x setup.sh
   ./setup.sh
   ```

**Option 2: Verwendung von Git Bash**

1. [Git für Windows](https://gitforwindows.org/) installieren
2. Rechtsklick im Ordner mit dem Skript und **"Git Bash Here"** auswählen
3. Das Skript ausführen:
   ```
   ./setup.sh
   ```

**Option 3: Verwendung von Cygwin**

1. [Cygwin](https://www.cygwin.com/) installieren
2. Cygwin-Terminal öffnen
3. Zum Verzeichnis mit dem Skript navigieren:
   ```
   cd /pfad/zum/verzeichnis
   ```
4. Das Skript ausführen:
   ```
   chmod +x setup.sh
   ./setup.sh
   ```

##### Universelle Methode

Unabhängig vom Betriebssystem kann das Skript mit folgendem Befehl ausgeführt werden:

```
bash setup.sh
```

### Schritt 2: Die Anwendung starten

Nachdem das Setup-Skript ausgeführt wurde, kann die Anwendung mit folgendem Befehl gestartet werden:

```sh
npm run dvop
```

Dadurch wird die Webseite im Standard-Webbrowser geladen. Um die Datenbank bei Start zu resetten und neu zu seeden:

```sh
npm run rsop
```

### Schritt 3: Features
Hier siehst du alle Funktionen der jeweiligen Seiten.

#### **Admin (Mit dem Admin-Account einloggen)**
- Benutzer-Accounts:
   - Löschen
   - Aktualisieren
   - Erstellen

#### **Login**
- Einloggen
- Neuen Benutzer-Account anlegen

#### **Home**
- Deine Ausgaben anzeigen
- Eigene Schulden und ausstehende Beträge von anderen Nutzern einsehen

#### **Accounts**
- Ein "Bankkonto" hinzufügen
- Detaillierte Informationen zu deinen Konten anzeigen:
   - Ausgaben
   - Einnahmen
   - Transaktionen
- Neue Transaktion für dein Konto erstellen

#### **Debt**
- Geld von anderen Nutzern anfordern
- Deine aktuellen Schulden im Detail ansehen

#### **Transactions**
- Alle Details zu deinen Transaktionen anzeigen
- Neue Transaktion erstellen

#### **Settings (Auf das Profil klicken)**
- Benutzer-Account aktualisieren
- Passwort ändern  
