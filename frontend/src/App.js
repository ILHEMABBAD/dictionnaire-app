import React, { useState, useEffect } from "react";
import axios from "axios";
import './styles.css'; // Importation du fichier CSS

const App = () => {
  const [entries, setEntries] = useState([]);
  const [search, setSearch] = useState("");
  const [newWord, setNewWord] = useState({ phon: "", orth: "", pos: "", def: "" });

  // Charger les entrées du dictionnaire depuis le backend
  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/dictionary");
      setEntries(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des données", error);
    }
  };

  // Mettre à jour l'état lors de la recherche
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  // Mettre à jour l'état lors de la saisie d'un nouveau mot
  const handleChange = (event) => {
    setNewWord({ ...newWord, [event.target.name]: event.target.value });
  };

  // Ajouter une nouvelle entrée au dictionnaire
  const addEntry = async () => {
    try {
      await axios.post("http://localhost:3001/api/dictionary", newWord);
      fetchEntries(); // Recharger la liste
      setNewWord({ phon: "", orth: "", pos: "", def: "" }); // Réinitialiser le formulaire
    } catch (error) {
      console.error("Erreur lors de l'ajout du mot", error);
    }
  };

  // Supprimer un mot
  const deleteEntry = async (orth) => {
    try {
      await axios.delete(`http://localhost:3001/api/dictionary/${orth}`);
      fetchEntries(); // Recharger la liste après la suppression
    } catch (error) {
      console.error("Erreur lors de la suppression du mot", error);
    }
  };

  // Filtrer les mots selon la recherche
  const filteredEntries = entries.filter(entry =>
    entry.lemma[1]?._?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dictionnaire XML</h1>

      {/* Champ de recherche */}
      <input
        type="text"
        placeholder="Rechercher un mot..."
        value={search}
        onChange={handleSearch}
        className="search-input"
      />

      {/* Tableau des mots */}
      <table className="table">
        <thead>
          <tr>
            <th>Phonétique</th>
            <th>Orthographe</th>
            <th>Partie du discours</th>
            <th>Définition</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEntries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.lemma[0]?._ || "N/A"}</td>
              <td>{entry.lemma[1]?._ || "N/A"}</td>
              <td>{entry.form?.[0]?.pos?.[0]?._ || "N/A"}</td>
              <td>{entry.def?.[0] || "N/A"}</td>
              <td>
                <button onClick={() => deleteEntry(entry.lemma[1]?._)} className="btn-red">
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulaire d'ajout */}
      <h2 className="text-xl font-bold mt-6">Ajouter un mot</h2>
      <div className="grid-inputs">
        <input name="phon" value={newWord.phon} onChange={handleChange} placeholder="Phonétique" />
        <input name="orth" value={newWord.orth} onChange={handleChange} placeholder="Orthographe" />
        <input name="pos" value={newWord.pos} onChange={handleChange} placeholder="Partie du discours" />
        <input name="def" value={newWord.def} onChange={handleChange} placeholder="Définition" />
        <button onClick={addEntry} className="add-button">Ajouter</button>
      </div>
    </div>
  );
};

export default App;
