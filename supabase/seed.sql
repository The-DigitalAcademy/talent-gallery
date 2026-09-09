SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict qKi4GuMEGnZ9VF05cvk1b3veM6wuwEUzHJqz7aNPhVu1VmqBnAezz8R0zaTmAca

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

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

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: custom_oauth_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: webauthn_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: webauthn_credentials; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: capabilities; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."capabilities" ("id", "name", "created_at") VALUES
	('eba21030-eeed-4b86-95fa-296e3e03e711', 'Python', '2026-08-07 07:48:00.492687+00'),
	('49e353dd-1b61-4360-9681-d406fcb5b225', 'JavaScript', '2026-08-07 07:48:07.456743+00'),
	('dcd64e6a-8c10-4562-85d2-0891eb111510', 'Java', '2026-08-07 07:48:11.184956+00'),
	('1f83b77b-2caa-4e35-a9b9-20b699bfe4da', 'SQL', '2026-08-07 07:48:30.981836+00'),
	('42c55f65-e6b8-4137-af55-06af2ddf6dbd', 'NoSQL', '2026-08-07 07:48:50.812784+00'),
	('b1cd5d2c-d6cc-49f6-b6ad-59a28b74270e', 'HTML', '2026-08-12 11:40:31.551725+00'),
	('30dbbd60-0875-44cc-b366-f2b349a34041', 'CSS', '2026-08-12 11:40:39.94453+00'),
	('362faa4f-a905-4a08-9c21-8b10e2f43e4b', 'Angular', '2026-08-12 11:40:50.702885+00'),
	('6fb635de-717a-4060-ba97-6c67c440003f', 'Git & GitHub', '2026-08-12 11:41:00.574534+00'),
	('43199d38-1b94-4a2a-8fa7-4bffc222ac35', 'PostgreSQL', '2026-08-12 11:41:11.628991+00'),
	('3ef91bcb-df61-4d4e-9b63-86c505735a0d', 'TypeScript', '2026-08-12 11:41:27.255918+00'),
	('dbf80a09-6e2e-472d-8db6-ca2421ad4798', 'Spring Boot', '2026-08-12 11:42:02.69887+00'),
	('bcefcf76-42ac-47b5-b194-6c8b742fa79f', 'GitLab', '2026-08-12 11:42:06.155228+00'),
	('a50f8d81-7ef0-4fb6-b024-d5b7a4e359d3', 'Figma', '2026-08-12 11:42:09.576683+00'),
	('b71dcc44-22e7-4f4b-bae2-66136f56c2cb', 'Lucidchart', '2026-08-12 11:42:20.426811+00'),
	('7df03f30-5aa8-4b50-aad4-df647f4ff954', 'React', '2026-08-12 11:42:36.852491+00'),
	('a30ebab5-6095-4f07-804a-78ad89486b2c', 'Bootstrap', '2026-08-12 11:43:12.313889+00'),
	('ffef1eba-06eb-4255-95d1-ab21534d3908', 'ExpressJS', '2026-08-12 11:43:34.913313+00'),
	('856607d4-4cad-4f17-b893-6f7dde0e782e', 'Flask', '2026-08-14 08:31:29.399368+00'),
	('0584b8c3-733c-4f56-8216-90c6feb22498', 'Django', '2026-08-14 08:31:43.620117+00'),
	('16a4f0b0-257e-4569-bfa1-f65477307a71', 'FastAPI', '2026-08-14 08:31:53.98891+00'),
	('0ea25217-e3a2-4b9f-8dd7-e8478066691e', 'NGINX', '2026-08-14 08:32:14.966965+00'),
	('8d1297b3-47ce-4e80-9409-b42acae58ff9', 'REST APIs', '2026-08-14 08:32:28.48039+00'),
	('e1696625-cb21-4732-8f78-a512acab0202', 'Power BI', '2026-08-14 08:36:13.858986+00'),
	('97b13e08-a16d-4a1f-8980-27028d484d38', 'Agile/Scrum', '2026-08-14 08:36:20.877744+00'),
	('49857a2c-b026-4f4f-a535-6bcf874925c4', 'AWS', '2026-08-14 08:36:27.732297+00'),
	('cafda503-76e1-409d-9fca-3ec7bc1981dd', 'MySQL', '2026-08-14 08:37:27.414023+00'),
	('518cb386-f660-403f-8aa5-2ef5696f8b8e', 'Docker', '2026-08-14 08:42:02.609056+00'),
	('efae9339-8bff-4fa1-8dc7-9881155a13f4', 'Qmetry', '2026-08-14 08:47:39.979814+00'),
	('5f318fb2-480c-4bd8-9992-5ec66325d4e5', 'Microsoft Excel', '2026-08-14 08:47:45.340216+00'),
	('65297bc7-2523-4974-a6c8-e242d5672231', 'Azure', '2026-08-14 09:02:07.041623+00'),
	('d0897978-9145-4ccc-9dcb-3da903addb18', 'Salesforce', '2026-08-14 09:43:57.011329+00'),
	('13fe7e7b-40b7-42cc-bc83-2626d4282360', 'C#', '2026-08-14 10:10:20.551456+00'),
	('d36906cb-9153-4380-9a5a-3dfcd1e500d1', '.NET', '2026-08-14 10:10:27.372804+00'),
	('90acc116-cf15-4939-ad99-1e94b043244c', 'Ataccama', '2026-08-14 11:45:01.032302+00'),
	('62885680-9c6f-4ed2-bdeb-26fa0ac2a40f', 'Selenium', '2026-08-17 06:55:57.403576+00'),
	('8a02c5c5-6f64-4d81-abb8-e10d2579ee81', 'Microsoft Power Apps', '2026-08-17 08:16:12.459606+00'),
	('1ece23b9-1833-4e72-acf0-8ff4380f9ccc', 'Microsoft Dataverse', '2026-08-17 08:16:18.534492+00'),
	('651854d3-de90-4db0-aefd-b6201fef29fc', 'Microsoft Power Automate', '2026-08-17 08:16:23.808301+00');


--
-- Data for Name: cohorts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."cohorts" ("id", "name", "created_at", "slug") VALUES
	('ac6f2b14-1230-4a9a-b762-989a6df8f8e9', 'Frangipani', '2026-08-12 11:44:04.61002+00', 'frangipani-ac6f2b14'),
	('fa8d6c55-6c7c-4ba1-80ea-c784cc90fec9', 'Begonia', '2026-08-13 16:36:08.308587+00', 'begonia-fa8d6c55'),
	('a2587be6-d248-4f98-8a5f-b11e050a2ae2', 'Dahlia', '2026-08-13 16:36:23.565976+00', 'dahlia-a2587be6');


--
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."locations" ("id", "created_at", "city", "country") VALUES
	('9d054ecd-b644-44ae-aafe-dffc59d63e1f', '2026-08-07 07:46:20.039623+00', 'Johannesburg', 'South Africa');


--
-- Data for Name: programs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."programs" ("id", "name", "created_at") VALUES
	('6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'Full-Stack Development', '2026-08-12 11:44:32.796434+00');


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."roles" ("id", "created_at", "name", "description") VALUES
	('07bcd365-de47-42d7-87db-99c537a18e00', '2026-08-12 11:45:39.943392+00', 'Junior Full-Stack Developer', NULL);


--
-- Data for Name: talent_statuses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."talent_statuses" ("id", "name", "description", "created_at") VALUES
	('639e765d-5245-4c10-88cc-96288e63521e', 'Available for WPE', 'Seeking WPE placement', '2026-06-03 00:29:49.105548+00'),
	('e2a487bc-e9ef-4800-8a65-09eae3a930c1', 'Available for hire', 'Actively seeking roles', '2026-06-03 00:29:49.105548+00'),
	('f13edc39-8902-41c8-8bff-53cf8d5b629a', 'Employed', 'Currently employed full-time', '2026-06-03 00:29:49.105548+00'),
	('dd1870f8-46b5-4db7-a3d5-cd1735d237a3', 'Reserved', 'Already reserved', '2026-07-22 08:10:47.062786+00'),
	('c3852f68-3169-4d4a-9d89-33b6edbf8e52', 'In WPE', 'In a workplace experience programme', '2026-06-03 00:29:49.105548+00');


--
-- Data for Name: talents; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."talents" ("id", "fullname", "bio", "location_id", "program_id", "cohort_id", "talent_status_id", "profile_image_url", "portfolio_url", "github_url", "linkedin_url", "youtube_url", "is_published", "created_at", "slug", "role_id", "capabilities_summary") VALUES
	('2ee9b23c-fe19-4c4f-8414-c9464d44fd1e', 'Peter Dlamini', 'I am a junior full-stack developer with a Diploma in Correctional and Rehabilitation Studies and a strong interest in creating digital experiences that are intuitive and easy to use. I enjoy working on responsive interfaces, exploring UI/UX design and turning ideas into practical solutions. I value feedback, work well with others and am eager to continue developing my technical skills in a professional environment.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'ac6f2b14-1230-4a9a-b762-989a6df8f8e9', '639e765d-5245-4c10-88cc-96288e63521e', 'https://api.dicebear.com/10.x/miniavs/svg?seed=makgabo-maseka-abInWve2LKpZCEmGm9LlpPEICoHfPe.webp', '', 'https://github.com/Makgabo21', '', 'https://youtu.be/mU9TYgrvkM0?si=VPzRXpedOfdpK_03', true, '2026-08-13 14:34:54.282107+00', 'makgabo-maseka-2ee9b23c', '07bcd365-de47-42d7-87db-99c537a18e00', 'Frontend-focused development with experience building responsive, user-friendly interfaces and exploring UI/UX design. Skilled in Angular, TypeScript, HTML, CSS and PostgreSQL, with Git/GitHub experience and a foundation in full-stack development.'),
	('7aac9d59-0f77-42fb-8e3d-2323ac2bb524', 'Makgabo Chauke', 'I am a junior full-stack developer with a National Certificate in IT Systems Development (NQF 5) and a strong foundation in web development and UI design. I enjoy creating well-structured, user-friendly interfaces and approaching development challenges by breaking them into manageable steps. I take ownership of my work, enjoy organising tasks and am motivated to keep developing my technical skills through practical experience.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'ac6f2b14-1230-4a9a-b762-989a6df8f8e9', '639e765d-5245-4c10-88cc-96288e63521e', 'https://api.dicebear.com/10.x/miniavs/svg?seed=xolelwa-cekiso-Pbg3v4.webp', '', 'https://github.com/lelwa100/lelwa100', '', 'https://youtu.be/D7uH8pHDkPQ?si=TbJ7EPG4bHNX_OwN', true, '2026-08-13 16:34:10.710514+00', 'xolelwa-cekiso-7aac9d59', '07bcd365-de47-42d7-87db-99c537a18e00', 'Web development and UI design using HTML, CSS, Angular and Figma, with experience working with PostgreSQL databases. Comfortable creating structured, user-friendly interfaces and approaching development tasks systematically. Brings strong problem-solving, task organisation and collaboration skills, with a growing foundation for full-stack development.'),
	('8a972967-f13c-4722-b26e-9edbd43d015f', 'Xolelwa Nkosi', 'I am a junior full-stack developer with a Matric Certificate and a strong interest in building applications and understanding the logic behind how they work. I enjoy breaking technical challenges into manageable steps, finding practical solutions and learning through hands-on development. I take ownership of my work and am eager to grow my skills while contributing to a development team.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'ac6f2b14-1230-4a9a-b762-989a6df8f8e9', '639e765d-5245-4c10-88cc-96288e63521e', 'https://api.dicebear.com/10.x/miniavs/svg?seed=dineo-keneilwe-makofane-JaYs8r96jjvuAX4pfc9ZFfBX6Kuysu.webp', '', 'https://github.com/Dineo76/Dineo76', '', 'https://youtu.be/jVugbT2oI3g?si=xFM8tadPsFZQnCQN', true, '2026-08-13 14:03:20.166531+00', 'dineo-makofane-8a972967', '07bcd365-de47-42d7-87db-99c537a18e00', 'Full-stack development with a strong foundation in application logic and problem-solving. Experienced with Angular, JavaScript, TypeScript, Java, HTML, CSS and PostgreSQL, with Git/GitHub experience and exposure to developing practical web applications.'),
	('a43d684d-7c4a-4ae8-bb73-b6ada59f50d4', 'Dineo Baloyi', 'I am a junior full-stack developer with a Certificate in Civil Engineering N3, bringing a different perspective to software development through my technical and problem-solving background. I enjoy working across front-end and back-end development and taking ideas through to practical solutions. I take ownership of my work, value feedback, and am motivated to keep learning and growing as a developer.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'ac6f2b14-1230-4a9a-b762-989a6df8f8e9', '639e765d-5245-4c10-88cc-96288e63521e', 'https://api.dicebear.com/10.x/miniavs/svg?seed=charlotte-nkuna-kwO6TYx0XXyVNxbRPxopCtWRRBZ3m6.webp', '', 'https://github.com/CharlotteNkuna/CharlotteNkuna', '', 'https://youtu.be/WOT_caf24JE?si=zzaAFUNHNgYRZ_op', true, '2026-08-13 14:33:11.804553+00', 'charlotte-nkuna-a43d684d', '07bcd365-de47-42d7-87db-99c537a18e00', 'Full-stack development with experience across frontend and backend technologies, including Angular, JavaScript, TypeScript, Java, HTML, CSS and PostgreSQL. Comfortable with Git/GitHub and developing practical web applications across the software development lifecycle.'),
	('a6e5749f-0dd6-4c58-ac4e-dd148c4c5423', 'Charlotte Khumalo', 'I am a junior full-stack developer with a National Certificate in IT Systems Support (NQF 5), with a particular interest in building responsive, user-friendly digital experiences. I enjoy turning ideas into practical interfaces and am developing my skills across the wider software development lifecycle. I bring a strong sense of ownership to my work, enjoy learning from others, and am motivated by opportunities to grow as a developer while contributing to meaningful solutions.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'ac6f2b14-1230-4a9a-b762-989a6df8f8e9', '639e765d-5245-4c10-88cc-96288e63521e', 'https://api.dicebear.com/10.x/miniavs/svg?seed=busisiwe-dladla-zrFe645wpo7UP1qNNooJ1td5IZ8WGt.webp', '', 'https://github.com/busisiwedladla283-alt', '', 'https://youtu.be/jv9zWBuyz8U?si=8ww47pzvFE3JC5Vz', true, '2026-08-13 14:25:58.699427+00', 'busisiwe-dladla-a6e5749f', '07bcd365-de47-42d7-87db-99c537a18e00', 'Frontend development and responsive UI design, with a foundation in Angular, HTML, CSS and PostgreSQL. Experienced with Git/GitHub and developing practical, user-focused interfaces as part of a full-stack development environment.'),
	('df3e97a3-e768-439f-b1ef-97fe730af513', 'Busisiwe Dabula', 'I am a junior full-stack developer with a National Diploma in Accounting Science and a growing interest in software development. I particularly enjoy front-end development and creating responsive interfaces that are clear and easy to use. I bring an analytical mindset to my work, take initiative when I see an opportunity to contribute, and enjoy learning through practical development projects.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'ac6f2b14-1230-4a9a-b762-989a6df8f8e9', '639e765d-5245-4c10-88cc-96288e63521e', 'https://api.dicebear.com/10.x/miniavs/svg?seed=sakhile-dabula-rWcm4Mj6WNEBbWeXXVloFzlwrczbFl.webp', '', 'https://github.com/sakhiledabula044-create', '', 'https://youtu.be/-oiAbW8-vjw?si=rgegXA0IgIR0R1Hh', true, '2026-08-13 16:08:28.863167+00', 'sakhile-dabula-df3e97a3', '07bcd365-de47-42d7-87db-99c537a18e00', 'Frontend-focused development with experience building responsive, user-friendly interfaces. Skilled in Angular, JavaScript, HTML and CSS, with Git/GitHub and Figma experience supporting collaborative development and UI/UX design.'),
	('f7b65f0f-1d5b-4244-ab8a-eff57422a3b6', 'Sakhile Majola', 'I am a junior full-stack developer with a Matric Certificate and a strong interest in front-end development and UI/UX. I enjoy creating responsive, user-friendly interfaces and exploring how design and technology come together to improve the user experience. I have worked with both Angular and React and am keen to continue broadening my development skills while contributing to meaningful digital solutions.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'ac6f2b14-1230-4a9a-b762-989a6df8f8e9', '639e765d-5245-4c10-88cc-96288e63521e', 'https://api.dicebear.com/10.x/miniavs/svg?seed=sibongile-rathokwane-g6N7y1.webp', '', 'https://github.com/Sibongile-ar/Sibongile-ar', '', 'https://youtu.be/7aNgg5Vf52E?si=AAWeIxcL4A00ks4G', true, '2026-08-13 16:31:41.997178+00', 'sibongile-rathokwane-f7b65f0f', '07bcd365-de47-42d7-87db-99c537a18e00', 'Frontend-focused development with experience creating responsive, user-friendly interfaces using Angular and React. Skilled in Bootstrap and PostgreSQL, with Git/GitHub and Spring Boot experience supporting broader full-stack development.'),
	('4015bb73-6af2-44a8-a8b5-79c669b77a3c', 'Jospeh Phoswa', 'I am a junior full-stack developer with a Matric Certificate and a strong interest in building complete web applications from front-end interfaces through to backend services and databases. I enjoy connecting different parts of an application and working with APIs to make systems function end to end. I take pride in writing solutions that are practical, maintainable and easy to build on, and I am eager to keep developing my skills through real-world projects.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'ac6f2b14-1230-4a9a-b762-989a6df8f8e9', '639e765d-5245-4c10-88cc-96288e63521e', 'https://api.dicebear.com/10.x/miniavs/svg?seed=nonjabulo-phoswa-itgBM76uK79359BzWMbFOPzOYLIDD1.webp', '', 'https://github.com/Nonjie-Phoswa/Nonjie-Phoswa', '', 'https://youtu.be/rgriaE9vhT4?si=vNyu6PDuECMqiwCn', true, '2026-08-13 15:10:21.774525+00', 'nonjabulo-phoswa-4015bb73', '07bcd365-de47-42d7-87db-99c537a18e00', 'Full-stack development with experience connecting frontend interfaces, backend services and databases. Skilled in Angular, Spring Boot and PostgreSQL, with experience using Git/GitHub, GitLab, Figma, Lucidchart and developing API-driven applications.'),
	('d9da8310-3628-410d-ac87-760737083d46', 'Nonjabulo Mampondo', 'I am a junior full-stack developer with a Matric Certificate and an interest in building applications across both the front-end and back-end. I enjoy working with different technologies to understand how the pieces of an application connect and function together. I bring a professional approach to my work, value learning from others and am motivated to strengthen my skills through real-world development opportunities.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'ac6f2b14-1230-4a9a-b762-989a6df8f8e9', '639e765d-5245-4c10-88cc-96288e63521e', 'https://api.dicebear.com/10.x/miniavs/svg?seed=simamkele-mampondo-qAP5n33PcM31YYI0rW2mpHATj3OTIf.webp', '', 'https://github.com/Sibongile-ar/Sibongile-ar', '', 'https://youtu.be/sgBtXD61sDU?si=uGwoekYnBaX8ixGq', true, '2026-08-13 16:13:53.316521+00', 'simamkele-mampondo-d9da8310', '07bcd365-de47-42d7-87db-99c537a18e00', 'Full-stack application development across front-end and backend technologies, with experience working with Angular, React, Java and PostgreSQL. Comfortable understanding how application components connect and contributing to collaborative development workflows.'),
	('982fe23a-d160-460b-9824-1a1f74d8ace9', 'Simamkele Zungu', 'I am a junior full-stack developer with a National Certificate in Software Testing (NQF 5), giving me an interest in both building software and understanding its quality. I enjoy working on user-facing interfaces, solving problems and learning through practical development. I bring a focused and adaptable approach to my work and am motivated to grow as a developer while contributing to a team.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'ac6f2b14-1230-4a9a-b762-989a6df8f8e9', '639e765d-5245-4c10-88cc-96288e63521e', 'https://api.dicebear.com/10.x/miniavs/svg?seed=nomali-ntuli-PeKVbuCe2KD0AEKzQBix5ayPhqatce.webp', '', 'https://github.com/nomalintuli7-png', '', 'https://youtu.be/uHVLKJqK-7w?si=_vvuYuYOGXwFzm2F', true, '2026-08-13 14:37:55.7094+00', 'nomali-ntuli-982fe23a', '07bcd365-de47-42d7-87db-99c537a18e00', 'Frontend and software development with a focus on user-facing interfaces and software quality. Experienced with HTML, CSS and PostgreSQL, with Git/GitHub and Figma skills supporting collaborative development and UI/UX design.'),
	('e9502a46-9845-4cec-8583-b4027ecf8f44', 'Nomali Khoza', 'I am a Support Engineer with a Matric Certificate and an interest in developing and supporting web applications. I enjoy building solutions that make people’s lives easier and simplifying complex applications into intuitive user experiences. I am also interested in data analysis and creating interactive dashboards that turn data into useful insights. My technical experience includes Angular, Java, Spring Boot, PostgreSQL, Python and Power BI. I bring an adaptable, analytical approach to my work, with strong problem-solving, communication and attention to detail.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'fa8d6c55-6c7c-4ba1-80ea-c784cc90fec9', 'c3852f68-3169-4d4a-9d89-33b6edbf8e52', 'https://api.dicebear.com/10.x/miniavs/svg?seed=hloniphile-khoza-PFMx229xZ9JjYCFDomcnzT9HwYo9cO.webp', '', 'https://github.com/Hloni4', '', 'https://youtu.be/ZDNvUgub0vA?si=TAUIyIrYKPrLQpoN', true, '2026-08-14 08:35:27.862244+00', 'hloniphile-khoza-e9502a46', '07bcd365-de47-42d7-87db-99c537a18e00', 'Full-stack development and application support, with experience working across Python, Angular, Java, Spring Boot, SQL and relational databases. Also experienced in data analysis and reporting using Power BI, with exposure to AWS, Git/GitHub and Agile/Scrum practices.'),
	('010dc68d-dd48-41e6-abd7-4970ce7af1d4', 'Hloniphile Mahlangu', 'I am a Junior Software Automation Tester with a Matric Certificate and hands-on experience automating user journeys for a home loans application at ABSA Bank. I use Playwright and Selenium to build reliable, maintainable test automation and have contributed to developing an internal automation studio that streamlines manual testing workflows. This experience has strengthened my interest in automation engineering, full-stack development and building tools that improve team efficiency. I am curious about how systems work and enjoy looking beyond individual test cases to find broader ways to improve testing processes. I work closely with QA and development teams, share technical findings and actively seek opportunities to learn and improve.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'fa8d6c55-6c7c-4ba1-80ea-c784cc90fec9', 'c3852f68-3169-4d4a-9d89-33b6edbf8e52', 'https://api.dicebear.com/10.x/miniavs/svg?seed=bonga-gougota-FCZsvwJ5mdKPiFRgCWelCeH0bSfj6d.webp', '', 'https://github.com/BongaGougota0', '', 'https://youtu.be/ZD7rXvKt39M?si=ErdVZomd6aCbBvDk', true, '2026-08-14 08:26:49.346572+00', 'bonga-gougota-010dc68d', '07bcd365-de47-42d7-87db-99c537a18e00', 'Full-stack software development with experience building responsive web applications, developing frontend interfaces, backend services and REST APIs, and working with relational databases. Comfortable across application development, version control and modern development frameworks, with an interest in building practical, maintainable solutions.'),
	('7e6e6fae-4ae4-4f69-a6dd-fb50ce49eafb', 'Bonga Vilakazi', 'I am a Junior Software Developer with a Diploma in Information Technology and practical experience in IT support. I enjoy troubleshooting technical issues, understanding how systems work and finding solutions when things go wrong. My support experience has taught me the value of being reliable, responsive and willing to help others, while my software development training has strengthened my interest in building applications and working with technology. I am naturally curious, enjoy learning new tools and look for opportunities to improve the way things work.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'fa8d6c55-6c7c-4ba1-80ea-c784cc90fec9', 'c3852f68-3169-4d4a-9d89-33b6edbf8e52', 'https://api.dicebear.com/10.x/miniavs/svg?seed=njabulo-vilakazi-0TL3tUy0Qj2h76fVwN1zkStNP1dnkB.webp', '', 'https://github.com/Njabulo1412', '', '', true, '2026-08-14 08:53:01.073935+00', 'njabulo-vilakazi-7e6e6fae', '07bcd365-de47-42d7-87db-99c537a18e00', 'Software development and IT support, with experience across Java, TypeScript, Angular, Spring Boot, PostgreSQL and REST APIs. Brings practical experience in user access management, application support, incident handling and system checks, supported by foundations in Git/GitHub, AWS and Agile/Scrum practices.'),
	('d0625fac-5a4d-409e-bebd-1fa30a6aaf71', 'Njabulo Abrahams', 'I am a Junior QA Tester and Automation Intern with a National Diploma in Public Management and a background in full-stack development. I have developed a strong interest in software quality, testing and automation, and enjoy investigating how applications work, identifying issues and finding ways to improve them. My current experience has given me practical exposure to test case design, regression testing, defect reporting and API testing, while working closely with developers and QA teams. I am detail-oriented, curious and eager to continue building my technical skills as I grow my career in QA and automation.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'fa8d6c55-6c7c-4ba1-80ea-c784cc90fec9', 'c3852f68-3169-4d4a-9d89-33b6edbf8e52', 'https://api.dicebear.com/10.x/miniavs/svg?seed=thuli-mphungulo-b4FHHZBxoIUpeUuz0vWsZ4x4W0INpG.webp', '', 'https://github.com/Magnizo10', '', 'https://youtu.be/rs6KX1kXe_E?si=Hrdj8pXJHMkUH5Vx', true, '2026-08-14 08:55:22.242495+00', 'thuli-mphungulo-d0625fac', '07bcd365-de47-42d7-87db-99c537a18e00', 'Quality Assurance and software testing with practical experience in test case design, regression testing, defect identification and reporting, API testing and test automation. Technical foundation across Java, JavaScript, Angular, Spring Boot, SQL and REST APIs, with experience using QMetry, Selenium, SoapUI and Postman.'),
	('df26e137-7589-4007-8333-8340dfce7654', 'Thuli Modubu', 'I am a Junior Software Engineer with a BA in Psychology and practical experience in full-stack development and software engineering within a banking environment. I have worked on backend services, API integration, automated testing and production support, giving me an appreciation for building software that is reliable in real-world environments. My psychology background has strengthened my analytical thinking, problem-solving and communication skills, while my development experience has taught me to approach technical challenges with curiosity and a focus on practical solutions. I enjoy researching better ways to solve problems, learning new technologies and building software that is reliable, useful and scalable.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'fa8d6c55-6c7c-4ba1-80ea-c784cc90fec9', 'c3852f68-3169-4d4a-9d89-33b6edbf8e52', 'https://api.dicebear.com/10.x/miniavs/svg?seed=katlego-modubu-A8iHlVs8kedOFEz5u7AFtCh2jhHorF.webp', '', 'https://github.com/KatlegoM81', '', 'https://youtu.be/oQBtAbLGcWc?si=LN6KXZy1OpB5WfDK', true, '2026-08-14 08:41:00.394415+00', 'katlego-modubu-df26e137', '07bcd365-de47-42d7-87db-99c537a18e00', 'Full-stack software development with practical experience in backend services, API integration, software testing and production support. Experienced with Java, Spring Boot, Angular, TypeScript, PostgreSQL, REST APIs, Docker and Git/GitHub, with exposure to Agile/Scrum delivery, code reviews and production troubleshooting.'),
	('f0860153-4617-41f4-a089-25f60cde6dbe', 'Katlego Adams', 'I am a QA Tester with a Matric Certificate and practical experience testing web and mobile applications within a software development environment. I enjoy understanding how applications are expected to work, identifying issues and helping teams deliver reliable, high-quality products. My full-stack development training gives me a broader understanding of both frontend and backend systems, which helps me approach testing from more than just the user interface. I am detail-oriented, enjoy solving problems and am motivated to continue growing my skills in Quality Assurance and software testing.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'fa8d6c55-6c7c-4ba1-80ea-c784cc90fec9', 'c3852f68-3169-4d4a-9d89-33b6edbf8e52', 'https://api.dicebear.com/10.x/miniavs/svg?seed=lungile-radebe-kh7Yfd.webp', '', 'https://github.com/Pollyanna02', '', 'https://youtu.be/dlmwXknzrOo?si=odiknyzPJiFfe65K', true, '2026-08-14 08:46:01.140374+00', 'lungile-radebe-f0860153', '07bcd365-de47-42d7-87db-99c537a18e00', 'Quality Assurance and software testing with experience in manual, exploratory and regression testing across web and mobile applications. Skilled in test-case creation, defect tracking, test reporting and backend data validation using SQL, with additional foundations in full-stack development, UI/UX and cloud technologies.'),
	('af05c47a-d123-433d-8af6-7b8aa4ec036c', 'Lungile Nkoniera', 'I am a Product Engineer with a qualification in Business Analysis and practical experience developing and supporting technology solutions within a banking environment. My work has given me exposure to software development, business analysis, system integration, APIs and the software development lifecycle. I enjoy understanding how systems interact, investigating technical issues and translating business and technical requirements into practical solutions. Working across teams has strengthened my analytical thinking, problem-solving and adaptability, and I am particularly interested in product engineering, automation and technology solutions that create meaningful customer and business value.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'fa8d6c55-6c7c-4ba1-80ea-c784cc90fec9', 'c3852f68-3169-4d4a-9d89-33b6edbf8e52', 'https://api.dicebear.com/10.x/miniavs/svg?seed=lebohang-nkoniera-EUpXj0QTiqNBBp77OYWScg7KdY0JD3.webp', '', 'https://github.com/HerOnlySon', '', 'https://youtu.be/U8g6rw-h2G0?si=WKFPs3kuCFQ4jsFQ', true, '2026-08-14 09:00:36.988966+00', 'lebohang-nkoniera-af05c47a', '07bcd365-de47-42d7-87db-99c537a18e00', 'Product engineering and full-stack development with experience across software development, business analysis, systems integration, APIs and technology support in a banking environment. Technical capabilities include Java, React, Angular, Spring Boot, SQL, PostgreSQL, REST APIs, Docker, Azure and AWS, supported by experience with Agile/Scrum and the full software development lifecycle.'),
	('6f829522-191e-4646-b1cb-40cf79cf50e5', 'Lebohang Atkinson', 'I am a Junior Software Developer with a background in full-stack development and a strong interest in both software and data. I enjoy understanding how different technologies work together to solve practical problems and creating applications that are useful and user-friendly. I am currently gaining hands-on experience in a Product Engineering team, working with Angular and Java Spring Boot. My experience with data analysis has also strengthened my analytical approach to problem-solving. I am curious, detail-oriented and committed to continuously developing my technical skills while making a meaningful contribution to the teams I work with.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'fa8d6c55-6c7c-4ba1-80ea-c784cc90fec9', 'c3852f68-3169-4d4a-9d89-33b6edbf8e52', 'https://api.dicebear.com/10.x/miniavs/svg?seed=mihlali-yono-f8GyYChy0PZP0gDtBZET9jnqh2SyR8.webp', '', 'https://github.com/MihlaliY', '', 'https://youtu.be/3lhLZsHbU2Y?si=Vl_-roIGQ8a048wP', true, '2026-08-14 08:50:08.668102+00', 'mihlali-yono-6f829522', '07bcd365-de47-42d7-87db-99c537a18e00', 'Full-stack software development with experience across frontend and backend technologies, including Angular, Java, Spring Boot, JavaScript, Python and SQL. Also experienced in data analysis and reporting, with exposure to PostgreSQL, Power BI, REST APIs, AWS and Agile/Scrum practices.'),
	('52294937-70bb-438b-8108-44d05056efbf', 'Mihlali Masango', 'I am a Junior Full-Stack Developer with a strong interest in front-end development and creating clean, intuitive user experiences. I enjoy turning ideas into interfaces that are easy to use while developing my understanding of the backend systems that support them. My experience at ABSA has given me exposure to UI/UX improvements, front-end development and working with client data. I am detail-oriented, ask thoughtful questions and enjoy solving problems with others. I take pride in delivering quality work and continuously developing my technical skills.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'fa8d6c55-6c7c-4ba1-80ea-c784cc90fec9', 'c3852f68-3169-4d4a-9d89-33b6edbf8e52', 'https://api.dicebear.com/10.x/miniavs/svg?seed=christian-masango-QsN0kqPxa1KiR41NY3cjF37Dmys3TY.webp', '', 'https://github.com/masango2207', '', 'https://youtu.be/hOB7FubGQjU?si=CYIjYc_DUDBZAzIz', true, '2026-08-14 09:04:45.347615+00', 'christian-masango-52294937', '07bcd365-de47-42d7-87db-99c537a18e00', 'Full-stack development with a particular strength in front-end development, UI/UX and user-focused application design. Experienced with Angular, TypeScript, JavaScript, HTML, CSS, Spring Boot, Java and PostgreSQL, with additional exposure to Git/GitHub, Figma and working with client data in an enterprise banking environment.'),
	('affacf6c-4bd8-4854-bfe4-1cf616357612', 'Christian Naidoo', 'I am a Quality Assurance Engineer with a Bachelor of Information and Communication Technology and a strong interest in delivering reliable, high-quality software. I enjoy understanding how applications should work, validating requirements and identifying issues before they reach users. My experience in QA has given me practical exposure to test design, regression testing, defect reporting and working closely with developers, while my software development background helps me understand the systems I am testing. I am detail-oriented, committed to learning and take pride in the quality of my work.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'fa8d6c55-6c7c-4ba1-80ea-c784cc90fec9', 'c3852f68-3169-4d4a-9d89-33b6edbf8e52', 'https://api.dicebear.com/10.x/miniavs/svg?seed=sibonelo-maphelana-sxBh1XRsmbiHSZDpzSw6RmfRIDuyk6.webp', '', 'https://github.com/SiboneloMaphelana', '', '', true, '2026-08-14 09:29:24.301995+00', 'sibonelo-maphelana-affacf6c', '07bcd365-de47-42d7-87db-99c537a18e00', 'Quality Assurance and software testing with experience in requirements analysis, test case design and execution, defect reporting, regression, sanity testing, retesting and test data preparation. Supported by a full-stack development foundation across Java, Spring Boot, Angular, TypeScript, JavaScript, SQL, PostgreSQL, REST APIs and Git/GitHub.'),
	('5bcdae8c-e30b-483c-ae04-33982cafbc7e', 'Sibonelo Khumalo', 'I am an Entry-Level Solution Analyst at Absa with a background in Software Engineering and Full-Stack Development. I enjoy understanding how business needs translate into technical solutions and how different systems work together to solve real problems. My current role has given me practical experience analysing requirements, creating SRS documents and solution diagrams, supporting UAT and collaborating with Business Analysts, developers and Solution Architects. I am analytical, detail-oriented and curious by nature, and I enjoy learning how technology can be applied to improve business processes. I am particularly interested in growing my skills in solution architecture, cloud technologies and technical problem-solving.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'fa8d6c55-6c7c-4ba1-80ea-c784cc90fec9', 'c3852f68-3169-4d4a-9d89-33b6edbf8e52', 'https://api.dicebear.com/10.x/miniavs/svg?seed=nomthandazo-khumalo-ntAOBVtMxLLItJgIQn9FNysvoHZolz.webp', '', 'https://github.com/Nomthandazo45', '', 'https://youtu.be/sQ5RVaWa69c?si=De8wBb0ZHlwvxqLF', true, '2026-08-14 09:35:58.374114+00', 'nomthandazo-khumalo-5bcdae8c', '07bcd365-de47-42d7-87db-99c537a18e00', 'Solution analysis and software development with experience translating business requirements into technical requirements, preparing SRS documentation and solution diagrams, and supporting UAT and API testing. Full-stack foundation across Java, Spring Boot, Angular, TypeScript, JavaScript and PostgreSQL, with exposure to REST APIs, Azure, AWS, Agile/Scrum and solution architecture practices.'),
	('92066740-f3f4-4ae3-ac04-9ed6f42fc8f1', 'Nomthandazo Govender', 'I am a junior full-stack developer with a National Certificate in IT Systems Support (NQF 5) and a growing foundation in web development and version control. I enjoy learning new technologies, working through unfamiliar challenges and applying feedback to improve my skills. I bring an adaptable mindset to development and am eager to build on my technical foundation through hands-on experience in a professional environment.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'ac6f2b14-1230-4a9a-b762-989a6df8f8e9', '639e765d-5245-4c10-88cc-96288e63521e', 'https://api.dicebear.com/10.x/miniavs/svg?seed=tshepo-sambo-uOb6x9.webp', '', 'https://github.com/PerrisTshepo', '', 'https://youtu.be/4gf7cSPPW2E?si=pz0QKZqIH9DmRvXv', true, '2026-08-13 16:33:09.585845+00', 'tshepo-sambo-92066740', '07bcd365-de47-42d7-87db-99c537a18e00', 'Web development fundamentals with HTML and CSS, PostgreSQL database experience, and Git/GitHub for version control and collaborative development. Brings a strong willingness to learn, adapt to new technologies, and apply feedback, with a developing foundation for contributing to full-stack development teams.'),
	('01504d89-dc7d-4999-a46e-0762c7419872', 'Tshepo Mbokazi', 'I am a Junior Salesforce Developer with a strong interest in building user-friendly, reliable and efficient digital solutions. My current experience in Product Engineering has given me practical exposure to developing and updating Salesforce functionality, responding to business needs and supporting production issues. I enjoy understanding how systems work together and finding practical ways to improve the user experience. I am curious, creative and committed to continuous learning, while valuing clear communication and collaboration. I take pride in building solutions that are accurate, maintainable and useful to the people who rely on them.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'fa8d6c55-6c7c-4ba1-80ea-c784cc90fec9', 'c3852f68-3169-4d4a-9d89-33b6edbf8e52', 'https://api.dicebear.com/10.x/miniavs/svg?seed=thandolwethu-mbokazi-yA67kP.webp', '', 'https://github.com/Tundoor', '', 'https://youtu.be/41dHhlHcfP0?si=FOlDhzJ6dRUHZt69', true, '2026-08-14 09:41:36.544903+00', 'thandolwethu-mbokazi-01504d89', '07bcd365-de47-42d7-87db-99c537a18e00', 'Salesforce development and product engineering with experience building and updating CRM functionality, supporting production incidents and researching APIs and system integrations. Technical foundation across JavaScript, TypeScript, Angular, HTML/CSS and PostgreSQL, with additional experience using Git/GitHub, AWS, Figma and Agile/Scrum practices.'),
	('1b5eb134-dada-4c9a-8bc6-b05f60d69b52', 'Thandolwethu Moosa', 'I am a Junior Full-Stack Developer with a degree in Information Technology and practical experience across software development and test automation. I enjoy building reliable applications while also thinking about how they can be tested, improved and made more robust. My current experience includes developing frontend and backend features, creating automated tests and working with databases to validate application behaviour. I am curious, detail-oriented and enjoy solving technical problems through a combination of development, testing and continuous learning. I am particularly interested in opportunities where I can continue growing across software engineering and automation.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'fa8d6c55-6c7c-4ba1-80ea-c784cc90fec9', 'c3852f68-3169-4d4a-9d89-33b6edbf8e52', 'https://api.dicebear.com/10.x/miniavs/svg?seed=lehlohonolo-masipa-nX4QYjZj2EJsTZZmyVQgno9p2Iu6zt.webp', '', 'https://github.com/hlogi10122', '', '', true, '2026-08-14 09:47:21.261449+00', 'lehlohonolo-masipa-1b5eb134', '07bcd365-de47-42d7-87db-99c537a18e00', 'Full-stack development and test automation, with practical experience building frontend and backend features while developing and maintaining automated tests. Experienced with Java, Spring Boot, Angular, JavaScript, PostgreSQL, Selenium and Playwright, with additional exposure to Python, REST APIs, Git/GitHub and relational databases.'),
	('23edd5ea-125a-4bea-856b-3ce16cebe08f', 'Lehlohonolo Nkosi', 'I am a Salesforce QA Tester with practical experience in manual and automation testing within Salesforce-based applications. I enjoy understanding business requirements, investigating how systems behave and identifying issues that could affect users or business processes. My experience includes functional, regression, sanity, integration and end-to-end testing, giving me exposure to different stages of the testing lifecycle. I am a curious and methodical problem-solver who communicates clearly, asks questions when needed and enjoys working with others to deliver reliable, high-quality software.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'fa8d6c55-6c7c-4ba1-80ea-c784cc90fec9', 'c3852f68-3169-4d4a-9d89-33b6edbf8e52', 'https://api.dicebear.com/10.x/miniavs/svg?seed=ntokozo-nkosi-zpCo4kZRqXu3zRlTfjYqbJhnxc6ArM.webp', '', 'https://github.com/NtokozoMitchell', '', '', true, '2026-08-14 10:08:36.943967+00', 'ntokozo-nkosi-23edd5ea', '07bcd365-de47-42d7-87db-99c537a18e00', 'Quality Assurance and software testing across Salesforce-based applications, with experience in functional, regression, sanity, integration and end-to-end testing. Technical foundation in Angular, TypeScript, Spring Boot, PostgreSQL and C#/.NET, with hands-on exposure to Salesforce, Sapiens, MuleSoft, Jira, QMetry, Selenium, Git/GitHub and Agile/Scrum.'),
	('923f3d93-b331-4d03-ac87-4211f8211675', 'Ntokozo Chetty', 'I am a Junior Full-Stack Developer with an NQF Level 6 Diploma in Computer Science and two years of professional experience across software development and QA automation. My experience has given me a strong foundation in backend development, API integration and automated testing, while also giving me exposure to the wider software development lifecycle. I enjoy solving technical problems, understanding how systems work together and building solutions that are reliable and maintainable. I am analytical and methodical in my approach, enjoy working with others and am always looking for opportunities to strengthen my technical skills and take on new challenges.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'fa8d6c55-6c7c-4ba1-80ea-c784cc90fec9', 'c3852f68-3169-4d4a-9d89-33b6edbf8e52', 'https://api.dicebear.com/10.x/miniavs/svg?seed=ofentse-molefe-7nUU9vrYZTE30UkkdEB97HHNK9OKMM.webp', '', 'https://github.com/OfentseMolefe', '', '', true, '2026-08-14 10:01:01.08722+00', 'ofentse-molefe-923f3d93', '07bcd365-de47-42d7-87db-99c537a18e00', 'Full-stack development and QA automation, with two years of professional experience across backend development, API integration and software testing. Strong experience with Java, Spring Boot, Angular, PostgreSQL, REST APIs, Selenium and Playwright, supported by skills in TypeScript, JavaScript, Git/GitHub, Docker, AWS and Agile/Scrum.'),
	('b15eb9e6-5d76-416e-8ab7-489c93587943', 'Ofentse Mudau', 'I am a junior full-stack developer with a Matric Certificate and a strong interest in front-end development and creating responsive, user-friendly interfaces. I enjoy turning ideas into practical digital experiences and learning how different technologies come together to build useful applications. I communicate openly, value collaboration and feedback, and am eager to grow my skills while contributing to a development team.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'ac6f2b14-1230-4a9a-b762-989a6df8f8e9', '639e765d-5245-4c10-88cc-96288e63521e', 'https://api.dicebear.com/10.x/miniavs/svg?seed=millicent-mosia-PmgwjcPKTWY0haLya1wi4U54TcOlmj.webp', '', 'https://github.com/MosiaMill', '', 'https://youtu.be/3A_IvsbFZiY?si=rPvLVbADQdNsiG9D', true, '2026-08-13 14:59:37.669133+00', 'millicent-mosia-b15eb9e6', '07bcd365-de47-42d7-87db-99c537a18e00', 'Frontend-focused development with experience creating responsive, user-friendly interfaces. Skilled in Angular, HTML, CSS, Java and PostgreSQL, with Git/GitHub experience and a foundation in full-stack application development.'),
	('46658859-27eb-415c-aca3-c91fff193a96', 'Millicent Jordaan', 'I am a junior full-stack developer with a National Certificate in Business Analysis Support Practice (NQF 5). I am interested in understanding problems, breaking them down into manageable steps and finding practical solutions. I bring a persistent, structured approach to challenges and enjoy learning through hands-on technology projects. I am looking forward to developing my technical skills while contributing to solutions that address real-world needs.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'ac6f2b14-1230-4a9a-b762-989a6df8f8e9', '639e765d-5245-4c10-88cc-96288e63521e', 'https://api.dicebear.com/10.x/miniavs/svg?seed=promise-kamanga-jACCNDMRSaBi6AsrsyXfTT0fPnTn3b.webp', '', 'https://github.com/ThePromise-Land', '', '', true, '2026-08-13 15:13:59.448683+00', 'promise-kamanga-46658859', '07bcd365-de47-42d7-87db-99c537a18e00', 'Full-stack development with a foundation in application logic, problem-solving and structured analysis. Experienced with Angular, JavaScript, Java, HTML, CSS and PostgreSQL, with Git/GitHub supporting collaborative development.'),
	('7b33be02-0d93-4182-8cd5-4f60888ea04e', 'Promise Lefyedi', 'I am a QA Automation Tester with a background in software development and a strong interest in software quality, automation and technology. I enjoy understanding how systems work, identifying issues and using automation to make testing more efficient and reliable. My experience includes working with Java, Selenium, SQL, Spring Boot and Angular, giving me a useful understanding of both software development and testing. I am detail-oriented, analytical and collaborative, and I enjoy solving technical problems, learning new technologies and contributing to the delivery of reliable, high-quality software.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'fa8d6c55-6c7c-4ba1-80ea-c784cc90fec9', 'c3852f68-3169-4d4a-9d89-33b6edbf8e52', 'https://api.dicebear.com/10.x/miniavs/svg?seed=kgalalelo-lefyedi-5B5iSRoZ1M5hUEMRkkw46mHxKoMP0F.webp', '', 'https://github.com/kgalalelo-12', '', 'https://youtu.be/_1ChBLTM9pg?si=eFPPKrslMq2pg2fm', true, '2026-08-17 06:53:34.957826+00', 'kgalalelo-lefyedi-7b33be02', '07bcd365-de47-42d7-87db-99c537a18e00', 'QA automation and software testing, with experience creating and maintaining automated test scripts using Java and Selenium, alongside functional, regression and defect testing. Strong foundation in software development with Java, JavaScript, Angular and Spring Boot, supported by SQL and PostgreSQL database experience. Comfortable working with Git/GitHub, Postman and Agile development environments. Brings strong attention to detail, analytical problem-solving, reliability and a focus on delivering quality outcomes.'),
	('e666230e-8692-48ba-ac42-0779bc862919', 'Kgalalelo Pienaar', 'I am a Junior SharePoint Specialist with practical experience supporting SharePoint Online solutions, business process automation and digital solutions. I enjoy understanding business challenges and translating them into practical technology solutions that improve processes and user experiences. My technical interests include SharePoint development, Microsoft 365, Power Platform, automation, software development, cloud technologies and data. I bring a structured, analytical approach to problem-solving, along with strong attention to detail, collaboration and a commitment to continuous learning.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'fa8d6c55-6c7c-4ba1-80ea-c784cc90fec9', 'c3852f68-3169-4d4a-9d89-33b6edbf8e52', 'https://api.dicebear.com/10.x/miniavs/svg?seed=musa-gumede-qbDl4J4wrLWoNueZyijN7x9Vui3Api.webp', '', 'https://github.com/211Grace', '', 'https://youtu.be/fYHEBXWxwto?si=nfyTOROyXbo3Tpmi', true, '2026-08-17 13:58:06.990134+00', 'musa-gumede-e666230e', '07bcd365-de47-42d7-87db-99c537a18e00', 'Practical experience in SharePoint development and Microsoft Power Platform, with a foundation in full-stack software development. Skilled across SharePoint Online, Power Automate, Power Platform and SPFx, with additional experience in Angular, React, Java, Spring Boot, TypeScript, JavaScript, PostgreSQL, SQL, Azure, Power BI and REST APIs. Holds Microsoft DP-800 certification, with an interest in digital transformation, process automation, cloud technologies and data-driven solutions.'),
	('d4a39bfc-129d-4a15-af35-f7f68da0a07a', 'Musa Mosia', 'I am a Digital and Automation Platforms Engineer and SharePoint Developer with a Bachelor of Agriculture in Animal Production and a background in software development. I have built my technology experience through hands-on development and technical training, with a particular interest in application development, automation and digital transformation. I enjoy turning business requirements into practical digital solutions that simplify processes and improve user experiences. I bring strong problem-solving, adaptability and attention to detail, and enjoy taking ownership of solutions from understanding the requirement through to development, testing and delivery.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'fa8d6c55-6c7c-4ba1-80ea-c784cc90fec9', 'c3852f68-3169-4d4a-9d89-33b6edbf8e52', 'https://api.dicebear.com/10.x/miniavs/svg?seed=nkele-mosia-hY6w3n.webp', '', 'https://github.com/NkeleMosia', '', '', true, '2026-08-17 08:16:38.704225+00', 'nkele-mosia-d4a39bfc', '07bcd365-de47-42d7-87db-99c537a18e00', 'Digital application development and automation, with strong practical experience across Microsoft Power Platform, including Power Apps, Power Automate, SharePoint, Dataverse and Power BI. Experienced in developing business applications, workflow automation and SPFx web parts using React, TypeScript, HTML and CSS, with additional exposure to JavaScript, Angular, PostgreSQL and Git/GitHub. Strong at translating business requirements into practical solutions, with demonstrated ownership across development, testing and delivery.'),
	('ce39fc2e-4a33-412d-a4d4-77730fb32e6e', 'Nkele Fourie', 'I am a Software Developer and Data Analyst with a strong foundation in full-stack development and a growing focus on data and backend systems. I enjoy working with data, understanding how systems connect, and developing practical solutions that improve processes. My experience includes software development, data analysis and supporting data migration through SQL-based testing and validation. I bring a problem-solving mindset, attention to detail and a willingness to learn, and I am motivated by opportunities to grow my technical skills while contributing to solutions that have a real business impact.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'fa8d6c55-6c7c-4ba1-80ea-c784cc90fec9', 'c3852f68-3169-4d4a-9d89-33b6edbf8e52', 'https://api.dicebear.com/10.x/miniavs/svg?seed=tawanda-kasunzuma-I1Dk0Vz3uSoCk0npzFsXwKxw3R0Gtk.webp', '', 'https://github.com/tawandakasunzuma', '', 'https://youtu.be/fNDM1_oWhaA?si=9eyoerymCkA1DGcS', true, '2026-08-17 07:52:52.225293+00', 'tawanda-kasunzuma-ce39fc2e', '07bcd365-de47-42d7-87db-99c537a18e00', 'Full-stack development and data analysis, with experience across Java, JavaScript, React, Angular, HTML/CSS and Git/GitHub. Strong practical exposure to Oracle SQL and Microsoft SQL Server, including data validation, migration testing, transformation workflows and investigating data discrepancies. Brings analytical problem-solving, attention to detail and adaptability, with an interest in backend and data-focused solutions.'),
	('645a6e37-9799-4dd4-abe9-617516f57859', 'Tawanda Biyela', 'I am a junior full-stack developer with a National Diploma in Management Assistant and an interest in building complete web applications from the user interface through to the backend. My background has helped me develop an organised, business-minded approach to my work, while my software development experience has strengthened my technical problem-solving skills. I enjoy learning new technologies, contributing ideas and taking ownership of my work as I continue growing as a developer.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'ac6f2b14-1230-4a9a-b762-989a6df8f8e9', '639e765d-5245-4c10-88cc-96288e63521e', 'https://api.dicebear.com/10.x/miniavs/svg?seed=thembeka-biyela-sXwXJiBrGbyRSumdvly5QbChHU0E62.webp', '', 'https://github.com/Thembeka1/Thembeka1', '', 'https://youtu.be/HYWvwfGMZCA?si=3mN7k65iu9dsugYE', true, '2026-08-13 16:15:16.335443+00', 'thembeka-biyela-645a6e37', '07bcd365-de47-42d7-87db-99c537a18e00', 'Full-stack web development across front-end and back-end technologies, including Angular, React, Bootstrap, ExpressJS, Spring Boot and Java. Experienced with PostgreSQL and Git/GitHub, with a strong interest in building complete web applications and understanding how different components work together. Brings an organised, business-minded approach to development, with strengths in collaboration, communication, taking ownership, and learning new technologies.'),
	('77ee2dd3-3533-4bb1-a9c2-16d0a64dfd47', 'Thembeka Botha', 'I am a Junior Full-Stack Developer currently working as an Automation QA Tester, with a strong interest in software quality, test automation and technology. I have a Matric Certificate and a Web Development Certificate from SheCodes, with hands-on experience in Java, Selenium WebDriver, SQL, Postman, GitHub, Jira and QMetry. I enjoy understanding how applications work, investigating issues and exploring ways to make testing more effective. I am analytical, detail-oriented and curious, and I value collaboration, continuous learning and adapting to new technologies. I am particularly interested in growing my automation skills while contributing to reliable, high-quality software.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'fa8d6c55-6c7c-4ba1-80ea-c784cc90fec9', 'c3852f68-3169-4d4a-9d89-33b6edbf8e52', 'https://api.dicebear.com/10.x/miniavs/svg?seed=neo-montshiwa-76dRt4.webp', '', 'https://github.com/nene-hue', '', 'https://youtu.be/Uwyq9IQ-xbM?si=RZHc9SGw2u6lH2Ue', true, '2026-08-17 14:12:57.527599+00', 'neo-montshiwa-77ee2dd3', '07bcd365-de47-42d7-87db-99c537a18e00', 'Software testing and automation with a foundation in full-stack development. Experienced with Java, Selenium WebDriver, SQL, Postman, QMetry, Jira and Git/GitHub, with growing experience in Playwright. Technical foundation also includes Angular, Spring Boot, PostgreSQL, TypeScript, JavaScript, HTML and CSS, with exposure to AWS and REST APIs. Brings strong analytical and problem-solving skills to investigating test failures, validating application behaviour and improving test coverage.'),
	('c2b6a59b-bb8d-4d20-98bc-6dc858d21722', 'Neo Boase', 'I am a Junior Full-Stack Developer with an NQF Level 6 Diploma in Computer Science and practical experience in software development and Salesforce product engineering. My current role has given me hands-on experience developing Salesforce functionality, automating business processes and troubleshooting application issues within an enterprise environment. I enjoy understanding business needs and translating them into practical technology solutions that improve processes and user experiences. I am a curious and committed learner who enjoys solving problems, contributing ideas and working with others to deliver quality solutions.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'fa8d6c55-6c7c-4ba1-80ea-c784cc90fec9', 'c3852f68-3169-4d4a-9d89-33b6edbf8e52', 'https://api.dicebear.com/10.x/miniavs/svg?seed=lesego-boase-12srXhMeqKqPXqrYJWo25lXVe62Aoy.webp', '', 'https://github.com/lesego-lab23', '', 'https://youtu.be/Xg0JjTCqibk?si=3g3r4JRzFxzoIo9W', true, '2026-08-14 10:04:43.710612+00', 'lesego-boase-c2b6a59b', '07bcd365-de47-42d7-87db-99c537a18e00', 'Full-stack and Salesforce development, with experience building and maintaining enterprise applications and CRM solutions. Skilled in Java, Spring Boot, Angular, JavaScript, TypeScript, PostgreSQL and REST APIs, with practical Salesforce experience across Apex, Lightning Web Components and Flows. Experienced in troubleshooting, Agile delivery and collaborating with technical and business stakeholders.'),
	('94638a3c-c959-4d13-a7ba-666ece12366f', 'Lesego Van der Merwe', 'I am a Junior Product Engineer with a National Diploma in Information Technology (Software Development) and a strong interest in software engineering, AI engineering and emerging technologies. I enjoy building applications that solve real business problems, improve processes and create better user experiences. My technical experience includes C#, .NET, PostgreSQL, Docker, Git, AWS and modern web development frameworks. I bring a practical, adaptable approach to problem-solving and enjoy understanding how systems work, working collaboratively and turning business requirements into effective technical solutions. I am particularly interested in exploring how AI can be integrated into software to create more intelligent and efficient applications.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'fa8d6c55-6c7c-4ba1-80ea-c784cc90fec9', 'c3852f68-3169-4d4a-9d89-33b6edbf8e52', 'https://api.dicebear.com/10.x/miniavs/svg?seed=lebogang-raphela-fY5ysD.webp', '', 'https://github.com/LeboRobin', '', 'https://youtu.be/orKI_eIDh3Q?si=qzT1EGmr0caD9eg1', true, '2026-08-17 14:18:59.025717+00', 'lebogang-raphela-94638a3c', '07bcd365-de47-42d7-87db-99c537a18e00', 'Full-stack software development with practical experience in C#, .NET, PostgreSQL, Docker, Git/GitHub, Angular, React, TypeScript, JavaScript, HTML and CSS. Experienced in backend development, API integration, business logic, database development and application delivery, with exposure to AWS, Azure, REST APIs, Agile/Scrum and Microsoft Power Automate. Brings a strong interest in software engineering and AI engineering, with a particular curiosity around emerging technologies and their application to practical business problems.'),
	('87945c32-0e99-4ce3-bd31-eb81df7d456f', 'Lebogang Mulaudzi', 'I am a Junior Data Analyst and Software Developer with a Matric Certificate and an NQF 5 IT Systems Support qualification in progress. I enjoy working at the intersection of data and technology, particularly where I can analyse, validate and transform data while also building practical digital solutions. My current experience has given me exposure to data migration, data quality and analysis within a banking environment, alongside a growing foundation in software development. I am curious, detail-oriented and committed to continuous learning, with a strong interest in using technology to solve real-world problems.', '9d054ecd-b644-44ae-aafe-dffc59d63e1f', '6bbeca3f-93e5-4869-9066-dfb62cda67b6', 'fa8d6c55-6c7c-4ba1-80ea-c784cc90fec9', 'c3852f68-3169-4d4a-9d89-33b6edbf8e52', 'https://api.dicebear.com/10.x/miniavs/svg?seed=tshepo-moloi-F9FkhvSR7MfLzqT77fYe2B6q3jhlTc.webp', '', 'https://github.com/SifisoMoloi', '', 'https://youtu.be/t-q_Z1pWov8?si=sMUZk1rVgn7UTlCt', true, '2026-08-14 11:43:14.92363+00', 'tshepo-moloi-87945c32', '07bcd365-de47-42d7-87db-99c537a18e00', 'Data analysis, validation and migration with practical experience working with Hadoop, Ataccama, PostgreSQL, DBeaver and Excel. Developing software development capability across HTML, CSS, Angular and Spring Boot, with experience using Git/GitHub and PostgreSQL. Brings a combination of analytical thinking and software development interest, supported by strong attention to detail, problem-solving, collaboration and a willingness to learn.');


--
-- Data for Name: endorsements; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."endorsements" ("id", "endorser_name", "message", "created_at", "talent_id") VALUES
	('cdb3cd0d-0e2e-4f91-a01e-e97a3b269d64', 'Learning Facilitator: Software Developer, Shaper', 'Dineo takes responsibility for coordinating work and supporting team members to achieve shared goals. They analyse challenges logically, develop practical solutions, and help keep projects moving forward through effective planning and collaboration.', '2026-08-13 14:10:49.813365+00', '8a972967-f13c-4722-b26e-9edbd43d015f'),
	('d980e589-c857-443e-9685-138deea843be', 'Learning Facilitator: Software Developer, Shaper', 'Charlotte contributes positively in team environments by understanding their strengths, seeking feedback, and communicating openly when challenges arise. They support team members, take responsibility for assigned tasks, and help coordinate activities to achieve shared objectives.', '2026-08-13 14:34:06.738363+00', 'a43d684d-7c4a-4ae8-bb73-b6ada59f50d4'),
	('f4913c12-ce2e-4f4b-a4b6-e0ae74838eef', 'Learning Facilitator: Software Developer, Shaper', 'Nomali remains focused and continues contributing to team objectives when faced with challenges or changing priorities. They work cooperatively with others, support shared goals, and demonstrate a willingness to adapt while maintaining productivity.', '2026-08-13 14:38:42.625029+00', '982fe23a-d160-460b-9824-1a1f74d8ace9'),
	('f4c243db-34b8-42e0-b006-1f397a46ae7f', 'Learning Facilitator: Software Developer, Shaper', 'Nonjabulo demonstrates professional workplace behaviour by treating others with respect and responding constructively to feedback. They maintain a positive attitude in team settings and contribute to a respectful and supportive working environment.', '2026-08-13 15:11:25.643274+00', '4015bb73-6af2-44a8-a8b5-79c669b77a3c'),
	('8f5c3b38-8171-45c6-a124-2e04f5dcaef2', 'Learning Facilitator: Software Developer, Shaper', 'Sakhile actively contributes to team activities by completing assigned responsibilities and voluntarily assisting peers when additional support is needed. They work collaboratively, communicate respectfully, and contribute to achieving shared objectives.', '2026-08-13 16:09:10.898067+00', 'df3e97a3-e768-439f-b1ef-97fe730af513'),
	('29285d18-073f-42ef-b6a0-6683afa17516', 'Learning Facilitator: Software Developer, Shaper', 'Thembeka works collaboratively by sharing ideas, providing updates, and contributing to discussions that support team outcomes. They have become more confident in communicating their thoughts and taking ownership of assigned responsibilities.', '2026-08-13 16:16:09.944378+00', '645a6e37-9799-4dd4-abe9-617516f57859'),
	('ba06be51-b3fd-4e2d-b138-305142f5f6e7', 'Learning Facilitator: Software Developer, Shaper', 'Xolelwa takes responsibility for coordinating work and supporting team members to achieve shared goals. They analyse challenges logically, develop practical solutions, and help keep projects moving forward through effective planning and collaboration.', '2026-08-13 16:34:52.917819+00', '7aac9d59-0f77-42fb-8e3d-2323ac2bb524'),
	('73cbc672-c44e-4f18-aec5-f3f4211ab496', 'Learning Facilitator: Software Developer, Shaper', 'Bonga is a dedicated and hardworking professional with strong problem-solving abilities. He consistently brings thoughtful and innovative ideas to the table and demonstrates exceptional logical thinking and development skills. He is focused on delivering high-quality results, adheres to best-practice coding standards, and follows established procedures diligently. Bonga is reliable and dependable, consistently showing up prepared, engaged, and on time.', '2026-08-14 08:30:58.201324+00', '010dc68d-dd48-41e6-abd7-4970ce7af1d4'),
	('da9e8a00-f7f3-4845-83f3-160f0850c668', 'Learning Facilitator: Software Developer, Shaper', 'Katlego is a highly reliable and dedicated individual who consistently ensures that tasks are seen through to completion. She is innovative and has a strong ability to translate ideas into practical, well-executed solutions. She excels at research, carefully identifying best practices and selecting the most appropriate tools to achieve optimal outcomes. Humble by nature, she allows the quality and impact of her work to speak for itself.', '2026-08-14 08:44:08.123221+00', 'df26e137-7589-4007-8333-8340dfce7654'),
	('faf23837-40bf-4b7c-a69b-cfc1dfa5b2f1', 'Learning Facilitator: Software Developer, Shaper', 'Mihlali is reliable, punctual, and makes the most of every minute while working. She carefully analyses each task and takes time to understand it thoroughly in her own way. She approaches problems step by step, which makes her an effective problem solver. Mihlali works well within a team, collaborates effectively, and demonstrates strong presentation skills', '2026-08-14 08:52:14.833857+00', '6f829522-191e-4646-b1cb-40cf79cf50e5'),
	('348ce125-ceab-4bea-95c2-e00c0c0ec38c', 'Learning Facilitator: Software Developer, Shaper', 'Thuli approaches learning with enthusiasm and a positive mindset. She is proactive in reporting progress, receptive to feedback, and adapts quickly to changes. She works well in a team environment and maintains a professional and respectful attitude.', '2026-08-14 08:58:08.667894+00', 'd0625fac-5a4d-409e-bebd-1fa30a6aaf71'),
	('77b49ce8-4597-4a0a-bc6b-6bad3a7374c5', 'Learning Facilitator: Software Developer, Shaper', 'Christian is a resilient and driven team member who has shown significant improvement in articulating his ideas and collaborating effectively with others. He communicates blockers clearly and raises them early, enabling timely resolution. He displays solid leadership skills, confidently holding his ground and motivating the team to maintain high standards when momentum dips. He is reliable and dependable, consistently arriving on time and showing up every day.', '2026-08-14 09:06:15.150127+00', '52294937-70bb-438b-8108-44d05056efbf'),
	('08e844b9-5f3a-40a9-a0e4-607d2913c338', 'Learning Facilitator: Software Developer, Shaper', 'Nomthandazo is a highly innovative professional with a strong ability to translate ideas into intuitive, user-centred UI/UX designs. She demonstrates effective leadership skills, communicates clearly and proactively, and ensures alignment by raising potential risks or blockers early. Nomthandazo is results-driven, consistently focusing on delivering high-quality outcomes and driving initiatives through to completion.', '2026-08-14 09:39:40.718059+00', '5bcdae8c-e30b-483c-ae04-33982cafbc7e'),
	('d21fa82d-46de-452b-a55b-b378113176d8', 'Learning Facilitator: Software Developer, Shaper', 'Lehlohonolo consistently puts significant effort into improving his skills and approaches challenges head-on. He willingly invests extra time to upskill himself and ensure timely delivery of his work. Highly career-driven, he actively seeks opportunities to learn and grow. A reliable and hardworking individual, he consistently delivers on time and demonstrates strong problem-solving abilities.', '2026-08-14 09:49:15.922822+00', '1b5eb134-dada-4c9a-8bc6-b05f60d69b52'),
	('79b91852-b8ca-4227-9c93-c5a971a66cc0', 'Learning Facilitator: Software Developer, Shaper', 'Lesego is a dedicated and hardworking individual who consistently goes the extra mile to ensure tasks are completed successfully. She adds value by contributing insightful ideas and collaborating effectively with her team. She confidently seeks clarity when needed and shares her opinions constructively. Lesego also demonstrates strong presentation skills.', '2026-08-14 10:06:45.307463+00', 'c2b6a59b-bb8d-4d20-98bc-6dc858d21722'),
	('54f56b1a-fff7-4798-aa7a-a3536be4a025', 'Learning Facilitator: Software Developer, Shaper', 'Tshepo is a focused and committed individual who approaches tasks with care and attention to detail. He takes responsibility for his work, applies feedback thoughtfully, and shows steady improvement over time. He communicates well, collaborates effectively with her peers, and maintains a positive, professional attitude throughout.', '2026-08-14 11:46:24.007164+00', '87945c32-0e99-4ce3-bd31-eb81df7d456f'),
	('db93c41e-521a-4fbb-b140-f451dcede057', 'Learning Facilitator: Software Developer, Shaper', 'Tawanda is a motivated learner who puts effort into both his technical and personal development. He adapts well to new concepts, remains open to feedback, and applies suggestions to improve his work. He is reliable and maintains a professional approach at all times.', '2026-08-17 07:54:19.321295+00', 'ce39fc2e-4a33-412d-a4d4-77730fb32e6e'),
	('676d3be8-7e49-4c59-b510-98f3b849a0b4', 'Learning Facilitator: Software Developer, Shaper', 'Neo has strong communication and presentation skills. She approaches problems with an open mind, proactively reports progress on assigned tasks, and addresses challenges head-on. Neo presents herself professionally, listens attentively, is vocal about her ideas, and works well within a team.', '2026-08-17 14:14:51.626552+00', '77ee2dd3-3533-4bb1-a9c2-16d0a64dfd47'),
	('46ef6f2e-7e90-4921-8139-b93899570a38', 'Learning Facilitator: Software Developer, Shaper', 'Busisiwe works effectively within a team by contributing to shared goals, respecting different perspectives, and completing assigned responsibilities. They are receptive to feedback, communicate when support is needed, and demonstrate accountability by taking ownership of their work.', '2026-08-13 14:27:53.040331+00', 'a6e5749f-0dd6-4c58-ac4e-dd148c4c5423'),
	('8bb397bb-d3fe-4075-bc1b-ba3c0847f319', 'Learning Facilitator: Software Developer, Shaper', 'Makgabo collaborates effectively with others by communicating respectfully, listening to different perspectives, and supporting team members when needed. They respond positively to feedback and contribute to a professional and inclusive team environment.', '2026-08-13 14:36:09.241764+00', '2ee9b23c-fe19-4c4f-8414-c9464d44fd1e'),
	('6e9816be-f6c3-4eaa-a0e0-ecf27161da48', 'Learning Facilitator: Software Developer, Shaper', 'Millicent contributes to team success by sharing information, participating in discussions, and working collaboratively to achieve common goals. They communicate clearly with colleagues and ensure tasks are completed through effective coordination and feedback.', '2026-08-13 15:00:37.051158+00', 'b15eb9e6-5d76-416e-8ab7-489c93587943'),
	('2f46f9e0-0da3-48a5-9d6d-87f69ade4375', 'Learning Facilitator: Software Developer, Shaper', 'Promise approaches challenges with persistence and maintains focus on achieving outcomes. They analyse tasks systematically, identify practical solutions, and continue making progress when obstacles arise.', '2026-08-13 15:14:31.875977+00', '46658859-27eb-415c-aca3-c91fff193a96'),
	('39b2891d-7190-4718-9df1-c5c9baeb917a', 'Learning Facilitator: Software Developer, Shaper', 'Sibongile demonstrates professionalism through respectful interactions and consistent adherence to workplace expectations. They collaborate effectively with colleagues, contribute ideas, and support the successful completion of team objectives.', '2026-08-13 16:14:43.588938+00', 'd9da8310-3628-410d-ac87-760737083d46'),
	('8b33cf73-8808-4a01-9a63-68b2ef179e00', 'Learning Facilitator: Software Developer, Shaper', 'Tshepo demonstrates a willingness to learn new concepts and applies feedback to improve performance. They adapt well to changing requirements, embrace new processes, and respond positively to guidance while progressing through programme activities.', '2026-08-13 16:33:54.160313+00', '92066740-f3f4-4ae3-ac04-9ed6f42fc8f1'),
	('b3a4acec-a6a6-4d40-9e13-4bd24846ff4e', 'Learning Facilitator: Software Developer, Shaper', 'Sibongile demonstrates professionalism through respectful interactions and consistent adherence to workplace expectations. They collaborate effectively with colleagues, contribute ideas, and support the successful completion of team objectives.', '2026-08-13 16:47:58.63458+00', 'f7b65f0f-1d5b-4244-ab8a-eff57422a3b6'),
	('0c26db86-9946-4eb8-b5f1-1f3a0ca75a03', 'Learning Facilitator: Software Developer, Shaper', 'Hloniphile adapts quickly and consistently goes the extra mile in learning new concepts. She takes initiative by asking insightful questions and proactively highlighting any blockers. She works effectively both independently and within a team, demonstrating strong collaboration skills. Hloniphile is reliable in delivering work on time, committed to showing up consistently and punctually, and communicates clearly and effectively.', '2026-08-14 08:38:49.166711+00', 'e9502a46-9845-4cec-8583-b4027ecf8f44'),
	('50093426-ed38-4a4b-a5b2-ca8792eb6682', 'Learning Facilitator: Software Developer, Shaper', 'Lungile has strong design skills and enjoys working with Figma. She consistently contributes creative and insightful ideas, demonstrating an artistic approach and the ability to think outside the box. She is reliable, punctual, and puts significant effort into continuously improving both her soft and technical skills.', '2026-08-14 08:49:06.51055+00', 'f0860153-4617-41f4-a089-25f60cde6dbe'),
	('43cee6a7-82ee-4f31-bc6b-e9d1a9349da3', 'Learning Facilitator: Software Developer, Shaper', 'Njabulo is highly committed to upskilling himself and consistently demonstrates a strong work ethic. He contributes positively and works well within a team, showing a genuine hunger for growth and the ability to adapt quickly to change. He follows instructions well and takes initiative by asking questions when requirements are unclear. Njabulo also brings valuable ideas to the table and proactively seeks help when needed.', '2026-08-14 08:54:41.749843+00', '7e6e6fae-4ae4-4f69-a6dd-fb50ce49eafb'),
	('87002646-161f-4bf4-9658-197046580bc7', 'Learning Facilitator: Software Developer, Shaper', 'Lebohang adapts quickly to change and works effectively across different teams. He proactively identifies and communicates blockers, taking initiative to address challenges head-on. He is not hesitant to take initiative or attempt solutions and readily consults others when facing difficulties, demonstrating a strong commitment to learning and collaboration.', '2026-08-14 09:03:05.987432+00', 'af05c47a-d123-433d-8af6-7b8aa4ec036c'),
	('b706a934-3ca1-435f-9283-df0ce3f8c1a1', 'Learning Facilitator: Software Developer, Shaper', 'Sibonelo is a hardworking learner who takes pride in the quality of his work. He manages his time well, stays focused during tasks, and remains committed to meeting expectations. He shows steady progress and a strong willingness to grow.', '2026-08-14 09:33:24.152721+00', 'affacf6c-4bd8-4854-bfe4-1cf616357612'),
	('856cc273-1f4a-4cd8-8534-3e14164eb4e6', 'Learning Facilitator: Software Developer, Shaper', 'Thandolwethu is creative and brings fresh ideas when contributing to group work. She is confident in sharing her thoughts, communicates clearly, and demonstrates good presentation skills. She is eager to learn and continuously looks for ways to improve her performance.', '2026-08-14 09:44:54.19786+00', '01504d89-dc7d-4999-a46e-0762c7419872'),
	('2c21a92a-cdf7-47ba-b0a5-4b0d14aa1efe', 'Learning Facilitator: Software Developer, Shaper', 'Ofentse shows strong analytical thinking and approaches tasks methodically. He is attentive during sessions, follows instructions carefully, and completes his work diligently. He collaborates effectively with peers and is willing to assist others when needed.', '2026-08-14 10:03:07.363081+00', '923f3d93-b331-4d03-ac87-4211f8211675'),
	('c6b4146e-4189-48c6-a261-09bc01250137', 'Learning Facilitator: Software Developer, Shaper', 'Ntokozo demonstrates a positive attitude toward learning and takes ownership of assigned tasks. She is proactive in asking questions when unsure and shows good problem-solving skills by breaking challenges into manageable steps. She works well within a team and communicates clearly.', '2026-08-14 10:11:55.643799+00', '23edd5ea-125a-4bea-856b-3ce16cebe08f'),
	('f4845a32-64a9-42eb-9718-06d6cf10fe8e', 'Learning Facilitator: Software Developer, Shaper', 'Kgalalelo works effectively within a team, communicating clearly during discussions and planning sessions. She consistently completes assigned tasks on time and demonstrates strong reliability by showing up to work daily and punctually. With a strong focus on results, she maintains a clear end goal in mind and dedicates her time and effort toward achieving it. She pays close attention to detail, ensuring a high standard of quality in her work.', '2026-08-17 06:57:38.915499+00', '7b33be02-0d93-4182-8cd5-4f60888ea04e'),
	('dfb46c59-a1ac-4e48-a350-bc9b722d8da2', 'Learning Facilitator: Software Developer, Shaper', 'Nkele is a consistent and dependable learner who approaches tasks with focus and determination. She shows a strong willingness to learn, applies feedback effectively, and steadily improves the quality of her work. She collaborates well with others and contributes positively during discussions.', '2026-08-17 08:18:52.876288+00', 'd4a39bfc-129d-4a15-af35-f7f68da0a07a'),
	('019f5e23-6fa4-4252-b22d-d48053356fd2', 'Learning Facilitator: Software Developer, Shaper', 'Musa has excellent presentation skills and communicates ideas clearly and confidently. She demonstrates strong analytical ability and is proactive in questioning ideas to develop better approaches. With an innovative mindset and strong leadership skills, she solves problems in a structured manner and takes pride in the quality of her work.', '2026-08-17 14:02:03.331593+00', 'e666230e-8692-48ba-ac42-0779bc862919'),
	('b1a37db6-1855-4e0c-954c-00fd848dbfa9', 'Learning Facilitator: Software Developer, Shaper', 'Lebogang has strong presentation skills and interacts confidently with others. She remains focused on completing her work and makes meaningful contributions within a team. Highly professional and reliable, she demonstrates resilience and the ability to bounce back effectively from setbacks. She is proactive in exploring new approaches, demonstrates a strong work ethic, and consistently takes initiative', '2026-08-17 14:22:08.670079+00', '94638a3c-c959-4d13-a7ba-666ece12366f');


--
-- Data for Name: enquiries; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."enquiries" ("id", "email", "company_name", "contact_name", "message", "created_at") VALUES
	('3b85cf36-6988-4893-b135-3266347e0294', 'carmen@shaper.co.za', 'Shaper', 'Carmen Lewis', 'I would like to know more.', '2026-08-12 12:24:54.405833+00'),
	('500ce22e-fb6c-4f4f-9841-5c6b0ad51db4', 'simphiwe@thedigitalacademy.co.za', 'Academy', 'Simphiwe Nkabinde', NULL, '2026-08-13 19:40:51.585432+00'),
	('613a63df-f5fa-43c3-abf0-204557c2f721', 'simphiwe@thedigitalacademy.co.za', 'Boby', 'Simphiwe Nkabinde', NULL, '2026-08-13 19:42:29.18329+00'),
	('62e49e91-0886-4a00-8d43-f014858c23e7', 'simphiwe@thedigitalacademy.co.za', 'Shaper', 'Simphiwe Nkabinde', NULL, '2026-08-14 07:30:31.070542+00'),
	('9cb1d608-4407-4834-9ecd-fcd4c1a6edf2', 'adamdono100@gmail.com', 'Absa', 'Adam Kry', 'Loved this testing', '2026-08-14 08:38:28.17211+00'),
	('2c2eb31f-5c47-49a5-bf59-0a9754b375a6', 'simphiwe@thedigitalacademy.co.za', 'Boby', 'Simphiwe Nkabinde', NULL, '2026-08-14 09:11:49.591096+00'),
	('8a8eeff1-cf33-47b9-9776-dcd2b685e66b', 'adamdono100@gmail.com', 'Amanzi', 'Adam Don', 'Testing', '2026-08-14 09:29:03.202822+00'),
	('a27bcc6a-c0cf-40b9-b4c6-50d6aa9f64fe', 'simphiwe@thedigitalacademy.co.za', 'Boby', 'Simphiwe Nkabinde', NULL, '2026-08-14 09:38:57.784754+00'),
	('d3de72d1-ecee-4b5c-9e8c-a0792a43bb36', 'simphiwe@thedigitalacademy.co.za', 'test', 'Simphiwe Nkabinde', NULL, '2026-08-14 09:57:33.740357+00'),
	('ca15e005-2e48-438d-91ba-9999d29df159', 'carmen@shaper.co.za', 'Shaper', 'Carmen Lewis', 'I require more information.', '2026-08-14 13:17:29.760266+00'),
	('59ac39ee-790d-4fef-94f5-79f7b5b2559e', 'carmen@shaper.co.za', 'Shaper', 'Carmen Lewis', 'Test test', '2026-08-14 14:30:23.975823+00'),
	('c64e9815-826e-4748-8475-4c01163bab55', 'brandon@shaper.co.za', 'Shaper', 'Brandon', 'Howzit! Testing', '2026-08-14 15:15:25.713547+00'),
	('3ff8d9bf-7234-4454-9b87-5cf1742143ed', 'adamdono100@gmail.com', 'Testing', 'BU', 'Testing if the Shaper changed', '2026-08-17 06:17:25.669803+00'),
	('9aa70e9d-310b-447d-bb21-37e88959397f', 'adamdono100@gmail.com', 'Amanzi', 'Adam Don', 'Testing sender', '2026-08-17 06:22:30.594131+00'),
	('7b34e1ed-9292-47fa-84f4-ceeb55b22151', 'adamdono100@gmail.com', 'Amanzi', 'BU', 'testing', '2026-08-17 08:50:28.242492+00'),
	('a5a86333-0384-4431-858b-afa7c137a905', 'adamdono100@gmail.com', 'Absa', 'Adam Kry', 'testing', '2026-08-17 08:52:16.957545+00'),
	('05ad878c-de2d-48e2-b09c-c703e773c5f6', 'Phindile.Ndhlovu@absa.co.za', 'Leadership and Learning Coordinator', 'Phindile Ndhlovu', NULL, '2026-08-25 11:25:46.949342+00'),
	('8b43caaf-d385-4da5-bcc5-aad8f48e7b0d', 'automated-test@quickconnectwireless.net', 'TEST', 'AUTOMATED TEST — please ignore', 'Automated E2E test submission, safe to ignore.', '2026-08-28 09:12:30.129052+00');


--
-- Data for Name: enquiry_talents; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."enquiry_talents" ("enquiry_id", "talent_id", "created_at") VALUES
	('500ce22e-fb6c-4f4f-9841-5c6b0ad51db4', 'a6e5749f-0dd6-4c58-ac4e-dd148c4c5423', '2026-08-13 19:40:51.682204+00'),
	('500ce22e-fb6c-4f4f-9841-5c6b0ad51db4', '7aac9d59-0f77-42fb-8e3d-2323ac2bb524', '2026-08-13 19:40:51.682204+00'),
	('613a63df-f5fa-43c3-abf0-204557c2f721', '8a972967-f13c-4722-b26e-9edbd43d015f', '2026-08-13 19:42:29.303523+00'),
	('613a63df-f5fa-43c3-abf0-204557c2f721', '2ee9b23c-fe19-4c4f-8414-c9464d44fd1e', '2026-08-13 19:42:29.303523+00'),
	('613a63df-f5fa-43c3-abf0-204557c2f721', '982fe23a-d160-460b-9824-1a1f74d8ace9', '2026-08-13 19:42:29.303523+00'),
	('62e49e91-0886-4a00-8d43-f014858c23e7', 'a6e5749f-0dd6-4c58-ac4e-dd148c4c5423', '2026-08-14 07:30:31.163426+00'),
	('62e49e91-0886-4a00-8d43-f014858c23e7', '46658859-27eb-415c-aca3-c91fff193a96', '2026-08-14 07:30:31.163426+00'),
	('62e49e91-0886-4a00-8d43-f014858c23e7', 'b15eb9e6-5d76-416e-8ab7-489c93587943', '2026-08-14 07:30:31.163426+00'),
	('9cb1d608-4407-4834-9ecd-fcd4c1a6edf2', 'a43d684d-7c4a-4ae8-bb73-b6ada59f50d4', '2026-08-14 08:38:28.480031+00'),
	('2c2eb31f-5c47-49a5-bf59-0a9754b375a6', 'a43d684d-7c4a-4ae8-bb73-b6ada59f50d4', '2026-08-14 09:11:49.720413+00'),
	('2c2eb31f-5c47-49a5-bf59-0a9754b375a6', '7aac9d59-0f77-42fb-8e3d-2323ac2bb524', '2026-08-14 09:11:49.720413+00'),
	('2c2eb31f-5c47-49a5-bf59-0a9754b375a6', '46658859-27eb-415c-aca3-c91fff193a96', '2026-08-14 09:11:49.720413+00'),
	('2c2eb31f-5c47-49a5-bf59-0a9754b375a6', 'b15eb9e6-5d76-416e-8ab7-489c93587943', '2026-08-14 09:11:49.720413+00'),
	('8a8eeff1-cf33-47b9-9776-dcd2b685e66b', '8a972967-f13c-4722-b26e-9edbd43d015f', '2026-08-14 09:29:03.631478+00'),
	('8a8eeff1-cf33-47b9-9776-dcd2b685e66b', 'a43d684d-7c4a-4ae8-bb73-b6ada59f50d4', '2026-08-14 09:29:03.631478+00'),
	('8a8eeff1-cf33-47b9-9776-dcd2b685e66b', 'a6e5749f-0dd6-4c58-ac4e-dd148c4c5423', '2026-08-14 09:29:03.631478+00'),
	('a27bcc6a-c0cf-40b9-b4c6-50d6aa9f64fe', 'a6e5749f-0dd6-4c58-ac4e-dd148c4c5423', '2026-08-14 09:38:57.812283+00'),
	('a27bcc6a-c0cf-40b9-b4c6-50d6aa9f64fe', '46658859-27eb-415c-aca3-c91fff193a96', '2026-08-14 09:38:57.812283+00'),
	('a27bcc6a-c0cf-40b9-b4c6-50d6aa9f64fe', 'e9502a46-9845-4cec-8583-b4027ecf8f44', '2026-08-14 09:38:57.812283+00'),
	('a27bcc6a-c0cf-40b9-b4c6-50d6aa9f64fe', '52294937-70bb-438b-8108-44d05056efbf', '2026-08-14 09:38:57.812283+00'),
	('d3de72d1-ecee-4b5c-9e8c-a0792a43bb36', 'a6e5749f-0dd6-4c58-ac4e-dd148c4c5423', '2026-08-14 09:57:33.796797+00'),
	('d3de72d1-ecee-4b5c-9e8c-a0792a43bb36', '010dc68d-dd48-41e6-abd7-4970ce7af1d4', '2026-08-14 09:57:33.796797+00'),
	('d3de72d1-ecee-4b5c-9e8c-a0792a43bb36', '01504d89-dc7d-4999-a46e-0762c7419872', '2026-08-14 09:57:33.796797+00'),
	('ca15e005-2e48-438d-91ba-9999d29df159', 'a43d684d-7c4a-4ae8-bb73-b6ada59f50d4', '2026-08-14 13:17:29.854274+00'),
	('ca15e005-2e48-438d-91ba-9999d29df159', '7aac9d59-0f77-42fb-8e3d-2323ac2bb524', '2026-08-14 13:17:29.854274+00'),
	('ca15e005-2e48-438d-91ba-9999d29df159', '8a972967-f13c-4722-b26e-9edbd43d015f', '2026-08-14 13:17:29.854274+00'),
	('59ac39ee-790d-4fef-94f5-79f7b5b2559e', '2ee9b23c-fe19-4c4f-8414-c9464d44fd1e', '2026-08-14 14:30:24.071592+00'),
	('c64e9815-826e-4748-8475-4c01163bab55', '8a972967-f13c-4722-b26e-9edbd43d015f', '2026-08-14 15:15:25.808955+00'),
	('c64e9815-826e-4748-8475-4c01163bab55', 'a43d684d-7c4a-4ae8-bb73-b6ada59f50d4', '2026-08-14 15:15:25.808955+00'),
	('3ff8d9bf-7234-4454-9b87-5cf1742143ed', 'a6e5749f-0dd6-4c58-ac4e-dd148c4c5423', '2026-08-17 06:17:25.756107+00'),
	('3ff8d9bf-7234-4454-9b87-5cf1742143ed', 'df3e97a3-e768-439f-b1ef-97fe730af513', '2026-08-17 06:17:25.756107+00'),
	('9aa70e9d-310b-447d-bb21-37e88959397f', '7aac9d59-0f77-42fb-8e3d-2323ac2bb524', '2026-08-17 06:22:30.670557+00'),
	('9aa70e9d-310b-447d-bb21-37e88959397f', '8a972967-f13c-4722-b26e-9edbd43d015f', '2026-08-17 06:22:30.670557+00'),
	('7b34e1ed-9292-47fa-84f4-ceeb55b22151', '7aac9d59-0f77-42fb-8e3d-2323ac2bb524', '2026-08-17 08:50:28.311011+00'),
	('7b34e1ed-9292-47fa-84f4-ceeb55b22151', '8a972967-f13c-4722-b26e-9edbd43d015f', '2026-08-17 08:50:28.311011+00'),
	('a5a86333-0384-4431-858b-afa7c137a905', '7aac9d59-0f77-42fb-8e3d-2323ac2bb524', '2026-08-17 08:52:17.009412+00'),
	('a5a86333-0384-4431-858b-afa7c137a905', '8a972967-f13c-4722-b26e-9edbd43d015f', '2026-08-17 08:52:17.009412+00'),
	('05ad878c-de2d-48e2-b09c-c703e773c5f6', '7aac9d59-0f77-42fb-8e3d-2323ac2bb524', '2026-08-25 11:25:47.02669+00');


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."projects" ("id", "name", "description", "created_at", "talent_id", "project_url") VALUES
	('19c2ad2e-69e4-4202-a8f1-006f9d9edb92', 'DevLink', 'A developer platform that aggregates and curates up-to-date information on programming languages, frameworks, and tools to help developers stay informed and upskill.', '2026-08-14 08:39:01.752094+00', 'e9502a46-9845-4cec-8583-b4027ecf8f44', ''),
	('4c94da83-9fdb-403e-9b83-8f24513fd88c', 'SmartShelf', 'An application that helps users track food expiration dates, reduce household food waste, and make better use of groceries before they expire.', '2026-08-14 08:44:14.484781+00', 'df26e137-7589-4007-8333-8340dfce7654', ''),
	('509bc5d7-7b5d-4633-b1bd-00b870d2d039', 'SmartShelf', 'An application that helps users track food expiration dates, reduce household food waste, and make better use of groceries before they expire.', '2026-08-14 08:52:20.971548+00', '6f829522-191e-4646-b1cb-40cf79cf50e5', ''),
	('9fc484c4-0f21-4209-b398-e040649bb578', 'SmartShelf', 'An application that helps users track food expiration dates, reduce household food waste, and make better use of groceries before they expire.', '2026-08-14 08:54:48.76607+00', '7e6e6fae-4ae4-4f69-a6dd-fb50ce49eafb', ''),
	('cf2e2b14-9a8e-41db-a409-72010691126e', 'DevLink', 'A developer platform that aggregates and curates up-to-date information on programming languages, frameworks, and tools to help developers stay informed and upskill.', '2026-08-14 09:06:22.034657+00', '52294937-70bb-438b-8108-44d05056efbf', ''),
	('affa6395-8fcd-41fa-a7ca-7e14222e2ba5', 'DevLink', 'A developer platform that aggregates and curates up-to-date information on programming languages, frameworks, and tools to help developers stay informed and upskill.', '2026-08-14 09:33:29.540011+00', 'affacf6c-4bd8-4854-bfe4-1cf616357612', ''),
	('4d6938ea-b6fe-4fa8-ba7a-bd0a918edd2c', 'DevLink', 'A developer platform that aggregates and curates up-to-date information on programming languages, frameworks, and tools to help developers stay informed and upskill.', '2026-08-14 10:06:50.422038+00', 'c2b6a59b-bb8d-4d20-98bc-6dc858d21722', ''),
	('892cd394-303c-44eb-8b39-9c4a4750170d', 'SmartShelf', 'An application that helps users track food expiration dates, reduce household food waste, and make better use of groceries before they expire.', '2026-08-17 07:54:26.061958+00', 'ce39fc2e-4a33-412d-a4d4-77730fb32e6e', ''),
	('4f4fb1fd-efa8-4f30-810c-8dc08f47ffdc', 'DevLink', 'A developer platform that aggregates and curates up-to-date information on programming languages, frameworks, and tools to help developers stay informed and upskill.', '2026-08-17 08:18:59.40983+00', 'd4a39bfc-129d-4a15-af35-f7f68da0a07a', ''),
	('69364f6b-2ed4-4566-aa59-4e823c600794', 'Voice up', 'A social-impact mobile application designed to help deaf and speech-impaired individuals communicate more effectively through situational phrase libraries, multilingual text-to-speech, and offline accessibility features.', '2026-08-14 06:39:48.717609+00', '7aac9d59-0f77-42fb-8e3d-2323ac2bb524', ''),
	('517c21f2-d130-484b-8ec3-70b49c0c733b', 'City Fix', 'A community-impact project to create a centralised platform that helps residents report municipal service delivery issues and enables ward councillors to track, prioritise, and resolve complaints more efficiently.', '2026-08-14 06:41:28.620564+00', '92066740-f3f4-4ae3-ac04-9ed6f42fc8f1', ''),
	('da7ad016-a421-45aa-88e5-ea781549ace2', 'City Fix', 'A community-impact project to create a centralised platform that helps residents report municipal service delivery issues and enables ward councillors to track, prioritise, and resolve complaints more efficiently.', '2026-08-14 06:42:04.687545+00', 'f7b65f0f-1d5b-4244-ab8a-eff57422a3b6', ''),
	('f29f42bd-c161-4387-a6de-06a7aa8695d2', 'City Fix', 'A community-impact project to create a centralised platform that helps residents report municipal service delivery issues and enables ward councillors to track, prioritise, and resolve complaints more efficiently.', '2026-08-14 06:42:21.716657+00', '645a6e37-9799-4dd4-abe9-617516f57859', ''),
	('16a52b01-58ae-4143-9c88-2361f43333a0', 'City Fix', 'A community-impact project to create a centralised platform that helps residents report municipal service delivery issues and enables ward councillors to track, prioritise, and resolve complaints more efficiently.', '2026-08-14 06:42:39.454619+00', 'd9da8310-3628-410d-ac87-760737083d46', ''),
	('b6d70748-42ea-495b-9019-7826b30a6aad', 'Voice up', 'A social-impact mobile application designed to help deaf and speech-impaired individuals communicate more effectively through situational phrase libraries, multilingual text-to-speech, and offline accessibility features.', '2026-08-14 06:42:58.961437+00', 'df3e97a3-e768-439f-b1ef-97fe730af513', ''),
	('7c8090d7-fbfc-41c3-abd8-93c1f3ff3098', 'City Fix', 'A community-impact project to create a centralised platform that helps residents report municipal service delivery issues and enables ward councillors to track, prioritise, and resolve complaints more efficiently.', '2026-08-14 06:43:21.212396+00', '46658859-27eb-415c-aca3-c91fff193a96', ''),
	('a2ffad8b-047f-4216-894f-19cb295b2f1d', 'City Fix', 'A community-impact project to create a centralised platform that helps residents report municipal service delivery issues and enables ward councillors to track, prioritise, and resolve complaints more efficiently.', '2026-08-14 06:43:38.990656+00', '4015bb73-6af2-44a8-a8b5-79c669b77a3c', ''),
	('ff4db802-2ab1-43f4-a8b7-72c588e4cf91', 'Voice up', 'A social-impact mobile application designed to help deaf and speech-impaired individuals communicate more effectively through situational phrase libraries, multilingual text-to-speech, and offline accessibility features.', '2026-08-14 06:43:57.513106+00', '982fe23a-d160-460b-9824-1a1f74d8ace9', ''),
	('9c7e90f1-7659-4f44-8a7a-fe50a238c17d', 'Voice up', 'A social-impact mobile application designed to help deaf and speech-impaired individuals communicate more effectively through situational phrase libraries, multilingual text-to-speech, and offline accessibility features.', '2026-08-14 06:44:14.831337+00', 'b15eb9e6-5d76-416e-8ab7-489c93587943', ''),
	('100d0959-0f5a-41cd-9069-f8d84275dbf0', 'Voice up', 'A social-impact mobile application designed to help deaf and speech-impaired individuals communicate more effectively through situational phrase libraries, multilingual text-to-speech, and offline accessibility features.', '2026-08-14 06:45:47.34977+00', '2ee9b23c-fe19-4c4f-8414-c9464d44fd1e', ''),
	('1d318945-a9d3-44eb-b542-7468d4311c82', 'Voice up', 'A social-impact mobile application designed to help deaf and speech-impaired individuals communicate more effectively through situational phrase libraries, multilingual text-to-speech, and offline accessibility features.', '2026-08-14 06:46:05.813551+00', '8a972967-f13c-4722-b26e-9edbd43d015f', ''),
	('32ed89a8-2bea-41de-94f1-93b31f5870e0', 'Voice up', 'A social-impact mobile application designed to help deaf and speech-impaired individuals communicate more effectively through situational phrase libraries, multilingual text-to-speech, and offline accessibility features.', '2026-08-14 06:46:25.66665+00', 'a43d684d-7c4a-4ae8-bb73-b6ada59f50d4', ''),
	('07d5bc63-61aa-4236-955f-cc78524d0bf3', 'City Fix', 'A community-impact project to create a centralised platform that helps residents report municipal service delivery issues and enables ward councillors to track, prioritise, and resolve complaints more efficiently.', '2026-08-14 06:48:14.50525+00', 'a6e5749f-0dd6-4c58-ac4e-dd148c4c5423', ''),
	('f33450d3-791b-4601-b4dd-723ba84440b8', 'FundEase', 'A centralised funding platform that allows students to apply for multiple sponsorship opportunities using a single profile, while enabling sponsors to review standardised applications efficiently.', '2026-08-14 08:31:07.103611+00', '010dc68d-dd48-41e6-abd7-4970ce7af1d4', ''),
	('78bbb769-5e2e-4234-b652-de7ea0ebfbbe', 'LocalConnectSA', 'A business discovery platform that enables users to find, review, and trust local South African businesses while allowing business owners to manage their online presence.', '2026-08-14 08:49:14.58243+00', 'f0860153-4617-41f4-a089-25f60cde6dbe', ''),
	('e9bf279d-6712-460b-b9af-4b059adabcc0', 'FundEase', 'A centralised funding platform that allows students to apply for multiple sponsorship opportunities using a single profile, while enabling sponsors to review standardised applications efficiently.', '2026-08-14 08:58:35.302059+00', 'd0625fac-5a4d-409e-bebd-1fa30a6aaf71', ''),
	('5a7b782f-350a-46be-a1c7-a74c2ea8395c', 'FlexSure', 'An application designed to help users find affordable, personalised gadget insurance by comparing tailored coverage options and managing active policies in one platform.', '2026-08-14 09:03:14.033085+00', 'af05c47a-d123-433d-8af6-7b8aa4ec036c', ''),
	('bbe1c57a-0158-4822-8d55-5f22300e0d30', 'FlexSure', 'An application designed to help users find affordable, personalised gadget insurance by comparing tailored coverage options and managing active policies in one platform.', '2026-08-14 09:39:46.337611+00', '5bcdae8c-e30b-483c-ae04-33982cafbc7e', ''),
	('d25bfe8a-c527-46d9-bec3-8ffdf702686c', 'FundEase', 'A centralised funding platform that allows students to apply for multiple sponsorship opportunities using a single profile, while enabling sponsors to review standardised applications efficiently.', '2026-08-14 09:45:00.834811+00', '01504d89-dc7d-4999-a46e-0762c7419872', ''),
	('bda0b25f-4b48-4dc0-8040-591493a1c198', 'FlexSure', 'An application designed to help users find affordable, personalised gadget insurance by comparing tailored coverage options and managing active policies in one platform.', '2026-08-14 09:49:22.142838+00', '1b5eb134-dada-4c9a-8bc6-b05f60d69b52', ''),
	('f43b4bf6-f178-4d0b-a2b2-b8618b62c1d9', 'LocalConnect SA', 'A business discovery platform that enables users to find, review, and trust local South African businesses while allowing business owners to manage their online presence.', '2026-08-14 10:03:12.452377+00', '923f3d93-b331-4d03-ac87-4211f8211675', ''),
	('8d4dffab-a0e7-4e56-b6d9-d4d8b95f1189', 'LocalConnectSA', 'A business discovery platform that enables users to find, review, and trust local South African businesses while allowing business owners to manage their online presence.', '2026-08-14 10:12:01.182687+00', '23edd5ea-125a-4bea-856b-3ce16cebe08f', ''),
	('a26a26da-064d-4d32-84f0-4a59519a06b2', 'FundEase', 'A centralised funding platform that allows students to apply for multiple sponsorship opportunities using a single profile, while enabling sponsors to review standardised applications efficiently.', '2026-08-14 11:46:29.822063+00', '87945c32-0e99-4ce3-bd31-eb81df7d456f', ''),
	('b55e7294-1e2c-4139-9599-da18cb176da2', 'FundEase', 'A centralised funding platform that allows students to apply for multiple sponsorship opportunities using a single profile, while enabling sponsors to review standardised applications efficiently.', '2026-08-17 06:57:47.845611+00', '7b33be02-0d93-4182-8cd5-4f60888ea04e', ''),
	('e616d39c-3078-4c7c-8189-14af7b324967', 'LocalConnect SA', 'A business discovery platform that enables users to find, review, and trust local South African businesses while allowing business owners to manage their online presence.', '2026-08-17 14:02:09.814119+00', 'e666230e-8692-48ba-ac42-0779bc862919', ''),
	('edde541a-3061-4a34-b788-349b70544792', 'FlexSure', 'An application designed to help users find affordable, personalised gadget insurance by comparing tailored coverage options and managing active policies in one platform.', '2026-08-17 14:14:58.172548+00', '77ee2dd3-3533-4bb1-a9c2-16d0a64dfd47', ''),
	('12b27913-891f-45c2-9739-faaea0ff21c9', 'FlexSure', 'An application designed to help users find affordable, personalised gadget insurance by comparing tailored coverage options and managing active policies in one platform.', '2026-08-17 14:22:15.05579+00', '94638a3c-c959-4d13-a7ba-666ece12366f', '');


--
-- Data for Name: project_capabilities; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: talent_capabilities; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."talent_capabilities" ("created_at", "talent_id", "capability_id") VALUES
	('2026-08-13 14:04:00.985082+00', '8a972967-f13c-4722-b26e-9edbd43d015f', 'b1cd5d2c-d6cc-49f6-b6ad-59a28b74270e'),
	('2026-08-13 14:04:02.331661+00', '8a972967-f13c-4722-b26e-9edbd43d015f', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-13 14:04:04.049143+00', '8a972967-f13c-4722-b26e-9edbd43d015f', '30dbbd60-0875-44cc-b366-f2b349a34041'),
	('2026-08-13 14:04:06.457994+00', '8a972967-f13c-4722-b26e-9edbd43d015f', '49e353dd-1b61-4360-9681-d406fcb5b225'),
	('2026-08-13 14:04:13.609989+00', '8a972967-f13c-4722-b26e-9edbd43d015f', '3ef91bcb-df61-4d4e-9b63-86c505735a0d'),
	('2026-08-13 14:04:15.494337+00', '8a972967-f13c-4722-b26e-9edbd43d015f', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-13 14:04:18.272859+00', '8a972967-f13c-4722-b26e-9edbd43d015f', '43199d38-1b94-4a2a-8fa7-4bffc222ac35'),
	('2026-08-13 14:04:20.50833+00', '8a972967-f13c-4722-b26e-9edbd43d015f', 'dcd64e6a-8c10-4562-85d2-0891eb111510'),
	('2026-08-13 14:26:29.372084+00', 'a6e5749f-0dd6-4c58-ac4e-dd148c4c5423', 'b1cd5d2c-d6cc-49f6-b6ad-59a28b74270e'),
	('2026-08-13 14:26:30.733269+00', 'a6e5749f-0dd6-4c58-ac4e-dd148c4c5423', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-13 14:26:31.367716+00', 'a6e5749f-0dd6-4c58-ac4e-dd148c4c5423', '30dbbd60-0875-44cc-b366-f2b349a34041'),
	('2026-08-13 14:26:36.535039+00', 'a6e5749f-0dd6-4c58-ac4e-dd148c4c5423', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-13 14:26:39.587539+00', 'a6e5749f-0dd6-4c58-ac4e-dd148c4c5423', '43199d38-1b94-4a2a-8fa7-4bffc222ac35'),
	('2026-08-13 14:26:42.270004+00', 'a6e5749f-0dd6-4c58-ac4e-dd148c4c5423', 'dcd64e6a-8c10-4562-85d2-0891eb111510'),
	('2026-08-13 14:33:40.332711+00', 'a43d684d-7c4a-4ae8-bb73-b6ada59f50d4', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-13 14:33:42.001674+00', 'a43d684d-7c4a-4ae8-bb73-b6ada59f50d4', '49e353dd-1b61-4360-9681-d406fcb5b225'),
	('2026-08-13 14:33:44.790661+00', 'a43d684d-7c4a-4ae8-bb73-b6ada59f50d4', '3ef91bcb-df61-4d4e-9b63-86c505735a0d'),
	('2026-08-13 14:33:49.082676+00', 'a43d684d-7c4a-4ae8-bb73-b6ada59f50d4', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-13 14:33:51.507935+00', 'a43d684d-7c4a-4ae8-bb73-b6ada59f50d4', '43199d38-1b94-4a2a-8fa7-4bffc222ac35'),
	('2026-08-13 14:33:53.487346+00', 'a43d684d-7c4a-4ae8-bb73-b6ada59f50d4', 'dcd64e6a-8c10-4562-85d2-0891eb111510'),
	('2026-08-13 14:35:34.189343+00', '2ee9b23c-fe19-4c4f-8414-c9464d44fd1e', 'b1cd5d2c-d6cc-49f6-b6ad-59a28b74270e'),
	('2026-08-13 14:35:37.013009+00', '2ee9b23c-fe19-4c4f-8414-c9464d44fd1e', '30dbbd60-0875-44cc-b366-f2b349a34041'),
	('2026-08-13 14:35:39.506093+00', '2ee9b23c-fe19-4c4f-8414-c9464d44fd1e', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-13 14:35:44.009025+00', '2ee9b23c-fe19-4c4f-8414-c9464d44fd1e', '3ef91bcb-df61-4d4e-9b63-86c505735a0d'),
	('2026-08-13 14:35:47.345763+00', '2ee9b23c-fe19-4c4f-8414-c9464d44fd1e', '43199d38-1b94-4a2a-8fa7-4bffc222ac35'),
	('2026-08-13 14:35:48.907383+00', '2ee9b23c-fe19-4c4f-8414-c9464d44fd1e', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-13 14:38:19.350178+00', '982fe23a-d160-460b-9824-1a1f74d8ace9', 'b1cd5d2c-d6cc-49f6-b6ad-59a28b74270e'),
	('2026-08-13 14:38:22.090613+00', '982fe23a-d160-460b-9824-1a1f74d8ace9', '30dbbd60-0875-44cc-b366-f2b349a34041'),
	('2026-08-13 14:38:25.423782+00', '982fe23a-d160-460b-9824-1a1f74d8ace9', '43199d38-1b94-4a2a-8fa7-4bffc222ac35'),
	('2026-08-13 14:38:27.297035+00', '982fe23a-d160-460b-9824-1a1f74d8ace9', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-13 14:38:31.521475+00', '982fe23a-d160-460b-9824-1a1f74d8ace9', 'a50f8d81-7ef0-4fb6-b024-d5b7a4e359d3'),
	('2026-08-13 15:00:09.408166+00', 'b15eb9e6-5d76-416e-8ab7-489c93587943', 'b1cd5d2c-d6cc-49f6-b6ad-59a28b74270e'),
	('2026-08-13 15:00:11.480726+00', 'b15eb9e6-5d76-416e-8ab7-489c93587943', '30dbbd60-0875-44cc-b366-f2b349a34041'),
	('2026-08-13 15:00:13.411449+00', 'b15eb9e6-5d76-416e-8ab7-489c93587943', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-13 15:00:15.914512+00', 'b15eb9e6-5d76-416e-8ab7-489c93587943', '43199d38-1b94-4a2a-8fa7-4bffc222ac35'),
	('2026-08-13 15:00:18.491665+00', 'b15eb9e6-5d76-416e-8ab7-489c93587943', 'dcd64e6a-8c10-4562-85d2-0891eb111510'),
	('2026-08-13 15:00:21.866717+00', 'b15eb9e6-5d76-416e-8ab7-489c93587943', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-13 15:10:52.705271+00', '4015bb73-6af2-44a8-a8b5-79c669b77a3c', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-13 15:10:56.472843+00', '4015bb73-6af2-44a8-a8b5-79c669b77a3c', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-13 15:10:59.859462+00', '4015bb73-6af2-44a8-a8b5-79c669b77a3c', 'bcefcf76-42ac-47b5-b194-6c8b742fa79f'),
	('2026-08-13 15:11:03.460737+00', '4015bb73-6af2-44a8-a8b5-79c669b77a3c', 'dbf80a09-6e2e-472d-8db6-ca2421ad4798'),
	('2026-08-13 15:11:06.014138+00', '4015bb73-6af2-44a8-a8b5-79c669b77a3c', '43199d38-1b94-4a2a-8fa7-4bffc222ac35'),
	('2026-08-13 15:11:10.851778+00', '4015bb73-6af2-44a8-a8b5-79c669b77a3c', 'a50f8d81-7ef0-4fb6-b024-d5b7a4e359d3'),
	('2026-08-13 15:11:14.120939+00', '4015bb73-6af2-44a8-a8b5-79c669b77a3c', 'b71dcc44-22e7-4f4b-bae2-66136f56c2cb'),
	('2026-08-13 15:14:37.823118+00', '46658859-27eb-415c-aca3-c91fff193a96', 'b1cd5d2c-d6cc-49f6-b6ad-59a28b74270e'),
	('2026-08-13 15:14:39.702232+00', '46658859-27eb-415c-aca3-c91fff193a96', '30dbbd60-0875-44cc-b366-f2b349a34041'),
	('2026-08-13 15:14:46.124711+00', '46658859-27eb-415c-aca3-c91fff193a96', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-13 16:08:49.671261+00', 'df3e97a3-e768-439f-b1ef-97fe730af513', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-13 16:08:51.898266+00', 'df3e97a3-e768-439f-b1ef-97fe730af513', 'b1cd5d2c-d6cc-49f6-b6ad-59a28b74270e'),
	('2026-08-13 16:08:53.586832+00', 'df3e97a3-e768-439f-b1ef-97fe730af513', '30dbbd60-0875-44cc-b366-f2b349a34041'),
	('2026-08-13 16:08:55.730136+00', 'df3e97a3-e768-439f-b1ef-97fe730af513', '49e353dd-1b61-4360-9681-d406fcb5b225'),
	('2026-08-13 16:08:59.202159+00', 'df3e97a3-e768-439f-b1ef-97fe730af513', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-13 16:09:02.175871+00', 'df3e97a3-e768-439f-b1ef-97fe730af513', 'a50f8d81-7ef0-4fb6-b024-d5b7a4e359d3'),
	('2026-08-13 16:14:20.255548+00', 'd9da8310-3628-410d-ac87-760737083d46', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-13 16:14:24.573433+00', 'd9da8310-3628-410d-ac87-760737083d46', '7df03f30-5aa8-4b50-aad4-df647f4ff954'),
	('2026-08-13 16:14:26.57381+00', 'd9da8310-3628-410d-ac87-760737083d46', 'a30ebab5-6095-4f07-804a-78ad89486b2c'),
	('2026-08-13 16:14:29.031337+00', 'd9da8310-3628-410d-ac87-760737083d46', '43199d38-1b94-4a2a-8fa7-4bffc222ac35'),
	('2026-08-13 16:14:31.837656+00', 'd9da8310-3628-410d-ac87-760737083d46', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-13 16:14:34.277514+00', 'd9da8310-3628-410d-ac87-760737083d46', 'dbf80a09-6e2e-472d-8db6-ca2421ad4798'),
	('2026-08-13 16:15:36.295142+00', '645a6e37-9799-4dd4-abe9-617516f57859', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-13 16:15:38.668839+00', '645a6e37-9799-4dd4-abe9-617516f57859', 'a30ebab5-6095-4f07-804a-78ad89486b2c'),
	('2026-08-13 16:15:43.704053+00', '645a6e37-9799-4dd4-abe9-617516f57859', '7df03f30-5aa8-4b50-aad4-df647f4ff954'),
	('2026-08-13 16:15:48.31594+00', '645a6e37-9799-4dd4-abe9-617516f57859', 'ffef1eba-06eb-4255-95d1-ab21534d3908'),
	('2026-08-13 16:15:51.778693+00', '645a6e37-9799-4dd4-abe9-617516f57859', 'dbf80a09-6e2e-472d-8db6-ca2421ad4798'),
	('2026-08-13 16:15:54.311322+00', '645a6e37-9799-4dd4-abe9-617516f57859', 'dcd64e6a-8c10-4562-85d2-0891eb111510'),
	('2026-08-13 16:15:57.923145+00', '645a6e37-9799-4dd4-abe9-617516f57859', '43199d38-1b94-4a2a-8fa7-4bffc222ac35'),
	('2026-08-13 16:16:01.225351+00', '645a6e37-9799-4dd4-abe9-617516f57859', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-13 16:32:04.070821+00', 'f7b65f0f-1d5b-4244-ab8a-eff57422a3b6', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-13 16:32:06.401424+00', 'f7b65f0f-1d5b-4244-ab8a-eff57422a3b6', '7df03f30-5aa8-4b50-aad4-df647f4ff954'),
	('2026-08-13 16:32:08.691311+00', 'f7b65f0f-1d5b-4244-ab8a-eff57422a3b6', 'a30ebab5-6095-4f07-804a-78ad89486b2c'),
	('2026-08-13 16:32:10.884139+00', 'f7b65f0f-1d5b-4244-ab8a-eff57422a3b6', '43199d38-1b94-4a2a-8fa7-4bffc222ac35'),
	('2026-08-13 16:32:13.731828+00', 'f7b65f0f-1d5b-4244-ab8a-eff57422a3b6', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-13 16:32:15.987066+00', 'f7b65f0f-1d5b-4244-ab8a-eff57422a3b6', 'dbf80a09-6e2e-472d-8db6-ca2421ad4798'),
	('2026-08-13 16:33:36.405116+00', '92066740-f3f4-4ae3-ac04-9ed6f42fc8f1', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-13 16:33:38.852353+00', '92066740-f3f4-4ae3-ac04-9ed6f42fc8f1', 'b1cd5d2c-d6cc-49f6-b6ad-59a28b74270e'),
	('2026-08-13 16:33:40.650753+00', '92066740-f3f4-4ae3-ac04-9ed6f42fc8f1', '30dbbd60-0875-44cc-b366-f2b349a34041'),
	('2026-08-13 16:33:43.227847+00', '92066740-f3f4-4ae3-ac04-9ed6f42fc8f1', '43199d38-1b94-4a2a-8fa7-4bffc222ac35'),
	('2026-08-13 16:34:33.873229+00', '7aac9d59-0f77-42fb-8e3d-2323ac2bb524', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-13 16:34:37.357729+00', '7aac9d59-0f77-42fb-8e3d-2323ac2bb524', '43199d38-1b94-4a2a-8fa7-4bffc222ac35'),
	('2026-08-14 08:08:57.666477+00', '46658859-27eb-415c-aca3-c91fff193a96', '49e353dd-1b61-4360-9681-d406fcb5b225'),
	('2026-08-14 08:09:00.293845+00', '46658859-27eb-415c-aca3-c91fff193a96', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-14 08:09:03.362132+00', '46658859-27eb-415c-aca3-c91fff193a96', '43199d38-1b94-4a2a-8fa7-4bffc222ac35'),
	('2026-08-14 08:09:05.257013+00', '46658859-27eb-415c-aca3-c91fff193a96', 'dcd64e6a-8c10-4562-85d2-0891eb111510'),
	('2026-08-14 08:27:20.008975+00', '010dc68d-dd48-41e6-abd7-4970ce7af1d4', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-14 08:27:23.482931+00', '010dc68d-dd48-41e6-abd7-4970ce7af1d4', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-14 08:27:25.565286+00', '010dc68d-dd48-41e6-abd7-4970ce7af1d4', 'dbf80a09-6e2e-472d-8db6-ca2421ad4798'),
	('2026-08-14 08:27:28.256009+00', '010dc68d-dd48-41e6-abd7-4970ce7af1d4', '43199d38-1b94-4a2a-8fa7-4bffc222ac35'),
	('2026-08-14 08:27:31.966936+00', '010dc68d-dd48-41e6-abd7-4970ce7af1d4', 'a50f8d81-7ef0-4fb6-b024-d5b7a4e359d3'),
	('2026-08-14 08:27:34.357001+00', '010dc68d-dd48-41e6-abd7-4970ce7af1d4', '3ef91bcb-df61-4d4e-9b63-86c505735a0d'),
	('2026-08-14 08:27:37.072486+00', '010dc68d-dd48-41e6-abd7-4970ce7af1d4', 'dcd64e6a-8c10-4562-85d2-0891eb111510'),
	('2026-08-14 08:27:39.780149+00', '010dc68d-dd48-41e6-abd7-4970ce7af1d4', '49e353dd-1b61-4360-9681-d406fcb5b225'),
	('2026-08-14 08:27:41.341801+00', '010dc68d-dd48-41e6-abd7-4970ce7af1d4', 'b1cd5d2c-d6cc-49f6-b6ad-59a28b74270e'),
	('2026-08-14 08:27:44.557095+00', '010dc68d-dd48-41e6-abd7-4970ce7af1d4', '30dbbd60-0875-44cc-b366-f2b349a34041'),
	('2026-08-14 08:33:39.037362+00', '010dc68d-dd48-41e6-abd7-4970ce7af1d4', '856607d4-4cad-4f17-b893-6f7dde0e782e'),
	('2026-08-14 08:33:40.889258+00', '010dc68d-dd48-41e6-abd7-4970ce7af1d4', '0584b8c3-733c-4f56-8216-90c6feb22498'),
	('2026-08-14 08:33:44.688715+00', '010dc68d-dd48-41e6-abd7-4970ce7af1d4', '16a4f0b0-257e-4569-bfa1-f65477307a71'),
	('2026-08-14 08:33:47.282574+00', '010dc68d-dd48-41e6-abd7-4970ce7af1d4', '0ea25217-e3a2-4b9f-8dd7-e8478066691e'),
	('2026-08-14 08:33:50.667796+00', '010dc68d-dd48-41e6-abd7-4970ce7af1d4', '8d1297b3-47ce-4e80-9409-b42acae58ff9'),
	('2026-08-14 08:37:07.730571+00', 'e9502a46-9845-4cec-8583-b4027ecf8f44', 'eba21030-eeed-4b86-95fa-296e3e03e711'),
	('2026-08-14 08:37:10.331322+00', 'e9502a46-9845-4cec-8583-b4027ecf8f44', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-14 08:37:13.142523+00', 'e9502a46-9845-4cec-8583-b4027ecf8f44', 'dbf80a09-6e2e-472d-8db6-ca2421ad4798'),
	('2026-08-14 08:37:15.35874+00', 'e9502a46-9845-4cec-8583-b4027ecf8f44', '1f83b77b-2caa-4e35-a9b9-20b699bfe4da'),
	('2026-08-14 08:37:21.364668+00', 'e9502a46-9845-4cec-8583-b4027ecf8f44', '43199d38-1b94-4a2a-8fa7-4bffc222ac35'),
	('2026-08-14 08:37:37.026587+00', 'e9502a46-9845-4cec-8583-b4027ecf8f44', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-14 08:37:39.140418+00', 'e9502a46-9845-4cec-8583-b4027ecf8f44', '49857a2c-b026-4f4f-a535-6bcf874925c4'),
	('2026-08-14 08:37:41.077081+00', 'e9502a46-9845-4cec-8583-b4027ecf8f44', 'cafda503-76e1-409d-9fca-3ec7bc1981dd'),
	('2026-08-14 08:37:44.448687+00', 'e9502a46-9845-4cec-8583-b4027ecf8f44', 'e1696625-cb21-4732-8f78-a512acab0202'),
	('2026-08-14 08:37:47.829476+00', 'e9502a46-9845-4cec-8583-b4027ecf8f44', '97b13e08-a16d-4a1f-8980-27028d484d38'),
	('2026-08-14 08:41:39.128512+00', 'df26e137-7589-4007-8333-8340dfce7654', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-14 08:41:42.537761+00', 'df26e137-7589-4007-8333-8340dfce7654', '43199d38-1b94-4a2a-8fa7-4bffc222ac35'),
	('2026-08-14 08:41:45.023889+00', 'df26e137-7589-4007-8333-8340dfce7654', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-14 08:41:50.922075+00', 'df26e137-7589-4007-8333-8340dfce7654', '49e353dd-1b61-4360-9681-d406fcb5b225'),
	('2026-08-14 08:41:54.020021+00', 'df26e137-7589-4007-8333-8340dfce7654', 'dbf80a09-6e2e-472d-8db6-ca2421ad4798'),
	('2026-08-14 08:42:11.421244+00', 'df26e137-7589-4007-8333-8340dfce7654', '8d1297b3-47ce-4e80-9409-b42acae58ff9'),
	('2026-08-14 08:42:14.021489+00', 'df26e137-7589-4007-8333-8340dfce7654', '97b13e08-a16d-4a1f-8980-27028d484d38'),
	('2026-08-14 08:42:20.832856+00', 'df26e137-7589-4007-8333-8340dfce7654', 'dcd64e6a-8c10-4562-85d2-0891eb111510'),
	('2026-08-14 08:41:47.86564+00', 'df26e137-7589-4007-8333-8340dfce7654', '3ef91bcb-df61-4d4e-9b63-86c505735a0d'),
	('2026-08-14 08:42:18.403602+00', 'df26e137-7589-4007-8333-8340dfce7654', '518cb386-f660-403f-8aa5-2ef5696f8b8e'),
	('2026-08-14 08:47:01.41272+00', 'f0860153-4617-41f4-a089-25f60cde6dbe', '30dbbd60-0875-44cc-b366-f2b349a34041'),
	('2026-08-14 08:47:03.921006+00', 'f0860153-4617-41f4-a089-25f60cde6dbe', '49e353dd-1b61-4360-9681-d406fcb5b225'),
	('2026-08-14 08:47:06.6241+00', 'f0860153-4617-41f4-a089-25f60cde6dbe', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-14 08:47:08.832903+00', 'f0860153-4617-41f4-a089-25f60cde6dbe', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-14 08:47:14.283127+00', 'f0860153-4617-41f4-a089-25f60cde6dbe', 'a50f8d81-7ef0-4fb6-b024-d5b7a4e359d3'),
	('2026-08-14 08:47:16.950814+00', 'f0860153-4617-41f4-a089-25f60cde6dbe', '1f83b77b-2caa-4e35-a9b9-20b699bfe4da'),
	('2026-08-14 08:47:19.229127+00', 'f0860153-4617-41f4-a089-25f60cde6dbe', '49857a2c-b026-4f4f-a535-6bcf874925c4'),
	('2026-08-14 08:48:02.141786+00', 'f0860153-4617-41f4-a089-25f60cde6dbe', 'b1cd5d2c-d6cc-49f6-b6ad-59a28b74270e'),
	('2026-08-14 08:48:06.767825+00', 'f0860153-4617-41f4-a089-25f60cde6dbe', '5f318fb2-480c-4bd8-9992-5ec66325d4e5'),
	('2026-08-14 08:48:08.974857+00', 'f0860153-4617-41f4-a089-25f60cde6dbe', 'efae9339-8bff-4fa1-8dc7-9881155a13f4'),
	('2026-08-14 08:50:46.09303+00', '6f829522-191e-4646-b1cb-40cf79cf50e5', 'eba21030-eeed-4b86-95fa-296e3e03e711'),
	('2026-08-14 08:50:47.784218+00', '6f829522-191e-4646-b1cb-40cf79cf50e5', '49e353dd-1b61-4360-9681-d406fcb5b225'),
	('2026-08-14 08:50:49.921674+00', '6f829522-191e-4646-b1cb-40cf79cf50e5', 'b1cd5d2c-d6cc-49f6-b6ad-59a28b74270e'),
	('2026-08-14 08:50:51.571907+00', '6f829522-191e-4646-b1cb-40cf79cf50e5', '30dbbd60-0875-44cc-b366-f2b349a34041'),
	('2026-08-14 08:50:53.920108+00', '6f829522-191e-4646-b1cb-40cf79cf50e5', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-14 08:50:56.203061+00', '6f829522-191e-4646-b1cb-40cf79cf50e5', 'dbf80a09-6e2e-472d-8db6-ca2421ad4798'),
	('2026-08-14 08:50:58.503045+00', '6f829522-191e-4646-b1cb-40cf79cf50e5', '1f83b77b-2caa-4e35-a9b9-20b699bfe4da'),
	('2026-08-14 08:51:03.465797+00', '6f829522-191e-4646-b1cb-40cf79cf50e5', '43199d38-1b94-4a2a-8fa7-4bffc222ac35'),
	('2026-08-14 08:51:06.155511+00', '6f829522-191e-4646-b1cb-40cf79cf50e5', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-14 08:51:09.710458+00', '6f829522-191e-4646-b1cb-40cf79cf50e5', '49857a2c-b026-4f4f-a535-6bcf874925c4'),
	('2026-08-14 08:51:12.267589+00', '6f829522-191e-4646-b1cb-40cf79cf50e5', 'e1696625-cb21-4732-8f78-a512acab0202'),
	('2026-08-14 08:51:16.826538+00', '6f829522-191e-4646-b1cb-40cf79cf50e5', '8d1297b3-47ce-4e80-9409-b42acae58ff9'),
	('2026-08-14 08:51:18.970256+00', '6f829522-191e-4646-b1cb-40cf79cf50e5', '97b13e08-a16d-4a1f-8980-27028d484d38'),
	('2026-08-14 08:53:28.889326+00', '7e6e6fae-4ae4-4f69-a6dd-fb50ce49eafb', 'dcd64e6a-8c10-4562-85d2-0891eb111510'),
	('2026-08-14 08:53:31.845566+00', '7e6e6fae-4ae4-4f69-a6dd-fb50ce49eafb', '3ef91bcb-df61-4d4e-9b63-86c505735a0d'),
	('2026-08-14 08:53:34.094492+00', '7e6e6fae-4ae4-4f69-a6dd-fb50ce49eafb', 'b1cd5d2c-d6cc-49f6-b6ad-59a28b74270e'),
	('2026-08-14 08:53:34.81147+00', '7e6e6fae-4ae4-4f69-a6dd-fb50ce49eafb', '30dbbd60-0875-44cc-b366-f2b349a34041'),
	('2026-08-14 08:53:37.555743+00', '7e6e6fae-4ae4-4f69-a6dd-fb50ce49eafb', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-14 08:53:44.15213+00', '7e6e6fae-4ae4-4f69-a6dd-fb50ce49eafb', 'dbf80a09-6e2e-472d-8db6-ca2421ad4798'),
	('2026-08-14 08:53:46.462286+00', '7e6e6fae-4ae4-4f69-a6dd-fb50ce49eafb', '43199d38-1b94-4a2a-8fa7-4bffc222ac35'),
	('2026-08-14 08:53:49.057511+00', '7e6e6fae-4ae4-4f69-a6dd-fb50ce49eafb', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-14 08:53:51.860653+00', '7e6e6fae-4ae4-4f69-a6dd-fb50ce49eafb', '49857a2c-b026-4f4f-a535-6bcf874925c4'),
	('2026-08-14 08:53:54.483608+00', '7e6e6fae-4ae4-4f69-a6dd-fb50ce49eafb', '8d1297b3-47ce-4e80-9409-b42acae58ff9'),
	('2026-08-14 08:57:03.022114+00', 'd0625fac-5a4d-409e-bebd-1fa30a6aaf71', 'dcd64e6a-8c10-4562-85d2-0891eb111510'),
	('2026-08-14 08:57:03.669798+00', 'd0625fac-5a4d-409e-bebd-1fa30a6aaf71', '49e353dd-1b61-4360-9681-d406fcb5b225'),
	('2026-08-14 08:57:05.617029+00', 'd0625fac-5a4d-409e-bebd-1fa30a6aaf71', 'b1cd5d2c-d6cc-49f6-b6ad-59a28b74270e'),
	('2026-08-14 08:57:06.13242+00', 'd0625fac-5a4d-409e-bebd-1fa30a6aaf71', '30dbbd60-0875-44cc-b366-f2b349a34041'),
	('2026-08-14 08:57:08.383931+00', 'd0625fac-5a4d-409e-bebd-1fa30a6aaf71', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-14 08:57:10.094614+00', 'd0625fac-5a4d-409e-bebd-1fa30a6aaf71', 'dbf80a09-6e2e-472d-8db6-ca2421ad4798'),
	('2026-08-14 08:57:11.951424+00', 'd0625fac-5a4d-409e-bebd-1fa30a6aaf71', '1f83b77b-2caa-4e35-a9b9-20b699bfe4da'),
	('2026-08-14 08:57:15.536573+00', 'd0625fac-5a4d-409e-bebd-1fa30a6aaf71', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-14 08:57:20.882282+00', 'd0625fac-5a4d-409e-bebd-1fa30a6aaf71', '8d1297b3-47ce-4e80-9409-b42acae58ff9'),
	('2026-08-14 09:01:19.951681+00', 'af05c47a-d123-433d-8af6-7b8aa4ec036c', 'b1cd5d2c-d6cc-49f6-b6ad-59a28b74270e'),
	('2026-08-14 09:01:22.281138+00', 'af05c47a-d123-433d-8af6-7b8aa4ec036c', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-14 09:01:24.53634+00', 'af05c47a-d123-433d-8af6-7b8aa4ec036c', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-14 09:01:26.725496+00', 'af05c47a-d123-433d-8af6-7b8aa4ec036c', 'dbf80a09-6e2e-472d-8db6-ca2421ad4798'),
	('2026-08-14 09:01:31.389251+00', 'af05c47a-d123-433d-8af6-7b8aa4ec036c', '43199d38-1b94-4a2a-8fa7-4bffc222ac35'),
	('2026-08-14 09:01:34.504361+00', 'af05c47a-d123-433d-8af6-7b8aa4ec036c', '3ef91bcb-df61-4d4e-9b63-86c505735a0d'),
	('2026-08-14 09:01:36.406524+00', 'af05c47a-d123-433d-8af6-7b8aa4ec036c', 'a50f8d81-7ef0-4fb6-b024-d5b7a4e359d3'),
	('2026-08-14 09:01:40.832944+00', 'af05c47a-d123-433d-8af6-7b8aa4ec036c', '49e353dd-1b61-4360-9681-d406fcb5b225'),
	('2026-08-14 09:01:41.488896+00', 'af05c47a-d123-433d-8af6-7b8aa4ec036c', 'dcd64e6a-8c10-4562-85d2-0891eb111510'),
	('2026-08-14 09:01:43.67521+00', 'af05c47a-d123-433d-8af6-7b8aa4ec036c', '30dbbd60-0875-44cc-b366-f2b349a34041'),
	('2026-08-14 09:01:52.933972+00', 'af05c47a-d123-433d-8af6-7b8aa4ec036c', '7df03f30-5aa8-4b50-aad4-df647f4ff954'),
	('2026-08-14 09:02:03.348338+00', 'af05c47a-d123-433d-8af6-7b8aa4ec036c', '49857a2c-b026-4f4f-a535-6bcf874925c4'),
	('2026-08-14 09:02:15.400668+00', 'af05c47a-d123-433d-8af6-7b8aa4ec036c', '518cb386-f660-403f-8aa5-2ef5696f8b8e'),
	('2026-08-14 09:02:18.252831+00', 'af05c47a-d123-433d-8af6-7b8aa4ec036c', '8d1297b3-47ce-4e80-9409-b42acae58ff9'),
	('2026-08-14 09:02:19.769842+00', 'af05c47a-d123-433d-8af6-7b8aa4ec036c', '97b13e08-a16d-4a1f-8980-27028d484d38'),
	('2026-08-14 09:02:21.307278+00', 'af05c47a-d123-433d-8af6-7b8aa4ec036c', '65297bc7-2523-4974-a6c8-e242d5672231'),
	('2026-08-14 09:05:13.423316+00', '52294937-70bb-438b-8108-44d05056efbf', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-14 09:05:16.117847+00', '52294937-70bb-438b-8108-44d05056efbf', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-14 09:05:18.100119+00', '52294937-70bb-438b-8108-44d05056efbf', 'dbf80a09-6e2e-472d-8db6-ca2421ad4798'),
	('2026-08-14 09:05:21.991848+00', '52294937-70bb-438b-8108-44d05056efbf', '43199d38-1b94-4a2a-8fa7-4bffc222ac35'),
	('2026-08-14 09:05:25.078465+00', '52294937-70bb-438b-8108-44d05056efbf', 'a50f8d81-7ef0-4fb6-b024-d5b7a4e359d3'),
	('2026-08-14 09:05:27.069619+00', '52294937-70bb-438b-8108-44d05056efbf', '3ef91bcb-df61-4d4e-9b63-86c505735a0d'),
	('2026-08-14 09:05:29.00909+00', '52294937-70bb-438b-8108-44d05056efbf', 'dcd64e6a-8c10-4562-85d2-0891eb111510'),
	('2026-08-14 09:05:31.054813+00', '52294937-70bb-438b-8108-44d05056efbf', '49e353dd-1b61-4360-9681-d406fcb5b225'),
	('2026-08-14 09:05:33.379355+00', '52294937-70bb-438b-8108-44d05056efbf', '30dbbd60-0875-44cc-b366-f2b349a34041'),
	('2026-08-14 09:05:34.097642+00', '52294937-70bb-438b-8108-44d05056efbf', 'b1cd5d2c-d6cc-49f6-b6ad-59a28b74270e'),
	('2026-08-14 09:32:02.252163+00', 'affacf6c-4bd8-4854-bfe4-1cf616357612', 'dcd64e6a-8c10-4562-85d2-0891eb111510'),
	('2026-08-14 09:32:04.829229+00', 'affacf6c-4bd8-4854-bfe4-1cf616357612', 'dbf80a09-6e2e-472d-8db6-ca2421ad4798'),
	('2026-08-14 09:32:11.8937+00', 'affacf6c-4bd8-4854-bfe4-1cf616357612', '43199d38-1b94-4a2a-8fa7-4bffc222ac35'),
	('2026-08-14 09:32:14.403547+00', 'affacf6c-4bd8-4854-bfe4-1cf616357612', '3ef91bcb-df61-4d4e-9b63-86c505735a0d'),
	('2026-08-14 09:32:16.354155+00', 'affacf6c-4bd8-4854-bfe4-1cf616357612', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-14 09:32:19.846966+00', 'affacf6c-4bd8-4854-bfe4-1cf616357612', 'b1cd5d2c-d6cc-49f6-b6ad-59a28b74270e'),
	('2026-08-14 09:32:20.718856+00', 'affacf6c-4bd8-4854-bfe4-1cf616357612', '30dbbd60-0875-44cc-b366-f2b349a34041'),
	('2026-08-14 09:32:25.395955+00', 'affacf6c-4bd8-4854-bfe4-1cf616357612', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-14 09:32:29.601861+00', 'affacf6c-4bd8-4854-bfe4-1cf616357612', '1f83b77b-2caa-4e35-a9b9-20b699bfe4da'),
	('2026-08-14 09:32:33.474903+00', 'affacf6c-4bd8-4854-bfe4-1cf616357612', 'cafda503-76e1-409d-9fca-3ec7bc1981dd'),
	('2026-08-14 09:32:38.506544+00', 'affacf6c-4bd8-4854-bfe4-1cf616357612', '8d1297b3-47ce-4e80-9409-b42acae58ff9'),
	('2026-08-14 09:32:40.270616+00', 'affacf6c-4bd8-4854-bfe4-1cf616357612', '97b13e08-a16d-4a1f-8980-27028d484d38'),
	('2026-08-14 09:38:23.819587+00', '5bcdae8c-e30b-483c-ae04-33982cafbc7e', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-14 09:38:26.034632+00', '5bcdae8c-e30b-483c-ae04-33982cafbc7e', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-14 09:38:27.935702+00', '5bcdae8c-e30b-483c-ae04-33982cafbc7e', 'dbf80a09-6e2e-472d-8db6-ca2421ad4798'),
	('2026-08-14 09:38:31.227274+00', '5bcdae8c-e30b-483c-ae04-33982cafbc7e', '43199d38-1b94-4a2a-8fa7-4bffc222ac35'),
	('2026-08-14 09:38:33.498353+00', '5bcdae8c-e30b-483c-ae04-33982cafbc7e', 'a50f8d81-7ef0-4fb6-b024-d5b7a4e359d3'),
	('2026-08-14 09:38:35.597908+00', '5bcdae8c-e30b-483c-ae04-33982cafbc7e', '3ef91bcb-df61-4d4e-9b63-86c505735a0d'),
	('2026-08-14 09:38:37.150764+00', '5bcdae8c-e30b-483c-ae04-33982cafbc7e', 'dcd64e6a-8c10-4562-85d2-0891eb111510'),
	('2026-08-14 09:38:37.905931+00', '5bcdae8c-e30b-483c-ae04-33982cafbc7e', '49e353dd-1b61-4360-9681-d406fcb5b225'),
	('2026-08-14 09:38:41.565668+00', '5bcdae8c-e30b-483c-ae04-33982cafbc7e', 'b1cd5d2c-d6cc-49f6-b6ad-59a28b74270e'),
	('2026-08-14 09:38:42.103981+00', '5bcdae8c-e30b-483c-ae04-33982cafbc7e', '30dbbd60-0875-44cc-b366-f2b349a34041'),
	('2026-08-14 09:38:44.704649+00', '5bcdae8c-e30b-483c-ae04-33982cafbc7e', '65297bc7-2523-4974-a6c8-e242d5672231'),
	('2026-08-14 09:38:47.530762+00', '5bcdae8c-e30b-483c-ae04-33982cafbc7e', '49857a2c-b026-4f4f-a535-6bcf874925c4'),
	('2026-08-14 09:38:50.20726+00', '5bcdae8c-e30b-483c-ae04-33982cafbc7e', '97b13e08-a16d-4a1f-8980-27028d484d38'),
	('2026-08-14 09:38:52.297202+00', '5bcdae8c-e30b-483c-ae04-33982cafbc7e', '8d1297b3-47ce-4e80-9409-b42acae58ff9'),
	('2026-08-14 09:42:49.911007+00', '01504d89-dc7d-4999-a46e-0762c7419872', 'b1cd5d2c-d6cc-49f6-b6ad-59a28b74270e'),
	('2026-08-14 09:42:50.516134+00', '01504d89-dc7d-4999-a46e-0762c7419872', '30dbbd60-0875-44cc-b366-f2b349a34041'),
	('2026-08-14 09:42:53.252165+00', '01504d89-dc7d-4999-a46e-0762c7419872', '49e353dd-1b61-4360-9681-d406fcb5b225'),
	('2026-08-14 09:42:56.892258+00', '01504d89-dc7d-4999-a46e-0762c7419872', '3ef91bcb-df61-4d4e-9b63-86c505735a0d'),
	('2026-08-14 09:43:01.859216+00', '01504d89-dc7d-4999-a46e-0762c7419872', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-14 09:43:04.743366+00', '01504d89-dc7d-4999-a46e-0762c7419872', '49857a2c-b026-4f4f-a535-6bcf874925c4'),
	('2026-08-14 09:43:09.869236+00', '01504d89-dc7d-4999-a46e-0762c7419872', '97b13e08-a16d-4a1f-8980-27028d484d38'),
	('2026-08-14 09:43:14.466171+00', '01504d89-dc7d-4999-a46e-0762c7419872', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-14 09:43:17.681393+00', '01504d89-dc7d-4999-a46e-0762c7419872', 'a50f8d81-7ef0-4fb6-b024-d5b7a4e359d3'),
	('2026-08-14 09:43:22.797046+00', '01504d89-dc7d-4999-a46e-0762c7419872', '43199d38-1b94-4a2a-8fa7-4bffc222ac35'),
	('2026-08-14 09:44:21.441351+00', '01504d89-dc7d-4999-a46e-0762c7419872', 'd0897978-9145-4ccc-9dcb-3da903addb18'),
	('2026-08-14 09:47:55.446899+00', '1b5eb134-dada-4c9a-8bc6-b05f60d69b52', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-14 09:47:59.066748+00', '1b5eb134-dada-4c9a-8bc6-b05f60d69b52', '43199d38-1b94-4a2a-8fa7-4bffc222ac35'),
	('2026-08-14 09:48:03.417547+00', '1b5eb134-dada-4c9a-8bc6-b05f60d69b52', '49e353dd-1b61-4360-9681-d406fcb5b225'),
	('2026-08-14 09:48:05.30824+00', '1b5eb134-dada-4c9a-8bc6-b05f60d69b52', 'b1cd5d2c-d6cc-49f6-b6ad-59a28b74270e'),
	('2026-08-14 09:48:06.007584+00', '1b5eb134-dada-4c9a-8bc6-b05f60d69b52', '30dbbd60-0875-44cc-b366-f2b349a34041'),
	('2026-08-14 09:48:08.638577+00', '1b5eb134-dada-4c9a-8bc6-b05f60d69b52', 'eba21030-eeed-4b86-95fa-296e3e03e711'),
	('2026-08-14 09:48:12.32404+00', '1b5eb134-dada-4c9a-8bc6-b05f60d69b52', 'dbf80a09-6e2e-472d-8db6-ca2421ad4798'),
	('2026-08-14 09:48:15.664584+00', '1b5eb134-dada-4c9a-8bc6-b05f60d69b52', 'dcd64e6a-8c10-4562-85d2-0891eb111510'),
	('2026-08-14 09:48:18.109537+00', '1b5eb134-dada-4c9a-8bc6-b05f60d69b52', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-14 09:48:21.474448+00', '1b5eb134-dada-4c9a-8bc6-b05f60d69b52', 'cafda503-76e1-409d-9fca-3ec7bc1981dd'),
	('2026-08-14 09:48:34.293716+00', '1b5eb134-dada-4c9a-8bc6-b05f60d69b52', '8d1297b3-47ce-4e80-9409-b42acae58ff9'),
	('2026-08-14 10:01:31.317294+00', '923f3d93-b331-4d03-ac87-4211f8211675', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-14 10:01:33.527046+00', '923f3d93-b331-4d03-ac87-4211f8211675', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-14 10:01:35.737458+00', '923f3d93-b331-4d03-ac87-4211f8211675', 'dbf80a09-6e2e-472d-8db6-ca2421ad4798'),
	('2026-08-14 10:01:38.529343+00', '923f3d93-b331-4d03-ac87-4211f8211675', '43199d38-1b94-4a2a-8fa7-4bffc222ac35'),
	('2026-08-14 10:01:41.580591+00', '923f3d93-b331-4d03-ac87-4211f8211675', 'a50f8d81-7ef0-4fb6-b024-d5b7a4e359d3'),
	('2026-08-14 10:01:44.363928+00', '923f3d93-b331-4d03-ac87-4211f8211675', '3ef91bcb-df61-4d4e-9b63-86c505735a0d'),
	('2026-08-14 10:01:46.864465+00', '923f3d93-b331-4d03-ac87-4211f8211675', '49e353dd-1b61-4360-9681-d406fcb5b225'),
	('2026-08-14 10:01:47.650571+00', '923f3d93-b331-4d03-ac87-4211f8211675', 'dcd64e6a-8c10-4562-85d2-0891eb111510'),
	('2026-08-14 10:01:51.335467+00', '923f3d93-b331-4d03-ac87-4211f8211675', 'b1cd5d2c-d6cc-49f6-b6ad-59a28b74270e'),
	('2026-08-14 10:01:51.856505+00', '923f3d93-b331-4d03-ac87-4211f8211675', '30dbbd60-0875-44cc-b366-f2b349a34041'),
	('2026-08-14 10:02:03.160927+00', '923f3d93-b331-4d03-ac87-4211f8211675', '518cb386-f660-403f-8aa5-2ef5696f8b8e'),
	('2026-08-14 10:02:09.01194+00', '923f3d93-b331-4d03-ac87-4211f8211675', '97b13e08-a16d-4a1f-8980-27028d484d38'),
	('2026-08-14 10:02:00.985674+00', '923f3d93-b331-4d03-ac87-4211f8211675', '49857a2c-b026-4f4f-a535-6bcf874925c4'),
	('2026-08-14 10:02:06.651234+00', '923f3d93-b331-4d03-ac87-4211f8211675', '8d1297b3-47ce-4e80-9409-b42acae58ff9'),
	('2026-08-14 10:05:23.473351+00', 'c2b6a59b-bb8d-4d20-98bc-6dc858d21722', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-14 10:05:25.161795+00', 'c2b6a59b-bb8d-4d20-98bc-6dc858d21722', '49e353dd-1b61-4360-9681-d406fcb5b225'),
	('2026-08-14 10:05:27.221672+00', 'c2b6a59b-bb8d-4d20-98bc-6dc858d21722', '3ef91bcb-df61-4d4e-9b63-86c505735a0d'),
	('2026-08-14 10:05:29.938266+00', 'c2b6a59b-bb8d-4d20-98bc-6dc858d21722', 'dbf80a09-6e2e-472d-8db6-ca2421ad4798'),
	('2026-08-14 10:05:32.273399+00', 'c2b6a59b-bb8d-4d20-98bc-6dc858d21722', '43199d38-1b94-4a2a-8fa7-4bffc222ac35'),
	('2026-08-14 10:05:34.260134+00', 'c2b6a59b-bb8d-4d20-98bc-6dc858d21722', 'dcd64e6a-8c10-4562-85d2-0891eb111510'),
	('2026-08-14 10:05:36.899357+00', 'c2b6a59b-bb8d-4d20-98bc-6dc858d21722', 'b1cd5d2c-d6cc-49f6-b6ad-59a28b74270e'),
	('2026-08-14 10:05:37.429538+00', 'c2b6a59b-bb8d-4d20-98bc-6dc858d21722', '30dbbd60-0875-44cc-b366-f2b349a34041'),
	('2026-08-14 10:05:53.333947+00', 'c2b6a59b-bb8d-4d20-98bc-6dc858d21722', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-14 10:05:56.220989+00', 'c2b6a59b-bb8d-4d20-98bc-6dc858d21722', '8d1297b3-47ce-4e80-9409-b42acae58ff9'),
	('2026-08-14 10:05:58.270532+00', 'c2b6a59b-bb8d-4d20-98bc-6dc858d21722', '97b13e08-a16d-4a1f-8980-27028d484d38'),
	('2026-08-14 10:10:49.973446+00', '23edd5ea-125a-4bea-856b-3ce16cebe08f', '13fe7e7b-40b7-42cc-bc83-2626d4282360'),
	('2026-08-14 10:10:50.598152+00', '23edd5ea-125a-4bea-856b-3ce16cebe08f', 'd36906cb-9153-4380-9a5a-3dfcd1e500d1'),
	('2026-08-14 10:10:53.307781+00', '23edd5ea-125a-4bea-856b-3ce16cebe08f', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-14 10:10:56.781129+00', '23edd5ea-125a-4bea-856b-3ce16cebe08f', '65297bc7-2523-4974-a6c8-e242d5672231'),
	('2026-08-14 10:10:58.984708+00', '23edd5ea-125a-4bea-856b-3ce16cebe08f', '97b13e08-a16d-4a1f-8980-27028d484d38'),
	('2026-08-14 10:11:02.167754+00', '23edd5ea-125a-4bea-856b-3ce16cebe08f', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-14 10:11:04.145509+00', '23edd5ea-125a-4bea-856b-3ce16cebe08f', '3ef91bcb-df61-4d4e-9b63-86c505735a0d'),
	('2026-08-14 10:11:08.0749+00', '23edd5ea-125a-4bea-856b-3ce16cebe08f', '43199d38-1b94-4a2a-8fa7-4bffc222ac35'),
	('2026-08-14 10:11:11.334203+00', '23edd5ea-125a-4bea-856b-3ce16cebe08f', 'dbf80a09-6e2e-472d-8db6-ca2421ad4798'),
	('2026-08-14 10:11:14.27123+00', '23edd5ea-125a-4bea-856b-3ce16cebe08f', 'a30ebab5-6095-4f07-804a-78ad89486b2c'),
	('2026-08-14 10:11:18.089439+00', '23edd5ea-125a-4bea-856b-3ce16cebe08f', 'a50f8d81-7ef0-4fb6-b024-d5b7a4e359d3'),
	('2026-08-14 11:45:15.604379+00', '87945c32-0e99-4ce3-bd31-eb81df7d456f', '43199d38-1b94-4a2a-8fa7-4bffc222ac35'),
	('2026-08-14 11:45:18.006764+00', '87945c32-0e99-4ce3-bd31-eb81df7d456f', '90acc116-cf15-4939-ad99-1e94b043244c'),
	('2026-08-14 11:45:29.45373+00', '87945c32-0e99-4ce3-bd31-eb81df7d456f', '5f318fb2-480c-4bd8-9992-5ec66325d4e5'),
	('2026-08-14 11:45:38.32506+00', '87945c32-0e99-4ce3-bd31-eb81df7d456f', '97b13e08-a16d-4a1f-8980-27028d484d38'),
	('2026-08-14 11:45:40.837147+00', '87945c32-0e99-4ce3-bd31-eb81df7d456f', '65297bc7-2523-4974-a6c8-e242d5672231'),
	('2026-08-14 11:45:42.850517+00', '87945c32-0e99-4ce3-bd31-eb81df7d456f', '49857a2c-b026-4f4f-a535-6bcf874925c4'),
	('2026-08-14 11:45:45.031677+00', '87945c32-0e99-4ce3-bd31-eb81df7d456f', 'b1cd5d2c-d6cc-49f6-b6ad-59a28b74270e'),
	('2026-08-14 11:45:45.558636+00', '87945c32-0e99-4ce3-bd31-eb81df7d456f', '30dbbd60-0875-44cc-b366-f2b349a34041'),
	('2026-08-14 11:45:47.744663+00', '87945c32-0e99-4ce3-bd31-eb81df7d456f', 'dbf80a09-6e2e-472d-8db6-ca2421ad4798'),
	('2026-08-14 11:45:50.827767+00', '87945c32-0e99-4ce3-bd31-eb81df7d456f', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-14 11:45:52.862845+00', '87945c32-0e99-4ce3-bd31-eb81df7d456f', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-17 06:54:18.601673+00', '7b33be02-0d93-4182-8cd5-4f60888ea04e', 'dcd64e6a-8c10-4562-85d2-0891eb111510'),
	('2026-08-17 06:54:19.284761+00', '7b33be02-0d93-4182-8cd5-4f60888ea04e', '49e353dd-1b61-4360-9681-d406fcb5b225'),
	('2026-08-17 06:54:22.158213+00', '7b33be02-0d93-4182-8cd5-4f60888ea04e', 'b1cd5d2c-d6cc-49f6-b6ad-59a28b74270e'),
	('2026-08-17 06:54:22.729464+00', '7b33be02-0d93-4182-8cd5-4f60888ea04e', '30dbbd60-0875-44cc-b366-f2b349a34041'),
	('2026-08-17 06:54:25.827203+00', '7b33be02-0d93-4182-8cd5-4f60888ea04e', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-17 06:54:28.666116+00', '7b33be02-0d93-4182-8cd5-4f60888ea04e', 'dbf80a09-6e2e-472d-8db6-ca2421ad4798'),
	('2026-08-17 06:54:32.835549+00', '7b33be02-0d93-4182-8cd5-4f60888ea04e', '43199d38-1b94-4a2a-8fa7-4bffc222ac35'),
	('2026-08-17 06:54:35.357141+00', '7b33be02-0d93-4182-8cd5-4f60888ea04e', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-17 06:54:39.295235+00', '7b33be02-0d93-4182-8cd5-4f60888ea04e', '49857a2c-b026-4f4f-a535-6bcf874925c4'),
	('2026-08-17 06:54:42.733544+00', '7b33be02-0d93-4182-8cd5-4f60888ea04e', '8d1297b3-47ce-4e80-9409-b42acae58ff9'),
	('2026-08-17 06:56:29.311882+00', '7b33be02-0d93-4182-8cd5-4f60888ea04e', '97b13e08-a16d-4a1f-8980-27028d484d38'),
	('2026-08-17 06:56:30.146654+00', '7b33be02-0d93-4182-8cd5-4f60888ea04e', '62885680-9c6f-4ed2-bdeb-26fa0ac2a40f'),
	('2026-08-17 07:53:26.341046+00', 'ce39fc2e-4a33-412d-a4d4-77730fb32e6e', 'b1cd5d2c-d6cc-49f6-b6ad-59a28b74270e'),
	('2026-08-17 07:53:27.16582+00', 'ce39fc2e-4a33-412d-a4d4-77730fb32e6e', '30dbbd60-0875-44cc-b366-f2b349a34041'),
	('2026-08-17 07:53:29.105326+00', 'ce39fc2e-4a33-412d-a4d4-77730fb32e6e', '49e353dd-1b61-4360-9681-d406fcb5b225'),
	('2026-08-17 07:53:39.313688+00', 'ce39fc2e-4a33-412d-a4d4-77730fb32e6e', '7df03f30-5aa8-4b50-aad4-df647f4ff954'),
	('2026-08-17 07:53:42.722884+00', 'ce39fc2e-4a33-412d-a4d4-77730fb32e6e', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-17 07:53:45.181245+00', 'ce39fc2e-4a33-412d-a4d4-77730fb32e6e', 'dcd64e6a-8c10-4562-85d2-0891eb111510'),
	('2026-08-17 07:53:47.235604+00', 'ce39fc2e-4a33-412d-a4d4-77730fb32e6e', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-17 07:53:49.545379+00', 'ce39fc2e-4a33-412d-a4d4-77730fb32e6e', '5f318fb2-480c-4bd8-9992-5ec66325d4e5'),
	('2026-08-17 07:53:52.138554+00', 'ce39fc2e-4a33-412d-a4d4-77730fb32e6e', '1f83b77b-2caa-4e35-a9b9-20b699bfe4da'),
	('2026-08-17 08:17:34.148171+00', 'd4a39bfc-129d-4a15-af35-f7f68da0a07a', '1ece23b9-1833-4e72-acf0-8ff4380f9ccc'),
	('2026-08-17 13:19:32.149105+00', '7aac9d59-0f77-42fb-8e3d-2323ac2bb524', '49e353dd-1b61-4360-9681-d406fcb5b225'),
	('2026-08-17 13:19:43.747162+00', '7aac9d59-0f77-42fb-8e3d-2323ac2bb524', 'dcd64e6a-8c10-4562-85d2-0891eb111510'),
	('2026-08-17 13:20:02.508642+00', '7aac9d59-0f77-42fb-8e3d-2323ac2bb524', '7df03f30-5aa8-4b50-aad4-df647f4ff954'),
	('2026-08-17 13:20:28.585269+00', '7aac9d59-0f77-42fb-8e3d-2323ac2bb524', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-17 13:21:23.940223+00', '7aac9d59-0f77-42fb-8e3d-2323ac2bb524', 'a30ebab5-6095-4f07-804a-78ad89486b2c'),
	('2026-08-17 13:22:51.099139+00', 'a43d684d-7c4a-4ae8-bb73-b6ada59f50d4', '7df03f30-5aa8-4b50-aad4-df647f4ff954'),
	('2026-08-17 13:22:59.005105+00', 'a43d684d-7c4a-4ae8-bb73-b6ada59f50d4', 'dbf80a09-6e2e-472d-8db6-ca2421ad4798'),
	('2026-08-17 14:00:43.130423+00', 'e666230e-8692-48ba-ac42-0779bc862919', '3ef91bcb-df61-4d4e-9b63-86c505735a0d'),
	('2026-08-17 14:00:46.573667+00', 'e666230e-8692-48ba-ac42-0779bc862919', '7df03f30-5aa8-4b50-aad4-df647f4ff954'),
	('2026-08-17 14:00:49.548924+00', 'e666230e-8692-48ba-ac42-0779bc862919', '65297bc7-2523-4974-a6c8-e242d5672231'),
	('2026-08-17 14:00:57.291526+00', 'e666230e-8692-48ba-ac42-0779bc862919', 'e1696625-cb21-4732-8f78-a512acab0202'),
	('2026-08-17 14:01:00.488107+00', 'e666230e-8692-48ba-ac42-0779bc862919', '8d1297b3-47ce-4e80-9409-b42acae58ff9'),
	('2026-08-17 14:01:06.44178+00', 'e666230e-8692-48ba-ac42-0779bc862919', '8a02c5c5-6f64-4d81-abb8-e10d2579ee81'),
	('2026-08-17 14:01:08.961918+00', 'e666230e-8692-48ba-ac42-0779bc862919', '1f83b77b-2caa-4e35-a9b9-20b699bfe4da'),
	('2026-08-17 14:01:15.027177+00', 'e666230e-8692-48ba-ac42-0779bc862919', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-17 14:01:17.41276+00', 'e666230e-8692-48ba-ac42-0779bc862919', 'dcd64e6a-8c10-4562-85d2-0891eb111510'),
	('2026-08-17 14:01:19.858261+00', 'e666230e-8692-48ba-ac42-0779bc862919', 'dbf80a09-6e2e-472d-8db6-ca2421ad4798'),
	('2026-08-17 14:01:22.345373+00', 'e666230e-8692-48ba-ac42-0779bc862919', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-17 14:01:23.994012+00', 'e666230e-8692-48ba-ac42-0779bc862919', 'b1cd5d2c-d6cc-49f6-b6ad-59a28b74270e'),
	('2026-08-17 14:01:25.777781+00', 'e666230e-8692-48ba-ac42-0779bc862919', '30dbbd60-0875-44cc-b366-f2b349a34041'),
	('2026-08-17 14:01:28.834226+00', 'e666230e-8692-48ba-ac42-0779bc862919', '49e353dd-1b61-4360-9681-d406fcb5b225'),
	('2026-08-17 14:01:35.504492+00', 'e666230e-8692-48ba-ac42-0779bc862919', 'a50f8d81-7ef0-4fb6-b024-d5b7a4e359d3'),
	('2026-08-17 14:13:45.775284+00', '77ee2dd3-3533-4bb1-a9c2-16d0a64dfd47', '62885680-9c6f-4ed2-bdeb-26fa0ac2a40f'),
	('2026-08-17 14:13:48.096249+00', '77ee2dd3-3533-4bb1-a9c2-16d0a64dfd47', 'dcd64e6a-8c10-4562-85d2-0891eb111510'),
	('2026-08-17 14:13:49.847109+00', '77ee2dd3-3533-4bb1-a9c2-16d0a64dfd47', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-17 14:13:52.925007+00', '77ee2dd3-3533-4bb1-a9c2-16d0a64dfd47', 'dbf80a09-6e2e-472d-8db6-ca2421ad4798'),
	('2026-08-17 14:13:55.660547+00', '77ee2dd3-3533-4bb1-a9c2-16d0a64dfd47', '1f83b77b-2caa-4e35-a9b9-20b699bfe4da'),
	('2026-08-17 14:13:57.716391+00', '77ee2dd3-3533-4bb1-a9c2-16d0a64dfd47', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-17 14:14:02.828734+00', '77ee2dd3-3533-4bb1-a9c2-16d0a64dfd47', '49857a2c-b026-4f4f-a535-6bcf874925c4'),
	('2026-08-17 14:14:08.661922+00', '77ee2dd3-3533-4bb1-a9c2-16d0a64dfd47', '8d1297b3-47ce-4e80-9409-b42acae58ff9'),
	('2026-08-17 14:14:14.041913+00', '77ee2dd3-3533-4bb1-a9c2-16d0a64dfd47', '49e353dd-1b61-4360-9681-d406fcb5b225'),
	('2026-08-17 14:14:14.641621+00', '77ee2dd3-3533-4bb1-a9c2-16d0a64dfd47', 'b1cd5d2c-d6cc-49f6-b6ad-59a28b74270e'),
	('2026-08-17 14:14:15.593342+00', '77ee2dd3-3533-4bb1-a9c2-16d0a64dfd47', '30dbbd60-0875-44cc-b366-f2b349a34041'),
	('2026-08-17 14:14:22.054662+00', '77ee2dd3-3533-4bb1-a9c2-16d0a64dfd47', '3ef91bcb-df61-4d4e-9b63-86c505735a0d'),
	('2026-08-17 14:14:23.04966+00', '77ee2dd3-3533-4bb1-a9c2-16d0a64dfd47', 'a50f8d81-7ef0-4fb6-b024-d5b7a4e359d3'),
	('2026-08-17 14:20:33.942957+00', '94638a3c-c959-4d13-a7ba-666ece12366f', '13fe7e7b-40b7-42cc-bc83-2626d4282360'),
	('2026-08-17 14:20:37.045788+00', '94638a3c-c959-4d13-a7ba-666ece12366f', '3ef91bcb-df61-4d4e-9b63-86c505735a0d'),
	('2026-08-17 14:20:44.150477+00', '94638a3c-c959-4d13-a7ba-666ece12366f', '7df03f30-5aa8-4b50-aad4-df647f4ff954'),
	('2026-08-17 14:20:46.775653+00', '94638a3c-c959-4d13-a7ba-666ece12366f', 'd36906cb-9153-4380-9a5a-3dfcd1e500d1'),
	('2026-08-17 14:20:49.958892+00', '94638a3c-c959-4d13-a7ba-666ece12366f', '43199d38-1b94-4a2a-8fa7-4bffc222ac35'),
	('2026-08-17 14:20:52.628952+00', '94638a3c-c959-4d13-a7ba-666ece12366f', '65297bc7-2523-4974-a6c8-e242d5672231'),
	('2026-08-17 14:20:56.681129+00', '94638a3c-c959-4d13-a7ba-666ece12366f', '49857a2c-b026-4f4f-a535-6bcf874925c4'),
	('2026-08-17 14:21:03.663443+00', '94638a3c-c959-4d13-a7ba-666ece12366f', '518cb386-f660-403f-8aa5-2ef5696f8b8e'),
	('2026-08-17 14:21:08.843038+00', '94638a3c-c959-4d13-a7ba-666ece12366f', '8d1297b3-47ce-4e80-9409-b42acae58ff9'),
	('2026-08-17 14:21:13.834425+00', '94638a3c-c959-4d13-a7ba-666ece12366f', '97b13e08-a16d-4a1f-8980-27028d484d38'),
	('2026-08-17 14:21:16.970145+00', '94638a3c-c959-4d13-a7ba-666ece12366f', '651854d3-de90-4db0-aefd-b6201fef29fc'),
	('2026-08-17 14:21:21.847445+00', '94638a3c-c959-4d13-a7ba-666ece12366f', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-17 14:21:26.267233+00', '94638a3c-c959-4d13-a7ba-666ece12366f', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-17 14:21:27.030722+00', '94638a3c-c959-4d13-a7ba-666ece12366f', 'dbf80a09-6e2e-472d-8db6-ca2421ad4798'),
	('2026-08-17 14:21:32.591302+00', '94638a3c-c959-4d13-a7ba-666ece12366f', 'b1cd5d2c-d6cc-49f6-b6ad-59a28b74270e'),
	('2026-08-17 14:21:33.351827+00', '94638a3c-c959-4d13-a7ba-666ece12366f', '30dbbd60-0875-44cc-b366-f2b349a34041'),
	('2026-08-17 14:21:34.370255+00', '94638a3c-c959-4d13-a7ba-666ece12366f', 'dcd64e6a-8c10-4562-85d2-0891eb111510'),
	('2026-08-17 14:21:36.66041+00', '94638a3c-c959-4d13-a7ba-666ece12366f', '49e353dd-1b61-4360-9681-d406fcb5b225'),
	('2026-08-17 14:21:39.656676+00', '94638a3c-c959-4d13-a7ba-666ece12366f', 'a50f8d81-7ef0-4fb6-b024-d5b7a4e359d3'),
	('2026-08-17 14:25:58.774701+00', 'd4a39bfc-129d-4a15-af35-f7f68da0a07a', '49e353dd-1b61-4360-9681-d406fcb5b225'),
	('2026-08-17 14:26:01.374582+00', 'd4a39bfc-129d-4a15-af35-f7f68da0a07a', '3ef91bcb-df61-4d4e-9b63-86c505735a0d'),
	('2026-08-17 14:26:03.992531+00', 'd4a39bfc-129d-4a15-af35-f7f68da0a07a', '1f83b77b-2caa-4e35-a9b9-20b699bfe4da'),
	('2026-08-17 14:26:05.977174+00', 'd4a39bfc-129d-4a15-af35-f7f68da0a07a', '7df03f30-5aa8-4b50-aad4-df647f4ff954'),
	('2026-08-17 14:26:10.48061+00', 'd4a39bfc-129d-4a15-af35-f7f68da0a07a', '651854d3-de90-4db0-aefd-b6201fef29fc'),
	('2026-08-17 14:26:18.254518+00', 'd4a39bfc-129d-4a15-af35-f7f68da0a07a', '65297bc7-2523-4974-a6c8-e242d5672231'),
	('2026-08-17 14:26:32.019054+00', 'd4a39bfc-129d-4a15-af35-f7f68da0a07a', 'e1696625-cb21-4732-8f78-a512acab0202'),
	('2026-08-17 14:26:35.080649+00', 'd4a39bfc-129d-4a15-af35-f7f68da0a07a', 'b1cd5d2c-d6cc-49f6-b6ad-59a28b74270e'),
	('2026-08-17 14:26:35.716927+00', 'd4a39bfc-129d-4a15-af35-f7f68da0a07a', '30dbbd60-0875-44cc-b366-f2b349a34041'),
	('2026-08-17 14:26:37.493624+00', 'd4a39bfc-129d-4a15-af35-f7f68da0a07a', '8a02c5c5-6f64-4d81-abb8-e10d2579ee81'),
	('2026-08-17 14:26:44.787809+00', 'd4a39bfc-129d-4a15-af35-f7f68da0a07a', '362faa4f-a905-4a08-9c21-8b10e2f43e4b'),
	('2026-08-17 14:26:47.904799+00', 'd4a39bfc-129d-4a15-af35-f7f68da0a07a', '6fb635de-717a-4060-ba97-6c67c440003f'),
	('2026-08-17 14:26:52.028994+00', 'd4a39bfc-129d-4a15-af35-f7f68da0a07a', '97b13e08-a16d-4a1f-8980-27028d484d38');


--
-- Data for Name: talent_projects; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: work_experiences; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."work_experiences" ("id", "talent_id", "company", "role", "duration", "description", "created_at") VALUES
	('077ac849-fe1a-485d-a114-0037f90423b8', '6f829522-191e-4646-b1cb-40cf79cf50e5', 'Absa', 'Product Engineer, Software Development', 'Apr 2026 - Present (5 mos)', 'I am gaining hands-on experience developing the frontend of an application using Angular, while building on my existing full-stack development foundation. This role is strengthening my practical software engineering skills and understanding of how development work contributes to a wider product.', '2026-08-14 08:52:06.970861+00'),
	('27d0ad71-93a0-42db-b1f7-bf5dea67e875', '7e6e6fae-4ae4-4f69-a6dd-fb50ce49eafb', 'Absa', 'System Support, IT Support', 'Apr 2026 - Present (5 mos)', 'I support users by managing access, assisting with application installations and raising incidents for technical issues. I also perform daily microsite checks before business hours to identify potential issues and help ensure systems are available and running as expected.', '2026-08-14 08:54:33.679478+00'),
	('b2cfebd8-f771-46f1-894a-d8bcb805224f', '010dc68d-dd48-41e6-abd7-4970ce7af1d4', 'Absa', 'QA Tester, Home Loans Software Automation', 'Apr 2026 - Present (5 mos)', 'I develop and maintain Playwright test scripts that automate real user journeys and support regression testing. I also contribute to an internal automation studio that reduces manual testing effort by automating repetitive application setup tasks.', '2026-08-14 08:30:25.458231+00'),
	('7707fee1-16af-40aa-b8d6-47de570a2d23', 'e9502a46-9845-4cec-8583-b4027ecf8f44', 'Absa', 'Support Engineer, Software Development', 'Apr 2026 - Present (5 mos)', 'I work with SQL, DBeaver, Visual Studio Code and Excel to support data and application-related tasks. I retrieve and analyse customer risk-profile data across different countries, including identifying customers without risk scores and using account information to obtain their risk ratings. I also support applications including NetReveal, eCASA and SLM.', '2026-08-14 08:38:39.308546+00'),
	('f24a16a6-9f7c-4835-afb6-b3b5b3000b3a', 'df26e137-7589-4007-8333-8340dfce7654', 'Absa', 'Junior Software Engineer', 'Apr 2026 - Present (5 mos)', 'I contribute to backend service enhancements and API integration while supporting the reliability of production banking systems. I investigate production issues using monitoring tools such as Instana and Elasticsearch, develop and execute unit tests, participate in code reviews and contribute to Agile/Scrum ceremonies including sprint planning, backlog grooming, stand-ups and retrospectives.', '2026-08-14 08:44:39.481929+00'),
	('a0924446-7d78-4eeb-873f-24de8361aff4', 'f0860153-4617-41f4-a089-25f60cde6dbe', 'Absa', 'QA Tester, Software Development', 'Apr 2026 - Present (5 mos)', 'I help ensure application quality before releases. I review requirements and user stories, create and maintain test cases, execute manual and exploratory testing, log defects and track results in Qmetry. I also use SQL in DBeaver to validate backend data, APIs and transactions, supporting functional and regression testing across web and mobile applications.', '2026-08-14 08:48:56.654553+00'),
	('690ae650-8090-4324-893d-dcbb1b9f1995', 'd0625fac-5a4d-409e-bebd-1fa30a6aaf71', 'Absa', 'QA Tester', 'Apr 2026 - Present (5 mos)', 'I analyse requirements, design and execute test cases, perform regression testing and identify and report defects. I use QMetry and testing tools to manage and execute tests across home loan application processes, while working with developers and QA teams to investigate issues and ensure applications meet functional and business requirements.', '2026-08-14 08:58:01.658973+00'),
	('811547d3-0ec0-4efe-86fb-2afc4a98388d', 'af05c47a-d123-433d-8af6-7b8aa4ec036c', 'Absa', 'Product Engineer, Africa Regions', 'Apr 2026 - Present (5 mos)', 'I contribute to the development, integration, testing and support of technology solutions across nine African regions. I analyse business and technical requirements, investigate production and UAT issues, support API and service integrations, and work with Business Analysts, Product Owners, developers and testers to deliver and improve products. I also contribute to testing, monitoring, error analysis and ongoing application support across the software development lifecycle.', '2026-08-14 09:02:58.541796+00'),
	('c1ac4b3a-0312-4259-b57f-c64ec833fba3', '52294937-70bb-438b-8108-44d05056efbf', 'Absa', 'Junior Software Developer', 'Apr 2026 - Present (5 mos)', 'I support the development team with UI/UX improvements and front-end development. I also handle manual data requests, accessing the mainframe to retrieve and provide client data to an internal department. This role has given me experience working within an enterprise technology environment while developing my technical and problem-solving skills.', '2026-08-14 09:06:06.701735+00'),
	('ee44eae5-f038-474f-8dfd-677c1bedc876', 'affacf6c-4bd8-4854-bfe4-1cf616357612', 'Absa', 'Quality Assurance Engineer, Software Testing', 'Apr 2026 - Present (5 mos)', 'I analyse business requirements, validate user stories, design and execute test cases, prepare test data and report defects using QMetry. I perform regression, sanity and retesting of fixes across applications including Salesforce, CoreSuite and Sapiens, working closely with developers to investigate issues, discuss fixes and validate that solutions meet requirements.', '2026-08-14 09:33:16.047322+00'),
	('5a6ff8ae-abf0-4c03-9ffc-3a6e183295bf', '5bcdae8c-e30b-483c-ae04-33982cafbc7e', 'Absa', 'Entry-Level Solution Analyst, IT Architecture', 'Apr 2026 - Present (5 mos)', 'As an Entry-Level Solution Analyst in ABSA’s IT Architecture team, I participate in business meetings, analyse requirements and translate business needs into clear technical requirements. I create SRS documents and solution diagrams for review, collaborate with Business Analysts, developers and Solution Architects, and contribute to UAT and API testing using tools such as Postman and Draw.io. I work on real banking projects while maintaining the required confidentiality.', '2026-08-14 09:39:24.010311+00'),
	('d4ac118a-a7fa-4943-b37b-a7901875c161', '01504d89-dc7d-4999-a46e-0762c7419872', 'Absa', 'Junior Salesforce Developer, Product Engineering', 'Apr 2026 - Present (5 mos)', 'I develop and update Salesforce functionality in response to business requirements. I contribute to new projects, including functionality supporting client call wrap-up processes, and assist with production incidents when issues arise. I also research APIs and system interactions to support smoother development and participate in daily Agile stand-ups to coordinate work and address blockers.', '2026-08-14 09:44:46.795917+00'),
	('5d235623-7af4-453f-8d02-87a8a815448a', '1b5eb134-dada-4c9a-8bc6-b05f60d69b52', 'Absa', 'QA Tester, Software Testing & Software Development', 'Apr 2026 - Present (5 mos)', 'I develop and maintain automated test cases using Java-based frameworks, Selenium and Playwright to validate existing functionality and new scenarios. I also contribute to backend development using Java and Spring Boot, frontend development with Angular, and database validation using PostgreSQL. My role involves troubleshooting issues, executing automated tests and working with the team to ensure new and existing features are reliable and meet required specifications.', '2026-08-14 09:49:06.429905+00'),
	('9bea5e78-e8fd-4a6c-a5c1-bff3432f0cee', '923f3d93-b331-4d03-ac87-4211f8211675', 'Absa', 'QA Automation Engineer, Software Development', 'Apr 2026 - Present (5 mos)', 'I contribute across software development and automated testing. I develop REST APIs and backend integrations using Spring Boot, work with PostgreSQL and contribute to frontend development using Angular. I also create and execute automated tests using Playwright and Selenium, while collaborating with cross-functional teams through Agile practices to deliver and support reliable software.', '2026-08-14 10:02:58.768514+00'),
	('66f1e992-bf56-4fa3-ba36-e911a84d1115', 'c2b6a59b-bb8d-4d20-98bc-6dc858d21722', 'Absa', 'Salesforce Product Engineer, Collections', 'Apr 2026 - Present (5 mos)', 'I develop and maintain Salesforce functionality using Apex and Lightning Web Components, and build Salesforce Flows to automate business processes. I investigate and resolve application issues, contribute to system enhancements and work with developers and business stakeholders to deliver solutions. I also participate in Agile ceremonies including sprint planning, stand-ups and retrospectives.', '2026-08-14 10:06:37.994061+00'),
	('dc6c1681-ba87-47ae-9a64-e444342ffb2a', '23edd5ea-125a-4bea-856b-3ce16cebe08f', 'Absa', 'Salesforce QA Tester, Data Engineering', 'Apr 2026 - Present (5 mos)', 'I perform manual and automation testing across Salesforce-based applications, including functional, regression, sanity, integration and end-to-end testing. I use tools including Salesforce, Sapiens, MuleSoft, Jira, QMetry and Selenium to execute tests, identify defects and validate that solutions meet business requirements and expected functionality.', '2026-08-14 10:11:45.041577+00'),
	('f4569869-a2c3-4275-9913-3c6b8f2f3bec', '87945c32-0e99-4ce3-bd31-eb81df7d456f', 'Absa', 'Junior Data Analyst', 'Apr 2026 - Present (5 mos)', 'I analyse, validate and migrate company data sourced from Hadoop as part of data-related projects. My current work includes using tools such as Ataccama, PostgreSQL, and Excel to investigate and manage data. This role has strengthened my understanding of data quality, migration processes and working with large datasets in a professional banking environment.', '2026-08-14 11:46:15.094667+00'),
	('82f228d8-4f3c-4a81-9946-9d1fa61803fc', '7b33be02-0d93-4182-8cd5-4f60888ea04e', 'Absa', 'Automation QA Tester, Home Loans', 'Apr 2026 - Present (5 mos)', 'Responsible for creating and maintaining automated test scripts, executing functional and regression testing, investigating defects and validating fixes. Works with Java, Selenium, SQL, PostgreSQL, Git/GitHub and Postman, while collaborating with developers, Business Analysts and QA team members to investigate issues and improve test coverage. Testing includes application processes, data amendments, document functionality and related features, as well as analysing test failures and communicating findings to the team.', '2026-08-17 06:56:54.447093+00'),
	('f35f15c2-92f8-4d95-aabf-fb6297cb7c6c', 'ce39fc2e-4a33-412d-a4d4-77730fb32e6e', 'Absa', 'Data Analyst, Data Engineering', 'Apr 2026 - Present (5 mos)', 'Responsible for supporting data migration by validating data between Oracle SQL and Microsoft SQL Server, monitoring transformation workflows and conducting parallel-run testing to compare data counts and content. Investigates production queries where sales data is not appearing as expected and works with the team to identify and resolve issues. Also contributes to month-end activities by comparing monthly and daily sales data, investigating discrepancies and supporting their resolution.', '2026-08-17 07:54:11.403826+00'),
	('0309a2ae-4655-48ba-ae50-1238889ef077', 'd4a39bfc-129d-4a15-af35-f7f68da0a07a', 'Absa', 'Junior SharePoint Developer', 'Apr 2026 - Present (5 mos)', 'Develops and improves digital solutions that support business processes, working primarily with Power Apps, Power Automate, SharePoint, Dataverse and Power BI, alongside SPFx, React, TypeScript, HTML and CSS. Leads development of the ARO Data Help Desk, a request-management solution built with Power Apps, SharePoint and Power Automate, including forms, validations, workflows and notifications. Also developed an SPFx Compliance PMO landing-page web part using configurable links and SharePoint data sources. Works with stakeholders and development teams to understand requirements, troubleshoot issues, test solutions and demonstrate completed work.', '2026-08-17 08:18:44.790233+00'),
	('0bd1568b-98c3-4526-b470-406d2d1e13de', 'e666230e-8692-48ba-ac42-0779bc862919', 'Absa', 'Junior SharePoint Developer', 'Apr 2026 - Present (5 mos)', 'Supports SharePoint Online solutions through site configuration, document management and workflow automation. Works with SharePoint Online, Power Automate and the Microsoft Power Platform to support business processes and improve operational efficiency.', '2026-08-17 14:01:54.719046+00'),
	('f47ba2b8-3862-428b-932c-b0734902d916', '77ee2dd3-3533-4bb1-a9c2-16d0a64dfd47', 'Absa', 'Automation QA Tester, Software Development', 'Apr 2026 - Present (5 mos)', 'Works as part of an Automation QA team, analysing requirements, identifying test scenarios, creating and maintaining automated test scripts, and executing functional and regression testing. Uses Java and Selenium WebDriver for automation, with GitHub for version control, Jira for task and defect tracking, QMetry for test management, Postman for API testing and SQL for database validation. Investigates automation failures and collaborates with team members through troubleshooting, code reviews and knowledge sharing. Currently expanding automation skills through learning Playwright.', '2026-08-17 14:14:43.011841+00'),
	('d8b89548-85ce-4089-bf1d-04dbc20ef9f1', '94638a3c-c959-4d13-a7ba-666ece12366f', 'Absa', 'Junior Product Engineer, Software Engineering', 'Apr 2026 - Present (5 mos)', 'Develops, tests, debugs and maintains software solutions that address business needs within Corporate Investment Banking. Works with developers, product teams and business stakeholders to understand requirements and contribute to backend services, APIs, business logic, databases and application interfaces. Uses technologies including C#, .NET, PostgreSQL, Docker, Git, Angular/React and AWS. Currently contributing to an application that helps colleagues request and understand the process for introducing new tools and technologies within Absa, providing practical experience in developing solutions within a regulated banking environment.', '2026-08-17 14:21:59.971446+00');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 430, true);


--
-- PostgreSQL database dump complete
--

-- \unrestrict qKi4GuMEGnZ9VF05cvk1b3veM6wuwEUzHJqz7aNPhVu1VmqBnAezz8R0zaTmAca

RESET ALL;
