const express = require('express');
const fs = require('fs');
const xml2js = require('xml2js');
const cors = require('cors');

const app = express();
const port = 3001;
const xmlFile = 'dictionary.xml';

app.use(express.json());
app.use(cors());

// Lire le dictionnaire XML
app.get('/api/dictionary', (req, res) => {
    fs.readFile(xmlFile, 'utf-8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Erreur de lecture du fichier' });
        
        xml2js.parseString(data, (err, result) => {
            if (err) return res.status(500).json({ error: 'Erreur de parsing XML' });
            
            res.json(result.bdd.entry);
        });
    });
});

// Ajouter un mot
app.post('/api/dictionary', (req, res) => {
    const { phon, orth, pos, def } = req.body;
    
    fs.readFile(xmlFile, 'utf-8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Erreur de lecture du fichier' });

        xml2js.parseString(data, (err, result) => {
            if (err) return res.status(500).json({ error: 'Erreur de parsing XML' });
            
            const newEntry = {
                lemma: [
                    { _: phon, $: { n: 'phon' } },
                    { _: orth, $: { n: 'orth' } }
                ],
                form: [{ pos: [{ _: pos, $: { n: '1' } }] }],
                def: [def]
            };

            result.bdd.entry.push(newEntry);
            
            const builder = new xml2js.Builder();
            const updatedXml = builder.buildObject(result);

            fs.writeFile(xmlFile, updatedXml, (err) => {
                if (err) return res.status(500).json({ error: "Erreur d'écriture du fichier" });
                res.json({ message: 'Mot ajouté avec succès' });
            });
        });
    });
});

// Modifier un mot existant
app.put('/api/dictionary/:orth', (req, res) => {
    const { phon, orth, pos, def } = req.body;
    const searchOrth = req.params.orth;

    fs.readFile(xmlFile, 'utf-8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Erreur de lecture du fichier' });

        xml2js.parseString(data, (err, result) => {
            if (err) return res.status(500).json({ error: 'Erreur de parsing XML' });
            
            const entry = result.bdd.entry.find(e => e.lemma[1]._ === searchOrth);
            if (!entry) return res.status(404).json({ error: 'Mot non trouvé' });
            
            entry.lemma[0]._ = phon;
            entry.lemma[1]._ = orth;
            entry.form[0].pos[0]._ = pos;
            entry.def[0] = def;
            
            const builder = new xml2js.Builder();
            const updatedXml = builder.buildObject(result);

            fs.writeFile(xmlFile, updatedXml, (err) => {
                if (err) return res.status(500).json({ error: "Erreur d'écriture du fichier" });
                res.json({ message: 'Mot modifié avec succès' });
            });
        });
    });
});
// Supprimer un mot
app.delete('/api/dictionary/:orth', (req, res) => {
    const searchOrth = req.params.orth;

    fs.readFile(xmlFile, 'utf-8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Erreur de lecture du fichier' });

        xml2js.parseString(data, (err, result) => {
            if (err) return res.status(500).json({ error: 'Erreur de parsing XML' });
            
            const entryIndex = result.bdd.entry.findIndex(e => e.lemma[1]._ === searchOrth);
            if (entryIndex === -1) return res.status(404).json({ error: 'Mot non trouvé' });
            
            result.bdd.entry.splice(entryIndex, 1); // Supprimer l'entrée
            
            const builder = new xml2js.Builder();
            const updatedXml = builder.buildObject(result);

            fs.writeFile(xmlFile, updatedXml, (err) => {
                if (err) return res.status(500).json({ error: "Erreur d'écriture du fichier" });
                res.json({ message: 'Mot supprimé avec succès' });
            });
        });
    });
});

app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});
