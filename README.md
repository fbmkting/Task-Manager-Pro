# 📋 Task Manager Pro - Guida al Deploy

## ✅ ISTRUZIONI COMPLETE - 5 MINUTI

### PASSO 1: Scarica il Progetto
1. Scarica TUTTI i file che ti fornirò
2. Mettili in una cartella chiamata `taskmanager-deploy`
3. La struttura deve essere esattamente così:

```
taskmanager-deploy/
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
└── src/
    ├── main.jsx
    ├── App.jsx
    └── index.css
```

---

### PASSO 2: Crea Account GitHub (se non ce l'hai)
1. Vai su https://github.com
2. Clicca su "Sign up"
3. Completa la registrazione (GRATIS)

---

### PASSO 3: Carica su GitHub

#### Opzione A - Interfaccia Web (PIÙ FACILE):
1. Vai su https://github.com/new
2. Nome repository: `task-manager-pro`
3. Lascia tutto come default
4. Clicca "Create repository"
5. Nella pagina che appare, clicca su **"uploading an existing file"**
6. **TRASCINA TUTTI I FILE E CARTELLE** nella finestra
7. Scrivi "Initial commit" nel campo messaggio
8. Clicca "Commit changes"

#### Opzione B - Da terminale (se hai Git installato):
```bash
cd taskmanager-deploy
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TUO-USERNAME/task-manager-pro.git
git push -u origin main
```

---

### PASSO 4: Deploy su Vercel (GRATIS)

1. **Vai su https://vercel.com**
2. Clicca **"Sign Up"**
3. Scegli **"Continue with GitHub"** 
4. Autorizza Vercel ad accedere al tuo GitHub
5. Una volta dentro, clicca **"Add New..." → "Project"**
6. Vedrai la lista dei tuoi repository GitHub
7. Cerca `task-manager-pro` e clicca **"Import"**
8. Vercel rileva automaticamente che è un progetto Vite
9. **NON CAMBIARE NULLA** nelle impostazioni
10. Clicca **"Deploy"**

⏱️ **Aspetta 2-3 minuti** - Vercel sta compilando l'app

---

### PASSO 5: APP ONLINE! 🎉

Quando il deploy è completato:
1. Vedrai 🎉 Congratulations!
2. Ti darà un URL tipo: `https://task-manager-pro-xyz123.vercel.app`
3. **Clicca sul link** - L'APP È ONLINE!

---

## 📱 Come Usare l'App

### I 7 Tab Disponibili:
1. **Personale** (Blu)
2. **Famiglia** (Rosa)
3. **ConfsalFisals** (Viola)
4. **ExecutiveServices** (Verde)
5. **BraviServices** (Arancione)
6. **MCNew** (Rosso)
7. **Libretti** (Ciano)

### Funzionalità:
- ✅ Aggiungi task
- 🏷️ Tag (URGENTE, IMPORTANTE, BUG, IDEA)
- 🔴🟡🟢 Priorità (Alta, Media, Bassa)
- 📅 Date di scadenza con avvisi
- 📝 Sottotask
- 📦 Archiviazione automatica
- 🎨 Colori personalizzabili
- 💾 **I DATI SI SALVANO AUTOMATICAMENTE** nel browser

---

## ❓ PROBLEMI COMUNI

### "Non vedo i 7 tab!"
- Cancella cache del browser (Ctrl+Shift+Canc)
- Ricarica la pagina (F5 o Ctrl+R)

### "Upload failed su GitHub"
- Assicurati che TUTTI i file siano nella cartella corretta
- Prova a caricare prima le cartelle, poi i file singoli

### "Deploy failed su Vercel"
- Controlla che il `package.json` sia presente
- Riprova cliccando "Redeploy" in Vercel

### "I dati non si salvano"
- I dati sono salvati nel browser (localStorage)
- Se cancelli i dati del sito, i task vengono eliminati
- Usa sempre lo stesso browser/dispositivo

---

## 🔄 Come Aggiornare l'App

Se vuoi modificare qualcosa:
1. Modifica i file su GitHub (clicca sul file → matita "Edit")
2. Salva le modifiche (Commit)
3. Vercel **aggiorna automaticamente** l'app in 2 minuti!

---

## 🆘 AIUTO

Se hai problemi:
1. Leggi la sezione "PROBLEMI COMUNI" sopra
2. Controlla che tutti i file siano caricati correttamente
3. Verifica che il nome del progetto su GitHub corrisponda

---

## 🎯 LINK UTILI

- **GitHub**: https://github.com
- **Vercel**: https://vercel.com
- **Documentazione Vite**: https://vitejs.dev
- **Documentazione React**: https://react.dev

---

## ✨ Fatto!

La tua app Task Manager Pro è ora online e accessibile da qualsiasi dispositivo con il link Vercel! 

Condividi il link con chi vuoi - l'app è pubblica ma i dati sono privati (salvati localmente nel browser di ogni utente).

**Buon lavoro! 🚀**
