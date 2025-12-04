// db.js

// Importem els mòduls necessaris
require('dotenv').config();          // Carrega les variables del fitxer .env
const { MongoClient } = require('mongodb');  // Importem MongoClient del paquet mongodb

// Obtenim la URI de connexió des de les variables d'entorn
const uri = process.env.MONGODB_URI;

// Creem una instància del client de MongoDB
const client = new MongoClient(uri);

// Variable per guardar la referència a la base de dades un cop connectada
let database = null;

/**
 * Funció per connectar a MongoDB
 * @returns {Promise<Db>} Retorna la referència a la base de dades
 */
async function connectDB() {
  try {
    await client.connect();
    console.log('Connectat a MongoDB Atlas');

    // Obtenim la referència a la base de dades (el nom ha de coincidir amb el del .env)
    database = client.db('botiga');

    return database;
  } catch (error) {
    console.error('Error connectant a MongoDB:', error);
    throw error;
  }
}

/**
 * Funció per obtenir la base de dades si ja està connectada
 * @returns {Db}
 */
function getDB() {
  if (!database) {
    throw new Error('Base de dades no connectada! Crida connectDB() primer.');
  }
  return database;
}

/**
 * Funció per tancar la connexió amb la BD
 */
async function closeDB() {
  try {
    await client.close();
    console.log('Connexió tancada');
  } catch (error) {
    console.error('Error tancant la connexió:', error);
    throw error;
  }
}

// Exportem les funcions
module.exports = {
  connectDB,
  getDB,
  closeDB
};
