--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 9.6.5

-- Started on 2017-10-08 13:51:56 PDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 9 (class 2615 OID 2844750)

CREATE SCHEMA advertising;
--
-- TOC entry 6 (class 2615 OID 4151634)

CREATE SCHEMA beta;

--
-- TOC entry 13 (class 2615 OID 2280257)

CREATE SCHEMA blog;


--
-- TOC entry 5 (class 2615 OID 1890442)

CREATE SCHEMA musician;

--
-- TOC entry 8 (class 2615 OID 2192955)

CREATE SCHEMA scale_info;



--
-- TOC entry 1 (class 3079 OID 13277)
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 3194 (class 0 OID 0)
-- Dependencies: 1
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = advertising, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 200 (class 1259 OID 2844796)

CREATE TABLE apple (
    musician_id character varying NOT NULL,
    musician_name character varying,
    apple_affiliate_link character varying
);

--
-- TOC entry 202 (class 1259 OID 2844888)
--

CREATE TABLE image_ads (
    ad_link character varying NOT NULL,
    ad_image character varying
);



SET search_path = musician, pg_catalog;

--
-- TOC entry 193 (class 1259 OID 1890451)

CREATE TABLE info (
    musician_id character varying NOT NULL,
    musician_name character varying,
    genre character varying,
    photo_path character varying,
    thumbnail_path character varying,
    added_date date DEFAULT now()
);


--
-- TOC entry 197 (class 1259 OID 1890501)

CREATE TABLE links (
    musician_id character varying NOT NULL,
    website character varying,
    facebook character varying,
    twitter character varying,
    patreon character varying,
    instagram character varying,
    bandcamp character varying,
    youtube character varying,
    amazon character varying,
    apple character varying,
    youtube_video character varying
);


SET search_path = advertising, pg_catalog;

--
-- TOC entry 201 (class 1259 OID 2844832)
--

CREATE VIEW one_amazon_ad AS
 SELECT t.musician_name,
    t.amazon AS amazon_link
   FROM (generate_series(1, 10) x(i)
     CROSS JOIN LATERAL ( SELECT links.musician_id,
            links.website,
            links.facebook,
            links.twitter,
            links.patreon,
            links.instagram,
            links.bandcamp,
            links.youtube,
            links.amazon,
            info.musician_name,
            info.genre,
            info.photo_path,
            info.thumbnail_path,
            info.added_date,
            x.i
           FROM (musician.links
             JOIN musician.info USING (musician_id))
          ORDER BY (random())) t)
 LIMIT 1;

--
-- TOC entry 204 (class 1259 OID 2845029)
--

CREATE VIEW one_apple_ad AS
 SELECT t.musician_id,
    t.musician_name,
    t.apple_affiliate_link
   FROM (generate_series(1, 10) x(i)
     CROSS JOIN LATERAL ( SELECT apple.musician_id,
            apple.musician_name,
            apple.apple_affiliate_link,
            x.i
           FROM apple
          ORDER BY (random())) t)
 LIMIT 1;


--
-- TOC entry 203 (class 1259 OID 2845013)
--

CREATE VIEW one_image_ad AS
 SELECT t.ad_link,
    t.ad_image
   FROM (generate_series(1, 10) x(i)
     CROSS JOIN LATERAL ( SELECT image_ads.ad_link,
            image_ads.ad_image,
            x.i
           FROM image_ads
          ORDER BY (random())) t)
 LIMIT 1;



SET search_path = beta, pg_catalog;

--
-- TOC entry 211 (class 1259 OID 4151773)
--

CREATE TABLE betas (
    email text NOT NULL,
    password text NOT NULL,
    signup_date date DEFAULT now() NOT NULL,
    active boolean DEFAULT true NOT NULL
);



SET search_path = blog, pg_catalog;

--
-- TOC entry 199 (class 1259 OID 2280258)
--

CREATE TABLE blogs (
    blog_id character varying NOT NULL,
    blog_title character varying,
    blog_content character varying,
    blog_date date DEFAULT now()
);



SET search_path = musician, pg_catalog;

--
-- TOC entry 196 (class 1259 OID 1890485)
--

CREATE TABLE apple_links (
    apple_link_id integer NOT NULL,
    musician_id character varying,
    link character varying
);



--
-- TOC entry 195 (class 1259 OID 1890483)
--

CREATE SEQUENCE apple_links_apple_link_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



--
-- TOC entry 3196 (class 0 OID 0)
-- Dependencies: 195
--

ALTER SEQUENCE apple_links_apple_link_id_seq OWNED BY apple_links.apple_link_id;


--
-- TOC entry 194 (class 1259 OID 1890470)
--

CREATE TABLE reviews (
    musician_id character varying NOT NULL,
    review character varying
);



--
-- TOC entry 192 (class 1259 OID 1890443)
--

CREATE TABLE valid_genres (
    genre character varying NOT NULL
);



SET search_path = public, pg_catalog;

--
-- TOC entry 210 (class 1259 OID 4061937)
--

CREATE TABLE games (
    gameid integer NOT NULL,
    winner integer,
    loser integer
);



--
-- TOC entry 209 (class 1259 OID 4061935)
--

CREATE SEQUENCE games_gameid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



--
-- TOC entry 3197 (class 0 OID 0)
-- Dependencies: 209
--

ALTER SEQUENCE games_gameid_seq OWNED BY games.gameid;


--
-- TOC entry 205 (class 1259 OID 3696399)
--

CREATE TABLE mm (
    musician_id character varying,
    musician_name character varying,
    genre character varying,
    photo_path character varying,
    thumbnail_path character varying,
    added_date date
);



--
-- TOC entry 208 (class 1259 OID 4061926)
--

CREATE TABLE players (
    pid integer NOT NULL,
    pname text
);



--
-- TOC entry 207 (class 1259 OID 4061924)
--

CREATE SEQUENCE players_pid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



--
-- TOC entry 3198 (class 0 OID 0)
-- Dependencies: 207
--

ALTER SEQUENCE players_pid_seq OWNED BY players.pid;


--
-- TOC entry 206 (class 1259 OID 3856313)
--

CREATE TABLE tt (
    id integer,
    etc character varying
);



SET search_path = scale_info, pg_catalog;

--
-- TOC entry 198 (class 1259 OID 2192965)
--

CREATE TABLE patterns (
    scale_type character varying NOT NULL,
    scale_wh_pattern character varying,
    scale_fsn_pattern character varying
);



SET search_path = musician, pg_catalog;

--
-- TOC entry 2978 (class 2604 OID 1890488)
--

ALTER TABLE ONLY apple_links ALTER COLUMN apple_link_id SET DEFAULT nextval('apple_links_apple_link_id_seq'::regclass);


SET search_path = public, pg_catalog;

--
-- TOC entry 2981 (class 2604 OID 4061940)
--

ALTER TABLE ONLY games ALTER COLUMN gameid SET DEFAULT nextval('games_gameid_seq'::regclass);


--
-- TOC entry 2980 (class 2604 OID 4061929)
--

ALTER TABLE ONLY players ALTER COLUMN pid SET DEFAULT nextval('players_pid_seq'::regclass);


SET search_path = advertising, pg_catalog;

--
-- TOC entry 3178 (class 0 OID 2844796)
-- Dependencies: 200
--

COPY apple (musician_id, musician_name, apple_affiliate_link) FROM stdin;
maurice-ravel	Maurice Ravel	https://geo.itunes.apple.com/us/artist/maurice-ravel/id11636?mt=1&app=music&at=1000lucb&ct=1000lucb
leopold-godowski	Leopold Godowski	https://geo.itunes.apple.com/us/artist/leopold-godowski/id308277903?mt=1&app=music&at=1000lucb
gasoline-boots	Gasoline Boots	https://geo.itunes.apple.com/us/album/fight-for-peace-ep/id1214113398?mt=1&app=music&at=1000lucb
sweet-relief-two	Various Artists (Sweet Relief Two)	\N
alexander-scriabin	Alexander Scriabin	https://geo.itunes.apple.com/us/artist/alexander-scriabin/id316883?mt=1&app=music&at=1000lucb&ct=1000lucb
beats-antique	Beats Antique	https://geo.itunes.apple.com/us/artist/beats-antique/id275162219?mt=1&app=music&at=1000lucb&ct=1000lucb
emancipator	Emancipator	https://geo.itunes.apple.com/us/artist/emancipator/id209711341?mt=1&app=music&at=1000lucb&ct=1000lucb
facing-west	Facing West	https://geo.itunes.apple.com/us/artist/facing-west/id886283194?mt=1&app=music&at=1000lucb&ct=1000lucb
farewell-angelina	Farewell Angelina	https://geo.itunes.apple.com/us/artist/farewell-angelina/id1074592861?mt=1&app=music&at=1000lucb&ct=1000lucb
francesco-libetta	Francesco Libetta	https://geo.itunes.apple.com/us/artist/francesco-libetta/id160337015?mt=1&app=music&at=1000lucb&ct=1000lucb
franki-love	Franki Love	https://geo.itunes.apple.com/us/artist/franki-love/id625754055?mt=1&app=music&at=1000lucb&ct=1000lucb
frederic-rzewski	Frederic Rzewski	https://geo.itunes.apple.com/us/artist/frederic-rzewski/id50107619?mt=1&app=music&at=1000lucb&ct=1000lucb
haris-alexiou	Haris Alexiou	https://geo.itunes.apple.com/us/artist/haris-alexiou/id39701368?mt=1&app=music&at=1000lucb&ct=1000lucb
larkin-poe	Larkin Poe	https://geo.itunes.apple.com/us/artist/larkin-poe/id360929055?mt=1&app=music&at=1000lucb&ct=1000lucb
lili-roquelin	LiLi Roquelin	https://geo.itunes.apple.com/us/artist/lili-roquelin/id291774403?mt=1&app=music&at=1000lucb&ct=1000lucb
sleep	Sleep	https://geo.itunes.apple.com/us/artist/sleep/id2930043?mt=1&app=music&at=1000lucb&ct=1000lucb
susie-suh	Susie Suh	https://geo.itunes.apple.com/us/artist/susie-suh/id45445812?mt=1&app=music&at=1000lucb&ct=1000lucb
the-reverend-horton-heat	The Reverend Horton Heat	https://geo.itunes.apple.com/us/artist/the-reverend-horton-heat/id105453?mt=1&app=music&at=1000lucb&ct=1000lucb
the-six-parts-seven	The Six Parts Seven	https://geo.itunes.apple.com/us/artist/the-six-parts-seven/id13742819?mt=1&app=music&at=1000lucb&ct=1000lucb
tina-guo	Tina Guo	https://geo.itunes.apple.com/us/artist/tina-guo/id307712210?mt=1&app=music&at=1000lucb&ct=1000lucb
unkle	UNKLE	https://geo.itunes.apple.com/us/artist/unkle/id133444?mt=1&app=music&at=1000lucb&ct=1000lucb
within-temptation	Within Temptation	https://geo.itunes.apple.com/us/artist/within-temptation/id2898551?mt=1&app=music&at=1000lucb&ct=1000lucb
zoe-johnston	Zoe Johnston	https://geo.itunes.apple.com/us/artist/zoe-johnston/id256555781?mt=1&app=music&at=1000lucb&ct=1000lucb
\.


--
-- TOC entry 3179 (class 0 OID 2844888)
-- Dependencies: 202
--

COPY image_ads (ad_link, ad_image) FROM stdin;
/advertise	https://s3-us-west-1.amazonaws.com/butternotes/img/other/your-image-here.png
https://distrokid.com/vip/seven/664529	https://s3-us-west-1.amazonaws.com/butternotes/img/other/distro-kid.png
\.


SET search_path = beta, pg_catalog;

--
-- TOC entry 3186 (class 0 OID 4151773)
-- Dependencies: 211
--

COPY betas (email, password, signup_date, active) FROM stdin;
alala@alllaskdfj.com	bcrypt+sha512$5c8e255fd02b8b55a7d39b1dc91cf686$12$71afeb127ce48e97b039559750cecf9d307a4daea392c0f8	2017-06-24	t
b@b.com	bcrypt+sha512$0adc986ec2306f35cda010d6e2ccc854$12$2624be73a95af8860bddcd2725a24cdce25e73f5d25905d8	2017-06-24	t
\.


SET search_path = blog, pg_catalog;

--
-- TOC entry 3177 (class 0 OID 2280258)
-- Dependencies: 199
--

COPY blogs (blog_id, blog_title, blog_content, blog_date) FROM stdin;
removing-adsense	Why I removed Adsense	<p>This is a follow-up article to <a href="/blog/adblockers-welcome">Adblock Users... Welcome</a>. I think this an important topic that\n  all web-owners, designers, and marketers have to come to grips with.</p>\n\n<p>While I didn't say it in that article, the main audience is metric-driven marketers, spun to be more accessible for a wider\n  audience. I felt that a marketer would be able to read betweent the lines. This article will be of the same spirit, but more math- and\n  technical-oriented.</p>\n\n<h2 style="font-size:1.5em;">An Over-Simplistic Definition of Marketing Metrics</h2>\n\n<blockquote>All models are wrong, but some are useful -- George E. P. Box</blockquote>\n\n<p>A marketing metric is a tool one uses to biuld models, test assumptions, and find anomolies. A corner tenent of models is that,\n  individually, models aren't very powerful, but when put together, they paint a more complete picture. A simple anology is looking at\n  a black & white picture. While they are beautiful to look at, they don't tell you what color a dress is. A poor B&W picture is a total mess.\n  A model built around a single metric is like a B&W picture. Beautiful at times, but always incomplete. To build a full picture, one must\n  add color. A model utilizing many metrics is a full-color picture.</p>\n\n<p>A classic example is the current trend of adding pop-up email sign-up lists. I don't have an argument for or against it, but a well-built\n  model will ask the following questions:</p>\n\n<ol>\n  <li>How many people were signing up <i>before</i> the pop-up was implemented?</li>\n  <li>How many people were signing up <i>after</i> the pop-up was implemented?</li>\n  <li>What is the difference between bullets 1 and 2?</li>\n</ol>\n\n<p>And this is where some analysis stops.</p>\n\n<p>It is easy to add emotion-driven anectdata to argue against using pop-up email forms, but this is easily tamped down by figuring out\n  if 2 - 1 > 0. If true, keep the pop-up; if false, remove the pop-up.</p>\n\n<p>Both arguments are silly. The emotional anectdata takes a sample of 1 and attempts to extrapoloate that data point to 1 million. The\n  equation-based answer is taking an incomplete snapshot of the reality.</p>\n\n<p>I am human, so of course, I look at everything from emotions. What I want to see is numbers and analysis. If I'm going to decide on\n  using pop-up email lists, I want to know everything from the previous list and the following:</p>\n\n<ol>\n  <li>When I send out the email, what is the open-rate?</li>\n</ol>\n\n<p>This is actually enough to destroy all models. An "open rate" is a terrible metric. If you are a B2B company, it is safe to assume your\n  audience is using Outlook. A user in outlook simply presses "down" for the next email, then hits "delete" to remove the email. In other words,\n  you can have a 100% open rate with absolutely no one reading.</p>\n\n<p>What more to look at?</p>\n\n<ol>\n  <li>What is the click-rate. Did they click your links?</li>\n  <li>If I'm selling a product or service, did anyone buy?</li>\n  <li>What percentage of people actually buy the product or service?</li>\n  <li>Is my conversion rate / click-rate higher or lower for the people who signed up before the pop-up form -vs- the poeple who signed\n    up after the pop-up form?</li>\n</ol>\n\n<p>Point #4 is your P&L. If you now have a mailing list that is costing more than $150 / month than before, are you gaining the delta from the post-pop-up\n  email sign-ups? Are they sharing your content? Are they exploring your site further, etc? If you aren't careful, you can explode an email\n  list that costs thousands of dollars yet added nothing to your bottom-line, and in worst cases, end up costing you money.</p>\n\n<p>In this model, I'm piling metrics upon metric, attempting to build something that is more bullet-proof to mistakes. There is always margin\n  for error. In "Adblock Users... Welcome," I made a lot of oblique references to whale curves:</p>\n\n<img src="https://s3-us-west-1.amazonaws.com/butternotes/img/blog/removing-adsense/whale-curve.png" alt="image of whale curve">\n\n<p>The counter-intuitive implication of the whale curve is that every single company deals with customers who are not profitable. An example\n  is UPS. If they strictly focused on customers who are able to profited from, they would not be able to deliver to a house deep in the backwoods.\n  That customer would never be willing to pay enough to cover the gas, the time for a single 8 hour drive, and further profit for UPS. UPS needs\n  end-users and companies to function, and both ends must be able to depend on their service. If UPS decided to remove all their money-losing\ncustomers, companies and customers would search for alternatives that will go to a far away house. They have to eat the cost.</p>\n\n<p>The questions I raised in "Adblock Users... Welcome" revolved around the intelligent accumulation of money-losers (adblock users) and how\n  we treat them. If a customer has no desire to click a link, they were an invisible presense on your whale curve. If they are the type who would\n  never click a link, yet they <i>are</i> the type who would buy a t-shirt, a service, or whatever you are offering, then they\n  shift to the left side of the curve. By violently pushing them away, you are not only ensuring they will never be on the left side of the whale curve, you are ensuring that they will never share your content or product with someone\nwho may fall on the left curve because you simply won't allow them to. This is dangerous for your company and your product.</p>\n\n<h2 style="font-size:1.5em">Figuring out the profit of Adsense</h2>\n\n<p>This site is a music site. There are a few issues with advertising to musicians:</p>\n\n<ul>\n  <li>Musicians don't like to spend money. I know it's cliche, but selling to musicians is a lot of work. Any investment, regardless if it\n    is for instruments, gear, strings and bows, learning resources, etc, is a long-term sale. They are buying something they will presumably\n    use for years to come, and they don't want to buy something they will be unhappy with after a week of use.</li>\n  <li>Music sales is a low-profit business. Even guitar center sees single-digit profits on most of their instruments. Local music shops\n    shut down left and right due to low profits. An increase in rent is almost always a death knell for businesses. A music teacher may earn\n    $35 / hour, but they are only working a few hours a week.</li>\n  <li>Since musicians have tastes and standards, they don't like to buy before they try. No one has figured out a way to let someone try an\n    instrument over the internet (no one ever will), so they are less likely to click</li>\n</ul>\n\n<p>This all means that I have low click-through rates, and the price-per-click isn't good enough to justify Adsense. My total\n  RPM / page is well below $1. An average user on this site sees more than 5 pages per visit, so even with 1,000 visits per day, 5,000\n  impressions, and 3 ads per page at 15,000 ad impressions with a decent click-through, I'm still earning around $3 per day.</p>\n\n<p>I also don't have a lot of real-estate. I can, at most, place 3 ads on a site, regardless if it is adsense or any other ad. I can't overlay\n  ads on sheet music, and I don't want my site to look like a NASCAR car.</p>\n\n<h2 style="font-size:1.5em">Ethics</h2>\n\n<p>I'm not a college-educated on the topic of ethics, and my own ethics boils down to "do unto others..."</p>\n\n<p>With analysis of a whale curve and a view of my own ad-profit, I have to ask myself if it is worth trading my web real-estate for\n  for my customer's data. I understand that Google, Facebook, Twitter, etc, use this data and that is how they make their profit. However, I'm not\n  sure if it is okay for me to hand over my visitor's data, without their permission, for a fee that that barely covers my hosting fees. If\n  I'm adding trackers from Facebook, Twitter, etc, I'm handing this data out for free, at no real benefit to me.</p>\n\n<p>I'm building this site on two foundations: what do I want and what do my visitors want? I want to create an ontology of music theory. I\n  want to share music I like. I want to share knowledge that I have. My visitors presumably want to explore scales, modes, and other concepts\n  relating to music theory. They want to explore new music. They want to read interesting and well thought-out blog posts. They don't want\n  to visit Macy's and see a large Macy's ad on this site, I'm sure of that. I know a large part of my audience wants their privacy, and there\n  is no reason for me to enforce otherwise on them. I never once recieved an email from a visitor demanding I give away all of her data to\n  every single company in existence. I <i>have</i> recieved emails asking "what is going on with the ads?", and there, I have to draw a line.</p>\n\n<h2 style="font-size:1.5em;">Who Do I Want to Be?</h2>\n\n<p>This is the number one question all companies must ask themselves. I want to be a product, not an advertising platform. Every company,\n  in my opinion, has to balance their profit with their own ethics. This isn't easy to do at all. How much tracking is enough to help my visitors have\n  a positive experience? What data is important to know about? What data is important to give away, and what price are we willing\n  to pay in customer data for vanity metrics?</p>\n\n<p>There is no room for tracking-based advertising on this site. It isn't worth the hit to site speed and it isn't worth opening up attack vectors to my visitors. I <i>do</i> use affiliates, but I feel that a customer should know that,\n  at minimum, a tracking token is added to links so I can get paid for a service or product they not only wanted, but bought. I'm\n  willing to do affiliate linking as long as that it is understood that the customer willingly clicked a link. I even go through the effort of building an image and a link. I won't do\n  JavaScript-based advertising any longer.</p>\n\n<h2 style="font-size:2em;">Enjoy this article?</h2>\n\n<p>please subscribe to my <a href="/newsletter">Newsletter</a></p>\n\n<p>You can also follow me on <a href="https://twitter.com/ButternotesWeb">Twitter</a> and <a href="https://www.facebook.com/butternotescom-1735463286766016">Facebook</a></p>\n	2017-03-28
open-mic-first-time	How to Do Your First Open Mic	<img src="https://s3-us-west-1.amazonaws.com/butternotes/img/blog/first-open-mic/open-mic.png" />\n\n<p>I have a friend who is an excellent guitarist. I've brought up going to an open mic on multiple occassions, just to get\n  him on stage and gauge other musicians.</p>\n\n<blockquote>Is it like, you go up and tell a long story about how your song was made, then play it?</blockquote>\n\n<p>Well... not really. I gave him some pointers, which I'd like to share with you.\n  If you are nervous about doing an open mic, even in "music capitols" like Austin or Los Angeles, this guide will hopefully help you have a\n  successful first night out.</p>\n\n<p>Before reading, be warned: on your first night out, you will not do as well as you dream, but that's okay. It takes a while to get to the\n"bring downt the house" level.</p>\n\n<h2 style="font-size:2em;">Pre-Show Preparation</h2>\n\n<p>All professional musicians have a pre-show ritual. My ritual is generally includes practicing my set all day and ensuring I'm utterly smashed\n  before I leave for the venue, along with the following:.</p>\n\n<p style="font-size:1.5em;"><i>Voice:</i></p>\n\n<p>If you are going to sing, make sure you voice is in good shape for the mic. The experience is different than what\n  you are used to as a bedroom musician. Be sure to buy some cinnamon breath spray. The cinnamon will help lock up and\nstiffen your vocal chords. You are going for a flat, slightly off-pitched voice, with a heavy strain.</p>\n\n<img src="https://s3-us-west-1.amazonaws.com/butternotes/img/blog/first-open-mic/cinnimon-spray.png" />\n\n<a href="http://amzn.to/2nNs1yW">Buy On Amazon</a>\n\n<p style="font-size:1.5em;"><i>Strings:</i></p>\n\n<p>If you are a guitarist, you know that we can all agree to disagree on strings. I use Elixer Heavy Gauge:</p>\n\n<img src="https://s3-us-west-1.amazonaws.com/butternotes/img/blog/first-open-mic/elixir-strings.png" />\n\n<a href="http://amzn.to/2nfNayT">Buy On Amazon</a>\n<p><small>Let the flamewars begin!</small></p>\n\n<p>For live music, older is better. If you are among the fortunate that has 3 year old strings, you are in luck: they will sound amazing on any\n  sound system. If you have strings that are newer than 3 years, any set of strings that are over a month old should be fine. If you have newer\n  strings, you may want to swap them out for these ChromaCast strings.</p>\n\n<img src="https://s3-us-west-1.amazonaws.com/butternotes/img/blog/first-open-mic/chromacast-strings.png" />\n\n<a href="http://amzn.to/2nQRqbl">Buy On Amazon</a>\n\n<p>They generally give that really old string sound after 1 or 2 days of light playing. To really get them sounding old, play your guitar\nafter eating greasy food, without washing your hands.</p>\n\n<p style="font-size:1.5em;"><i>Song Selection:</i></p>\n\n<p>Of course, this will depend on your style and how long you've been playing. The key here is that you want to showcase songs you started\n  writing the day before, and balance your selection with at least one song that you wrote a week before. If you just started playing guitar two\n  weeks ago, that's perfect, but you may not have 3 songs prepared. If you need to bust out a quick song in a few hours, you can start by playing\n  a C chord, then place your pinky on the\n  high E string, 3rd fret, and you have an entirely new\n  chord. Toggle between a "normal" C chord and this new-fangled C-whatever chord, and recite some poetry..</p>\n\n<p>Some open mics have a 3 song or 15 minute limit, whichever comes first. The goal is to fill this entire slot. Some creative types\n  create extended "remixes" of popular songs. If you a 25 minute version of Adele's "Someone Like You," just remember you will\n  have to chop 10 minutes off. If you only have a bunch of 3 minute songs, simply play the chorus over and over until each song is\n5 minutes song. You can also extend the chords and not bother singing for a few minutes to fill in the extra time.</p>\n\n<p style="font-size:1.5em;"><i>The Capo:</i></p>\n\n<img src="https://s3-us-west-1.amazonaws.com/butternotes/img/blog/first-open-mic/capo.png" />\n\n<a href="http://amzn.to/2nwO780">Buy On Amazon</a>\n\n<p>The capo is the #1 trusted item in any open mic tool kit. Don't leave home without it! Now, don't be silly and just capo off at the 1st or\n  2nd fret. You want to get some songs that let you capo off at the 7th and 8th fret. The higher up, the better.</p>\n\n<p style="font-size:1.5em;"><i>Tuner:</i></p>\n\n<p>You <i>gotta</i> be kidding me. Real musicians don't use tuners.</p>\n\n<h2 style="font-size:2em;">The Big Day</h2>\n\n<p>You've been pumping yourself up for a whole month, and now is your moment. The first time at any new open mic is intimidating and confusing,\n  even for the most seasoned of us.</p>\n\n<p style="font-size:1.5em;"><i>Pretend You Know What's Up</i></p>\n\n<p>The #1 mistake you can make is going up late. You don't want to sit around until 2a.m. waiting for your big moment. If you are smart, you want to show up at least 2 hours early.</p>\n\n<p>At some point, a newcomer\n  will ask you where the sign up list is. Now, of course, you don't know, but be helpful, and point her to pool table, or to a table next to\n  the bathroom.</p>\n\n<p style="font-size:1.5em;"><i>Drink Water</i></p>\n\n<p>You don't want to hurt your chances of killing it on stage and a sober mind is the way to go. The wait staff doesn't mind if you take up table real estate drinking free\n  liquid, and believe me, you don't ever want to trust restaurant food. Haven't you heard all cooks like\n  to spit in your food?</p>\n\n<p style="font-size:1.5em;"><i>Bring a Friend</i></p>\n\n<p>This is so important that it should probably be the first item. Remember that you don't want to go alone, and if you are smart, you can use\n  your friend to maximize your stage time. The strategy goes like this:</p>\n\n<p>Sign up as say, #2 and your friend as #3. If you have been writing songs with each other, it's even better, you can add your duet in their as well, at position #4. You can, of course, mix this order up.</p>\n\n<p>When you go up, you ah shucks about needing moral support from your friend. The MC will happily oblige your request and allow your friend up on\n  stage with you. Make sure you only play songs the he has never heard of before, that way, he is tanking the leads.</p>\n\n<p>When it is your friend's turn, you stay on stage and, once again, be sure that he is playing songs you never heard before. If you are a new\n  musician, it is even better, since you won't have any clue what you are doing.</p>\n\n<p>The duet part is where you and your friend can really shine. You two have been practicing with each other for 2 days now, and there is no\n  doubt that you both have 3 songs down cold.</p>\n\n<p>At some point in the future, you can start bringing your girlfriend (if you are single now, don't worry, girls love dating broke musicians). You don't want a girlfriend who knows how to play her own instrument,\n  so you'd have to be her guitarist. You want to find a song collection that will really let her shine, such as songs from Adele, Lady Gaga,\nChristina Novelli, and Sia.</p>\n\n<p> If you pull off all of these steps, and maximize your stage time, you can start to have an entire hour on\n  stage.</p>\n\n<h2 style="font-size:2em;">Pre-Game</h2>\n\n<p>When you are next up, the MC will likely come by and introduce herself, and let you know that you are up next, and ask you to tune up. Go\n  find a quiet section of the bar and tune up. This will be a little difficult since you are in a noisy place, but it's not a big deal.</p>\n\n<h2 style="font-size:2em;">On Stage, a.k.a. Show Time!</h2>\n\n<p style="font-size:1.5em;"><i>Getting Set Up</i></p>\n\n<p>Despite this being your first time, and it is more awkward than some other "first times," you have to be confident.</p>\n\n<p><i>Do NOT</i> let the MC know this is your first time ever being on stage. You don't want her to laugh at you, and you certainly\n  don't want the crowd to know that you are a rote amateur. This section is focused on ensuring that you aren't exposed.</p>\n\n<p>Take this moment to tune your guitar. I know the MC asked you to tune before coming up, but you have to make sure you are all set now\n  that you can hear yourself. Turn the volume up all the way on your guitar, and tune away.</p>\n\n<p>When the MC is pushing the sliders around on the equalizer, be sure to move the equalizer on your guitar, if you have one.</p>\n\n<p>But note that if you have a semi-expensive electro-acoustic guitar, say one that set you back more than $400, you probably shouldn't be\n  using that guitar. If you want to look professional, you should have brought the $75 junker, which is your "cheap gig guitar." Everyone\n  accidentally brings the wrong guitar the first time, but it isn't a total deal breaker. You'll know for next time. A real professional\nwants to a guitar that needs to be retuned between each song.</p>\n\n<p>If you did bring your gig guitar, you are in luck. Let the MC know that you need a microphone for your guitar, a mic for your singing,\n  and, if you brought your girlfriend along, a mic for her to sing with. Most places don't have 3 microphones, but don't worry, you two\n  can share the same mic, and as a bonus, that cinnamon spray now serves two great purposes.</p>\n\n<p style="font-size:1.5em;"><i>Bonus set Up section: electric guitars</i></p>\n\n<p>If you have an electric guitar, be sure that you have one that you never played before, so that way, you don't know where the volume\n  knobs are, and you don't know the tone you want. The MC will gladly let you figure out your instrument when you are on stage.</p>\n\n<p>Bring as many peddles as you can fit in your bag. Most new players don't know this, but in general, the sound system\n  will be set up and optimized for acoustic guitar (which isn't surprising, right?). This means that the system will have a lot of middle,\n  some high, and a little low. If you want to play your 15 minute Taylor Swift / Rage Against the Machine mash-up, you have to get all of those\n  peddles set up correctly. Don't worry about bringing your own pre-amp. You won't need it.</p>\n\n<p>The more complex your set up is, the better. The crowd really enjoys seeing the MC and you working out the minute details of getting\n  the perfect sound for 15 minutes.</p>\n\n<p style="font-size:1.5em;"><i>The Performance</i></p>\n\n<p>Now that you are all ready, it is time to start the performance. Before you begin playing, say who you are and introduce your guitar. Let\n  the audience know your guitar's name and what kind of guitar she is. The audience is also interested in knowing how long you had it, and of\n  course, the origin story -- the funnier, the better, and apologize if you got it from Guitar Center.</p>\n\n<p>If you are cutting an album, the audience really wants to know about that as well. If you are selling CDs, this is a perfect time to let\n  them know. Be sure to talk about who produced it, how long it took, and where it was mixed.</p>\n\n<p>You want to introduce your first song as your all-time favorite song and tell\n  a story about it (the longer, the better). If you can dedicate it to anyone, say it's for your  mom or for the crowd you are about to play for.</p>\n\n<p>The next song is your time to really hit home on how professional you are. If you are out to shine, you want to let the crowd know\n  that you seldom play in standard tuning. Make sure your gain is all the way up and tune your guitar to open G. About half\n  way through, you may have second thoughts. Have no fear, go ahead and get that guitar tuned to open C instead. The last song should be\n  in another non-standard tuning. This is also your opportunity to tell the crowd fascinating tales about your home life. If you have a cute\ndog story, this in between time is perfect.</p>\n\n<h2 style="font-size:2em;">Making Everyone Happy</h2>\n\n<p>If you've done well, the crowd will decide that it can get no better and start leaving. About half way through your set, the crowd of 100\n  patrons will dwindle to 5 or 6, though a real expert will be sure that no one but the remaining musicians are left. Musicians are shy people by\n  nature, and they really don't enjoy playing in front of a bunch of strangers.</p>\n\n<p>Don't bother talking to the other musicians. They really don't like to socialize or talk about music. If you didn't like thier music and\n  you accidentally make eye-contact, give them a massive thumbs up to let them know how great they were. It doesn't matter if you weren't\nactually listening.</p>\n\n<p>When you are done, pack up and leave right away. Don't bother tipping the wait staff. You, afterall, drank free water. It doesn't take a math degree to figure out that 20% of $0 is $0.\n  Don't thank the MC for their time, and don't look at the bartender or bar owner in the eye when you leave. It's impolite to stay past your\nset, and no one wants you to stick around and celebrate your first time out with a beer.</p>\n\n<h2 style="font-size:2em;">Enjoy this article?</h2>\n\n<p>please subscribe to my <a href="/newsletter">Newsletter</a></p>\n\n<p>You can also follow me on <a href="https://twitter.com/ButternotesWeb">Twitter</a> and <a href="https://www.facebook.com/butternotescom-1735463286766016">Facebook</a></p>\n	2017-03-25
adblockers-welcome	Adblock Users... Welcome	<p><img src="https://s3-us-west-1.amazonaws.com/butternotes/img/blog/adblocked/million-dollar-homepage.png"\n\talt="image of million dollar homepage"/></p>\n\n<p>The Million Dollar Homepage is a website created by Alex Tew in in September 2005. The idea was simple: 1 pixel for one dollar, sold in 10x10 blocks. He succeeded: the final tally for the site was $1,037,100.</p>\n\n<p>What a difference a few years makes. Today, so many poeple have downloaded an adblocker that advertisers are hitting back with adblock blockers, and adblockers are asking ad networks for money to white-list their sites, and the end-users are downloading more sophisticated adblockers and… sigh. The slippery slope fallacy ended up being a real thing. The more publishers fight their users, and users fight ads, the worse things are going to get.</p>\n\n<p>Take a moment and examine this screen-shot. Notice anything suspicious (look at the red arrow)?</p>\n\n<p><img src="https://s3-us-west-1.amazonaws.com/butternotes/img/blog/adblocked/blocked.png"\n\talt="image: please turn your adblocker back on or give us a dollar"/></p>\n\n<p>Right, slippery slope indeed. The adblock isn’t even on, yet, they are still blocking my access. What gives?</p>\n\n<p>Well, I can’t say for sure, but if I had to guess, this message is from using Disconnect, which makes the situation far more frightening. Although I willingly turned on ads, my desire for privacy is too much for them to handle.</p>\n\n<h2 style="font-size:2em;">How did this happen?</h2>\n\n<p>Back in the day, web advertising was fairly tame. We saw a few images on the left side of the screen, and if our internet connection was slow, or the ads had way too much flashing on it, we would use div and url blockers, or even Grease Monkey, to remove the offending images. The process was completely manual -- even adblockers required a left-click to block an ad, and it didn’t always work. It really took a lot of manual effort and dedication to block ads.</p>\n\n<p>Blocking ads wasn’t common place, but neither were overly abusive ads. Granted, we did have websites that auto-played loud talking ads that broke our eardrums when wearing headphones, but those sites were clearly scummy and easy to stay away from. We also had sites that auto-played irritating videos or background music, but once again, this wasn’t common-place. I’d estimate that, for every 100 sites I’d visit, 1 would have some irritating noise that caused me to click the tab closed immediately.</p>\n\n<p>At some point, these ads seeped into our not-scummy sites and trusted sources. Ads started scrolling across the browser. Some pop-ups would be so large we couldn’t find the “X” to close the window (wait, wasn’t pop-up blocking baked into browsers for 10 years now?) . Ads started screaming at us, waking our babies and roommates, bursting our eardrums, or interrupting our favorite songs. We’d fall into an instant panic, locating the tab that, once a point of research, was now a point of insane frustration. To add insult to injury, some of these ads are malicious.</p>\n\n<p>Now days, even subtle ads started becoming noticeably strange for users who aren’t technical at all. I’ve been told “Woah, this is so strange. I was just looking at Macy’s and now I see and ad for Macy’s on your site.”</p>\n\n<p>Users are now confused and don’t know what’s going on, and it is equally strange and frightening to them as a billboard chasing them down the street. Users are fed up, and when we’ve fed up people who’s entire internet experience is social media and email, things have gotten out of hand.</p>\n\n<p>We need to call a truce. We need to start showing empathy for our end-users, and we need to stop seeing them as a data-point. This attitude of looking at everyone as a number is hurting everyone involved, from the website owners, the advertisers, and the advertising networks.</p>\n\n<h2 style="font-size:2em;">Data Collection and Privacy Invasion</h2>\n\n<p>Data collection and privacy invasion is NOT fair to the user. We, as content creators, need to be more responsible here.</p>\n\n<p>In the screen grab, I show that I allowed the site in question to show ads, yet it is still admonishing me for not showing ads. I can confirm that ads did show up on the page in question. I can also confirm that I don’t wish my data to be collected wholesale. I don’t want every single thing about me handed to advertisers and I don’t want shadow profiles of me created by anyone.</p>\n\n<p>It might sound crazy to some, but there are users who don’t use Facebook, Twitter, Instagram, LinkedIn, etc, etc, etc. These users are being sensible in how they personally choose to use the internet, and they are being brought into a battle they have no skin in.</p>\n\n<p>Even if the users are using social media, we, as publishers, are gaining zero benefit from demanding people see social sharing and tracking buttons, especially since we aren’t getting paid for all the information we are giving away, and the data on the effectiveness of social sharing and tracking is spurious at best.</p>\n\n<p>There isn’t an argument anymore. The users have spoken, and they have won. It’s up to us to listen and work on new solutions and ideas.</p>\n\n<h2 style="font-size:2em;">Pondering a Solution</h2>\n\n<p>Like it or not, we need advertisers: we would like to at least support our hosting fees, we’d like to monetize or visit count.</p>\n\n<p>We need advertising networks: as much as I would love to simply sell my ads at $5 CPM, I know that, for one, this site isn’t large enough to command that, and even if it was, the demands on the marketing and accounting departments of say, Macy’s, would be too large to deal with even a fraction of the large sites. Local small businesses won't even bother since they don't have the personel or financial resources, and let's face it using Adwords is easy, cheap, and convenient.</p>\n\n<p>We, as website owners, have to be aware of how our sites are being advertised on. This is no longer a matter of personal taste or degree. The increase in adblock popularity needs to be listened to with empathy, not hostility. It is now our responsibility to ensure that the end-users has a positive and safe experience. It is our responsibility to vet our advertising networks, and immediately drop any that are abusing our users. It is no longer possible to encourage people to turn ads back on. Despite our desire to get paid for every single visit, it really doesn’t matter since many of us are getting paid on (mostly) CPC and not CPM. The end-user has made it abundantly clear that he or she is not going to click an ad, no matter how much we beg they turn ads back on. There is no good reason to boot them off our site; they didn’t click ads before they installed adblock, and they aren’t going to suddenly change their minds after we demand they turn ads back on.</p>\n\n<p>The world is different now. We are no longer able to put all of our eggs in one basket. We can’t depend strictly on CPM and CPC ads. We have to mix in affiliates, we have to add stores, and we have to be more creative in how we deal with our users. Unfortunately, so many things are bent away from the benefit of the website owners, and that’s something we are going to have to have to figure out, not only for ourselves, but for the internet community as a whole.</p>\n\n<p>In summary, these are the problems we are facing with advertising monetization:</p>\n\n<ul>\n\n<li>We need to figure out how important our user’s privacy is. Do we really need to demand they allow tracking when we don’t get any insight into the data we are handing off without their permission?</li>\n\n<li>We have to collectively demand that our advertising networks respect our users. No more music, screaming, scrolling across the screen, no more blocking the entire page, no more back-button blocking. It needs to stop. We all have to join together, and those that don’t join in will not only abandon their users, but cause the rest of us to lose our users.</li>\n\n<li>We have to reconsider our definition of a user and how that impacts other aspects of our site. We don’t want to abandon each and every adblock user because a percentage of them shares our articles and sites with others. If we are blocking 30% of our users, we diminish our changes of growing.</li>\n\n<li>Asking for monthly payment after 20 years of giving away content for free isn’t going to fly. We are in the business of disseminating information, entertainment, building community, etc. We all need to be aware of how our actions compliment our goals, not only for ourselves, but for every other site on the internet.</li>\n</ul>\n\n<h2 style="font-size:2em;">Conclusion</h2>\n\n<p>We are stuck with what we have right now, and it isn’t the end of the internet as we know it. We live in an age where knowledge is demanding to be free, and despite adjustments in revenue, the internet has improved immensely over the past 10 years. I think this is where YouTubers have found a niche. They not only have their channels, they have paid placements, affiliates, stores, their own product lines, Patreon, etc. They’ve diversified, and I think web-based businesses have no choice but to do the same.</p>\n\n<p>I will always welcome all eyes to my site. It may be unsettling to see nearly 30% of my users blocking ads, but I know they are sharing my ideas, and that sharing is far better for my long-term existence. There are ways to monetize that aren’t strictly from advertising, and I think that, in the long run, the sites that survive are going to have to diversify their strategies.</p>\n\n<h2 style="font-size:2em;">Enjoy this article?</h2>\n\n<p>please subscribe to my <a href="/newsletter">Newsletter</a></p>\n\n<p>You can also follow me on <a href="https://twitter.com/ButternotesWeb">Twitter</a> and <a href="https://www.facebook.com/butternotescom-1735463286766016">Facebook</a></p>\n	2017-03-02
obligatory-music-theory-article	Obligatory Music Theory Article	<img src="https://s3-us-west-1.amazonaws.com/butternotes/img/blog/obligatory-music-theory-article/circle-of-fifths.png"\n     alt="circle of fifths" />\n\n<p>Butter Notes is, of course, a site dedicated to the ontology and\n  epistemology music theory, yet it makes no claims about why you should learn music theory.</p>\n\n<p>I've hesitated to write any article the lays out the reasons for learning music theory, and this article\n  will make no attempt to convince anyone to learn. I've found that most articles on the subject are preaching\n  to the choir. That isn't something I wish to be a part of. Instead, I will offer a framework for thinking about\n  music theory.</p>\n\n<h2 style="font-size:1.5em;">Setting the Goal Posts</h1>\n\n<p>When people see me play, or they wish to collaborate with me, the first thing they say is "I don't know\n  any music theory." Other people, especially rock musicians, are belligerently anti-music theory, claiming\n  that it will stymie their creativity.</p>\n\n<p>To start, we have to define what it means to "know" music theory. I'm far from a master on the subject. Despite\n  being the person who is encoding theory on this site, I will admit that I wouldn't know, by heart, many of the scales\n  found here.</p>\n\n<p>It is easy to make claims and argue moot points without laying down some basic understandings first. I think that,\n  when most people think "music theorist," they think of someone who can read music, who has a PhD, went to school, or any\n  variety of person who they don't identify with. The first rule is thus:</p>\n\n<p><i>Everyone uses music theory, whether they admit it or not.</i></p>\n\n<p>Everyone uses music theory, even those that don't know how to read a lick of music. Music theory is <i>not</i>\n  an end-goal -- it is a framework for speaking about music. Let's go through a few simple examples.</p>\n\n<p>When you correctly play G, D, C you are playing a proper chord progression in a proper key. It does not matter if\n  you don't know that this is in the Key of G and it doesn't matter if you don't know this is a I, V, IV progression.\n  You know that playing G, D#, C doesn't sound tonal. You are using music theory if you know what sounds tonal. When\n  you play something you know sounds tonal, you are using some knowledge, and that knowledge is music theory.</p>\n\n<p>Many people attempt to shift the goal posts by making spurious arguments like "My guitarist doesn't know a lick of\n  theory, but he knows scales like the back of his hand." This is, of course, a false definition. Scales are the very\n  foundation of music theory, therefore said guitarist knows some theory.</p>\n\n<p>What about the blues guitarists who only knows how to do basic counts and use the pentatonic scales? Yes, even\n  if they cannot strictly identify the notes, they are still using some theory and some knowledge passed down through\n  the generations.</p>\n\n<p><i>Defining music theory</i></p>\n\n<p>Music theory is a <i>description</i> of how music is played, not a <i>prescription</i> of how to play music.</p>\n\n<p>This definition is confusing to many, but it is important to understand the difference. Yes, there is some overlap\n  as we gain knowledge that reflects a "correct" way of playing. I don't think\n  we need a grand definition of music theory, but I think many people get confused about purposeful and accidental\n  learning. In my thinking, there is no difference if two musicians arrive at the same conclusion.</p>\n\n<p>Purposeful study simply accelerates the process. How much and to what level is a matter of degree, and there is\n  no hard line between "theory" and "not theory," short of zero knowledge (no theory) and any knowledge (theory).</p>\n\n<p><i>But guitarist X doesn't know a single bit of it. He's huge, so why bother?</i></p>\n\n<p>This argument falls flat in the face of evidence. Yes, Jimi Hendrix may not\n  have been able to read music at all, but he was still very much a master combining the chords and scales he practiced\n  over the years.</p>\n\n<p>For every Bob Dylan, there is a Randy Rhodes. Everyone arrives to their style in a different way, and one way isn't\n  exclusively better than another way.</p>\n\n<h2 style="font-size:1.5em;">Music Theory Isn't Enough</h2>\n\n<p>Most articles explaining why you should learn music theory ignore the many other elements of playing music. I\n  think this is a mistake. Most musicians naturally do many other things to improve, which is good, but I'd like\n  to discuss those things I respect.</p>\n\n<p><i>Enjoy the instrument</i></p>\n\n<p>First and foremost, the musician should enjoy playing her instrument. It doesn't matter if it is the cello,\n  guitar, oboe, or timpani. If she doesn't enjoy her instrument, all the practice won't make a difference. Passion\n  and joy is unmistakably different than work.</p>\n\n<p><i>Learn to maintain the instrument to a reasonable level.</i></p>\n\n<p>Putting aside the things that are too dangerous to do alone, a musician should know how to maintain\n  her own instrument. Learn how to properly change the strings on the bass; learn how to properly adjust the\n  tension on a drum set, learn how to maintain vocal chords.</p>\n\n<p>Whatever it is you are playing, learn the basics of care. This not only keeps the instrument healthy,\n  maintenance fosters a sense of connection with the instrument.</p>\n\n<p><i>Technique wins.</i></p>\n\n<p>A person who can play 4 chords with a capo, play in time, and smoothly transition from chord to chord will\n  have my respect over someone who noodles through nonsense leads. The noodling may be harder to replicate,\n  but that doesn't mean it has technical or musical merit. This is especially true if that lead can't be\n  replicated by the musician.</p>\n\n<p>Practice the basics of the instrument you are playing. Practice the easy stuff ad nausea, practice\n  the difficult stuff with abandon. Never forget to review the basics.</p>\n\n<p><i>Learn to play other people's music.</i></p>\n\n<p>This is critical to anyone's growth. Even if a musician completely eschews learning any music theory, she\n  must take the time to learn from the masters. Since they are not able to sit down and teach everyone in the\n  world, resources are available to learn their music. This mimicry will open up many valuable lessons that can't\n  be written about or taught any other way.</p>\n\n<p><i>Train you ear.</i></p>\n\n<p>Music is, first and foremost, an aural experience. Learning to listen to notes, tempo, and expression\n  to replicate them is an important step for anyone who plays an instrument. It takes a lot of work to get\n  good at this, but there are techniques and shortcuts that can be used to take away the guesswork. I'll\n  probably write a blog post about the techniques I use.</p>\n\n<p><i>Play for people.</i></p>\n\n<p>I don't think good music is created in a vacuum. While music\n  is a personal creation, it is, in my opinion, a style of expression and unity. If the audience can't relate,\n  the music's value is greatly diminished. A musician should be playing in front of people. Few people will ever\n  give honest feedback verbally, but a bored crowd is unmistakable.</p>\n\n<h2 style="font-size:1.5em;">Conclusion</h2>\n\n<p>While I believe learning theory is important, I believe that it is one element of learning to play well, and\n  it should never be considered an end-all be-all item..</p>\n\n<p>I don't like to get into debates about the merits of learning music theory anymore than I like to get\n  into debates about genres of music, or any other debate that separates humanity, either with music or language.\n  I believe that music should be something that unifies us and I think that, even if something isn't to our tastes,\n  we should accept and appreciate the fact that someone else is able to feel a connection\n  to an artist as we feel connected to our preferred music.</p>\n\n<p>A debate on music theory is always a destructive ego-trip for all parties involved. If you play well, regardless\n  of your theory knowledge, I can respect your ability because I respect the practice time it took to get\n  to a performant level.</p>\n\n<p>At the end of the day, I think that it is best to show, not tell. I'd rather show my music to people, and let\n  it stand on it's own. If I have to explain it's brilliance to people because it does amazing key and tempo transpositions,\n  I've lost the audience I'm playing for. If the audience does get it, that is icing on the cake, but once again, no explanation\n  needed.</p>\n\n<p>The show, not tell philosophy extends to this site. I can only hope that whoever explores the features gains new insights\n  and perspectives. If they are vehemently against the nature of the site, then I'm okay with that, and only ask that they\n  have an open mind the next time they stumble upon this site.</p>\n\n<h2 style="font-size:2em;">Enjoy this article?</h2>\n\n<p>please subscribe to my <a href="/newsletter">Newsletter</a></p>\n\n<p>You can also follow me on <a href="https://twitter.com/ButternotesWeb">Twitter</a> and <a href="https://www.facebook.com/butternotescom-1735463286766016">Facebook</a></p>\n	2017-04-10
why-does-new-music-suck	Why Does New Music Suck?	<p>"Why does today's music suck" is one of the most oft-asked questions\n  about music on the internet these days. It is up there with "do I need to\n  know music theory to play music?"</p>\n\n<p>Yes, music today sucks, and guess what? The vast majority of music, art,\n  writing, plays, and so on, from the beginning humanity, has been\n  vacuous, uninspired, tacky, boring, and well... terrible. To believe\n  or think otherwise is to accept a revisionist and nostalgic view of the\n  world.</p>\n\n<h2 style="font-size:2em;">Personal Experiences</h2>\n\n<blockquote>Pop music started going downhill around the year [2005]</blockquote>\n\n<p>I don't want to make assumptions about this person's age, but we can agree\n  that this probably isn't the writing of a 60 year old person, but\n  someone who is in their early- to mid-20s. This article is\n  written in 2017, so a 25 year old person would have been about 13 years old\n  at that time. It is easy to forget that the teenage years are a major\n  inflection point for humans. The toys they played with are stowed away, new\n  friends are found, and they are becoming free enough to learn some life\n  meaning. Within a few years, they will have their first beer, try getting\n  high, maybe try a cigarette, have their first kiss, lose their virginity,\n  have an overnight stay with friends, get their first job, maybe go to\n  college. So many memories are going to be locked up and represented in these\n  teen years, and a common backdrop to all of this is music. Just like\n  religion, music is defined by our culture, which I'll loosely describe as\n  the time and place someone was brought up.</p>\n\n<p>It is easy then, to look back and bind memories to all of the music that\n  was played during those years, and then it becomes easy, when music isn't such a\n  critical part of someone's soundtrack, to dismiss what the teens are\n  listening to during their personal soundtracks.</p>\n\n<p>As much as I call myself a music junky, I don't conflate my love of music\n  with the same <i>ownership</i> that music. I'm merely a casual listener\n  and observer; none of that music is tied to my formative experiences.</p>\n\n<h2 style="font-size:2em;">Outside of Personal Experiences</h2>\n\n<p>Suppose we look at music in a vacuum, removing the nostalgic perspective.\n  Was the <i>quality</i> of the music better in prior decades. It is easy\n  to listen to top 40 stations and their online analogs and form that belief,\n  but a moment of pondering will expose cracks.</p>\n\n<p>A top 40 station, more or less, plays 40 songs on repeat. Your parents\n  will listen to some "best of" collection found on YouTube, or simply present\n  the greatest hits from their favorite bands.</p>\n\n<p>The very idea of "top 40" presents an issue. Consider\n  the 1970s. In those years, it was definitely more difficult\n  to get into the music industry. Recording was a serious and expensive undertaking\n  and there was no easy way to distribute records. The idea of burning a record\n  and selling wasn't even a possibility because home recording was impossible.</p>\n\n<p>Let's pretend then, that there was one album was released each week in the "pop"\n  genre. Each album would have one single associated with it. We can pretend\n  that the radio stations released one new song\n  per week, which means 52 singles were released each year. Over the course of\n  1970 to 1979, 520 singles were released. </p>\n\n<p>It goes without saying that this is a very low estimate, plus we willfully\n  removed 9 or more songs on each album. Top 40 station are claiming\n  that over the course of entire decade,\n  only 40 songs are worth playing four decades later. Using the very low\n  estimate that <i>only</i> acknowledges singles, the\n  survival rate is less than a 10%.</p>\n\n<p>We also have to take some time to define a <i>better</i> pop song. It isn't hard\n  to make a short list of songs that, today, sound rather vacuous and lame.\n  Consider songs like <i>Disco Duck</i> and <i>My Ding-a-Ling</i>. No one would\n  claim either of these songs are amazing examples of artistry, yet they both\n  were #1 hit singles. It makes one wonder: If these were <i>good</i>\n  enough to play on the radio (and make Top 40 stations decades after their\n  release), what\n  was considered so <i>bad</i> that it didn't deserve any airplay?\n  I'll leave the research up to the reader.</p>\n\n<p><i>Were the musicians more talented back then?</i></p>\n\n<p>This is a hard question to answer. As someone who grew up on music in the\n  1990s and had a wide collection of dusty records from the 1950s through the\n  1980s, I'd argue not really. Granted, there were some great albums where every\n  song felt like a monumental effort, but for the most part, a record included\n  one single, one or two decent songs, and filler material.</p>\n\n<p>Back then, there were two reasons to release singles. The first was to sell\n  45s, which were half-sized records called "singles." The hit song\n  was on the "A side;" another song, usually of low quality, was found on\n  the "B side." This tradition continued in the days of tape decks and CDs.</p>\n\n<p>The second reason to sell singles was, of course, to sell entire albums. The\n  albums contained the single along with the filler material.\n  Not every album was mostly filler material. Some albums were great from the\n  first to the last song, but these were\n  the exceptions and not the rule.</p>\n\n<p>Contrast this to today, where albums are no longer the main sales format.\n  Every song is essentially released and sold as a single, so the\n  need to release filler material to complete an album is no longer a priority,\n  and in fact, filler material is probably detrimental, as poor material is unlikely\n  to earn any income from sales or airplay. The margin of error is much smaller,\n  as there is no reason to believe an entire album sale can recoup the cost of producing\n  songs that wouldn't be able to earn money alone. The current sales channels force\n  higher consistency.</p>\n\n<p>This all ignores the reality that music was much more difficult to put out before\n  computers were cheap enough for the average bedroom\n  musician.</p>\n\n<p><i>Record Deals</i></p>\n\n<p>People often believe that getting a record deal was much harder before the 2000s,\n  while the opposite is actually the truth. It was much harder to get <i>distribution</i>\n  back then, and certainly harder to get music recorded, but getting a record deal, with\n  advances and a marketing team is much more difficult today. Record companies prefer\n  going for artists with an established customer base, offloading the initial risk before\n  putting their weight behind an unknown quantity.</p>\n\n<p>Since the quantity of recording music was much smaller back then, and the\n  cost of making music was much more expensive, it stands to reason, in part, that\n  the quality of the music would generally be higher. However, the higher cost\n  would be an incentive to release music as fast as possible, and filler material\n  was needed to get albums produced and sold as soon as possible.</p>\n\n<p><i>Musician Talent</i></p>\n\n<p>It is true that reel-to-reel recording does not allow the producers to manually\n  fix mistakes the musicians made. In theory, guitarists had to know how to play\n  their chords, singers had to sing in key, drummers had to keep a beat, and bassists\n  had to know how to play their bass.</p>\n\n<p>This is, once again, a function of magnitude. A musician who could play at\n  the levels found on those albums were rare, and they aren't any less rare today.</p>\n\n<p><i>Synthetic Sounds</i></p>\n\n<p>Synthetic sounds is a point of contention with many purists, however, I think\n  it does well to remember that synths were used by The Monkees, The Doors,\n  Simon & Garfunkel, Stevie Wonder, Herbie Hancock, Yes, and many\n  other bands since the 1960s. Few would outright dismiss the talent of many\n  of these musicians purely based on the fact they played and used synths.</p>\n\n<p>Synth was also a large part of Disco and 80s music. Those who wish to defend\n  older pop music would find a considerable challenge holding the synth-heavy music\n  up as a paragon of amazing music.</p>\n\n<p>Using computers may appear easier today, but computers also\n  allow musicians to use many tracks. Old music was limited to 8 tracks, 16\n  tracks, and so on. Today's music is piles of tracks piled on tracks, and\n  it takes considerable knowledge to create current music. Each instrument\n  has to be manually built, mixed together, and tied into a logical piece.\n  Current producers are effectively turning into composers.</p>\n\n<p>Regardless of anyone's feelings about an instrument, new instruments\n  are always created. The electric guitar is less than 100 years old at\n  the time of this writing. Surely, some people dismissed the\n  electric guitar as a non-pure instrument back then.</p>\n\n<p>A MIDI is just another instrument that we can use\n  to create music, and it appears to be here to stay. We can contrast\n  MIDI with many other instruments that didn't last long, such as the\n  electric organ and synth ax.</p>\n\n<h2 style="font-size:2em">Conclusion</h2>\n\n<p>Do I think that music has gotten worse over the past few decades?</p>\n\n<p>No.</p>\n\n<p>I think that music, like anything cultural, is a matter of taste. The\n  easy route to taste is living in the time that it mattered most to you (your\n  teen years). No doubt that the older generations has called each new generations'\n  music uninspired. But would a 30 year-old person today state this claim for every\n  successive generations' music from 1900 to today? Would he or she argue that 1960s\n  music is better than 1970s music, which are both supposed to be better than 1980s music,\n  which is better than 1990s music, etc? I don't think that everyone would state that this\n  is fact. If they were able to, then Vivaldi is the top dog of all music, with Bach, Mozart,\n  and Beethoven all lesser musicians.</p>\n\n<p>While it is easy to advise someone to keep an open mind, I'd rather advise someone\n  to really reconsider the music they grew up on. With a little honesty, we can admit\n  that much of the music we grew up on was terrible, and very little of it stood\n  the test of time. The majority of us didn't even listen to most\n  of the music that was available. We weren't skipping around radio stations because we\n  didn't want to miss out on a smorgus board of options; we skipped around because, most of\n  the time, the song that was playing wasn't fitting to our taste. It was easier to put\n  our favorite albums on repeat, especially when we were busy exploring more visceral\n  aspects of life.</p>\n\n<h2 style="font-size:2em;">Enjoy this article?</h2>\n\n<p>please subscribe to my <a href="/newsletter">Newsletter</a></p>\n\n<p>You can also follow me on <a href="https://twitter.com/ButternotesWeb">Twitter</a> and <a href="https://www.facebook.com/butternotescom-1735463286766016">Facebook</a></p>\n	2017-04-29
should-you-play-left-handed-guitar	Should You Play Left-Handed Guitar?	<p>I met a singer about one month ago. She looked at me and said, "Oh, you are a lefty."</p>\n\n<p>Yes, I play left-handed... she saw my YouTube videos and assumed that I accidentally reversed the image\n  while recording.</p>\n\n<p>But, I'm not a left-handed person. I write with my right hand, throw a ball better with my\n  left hand. Heck my left ear is deaf and my left eye is weaker than my right eye. Physically,\n  there is nothing about the left side of my body that would give me an advantage as a left-handed\n  guitarists, or left-handed anything for that matter.</p>\n\n<h2 style="font-size:2em;">Why Do I Play Left-Handed Guitar?</h2>\n\n<p>From the last paragraph, the only sane response would be because I hate\n  myself, but that's not the reason.</p>\n\n<p>I play left-handed because my left hand is arthritic. I simply cannot hold\n  certain chords with my left hand. In particular, my left ring (#3) finger is not\n  able to move very well. While it can fully open and close, it is not able to stay\n  in certain positions between full open and close, plus it bends into the path of\n  my middle finger.</p>\n\n<p>In short, I'm physically not able to play a right hand guitar. This comes as\n  a shock to people who see my finger-picking. But, to be honest, I don't really\n  use my ring finger that often. I can use it to play the high E string while my pointer\n  (#1) and middle (#2) fingers play, but I'm not able to do quite a few things properly, like\n  a three-finger tremolo or a rasqueado. I used to be able to other things, but over the past 2\n  years, my left hand has lost more movement, so there's not pieces I created years back that\n  I'm no longer able to play.</p>\n\n<p>In general, I advise anyone to not play left-handed unless there is a physical\n  reason they are not able to.</p>\n\n\n<h2 style="font-size:2em;">If You Are Considering Left-Handed Guitar...</h2>\n\n<h3 style="font-size:1em;"><i><b>Don't Believe the Hype</b></i></h3>\n\n<img src="https://s3-us-west-1.amazonaws.com/butternotes/img/blog/left-handed-guitar/jimi.png"\n     alt="jimi hendrix">\n\n<p>Oh yes, so many awesome and ground-breaking guitarists have been left-handed. You have Jimi\n  Hendrix, Tony Iommi, and of course, Kurt Cobain (who was a good songwriter, but let's be honest,\n  not a great guitarist), and so on.</p>\n\n<p>What a slap in the face to the right-handed guitarists who has influenced modern music. The list\n  is too long to bother writing out, and for this reason, I can't think of a more shallow reason to\n  justify playing left- or right-handed. You can be amazing and influential regardless of your handedness.\n  At the end of the day, the only thing that matters is practice and study.</p>\n\n\n<h3 style="font-size:1em;"><i><b>Consider Your Choices</b></i></h3>\n\n<img src="https://s3-us-west-1.amazonaws.com/butternotes/img/blog/left-handed-guitar/gt-left-handed.png"\n     alt="not so many lefties on sale">\n\n<p>There are 7201 solid body electric guitars available. Even if some lefties are mixed in, there\n  are only 137 <i>total</i> lefty guitars available, and I'd bet half of them are used.</p>\n\n<p>Nearly every guitar manufacturer has a handful of left-handed guitars\n  available, but even among those that do, they limit the choices to a small section of their\n  guitars. Some manufacturers don't make lefties at all, and many won't do it on\n  special order. The tooling is different and it likely isn't worth the cost for them do a one-off\n  guitar on special order.</p>\n\n<p>It comes down to personality and taste. I personally don't mind having a limited selection\n  of instruments. There really isn't that many I'm interesting in buying, however, it is very\n  difficult find a left-handed guitar in a B&M shop. This means that, more often than not, I have\n  to do a lot of upfront research and guesswork. Instead of going to the store and trying a large\n  selection of guitars, lefties are bound to find old-model guitars with rusted strings. Unfortunately,\n  we often have to commit the cardinal sin of buying an instrument without trying it first.</p>\n\n<p>Did I forget to mention that left-handed guitars tend to be more expensive than their right-handed\n  versions?</p>\n\n\n<h3 style="font-size:1em;"><i><b>Death By a Thousand Cuts</b></i></h3>\n\n<p>It goes without saying that there are jerks in this world, and although musicians\n  tend to be a good group of people, jerks have found their way into the music world.\n  They may not always last long, but there will always be reinforcements.</p>\n\n<p>The jokes and commentary get old very fast and I've definitely heard and seen it all.</p>\n\n<p><i>Are you witnessing a terrible right-handed guitarists who's been playing for 10 years?</i>\n  They will be encouraged to keep on working on it.</p>\n\n<p><i>Are you a decent lefty guitarist who's been playing for 1 year, out-classing\n    the right-handed guitarist who's been playing\n    for 10 years?</i> Wait to be told how much you suck, be told to quit, be told\n  to stop trying to be different and just buy a righty.</p>\n\n<p><i>Are you in a guitar store?</i> "We love our lefties" they will say. They have 2\n  guitars if you are lucky. Expect to find a cheap acoustic with an extra hole and\n  3 year old strings.</p>\n\n<img src="https://s3-us-west-1.amazonaws.com/butternotes/img/blog/left-handed-guitar/cobain-guitar.png"\n     alt="one of kurt cobain's broken guitars" >\n\n<p><small>What's the problem? The action's great on that one.</small></p>\n\n<p><i>A guitar sales person once said to me "I've been selling lefties for\n    20 years. You know how many I've sold?"</i> He told me "one." Fine, I guess\n  I'm in no rush to plop down money on the junk he's peddling to me.</p>\n\n<p><i>Why do you play lefty?</i> It's a passive-aggressive question that turns into\n  a pointless debate. Just don't answer it.</p>\n\n<p>Even if I answer that question, they are quick to pop names of people with missing\n  fingers on their fret-hand who were incredible musicians. Jerry Garcia and Django Reinhardt\n  are two never-ending examples. Well, Toni Iommi, a lefty, had missing fingers on his right hand, so\n  what's the point?</p>\n\n<p><i>Lefties play better because they have that right-brain thing going on, right?</i></p>\n\n<p>One day, we'll stop teaching our children this load of pseudoscience, but I won't\n  hold my breath.</p>\n\n<h3 style="font-size:1em;"><i><b>You Will Be in a Surly Club</b></i></h3>\n\n<p>Don't confuse "surly" with "complete jerk."</p>\n\n<p>Left-handed guitarists share a self-depreciating sense of humor about\n  the life of a southpaw guitarist. We take a lot of subtle jabs\n  to ourselves and to musician's in general.</p>\n\n<p>I guess the best summary I've ever heard was "You know how it is."</p>\n\n<p>Oh, I do...</p>\n\n<p>...and if you ever wonder why you seldom see a bad left-handed guitarist\nin public, you know how it is.</p>\n\n<h2 style="font-size:2em;">Enjoy this article?</h2>\n\n<p>please subscribe to my <a href="/newsletter">Newsletter</a></p>\n\n<p>You can also follow me on <a href="https://twitter.com/ButternotesWeb">Twitter</a> and <a href="https://www.facebook.com/butternotescom-1735463286766016">Facebook</a></p>\n	2017-05-19
beginner-guitar-exercises-part-one	Beginner Guitar Exercises Part One	<p>Beginner guitarist often (and correctly) as for tips on playing. I won't go\n  into what to buy, or even what songs to start, as these are questions that\n  are very difficult to answer outside of a vacuum. I also will not go into\n  what theory things to learn, as there is plenty of resources available for\n  that as well.</p>\n\n<p>The focus of this article is on developing good technique.\n  There is nothing harder than breaking bad habits, and there is nothing\n  more disappointing than seeing a long-playing guitarists who never broke\n  these bad habits.</p>\n\n<p>I'm not going to into properly holding your instrument, since this\n  is something that doesn't come across very well with words. If you know\n  someone that plays the guitar, ask him or her for advice on this. If you don't\n  know anyone, pay for a lesson with a teacher. Proper posture and hand position\n  cannot be stressed enough, as bad habits are bound to lead to injuries. </p>\n\n<h2 style="font-size:2em;">Exercise One: Chord Fretting</h2>\n\n<p>When you are playing the common chords you are likely to learn at first,\n  each string should be ringing out. Later on, you will be exposed to chords\n  that have muted strings, but before you can learn to control where the muted\n  strings are, you have to learn how to position your fret hand so that all\n  strings ring out.</p>\n\n<div class="lesson-div">\n<p><i>Step 1</i>: Place your fret hand on your knee.</p>\n\n<p><i>Step 2</i>: Lift your fret hand to the fret board and fret the chord\n  you want to fret.</p>\n\n<p><i>Step 3:</i> Going from the Low E to High E, pick each note.</p>\n\n<p>If each note rings out, congratulations, go back to step 1 and repeat.</p>\n\n<p>If any note duds, fix your fret hand, pick each note, and keep fixing your\n  fret hand until each note rings out clearly. Go back to step 1 and repeat.</p>\n</div>\n\n<p>This exercise will serve you well for your entire playing life. It is critical\n  to do this exercise for barre chords, and yes, the chords that have muted notes within\nthem.</p>\n\n<h2 style="font-size:2em;">Exercise 2: Chord Switching</h2>\n\n<p>The easier the initial chords you are learning to play, the easier it is to get\n  chord switching. A beginner should know the chords Am, C, and Em. This is probably\n  the easiest progression to start with.</p>\n\n<div class="lesson-div">\n  <p><i>Step 1</i>: Repeatedly count "1 2 3 4". You don't <i>have</i> to use a metronome for this,\n    but it <i>will</i> help. If you have a friend who can count for you, it will be more\n    challenging and fun.</p>\n\n  <p><i>Step 2:</i>Down-strum Am for four counts. Down-strum C for four counts. Down strum Em\n  for four counts. Repeat.</p>\n</div>\n\n<p>At first, you will likely struggle with this, and that is okay. With practice, you will\n  eventually get this to work out.</p>\n\n<p>There are a few things you are trying to do here, but most importantly, you are trying to\n  change chords while staying in rhythm. You are also trying to listen to yourself. If you hear\n  dudded notes in your chords, that's okay as well. This information is valuable, and it is a guide\n  post for you to work on.</p>\n\n<h2 style="font-size:2em;">Exercise 3: Down and Up Strumming</h2>\n\n<p>In exercise 2, I only talked about down-strumming. Musicians often refer to the base count\n  as a "down beat," which is exactly what you are learning. The beat between the down beat is often\n  called an "up beat."</p>\n\n<div class="lesson-div">\n  <p><i>Step 1</i>: Repeatedly count "1 and 2 and 3 and 4 and"</p>\n\n  <p><i>Step 2</i>: On each number, strum down. on each "and," strum up. Go slow at first.\n    As the last exercise, try switching chords on each "1" count.</p>  \n</div>\n\nAn alternative:\n\n<div class="lesson-div">\n  <p>Try playing this progression:</p>\n\n  <p>For the first 4 counts, play Am</p>\n\n  <p>During the second 4 count, play C for "1 and 2 and" then switch to Em for "3 and 4 and"</p>\n\n  <p>Repeat this progression.</p>\n</div>\n\n<p>There are no precise rules here. Try any other variation you like, but mind that, for most music,\n  the chord changes happen on the down beats. As you advance and learn more, you will find variations.</p>\n\n<h2 style="font-size:2em;">Exercise 4: 2 and 3 Counts</h2>\n\n<p>The 3 count is the second most popular count in Western music, only behind the 4 count. The 2 count\n  is the third most popular.</p>\n\n<div class="lesson-div">\n  <p>This is the same exact thing as Exercises 2 and 3. The only difference is that, instead\n    of counting "1 2 3 4", you would count "1 2 3" for the 3 count, and "1 2" for the 2 count.</p>\n\n  <p>After getting the 3 and 2 counts correct for the down strum, try the up strum as "1 and 2 and 3 and"\n  for the 3 count and "1 and 2 and " for the 2 count.</p>  \n</div>\n\n<h2 style="font-size:2em;">Why all this emphasis on counting?</h2>\n\n<p>For one, counting is the foundation of music. The reason I am starting at down strum is because your\n  hand will naturally move up for the next down strum. The only difference between and down strum and up-down\n  strum pattern is if you are touching the strings. More complicated counts and strumming patterns will come later,\n  but the fundamentals are always the same for every piece you learn in the future.</p>\n\n<h2 style="font-size:2em;">Never Stop Practicing the Fundamentals</h2>\n\n<p>I've been playing for many years and I still do them. Even though they are easy, no one can build\n  a house without a proper foundation. Always go back to the fundamentals and never take it for\n  granted that you have them mastered, lest you forget how to play the fundamentals. You prevent\nthis forgetting by always going through them.</p>\n\n<h2 style="font-size:2em;">Enjoy this article?</h2>\n\n<p>please subscribe to my <a href="/newsletter">Newsletter</a></p>\n\n<p>You can also follow me on <a href="https://twitter.com/ButternotesWeb">Twitter</a> and <a href="https://www.facebook.com/butternotescom-1735463286766016">Facebook</a></p>\n\n<style>\n  .lesson-div {\n  margin: 3em;\n  }\n  \n</style>	2017-05-29
why-no-tabs	Why There Are No Tabs on This Site	<p>Being a guitarist, it isn’t ironic that many of my peers are guitarists, and it wouldn’t surprise you to know that my most-requested feature is to add tablature to this site. I did considerable pondering on this topic, and I never took the time to explain all the reasons to any one individual for not including tabs here. It would take too much time to recite every reason to every person I know, meet, and receive emails from; this is a place I can direct everyone who asks. The following is an attempt to organize my thoughts collected from the various conversations I've had.</p>\n\n<p>The reasons are multi-fold, which includes technical, philosophical, and business concerns.</p>\n\n<h2 style="font-size:2em;">Technical Reasons:</h2>\n\n<p>Unlike other music theory sites, all of the sheet music on this site is created using code. I generate MusicXML (the current standard music data interchange), feed the MusicXML it abcweb, and abcweb generates the SVG sheet music displayed on this site. This is why I can release 500 new scales overnight, generate sound files for each, and have the Random Sheet Music Generator (RSMG), and if you include all of the changes that can be made to each page, billions of scale looks and chords.</p>\n\n<p>While I’m somewhat happy with abcweb, it does not allow me to render tablature. This isn’t a minor issue, since that means I would have to add code to the system to not only render the tablature, but I’d have to make sure all the tabs align with the sheet music no matter the screen size, whether you are looking at it on a 14 inch laptop, a tablet, cell phone or 4k screen. This isn’t impossible to do, but I don’t even have the base tools to get started, much less test across all devices.</p>\n\n<p>This doesn’t mean that I will always use abcweb. I plan to create an SVG music engraving program in the near future, but even with that, I doubt that I will add tablature.</p>\n\n<h2 style="font-size:2em;">Who is my audience?</h2>\n\n<p>I don’t intend this to be a guitar site. Although guitarists are a very large audience, I would like to include all musicians, regardless if you are a guitarist, singer, pianist, etc. This is why I have options to change the clefs, change the note placements, and so on.</p>\n\n<p>If I did add tabs, I’m afraid the site would deter other musicians from using it. If I wanted to be fully inclusive, I’d have to add  tabs for the bass, fret-hole guides for wind instruments, key charts for piano, etc. In theory, this can all be generated with code and rendered as needed, but once again, it is far too much work, and definitely not something I’d be able to release within a year.</p>\n\n<h2 style="font-size:2em;">Tabs Obscure the Meaning</h2>\n\n<p>This loses everyone, but I think it is best shown in an example:</p>\n\n<p>This is the C Major Scale:</p>\n\n<img src="https://s3-us-west-1.amazonaws.com/butternotes/img/blog/why-no-tabs/c-major-scale.png" alt="image of C major scale">\n\n<p>This is the D Dorian Mode:</p>\n\n<img src="https://s3-us-west-1.amazonaws.com/butternotes/img/blog/why-no-tabs/d-dorian-mode.png" alt="image of D dorian mode">\n\n<p>Even if you can't really read music, it’s blindingly obvious the C major scale and D dorian mode is the same exact thing, where the only difference is that, with the D Dorian Scale, you are starting on the D note instead of the C note. This is a powerful concept, and one that wouldn’t be fully apparent with tabs.</p>\n\n<p>Music theory attempts to explain relations between notes. In order to actually understand the relations between notes, you have to know, on some level, what the notes are in the first place. Tabs can help here, but they don’t say anything about the notes.</p>\n\n<p>As a guitarist, you may wonder how you are supposed to know where to fret and where to place your hands. This is the beauty of using sheet music: if you know that C Major is C, D, E, F, G, A, B, C, then all you have to do is learn where those notes are on your fret board, and practicing scales from each position is a good way to learn where those notes are, and discovering the patterns and relationships between the various keys. This is learning, and learning doesn’t have to be easy at all times. I feel that without a little struggle, it won’t sink in, ever.</p>\n\n<h2 style="font-size:2em;">Targeting</h2>\n\n<p>Some flat-out refuse to learn any music reading at all, and that is… okay. I don’t want to please everyone, and I don’t want to stray from my intent. I don’t intend to make this a place where everyone can learn everything, and that is fine. No company or website in history has managed to satisfy everyone. The less I have to focus on, the more I can focus on making a product for the intended audience. This is a one-person show, and if I intended to be everything for everyone, the site would collapse under it's own weight.</p>\n\n<p>I also don’t believe that a person, who has no interest in learning the notes at all, will ever come by and seek information on how to play all the modes from the C Major Scale, and that is okay too. It’s not up to me to force anyone to do something they don’t want to do.</p>\n\n<h2 style="font-size:2em;">Learning to Read Sheet Music.</h2>\n\n<p>I’ll say it: learning to read sheet music isn’t easy. As a self-taught musician, I know exactly how hard it is to drill down and do this kind of stuff, and I empathize with anyone who gives up on it.\n\n<p>"But how would I learn to read music without tabs?"</p>\n\n<p>I will tell you that I never once cross-reference tabs to learn how to read sheet music. I don't think that it\n  would work out at all. There is something to be said about forcing yourself to simply go with it, and the tabs will ultimately be information\n  overload, plus they wouldn't help out anyways. If they aren't there to see, you have no choice but to reference the notation.</p>\n\n<p>I think the main problem is doing too much at once. Everyone who's ever learned to read music, on any instrument, started out learning 1 note, then 2 notes, then 3 notes, and so on.</p>\n\n<p>"... but it isn't fun."</p>\n\n<p>We all have our definition of fun, and that is okay. Some poeple like to jam out and drink beer, and I totally admire and respect that.</p>\n\n<p>What’s fun for me are those “aha” moments, which lets me know I’m improving not only as a music reader, but as a musician. At some point, the passages just run out without me thinking, and that feels wonderful. It is fun for me to discover and play music that simply isn’t available for tab-readers. It is fun for me to find a piano piece and transcribe it to guitar. Reading music gives me power, and it gives me access to so much that wouldn’t be available to me if I never started learning. Even when I struggle, I remind myself that inspiration will be found.</p>\n\n<p>"So, how do I learn if there are no good resources?"</p>\n\n<p>The answer is, simple: practice. That doesn’t really say much, so I’ll give a few resources here.</p>\n\n<p>My most important resource is a notation study book. I strongly suggest using this one:</p>\n\n<a href="https://www.amazon.com/Solo-Guitar-Playing-Book-4th/dp/0825636795/ref=as_li_ss_il?ie=UTF8&qid=1487880090&sr=8-1&keywords=noad+guitar&linkCode=li2&tag=butternoteswb-20&linkId=0d9ae19462a935eb1c669783ad49c5da" target="_blank"><img border="0" src="https://s3-us-west-1.amazonaws.com/butternotes/img/blog/why-no-tabs/noad.jpg" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=butternoteswb-20&l=li2&o=1&a=0825636795" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />\n\n<p><a href="http://amzn.to/2mcqi5H">Buy On Amazon</a>\n\n<p>It starts with the very basics, playing nothing but the open high E, then the open high E and the open B,  then slowly eases you into more and more notes. There are 150 or so exercises interspersed with known pieces that reinforce what you have learned. At the end of the book, there is a list of interesting pieces. It is fun to look back at the first pages and think about the progress I’ve made.</p>\n\n<p>The next resource is IMSLP: <a href=”https://imslp.org/”>IMSLP</a>. I wouldn’t use this to start learning to read music, since quite a bit of it is quite advanced, but it is something you can use once you’re comfortable with more of the fret board.</p>\n\n<p>If you aren’t sure if you should ever start reading music, I’d like to direct you to Why You Shouldn't Use Tab by Adam Neely. He gives reasons much more elegantly than I can say it.</p>\n\n<iframe width="560" height="315" src="https://www.youtube.com/embed/4X7qgBVnMfY" frameborder="0" allowfullscreen></iframe>\n\n<h2 style="font-size:2em;">Enjoy this article?</h2>\n\n<p>please subscribe to my <a href="/newsletter">Newsletter</a></p>\n\n<p>You can also follow me on <a href="https://twitter.com/ButternotesWeb">Twitter</a> and <a href="https://www.facebook.com/butternotescom-1735463286766016">Facebook</a></p>\n	2017-02-23
composition-part-one	Composition Part 1	<h2 style="font-size:2em;">In a Nutshell</h2>\n\n<ul>\n  <li>A song in a minor key does not have to be sad.</li>\n  <li>A song in a major key does not have to be happy.</li>\n  <li>It is not up to me, as a musician, to tell my audience\n  how to feel at the moment or how to interpret my music.</li>\n</ul>\n\n<h2 style="font-size:2em;">Interviewing Musicians</h2>\n\n<p>I've always enjoyed watching and reading musician interviews. Many\n  musicians beg off trying to explain a song's meaning while others\n  try and fail miserably at it.</p>\n\n<p>A memorable interview was one with Meatloaf, talking about his\n  song, "I Will Do Anything for Love." People familiar with this\n  song will know the line "... but I won't do that."</p>\n\n<p>In the interview, the DJ was asking Meatloaf over and over\n  "What is <i>that</i>?"</p>\n\n<p>They went back and for several minutes, discussing how "that"\n  is an ambiguous term. It could be taking out the trash, but each\n  individual has their own "that."</p>\n\n<p>Either the DJ was joking around, or he truly didn't get what\n  Meatloaf was getting at. At no time did Meatloaf say what <i>that</i>\n  meant, saying over and over that it's different for everyone. I\n  recall the interview ending on a confused note.</p>\n\n<p>Other musicians express interest in <i>how</i> people interpret\n  their music. They talk about how a fan walked up and told them that\n  Song X was special and meant Y to the fan. The musician cocks their head\n  and says, "Interesting. I never thought of that."</p>\n\n<h2 style="font-size:2em;">Different Levels of Musicianship</h2>\n\n<p>I've come to the conclusion that there are different levels of musician, and\n  I think that professionals, aside from their many years of playing, progress\n  through levels of play.</p>\n\n<h3 style="font-size:1.5em;">Level 1</h3>\n\n<p>Level 1 is the base-level, where almost all musicians begin. Many people pick\n  up and instrument because they want to emulate their heros, and their heros are\n  heros because the student enjoys the <i>emotion</i> of the music he or she\n  hears.</p>\n\n<p>During the early years, the musician will attempt to capture and emotion, and\n  they will often write from some base place where he or she feels, whether that\n  is joy, heartbreak, sadness, anger, and so on.</p>\n\n<p>In short, level 1 is a very self-focused stage of music writing.</p>\n\n<h3 style="font-size:1.5em;">Level 2</h3>\n\n<p>While still in level 1, that musician is digging deeper and deeper to find\n  and extract more and more emotions. During the later stage, they start to\nfocus more on technique, and begins to look more outward.</p>\n\n<p>For me, level 2 is ignoring my own desire to express my own self and learning\n  to express the relationship between me and my guitar. I enjoy the intellectual\n  challenge of creating music, through exploring how chords work together, to scales,\n  modes, and so on.</p>\n\n<p>A surprising thing happened in this level. While I was mostly ignoring my own\n  personal things, people said that my music got better, not only from a technical\n  level, but from an emotional level.</p>\n\n<p>When I played certain pieces for poeple, I found that the same piece could cause\n  people to laugh, tear up, go into deep thought, or many other emotions.</p>\n\n<p>I started to see music the same as I see writing. The fun for the reader\n  is their ability to share in the creativity of the material they are reading. When\n  an author over-explains, the trust between the reader and author is broken. When this\n  trust is broken, the reader struggles to join the authors journey because at no point\n  is the reader allowed to use her imagination.</p>\n\n<p>The same goes for music. We, as musicians, do not, and cannot own the meaning of\n  a piece of music. That piece, once performed or recorded, is no longer our sole\n  possession. We can't force someone to like our music, and we can't force\n  someone to understand that music. We can explain the meaning all day, but really, why\n  would we want to take away the listener's ownership of that music? I know I wouldn't. If\n  I make a song about joy, and someone breaks down and cry, that's okay with me. I'm not\n  that person, and I do not have thier experiences in life. Who am I to say someone is wrong?</p>\n\n<h3 style="font-size:1.5em;">Level 3</h3>\n\n<p>Level 3 is the part where we begin to perform or record.\n  A musicians is understandably nervous the first time he or she goes on stage. This forces\n  us to look inward, look at our guitar, piano, or microphone, and not interact with the crowd.\n  A crowd can read this\n  state, and while there is no reflection between the crowd and the musician, the musicians may\n  often get encouraging support.</p>\n\n<p>At this level, a musician is truly <i>trying</i>, and audiences can appreciate the difficulty\nof this step.</p>\n\n<h3 style="font-size:1.5em;">Level 4</h3>\n\n<p>After being on stage a few times, the musician is able\n  to finally look out at the crowd and see how the crowd is responding.</p>\n\n<p>At this level, the musician is not playing for him or herself. They are playing for a\n  a space between himself and the crowd he is playing for. With practice and repertoir, the\n  musician is able to "speak" about the relationship.</p>\n\n<p>Level 4 has many substages. This is an exploration of that relationship. At first, it may\n  be awkward for the musician. One crowd may be enjoying themselves while others may\n  be tearing up despite the fact the musician is playing the exact same songs every night.</p>\n\n<p>After considerable time on stage, the musician is finally able to accept what the crowd\n  that night feels. It isn't possible to understand why they are responding as they are. A musician\n  may not be able to recall if he or she is playing differently on stage, or maybe she is, but it's\n  hard to know.</p>\n\n<h3 style="font-size:1.5em;">In Conclusion</h3>\n\n<p>As we become better musicians, we also learn that we aren't the definition of the music,\n  while ironically, the music we create defines everything we are. The ultimate goal, for me,\n  is learning to accept that music is not owned by me. I create it, sure, but I feel that music\n  is shared, whether that sharing is between me and the audience or me and a collaborator, the\n  thinking and approach is the same, and this approach is fundamental to how I think of\n  composition and music writing.</p>\n\n<h2 style="font-size:2em;">Enjoy this article?</h2>\n\n<p>please subscribe to my <a href="/newsletter">Newsletter</a></p>\n\n<p>You can also follow me on <a href="https://twitter.com/ButternotesWeb">Twitter</a> and <a href="https://www.facebook.com/butternotescom-1735463286766016">Facebook</a>. See my music at <a href="https://www.youtube.com/channel/UCeOcCGyn5LFXcaZbNCEvg1w">YouTube</a></p>\n	2017-08-28
beginner-guitar-questions	Beginner Guitar Questions	<h2 style="font-size:1.5em;">Why does my hands hurt when I play guitar?</h2>\n\n<p>How often do you grip you repetitively grip your hands\n  against a block of wood and press strings? This is not\n  a natural action.</p>\n\n<h2 style="font-size:1.5em;">How long will it take for my hands to stop hurting?</h2>\n\n<p>This varies from person to person, but I don't think it should take more than\n  a few weeks of daily practice. I honestly don't have a correct answer.</p>\n\n<h2 style="font-size:1.5em;">Why are my finger tips bleeding?</h2>\n\n<p>You need to take a break and stop playing until your fingers heal. It is not\n  worth injuring yourself to play guitar or any instrument. To be more clear,\n  it is not worth injuring yourself for any reason.</p>\n\n<h2 style="font-size:1.5em;">What are some good books / websites / YouTube channels\n  for learning guitar?</h2>\n\n<p>Honestly, there really isn't any. Even this website is not the best single source\n  for learning any music. Although I try, there is no way that this or any resource can\n  be a complete resource for learning.</p>\n\n<p>While there are books, websites, and channels that you can use to learn\n  from, the best and fastest route is going to be finding a teacher.</p>\n\n<h2 style="font-size:1.5em;">Is it possible to be a self-taught guitarist?</h2>\n\n<p>The answer is both yes and no, although this is a matter of degree.</p>\n\n<p>I don't think it is really possible to become a good guitarist if you are\n  100% self-taught. Everyone has a teacher of some level, even if it is just\n  friends and family.</p>\n\n<p>Musicians love to discuss music and technique with each other. Many of us\n  enjoy showing some tricks and we also enjoy learning new tricks. A good musician,\n  in my opinion, is open-minded. Don't be afraid to aks questions of your fellow\n  musicians. While there are some assholes, the majority will be more than happy\nto show you a trick or two.</p>\n\n<h2 style="font-size:1.5em;">Why do music teachers only want to teach classical or jazz?</h2>\n\n<p>The asker usually wants to find a teacher for Rock & Roll or Blues.</p>\n\n<p>To be honest, Rock & Roll is very simple to learn, and for the most part, relatively\n  boring and uninsteresting to teach. The Blues is fairly similar.</p>\n\n<p>If you can learn classical or jazz, picking up rock or blues isn't going\n  to be difficult. This is contrast principal in play.</p>\n\n<p>If you are truly determined to find a rock or blues teacher in your area, you can\ncertainly find one, though may be a tad more difficult to find a good one.</p>\n\n<h2 style="font-size:1.5em;">Which guitarist would you suggest I listen to for inspiration?</h2>\n\n<p>Any guitarist who does not wake up in the morning and punch a clock at a 9 to 5 will do.\n  These are professionals and any of them are worthy of our respect.</p>\n\n<p>This question is, more often than not, asked by someone seeking guidance on what kind\n  of music she should be learning to play. This isn't possible to answer. If you want to be\n  a shredder, listen to any shredder and emulate whomever you enjoy listening to. If you want\n  to be a folk or country musician who strums chords with a capo, there is no shame in that either.</p>\n\n<p>Really, just listen to what you enjoy. Play what touches your heart when you hear it.</p>\n\n<p>A surprising effect of playing music is that, quite often, the music is dissappointing to learn\n  once the musician feels she has a handle on the piece. This is a natural feeling to have. There\n  are a few songs I loved until I learned them, but there are just as many songs I enjoyed <i>more</i>\n  once I learned to play them.</p>\n\n<h2 style="font-size:1.5em;">Do I really need to use a metronome?</h2>\n\n<p>Yes.</p>\n\n<h2 style="font-size:1.5em;">Do I really have to learn and practice scales?</h2>\n\n<p>Yes.</p>\n\n<h2 style="font-size:1.5em;">How do I remember all of those guitar chords?</h2>\n\n<p>You don't. I know that some people have all of them memorized, but outside\n  of the majors, minors, augmented, diminished, 7ths and 9ths, you really don't\n  have to memorize every funky and strange chord in existence.</p>\n\n<p>This is where learning scales come into play. Once you know scales,\n  you can use those shapes to create sensible chords. You may not know\n  for certain if it is a diminished sharp 7 / flat 9 or whatever, but you\n  will know the correct voicings and shapes to make unique chords.</p>\n\n<p>I'll also point out that many chords are highly unstable, and do\n  best as transition chords.</p>\n\n<h2 style="font-size:1.5em;">What is a good guitar for a beginner?</h2>\n\n<p>This is a rather difficult question to answer, since I don't really know.\n  However, I will try to toss a bit of advice here.</p>\n\n<p>The simple answer is any guitar that makes noise, but reality is that\n  you will likely do best buying a used guitar for around $200. These\n  usually had a higher initial sticker price (Google is your\n  friend here) and are generally better quality than the standard $200 guitar\n  you will find at a shop.</p>\n\n<p>If you do buy used, you would likely want to get the guitar set up\n  at a store. The repair person will be able to set the strings, fix the neck,\n  and fix whatever other problems you may have.</p>\n\n<p>If you buy new, you may want to ask the store to take a look at it before\n  walking out the door with the guitar. They will be abel to set the strings\n  and neck so that it sounds and plays correctly. It is unusual for a guitar\n  on the floor to be set up correctly, and no store is going to put in the work\n  unless you ask for it.</p>\n\n<h2 style="font-size:1.5em;">Do I really need to learn to read sheet music?</h2>\n\n<p>No, but it doesn't hurt to learn.</p>\n\n<h2 style="font-size:1.5em;">Do I really have to learn all the notes on the neck?</h2>\n\n<p>No, but it doen't hurt to learn.</p>\n\n<p>That's probably a little too short. I certainly believe all musicians\n  should learn what notes are on their instruments. Before deciding not to,\n  ask yourself: what's your reason, outside of laziness?</p>\n\n<h2 style="font-size:1.5em;">Do you think it's best to not learn any music as that\n  will stymie my creativity?</h2>\n\n<p>If I haven't had this said to me a hundred times, I would think this is a joke\n  question.</p>\n\n<p>Think about this. Every year, 1 million pieces of music are created, give or take.\n  What exactly are you planning to create that is totally new?</p>\n\n<p>I know this sounds derisive, but really think about this one. Do authors\n  write books before they read other books? Do they write before learning to create\n  sentences? Do artists not learn how to paint?</p>\n\n<p>There is so much information out there, no one person could possibly absorb it\n  all, but that information, especially at a professional level, is unlike anything\n  you are likely to be aware of today. Why would you eschew that education?</p>\n\n<p>I've seen this so many times. I'm sorry to say it, but I've never seen anyone\n  who thinks this who didn't have an incredibly low ceiling. Certainly nothing original.</p>\n\n<h2 style="font-size:1.5em;">I only play X type of music. Will it hurt me to listen\n  to other kinds of music?</h2>\n\n<p>No. Musicians are a strange bunch. Look at any guitar hero you have and you will\n  see a shockig array of musicians and genres who inspired them.</p>\n\n<h2 style="font-size:1.5em;">Am I a bad musician if I only want to strum?</h2>\n\n<p>Not at all! A great rhythm guitarist is an important element of many bands. Imagine\n  what Guns 'N' Roses would be without Izzy Stradlin.</p>\n\n	2017-09-05
catfish-programmers	Catfish Programmers	<img src="https://s3-us-west-1.amazonaws.com/butternotes/img/blog/cafish-programmer/catfish-programmer.png">\n\n<h2 style="font-size:2em;">The Lonesome Bottom Feeder</h2>\n\n<p>A catfish, due to their negative buoyancy, is largely considered a bottom\n  feeder, a detritivore. In reality, they come in different forms, but\n  they are all opportunistic eaters.</p>\n\n<p>A catfish programmer is, more often than not, a contractor. The last desperate\n  phone number a company calls when the technical debt gets too deep to happen, when\n  that pursuit of the perfect "somebody" has descended into "get close enough, just\n  get this done!"</p>\n\n<p>A catfish programmer sees the world differently than others, and generally\nshies away from the cliches found in programming circles and articles.</p>\n\n<p><b>Impostor Syndrome?</b></p>\n\n<p>Work needs to get done. The catfish's work demands it pushes\nits head down and grinds through the mud.</p>\n\n<p><b>Learn a New Code Base and Be Productive in 2 months?</b></p>\n\n<p>The code needs to be fixed in 2 days, new features have to be\n  added next week, the system needs to be rebuilt in 1 month.\n  Present the critical bug and the catfish figures out the rest.</p>\n\n<p><b>Pin Pong and free food?</b></p>\n\n<p>No.</p>\n\n<p><b>Meetings?</b></p>\n\n<p>No.</p>\n\n<p><b>Mentorship?</b></p>\n\n<p>The catfish programmer doesn't learn by riding the coat-tails\n  of others. The catfish programmer learns by looking at a pile of\n  often poorly-written code. The lessons aren't <i>what</i> to\n  do, but <i>what not</i> to do.</p>\n\n<p>The catfish programmer regularly sees the code of legends. The code that\n  makes it into The Daily WTF[1] has no peer to many things a catfish\n  programmer sees on an hourly basis.</p>\n\n<p>The catfish programmer observes the cost of not fixing mistakes as they\n  come up. The catfish finds things that don't make sense, and removes\n  those things from it's arsenal:</p>\n\n<p><i>Metaprogramming is witchcraft.</i></p>\n\n<p>Not the fun "add two eyes of newt" style\n  of witchcraft, but the summoning of the demons from the 7th layer of hell\n  and release a Stephen King blood-fest on the planet.</p>\n\n<p><i>Why are the deletes so slow on my database?</i></p>\n\n<p>The ORM added <code>delete cascade</code> to the\n  10 denormalized tables it created.</p>\n\n<p><i>Why is my system slow?</i></p>\n\n<p><code>$ grep -R "map" *</code></p>\n\n<p><code>reduce(filter even? (apply (* 3) (map inc (i for i in (filter even? collection)))))</code></p>\n\n<p>A catfish programmer defaults to clarity. A route is a route, and is written out\n  by hand. A computer can remove a lot of redundancy, but a computer can't <i>think</i>. A\n  <i>human</i> can extend, add, subtract, and finally, reduce to the elements.\n  A catfish programmer is a master of the basics. The code a catfish creates\n  is no different than the code one would find in a freshman's introductory class.</p>\n\n<p>The best mentor is the failed code of others, and those failures, more often\n  than not, result in refusing the write code when it matters most. A catfish\nvicariously learns that easy is never easy when it matters.</p>\n\n<p><b>The Life and Workflow</b></p>\n\n<p>A catfish programmer is often a faceless wall of text, eschewing\nmeetings and producing output with little guidance.</p>\n\n<p>Taking breaks to play games, chat around coffee, or taking a few minutes\n  to walk around the office is a non-existent element of life. An 8\n  hour work day is exactly that: 8 hours of pure work. Some days are 7 hours, some\n  9 or 10, but every minute counts until the catfish's eyes glaze over and its\n  brain screams "no more."</p>\n\n<p>There is no seeking advice outside of clarifying intent. The catfish is\n  the expert in all things, even when it is not. Error messages\n  become the intellectual conversation with the old wise programmer\n  on the hill.</p>\n\n<p>It is a lonely existence, but it is a productive existence. A catfish is\n  privy to the toxic "social media" landscape of programming, but a catfish\n  chooses to not be directly affected by the toxicity, nor does it attempt to move the needle one\n  way or the other. Good and bad code comes from the sober, the drug-addicted, the men, the\n  women, the MIT all-star, the high school dropout, the senior with 12 years\n  experience, and the fresh grad.</p>\n\n<p>In the catfish world,\n  code speaks, money changes hands, and friendships\n  are evanescent, blind to color, age, and gender.\n  The catfish doesn't care.</p>\n\n<h2 style="font-size:2em;">The Invasive Species</h2>\n\n<p>The lonesome catfish lives in an cyclic and symbiotic ecology, sharing\n  the world with the invasive catfish.</p>\n\n<p>The bottom-feeder doesn't know much about the invasive catfish, only that\n  without the piles of detritus the invader produces, there would be less work.\n  There is no sense of who the person is, what that person was like, or how or why\n  that person managed to last long enough to create, lead, and ultimately spoil\n  the code they were working on. The bottom-feeder can only guess the invader had a need, a magic,\n  that made their presence addicting and appreciated.</p>\n\n<p>In some ways, the bottom-feeder appreciates the invader, but on other times,\n  knowing that the contract is going to end in short time, and the hunt for the\n  next contract may be tomorrow, the bottom-feeder can only be silently mystified\n  at how the invader found a job in the first place, much less kept it.\n  The bottom-feeder only knows it couldn't be the invader, for their tastes\n  are very different indeed.</p>\n\n<p>[1] <a href="http://thedailywtf.com/">The Daily WTF</a></p>\n\n<p><b>Discussions:</b></p>\n\n<p><a href="https://news.ycombinator.com/item?id=14564455">Hacker News</a></p>\n\n<h2 style="font-size:2em;">Need a Contractor?</h2>\n\n<p>If you would like to try me out for a contract, feel free to send me an email at <a href="mailto:dbtoomey@gmail.com?subject=contracting inquiry">dbtoomey@gmail.com</a></p>\n\n<p>My main tech is Python, Clojure, PostgreSQL, and PL/pgSQL, using Linux. I've worked with many other languages and database stuff. To\ntruly "catfish" as described here, gotta be able to move around the stack and dive into whatever situation pops up.</p>\n\n<h2 style="font-size:2em;">Enjoy this article?</h2>\n\n<p>please subscribe to my <a href="/newsletter">Newsletter</a></p>\n\n<p>You can also follow me on <a href="https://twitter.com/ButternotesWeb">Twitter</a> and <a href="https://www.facebook.com/butternotescom-1735463286766016">Facebook</a></p>\n	2017-06-12
travis-picking	What is Travis Picking?	<p>The other day, I was having a conversation with another guitarist about songs we learned when we first started playing. I told him that\n  the first finger-picking song I learned was "Let it Be" by the Beetles. It wasn't anything difficult, just a basic pinch-picking pattern that\nyou could teach anyone who is just starting.</p>\n\n<blockquote>Oh, you mean Travis Picking?</blockquote>\n\n<p>No. That's probably a bit difficult to teach someone who just started playing a week earlier.</p>\n\n<blockquote>Travis Picking is just a basic two-finger alternating picking pattern.</blockquote>\n\n<p>Uh... not really...</p>\n\n<p>But there are many other misconceptions one can find from conversations and the internet:</p>\n\n<blockquote>Can you suggest songs that use Travis Picking? I've already learned "Dust in the Wind."</blockquote>\n\n<p>Uh...</p>\n\n<blockquote>Oh yeah, I know what Travis Picking is. That's basically folk music, right?</blockquote>\n\n<p>I guess so... why not look up what it actually is, and more importantly, what it sounds like, so you can get a better idea of it?</p>\n\n<blockquote>I looked it up online and saw the tabs.</blockquote>\n\n<p>But did you find someone playing it?</p>\n\n<p>While I won't claim that Travis picking is the most storied and misunderstood idea tossed around by guitarists, it is well up there,\n  and I like to help people out by fixing their misconceptions. We'll ignore the fact that despite the nomenclature, Travis didn't invent\n  this style of play, and just look some tabs I've borrowed from Wikipedia:</p>\n\n<img src="https://s3-us-west-1.amazonaws.com/butternotes/img/blog/travis/not-travis-picking.png" />\n\n<p><small>(I kept the general name of the image file)</small></p>\n\n<p>While this a somewhat-correct representation of Travis picking, the best way to describe Travis picking is through example,\n  and what better way to show than from the eponym himnself?</p>\n\n<iframe width="560" height="315" src="https://www.youtube.com/embed/Go8x_1fD5vM" frameborder="0" allowfullscreen></iframe>\n\n<p>Despite the fact Travis "only" used two fingers, I don't think that anyone would claim that is "easy" after hearing it, and at least, definitely\n  not something you'd teach someone who\n  just picked up their guitar one week earlier. As musicians, we have to be careful of what we learn because so much information is\n  watered-down to the lowest common denominator. As students, we should never forget that our ears are a vital part of our learning.</p>\n\n<h2 style="font-size:2em;">Enjoy this article?</h2>\n\n<p>please subscribe to my <a href="/newsletter">Newsletter</a></p>\n\n<p>You can also follow me on <a href="https://twitter.com/ButternotesWeb">Twitter</a> and <a href="https://www.facebook.com/butternotescom-1735463286766016">Facebook</a></p>\n	2017-03-20
\.


SET search_path = musician, pg_catalog;

--
-- TOC entry 3174 (class 0 OID 1890485)
-- Dependencies: 196
--

COPY apple_links (apple_link_id, musician_id, link) FROM stdin;
85	maurice-ravel	<iframe src="//tools.applemusic.com/embed/v1/album/331560961?country=us&at=1000lucb&ct=1000lucb" frameborder="0" width="100%" height="500px"></iframe>
86	leopold-godowski	<iframe src="//tools.applemusic.com/embed/v1/album/342010002?country=us&at=1000lucb&ct=1000lucb" frameborder="0" width="100%" height="500px"></iframe>
87	sergei-prokofiev	<iframe src="//tools.applemusic.com/embed/v1/album/293388717?country=us&at=1000lucb" frameborder="0" width="100%" height="500px"></iframe>
88	sergei-prokofiev	<iframe src="//tools.applemusic.com/embed/v1/album/521526769?country=us&at=1000lucb" frameborder="0" width="100%" height="500px"></iframe>
29	sleep	<iframe src="//tools.applemusic.com/embed/v1/album/272772755?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
30	sleep	<iframe src="//tools.applemusic.com/embed/v1/album/969252365?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
31	within-temptation	<iframe src="//tools.applemusic.com/embed/v1/album/931127608?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
71	franki-love	\N
1	facing-west	<iframe src="//tools.applemusic.com/embed/v1/album/1031770353?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
2	facing-west	<iframe src="//tools.applemusic.com/embed/v1/song/1196143152?country=us&at=1000lucb&ct=1000lucb" width="100%" height="110px" frameborder="0"></iframe>
3	facing-west	<iframe src="//tools.applemusic.com/embed/v1/song/1103949175?country=us&at=1000lucb&ct=1000lucb" width="100%" height="110px" frameborder="0"></iframe>
4	facing-west	<iframe src="//tools.applemusic.com/embed/v1/song/1031771098?country=us&at=1000lucb&ct=1000lucb" width="100%" height="110px" frameborder="0"></iframe>
5	facing-west	<iframe src="//tools.applemusic.com/embed/v1/song/1186343535?country=us&at=1000lucb&ct=1000lucb" width="100%" height="110px" frameborder="0"></iframe>
6	facing-west	<iframe src="//tools.applemusic.com/embed/v1/song/1167106282?country=us&at=1000lucb&ct=1000lucb" width="100%" height="110px" frameborder="0"></iframe>
7	beats-antique	<iframe src="//tools.applemusic.com/embed/v1/album/1152658346?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
8	beats-antique	<iframe src="//tools.applemusic.com/embed/v1/album/850579827?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
9	beats-antique	<iframe src="//tools.applemusic.com/embed/v1/album/559523501?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
10	tina-guo	<iframe src="//tools.applemusic.com/embed/v1/album/1182202661?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
11	tina-guo	<iframe src="//tools.applemusic.com/embed/v1/album/1130480068?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
12	tina-guo	<iframe src="//tools.applemusic.com/embed/v1/album/1068562913?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
13	tina-guo	<iframe src="//tools.applemusic.com/embed/v1/album/1010943860?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
14	tina-guo	<iframe src="//tools.applemusic.com/embed/v1/album/840213771?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
15	tina-guo	<iframe src="//tools.applemusic.com/embed/v1/album/849345275?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
16	tina-guo	<iframe src="//tools.applemusic.com/embed/v1/album/836450050?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
17	tina-guo	<iframe src="//tools.applemusic.com/embed/v1/album/849345277?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
18	susie-suh	<iframe src="//tools.applemusic.com/embed/v1/album/211509499?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
19	susie-suh	<iframe src="//tools.applemusic.com/embed/v1/album/490880321?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
20	susie-suh	<iframe src="//tools.applemusic.com/embed/v1/album/973178728?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
21	susie-suh	<iframe src="//tools.applemusic.com/embed/v1/album/1161406975?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
22	the-six-parts-seven	<iframe src="//tools.applemusic.com/embed/v1/album/314264718?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
23	the-six-parts-seven	<iframe src="//tools.applemusic.com/embed/v1/album/312883658?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
24	the-six-parts-seven	<iframe src="//tools.applemusic.com/embed/v1/album/312907481?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
25	the-six-parts-seven	<iframe src="//tools.applemusic.com/embed/v1/album/313220241?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
26	the-six-parts-seven	<iframe src="//tools.applemusic.com/embed/v1/album/312605220?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
27	sleep	<iframe src="//tools.applemusic.com/embed/v1/album/522194951?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
28	sleep	<iframe src="//tools.applemusic.com/embed/v1/album/86345767?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
32	within-temptation	<iframe src="//tools.applemusic.com/embed/v1/album/805859163?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
33	within-temptation	<iframe src="//tools.applemusic.com/embed/v1/album/344338333?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
34	within-temptation	<iframe src="//tools.applemusic.com/embed/v1/album/418710473?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
35	within-temptation	<iframe src="//tools.applemusic.com/embed/v1/album/273559451?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
36	within-temptation	<iframe src="//tools.applemusic.com/embed/v1/album/273556320?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
37	frederic-rzewski	<iframe src="//tools.applemusic.com/embed/v1/album/456269424?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
38	frederic-rzewski	<iframe src="//tools.applemusic.com/embed/v1/album/1025021187?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
39	frederic-rzewski	<iframe src="//tools.applemusic.com/embed/v1/album/51248564?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
40	frederic-rzewski	<iframe src="//tools.applemusic.com/embed/v1/album/1025009290?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
41	haris-alexiou	<iframe src="//tools.applemusic.com/embed/v1/album/1022922211?country=us" width="100%" height="500px" frameborder="0"></iframe>
45	haris-alexiou	<iframe src="//tools.applemusic.com/embed/v1/album/826371042?country=us" width="100%" height="500px" frameborder="0"></iframe>
42	haris-alexiou	<iframe src="//tools.applemusic.com/embed/v1/album/724064959?country=us" width="100%" height="500px" frameborder="0"></iframe>
43	haris-alexiou	<iframe src="//tools.applemusic.com/embed/v1/album/827905976?country=us" width="100%" height="500px" frameborder="0"></iframe>
44	haris-alexiou	<iframe src="//tools.applemusic.com/embed/v1/album/836074571?country=us" width="100%" height="500px" frameborder="0"></iframe>
47	lili-roquelin	<iframe src="//tools.applemusic.com/embed/v1/album/913407568?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
48	lili-roquelin	<iframe src="//tools.applemusic.com/embed/v1/album/334062245?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
49	lili-roquelin	<iframe src="//tools.applemusic.com/embed/v1/album/291774393?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
50	lili-roquelin	<iframe src="//tools.applemusic.com/embed/v1/album/428050739?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
51	lili-roquelin	<iframe src="//tools.applemusic.com/embed/v1/album/474042867?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
52	unkle	<iframe src="//tools.applemusic.com/embed/v1/album/928163224?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
53	unkle	<iframe src="//tools.applemusic.com/embed/v1/album/927478699?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
54	unkle	<iframe src="//tools.applemusic.com/embed/v1/album/371226382?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
55	unkle	<iframe src="//tools.applemusic.com/embed/v1/album/133465?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
56	sweet-relief-two	<iframe src="//tools.applemusic.com/embed/v1/song/1034985559?country=us&at=1000lucb&ct=1000lucb" width="100%" height="110px" frameborder="0"></iframe>
57	sweet-relief-two	<iframe src="//tools.applemusic.com/embed/v1/song/1136519247?country=us&at=1000lucb&ct=1000lucb" width="100%" height="110px" frameborder="0"></iframe>
58	sweet-relief-two	<iframe src="//tools.applemusic.com/embed/v1/song/281618759?country=us&at=1000lucb&ct=1000lucb" width="100%" height="110px" frameborder="0"></iframe>
59	sweet-relief-two	<iframe src="//tools.applemusic.com/embed/v1/song/515353697?country=us&at=1000lucb&ct=1000lucb" width="100%" height="110px" frameborder="0"></iframe>
60	sweet-relief-two	<iframe src="//tools.applemusic.com/embed/v1/song/724957611?country=us&at=1000lucb&ct=1000lucb" width="100%" height="110px" frameborder="0"></iframe>
61	sweet-relief-two	<iframe src="//tools.applemusic.com/embed/v1/song/217295347?country=us&at=1000lucb&ct=1000lucb" width="100%" height="110px" frameborder="0"></iframe>
62	francesco-libetta	<iframe src="//tools.applemusic.com/embed/v1/album/160337013?country=us" width="100%" height="500px" frameborder="0"></iframe>
63	francesco-libetta	<iframe src="//tools.applemusic.com/embed/v1/album/264596022?country=us" width="100%" height="500px" frameborder="0"></iframe>
64	francesco-libetta	<iframe src="//tools.applemusic.com/embed/v1/album/287543055?country=us" width="100%" height="500px" frameborder="0"></iframe>
65	francesco-libetta	<iframe src="//tools.applemusic.com/embed/v1/album/215449510?country=us" width="100%" height="500px" frameborder="0"></iframe>
66	emancipator	<iframe src="//tools.applemusic.com/embed/v1/album/905056226?country=us" width="100%" height="500px" frameborder="0"></iframe>
67	emancipator	<iframe src="//tools.applemusic.com/embed/v1/album/1041629965?country=us" width="100%" height="500px" frameborder="0"></iframe>
68	emancipator	<iframe src="//tools.applemusic.com/embed/v1/album/1017061830?country=us" width="100%" height="500px" frameborder="0"></iframe>
69	emancipator	<iframe src="//tools.applemusic.com/embed/v1/album/352483330?country=us" width="100%" height="500px" frameborder="0"></iframe>
70	emancipator	<iframe src="//tools.applemusic.com/embed/v1/album/1001326575?country=us" width="100%" height="500px" frameborder="0"></iframe>
72	the-reverend-horton-heat	<iframe src="//tools.applemusic.com/embed/v1/album/786201214?country=us" width="100%" height="500px" frameborder="0"></iframe>
73	the-reverend-horton-heat	<iframe src="//tools.applemusic.com/embed/v1/album/6577408?country=us" width="100%" height="500px" frameborder="0"></iframe>
74	the-reverend-horton-heat	<iframe src="//tools.applemusic.com/embed/v1/album/3248716?country=us" width="100%" height="500px" frameborder="0"></iframe>
75	the-reverend-horton-heat	<iframe src="//tools.applemusic.com/embed/v1/album/3247035?country=us" width="100%" height="500px" frameborder="0"></iframe>
76	the-reverend-horton-heat	<iframe src="//tools.applemusic.com/embed/v1/album/3243576?country=us" width="100%" height="500px" frameborder="0"></iframe>
77	farewell-angelina	<iframe src="//tools.applemusic.com/embed/v1/album/1157109483?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
78	farewell-angelina	<iframe src="//tools.applemusic.com/embed/v1/song/1077150319?country=us&at=1000lucb&ct=1000lucb" width="100%" height="110px" frameborder="0"></iframe>
79	alexander-scriabin	<iframe src="//tools.applemusic.com/embed/v1/album/979159690?country=us" width="100%" height="500px" frameborder="0"></iframe>
80	larkin-poe	<iframe src="//tools.applemusic.com/embed/v1/album/1079608080?country=us" width="100%" height="500px" frameborder="0"></iframe>
81	larkin-poe	<iframe src="//tools.applemusic.com/embed/v1/album/924342254?country=us" width="100%" height="500px" frameborder="0"></iframe>
82	larkin-poe	<iframe src="//tools.applemusic.com/embed/v1/album/538554476?country=us" width="100%" height="500px" frameborder="0"></iframe>
83	larkin-poe	<iframe src="//tools.applemusic.com/embed/v1/album/417109701?country=us" width="100%" height="500px" frameborder="0"></iframe>
84	zoe-johnston	<iframe src="//tools.applemusic.com/embed/v1/album/290806660?country=us&at=1000lucb&ct=1000lucb" width="100%" height="500px" frameborder="0"></iframe>
\.


--
-- TOC entry 3199 (class 0 OID 0)
-- Dependencies: 195
--

SELECT pg_catalog.setval('apple_links_apple_link_id_seq', 88, true);


--
-- TOC entry 3171 (class 0 OID 1890451)
-- Dependencies: 193
--

COPY info (musician_id, musician_name, genre, photo_path, thumbnail_path, added_date) FROM stdin;
tina-guo	Tina Guo	instrumental	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/tina-guo.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/tina-guo-thumb.png	2017-02-13
beats-antique	Beats Antique	electronic	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/beats-antique.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/beats-antique-thumb.png	2017-02-12
facing-west	Facing West	pop / country	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/facing-west.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/facing-west-thumb.png	2017-02-11
susie-suh	Susie Suh	singer / songwriter	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/susie-suh.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/susie-suh-thumb.png	2017-02-14
the-six-parts-seven	The Six Parts Seven	instrumental	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/the-six-parts-seven.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/the-six-parts-seven-thumb.png	2017-02-15
sleep	Sleep	metal	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/sleep.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/sleep-thumb.png	2017-02-16
within-temptation	Within Temptation	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/within-temptation.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/within-temptation-thumb.png	2017-02-17
frederic-rzewski	Frederic Rzewski	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/frederic-rzewski.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/frederic-rzewski-thumb.png	2017-02-18
haris-alexiou	Haris Alexiou	foreign	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/haris-alexiou.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/haris-alexiou-thumb.png	2017-02-19
zoe-johnston	Zoe Johnston	trance	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/zoe-johnston.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/zoe-johnston-thumb.png	2017-03-13
lili-roquelin	LiLi Roquelin	singer / songwriter	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/lili-roquelin.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/lili-roquelin-thumb.png	2017-02-20
unkle	UNKLE	electronic	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/unkle.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/unkle-thumb.png	2017-02-21
sweet-relief-two	Various Artists (Sweet Relief Two)	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/sweet-relief-two.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/sweet-relief-two-thumb.png	2017-02-22
larkin-poe	Larkin Poe	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/larkin-poe.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/larkin-poe-thumb.png	2017-03-09
francesco-libetta	Francesco Libetta	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/francesco-libetta.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/francesco-libetta-thumb.png	2017-02-23
emancipator	Emancipator	electronic	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/emancipator.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/emancipator-thumb.png	2017-02-24
franki-love	Franki Love	singer / songwriter	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/franki-love.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/franki-love-thumb.png	2017-02-25
the-reverend-horton-heat	The Reverend Horton Heat	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/the-reverend-horton-heat.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/the-reverend-horton-heat-thumb.png	2017-02-27
farewell-angelina	Farewell Angelina	country	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/farewell-angelina.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/farewell-angelina-thumb.png	2017-02-28
alexander-scriabin	Alexander Scriabin	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/alexander-scriabin.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/alexander-scriabin-thumb.png	2017-03-08
maurice-ravel	Maurice Ravel	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/maurice-ravel.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/maurice-ravel-thumb.png	2017-03-20
leopold-godowski	Leopold Godowski	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/leopold-godowski.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/leopold-godowski-thumb.png	2017-03-21
sergei-prokofiev	Sergei Prokofiev	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/sergei-prokofiev.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/sergei-prokofiev-thumb.png	2017-03-23
\.


--
-- TOC entry 3175 (class 0 OID 1890501)
-- Dependencies: 197
--

COPY links (musician_id, website, facebook, twitter, patreon, instagram, bandcamp, youtube, amazon, apple, youtube_video) FROM stdin;
within-temptation	https://www.within-temptation.com/	https://www.facebook.com/wtofficial	https://twitter.com/WTofficial	\N	https://www.instagram.com/wtofficial/	\N	https://www.youtube.com/wtofficial	http://amzn.to/2kEDUkU	\N	\N
sweet-relief-two	\N	\N	\N	\N	\N	\N	\N	http://amzn.to/2kZvC7m	\N	\N
tina-guo	http://tinaguo.com/	https://www.facebook.com/tinaguomusic	https://twitter.com/Tinaguo	https://www.patreon.com/TinaGuo	https://www.instagram.com/tinaguocello/	\N	https://www.youtube.com/user/demix500	http://amzn.to/2l6zV4R	https://geo.itunes.apple.com/us/artist/tina-guo/id307712210?mt=1&app=music&at=1000lucb	\N
alexander-scriabin	\N	\N	\N	\N	\N	\N	https://www.youtube.com/watch?v=xgD8Qq01CxY	http://amzn.to/2ncpRVA	https://geo.itunes.apple.com/us/artist/alexander-scriabin/id316883?mt=1&app=music&at=1000lucb	<iframe width="560" height="315" src="https://www.youtube.com/embed/VK2uTtuI84w" frameborder="0" allowfullscreen></iframe>
beats-antique	https://www.beatsantique.com/	https://www.facebook.com/beatsantique	https://twitter.com/beatsantique	\N	https://www.instagram.com/beatsantique/	https://beatsantique.bandcamp.com/	https://www.youtube.com/channel/UCNvD7-2NpnvLY2YhUZFVmUA	http://amzn.to/2l7pkGy	https://geo.itunes.apple.com/us/artist/beats-antique/id275162219?mt=1&app=music&at=1000lucb	<iframe width="560" height="315" src="https://www.youtube.com/embed/8rvIkyRPXr4" frameborder="0" allowfullscreen></iframe>
emancipator	http://emancipatormusic.com/	https://www.facebook.com/emancipatormusic	https://twitter.com/emanc	\N	https://www.instagram.com/emanc/	https://emancipator.bandcamp.com/	https://www.youtube.com/user/locirecords	http://amzn.to/2kUm5U4	https://geo.itunes.apple.com/us/artist/emancipator/id209711341?mt=1&app=music&at=1000lucb	<iframe width="560" height="315" src="https://www.youtube.com/embed/ir9d4tkpDuU" frameborder="0" allowfullscreen></iframe>
facing-west	http://www.facingwestmusic.com/	https://www.facebook.com/FACINGWESTmusic	https://twitter.com/facingwestmusic	https://www.patreon.com/facingwest	https://www.instagram.com/facingwestmusic/	https://facingwestmusic.bandcamp.com/releases	https://www.youtube.com/channel/UCQJ-a2IzCJ-gwlHvqvOWGhw/featured	http://amzn.to/2keP4BP	https://geo.itunes.apple.com/us/artist/facing-west/id886283194?mt=1&app=music&at=1000lucb	<iframe width="560" height="315" src="https://www.youtube.com/embed/Vixe-q90p_A" frameborder="0" allowfullscreen></iframe>
farewell-angelina	http://www.farewellangelinamusic.com/	https://www.facebook.com/farewellamusic	https://twitter.com/farewellamusic	\N	https://www.instagram.com/farewellamusic/	\N	https://www.youtube.com/channel/UCElchcVu86bhbnXyil5SVWg	http://amzn.to/2m97iVr	https://geo.itunes.apple.com/us/artist/farewell-angelina/id1074592861?mt=1&app=music&at=1000lucb	<iframe width="560" height="315" src="https://www.youtube.com/embed/In5dt36T0wg" frameborder="0" allowfullscreen></iframe>
francesco-libetta	http://www.libetta.it/	\N	\N	\N	\N	\N	\N	http://amzn.to/2ldyQVK	https://geo.itunes.apple.com/us/artist/francesco-libetta/id160337015?mt=1&app=music&at=1000lucb	<iframe width="560" height="315" src="https://www.youtube.com/embed/LuEa1XLEVSw" frameborder="0" allowfullscreen></iframe>
franki-love	http://www.frankilove.com/	https://www.facebook.com/frankilovemusic	https://twitter.com/FrankiLoveMusic	\N	https://www.instagram.com/frankilove/	https://frankilove.bandcamp.com/	https://www.youtube.com/user/frankilovemusic	\N	https://geo.itunes.apple.com/us/artist/franki-love/id625754055?mt=1&app=music&at=1000lucb	<iframe width="560" height="315" src="https://www.youtube.com/embed/jwbgd4jNLTQ" frameborder="0" allowfullscreen></iframe>
frederic-rzewski	\N	\N	\N	\N	\N	\N	\N	http://amzn.to/2kJrYOT	https://geo.itunes.apple.com/us/artist/frederic-rzewski/id50107619?mt=1&app=music&at=1000lucb	<iframe width="560" height="315" src="https://www.youtube.com/embed/uDNy4YuCxdk" frameborder="0" allowfullscreen></iframe>
haris-alexiou	http://www.alexiou.gr/main.asp?lang=en	https://www.facebook.com/HarisAlexiouNet	https://twitter.com/harisalexiounet	\N	\N	\N	https://www.youtube.com/channel/UCqdb8sDCLN7YJ7_3qVWC-IQ	http://amzn.to/2lXcqft	https://geo.itunes.apple.com/us/artist/haris-alexiou/id39701368?mt=1&app=music&at=1000lucb	<iframe width="560" height="315" src="https://www.youtube.com/embed/ko9VLeqI9no?list=PLA8nNfOw_VJUsNxsxiiMut52YCV_0T8ks" frameborder="0" allowfullscreen></iframe>
larkin-poe	http://www.larkinpoe.com/	https://www.facebook.com/larkinpoe	https://twitter.com/LarkinPoe	\N	https://www.instagram.com/larkinpoe/	\N	https://www.youtube.com/channel/UCNQmL7NKsaQ8UxFpaSqimNw	http://amzn.to/2ngXhCq	https://geo.itunes.apple.com/us/artist/larkin-poe/id360929055?mt=1&app=music&at=1000lucb	<iframe width="560" height="315" src="https://www.youtube.com/embed/4tRX3UVCBCo" frameborder="0" allowfullscreen></iframe>
leopold-godowski	http://www.godowsky.com/	\N	\N	\N	\N	\N	\N	http://amzn.to/2n9Btv6	https://geo.itunes.apple.com/us/artist/leopold-godowski/id308277903?mt=1&app=music&at=1000lucb	<iframe width="560" height="315" src="https://www.youtube.com/embed/COohl5ZtcVE" frameborder="0" allowfullscreen></iframe>
maurice-ravel	\N	\N	\N	\N	\N	\N	\N	http://amzn.to/2mknKmG	https://geo.itunes.apple.com/us/artist/maurice-ravel/id11636?mt=1&app=music&at=1000lucb	<iframe width="560" height="315" src="https://www.youtube.com/embed/X0LBezQGLNo" frameborder="0" allowfullscreen></iframe>
sergei-prokofiev	\N	\N	\N	\N	\N	\N	\N	http://amzn.to/2mSIdtY	https://geo.itunes.apple.com/us/artist/sergei-prokofiev/id263666?mt=1&app=music&at=1000lucb	<iframe width="560" height="315" src="https://www.youtube.com/embed/DUmq1cpcglQ" frameborder="0" allowfullscreen></iframe>
susie-suh	http://www.susiesuh.com/	https://www.facebook.com/susiesuh	https://twitter.com/SusieSuh	\N	https://www.instagram.com/susiesuh/	\N	https://www.youtube.com/channel/UC_bB1v1m5qS4ChAiVKj0gYA	http://amzn.to/2ksrHjb	https://geo.itunes.apple.com/us/artist/susie-suh/id45445812?mt=1&app=music&at=1000lucb	<iframe width="560" height="315" src="https://www.youtube.com/embed/H1XC1oP6Pew" frameborder="0" allowfullscreen></iframe>
the-six-parts-seven	\N	https://www.facebook.com/The-Six-Parts-Seven-36673045730/	\N	\N	\N	https://thesixpartsseven.bandcamp.com/	https://www.youtube.com/channel/UCUDgSBGio-u4RmFDo2JDhyw	http://amzn.to/2kw5VLE	https://geo.itunes.apple.com/us/artist/the-six-parts-seven/id13742819?mt=1&app=music&at=1000lucb	<iframe width="560" height="315" src="https://www.youtube.com/embed/P-PW4xFfCkk" frameborder="0" allowfullscreen></iframe>
unkle	http://www.unkle.com/	https://www.facebook.com/unkle	https://twitter.com/unkleofficial	\N	\N	\N	https://www.youtube.com/user/UNKLEofficial	http://amzn.to/2lHm6KL	\N	<iframe width="560" height="315" src="https://www.youtube.com/embed/xf__WD2e0dM" frameborder="0" allowfullscreen></iframe>
zoe-johnston	\N	https://www.facebook.com/officialzoejohnston	\N	\N	\N	\N	\N	http://amzn.to/2miN2gE	\N	<iframe width="560" height="315" src="https://www.youtube.com/embed/SthlDp6a8nA" frameborder="0" allowfullscreen></iframe>
lili-roquelin	http://www.liliroquelin.com/	https://www.facebook.com/liliroquelinmusic/	https://twitter.com/liliroquelin	\N	\N	\N	https://www.youtube.com/user/liliroquelin	http://amzn.to/2kZkyYC	https://geo.itunes.apple.com/us/artist/lili-roquelin/id291774403?mt=1&app=music&at=1000lucb	<iframe width="560" height="315" src="https://www.youtube.com/embed/c5gsImk_qm8" frameborder="0" allowfullscreen></iframe>
sleep	http://www.weedian.com/index.html	https://www.facebook.com/officialsleep/	https://twitter.com/sleep_official?lang=en	\N	\N	\N	\N	http://amzn.to/2kMsqgg	https://geo.itunes.apple.com/us/artist/sleep/id2930043?mt=1&app=music&at=1000lucb	<iframe width="560" height="315" src="https://www.youtube.com/embed/hIw7oeZKpZc" frameborder="0" allowfullscreen></iframe>
the-reverend-horton-heat	http://www.reverendhortonheat.com/	https://www.facebook.com/reverendhortonheat	https://twitter.com/revhortonheat	\N	\N	\N	https://www.youtube.com/user/OfficialRHH	http://amzn.to/2l4VR17	https://geo.itunes.apple.com/us/artist/the-reverend-horton-heat/id105453?mt=1&app=music&at=1000lucb	<iframe width="560" height="315" src="https://www.youtube.com/embed/rx6kib_hjcA" frameborder="0" allowfullscreen></iframe>
\.


--
-- TOC entry 3172 (class 0 OID 1890470)
-- Dependencies: 194
--

COPY reviews (musician_id, review) FROM stdin;
facing-west	<p>This sister duet creates music that fuses elements of pop and country, creating a sophisticated blend of guitar and harmonized\n  vocals. Their most recent song, "Lifeline", shows the amount of hard work they put into creating interesting music and videos.</p>\n\n<p>Facing West also does cover songs, but in my opinion, their original work eclipses their covers, and I look forward to\nhearing what they come up with in the future.</p>
beats-antique	<p>Fans of Beats Antique love to tell you about the band's amazing stage theatrics, long jam sessions, and pure fun you will have at their show by saying "just wait. You'll love it."</p>\n\n</p>Their stage show doesn't take away from their music, which fuses electronic with arabian music, melding tradition with the new to create a style that is all their own. Beats Antique is prolific, and I've only linked to three of their more recent albums. Exploring their music further is worth\nthe journey.</p>
haris-alexiou	<p>When I left my hometown, music was a way to remember my friends, and as a going away gift, they all gave me tapes of unusual music they liked.\n  Some of it is impossible to find on the internet today. My neighbor, a Greek guy, gave me several tapes of Haris Alexiou. I kept all of them\nfor years</p>\n\n<p>I can't understand a word of Greek, but in so many ways, this giving, and this celebration of the small gifts and important friendships in life\n  is what I hear when I listen\n  to Haris Alexiou and her beautiful voice. She is raw, powerful, yet so incredibly on point that there is no mistaking why she is so popular\n  in her home country.</p>
within-temptation	<p>Within Temptation is a symphonic rock band that has evolved varied sounds and complexity from album to album. Despite this\n  evolution, they have always been unmistakably Within Temptation. The band has always been on point: every Album stands alone, and each album would arguably be the best albums in any band's discography.</p>\n\n<p>Fronted by the dynamic and eclectic Sharon den Adel, the band creates challenging and downright beautiful music. From melodic,\n  contemplative, hard-pounding, to uplifting, Within Temptation easily mixes styles\n  to create larger-than-life music.</p>\n
susie-suh	<p>Susie Suh may not be the most prolific musician, but what she does put out is well worth the wait; everything she creates is outright beautiful.</p>\n\n<p>I originally saw her perform live years ago. She brought down the house, and I have been a fan ever since.</p>
the-six-parts-seven	<p>You may not have ever heard of the The Six Parts Seven, but if you ever listened to NPR, you may have heard their music between show sections. The Six Parts Seven is special in that way: just about everyone who I've shown their music to has said it was good music. I've been a fan of their work since the 1990s, and they've never failed to dissapoint, either on album or at a live show.</p>\n\n<p>The music defies simple categorization. The band doesn't use chords so much as a limn of cadences and flowing notes -- it is a unique kind of music, and every listen flows into further discoveries.</p>
sleep	<p>What could I possibly write about Sleep that hasn't been written already? This heavy metal band from San Jose, California has won\n  the hearts of critics and fans of heavy metal alike.</p>\n\n<p>Sleep is most well-known for their 63 minute epic "Dopesmoker," which has a fascinating background story that displays, possibly more\n  than any other song in history, the disconnect between what is considered "art" and "product." This song, despite it's age at the time of it's\n  official release, has stood the test of time, entrancing anyone who dares to take the hour long journey through it's seemless time shifts,\ndropped C tuning, and mesmorizing cadence.</p>
frederic-rzewski	<p>Rzewski (pronounced zheff-skee) is an America pianist / composer who has a knack for pushing the boundaries of what music is without\n  being inaccessible to those who aren't familiar with what a lot of 20th century composers were attempting to do.</p>\n\n<p> Much of Rzewski's music focuses on the themes of socio-economics, perhaps most pronounced in "Winnsboro Cotton Mill Blues," which attempts to\n  emulate the monotonous and soulless sounds of a cotton mill. The Grammy-winning "The People United Will Never Be Defeated" is 36 variations\n  on the Chilean song "¡El pueblo unido jamás será vencido!," a song that was originally sung during the overthrow of Chilean government of\n Salvador Allende.</p>\n
lili-roquelin	<p>The versitile and ecclectic LiLi Roquelin has spanned many genres, from rock (it truly does rock), to electronica, to singer / songwriter. Her\n  music straddles the world between familiar to the unfamiliar, perhaps a result of her slightly accented singing and use of unusual modes and keys.\n</p>\n\n<p>Her recent music mixes her varied background and tastes into songs that sometimes connotes Ravel and classic Jazz. Sometimes soft, sometimes\n  loud, her singing is consistently subtle and powerful, never failing to express meaning.</p>\n
unkle	<p>UNKLE makes electronica music that melds genres spanning from electronica, hiphop, rock. The band isn't highly prolific, but their influenc\n  on music, especially electronica music, is apparent with their myriad collaborations with popular artists from all backgrounds..</p>\n\n<p>UNKLE's music, for the uninitiated, is a complex web of instruments and melodies that sounds organic and alive. It is very\n  difficult to describe their sound, and every listen reveals a new thread of music that went unnoticed before, which makes it fun to geek out\n  with... or you can just pump the amp to 11 and rock out, dance out, pick your flavor.</p>
tina-guo	<p>Tina Guo plays the cello, electric cello, and erhu, and composes wonderful music that defies a simple classification. She has played\n  metal, classical, world, film, game scores, played with Dave Grohl, and... well, it is fun to watch someone play such an\necclectic variety of wonderful music.</p>\n\n<p>Her music videos are all epic, displaying her eclectic tastes, intense talent, and mastery of her instrument. Her rendition of the\n  Last of the Mohicans Theme is among my favorite renditions of that piece, and her video for the Pokemon Medley is just downright fun to\n  watch. I look forward to see what surprises this hard-working musician brings next.</p>\n\n<p>Tina now has her own line of cellos, along with bows for violin, viola, and of course, cello, at\n  <a href="http://tinaguostrings.com/">Tina Guo Strings</a></p>
sweet-relief-two	<p>The Sweet Relief musicians fund helps musicians who are in need. They released two albums in the early 1990s, which featured popular musicians\n  covering music written by Victoria Williams and Vic Chesnutt. This review is for the second album, covering the Vic Chesnutt version.</p>\n\n<p>The album is an interesting snapshot of music for the time, here is the full track listing:</p>\n\n<ul>\n    <li>Garbage – "Kick My Ass"</li>\n    <li>R.E.M. – "Sponge"</li>\n    <li>Nanci Griffith with Hootie and the Blowfish – "Gravity of the Situation"</li>\n    <li>Soul Asylum – "When I Ran Off and Left Her"</li>\n    <li>Dog's Eye View – "Dodge"</li>\n    <li>Live – "Supernatural"</li>\n    <li>Smashing Pumpkins with Red Red Meat – "Sad Peter Pan"</li>\n    <li>Sparklehorse – "West of Rome"</li>\n    <li>Joe Henry and Madonna – "Guilty by Association"</li>\n    <li>Kristin Hersh – "Panic Pure"</li>\n    <li>Cracker – "Withering"</li>\n    <li>Indigo Girls – "Free of Hope"</li>\n    <li>Mary Margaret O'Hara – "Florida"</li>\n    <li>Vic Chesnutt and Victoria Williams – "God Is Good"</li>\n</ul>\n\n<p>The songs are relaxing, yet rock. If music is about sharing the human experience, no matter our experiences and background, knowing that\n  this was all written by an unknown quadriplegic musician only adds the beauty and the impact of the songs featured on this album.</p>\n\n<p><a href="https://en.wikipedia.org/wiki/Sweet_Relief_II:_Gravity_of_the_Situation">Wikipedia Article</a></p>
francesco-libetta	<p>Francesco Libetta is a pianist, conductor, and composer from Italy. He isn't as well-known as many other famous pianists, but he is, without\n  a doubt, one of the best. He's one of 3 piansists, aside from Godowsky himself, who has played the entire Studies on Chopin's Études, and he\n  is the only one who has played all of them live.</p>\n\n<p>His playing can be described as cerebral, aristocratic, and playful, and effortless. I find his selections fascinating, as it covers rare pieces\n  from lesser-known composers, such as Ligeti, Saint-Saens, and Alkan. This  repertoire is highly difficult to play, but Libetta makes it all\n  look so easy, and manages to bring out the deeper soul in music that, in lesser hands, would sound vacuous and showy.</p>\n\n<p><a href="https://www.youtube.com/watch?v=NQfolBNJexw">Recital at La Roque d'Anthéron</a> </p>\n
farewell-angelina	<p>The up-and-coming band, Farewell Angelina, is a formation of solo songwriters, Nicole Witt, Andrea Young, Lisa Torres, and Lauren Lucas, taking\n  on the name of an oft-covered Joan Baez song (written by Bob Dylan). The band uses traditional acoustic instruments to offer music that ranges\n  from tongue-in-cheek, heartfelt, and hard-hitting, all offered an an EP with no weak moments.</p>\n\n<p>Through all of the vocal harmonizing, fiddling, and layers of sound steeped in tradition and modernity, Farewell Angelina never misses their\n  mark, creating music that is uplifting, full of momentum, and most of all, downright fun.</p>\n
emancipator	<p>I saw Emancipator play live a few years back and I've been addicted to his flavor of electronic music ever since. Watching his live\n  set, especially with his band, Emancipator Ensemble, is nothing less than a beautiful revelation of what music can be when it is powerful,\n  danceable, and entrancing.</p>\n\n<p>Emancipator mixes electronic sounds with organic sounds, such as bass, guitar, drums, and violin. Each of his albums brings a new\n  experience and sense of exploratory abandon, appearing to take influence from every corner of the earth, mixed into a relaxing\n  groove..</p>\n
the-reverend-horton-heat	<p>I love bands who's influence far outsize their popularity, and one would be hard-pressed to find a band who influenced more bands in\n  more disparate genres than The Reverend Horton Heat. Since 1985, they've turned out 11 studio albums, inspired many,\n  and turned doubters into believers. Their music is under the banner of one religion: having fun.</p>\n\n<p>Their music is worth studying on so many levels. Jim "The Reverend" Heath can play slow, play hard, and hit you with a fast-paced kinetic style.\n  He's highly virtuosic, taking pieces from punk, country, rock, jazz -- you name it, it's probably sitting somewhere in his music. Despite the\n  difficulty of his music, he makes it look so darn easy.</p>\n\n<p>The band tours tirelessly. Just about everyone I know who's seen them live has said it was among the best\nthey've ever seen, and everyone walks away with a story to tell. This magical experience is what music is about.</p>
franki-love	<p>Franki Love is a classically-trained pianist and singer living in Los Angeles and New York.</p>\n\n  <p>She wrote her most recent album, Otias, after her mom passed away. She describes it as an album to help herself and others get\n  through hard times. One may expect the album to melt in sorrow, but it is quite the opposite: it is often uplifting, contemplative, full of\n    life, a product of passionate hard work.</p>\n\n<p>When listening to her work, one gets the sense of someone sitting on the couch, relaxing, and chatting over tea. Her music is deeply personal\n  while being technically and harmonically captivating.</p>
alexander-scriabin	<p>"No one was more famous during their lifetime, and few were more quickly ignored after death." --  Faubion Bowers</p>\n\n<p>Despite being one of the superstars of his\n  generation, and despite his funeral being so overwhelmed that tickets had to be issued, and despite his influence on nearly every pianist\n  since his death, Scriabin is still among the more obscure composers from his era.</p>\n\n<p>His work ranges from his Chopin-style piano Etudes to his later, more atonal and harmonic work, the ladder based on his interpretation of mysticism and a color-coded Circle of Fifths. His work is both beautiful and challenging for both the pianist and the listener, displaying a subtle\ncomplexity that is part virtuosic, part deeply cerebral.</p>\n\n<p><a href="https://en.wikipedia.org/wiki/Alexander_Scriabin">Wikipedia Article</a></p>\n
larkin-poe	<p>Larkin Poe is a sister duo from Atlanta who creates music that is unmistakably southern with a modern rock sound. They've been working\n  since their teens, and have been relentlessly touring and creating music since.</p>\n\n<p>Larkin Poe creates music that, sonically, and emotionally, feel written by musicians well beyond their years. They are articulate and deeply\n  emotional, covering topics ranging from mental illness to the awkward search for realistic love. Most importantly, each sister is an\n  excellent singer, masters of their selection of instruments, and top-notch performers.</p>\n
zoe-johnston	<p>Zeo Johnston is a British singer, songwriter, and artist. Although her\n  solo work is acoustic folk music, she is perhaps most well-known for work with dance\n  producers such as Faithless, Above & Beyond, Delerium, and many more.</p>\n\n<p>She has a truly disctinct and uique voice, uncommonly low-key in dance music,\n  which often features soaring sopranos. I've been a fan of her from the time I first\n  heard her sing on Faithless's "Crazy English Summer," and have been always been pleasantly\n  surprised when something with her singing pops up.</p>\n\n<iframe width="560" height="315" src="https://www.youtube.com/embed/SthlDp6a8nA" frameborder="0" allowfullscreen></iframe>\n\n<iframe width="560" height="315" src="https://www.youtube.com/embed/AecYI3cwDH8" frameborder="0" allowfullscreen></iframe>\n
maurice-ravel	<p>Maurice Ravel is a lesser-known composer, perhaps most famous for his Opera Bolero. Although he was known as a pianist and composer\n  with limited technique, his output is among the most beautiful and technically difficult music ever created. Few pianists are able\n  to tackle his virtuousic pieces.</p>\n\n<p>Although his music is unusual, they are quite accessible to the casual listener, due to the pieces standard tempos and key signatures. In\n  this reviewer's opinion, the " Piano Concerto in D major for the Left Hand," commmissioned by Paul Wittgenstein, is Ravel's best work. The more\nadventurous listener will enjoy hearing Gaspard de la Nuit, widely considered his most difficult work.</p>
leopold-godowski	<p>Leopold Godowski, as suggested by the photo of him hob-nobbing with Einstein, was very popular in his lifetime. He was widely\n  respected by his peers and friends with many popular musicians. Josef Hoffman said Godowski's legato technique was second to none.\nSomewhat a rebel, Godowski was not trained as a child, but rather, and autodidact.</p>\n\n<p>He is best known for his renditions of other composer's piano works. His most well-known collection is the 53 Studies on Chopin's Études,\n  which are transcribed to be played left-handed. The transcriptions are so effectively written that one could easily be\n  tricked into thinking the pianist was playing with two hands. The collection is among the most difficult piano pieces ever written,\n  only recorded once, by Marc-André Hamelin, and performed only once from memory, by Francesco Libetta.</p>\n\n<p>As bright as his star shined during his lifetime, Godowski quickly fell into obscurity, yet his influence lives on through the composers\n  he influenced and the students his taught, leaving an indelible mark on modern pianists and composers.</p>
sergei-prokofiev	<p>If someone was to push me in a corner and choose a "favorite piano composer," I'd likely choose Sergei Prokofiev. His music skates on\n  the edge of dissonence, but doesn't go over the edge, as many of his admirers have done. While most poeple probably don't know Prokofiev\n  by name, they likely heard his music. He is the second most played 20th century composer behind Richard Strauss.</p>\n\n<p>Despite being often played, Prokofiev has one of the more difficult collections of music. In lesser hands, his concertos may sound like\n  music performed for children; it takes a certain sophistication to make his music sound cerebral and sophisticated.</p>
\.


--
-- TOC entry 3170 (class 0 OID 1890443)
-- Dependencies: 192
--

COPY valid_genres (genre) FROM stdin;
pop / country
world
electronic
instrumental
singer / songwriter
metal
rock
classical
foreign
country
trance
\.


SET search_path = public, pg_catalog;

--
-- TOC entry 3185 (class 0 OID 4061937)
-- Dependencies: 210
--

COPY games (gameid, winner, loser) FROM stdin;
1	1	2
2	1	3
3	2	3
\.


--
-- TOC entry 3200 (class 0 OID 0)
-- Dependencies: 209
--

SELECT pg_catalog.setval('games_gameid_seq', 3, true);


--
-- TOC entry 3180 (class 0 OID 3696399)
-- Dependencies: 205
--

COPY mm (musician_id, musician_name, genre, photo_path, thumbnail_path, added_date) FROM stdin;
tina-guo	Tina Guo	instrumental	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/tina-guo.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/tina-guo-thumb.png	2017-02-13
beats-antique	Beats Antique	electronic	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/beats-antique.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/beats-antique-thumb.png	2017-02-12
facing-west	Facing West	pop / country	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/facing-west.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/facing-west-thumb.png	2017-02-11
susie-suh	Susie Suh	singer / songwriter	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/susie-suh.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/susie-suh-thumb.png	2017-02-14
the-six-parts-seven	The Six Parts Seven	instrumental	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/the-six-parts-seven.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/the-six-parts-seven-thumb.png	2017-02-15
sleep	Sleep	metal	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/sleep.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/sleep-thumb.png	2017-02-16
within-temptation	Within Temptation	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/within-temptation.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/within-temptation-thumb.png	2017-02-17
frederic-rzewski	Frederic Rzewski	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/frederic-rzewski.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/frederic-rzewski-thumb.png	2017-02-18
haris-alexiou	Haris Alexiou	foreign	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/haris-alexiou.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/haris-alexiou-thumb.png	2017-02-19
zoe-johnston	Zoe Johnston	trance	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/zoe-johnston.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/zoe-johnston-thumb.png	2017-03-13
lili-roquelin	LiLi Roquelin	singer / songwriter	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/lili-roquelin.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/lili-roquelin-thumb.png	2017-02-20
unkle	UNKLE	electronic	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/unkle.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/unkle-thumb.png	2017-02-21
sweet-relief-two	Various Artists (Sweet Relief Two)	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/sweet-relief-two.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/sweet-relief-two-thumb.png	2017-02-22
larkin-poe	Larkin Poe	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/larkin-poe.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/larkin-poe-thumb.png	2017-03-09
francesco-libetta	Francesco Libetta	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/francesco-libetta.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/francesco-libetta-thumb.png	2017-02-23
emancipator	Emancipator	electronic	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/emancipator.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/emancipator-thumb.png	2017-02-24
franki-love	Franki Love	singer / songwriter	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/franki-love.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/franki-love-thumb.png	2017-02-25
the-reverend-horton-heat	The Reverend Horton Heat	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/the-reverend-horton-heat.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/the-reverend-horton-heat-thumb.png	2017-02-27
farewell-angelina	Farewell Angelina	country	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/farewell-angelina.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/farewell-angelina-thumb.png	2017-02-28
alexander-scriabin	Alexander Scriabin	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/alexander-scriabin.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/alexander-scriabin-thumb.png	2017-03-08
maurice-ravel	Maurice Ravel	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/maurice-ravel.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/maurice-ravel-thumb.png	2017-03-20
leopold-godowski	Leopold Godowski	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/leopold-godowski.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/leopold-godowski-thumb.png	2017-03-21
sergei-prokofiev	Sergei Prokofiev	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/sergei-prokofiev.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/sergei-prokofiev-thumb.png	2017-03-23
tina-guo	Tina Guo	instrumental	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/tina-guo.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/tina-guo-thumb.png	2017-02-13
beats-antique	Beats Antique	electronic	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/beats-antique.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/beats-antique-thumb.png	2017-02-12
facing-west	Facing West	pop / country	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/facing-west.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/facing-west-thumb.png	2017-02-11
susie-suh	Susie Suh	singer / songwriter	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/susie-suh.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/susie-suh-thumb.png	2017-02-14
the-six-parts-seven	The Six Parts Seven	instrumental	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/the-six-parts-seven.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/the-six-parts-seven-thumb.png	2017-02-15
sleep	Sleep	metal	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/sleep.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/sleep-thumb.png	2017-02-16
within-temptation	Within Temptation	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/within-temptation.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/within-temptation-thumb.png	2017-02-17
frederic-rzewski	Frederic Rzewski	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/frederic-rzewski.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/frederic-rzewski-thumb.png	2017-02-18
haris-alexiou	Haris Alexiou	foreign	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/haris-alexiou.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/haris-alexiou-thumb.png	2017-02-19
zoe-johnston	Zoe Johnston	trance	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/zoe-johnston.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/zoe-johnston-thumb.png	2017-03-13
lili-roquelin	LiLi Roquelin	singer / songwriter	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/lili-roquelin.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/lili-roquelin-thumb.png	2017-02-20
unkle	UNKLE	electronic	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/unkle.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/unkle-thumb.png	2017-02-21
sweet-relief-two	Various Artists (Sweet Relief Two)	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/sweet-relief-two.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/sweet-relief-two-thumb.png	2017-02-22
larkin-poe	Larkin Poe	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/larkin-poe.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/larkin-poe-thumb.png	2017-03-09
francesco-libetta	Francesco Libetta	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/francesco-libetta.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/francesco-libetta-thumb.png	2017-02-23
emancipator	Emancipator	electronic	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/emancipator.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/emancipator-thumb.png	2017-02-24
franki-love	Franki Love	singer / songwriter	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/franki-love.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/franki-love-thumb.png	2017-02-25
the-reverend-horton-heat	The Reverend Horton Heat	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/the-reverend-horton-heat.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/the-reverend-horton-heat-thumb.png	2017-02-27
farewell-angelina	Farewell Angelina	country	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/farewell-angelina.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/farewell-angelina-thumb.png	2017-02-28
alexander-scriabin	Alexander Scriabin	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/alexander-scriabin.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/alexander-scriabin-thumb.png	2017-03-08
maurice-ravel	Maurice Ravel	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/maurice-ravel.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/maurice-ravel-thumb.png	2017-03-20
leopold-godowski	Leopold Godowski	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/leopold-godowski.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/leopold-godowski-thumb.png	2017-03-21
sergei-prokofiev	Sergei Prokofiev	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/sergei-prokofiev.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/sergei-prokofiev-thumb.png	2017-03-23
tina-guo	Tina Guo	instrumental	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/tina-guo.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/tina-guo-thumb.png	2017-02-13
beats-antique	Beats Antique	electronic	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/beats-antique.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/beats-antique-thumb.png	2017-02-12
facing-west	Facing West	pop / country	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/facing-west.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/facing-west-thumb.png	2017-02-11
susie-suh	Susie Suh	singer / songwriter	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/susie-suh.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/susie-suh-thumb.png	2017-02-14
the-six-parts-seven	The Six Parts Seven	instrumental	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/the-six-parts-seven.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/the-six-parts-seven-thumb.png	2017-02-15
sleep	Sleep	metal	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/sleep.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/sleep-thumb.png	2017-02-16
within-temptation	Within Temptation	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/within-temptation.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/within-temptation-thumb.png	2017-02-17
frederic-rzewski	Frederic Rzewski	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/frederic-rzewski.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/frederic-rzewski-thumb.png	2017-02-18
haris-alexiou	Haris Alexiou	foreign	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/haris-alexiou.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/haris-alexiou-thumb.png	2017-02-19
zoe-johnston	Zoe Johnston	trance	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/zoe-johnston.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/zoe-johnston-thumb.png	2017-03-13
lili-roquelin	LiLi Roquelin	singer / songwriter	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/lili-roquelin.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/lili-roquelin-thumb.png	2017-02-20
unkle	UNKLE	electronic	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/unkle.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/unkle-thumb.png	2017-02-21
sweet-relief-two	Various Artists (Sweet Relief Two)	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/sweet-relief-two.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/sweet-relief-two-thumb.png	2017-02-22
larkin-poe	Larkin Poe	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/larkin-poe.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/larkin-poe-thumb.png	2017-03-09
francesco-libetta	Francesco Libetta	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/francesco-libetta.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/francesco-libetta-thumb.png	2017-02-23
emancipator	Emancipator	electronic	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/emancipator.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/emancipator-thumb.png	2017-02-24
franki-love	Franki Love	singer / songwriter	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/franki-love.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/franki-love-thumb.png	2017-02-25
facing-west	Facing West	pop / country	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/facing-west.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/facing-west-thumb.png	2017-02-11
the-reverend-horton-heat	The Reverend Horton Heat	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/the-reverend-horton-heat.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/the-reverend-horton-heat-thumb.png	2017-02-27
farewell-angelina	Farewell Angelina	country	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/farewell-angelina.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/farewell-angelina-thumb.png	2017-02-28
alexander-scriabin	Alexander Scriabin	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/alexander-scriabin.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/alexander-scriabin-thumb.png	2017-03-08
maurice-ravel	Maurice Ravel	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/maurice-ravel.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/maurice-ravel-thumb.png	2017-03-20
leopold-godowski	Leopold Godowski	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/leopold-godowski.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/leopold-godowski-thumb.png	2017-03-21
sergei-prokofiev	Sergei Prokofiev	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/sergei-prokofiev.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/sergei-prokofiev-thumb.png	2017-03-23
tina-guo	Tina Guo	instrumental	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/tina-guo.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/tina-guo-thumb.png	2017-02-13
beats-antique	Beats Antique	electronic	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/beats-antique.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/beats-antique-thumb.png	2017-02-12
facing-west	Facing West	pop / country	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/facing-west.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/facing-west-thumb.png	2017-02-11
susie-suh	Susie Suh	singer / songwriter	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/susie-suh.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/susie-suh-thumb.png	2017-02-14
the-six-parts-seven	The Six Parts Seven	instrumental	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/the-six-parts-seven.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/the-six-parts-seven-thumb.png	2017-02-15
sleep	Sleep	metal	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/sleep.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/sleep-thumb.png	2017-02-16
within-temptation	Within Temptation	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/within-temptation.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/within-temptation-thumb.png	2017-02-17
frederic-rzewski	Frederic Rzewski	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/frederic-rzewski.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/frederic-rzewski-thumb.png	2017-02-18
haris-alexiou	Haris Alexiou	foreign	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/haris-alexiou.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/haris-alexiou-thumb.png	2017-02-19
zoe-johnston	Zoe Johnston	trance	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/zoe-johnston.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/zoe-johnston-thumb.png	2017-03-13
lili-roquelin	LiLi Roquelin	singer / songwriter	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/lili-roquelin.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/lili-roquelin-thumb.png	2017-02-20
unkle	UNKLE	electronic	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/unkle.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/unkle-thumb.png	2017-02-21
sweet-relief-two	Various Artists (Sweet Relief Two)	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/sweet-relief-two.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/sweet-relief-two-thumb.png	2017-02-22
larkin-poe	Larkin Poe	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/larkin-poe.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/larkin-poe-thumb.png	2017-03-09
francesco-libetta	Francesco Libetta	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/francesco-libetta.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/francesco-libetta-thumb.png	2017-02-23
emancipator	Emancipator	electronic	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/emancipator.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/emancipator-thumb.png	2017-02-24
franki-love	Franki Love	singer / songwriter	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/franki-love.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/franki-love-thumb.png	2017-02-25
the-reverend-horton-heat	The Reverend Horton Heat	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/the-reverend-horton-heat.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/the-reverend-horton-heat-thumb.png	2017-02-27
farewell-angelina	Farewell Angelina	country	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/farewell-angelina.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/farewell-angelina-thumb.png	2017-02-28
alexander-scriabin	Alexander Scriabin	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/alexander-scriabin.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/alexander-scriabin-thumb.png	2017-03-08
maurice-ravel	Maurice Ravel	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/maurice-ravel.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/maurice-ravel-thumb.png	2017-03-20
leopold-godowski	Leopold Godowski	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/leopold-godowski.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/leopold-godowski-thumb.png	2017-03-21
sergei-prokofiev	Sergei Prokofiev	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/sergei-prokofiev.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/sergei-prokofiev-thumb.png	2017-03-23
tina-guo	Tina Guo	instrumental	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/tina-guo.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/tina-guo-thumb.png	2017-02-13
beats-antique	Beats Antique	electronic	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/beats-antique.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/beats-antique-thumb.png	2017-02-12
susie-suh	Susie Suh	singer / songwriter	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/susie-suh.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/susie-suh-thumb.png	2017-02-14
the-six-parts-seven	The Six Parts Seven	instrumental	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/the-six-parts-seven.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/the-six-parts-seven-thumb.png	2017-02-15
sleep	Sleep	metal	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/sleep.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/sleep-thumb.png	2017-02-16
within-temptation	Within Temptation	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/within-temptation.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/within-temptation-thumb.png	2017-02-17
frederic-rzewski	Frederic Rzewski	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/frederic-rzewski.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/frederic-rzewski-thumb.png	2017-02-18
haris-alexiou	Haris Alexiou	foreign	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/haris-alexiou.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/haris-alexiou-thumb.png	2017-02-19
zoe-johnston	Zoe Johnston	trance	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/zoe-johnston.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/zoe-johnston-thumb.png	2017-03-13
lili-roquelin	LiLi Roquelin	singer / songwriter	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/lili-roquelin.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/lili-roquelin-thumb.png	2017-02-20
unkle	UNKLE	electronic	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/unkle.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/unkle-thumb.png	2017-02-21
sweet-relief-two	Various Artists (Sweet Relief Two)	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/sweet-relief-two.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/sweet-relief-two-thumb.png	2017-02-22
larkin-poe	Larkin Poe	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/larkin-poe.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/larkin-poe-thumb.png	2017-03-09
francesco-libetta	Francesco Libetta	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/francesco-libetta.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/francesco-libetta-thumb.png	2017-02-23
emancipator	Emancipator	electronic	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/emancipator.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/emancipator-thumb.png	2017-02-24
franki-love	Franki Love	singer / songwriter	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/franki-love.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/franki-love-thumb.png	2017-02-25
the-reverend-horton-heat	The Reverend Horton Heat	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/the-reverend-horton-heat.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/the-reverend-horton-heat-thumb.png	2017-02-27
farewell-angelina	Farewell Angelina	country	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/farewell-angelina.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/farewell-angelina-thumb.png	2017-02-28
alexander-scriabin	Alexander Scriabin	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/alexander-scriabin.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/alexander-scriabin-thumb.png	2017-03-08
maurice-ravel	Maurice Ravel	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/maurice-ravel.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/maurice-ravel-thumb.png	2017-03-20
leopold-godowski	Leopold Godowski	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/leopold-godowski.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/leopold-godowski-thumb.png	2017-03-21
sergei-prokofiev	Sergei Prokofiev	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/sergei-prokofiev.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/sergei-prokofiev-thumb.png	2017-03-23
tina-guo	Tina Guo	instrumental	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/tina-guo.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/tina-guo-thumb.png	2017-02-13
beats-antique	Beats Antique	electronic	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/beats-antique.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/beats-antique-thumb.png	2017-02-12
facing-west	Facing West	pop / country	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/facing-west.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/facing-west-thumb.png	2017-02-11
susie-suh	Susie Suh	singer / songwriter	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/susie-suh.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/susie-suh-thumb.png	2017-02-14
the-six-parts-seven	The Six Parts Seven	instrumental	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/the-six-parts-seven.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/the-six-parts-seven-thumb.png	2017-02-15
sleep	Sleep	metal	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/sleep.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/sleep-thumb.png	2017-02-16
within-temptation	Within Temptation	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/within-temptation.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/within-temptation-thumb.png	2017-02-17
frederic-rzewski	Frederic Rzewski	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/frederic-rzewski.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/frederic-rzewski-thumb.png	2017-02-18
haris-alexiou	Haris Alexiou	foreign	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/haris-alexiou.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/haris-alexiou-thumb.png	2017-02-19
zoe-johnston	Zoe Johnston	trance	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/zoe-johnston.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/zoe-johnston-thumb.png	2017-03-13
lili-roquelin	LiLi Roquelin	singer / songwriter	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/lili-roquelin.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/lili-roquelin-thumb.png	2017-02-20
unkle	UNKLE	electronic	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/unkle.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/unkle-thumb.png	2017-02-21
sweet-relief-two	Various Artists (Sweet Relief Two)	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/sweet-relief-two.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/sweet-relief-two-thumb.png	2017-02-22
larkin-poe	Larkin Poe	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/larkin-poe.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/larkin-poe-thumb.png	2017-03-09
francesco-libetta	Francesco Libetta	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/francesco-libetta.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/francesco-libetta-thumb.png	2017-02-23
emancipator	Emancipator	electronic	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/emancipator.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/emancipator-thumb.png	2017-02-24
franki-love	Franki Love	singer / songwriter	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/franki-love.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/franki-love-thumb.png	2017-02-25
the-reverend-horton-heat	The Reverend Horton Heat	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/the-reverend-horton-heat.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/the-reverend-horton-heat-thumb.png	2017-02-27
farewell-angelina	Farewell Angelina	country	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/farewell-angelina.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/farewell-angelina-thumb.png	2017-02-28
alexander-scriabin	Alexander Scriabin	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/alexander-scriabin.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/alexander-scriabin-thumb.png	2017-03-08
maurice-ravel	Maurice Ravel	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/maurice-ravel.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/maurice-ravel-thumb.png	2017-03-20
leopold-godowski	Leopold Godowski	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/leopold-godowski.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/leopold-godowski-thumb.png	2017-03-21
sergei-prokofiev	Sergei Prokofiev	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/sergei-prokofiev.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/sergei-prokofiev-thumb.png	2017-03-23
tina-guo	Tina Guo	instrumental	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/tina-guo.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/tina-guo-thumb.png	2017-02-13
beats-antique	Beats Antique	electronic	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/beats-antique.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/beats-antique-thumb.png	2017-02-12
facing-west	Facing West	pop / country	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/facing-west.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/facing-west-thumb.png	2017-02-11
susie-suh	Susie Suh	singer / songwriter	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/susie-suh.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/susie-suh-thumb.png	2017-02-14
the-six-parts-seven	The Six Parts Seven	instrumental	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/the-six-parts-seven.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/the-six-parts-seven-thumb.png	2017-02-15
sleep	Sleep	metal	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/sleep.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/sleep-thumb.png	2017-02-16
within-temptation	Within Temptation	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/within-temptation.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/within-temptation-thumb.png	2017-02-17
frederic-rzewski	Frederic Rzewski	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/frederic-rzewski.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/frederic-rzewski-thumb.png	2017-02-18
haris-alexiou	Haris Alexiou	foreign	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/haris-alexiou.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/haris-alexiou-thumb.png	2017-02-19
zoe-johnston	Zoe Johnston	trance	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/zoe-johnston.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/zoe-johnston-thumb.png	2017-03-13
lili-roquelin	LiLi Roquelin	singer / songwriter	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/lili-roquelin.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/lili-roquelin-thumb.png	2017-02-20
unkle	UNKLE	electronic	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/unkle.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/unkle-thumb.png	2017-02-21
sweet-relief-two	Various Artists (Sweet Relief Two)	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/sweet-relief-two.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/sweet-relief-two-thumb.png	2017-02-22
larkin-poe	Larkin Poe	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/larkin-poe.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/larkin-poe-thumb.png	2017-03-09
francesco-libetta	Francesco Libetta	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/francesco-libetta.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/francesco-libetta-thumb.png	2017-02-23
emancipator	Emancipator	electronic	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/emancipator.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/emancipator-thumb.png	2017-02-24
franki-love	Franki Love	singer / songwriter	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/franki-love.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/franki-love-thumb.png	2017-02-25
the-reverend-horton-heat	The Reverend Horton Heat	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/the-reverend-horton-heat.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/the-reverend-horton-heat-thumb.png	2017-02-27
farewell-angelina	Farewell Angelina	country	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/farewell-angelina.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/farewell-angelina-thumb.png	2017-02-28
alexander-scriabin	Alexander Scriabin	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/alexander-scriabin.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/alexander-scriabin-thumb.png	2017-03-08
maurice-ravel	Maurice Ravel	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/maurice-ravel.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/maurice-ravel-thumb.png	2017-03-20
leopold-godowski	Leopold Godowski	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/leopold-godowski.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/leopold-godowski-thumb.png	2017-03-21
sergei-prokofiev	Sergei Prokofiev	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/sergei-prokofiev.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/sergei-prokofiev-thumb.png	2017-03-23
tina-guo	Tina Guo	instrumental	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/tina-guo.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/tina-guo-thumb.png	2017-02-13
beats-antique	Beats Antique	electronic	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/beats-antique.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/beats-antique-thumb.png	2017-02-12
facing-west	Facing West	pop / country	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/facing-west.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/facing-west-thumb.png	2017-02-11
susie-suh	Susie Suh	singer / songwriter	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/susie-suh.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/susie-suh-thumb.png	2017-02-14
the-six-parts-seven	The Six Parts Seven	instrumental	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/the-six-parts-seven.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/the-six-parts-seven-thumb.png	2017-02-15
sleep	Sleep	metal	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/sleep.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/sleep-thumb.png	2017-02-16
within-temptation	Within Temptation	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/within-temptation.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/within-temptation-thumb.png	2017-02-17
frederic-rzewski	Frederic Rzewski	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/frederic-rzewski.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/frederic-rzewski-thumb.png	2017-02-18
haris-alexiou	Haris Alexiou	foreign	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/haris-alexiou.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/haris-alexiou-thumb.png	2017-02-19
zoe-johnston	Zoe Johnston	trance	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/zoe-johnston.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/zoe-johnston-thumb.png	2017-03-13
lili-roquelin	LiLi Roquelin	singer / songwriter	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/lili-roquelin.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/lili-roquelin-thumb.png	2017-02-20
unkle	UNKLE	electronic	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/unkle.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/unkle-thumb.png	2017-02-21
sweet-relief-two	Various Artists (Sweet Relief Two)	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/sweet-relief-two.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/sweet-relief-two-thumb.png	2017-02-22
larkin-poe	Larkin Poe	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/larkin-poe.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/larkin-poe-thumb.png	2017-03-09
francesco-libetta	Francesco Libetta	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/francesco-libetta.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/francesco-libetta-thumb.png	2017-02-23
emancipator	Emancipator	electronic	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/emancipator.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/emancipator-thumb.png	2017-02-24
franki-love	Franki Love	singer / songwriter	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/franki-love.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/franki-love-thumb.png	2017-02-25
the-reverend-horton-heat	The Reverend Horton Heat	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/the-reverend-horton-heat.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/the-reverend-horton-heat-thumb.png	2017-02-27
farewell-angelina	Farewell Angelina	country	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/farewell-angelina.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/farewell-angelina-thumb.png	2017-02-28
alexander-scriabin	Alexander Scriabin	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/alexander-scriabin.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/alexander-scriabin-thumb.png	2017-03-08
maurice-ravel	Maurice Ravel	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/maurice-ravel.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/maurice-ravel-thumb.png	2017-03-20
leopold-godowski	Leopold Godowski	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/leopold-godowski.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/leopold-godowski-thumb.png	2017-03-21
sergei-prokofiev	Sergei Prokofiev	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/sergei-prokofiev.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/sergei-prokofiev-thumb.png	2017-03-23
tina-guo	Tina Guo	instrumental	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/tina-guo.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/tina-guo-thumb.png	2017-02-13
beats-antique	Beats Antique	electronic	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/beats-antique.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/beats-antique-thumb.png	2017-02-12
facing-west	Facing West	pop / country	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/facing-west.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/facing-west-thumb.png	2017-02-11
susie-suh	Susie Suh	singer / songwriter	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/susie-suh.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/susie-suh-thumb.png	2017-02-14
the-six-parts-seven	The Six Parts Seven	instrumental	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/the-six-parts-seven.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/the-six-parts-seven-thumb.png	2017-02-15
sleep	Sleep	metal	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/sleep.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/sleep-thumb.png	2017-02-16
within-temptation	Within Temptation	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/within-temptation.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/within-temptation-thumb.png	2017-02-17
frederic-rzewski	Frederic Rzewski	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/frederic-rzewski.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/frederic-rzewski-thumb.png	2017-02-18
haris-alexiou	Haris Alexiou	foreign	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/haris-alexiou.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/haris-alexiou-thumb.png	2017-02-19
zoe-johnston	Zoe Johnston	trance	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/zoe-johnston.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/zoe-johnston-thumb.png	2017-03-13
lili-roquelin	LiLi Roquelin	singer / songwriter	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/lili-roquelin.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/lili-roquelin-thumb.png	2017-02-20
unkle	UNKLE	electronic	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/unkle.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/unkle-thumb.png	2017-02-21
sweet-relief-two	Various Artists (Sweet Relief Two)	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/sweet-relief-two.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/sweet-relief-two-thumb.png	2017-02-22
larkin-poe	Larkin Poe	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/larkin-poe.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/larkin-poe-thumb.png	2017-03-09
francesco-libetta	Francesco Libetta	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/francesco-libetta.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/francesco-libetta-thumb.png	2017-02-23
emancipator	Emancipator	electronic	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/emancipator.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/emancipator-thumb.png	2017-02-24
franki-love	Franki Love	singer / songwriter	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/franki-love.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/franki-love-thumb.png	2017-02-25
the-reverend-horton-heat	The Reverend Horton Heat	rock	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/the-reverend-horton-heat.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/the-reverend-horton-heat-thumb.png	2017-02-27
farewell-angelina	Farewell Angelina	country	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/farewell-angelina.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/farewell-angelina-thumb.png	2017-02-28
alexander-scriabin	Alexander Scriabin	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/alexander-scriabin.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/alexander-scriabin-thumb.png	2017-03-08
maurice-ravel	Maurice Ravel	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/maurice-ravel.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/maurice-ravel-thumb.png	2017-03-20
leopold-godowski	Leopold Godowski	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/leopold-godowski.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/leopold-godowski-thumb.png	2017-03-21
sergei-prokofiev	Sergei Prokofiev	classical	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/large/sergei-prokofiev.png	https://s3-us-west-1.amazonaws.com/butternotes/img/musician/thumbnails/sergei-prokofiev-thumb.png	2017-03-23
\.


--
-- TOC entry 3183 (class 0 OID 4061926)
-- Dependencies: 208
--

COPY players (pid, pname) FROM stdin;
1	a
2	b
3	c
\.


--
-- TOC entry 3201 (class 0 OID 0)
-- Dependencies: 207
--

SELECT pg_catalog.setval('players_pid_seq', 3, true);


--
-- TOC entry 3181 (class 0 OID 3856313)
-- Dependencies: 206
--

COPY tt (id, etc) FROM stdin;
1	b
\.


SET search_path = scale_info, pg_catalog;

--
-- TOC entry 3176 (class 0 OID 2192965)
-- Dependencies: 198
--

COPY patterns (scale_type, scale_wh_pattern, scale_fsn_pattern) FROM stdin;
phrygian-scales	H-W-W-W-H-W-W	1, 2&#9837;, 3&#9837;, 4, 5, 6&#9837;, 7&#9837;, 8
prometheus-scales	W-W-W-WH-WH-W	1, 2, 3, 4&#9839; 6, 7&#9837;, 8
tritone-scales	H-WH-W-H-WH-W	1, 2&#9837;, 3, 5&#9837;, 5, 7&#9837;, 8
two-semitone-tritone-scales	H-H-WH-H-WH-WH	1, 3&#9837;, 3, 4&#9839; 5, 6&#9837;, 8
major-scales	W-W-H-W-W-W-H-W	1, 2, 3, 4, 5, 6, 7, 8
ionian-scales	W-W-H-W-W-W-H-W	1, 2, 3, 4, 5, 6, 7, 8
augmented-scales	WH-H-WH-H-WH-H	1, 3&#9837;, 3, 4, 5, 5&#9839; 7, 8
altered-scales	H-W-H-W-W-W-W	1, 2&#9837;, 3&#9837;, 4&#9837;, 5&#9837;, 6&#9837;, 7&#9837;, 8
blues-scales	WH-H-H-H-WH-W	1, 3&#9837;, 4, 5&#9837;, 5, 7&#9837;, 8
dorian-scales	W-H-W-W-W-H-W	1, 2, 3&#9837;, 4, 5, 6, 7&#9837;, 8
double-harmonic-scales	H-WH-H-W-H-WH-H	1, 2&#9837;, 3, 4, 5, 6&#9837;, 7, 8
enigmatic-scales	H-WH-W-W-W-H-H	1, 2&#9837;, 3, 4&#9839; 5&#9839; 6&#9839; 7, 8
flamenco-modes	H-W-W-W-H-W-W	1, 2&#9837;, 3&#9837;, 4, 5, 6&#9837;, 7&#9837;, 8
flamenco-scales	H-W-W-W-H-W-W	1, 2&#9837;, 3&#9837;, 4, 5, 6&#9837;, 7&#9837;, 8
lydian-dominant-scales	W-W-WH-H-W-H-W	1, 2, 3, 4&#9839; 5, 6, 7&#9837;, 8
lydian-flat-seven-scales	W-W-WH-H-W-H-W	1, 2, 3, 4&#9839; 5, 6, 7&#9837;, 8
melodic-minor-scales	\N	ascending: 1, 2, 3&#9837;, 4, 5, 6, 7, 8 <&#9837;r> descending: 8, 7&#9837;, 6&#9837;, 5, 4, 3&#9837;, 2, 1
minor-hexatonic-scales	W-H-W-W-WH-W	1, 2, 3&#9837;, 4, 5, 7&#9837;, 8
minor-pentatonic-scales	WH-W-W-WH-W	1, 3&#9837;, 4, 5, 7&#9837;, 8
neapolitan-major-scales	H-W-W-W-W-W-H	1, 2&#9837;, 3&#9837;, 4, 5, 6, 7, 8
neapolitan-minor-scales	H-W-W-W-H-WH-H	1, 2&#9837;, 3&#9837;, 4, 5, 6&#9837;, 7, 8
overtone-scales	W-W-WH-H-W-H-W	1, 2, 3, 4&#9839; 5, 6, 7&#9837;, 8
persian-scales	H-WH-H-H-W-WH-H	1, 2&#9837;, 3, 4, 5&#9837;, 6&#9837;, 7, 8
whole-tone-scales	W-W-W-W-W-W	1, 2, 3, 4&#9839; 5&#9839; 6&#9839; 7, 8
major-hexatonic-scales	W-W-H-W-W-W-WH	1, 2, 3, 4, 5, 6, 8
acoustic-scales	W-W-WH-H-W-H-W	1, 2, 3, 4&#9839; 5, 6, 7&#9837;, 8
harmonic-major-scales	W-W-H-W-H-WH-H	1, 2, 3, 4, 5&#9837;, 6&#9837;, 7, 8
locrian-sharp-two-scales	W-H-W-H-W-W-W	1, 2, 3&#9837;, 4, 5&#9837;, 6&#9837;, 7&#9837;, 8
lydian-augmented-scales	W-W-W-W-H-W-H	1, 2, 3, 4&#9839; 5&#9839; 6, 7, 8
lydian-modes	W-W-W-H-W-W-H	1, 2, 3, 4&#9839; 5, 6, 7, 8
lydian-scales	W-W-W-H-W-W-H	1, 2, 3, 4&#9839; 5, 6, 7, 8
mixolydian-modes	W-W-H-W-W-H-W	1, 2, 3, 4, 5, 6, 7&#9837;, 8
mixolydian-scales	W-W-H-W-W-H-W	1, 2, 3, 4, 5, 6, 7&#9837;, 8
natural-minor-scales	W-H-W-W-H-W-W	1, 2, 3&#9837;, 4, 5, 6&#9837;, 7&#9837;, 8
phrygian-modes	H-W-W-W-H-W-W	1, 2&#9837;, 3&#9837;, 4, 5, 6&#9837;, 7&#9837;, 8
major-modes	W-W-H-W-W-W-H-W	1, 2, 3, 4, 5, 6, 7, 8
ionian-modes	W-W-H-W-W-W-H-W	1, 2, 3, 4, 5, 6, 7, 8
major-pentatonic-scales	W-W-WH-WW-H	1, 2, 3, 5, 7
aeolian-modes	W-H-W-W-H-W-W	1, 2, 3&#9837;, 4, 5, 6&#9837;, 7&#9837;, 8
aeolian-scales	W-H-W-W-H-W-W	1, 2, 3&#9837;, 4, 5, 6&#9837;, 7&#9837;, 8
dorian-modes	W-H-W-W-W-H-W	1, 2, 3&#9837;, 4, 5, 6, 7&#9837;, 8
half-diminished-scales	W-H-W-H-W-W-W	1, 2, 3&#9837;, 4, 5&#9837;, 6&#9837;, 7&#9837;, 8
harmonic-minor-scales	W-H-W-W-H-WH-H	1, 2, 3&#9837;, 4, 5, 6&#9837;, 7, 8
locrian-modes	H-W-W-H-W-W-W	1, 2&#9837;, 3&#9837;, 4, 5&#9837;, 6&#9837;, 7&#9837;, 8
locrian-scales	H-W-W-H-W-W-W	1, 2&#9837;, 3&#9837;, 4, 5&#9837;, 6&#9837;, 7&#9837;, 8
\.


SET search_path = advertising, pg_catalog;

--
-- TOC entry 3035 (class 2606 OID 2844897)
--

ALTER TABLE ONLY image_ads
    ADD CONSTRAINT ads_ad_image_key UNIQUE (ad_image);


--
-- TOC entry 3037 (class 2606 OID 2844895)
--

ALTER TABLE ONLY image_ads
    ADD CONSTRAINT ads_pkey PRIMARY KEY (ad_link);


--
-- TOC entry 3029 (class 2606 OID 2844807)
--

ALTER TABLE ONLY apple
    ADD CONSTRAINT apple_amazon_affiliate_link_key UNIQUE (apple_affiliate_link);


--
-- TOC entry 3031 (class 2606 OID 2844805)
--

ALTER TABLE ONLY apple
    ADD CONSTRAINT apple_musician_name_key UNIQUE (musician_name);


--
-- TOC entry 3033 (class 2606 OID 2844803)
--

ALTER TABLE ONLY apple
    ADD CONSTRAINT apple_pkey PRIMARY KEY (musician_id);


SET search_path = beta, pg_catalog;

--
-- TOC entry 3043 (class 2606 OID 4151782)
--

ALTER TABLE ONLY betas
    ADD CONSTRAINT betas_pkey PRIMARY KEY (email);


SET search_path = blog, pg_catalog;

--
-- TOC entry 3025 (class 2606 OID 2280267)
--

ALTER TABLE ONLY blogs
    ADD CONSTRAINT blogs_blog_title_key UNIQUE (blog_title);


--
-- TOC entry 3027 (class 2606 OID 2280265)
--

ALTER TABLE ONLY blogs
    ADD CONSTRAINT blogs_pkey PRIMARY KEY (blog_id);


SET search_path = musician, pg_catalog;

--
-- TOC entry 2997 (class 2606 OID 1890495)
--

ALTER TABLE ONLY apple_links
    ADD CONSTRAINT apple_links_link_key UNIQUE (link);


--
-- TOC entry 2999 (class 2606 OID 1890493)
--

ALTER TABLE ONLY apple_links
    ADD CONSTRAINT apple_links_pkey PRIMARY KEY (apple_link_id);


--
-- TOC entry 2987 (class 2606 OID 1890460)
--

ALTER TABLE ONLY info
    ADD CONSTRAINT info_musician_name_key UNIQUE (musician_name);


--
-- TOC entry 2989 (class 2606 OID 1890462)
--

ALTER TABLE ONLY info
    ADD CONSTRAINT info_photo_path_key UNIQUE (photo_path);


--
-- TOC entry 2991 (class 2606 OID 1890458)
--

ALTER TABLE ONLY info
    ADD CONSTRAINT info_pkey PRIMARY KEY (musician_id);


--
-- TOC entry 2993 (class 2606 OID 1890464)
--

ALTER TABLE ONLY info
    ADD CONSTRAINT info_thumbnail_path_key UNIQUE (thumbnail_path);


--
-- TOC entry 3001 (class 2606 OID 1890535)
--

ALTER TABLE ONLY links
    ADD CONSTRAINT links_amazon_key UNIQUE (amazon);


--
-- TOC entry 3003 (class 2606 OID 3250922)
--

ALTER TABLE ONLY links
    ADD CONSTRAINT links_apple_key UNIQUE (apple);


--
-- TOC entry 3005 (class 2606 OID 1890526)
--

ALTER TABLE ONLY links
    ADD CONSTRAINT links_bandcamp_key UNIQUE (bandcamp);


--
-- TOC entry 3007 (class 2606 OID 1890512)
--

ALTER TABLE ONLY links
    ADD CONSTRAINT links_facebook_key UNIQUE (facebook);


--
-- TOC entry 3009 (class 2606 OID 1890520)
--

ALTER TABLE ONLY links
    ADD CONSTRAINT links_instagram_key UNIQUE (instagram);


--
-- TOC entry 3011 (class 2606 OID 1890518)
--

ALTER TABLE ONLY links
    ADD CONSTRAINT links_patreon_key UNIQUE (patreon);


--
-- TOC entry 3013 (class 2606 OID 1890508)
--

ALTER TABLE ONLY links
    ADD CONSTRAINT links_pkey PRIMARY KEY (musician_id);


--
-- TOC entry 3015 (class 2606 OID 1890514)
--

ALTER TABLE ONLY links
    ADD CONSTRAINT links_twitter_key UNIQUE (twitter);


--
-- TOC entry 3017 (class 2606 OID 1890510)
--

ALTER TABLE ONLY links
    ADD CONSTRAINT links_website_key UNIQUE (website);


--
-- TOC entry 3019 (class 2606 OID 1890528)
--

ALTER TABLE ONLY links
    ADD CONSTRAINT links_youtube_key UNIQUE (youtube);


--
-- TOC entry 3021 (class 2606 OID 3250924)
--

ALTER TABLE ONLY links
    ADD CONSTRAINT links_youtube_video_key UNIQUE (youtube_video);


--
-- TOC entry 2995 (class 2606 OID 1890477)
--

ALTER TABLE ONLY reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (musician_id);


--
-- TOC entry 2985 (class 2606 OID 1890450)
--

ALTER TABLE ONLY valid_genres
    ADD CONSTRAINT valid_genres_pkey PRIMARY KEY (genre);


SET search_path = public, pg_catalog;

--
-- TOC entry 3041 (class 2606 OID 4061942)
--

ALTER TABLE ONLY games
    ADD CONSTRAINT games_pkey PRIMARY KEY (gameid);


--
-- TOC entry 3039 (class 2606 OID 4061934)
--

ALTER TABLE ONLY players
    ADD CONSTRAINT players_pkey PRIMARY KEY (pid);


SET search_path = scale_info, pg_catalog;

--
-- TOC entry 3023 (class 2606 OID 2192972)
--

ALTER TABLE ONLY patterns
    ADD CONSTRAINT patterns_pkey PRIMARY KEY (scale_type);


SET search_path = musician, pg_catalog;

--
-- TOC entry 3046 (class 2606 OID 1890496)
--

ALTER TABLE ONLY apple_links
    ADD CONSTRAINT apple_links_musician_id_fkey FOREIGN KEY (musician_id) REFERENCES info(musician_id);


--
-- TOC entry 3044 (class 2606 OID 1890465)
--

ALTER TABLE ONLY info
    ADD CONSTRAINT info_genre_fkey FOREIGN KEY (genre) REFERENCES valid_genres(genre);


--
-- TOC entry 3047 (class 2606 OID 1890529)
--

ALTER TABLE ONLY links
    ADD CONSTRAINT links_musician_id_fkey FOREIGN KEY (musician_id) REFERENCES info(musician_id);


--
-- TOC entry 3045 (class 2606 OID 1890478)
--

ALTER TABLE ONLY reviews
    ADD CONSTRAINT reviews_musician_id_fkey FOREIGN KEY (musician_id) REFERENCES info(musician_id);


SET search_path = public, pg_catalog;

--
-- TOC entry 3049 (class 2606 OID 4061948)
--

ALTER TABLE ONLY games
    ADD CONSTRAINT games_loser_fkey FOREIGN KEY (loser) REFERENCES players(pid);


--
-- TOC entry 3048 (class 2606 OID 4061943)
--

ALTER TABLE ONLY games
    ADD CONSTRAINT games_winner_fkey FOREIGN KEY (winner) REFERENCES players(pid);


--
-- TOC entry 3193 (class 0 OID 0)
-- Dependencies: 3
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO mvhyskgyijqngd;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- TOC entry 3195 (class 0 OID 0)
-- Dependencies: 650
--

GRANT ALL ON LANGUAGE plpgsql TO mvhyskgyijqngd;


-- Completed on 2017-10-08 13:52:42 PDT

--
-- PostgreSQL database dump complete
--

