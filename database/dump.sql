--
-- PostgreSQL database dump
--

-- Dumped from database version 12.8 (Ubuntu 12.8-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.8 (Ubuntu 12.8-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: infos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.infos (
    id integer NOT NULL,
    userid integer,
    operacao text,
    dataoperacao date,
    valor text,
    descricao text
);


ALTER TABLE public.infos OWNER TO postgres;

--
-- Name: infos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.infos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.infos_id_seq OWNER TO postgres;

--
-- Name: infos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.infos_id_seq OWNED BY public.infos.id;


--
-- Name: sessoes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessoes (
    id integer NOT NULL,
    userid integer,
    token text
);


ALTER TABLE public.sessoes OWNER TO postgres;

--
-- Name: sessoes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sessoes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessoes_id_seq OWNER TO postgres;

--
-- Name: sessoes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sessoes_id_seq OWNED BY public.sessoes.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nome text,
    email text,
    password text
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuarios_id_seq OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: infos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.infos ALTER COLUMN id SET DEFAULT nextval('public.infos_id_seq'::regclass);


--
-- Name: sessoes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessoes ALTER COLUMN id SET DEFAULT nextval('public.sessoes_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: infos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.infos (id, userid, operacao, dataoperacao, valor, descricao) FROM stdin;
1	50	entrada	2021-11-24	21.0	nao sei
2	50	entrada	2021-11-24	21.0	nao sei
9	51	entrada	2021-10-24	21.0	maosdasokd asd
10	51	saida	2021-10-24	294.5	priston tale
11	51	entrada	2021-10-25	321.5	credoo
12	51	entrada	2021-10-25	22.5	qqqq
13	51	saida	2021-10-25	1500	divida
14	51	entrada	2021-10-25	25.15	brabo
15	51	saida	2021-10-25	99	assim
16	66	entrada	2021-10-25	1500	brabo
\.


--
-- Data for Name: sessoes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessoes (id, userid, token) FROM stdin;
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nome, email, password) FROM stdin;
59	xablau	benhu@mail.com	$2b$10$A9wisHfbzBCxDiI4cWOXuO/oi.Pnqb3mGOk2N4.E6ii4h9HrboibG
66	priston 	priston@mail.com	$2b$10$./SDcPbelDV8G6DRykTcV.M7oGE10geBcEsB/yJmVgtTXN4br91lq
48	Ben	meudeuqsssss@gmail.com	$2b$10$/d1GLuVan6b6WWnkQvRy9OCOO8gi2wsV0btADF/2WDVqha5gKAOZW
49	Ben	meudeuqss@gmail.com	$2b$10$SgEMxtYOS8C7fOsBdYI2L.jfSbRNpza1tpA12DBGlBca66OsfwpQu
50	Ben	meudeuqsqqwqo@gmail.com	$2b$10$aWolo7RgM0uP.xgm9vEvO.5N9UdKPrtmUJtQDpnluBeltj9xdIa22
51	BH	benhurfaria3@gmail.com	$2b$10$laZJPxYXheJ5jGFTR75Ta.M6liNN/CB6oCqUw5J505NAPAI0.aSzy
52	ben	benhurfaria3@gmail.co	$2b$10$GLn/vBTNIrestFdmOzoA7ujQ5oSPA1TIGp1nYPug1eqCS3CXNchtO
\.


--
-- Name: infos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.infos_id_seq', 16, true);


--
-- Name: sessoes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sessoes_id_seq', 38, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 66, true);


--
-- PostgreSQL database dump complete
--

