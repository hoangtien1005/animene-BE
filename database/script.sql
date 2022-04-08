--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

-- Started on 2022-04-08 11:50:49 +07

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
-- TOC entry 214 (class 1259 OID 16993)
-- Name: Category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Category" (
    category_id integer NOT NULL,
    name character varying(256) NOT NULL,
    color character varying(10),
    state character varying(10) DEFAULT 'public'::character varying NOT NULL
);


--
-- TOC entry 213 (class 1259 OID 16992)
-- Name: Category_category_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public."Category" ALTER COLUMN category_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Category_category_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 216 (class 1259 OID 17006)
-- Name: Comment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Comment" (
    comment_id integer NOT NULL,
    author_id integer NOT NULL,
    post_id integer NOT NULL,
    parent_id integer,
    author_avatar character varying(256),
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone,
    state character varying(10) DEFAULT 'public'::character varying NOT NULL
);


--
-- TOC entry 217 (class 1259 OID 17015)
-- Name: Comment_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public."Comment" ALTER COLUMN comment_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Comment_comment_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 215 (class 1259 OID 17000)
-- Name: Favorite; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Favorite" (
    user_id integer NOT NULL,
    media_id integer NOT NULL,
    type character varying(20) NOT NULL,
    image character varying(256) NOT NULL
);


--
-- TOC entry 220 (class 1259 OID 17061)
-- Name: Like_Comment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Like_Comment" (
    user_id integer NOT NULL,
    comment_id integer NOT NULL
);


--
-- TOC entry 219 (class 1259 OID 17056)
-- Name: Like_Post; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Like_Post" (
    user_id integer NOT NULL,
    post_id integer NOT NULL
);


--
-- TOC entry 212 (class 1259 OID 16984)
-- Name: Post; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Post" (
    post_id integer NOT NULL,
    author_id integer NOT NULL,
    author_avatar character varying(256),
    title character varying(256) NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone,
    state character varying(10) DEFAULT 'public'::character varying NOT NULL
);


--
-- TOC entry 218 (class 1259 OID 17016)
-- Name: Post_Category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Post_Category" (
    post_id integer NOT NULL,
    category_id integer NOT NULL
);


--
-- TOC entry 211 (class 1259 OID 16983)
-- Name: Post_post_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public."Post" ALTER COLUMN post_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Post_post_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 210 (class 1259 OID 16975)
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."User" (
    user_id integer NOT NULL,
    email character varying(256) NOT NULL,
    password character varying(256) NOT NULL,
    avatar character varying(256),
    role integer DEFAULT 1 NOT NULL,
    date_of_birth timestamp with time zone,
    state character varying(10) DEFAULT 'public'::character varying NOT NULL,
    about text,
    username character varying(256)
);


--
-- TOC entry 209 (class 1259 OID 16974)
-- Name: User_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public."User" ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."User_user_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3640 (class 0 OID 16993)
-- Dependencies: 214
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Category" (category_id, name, color, state) FROM stdin;
1	general	#18c1f0	public
2	anime	#18c1f0	public
3	manga	#18c1f0	public
4	news	#18c1f0	public
5	music	#18c1f0	public
6	light novels	#18c1f0	public
7	recommendations	#18c1f0	public
8	site feedback	#18c1f0	public
9	bug reports	#18c1f0	public
\.


--
-- TOC entry 3652 (class 0 OID 0)
-- Dependencies: 213
-- Name: Category_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Category_category_id_seq"', 9, true);


--
-- TOC entry 3653 (class 0 OID 0)
-- Dependencies: 217
-- Name: Comment_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Comment_comment_id_seq"', 1, false);


--
-- TOC entry 3654 (class 0 OID 0)
-- Dependencies: 211
-- Name: Post_post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Post_post_id_seq"', 1, false);


--
-- TOC entry 3655 (class 0 OID 0)
-- Dependencies: 209
-- Name: User_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."User_user_id_seq"', 5, true);


--
-- TOC entry 3474 (class 2606 OID 16998)
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (category_id);


--
-- TOC entry 3478 (class 2606 OID 17014)
-- Name: Comment Comment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_pkey" PRIMARY KEY (comment_id);


--
-- TOC entry 3476 (class 2606 OID 17005)
-- Name: Favorite Favorite_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Favorite"
    ADD CONSTRAINT "Favorite_pkey" PRIMARY KEY (user_id, media_id);


--
-- TOC entry 3484 (class 2606 OID 17065)
-- Name: Like_Comment Like_Comment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Like_Comment"
    ADD CONSTRAINT "Like_Comment_pkey" PRIMARY KEY (user_id, comment_id);


--
-- TOC entry 3482 (class 2606 OID 17060)
-- Name: Like_Post Like_Post_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Like_Post"
    ADD CONSTRAINT "Like_Post_pkey" PRIMARY KEY (user_id, post_id);


--
-- TOC entry 3480 (class 2606 OID 17020)
-- Name: Post_Category Post_Category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Post_Category"
    ADD CONSTRAINT "Post_Category_pkey" PRIMARY KEY (post_id, category_id);


--
-- TOC entry 3472 (class 2606 OID 16991)
-- Name: Post Post_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_pkey" PRIMARY KEY (post_id);


--
-- TOC entry 3470 (class 2606 OID 16982)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (user_id);


--
-- TOC entry 3491 (class 2606 OID 17051)
-- Name: Post_Category fk_category_postcategory; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Post_Category"
    ADD CONSTRAINT fk_category_postcategory FOREIGN KEY (category_id) REFERENCES public."Category"(category_id);


--
-- TOC entry 3489 (class 2606 OID 17041)
-- Name: Comment fk_comment_parent; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT fk_comment_parent FOREIGN KEY (parent_id) REFERENCES public."Comment"(comment_id);


--
-- TOC entry 3495 (class 2606 OID 17081)
-- Name: Like_Comment fk_likecomment_comment; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Like_Comment"
    ADD CONSTRAINT fk_likecomment_comment FOREIGN KEY (comment_id) REFERENCES public."Comment"(comment_id);


--
-- TOC entry 3494 (class 2606 OID 17076)
-- Name: Like_Comment fk_likecomment_user; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Like_Comment"
    ADD CONSTRAINT fk_likecomment_user FOREIGN KEY (user_id) REFERENCES public."User"(user_id);


--
-- TOC entry 3493 (class 2606 OID 17071)
-- Name: Like_Post fk_likepost_post; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Like_Post"
    ADD CONSTRAINT fk_likepost_post FOREIGN KEY (post_id) REFERENCES public."Post"(post_id);


--
-- TOC entry 3492 (class 2606 OID 17066)
-- Name: Like_Post fk_likepost_user; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Like_Post"
    ADD CONSTRAINT fk_likepost_user FOREIGN KEY (user_id) REFERENCES public."User"(user_id);


--
-- TOC entry 3488 (class 2606 OID 17036)
-- Name: Comment fk_post_comment; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT fk_post_comment FOREIGN KEY (post_id) REFERENCES public."Post"(post_id);


--
-- TOC entry 3490 (class 2606 OID 17046)
-- Name: Post_Category fk_post_postcategory; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Post_Category"
    ADD CONSTRAINT fk_post_postcategory FOREIGN KEY (post_id) REFERENCES public."Post"(post_id);


--
-- TOC entry 3485 (class 2606 OID 17021)
-- Name: Post fk_post_user; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT fk_post_user FOREIGN KEY (author_id) REFERENCES public."User"(user_id);


--
-- TOC entry 3487 (class 2606 OID 17031)
-- Name: Comment fk_user_comment; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT fk_user_comment FOREIGN KEY (author_id) REFERENCES public."User"(user_id);


--
-- TOC entry 3486 (class 2606 OID 17026)
-- Name: Favorite fk_user_favorite; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Favorite"
    ADD CONSTRAINT fk_user_favorite FOREIGN KEY (user_id) REFERENCES public."User"(user_id);


-- Completed on 2022-04-08 11:50:50 +07

--
-- PostgreSQL database dump complete
--

