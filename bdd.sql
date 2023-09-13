-- Fichier créé à partir de PostgreSQL, attention aux potentielles erreurs en cas de portage
-- Faire attention à l'ordre des créations des tables pour les clés étrangères


--Création de la BDD
CREATE DATABASE "Collego"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'French_France.1252'
    LC_CTYPE = 'French_France.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;


--Création de la table boite
CREATE TABLE IF NOT EXISTS public.boite
(
    id_boite integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    nom_boite character varying COLLATE pg_catalog."default",
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
    CONSTRAINT wishlist_pkey PRIMARY KEY (id_wishlist)
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
    CONSTRAINT collection_pkey PRIMARY KEY (id_collec)
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
        REFERENCES public.collection (id_collec) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT utilisateur_id_wishlist_fkey FOREIGN KEY (id_wishlist)
        REFERENCES public.wishlist (id_wishlist) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


--Création de la table suggestion
CREATE TABLE IF NOT EXISTS public.suggestion
(
    id_suggestion integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    nom_boite_sugg character varying COLLATE pg_catalog."default",
    numero_boite_sugg integer,
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