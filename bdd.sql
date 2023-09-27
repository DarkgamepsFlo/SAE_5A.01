-- Fichier créé à partir de PostgreSQL, attention aux potentielles erreurs en cas de portage
-- Faire attention à l'ordre des créations des tables pour les clés étrangères


--Création de la BDD
-- CREATE DATABASE "Collego"
--     WITH
--     OWNER = postgres
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'French_France.1252'
--     LC_CTYPE = 'French_France.1252'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1
--     IS_TEMPLATE = False;


--Création de la table boite
CREATE TABLE IF NOT EXISTS public.boite
(
    id_boite integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    nom_boite character varying COLLATE pg_catalog."default",
    numero_boi integer,
    univers character varying,
    nbr_pieceboi integer,
    descriptif_boi character varying COLLATE pg_catalog."default",
    annee_sortie_boi integer,
    CONSTRAINT boite_pkey PRIMARY KEY (id_boite)
);


--Création de la table photo_boite
CREATE TABLE IF NOT EXISTS public.photo_boite
(
    id_img_boi integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    lien_img_boi character varying COLLATE pg_catalog."default",
    id_boite integer,
    CONSTRAINT photo_boite_pkey PRIMARY KEY (id_img_boi),
    CONSTRAINT photo_boite_id_boite_fkey FOREIGN KEY (id_boite)
        REFERENCES public.boite (id_boite) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


--Création de la table wishlist
CREATE TABLE IF NOT EXISTS public.wishlist
(
    id_wishlist integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    CONSTRAINT wishlist_pkey PRIMARY KEY (id_wishlist),
    public boolean
);


--Création de la table lien_wishlist
CREATE TABLE IF NOT EXISTS public.lien_wishlist
(
    id_wishlist integer,
    id_boite integer,
    CONSTRAINT lien_wishlist_id_boite_fkey FOREIGN KEY (id_boite)
        REFERENCES public.boite (id_boite) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT lien_wishlist_id_wishlist_fkey FOREIGN KEY (id_wishlist)
        REFERENCES public.wishlist (id_wishlist) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


--Création de la table collection
CREATE TABLE IF NOT EXISTS public.collection
(
    id_collec integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    CONSTRAINT collection_pkey PRIMARY KEY (id_collec),
    public boolean
);


--Création de la table lien_collection
CREATE TABLE IF NOT EXISTS public.lien_collection
(
    id_collec integer,
    id_boite integer,
    CONSTRAINT lien_collection_id_boite_fkey FOREIGN KEY (id_boite)
        REFERENCES public.boite (id_boite) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT lien_collection_id_collec_fkey FOREIGN KEY (id_collec)
        REFERENCES public.collection (id_collec) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


--Création de la table utilisateur
CREATE TABLE IF NOT EXISTS public.utilisateur
(
    id_uti integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    pseudo_uti character varying COLLATE pg_catalog."default",
    adresse_mail_uti character varying COLLATE pg_catalog."default",
    mot_de_passe_uti character varying COLLATE pg_catalog."default",
    admin_uti boolean,
    active_uti boolean,
    id_wishlist integer,
    id_collec integer,
    CONSTRAINT utilisateur_pkey PRIMARY KEY (id_uti),
    CONSTRAINT utilisateur_id_collec_fkey FOREIGN KEY (id_collec)
        REFERENCES public.collection (id_collec),
    CONSTRAINT utilisateur_id_wishlist_fkey FOREIGN KEY (id_wishlist)
        REFERENCES public.wishlist (id_wishlist)
);


--Création de la table suggestion
CREATE TABLE IF NOT EXISTS public.suggestion
(
    id_suggestion integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    nom_boite_sugg character varying COLLATE pg_catalog."default",
    numero_boite_sugg integer,
    univers_sugg character varying,
    nbr_piece_sugg integer,
    description_sugg character varying COLLATE pg_catalog."default",
    annee_sortie_sugg integer,
    id_uti integer,
    CONSTRAINT suggestion_pkey PRIMARY KEY (id_suggestion),
    CONSTRAINT suggestion_id_uti_fkey FOREIGN KEY (id_uti)
        REFERENCES public.utilisateur (id_uti) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


--Création de la table image_suggestion
CREATE TABLE IF NOT EXISTS public.image_suggestion
(
    id_image_sugg integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    lien_img_sugg character varying COLLATE pg_catalog."default",
    id_suggestion integer,
    CONSTRAINT image_suggestion_pkey PRIMARY KEY (id_image_sugg),
    CONSTRAINT image_suggestion_id_suggestion_fkey FOREIGN KEY (id_suggestion)
        REFERENCES public.suggestion (id_suggestion) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


--Création de la table photo_profil
CREATE TABLE IF NOT EXISTS public.photo_profil
(
    id_img_pro integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    lien_img_pro character varying COLLATE pg_catalog."default",
    id_uti integer,
    CONSTRAINT photo_profil_pkey PRIMARY KEY (id_img_pro),
    CONSTRAINT photo_profil_id_uti_fkey FOREIGN KEY (id_uti)
        REFERENCES public.utilisateur (id_uti) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


--Insertion de quelques données dans les tables boite, photo_boite, utilisateur, photo_profil

INSERT INTO boite(nom_boite, nbr_pieceboi, descriptif_boi, annee_sortie_boi, numero_boi, univers) VALUES ('Le calendrier de l''Avent 2023 LEGO® Harry Potter', 227, 'Avec Le calendrier de l''Avent LEGO® Harry Potter™ 2023 (76418), l''attente de Noël est encore plus envoûtante. Idée de cadeau magique avant Noël pour les enfants dès 7 ans, le calendrier cache une surprise à construire derrière chaque fenêtre (accompagnée d''instructions de montage illustrées simples).', 2023, 76418, 'Harry Potter');
INSERT INTO photo_boite(lien_img_boi, id_boite) VALUES ('https://www.lego.com/cdn/cs/set/assets/blt5bee6dfe45656c70/76418.png?format=webply&fit=bounds&quality=75&width=800&height=800&dpr=1', (SELECT id_boite FROM boite WHERE numero_boi = 76418));

INSERT INTO boite(nom_boite, nbr_pieceboi, descriptif_boi, annee_sortie_boi, numero_boi, univers) VALUES ('LEGO® Minifigures Marvel Série 2', 10, 'Les fans de Marvel et les enfants de 5 ans et plus peuvent recréer des scènes d''action avec cette sélection incroyable de boîtes surprise LEGO® Minifigures Marvel Série 2 (71039). La suite tant attendue de la Série 1 à succès inclut des personnages célèbres des séries Marvel Studios les plus regardées sur Disney+, qui peuvent être collectionnés, exposés ou utilisés pour jouer.', 2023, 71039, 'Marvel');
INSERT INTO photo_boite(lien_img_boi, id_boite) VALUES ('https://www.lego.com/cdn/cs/set/assets/blt265211080af206e1/71039_alt1.png?format=webply&fit=bounds&quality=70&width=800&height=800&dpr=1.5', (SELECT id_boite FROM boite WHERE numero_boi = 71039));

INSERT INTO boite(nom_boite, nbr_pieceboi, descriptif_boi, annee_sortie_boi, numero_boi, univers) VALUES ('Ghost et Phantom II', 227, 'Les fans peuvent rejouer des scènes mémorables de Star Wars : Ahsoka avec les vaisseaux Ghost et Phantom II LEGO® (75357). La réplique du Ghost à construire inclut 2 fusils à ressort actionnés par un levier, un cockpit pour 2 minifigurines LEGO avec section amovible, et une cabine comprenant 2 trappes, une tourelle détachable dotée d''un canon (qui ne tire pas) et de la place pour une minifigurine LEGO. La navette Phantom II présente un cockpit ouvrant et un compartiment de rangement. Le set inclut également 5 personnages Star Wars™, dont une minifigurine de la générale Hera Syndulla et un droïde Chopper (C1-10P).', 2023, 75357, 'Star Wars');
INSERT INTO photo_boite(lien_img_boi, id_boite) VALUES ('https://www.lego.com/cdn/cs/set/assets/bltd1ab1e6e34719af9/75357_alt1.png?format=webply&fit=bounds&quality=75&width=800&height=800&dpr=1', (SELECT id_boite FROM boite WHERE numero_boi = 75357));

INSERT INTO boite(nom_boite, nbr_pieceboi, descriptif_boi, annee_sortie_boi, numero_boi, univers) VALUES ('La banque des sorciers Gringotts™ - Edition Collector', 4801, 'Plongez dans le Monde des Sorciers en construisant la banque des sorciers Gringotts - Edition Collector LEGO® Harry Potter™ (76417). Recrééez le foyer opulent et la mezzanine de la banque avec un coffre-fort au mur qui contient la lettre secrète d''Hagrid. Construisez des rails en colimaçon avec un mécanisme qui arrête le wagon à chacun des 3 coffres souterrains, dont celui de Bellatrix qui recelèle une surprise magique ! Le set inclut également un dragon Pansedefer ukrainien et la boutique La Ménagerie magique à construire.', 2023, 76417, 'Harry Potter');
INSERT INTO photo_boite(lien_img_boi, id_boite) VALUES ('https://www.lego.com/cdn/cs/set/assets/blt3db77dbc731f5eeb/76417_alt1.png?format=webply&fit=bounds&quality=75&width=800&height=800&dpr=1', (SELECT id_boite FROM boite WHERE numero_boi = 76417));

INSERT INTO boite(nom_boite, nbr_pieceboi, descriptif_boi, annee_sortie_boi, numero_boi, univers) VALUES ('Optimus Prime', 1508, 'Optimus Prime. Commandant des héroïques Autobots. Et désormais un impressionnant modèle LEGO® 2-en-1 pour les fans de Transformers. Réveillez votre passion pour cet univers avec un projet de construction gratifiant conçu pour les adultes, et recréez le moindre détail de ce robot culte.', 2022, 10302, 'Transformers');
INSERT INTO photo_boite(lien_img_boi, id_boite) VALUES ('https://www.lego.com/cdn/cs/set/assets/bltd20fea4f0d6663c4/10302_alt1.png?format=webply&fit=bounds&quality=75&width=800&height=800&dpr=1', (SELECT id_boite FROM boite WHERE numero_boi = 10302));

INSERT INTO boite(nom_boite, nbr_pieceboi, descriptif_boi, annee_sortie_boi, numero_boi, univers) VALUES ('La grande rue décorée pour les fêtes', 1514, 'La joie des fêtes inonde le set LEGO® La grande rue décorée pour les fêtes (10308), dernier ajout à la célèbre collection LEGO Villages d''hiver. Construisez un adorable village de Noël comprenant un magasin de jouets, un magasin de musique, des clients et des commerçants aux appartements confortables. Puis assemblez le tramway qui ramène les clients chez eux.', 2022, 10308, 'Icons');
INSERT INTO photo_boite(lien_img_boi, id_boite) VALUES ('https://www.lego.com/cdn/cs/set/assets/blt8b024f8e41a76335/10308_alt1.png?format=webply&fit=bounds&quality=75&width=800&height=800&dpr=1', (SELECT id_boite FROM boite WHERE numero_boi = 10308));

INSERT INTO boite(nom_boite, nbr_pieceboi, descriptif_boi, annee_sortie_boi, numero_boi, univers) VALUES ('James Bond Aston Martin DB5', 1295, 'Ce superbe ensemble LEGO® Creator Expert James Bond™ Aston Martin DB5 est très détaillé. Cet impressionnant modèle réduit fait ressortir l''élégance et le raffinement de l''emblématique voiture de sport de 1964 de l''Agent 007. Il déborde de détails authentiques et de gadgets fonctionnels. Les portes permettent de découvrir un intérieur élaboré avec un radar dissimulé et un compartiment de portière contenant un téléphone. Au moment de passer à l''action, le siège éjectable du passager peut être activé, les plaques d''immatriculation peuvent pivoter et l''écran pare-balle arrière se soulève. Les tailladeurs de pneus montés sur les roues peuvent être déployés et le levier de vitesse permet de révéler les mitraillettes dans les ailes avant de la voiture. Ce modèle réduit de collection comprend également un moteur 6 cylindres en ligne, des pare-chocs avant et arrière laqués, des enjoliveurs argentés et des logos Aston Martin à l''avant et à l''arrière de la voiture. Le modèle a été conçu pour fournir une expérience de construction stimulante, gratifiante et pleine de nostalgie. Cet ensemble constitue un incontournable pour les fans de l''Aston Martin DB5, des films James Bond et des ensembles de construction LEGO.', 2018, 10262, 'James Bond');
INSERT INTO photo_boite(lien_img_boi, id_boite) VALUES ('https://www.lego.com/cdn/cs/set/assets/blte3f8da3a2b86e38a/10262_alt1.jpg?format=webply&fit=bounds&quality=75&width=800&height=800&dpr=1', (SELECT id_boite FROM boite WHERE numero_boi = 10262));

INSERT INTO boite(nom_boite, nbr_pieceboi, descriptif_boi, annee_sortie_boi, numero_boi, univers) VALUES ('L''attaque du camion des Avengers', 477, 'Le camion LEGO® Avengers de Captain America et Hawkeye est pris en embuscade par 2 types avec une moto à trois roues. Il faut sortir l''arme secrète du camion : une arbalète à 6 coups ! Les enfants vont adorer ce set sur les super-héros comprenant 4 figurines LEGO et le camion des Avengers. Les figurines passent à l''action – cadeau idéal pour enfants Ce set place l''action Marvel entre les mains des jeunes super-héros. Deux sales types font une embardée devant le camion des Avengers, puis lancent une attaque avec un drone. Les enfants vont adorer dévoiler l''arme secrète... une arbalète à 6 coups ! Avec 4 figurines (janvier 2020), un camion Avengers, une moto à trois roues, un drone et des armes, ce jouet LEGO Marvel Avengers est source d''inspiration infinie. Jouets LEGO populaires Avec des véhicules impressionnants, des robots, des bâtiments, des figurines, des armes et des gadgets, les sets LEGO Marvel Avengers sont parfaits pour les fans des films de la saga.', 2018, 76143, 'Marvel');
INSERT INTO photo_boite(lien_img_boi, id_boite) VALUES ('https://www.lego.com/cdn/cs/set/assets/bltf58e2c5b7fa4c650/76143_alt1.jpg?format=webply&fit=bounds&quality=75&width=800&height=800&dpr=1', (SELECT id_boite FROM boite WHERE numero_boi = 76143));

INSERT INTO boite(nom_boite, nbr_pieceboi, descriptif_boi, annee_sortie_boi, numero_boi, univers) VALUES ('Groot Venomisé', 630, 'Lorsque l''adorable bébé Groot et l''effroyable alien Venom se combinent, le résultat est la figurine de Groot Venomisé LEGO® Marvel (76249). Articulée et transformable, elle place l''action des films Marvel entre les mains des fans de 10 ans et plus.', 2023, 76249, 'Marvel');
INSERT INTO photo_boite(lien_img_boi, id_boite) VALUES ('https://www.lego.com/cdn/cs/set/assets/blt6c9c590f0543156c/76249_alt1.png?format=webply&fit=bounds&quality=75&width=800&height=800&dpr=1', (SELECT id_boite FROM boite WHERE numero_boi = 76249));

INSERT INTO boite(nom_boite, nbr_pieceboi, descriptif_boi, annee_sortie_boi, numero_boi, univers) VALUES ('La carte du monde', 11695, 'Vous rêvez de créer votre propre carte ? C''est possible grâce à La carte du monde LEGO® Art (31203). Ce set LEGO, le plus grand jamais créé, permet de fabriquer l''une des 3 cartes disponibles.', 2021, 31203, 'Art');
INSERT INTO photo_boite(lien_img_boi, id_boite) VALUES ('https://www.lego.com/cdn/cs/set/assets/blt6a3a5434db6e4238/31203_alt1.jpg?format=webply&fit=bounds&quality=75&width=800&height=800&dpr=1', (SELECT id_boite FROM boite WHERE numero_boi = 31203));

INSERT INTO boite(nom_boite, nbr_pieceboi, descriptif_boi, annee_sortie_boi, numero_boi, univers) VALUES ('Le calendrier de l''Avent 2023 LEGO® Friends', 231, 'Offrez aux fans de LEGO® Friends dès 6 ans un cadeau de fêtes amusant avec Le calendrier de l''Avent LEGO Friends 2023 (41758). Chaque fenêtre s''ouvre et révèle une mini-poupée, une micro-poupée ou une construction miniature pour que l''attente de Noël soit encore plus belle.', 2023, 41758, 'Friends');
INSERT INTO photo_boite(lien_img_boi, id_boite) VALUES ('https://www.lego.com/cdn/cs/set/assets/bltdacf915527c3c3b8/41758.png?format=webply&fit=bounds&quality=75&width=800&height=800&dpr=1', (SELECT id_boite FROM boite WHERE numero_boi = 41758));

INSERT INTO boite(nom_boite, nbr_pieceboi, descriptif_boi, annee_sortie_boi, numero_boi, univers) VALUES ('Le village viking', 2103, 'Remontez le temps en construisant Le village viking LEGO® Ideas (21343) pour jouer et décorer une pièce. Ce set à offrir à un passionné d''histoire présente 3 sections qui se connectent, avec une forge, la longère du chef du village et une tour de guet, ainsi que les minifigurines d''une forgeronne, d''un chef, d''une guerrière et d''un archer.', 2023, 21343, 'Ideas');
INSERT INTO photo_boite(lien_img_boi, id_boite) VALUES ('https://www.lego.com/cdn/cs/set/assets/blt0f02b0cd97117394/21343_alt1.png?format=webply&fit=bounds&quality=75&width=800&height=800&dpr=1', (SELECT id_boite FROM boite WHERE numero_boi = 21343));

INSERT INTO boite(nom_boite, nbr_pieceboi, descriptif_boi, annee_sortie_boi, numero_boi, univers) VALUES ('ECTO-1 SOS Fantômes', 2352, 'Les fans de SOS Fantômes vont être comblés avec ce set LEGO® ECTO-1 SOS Fantômes ! Pour se débarrasser du stress de la vie quotidienne et s''accorder un moment de qualité, rien de tel que de construire une version LEGO de la Cadillac Miller-Meteor de 1959 transformée en ambulance, qui apparaît dans les films SOS Fantômes.', 2020, 10274, 'Icons');
INSERT INTO photo_boite(lien_img_boi, id_boite) VALUES ('https://www.lego.com/cdn/cs/set/assets/bltddd921d0d35a824b/10274_alt1.jpg?format=webply&fit=bounds&quality=75&width=800&height=800&dpr=1', (SELECT id_boite FROM boite WHERE numero_boi = 10274));

INSERT INTO collection(public) VALUES (true);
INSERT INTO wishlist(public) VALUES (true);
INSERT INTO utilisateur(pseudo_uti, adresse_mail_uti, mot_de_passe_uti, admin_uti, active_uti, id_wishlist, id_collec) VALUES ('Jean', 'jean@gmail.com', 'abc', false, true, 1,1);

INSERT INTO collection(public) VALUES (true);
INSERT INTO wishlist(public) VALUES (true);
INSERT INTO utilisateur(pseudo_uti, adresse_mail_uti, mot_de_passe_uti, admin_uti, active_uti, id_wishlist, id_collec) VALUES ('Tom', 'tom@gmail.com', 'sqdfsdf', false, true, 2,2);

INSERT INTO collection(public) VALUES (false);
INSERT INTO wishlist(public) VALUES (true);
INSERT INTO utilisateur(pseudo_uti, adresse_mail_uti, mot_de_passe_uti, admin_uti, active_uti, id_wishlist, id_collec) VALUES ('Pierre', 'pierre@gmail.com', 'qdfksh', false, true, 3,3);

INSERT INTO collection(public) VALUES (true);
INSERT INTO wishlist(public) VALUES (false);
INSERT INTO utilisateur(pseudo_uti, adresse_mail_uti, mot_de_passe_uti, admin_uti, active_uti, id_wishlist, id_collec) VALUES ('Thibaut', 'Thibaut@gmail.com', 'agfuidsc', false, true, 4,4);

INSERT INTO collection(public) VALUES (false);
INSERT INTO wishlist(public) VALUES (false);
INSERT INTO utilisateur(pseudo_uti, adresse_mail_uti, mot_de_passe_uti, admin_uti, active_uti, id_wishlist, id_collec) VALUES ('Marie', 'Marie2@gmail.com', 'adfqsfsqdc', false, true, 5,5);

INSERT INTO collection(public) VALUES (false);
INSERT INTO wishlist(public) VALUES (true);
INSERT INTO utilisateur(pseudo_uti, adresse_mail_uti, mot_de_passe_uti, admin_uti, active_uti, id_wishlist, id_collec) VALUES ('Samira', 'samira@gmail.com', 'qsdfqsc', false, true, 6,6);

INSERT INTO collection(public) VALUES (true);
INSERT INTO wishlist(public) VALUES (false);
INSERT INTO utilisateur(pseudo_uti, adresse_mail_uti, mot_de_passe_uti, admin_uti, active_uti, id_wishlist, id_collec) VALUES ('Jeanne', 'jeanne55@gmail.com', 'qlsfhsdffd', false, true, 7,7);

INSERT INTO collection(public) VALUES (true);
INSERT INTO wishlist(public) VALUES (true);
INSERT INTO utilisateur(pseudo_uti, adresse_mail_uti, mot_de_passe_uti, admin_uti, active_uti, id_wishlist, id_collec) VALUES ('Thomas', 'thomas@gmail.com', 'abcqdfsqds', false, true, 8,8);

INSERT INTO collection(public) VALUES (true);
INSERT INTO wishlist(public) VALUES (true);
INSERT INTO utilisateur(pseudo_uti, adresse_mail_uti, mot_de_passe_uti, admin_uti, active_uti, id_wishlist, id_collec) VALUES ('Abdel', 'AbdelJ@gmail.com', 'abcdqdsqsd', false, true, 9,9);

INSERT INTO collection(public) VALUES (true);
INSERT INTO wishlist(public) VALUES (true);
INSERT INTO utilisateur(pseudo_uti, adresse_mail_uti, mot_de_passe_uti, admin_uti, active_uti, id_wishlist, id_collec) VALUES ('Noe', 'Nono@gmail.com', 'aqsdfsqbc', false, true, 10,10);

INSERT INTO collection(public) VALUES (true);
INSERT INTO wishlist(public) VALUES (true);
INSERT INTO utilisateur(pseudo_uti, adresse_mail_uti, mot_de_passe_uti, admin_uti, active_uti, id_wishlist, id_collec) VALUES ('Paul', 'paul@gmail.com', 'qfsdabc', false, true, 11,11);

INSERT INTO photo_profil (lien_img_pro, id_uti) VALUES ('https://media.istockphoto.com/id/1300845620/fr/vectoriel/appartement-dic%C3%B4ne-dutilisateur-isol%C3%A9-sur-le-fond-blanc-symbole-utilisateur.jpg?s=612x612&w=0&k=20&c=BVOfS7mmvy2lnfBPghkN__k8OMsg7Nlykpgjn0YOHj0=', 1);
INSERT INTO photo_profil (lien_img_pro, id_uti) VALUES ('https://media.istockphoto.com/id/1300845620/fr/vectoriel/appartement-dic%C3%B4ne-dutilisateur-isol%C3%A9-sur-le-fond-blanc-symbole-utilisateur.jpg?s=612x612&w=0&k=20&c=BVOfS7mmvy2lnfBPghkN__k8OMsg7Nlykpgjn0YOHj0=', 2);
INSERT INTO photo_profil (lien_img_pro, id_uti) VALUES ('https://media.istockphoto.com/id/1300845620/fr/vectoriel/appartement-dic%C3%B4ne-dutilisateur-isol%C3%A9-sur-le-fond-blanc-symbole-utilisateur.jpg?s=612x612&w=0&k=20&c=BVOfS7mmvy2lnfBPghkN__k8OMsg7Nlykpgjn0YOHj0=', 3);
INSERT INTO photo_profil (lien_img_pro, id_uti) VALUES ('https://media.istockphoto.com/id/1300845620/fr/vectoriel/appartement-dic%C3%B4ne-dutilisateur-isol%C3%A9-sur-le-fond-blanc-symbole-utilisateur.jpg?s=612x612&w=0&k=20&c=BVOfS7mmvy2lnfBPghkN__k8OMsg7Nlykpgjn0YOHj0=', 4);
INSERT INTO photo_profil (lien_img_pro, id_uti) VALUES ('https://media.istockphoto.com/id/1300845620/fr/vectoriel/appartement-dic%C3%B4ne-dutilisateur-isol%C3%A9-sur-le-fond-blanc-symbole-utilisateur.jpg?s=612x612&w=0&k=20&c=BVOfS7mmvy2lnfBPghkN__k8OMsg7Nlykpgjn0YOHj0=', 5);
INSERT INTO photo_profil (lien_img_pro, id_uti) VALUES ('https://media.istockphoto.com/id/1300845620/fr/vectoriel/appartement-dic%C3%B4ne-dutilisateur-isol%C3%A9-sur-le-fond-blanc-symbole-utilisateur.jpg?s=612x612&w=0&k=20&c=BVOfS7mmvy2lnfBPghkN__k8OMsg7Nlykpgjn0YOHj0=', 6);
INSERT INTO photo_profil (lien_img_pro, id_uti) VALUES ('https://media.istockphoto.com/id/1300845620/fr/vectoriel/appartement-dic%C3%B4ne-dutilisateur-isol%C3%A9-sur-le-fond-blanc-symbole-utilisateur.jpg?s=612x612&w=0&k=20&c=BVOfS7mmvy2lnfBPghkN__k8OMsg7Nlykpgjn0YOHj0=', 7);
INSERT INTO photo_profil (lien_img_pro, id_uti) VALUES ('https://media.istockphoto.com/id/1300845620/fr/vectoriel/appartement-dic%C3%B4ne-dutilisateur-isol%C3%A9-sur-le-fond-blanc-symbole-utilisateur.jpg?s=612x612&w=0&k=20&c=BVOfS7mmvy2lnfBPghkN__k8OMsg7Nlykpgjn0YOHj0=', 8);
INSERT INTO photo_profil (lien_img_pro, id_uti) VALUES ('https://media.istockphoto.com/id/1300845620/fr/vectoriel/appartement-dic%C3%B4ne-dutilisateur-isol%C3%A9-sur-le-fond-blanc-symbole-utilisateur.jpg?s=612x612&w=0&k=20&c=BVOfS7mmvy2lnfBPghkN__k8OMsg7Nlykpgjn0YOHj0=', 9);
INSERT INTO photo_profil (lien_img_pro, id_uti) VALUES ('https://media.istockphoto.com/id/1300845620/fr/vectoriel/appartement-dic%C3%B4ne-dutilisateur-isol%C3%A9-sur-le-fond-blanc-symbole-utilisateur.jpg?s=612x612&w=0&k=20&c=BVOfS7mmvy2lnfBPghkN__k8OMsg7Nlykpgjn0YOHj0=', 10);
INSERT INTO photo_profil (lien_img_pro, id_uti) VALUES ('https://media.istockphoto.com/id/1300845620/fr/vectoriel/appartement-dic%C3%B4ne-dutilisateur-isol%C3%A9-sur-le-fond-blanc-symbole-utilisateur.jpg?s=612x612&w=0&k=20&c=BVOfS7mmvy2lnfBPghkN__k8OMsg7Nlykpgjn0YOHj0=', 11);
