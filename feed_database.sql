-- Insertion des catégories
INSERT INTO Categories (nom) VALUES 
('Avions de chasse'), 
('Avions de ligne'), 
('Avions historiques');

-- Insertion des fournisseurs
INSERT INTO Fournisseurs (nom, adresse, telephone) VALUES 
('Fournisseur A', '123 Rue des Maquettes, Paris', '0123456789'),
('Fournisseur B', '45 Avenue du Papier, Lyon', '0987654321'),
('Fournisseur C', '78 Boulevard du Modélisme, Marseille', '0678912345');

-- Insertion des produits
INSERT INTO Produits (nom, prix_unitaire, quantite_stock, categorie_id, fournisseur_id) VALUES 
('Maquette Mirage 2000', 45.99, 50, 1, 1),
('Maquette Airbus A380', 89.99, 20, 2, 2),
('Maquette Spitfire WW2', 34.50, 30, 3, 3),
('Maquette Concorde', 75.00, 15, 2, 1),
('Maquette Biplan 1917', 25.99, 10, 3, 2);

-- Insertion des clients
INSERT INTO Clients (nom, adresse, email, telephone) VALUES 
('Jean Dupont', '12 Rue de Paris, Paris', 'jean.dupont@example.com', '0612345678'),
('Marie Curie', '34 Rue des Sciences, Lyon', 'marie.curie@example.com', '0623456789'),
('Albert Einstein', '56 Avenue des Génies, Marseille', 'albert.einstein@example.com', '0634567890'),
('Isaac Newton', '78 Rue des Pommes, Lille', 'isaac.newton@example.com', '0645678901');

-- Insertion des commandes
INSERT INTO Commandes (date_commande, client_id) VALUES 
('2023-12-01', 1),
('2023-12-02', 2),
('2023-12-03', 3),
('2023-12-04', 4);

-- Insertion des lignes de commandes
INSERT INTO Lignes_Commandes (commande_id, produit_id, quantite, prix_unitaire) VALUES 
(1, 1, 2, 45.99),
(1, 3, 1, 34.50),
(2, 2, 1, 89.99),
(2, 4, 1, 75.00),
(3, 3, 3, 34.50),
(3, 5, 1, 25.99),
(4, 1, 1, 45.99),
(4, 5, 2, 25.99);

-- Insertion des relations entre produits et fournisseurs
INSERT INTO Produits_Fournisseurs (produit_id, fournisseur_id) VALUES
(1, 1), 
(1, 2),
(2, 2),
(3, 3),
(4, 1),
(5, 2),
(5, 3);
