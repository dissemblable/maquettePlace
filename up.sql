-- Création de la base de données
CREATE DATABASE IF NOT EXISTS GestionStock;
USE GestionStock;

-- Table Catégories
CREATE TABLE IF NOT EXISTS Categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

-- Table Fournisseurs
CREATE TABLE IF NOT EXISTS Fournisseurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    adresse TEXT,
    telephone VARCHAR(15)
);

-- Table Produits
CREATE TABLE IF NOT EXISTS Produits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prix_unitaire DECIMAL(10, 2) NOT NULL,
    quantite_stock INT DEFAULT 0,
    categorie_id INT,
    fournisseur_id INT,
    FOREIGN KEY (categorie_id) REFERENCES Categories(id),
    FOREIGN KEY (fournisseur_id) REFERENCES Fournisseurs(id)
);

-- Table Clients
CREATE TABLE IF NOT EXISTS Clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    adresse TEXT,
    email VARCHAR(100),
    telephone VARCHAR(15)
);

-- Table Commandes
CREATE TABLE IF NOT EXISTS Commandes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date_commande DATE NOT NULL,
    client_id INT,
    FOREIGN KEY (client_id) REFERENCES Clients(id)
);

-- Table Lignes_Commandes
CREATE TABLE IF NOT EXISTS Lignes_Commandes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    commande_id INT,
    produit_id INT,
    quantite INT NOT NULL,
    prix_unitaire DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (commande_id) REFERENCES Commandes(id),
    FOREIGN KEY (produit_id) REFERENCES Produits(id)
);

-- Table de jointure entre Produits et Fournisseurs
CREATE TABLE IF NOT EXISTS Produits_Fournisseurs (
    produit_id INT,
    fournisseur_id INT,
    FOREIGN KEY (produit_id) REFERENCES Produits(id),
    FOREIGN KEY (fournisseur_id) REFERENCES Fournisseurs(id)
);
