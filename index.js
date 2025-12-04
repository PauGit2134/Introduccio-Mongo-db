// index.js
const { connectDB, getDB, closeDB } = require('./db');

/**
 * Inserir un sol producte
 */
async function inserirProducte() {
  try {
    await connectDB();
    const db = getDB();
    const productes = db.collection('productes');

    const nouProducte = {
      nom: 'Portàtil HP',
      preu: 699.99,
      stock: 15,
      categoria: 'informàtica'
    };

    const resultat = await productes.insertOne(nouProducte);
    console.log('Producte inserit amb ID:', resultat.insertedId);

  } catch (error) {
    console.error('Error inserint producte:', error);
  } finally {
    await closeDB();
  }
}

/**
 * Inserir diversos productes d'un cop
 */
async function inserirVarisProductes() {
  try {
    await connectDB();
    const db = getDB();
    const productes = db.collection('productes');

    const nousProductes = [
      { nom: 'Ratolí Logitech', preu: 29.99, stock: 50, categoria: 'perifèrics' },
      { nom: 'Teclat mecànic', preu: 89.99, stock: 20, categoria: 'perifèrics' },
      { nom: 'Monitor 24"', preu: 199.99, stock: 10, categoria: 'informàtica' }
    ];

    const resultat = await productes.insertMany(nousProductes);

    console.log(`S'han inserit ${resultat.insertedCount} productes`);
    console.log('IDs inserits:', resultat.insertedIds);

  } catch (error) {
    console.error('Error inserint productes:', error);
  } finally {
    await closeDB();
  }
}

/**
 * Obtenir tots els productes
 */
async function obtenirTotsElsProductes() {
  try {
    await connectDB();
    const db = getDB();
    const productes = db.collection('productes');

    const totsElsProductes = await productes.find().toArray();

    console.log(`S'han trobat ${totsElsProductes.length} productes:`);
    totsElsProductes.forEach(p => {
      console.log(`- ${p.nom} (${p.preu}€) - Stock: ${p.stock}`);
    });

  } catch (error) {
    console.error('Error obtenint productes:', error);
  } finally {
    await closeDB();
  }
}

/**
 * Obtenir un únic producte pel seu nom
 */
async function obtenirProductePerNom() {
  try {
    await connectDB();
    const db = getDB();
    const productes = db.collection('productes');

    const producte = await productes.findOne({ nom: 'Portàtil HP' });

    if (producte) {
      console.log('Producte trobat:');
      console.log(`  Nom: ${producte.nom}`);
      console.log(`  Preu: ${producte.preu}€`);
      console.log(`  Stock: ${producte.stock}`);
      console.log(`  ID: ${producte._id}`);
    } else {
      console.log('No s\'ha trobat cap producte amb aquest nom');
    }

  } catch (error) {
    console.error('Error cercant producte:', error);
  } finally {
    await closeDB();
  }
}

/**
 * Consultes amb filtres
 */
async function cercarProductes() {
  try {
    await connectDB();
    const db = getDB();
    const productes = db.collection('productes');

    // Categoria = perifèrics
    console.log('--- Productes de la categoria "perifèrics" ---');
    const periferics = await productes.find({ categoria: 'perifèrics' }).toArray();
    periferics.forEach(p => console.log(`- ${p.nom}`));

    // Stock > 20
    console.log('\n--- Productes amb stock > 20 ---');
    const ambStock = await productes.find({ stock: { $gt: 20 } }).toArray();
    ambStock.forEach(p => console.log(`- ${p.nom} (Stock: ${p.stock})`));

    // Preu ≤ 50€
    console.log('\n--- Productes amb preu <= 50€ ---');
    const barats = await productes.find({ preu: { $lte: 50 } }).toArray();
    barats.forEach(p => console.log(`- ${p.nom} (${p.preu}€)`));

  } catch (error) {
    console.error('Error cercant productes:', error);
  } finally {
    await closeDB();
  }
}

/* -----------------------------------------------------
   DESCOMENTA LA FUNCIÓ QUE VULGUIS EXECUTAR
------------------------------------------------------ */

//inserirProducte();
// inserirVarisProductes();
// obtenirTotsElsProductes();
// obtenirProductePerNom();
// cercarProductes();
