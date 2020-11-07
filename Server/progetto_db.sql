--
-- Create schema 
--

SELECT ultimo_invio_dati 
FROM proprietario 
WHERE email_prop = "luigi@gmail.it"; 

CREATE DATABASE IF NOT EXISTS progetto;
USE progetto;

ALTER USER 'user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'user';

FLUSH PRIVILEGES;

--
-- Definition of table proprietario
--
CREATE TABLE proprietario 
(
  email_prop varchar(45) NOT NULL,
  password_prop varchar(600) NOT NULL,
  nome_prop varchar(45) NOT NULL,
  cognome_prop varchar(45) NOT NULL,
  data_nascita_prop date NOT NULL,
  num_documento char(20) NOT NULL,
  telefono_prop varchar(15) NOT NULL,
  ultimo_invio_dati date,
  PRIMARY KEY (email_prop)
);
-- tutte le password sono nel formato --> Nome_pass1
-- Esempio: Se nome = Alessio, allora password = Alessio_pass1

--
-- Definition of table proprieta
--

CREATE TABLE proprieta
(
	id_proprieta int NOT NULL AUTO_INCREMENT,
    nome_proprieta varchar(45) NOT NULL,
    indirizzo varchar(45) NOT NULL,
    localita varchar(45) NOT NULL,
    provincia varchar(45) NOT NULL,
    tipo_proprieta varchar(45) NOT NULL, -- cv oppure bb per casa vacanza e b&b
    servizi varchar(200) NOT NULL,
    ref_proprietario char(45) NOT NULL,
    descrizione varchar(400) NOT NULL,
    PRIMARY KEY (id_proprieta),
    FOREIGN KEY (ref_proprietario) REFERENCES proprietario (email_prop)
);

ALTER TABLE proprieta AUTO_INCREMENT = 100;

--
-- Definition of table casa_vacanza
--

CREATE TABLE casa_vacanza
(
	ref_proprieta_cv int NOT NULL,
    posti_letto int(10) NOT NULL,
    tariffa_casa int(10) NOT NULL,
    imgCV_path1 varchar(400),
    imgCV_path2 varchar(400),
    imgCV_path3 varchar(400),
    imgCV_path4 varchar(400),
    PRIMARY KEY (ref_proprieta_cv),
    FOREIGN KEY (ref_proprieta_cv) REFERENCES proprieta (id_proprieta)
);
-- Memorizzo i path delle immagini di ciascuna struttura, per poi poterle caricare nel front end
-- Il nome di ciascuna immagine è del tipo 'ref_proprieta_cv_1.jpg', 'ref_proprieta_cv_2.jpg'...
-- Esempio: se ref_proprieta_cv = 100, allora imgCV_path1 = './Images/100_1.jpg', imgCV_path2 = './Images/100_2.jpg'...

--
-- Definition of table b&b
--

CREATE TABLE b_and_b
(
	ref_proprieta_bb int NOT NULL,
    check_in numeric(4, 2) NOT NULL,
    check_out numeric(4, 2) NOT NULL,
    PRIMARY KEY (ref_proprieta_bb),
    FOREIGN KEY (ref_proprieta_bb) REFERENCES proprieta(id_proprieta)
);

--
-- Definition of table stanza
--

CREATE TABLE stanza
(
	id_stanza int NOT NULL AUTO_INCREMENT,
	ref_bb int NOT NULL,
    tipologia int(10) NOT NULL, -- valore numerico per indicare se la stanza è singola (1), doppia (2), tripla (3) ecc
    tariffa_stanza int(10) NOT NULL,
    imgST_path1 varchar(400),
    imgST_path2 varchar(400),
    imgST_path3 varchar(400),
    imgST_path4 varchar(400),
    PRIMARY KEY (id_stanza),
    FOREIGN KEY (ref_bb) REFERENCES b_and_b (ref_proprieta_bb)
);
-- Memorizzo i path delle immagini di ciascuna stanza, per poi poterle caricare nel front end
-- Il nome di ciascuna immagine è del tipo 'id_stanza_ref_bb_1.jpg', 'id_stanza_ref_bb_2.jpg'...
-- Esempio: se id_stanza = 300 e ref_bb = 101, allora imgST_path1 = './Images/300_101_1.jpg', imgST_path2 = './Images/300_101_2.jpg'...

ALTER TABLE stanza AUTO_INCREMENT = 300; 

--
-- Definition of table cliente
--

CREATE TABLE cliente
(
	email_cl varchar(45) NOT NULL,
    password_cl varchar(600) NOT NULL,
    nome_cl varchar(45) NOT NULL,
    cognome_cl varchar(45) NOT NULL,
    data_nascita_cl date NOT NULL,
    telefono_cl varchar(15) NOT NULL,
    PRIMARY KEY (email_cl)
);
-- tutte le password sono nel formato --> Cognome_pass1
-- Esempio: Se cognome = Fellini, allora password = Fellini_pass1

--
-- Definition of table soggiornante
--

CREATE TABLE soggiornante
(
	cf_sogg char(16) NOT NULL,
    nome_sogg varchar(45) NOT NULL,
    cognome_sogg varchar(45) NOT NULL,
    data_nascita_sogg date NOT NULL,
    PRIMARY KEY (cf_sogg)
);

--
-- Definition of table prenotazione
--

CREATE TABLE prenotazione
(
	id_prenotazione int NOT NULL AUTO_INCREMENT,
    ref_soggiornante char(16) NOT NULL,
    ref_cliente char(45) NOT NULL,
    ref_proprietario char(45) NOT NULL,
    ref_proprieta int NOT NULL,
    num_soggiornanti int(10) NOT NULL,
    costo float(10) NOT NULL,
    caparra float(10),
    data_partenza date NOT NULL,
    data_ritorno date NOT NULL,
    accettata boolean NOT NULL,
    PRIMARY KEY (id_prenotazione, ref_soggiornante),
    FOREIGN KEY (ref_cliente) REFERENCES cliente (email_cl),
    FOREIGN KEY (ref_proprietario) REFERENCES proprietario (email_prop),
    FOREIGN KEY (ref_proprieta) REFERENCES proprieta (id_proprieta),
    FOREIGN KEY (ref_soggiornante) REFERENCES soggiornante (cf_sogg)
);

ALTER TABLE prenotazione AUTO_INCREMENT = 500; 

--
-- Definition of table tassa di soggiorno
--

CREATE TABLE tassa_soggiorno
(
	id_tassa int NOT NULL AUTO_INCREMENT,
    ref_soggiornante char(16) NOT NULL,
    ref_prenotazione int NOT NULL,
    ref_proprietario char(45) NOT NULL,
    ammontare float(10) NOT NULL,
    PRIMARY KEY (id_tassa),
    FOREIGN KEY (ref_soggiornante) REFERENCES soggiornante (cf_sogg),
    FOREIGN KEY (ref_prenotazione) REFERENCES prenotazione (id_prenotazione),
    FOREIGN KEY (ref_proprietario) REFERENCES proprietario (email_prop)
);

ALTER TABLE tassa_soggiorno AUTO_INCREMENT = 700; 

--
-- populating the DB
--
USE progetto;
INSERT INTO proprietario VALUES
-- (EMAIL_PROP, password_prop, nome_prop, cognome_prop, data_nascita_prop, num_documento, telefono_prop, ultimo_invio_dati)
-- tutte le password sono nel formato --> Nome_pass1
-- Esempio: Se nome = Alessio, allora password = Alessio_pass1
('alessio@gmail.it', '80f8f6bb0d272add18b66f2330750b9e2f1029f46e95264d5c12e461fd19bd59e59cca513985ee6e05b2fa9d9fde3e6a547ba408488bb2ecc67e5988b8e6856d', 'Alessio', 'De Gregorio', '1998-08-04', 'ABC123EF', '3461234567', NULL),
('mario@gmail.it', '46c10deefef5e8f4a6b7b86fd4bc69e6d5302a35ba5314edcf26bd8b5c3034ff415f97308d4003b2adc8d6d7f46c7107345423ebcb76ff2b406ad2f239a4415c', 'Mario', 'Rossi', '1990-06-06', 'QER309VF', '3331234567', NULL),
('luigi@gmail.it', '9b02203d4c29a8d7d850e96602ff1a1f37afcd806415038cfafd1738b4166763a05bc560f4ede09a263a696c807b8c28e55f1fada6ad3a4cd5f25063c0355f1f', 'Luigi', 'Bianchi', '1952-02-02', 'ASD481RJ', '3666666666', NULL),
('matteo@gmail.it', '7921b80aed776e739d106eb29ee2469204cf1b92f05a94fcc95e42f82c2d40d5cbafb2b434be042d5551a80eb2989b515f98ca555804c41e4f92b2f4d948e6df', 'Matteo', 'Neri', '1982-07-07', 'ZXC910BN', '3431234567', NULL);

UPDATE proprietario
SET ultimo_invio_dati = '2020-10-10'
WHERE email_prop = 'alessio@gmail.it';

UPDATE proprietario
SET ultimo_invio_dati = '2020-09-17'
WHERE email_prop = 'mario@gmail.it';

UPDATE proprietario
SET ultimo_invio_dati = '2020-11-01'
WHERE email_prop = 'luigi@gmail.it';

UPDATE proprietario
SET ultimo_invio_dati = '2020-09-19'
WHERE email_prop = 'matteo@gmail.it';

INSERT INTO proprieta (nome_proprieta, indirizzo, localita, provincia, tipo_proprieta, servizi, ref_proprietario, descrizione) VALUES
-- (ID_PROPRIETA, nome_proprieta, indirizzo, localita, provincia, tipo_proprieta, servizi, ref_proprietario, descrizione)
('Casa Sofia', 'Via Roma, 32', 'Torino', 'TO', 'cv', 'Parcheggio gratuito, Wi-Fi','alessio@gmail.it', 'Situato nel centro di Torino, a soli 550 metri dal famoso Museo del Cinema e a 10 minuti a piedi minuti a piedi da Piazza Castello, si offrono sistemazioni con WiFi gratuito e ampio parcheggio.'), -- ID 100
('Villa Marcello', 'Via Garibaldi, 72', 'Roma', 'RM', 'bb', 'Wi-Fi, Aria condizionata', 'mario@gmail.it', 'Posta nel centro storico di Roma, a 100 metri da Piazza Navona, la residenza offre connessione WiFi gratuita e camere recentemente ristrutturate con aria condizionata.'), -- ID 101
('Casa Rossi', 'Corso Calatafimi, 13', 'Palermo', 'PA', 'cv', 'Parcheggio gratuito', 'luigi@gmail.it', 'Situato a meno di 1 km dalla Cattedrale di Palermo e a 1,7 km dal Palazzo dei Normanni, la residenza offre un ampio parcheggio gratuito e sistemazione dotata di cucina, balcone e area salotto.'), -- ID 102
('Villa Mazzini', 'Via Mazzini, 69', 'Milano', 'MI', 'bb', 'Parcheggio gratuito, Wi-Fi, Aria condizionata', 'matteo@gmail.it', 'Situato a soli 350 metri dalla stazione della metropolitana di Piola, a Milano, la struttura offre camere con connessione Wi-Fi gratuita, aria condizionata e pavimenti in parquet.'), -- ID 103
('Casa Garibaldi', 'Via Garibaldi, 48', 'Torino', 'TO', 'bb', 'Wi-Fi, Aria condizionata', 'alessio@gmail.it', 'Situato a 2 km dalla Mole Antonelliana e a 3,9 km dal Politecnico di Torino, la struttura offre sistemazioni con connessione WiFi gratuita, aria condizionata e TV a schermo piatto.'), -- ID 104
('Villa Gioia', 'Corso dei milla, 20', 'Roma', 'RM', 'cv', 'Parcheggio gratuito, Wi-Fi', 'mario@gmail.it', 'La residenza offre una sistemazione a ristorazione indipendente con connessione WiFi gratuita a 700 metri dal Pantheon e a meno di 2 km dal Colosseo. '), -- ID 105
('Casa Bianchi', 'Via Dante, 20', 'Palermo', 'PA', 'bb', 'Wi-Fi, Aria condizionata', 'luigi@gmail.it', "A 5 minuti a piedi dalla via dello shopping Via Maqueda di Palermo, la struttura offre la connessione WiFi gratuita, una prima colazione all'italiana e camere ultra-moderne con aria condizionata."), -- ID 106
('Villa Giulia', 'Piazza Duomo, 38', 'Milano', 'MI', 'cv', 'Aria condizionata', 'matteo@gmail.it', 'Situato in una posizione esclusiva in Piazza Duomo, a pochi passi dal Duomo stesso, la residenza si trova nel cuore storico di Milano e offre una sistemazione moderna con aria condizionata e terrazza privata.'); -- ID 107

INSERT INTO casa_vacanza VALUES
-- (REF_PROPRIETA_CV, posti_letto, tariffa_casa, imgCV_path1, imgCV_path2, imgCV_path3, imgCV_path4)
-- Memorizzo i path delle immagini di ciascuna struttura, per poi poterle caricare nel front end
-- Il nome di ciascuna immagine è del tipo 'ref_proprieta_cv_1.jpg', 'ref_proprieta_cv_2.jpg'...
-- Esempio: se ref_proprieta_cv = 100, allora imgCV_path1 = './Images/100_1.jpg', imgCV_path2 = './Images/100_2.jpg'...
(100, 2, 100, './Images/100_1.jpg', './Images/100_2.jpg', './Images/100_3.jpg', './Images/100_4.jpg'),
(102, 3, 200, './Images/102_1.jpg', './Images/102_2.jpg', './Images/102_3.jpg', './Images/102_4.jpg'),
(105, 1, 80, './Images/105_1.jpg', './Images/105_2.jpg', './Images/105_3.jpg', './Images/105_4.jpg'),
(107, 5, 400, './Images/107_1.jpg', './Images/107_2.jpg', './Images/107_3.jpg', './Images/107_4.jpg');

INSERT INTO b_and_b VALUES
-- (REF_PROPRIETA_BB, check_in, check_out)
(101, 15.30, 9.30),
(103, 14.30, 10.30),
(104, 13.30, 8.30),
(106, 14.30, 9.30);

INSERT INTO stanza (ref_bb, tipologia, tariffa_stanza) VALUES
-- (ID_STANZA, ref_bb, tipologia, tariffa_stanza, imgST_path1, imgST_path2, imgST_path3, imgST_path4)
(101, 1, 50), -- ID 300
(101, 2, 90), -- ID 301
(103, 3, 140), -- ID 302
(103, 2, 100), -- ID 303
(104, 1, 80), -- ID 304
(104, 3, 120), -- ID 305
(106, 2, 80), -- ID 306
(106, 1, 90); -- ID 307
-- Memorizzo i path delle immagini di ciascuna stanza, per poi poterle caricare nel front end
-- Il nome di ciascuna immagine è del tipo 'id_stanza_ref_bb_1.jpg', 'id_stanza_ref_bb_2.jpg'...
-- Esempio: se id_stanza = 300 e ref_bb = 101, allora imgST_path1 = './Images/300_101_1.jpg', imgST_path2 = './Images/300_101_2.jpg'...
-- Carico i path con un update perché è necessario l'id_stanza, che viene generato solo dopo l'insert in tabella
UPDATE stanza
SET imgST_path1 = './Images/300_101_1.jpg', imgST_path2 = './Images/300_101_2.jpg', imgST_path3 = './Images/300_101_3.jpg',
	imgST_path4 = './Images/300_101_4.jpg'
WHERE id_stanza = 300;

UPDATE stanza
SET imgST_path1 = './Images/301_101_1.jpg', imgST_path2 = './Images/301_101_2.jpg', imgST_path3 = './Images/301_101_3.jpg',
	imgST_path4 = './Images/301_101_4.jpg'
WHERE id_stanza = 301;

UPDATE stanza
SET imgST_path1 = './Images/302_103_1.jpg', imgST_path2 = './Images/302_103_2.jpg', imgST_path3 = './Images/302_103_3.jpg',
	imgST_path4 = './Images/302_103_4.jpg'
WHERE id_stanza = 302;

UPDATE stanza
SET imgST_path1 = './Images/303_103_1.jpg', imgST_path2 = './Images/303_103_2.jpg', imgST_path3 = './Images/303_103_3.jpg',
	imgST_path4 = './Images/303_103_4.jpg'
WHERE id_stanza = 303;

UPDATE stanza
SET imgST_path1 = './Images/304_104_1.jpg', imgST_path2 = './Images/304_104_2.jpg', imgST_path3 = './Images/304_104_3.jpg',
	imgST_path4 = './Images/304_104_4.jpg'
WHERE id_stanza = 304;

UPDATE stanza
SET imgST_path1 = './Images/305_104_1.jpg', imgST_path2 = './Images/305_104_2.jpg', imgST_path3 = './Images/305_104_3.jpg',
	imgST_path4 = './Images/305_104_4.jpg'
WHERE id_stanza = 305;

UPDATE stanza
SET imgST_path1 = './Images/306_106_1.jpg', imgST_path2 = './Images/306_106_2.jpg', imgST_path3 = './Images/306_106_3.jpg',
	imgST_path4 = './Images/306_106_4.jpg'
WHERE id_stanza = 306;

UPDATE stanza
SET imgST_path1 = './Images/307_106_1.jpg', imgST_path2 = './Images/307_106_2.jpg', imgST_path3 = './Images/307_106_3.jpg',
	imgST_path4 = './Images/307_106_4.jpg'
WHERE id_stanza = 307;

INSERT INTO cliente VALUES
-- (EMAIL_CL, password_cl, nome_cl, cognome_cl, data_nascita_cl, telefono_cl)
-- tutte le password sono nel formato --> Cognome_pass1
-- Esempio: Se cognome = Fellini, allora password = Fellini_pass1
('fellini@gmail.it', 'cff036a71ac63cdfa61d4ca90b6e191bc0fefb1b9afcffdd282cdc7638e2a3f58ebeac34a0ca543ca2c582cc3ded8ad1a755417ee0229be8eeab19b1241c9f7d', 'Federico', 'Fellini', '1953-02-05', '3771234567'),
('mastroianni@gmail.it', '26748100e64e3bdb7e917525cebd53eb7989ec641cc42ae9f6a583ca1a47304a47a442a653cdbbfe29b87df390711505e202a1731e15c6bcf14f72a58c10cc18', 'Marcello', 'Mastroianni', '1973-05-12', '3410000000'),
('leone@gmail.it', 'd1a2ded6083d2fb2ce63463a69fe27ceba5272eae3cddbd449438746dd569147e35acdb1c0909db0f38aa55162c02498cf0982362767ad506aac68a11ab14ded', 'Sergio', 'Leone', '1993-06-02', '389000123'),
('sorrentino@gmail.it', 'd7c7dfe631d88081828fd8a0ce047e0dec667d4dde49b4fd88897f086450fee64fbde97babb0af508c7987c747027326a3e0422180fc68b5f61141211e5f07c7', 'Paolo', 'Sorrentino', '1999-06-01', '3211234567');

INSERT INTO soggiornante VALUES
-- (CF_SOGG, nome_sogg, cognome_sogg, data_nascita_sogg)
('LKJHGF49C73U649P', 'Federico', 'Fellini', '1953-02-05'),
('PQLCME93N18X183J', 'Anna', 'Magnani', '1983-08-12'),
('SWIMSL18F28N480L', 'Marcello', 'Mastroianni', '1973-05-12'),
('QPRHSL20E83H580P', 'Vittorio', 'De Sica', '1952-01-04'),
('EJGLWW19H40N285N', 'Ennio', 'Morricone', '1992-05-01');

INSERT INTO prenotazione (ref_soggiornante, ref_cliente, ref_proprietario, ref_proprieta, num_soggiornanti, costo, caparra, data_partenza, data_ritorno, accettata) VALUES
-- (ID_PRENOTAZIONE, REF_SOGGIORNANTE, ref_cliente, ref_proprietario, ref_proprieta, num_soggiornanti, costo, (caparra), data_partenza, data_ritorno, 
-- accettata)
('LKJHGF49C73U649P', 'fellini@gmail.it', 'matteo@gmail.it', 103, 2, 200, 30, '2021-03-03', '2021-03-05', false), -- ID 500
('PQLCME93N18X183J', 'fellini@gmail.it', 'matteo@gmail.it', 103, 2, 200, 30, '2021-03-03', '2021-03-05', false), -- ID 501
('SWIMSL18F28N480L', 'mastroianni@gmail.it', 'luigi@gmail.it', 102, 3, 500, 100, '2021-02-02', '2021-02-07', false), -- ID 502
('QPRHSL20E83H580P', 'mastroianni@gmail.it', 'luigi@gmail.it', 102, 3, 500, 100, '2021-02-02', '2021-02-07', false), -- ID 503
('EJGLWW19H40N285N', 'mastroianni@gmail.it', 'luigi@gmail.it', 102, 3, 500, 100, '2021-02-02', '2021-02-07', false), -- ID 504
('SWIMSL18F28N480L', 'mastroianni@gmail.it', 'luigi@gmail.it', 102, 3, 500, 100, '2020-04-05', '2020-04-08', false), -- ID 505
('SWIMSL18F28N480L', 'mastroianni@gmail.it', 'luigi@gmail.it', 102, 3, 500, 100, '2021-03-03', '2021-03-09', false); -- ID 506

INSERT INTO tassa_soggiorno (ref_soggiornante, ref_prenotazione, ref_proprietario, ammontare) VALUES
-- (ID_TASSA, ref_soggiornante, ref_prenotazione, ref_proprietario, ammontare)
('LKJHGF49C73U649P', 500, 'matteo@gmail.it', 35), -- ID 700
('PQLCME93N18X183J', 501, 'matteo@gmail.it', 35), -- ID 701
('SWIMSL18F28N480L', 502, 'luigi@gmail.it', 12), -- ID 702
('QPRHSL20E83H580P', 503, 'luigi@gmail.it', 12), -- ID 703
('EJGLWW19H40N285N', 504, 'luigi@gmail.it', 12); -- ID 704

-- ottenere guadagni di un proprietario da tabella prenotazione + proprietario, fornendo anche un anno per la ricerca, oltre al proprio id
-- SELECT @prop := 'luigi@gmail.it';
-- SELECT @anno := 2020;
-- SELECT pro.email_prop, (SUM(pre.costo) + SUM(pre.caparra)) AS tot_guadagni
-- FROM prenotazione pre, proprietario pro 
-- WHERE pre.ref_proprietario = pro.email_prop AND pro.email_prop = @prop AND YEAR(pre.data_ritorno) = @anno
-- GROUP BY pro.email_prop;

-- SELECT @prop := 'luigi@gmail.it';
-- SELECT @data_1 := "2020-01-01";
-- SELECT @data_2 := "2020-12-31";
-- SELECT @tipo := 'cv';
-- SELECT pro.email_prop, (SUM(pre.costo) + SUM(pre.caparra)) AS tot_guadagni, p.nome_proprieta
-- FROM prenotazione pre, proprietario pro, proprieta p
-- WHERE pre.ref_proprietario = pro.email_prop AND pro.email_prop = p.ref_proprietario AND p.tipo_proprieta = @tipo AND 
	-- pre.ref_proprieta = p.id_proprieta AND
	-- pro.email_prop = @prop AND pre.data_partenza >= @data_1 AND pre.data_partenza <= @data_2
-- GROUP BY pro.email_prop, p.id_proprieta;

-- Esempio query vincolo 28 giorni
-- SELECT @sogg := 'SWIMSL18F28N480L';
-- SELECT @anno := 2020;
-- SELECT pre.id_prenotazione, pre.ref_soggiornante, pre.data_partenza, pre.data_ritorno, SUM(pre.data_ritorno - pre.data_partenza) AS tot_giorni
-- FROM prenotazione pre, proprieta pro
-- WHERE pre.ref_proprieta = pro.id_proprieta AND
	-- pro.tipo_proprieta = 'cv' AND pre.ref_soggiornante = @sogg AND
    -- YEAR(pre.data_ritorno) = @anno
-- GROUP BY pre.ref_soggiornante, YEAR(pre.data_ritorno);

-- Query per ricercare alloggi in base a vari filtri
-- il valore di default di ciascun campo deve essere '%%'
-- se l'utente decide di usare quel filtro, allora il valore del campo sarà sostituito, altrimenti rimarrà '%%'
-- ragionamento simile da fare quando si modifica il campo servizi, per cui bisogna fare attenzione
-- da sistemare nel front end
-- SELECT @tipo := 'cv';
-- SELECT @localita := 'Torino';
-- SELECT @provincia := '%%';
-- SELECT @servizi := '%%';
-- SELECT @posti := '%%';
-- SELECT @tariffa := '%%';
-- SELECT DISTINCT p.nome_proprieta, p.indirizzo, p.localita, p.tipo_proprieta, p.servizi,
	-- IF(@tipo = 'cv', c.tariffa_casa, s.tariffa_stanza) AS tariffa,
	-- IF(@tipo = 'cv', c.posti_letto, s.tipologia) AS posti
-- FROM proprieta p, casa_vacanza c, b_and_b b, stanza s
-- WHERE p.id_proprieta = IF(@tipo = 'cv', c.ref_proprieta_cv, b.ref_proprieta_bb) AND b.ref_proprieta_bb = s.ref_bb AND
	 -- p.localita LIKE @localita AND p.provincia LIKE @provincia AND p.servizi LIKE @servizi AND 
	 -- (c.posti_letto LIKE @posti OR s.tipologia LIKE @posti) AND (c.tariffa_casa LIKE @tariffa OR s.tariffa_stanza LIKE @tariffa);
     
-- ----------PROVA CARICAMENTO STANZA CON FOTO ----------
-- INSERT INTO stanza (ref_bb, tipologia, tariffa_stanza) VALUES 
-- (106, 999, 9999); 

-- SELECT @id := (SELECT id_stanza 
				-- FROM stanza 
				-- HAVING id_stanza >= ALL (SELECT id_stanza
										-- FROM stanza));
                                        
-- SELECT @ref_bb := (SELECT ref_bb
					-- FROM stanza
                    -- GROUP BY id_stanza
					-- HAVING id_stanza >= ALL (SELECT id_stanza
											-- FROM stanza));
                                            
-- UPDATE stanza
-- SET imgST_path1 = CONCAT("./Images/", CAST(@id AS CHAR), "_", CAST(@ref_bb AS CHAR), "_1.jpg"),
	-- imgST_path2 = CONCAT("./Images/", CAST(@id AS CHAR), "_", CAST(@ref_bb AS CHAR), "_2.jpg"),
	-- imgST_path3 = CONCAT("./Images/", CAST(@id AS CHAR), "_", CAST(@ref_bb AS CHAR), "_3.jpg"),
	-- imgST_path4 = CONCAT("./Images/", CAST(@id AS CHAR), "_", CAST(@ref_bb AS CHAR), "_4.jpg")
-- WHERE id_stanza = @id;