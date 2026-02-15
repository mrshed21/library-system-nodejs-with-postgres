--
-- PostgreSQL database dump
--

\restrict MFo5zwYbnwPKFa6V6uQapMuIF3hTQggSVHhUrVHx5O8vbFIBxINxVpCeIYyuPKk

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.0

-- Started on 2026-02-14 19:50:09

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 220 (class 1259 OID 16969)
-- Name: Authors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Authors" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    year_of_birth integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Authors" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16968)
-- Name: Authors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Authors_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Authors_id_seq" OWNER TO postgres;

--
-- TOC entry 5059 (class 0 OID 0)
-- Dependencies: 219
-- Name: Authors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Authors_id_seq" OWNED BY public."Authors".id;


--
-- TOC entry 222 (class 1259 OID 16981)
-- Name: Books; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Books" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    price numeric(10,2) NOT NULL,
    stock integer NOT NULL,
    author_id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Books" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16980)
-- Name: Books_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Books_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Books_id_seq" OWNER TO postgres;

--
-- TOC entry 5060 (class 0 OID 0)
-- Dependencies: 221
-- Name: Books_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Books_id_seq" OWNED BY public."Books".id;


--
-- TOC entry 224 (class 1259 OID 17000)
-- Name: Genres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Genres" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Genres" OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16999)
-- Name: Genres_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Genres_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Genres_id_seq" OWNER TO postgres;

--
-- TOC entry 5061 (class 0 OID 0)
-- Dependencies: 223
-- Name: Genres_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Genres_id_seq" OWNED BY public."Genres".id;


--
-- TOC entry 225 (class 1259 OID 17012)
-- Name: book_genres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.book_genres (
    book_id integer NOT NULL,
    genre_id integer NOT NULL
);


ALTER TABLE public.book_genres OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 17030)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(255) DEFAULT 'user'::character varying NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 17029)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5062 (class 0 OID 0)
-- Dependencies: 226
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4875 (class 2604 OID 16972)
-- Name: Authors id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Authors" ALTER COLUMN id SET DEFAULT nextval('public."Authors_id_seq"'::regclass);


--
-- TOC entry 4876 (class 2604 OID 16984)
-- Name: Books id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Books" ALTER COLUMN id SET DEFAULT nextval('public."Books_id_seq"'::regclass);


--
-- TOC entry 4877 (class 2604 OID 17003)
-- Name: Genres id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Genres" ALTER COLUMN id SET DEFAULT nextval('public."Genres_id_seq"'::regclass);


--
-- TOC entry 4878 (class 2604 OID 17033)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 5046 (class 0 OID 16969)
-- Dependencies: 220
-- Data for Name: Authors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Authors" (id, name, year_of_birth, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5048 (class 0 OID 16981)
-- Dependencies: 222
-- Data for Name: Books; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Books" (id, name, price, stock, author_id, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5050 (class 0 OID 17000)
-- Dependencies: 224
-- Data for Name: Genres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Genres" (id, name, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5051 (class 0 OID 17012)
-- Dependencies: 225
-- Data for Name: book_genres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.book_genres (book_id, genre_id) FROM stdin;
\.


--
-- TOC entry 5053 (class 0 OID 17030)
-- Dependencies: 227
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, role, "isActive", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5063 (class 0 OID 0)
-- Dependencies: 219
-- Name: Authors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Authors_id_seq"', 1, false);


--
-- TOC entry 5064 (class 0 OID 0)
-- Dependencies: 221
-- Name: Books_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Books_id_seq"', 1, false);


--
-- TOC entry 5065 (class 0 OID 0)
-- Dependencies: 223
-- Name: Genres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Genres_id_seq"', 1, false);


--
-- TOC entry 5066 (class 0 OID 0)
-- Dependencies: 226
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- TOC entry 4882 (class 2606 OID 16979)
-- Name: Authors Authors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Authors"
    ADD CONSTRAINT "Authors_pkey" PRIMARY KEY (id);


--
-- TOC entry 4884 (class 2606 OID 16993)
-- Name: Books Books_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Books"
    ADD CONSTRAINT "Books_pkey" PRIMARY KEY (id);


--
-- TOC entry 4886 (class 2606 OID 17011)
-- Name: Genres Genres_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Genres"
    ADD CONSTRAINT "Genres_name_key" UNIQUE (name);


--
-- TOC entry 4888 (class 2606 OID 17009)
-- Name: Genres Genres_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Genres"
    ADD CONSTRAINT "Genres_pkey" PRIMARY KEY (id);


--
-- TOC entry 4890 (class 2606 OID 17018)
-- Name: book_genres book_genres_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_genres
    ADD CONSTRAINT book_genres_pkey PRIMARY KEY (book_id, genre_id);


--
-- TOC entry 4892 (class 2606 OID 17049)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4894 (class 2606 OID 17047)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4895 (class 2606 OID 16994)
-- Name: Books Books_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Books"
    ADD CONSTRAINT "Books_author_id_fkey" FOREIGN KEY (author_id) REFERENCES public."Authors"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4896 (class 2606 OID 17019)
-- Name: book_genres book_genres_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_genres
    ADD CONSTRAINT book_genres_book_id_fkey FOREIGN KEY (book_id) REFERENCES public."Books"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4897 (class 2606 OID 17024)
-- Name: book_genres book_genres_genre_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_genres
    ADD CONSTRAINT book_genres_genre_id_fkey FOREIGN KEY (genre_id) REFERENCES public."Genres"(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2026-02-14 19:50:09

--
-- PostgreSQL database dump complete
--

\unrestrict MFo5zwYbnwPKFa6V6uQapMuIF3hTQggSVHhUrVHx5O8vbFIBxINxVpCeIYyuPKk

