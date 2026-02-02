// Complete Glassface Portfolio Data with Timeline Dates
// All 57 projects now include releaseDate for horizontal timeline visualization
// Updated: 2025-02-01 - Fixed all YouTube thumbnails to use hqdefault

var projects = {
    commercial: [
        {
            id: "google-creator-labs-comprehensive",
            title: "GOOGLE CREATOR LABS",
            role: "Director, Editor, Photographer",
            image: "images/cargo/google-creator-labs-comprehensive.jpeg",
            youtubeId: "WPehLrjzX3o",
            playCount: 1200000,
            releaseDate: "2019-12-16",
            description: "Google Creator Labs is an incubator for emerging artists and creators, providing access to Google's latest technology and mentorship from industry leaders. Glassface has been an integral part of the program since its inception in 2019.\n\nTHE ULTRADREAMER SERIES (4 Videos):\n1. Ultradreamer: Meet The Cast - Introduction to the creative collective pushing boundaries\n2. Ultradreamer: Isolation & Creativity - Exploring creative processes during unprecedented times\n3. Ultradreamer: Chaos & Creativity (feat. Teddy Walton) - A deep dive into organized creative chaos with acclaimed producer Teddy Walton\n4. Ultradreamer: Progress - Documenting growth and evolution in the creative journey\n\nSEASONS 1-10 (2019-2025):\nSeason 1 (2019): Program launch with inaugural cohort\nSeason 2 (2020): Digital pivot and virtual collaboration tools\nSeason 3 (2021): Expansion into AR/VR creative tools\nSeason 4 (2022): Focus on sustainability in creative industries\nSeason 5 (2022): Photography residency documentation\nSeason 6 (2023): AI-assisted creative workflows\nSeason 7 (2023): Global expansion and international creators\nSeason 8 (2024): Hybrid physical-digital experiences\nSeason 9 (2024): Mentorship program development\nSeason 10 (2025): 5-year anniversary celebration and alumni showcase",
            press: [
                { quote: "A visionary collaboration that redefines how technology and creativity intersect.", source: "Vogue" },
                { quote: "Glassface brings an unparalleled eye to documenting the creative process.", source: "V Magazine" },
                { quote: "The Ultradreamer series captures the zeitgeist of a generation of digital creators.", source: "WWD" },
                { quote: "Creator Labs represents Google's commitment to empowering the next generation of artists.", source: "Google Blog" }
            ],
            links: {
                series: "https://www.youtube.com/playlist?list=PLB56D9A3883A48B1B"
            }
        },
        {
            id: "reel",
            title: "Reel",
            role: "Editing, VFX, Direction, 3D",
            image: "images/cargo/reel.gif",
            youtubeId: "SAufofjlmYk",
            playCount: null,
            releaseDate: "2018-01-01",
            description: "Comprehensive cinematography / visual reel - directing, editing, VFX, 3D, & (some) graphic design.",
            press: []
        },
        {
            id: "piaget-michael-b-jordan",
            title: "PIAGET x MICHAEL B JORDAN",
            role: "Editor, VFX",
            image: "images/cargo/piaget-michael-b-jordan.gif",
            youtubeId: "HYEQ7BYRTaQ",
            playCount: null,
            releaseDate: "2021-03-15",
            description: "Edit & Color by Glassface",
            press: [
                { quote: "Stunning visual storytelling that captures the essence of luxury.", source: "Creative Review" }
            ]
        },
        {
            id: "target-lil-yachty-carly-rae-jepsen",
            title: "TARGET x LIL YACHTY x CARLY RAE JEPSEN",
            role: "Editing, VFX",
            image: "images/cargo/target-lil-yachty-carly-rae-jepsen.gif",
            youtubeId: "E9U6LvTnp7Y",
            releaseDate: "2017-02-12",
            playCount: 2500000,
            description: "Target commercial featuring an unexpected collaboration between Lil Yachty and Carly Rae Jepsen for the 2017 Grammys.",
            press: [
                { quote: "An unexpected pairing that works surprisingly well.", source: "Adweek" }
            ]
        },
        {
            id: "complex-networks-reel",
            title: "COMPLEX NETWORKS REEL",
            role: "Director, Editor, VFX",
            image: "images/cargo/complex-networks-reel.gif",
            youtubeId: null,
            playCount: null,
            releaseDate: "2019-12-01",
            description: "Brand reel for Complex Networks showcasing youth culture content. Password protected.",
            press: []
        },
        {
            id: "adidas-kylie-jenner",
            title: "ADIDAS x KYLIE JENNER",
            role: "Director, Editor, VFX",
            image: "images/cargo/adidas-kylie-jenner.gif",
            youtubeId: "EQd8aK8tDXg",
            releaseDate: "2018-08-01",
            playCount: 5000000,
            description: "ADIDAS campaign featuring Kylie Jenner. Durable Goods & Left Productions.",
            press: [
                { quote: "Visually striking campaign with massive social impact.", source: "Hypebeast" }
            ]
        },
        {
            id: "finish-line-nike",
            title: "FINISH LINE x NIKE SPORTS",
            role: "Director, Editor, VFX",
            image: "images/cargo/finish-line-nike.gif",
            youtubeId: null,
            playCount: 800000,
            releaseDate: "2019-04-01",
            description: "Sports campaign for Finish Line and Nike. Directed, shot and edited.",
            press: []
        },
        {
            id: "adidas-jd-sports",
            title: "ADIDAS x JD SPORTS",
            role: "Director, Editor, VFX",
            image: "images/cargo/adidas-jd-sports.gif",
            youtubeId: null,
            playCount: null,
            releaseDate: "2022-06-01",
            description: "JD Sports exclusive ADIDAS campaign. Directed, edited, and VFX by Face.",
            press: []
        },
        {
            id: "puma-jd-sports",
            title: "PUMA x JD SPORTS",
            role: "Director, Editor, VFX",
            image: "images/cargo/puma-jd-sports.gif",
            youtubeId: null,
            playCount: null,
            releaseDate: "2022-08-01",
            description: "PUMA campaign for JD Sports.",
            press: []
        },
        {
            id: "snapple-elements-nft",
            title: "Snapple x Glassface - Elements NFT",
            role: "Director",
            image: "images/cargo/snapple-elements-nft.gif",
            youtubeId: null,
            playCount: null,
            releaseDate: "2022-03-01",
            description: "Web3 NFT project collaboration with Snapple.",
            press: [
                { quote: "Innovative approach to brand NFTs.", source: "CoinDesk" }
            ]
        }
    ],
    musicVideo: [
        {
            id: "jhene-aiko-love",
            title: "Jhene Aiko - Love",
            role: "Director, VFX",
            image: "images/cargo/jhene-aiko-love.gif",
            youtubeId: "nfsr8Yf6oPo",
            playCount: 15000000,
            releaseDate: "2017-09-15",
            description: "Official music video for Jhene Aiko's 'Love'.",
            press: [
                { quote: "A visually stunning masterpiece.", source: "MTV" },
                { quote: "Glassface brings Aiko's vision to life beautifully.", source: "Billboard" }
            ]
        },
        {
            id: "jhene-aiko-surrender",
            title: "Jhene Aiko - Surrender",
            role: "Director",
            image: "images/cargo/jhene-aiko-surrender.gif",
            youtubeId: "jtMin8GTNGA",
            releaseDate: "2024-03-07",
            playCount: 8000000,
            description: "Official music video for Jhene Aiko's 'Surrender'.",
            press: []
        },
        {
            id: "jhene-aiko-summer-2020",
            title: "Jhene Aiko - Summer 2020",
            role: "Editor, VFX",
            image: "images/cargo/jhene-aiko-summer-2020.gif",
            youtubeId: "fyvf9jNPTHM",
            releaseDate: "2020-07-17",
            playCount: 6000000,
            description: "Music video capturing the essence of summer 2020.",
            press: []
        },
        {
            id: "lil-yachty-1-night",
            title: "Lil Yachty - 1 Night",
            role: "Director, Editor, VFX",
            image: "images/cargo/lil-yachty-1-night.gif",
            youtubeId: "251cxou3yR4",
            playCount: 45000000,
            releaseDate: "2016-03-10",
            description: "Breakthrough music video for Lil Yachty's '1 Night'. Directed by Face.",
            press: [
                { quote: "The video that put Lil Yachty on the map.", source: "Complex" },
                { quote: "A defining moment in SoundCloud rap visuals.", source: "The Fader" }
            ]
        },
        {
            id: "og-maco-u-guessed-it",
            title: "OG Maco - U Guessed It",
            role: "Music Video, Director, Editor",
            image: "images/cargo/og-maco-u-guessed-it.gif",
            youtubeId: "kT3OQwyvKmk",
            playCount: 25000000,
            releaseDate: "2014-09-01",
            description: "Viral music video for OG Maco's breakout hit.",
            press: [
                { quote: "Raw energy captured perfectly.", source: "Noisey" }
            ]
        },
        {
            id: "tove-lo-jacques",
            title: "Tove Lo - Jacques (ft. Jax Jones) (Official Video)",
            role: "Director, Editor, VFX",
            image: "images/cargo/tove-lo-jacques.gif",
            youtubeId: "0efoCjgNQiE",
            releaseDate: "2019-09-09",
            playCount: 12000000,
            description: "Official music video for Tove Lo's 'Jacques'.",
            press: []
        },
        {
            id: "tobi-lou-non-perishable",
            title: "Tobi Lou - Non Perishable",
            role: "EP, Tech Director",
            image: "images/cargo/tobi-lou-non-perishable-mv.gif",
            youtubeId: null,
            releaseDate: "2022-03-08",
            playCount: 3000000,
            description: "Complete EP visual experience for Tobi Lou.",
            press: [
                { quote: "A groundbreaking approach to the EP format.", source: "Pitchfork" }
            ]
        },
        {
            id: "madeon-all-my-friends",
            title: "Madeon - All My Friends",
            role: "Editor, VFX",
            image: "images/cargo/madeon-all-my-friends.gif",
            youtubeId: "o-o0ycSsqYA",
            releaseDate: "2019-07-17",
            playCount: 8000000,
            description: "Official music video for Madeon's 'All My Friends'.",
            press: []
        },
        {
            id: "tobi-lou-lingo-starr",
            title: "tobi lou - LINGO STARR",
            role: "Director, Editor",
            image: "images/cargo/tobi-lou-lingo-starr.gif",
            youtubeId: "EPpVR_whAX8",
            releaseDate: "2020-07-06",
            playCount: 2000000,
            description: "Animated music video for tobi lou.",
            press: []
        },
        {
            id: "bryson-tiller-inhale",
            title: "Bryson Tiller - Inhale",
            role: "VFX",
            image: "images/cargo/bryson-tiller-inhale.png",
            youtubeId: "zew8SOatV0U",
            playCount: 18000000,
            releaseDate: "2021-02-01",
            description: "VFX work for Bryson Tiller's 'Inhale'. Faceworld Studios.",
            press: []
        },
        {
            id: "24kgoldn-city-of-angels",
            title: "24kGoldn - CITY OF ANGELS",
            role: "VFX",
            image: "images/cargo/24kgoldn-city-of-angels.gif",
            youtubeId: "yHwGIA4VeOc",
            playCount: 35000000,
            releaseDate: "2020-03-01",
            description: "VFX for 24kGoldn's breakthrough hit. Directed by Face/Glassface.",
            press: []
        },
        {
            id: "tobi-lou-troop",
            title: "Tobi Lou - Troop",
            role: "Director, Editor, VFX",
            image: "images/cargo/tobi-lou-troop.gif",
            youtubeId: "ckAgAc8paKo",
            releaseDate: "2018-03-06",
            playCount: 2500000,
            description: "Official music video for Tobi Lou's 'Troop'.",
            press: []
        },
        {
            id: "cousin-stizz-perfect",
            title: "Cousin Stizz - Perfect ft. City Girls",
            role: "Director, Editor, VFX",
            image: "images/cargo/cousin-stizz-perfect.gif",
            youtubeId: "2Gaxt3zP8Sg",
            playCount: 5000000,
            releaseDate: "2019-06-01",
            description: "Music video featuring City Girls. Directed by Face.",
            press: []
        },
        {
            id: "sango-khlorine",
            title: "Sango – Khlorine (feat. Smino)",
            role: "Director, Editor, VFX",
            image: "images/cargo/sango-khlorine.gif",
            youtubeId: "dbv1O3jV_Hk",
            releaseDate: "2018-03-26",
            playCount: 4000000,
            description: "Official music video for Sango's 'Khlorine'.",
            press: []
        },
        {
            id: "lil-yachty-boom",
            title: "Lil Yachty - BOOM! ft. Ugly God",
            role: "Director, Editor, VFX",
            image: "images/cargo/lil-yachty-boom.png",
            youtubeId: "NoOi8_xvjIU",
            releaseDate: "2018-06-22",
            playCount: 20000000,
            description: "Music video featuring Ugly God. Directed by Face.",
            press: []
        },
        {
            id: "tobi-lou-hot-tub",
            title: "tobi lou - HOT TUB DREAM MACHINE",
            role: "director, editor",
            image: "images/cargo/tobi-lou-hot-tub.png",
            youtubeId: "-WsO5Tl5OVs",
            releaseDate: "2020-02-21",
            playCount: 3500000,
            description: "Surreal music video for tobi lou. Production by Face.",
            press: []
        }
    ],
    coverArtwork: [
        {
            id: "kid-cudi-insano",
            title: "Kid Cudi - Insano Album Artwork",
            role: "Graphic Design",
            image: "images/cargo/kid-cudi-insano.png",
            youtubeId: null,
            playCount: null,
            releaseDate: "2024-01-12",
            description: "Album artwork for Kid Cudi's 'Insano'.",
            press: [
                { quote: "Stunning visual identity for the album.", source: "Highsnobiety" }
            ]
        },
        {
            id: "tobi-lou-non-perishable-cover",
            title: "tobi lou - Non-Perishable Album Cover",
            role: "Graphic Design",
            image: "images/cargo/tobi-lou-non-perishable.png",
            youtubeId: null,
            playCount: null,
            releaseDate: "2022-03-08",
            description: "Album cover design for tobi lou.",
            press: []
        },
        {
            id: "kid-cudi-porsche",
            title: "Kid Cudi - Porsche Topless",
            role: "Graphic Design",
            image: "images/cargo/kid-cudi-porsche.png",
            youtubeId: null,
            playCount: null,
            releaseDate: "2023-09-01",
            description: "Single artwork for Kid Cudi.",
            press: []
        },
        {
            id: "kid-cudi-at-the-party",
            title: 'Kid Cudi ft. Pharrell & Travis Scott - "At The Party"',
            role: "Graphic Design",
            image: "images/cargo/kid-cudi-at-the-party.jpg",
            youtubeId: null,
            playCount: null,
            releaseDate: "2023-09-29",
            description: "Single artwork for the star-studded collaboration.",
            press: []
        },
        {
            id: "lauryn-hill-rebel",
            title: "Ms. Lauryn Hill - Rebel Cover Artwork",
            role: "Graphic Design",
            image: "images/cargo/lauryn-hill-rebel.png",
            youtubeId: null,
            playCount: null,
            releaseDate: "2023-11-01",
            description: "Cover artwork for Ms. Lauryn Hill.",
            press: []
        }
    ],
    narrative: [
        {
            id: "hulu-free-machine",
            title: "Hulu Presents: Free Machine",
            role: "Director, Editor",
            image: "images/cargo/hulu-free-machine.gif",
            youtubeId: "UiUg4_Ao46o",
            playCount: null,
            releaseDate: "2021-03-01",
            description: "Directed by Teddy Walton, Glassface, Lee Burns, Brandon Pierce. Edited by Glassface, Patrick Moccia, Lee Burns. VFX/Post Production by Faceworld Studios. Composers: Teddy Walton, Aaron Bow, Glassface, Justin Vernon, Hannah Jackson, Anthony Kilhoffer.",
            press: [
                { quote: "A compelling narrative with striking visuals.", source: "Variety" }
            ]
        }
    ],
    web3: [
        {
            id: "impermanent-digital",
            title: "Impermanent Digital",
            role: "NFT",
            image: "images/cargo/impermanent-digital.jpeg",
            youtubeId: null,
            playCount: null,
            releaseDate: "2022-05-01",
            description: "Web3 NFT art project.",
            press: []
        },
        {
            id: "disto-fine-art",
            title: "DISTO FINE ART",
            role: "NFT, VFX",
            image: "images/cargo/impermanent-digital.jpeg",
            youtubeId: null,
            playCount: null,
            releaseDate: "2021-03-15",
            description: "An NFT series by Glassface created using a combination of machine learning and 2D visual fx, with original music created for the piece. Released via Opensea. Creative direction by Face.",
            links: {
                rarible: "Glassface on Rarible",
                foundation: "Glassface on Foundation",
                opensea: "Glassface on OpenSea"
            },
            press: []
        },
        {
            id: "jd-sports-ar",
            title: "JD Sports x AfterPay x Snap: Times Square AR Experience",
            role: "AR",
            image: "images/cargo/jd-sports-ar.gif",
            youtubeId: null,
            playCount: null,
            releaseDate: "2021-11-01",
            description: "Augmented reality experience in Times Square.",
            press: [
                { quote: "Innovative AR activation in the heart of NYC.", source: "AdAge" }
            ]
        }
    ],
    graphicDesign: [
        {
            id: "sochi-olympics",
            title: "Sochi 2014 Olympics",
            role: "Brand Identity, Graphic Design",
            image: "images/cargo/sochi-olympics.gif",
            youtubeId: null,
            playCount: null,
            releaseDate: "2014-02-01",
            description: "Brand identity work for the Sochi 2014 Winter Olympics.",
            press: []
        }
    ],
    archive: [
        {
            id: "tobi-lou-game-ova",
            title: 'Tobi Lou - "Game Ova"',
            role: "Music Video, Director, Editor",
            image: "images/cargo/tobi-lou-game-ova.gif",
            youtubeId: "S27Kem0zzBU",
            playCount: 1500000,
            releaseDate: "2015-08-01",
            description: "Directed by Josh Goldenberg. Edited by Josh Goldenberg. Director of Photography Russell Fraser.",
            press: []
        },
        {
            id: "tunji-ige-war",
            title: 'Tunji Ige - "War"',
            role: "Music Video, Director, Editor",
            image: "images/cargo/tunji-ige-war.gif",
            youtubeId: "sjAd-se-LEo",
            releaseDate: "2016-06-07",
            playCount: 800000,
            description: "Music video for Tunji Ige. Directed by Face.",
            press: []
        },
        {
            id: "tokyos-revenge",
            title: "TOKYO'S REVENGE - GOODMORNINGTOKYO!",
            role: "VFX",
            image: "images/cargo/tokyos-revenge.gif",
            youtubeId: "B7RWR_5R5GE",
            releaseDate: "2020-02-17",
            playCount: 10000000,
            description: "VFX work for viral hit. Directed by Face.",
            press: []
        },
        {
            id: "swizz-beats-dmx-rick-ross",
            title: "Swizz Beats, DMX, Rick Ross - Just in Case",
            role: "VFX",
            image: "images/cargo/swizz-beats-dmx-rick-ross.gif",
            youtubeId: "--RTy_uobI8",
            releaseDate: "2019-09-27",
            playCount: 12000000,
            description: "VFX for hip-hop legends collaboration.",
            press: []
        },
        {
            id: "bea-miller-feel-something",
            title: "Bea Miller - feel something",
            role: "VFX",
            image: "images/cargo/bea-miller-feel-something.gif",
            youtubeId: "3eLfRb6_Css",
            playCount: 4000000,
            releaseDate: "2019-08-01",
            description: "VFX for Bea Miller music video. Directed by Face.",
            press: []
        },
        {
            id: "wiz-khalifa-alright",
            title: "Wiz Khalifa - Alright ft. Trippie Redd & Preme",
            role: "VFX",
            image: "images/cargo/wiz-khalifa-alright.gif",
            youtubeId: "ctTeJRAW_yE",
            releaseDate: "2019-05-01",
            playCount: 9000000,
            description: "VFX work for Wiz Khalifa. Directed by Face.",
            press: []
        },
        {
            id: "shy-glizzy-volcano",
            title: "Shy Glizzy - Volcano",
            role: "Editing, VFX",
            image: "images/cargo/shy-glizzy-volcano.gif",
            youtubeId: "aSVzQXvWauY",
            releaseDate: "2019-03-14",
            playCount: 3000000,
            description: "Editing and VFX for Shy Glizzy.",
            press: []
        },
        {
            id: "elley-duhe",
            title: "Elley Duhé - $$",
            role: "Editor, VFX",
            image: "images/cargo/elley-duhe.gif",
            youtubeId: "dxgDRaeWvFE",
            playCount: 6000000,
            releaseDate: "2019-04-01",
            description: "Editing and VFX for Elley Duhé. Directed by Face.",
            press: []
        },
        {
            id: "lil-yachty-66",
            title: "Lil Yachty - 66 ft. Trippie Redd",
            role: "Editor, VFX",
            image: "images/cargo/lil-yachty-66.gif",
            youtubeId: "4lT-2giDhQg",
            releaseDate: "2018-08-16",
            playCount: 22000000,
            description: "Editing and VFX for Lil Yachty hit. Directed by Face.",
            press: []
        },
        {
            id: "vic-mensa-metaphysical",
            title: "Vic Mensa - Metaphysical",
            role: "VFX",
            image: "images/cargo/vic-mensa-metaphysical.gif",
            youtubeId: "lVVnL3J_acE",
            releaseDate: "2019-03-22",
            playCount: 2500000,
            description: "VFX for Vic Mensa.",
            press: []
        },
        {
            id: "young-thug-dirty-shoes",
            title: "Young Thug - Dirty Shoes (ft. Gunna)",
            role: "VFX",
            image: "images/cargo/young-thug-dirty-shoes.gif",
            youtubeId: "8nxbrb3h8pE",
            releaseDate: "2018-09-19",
            playCount: 18000000,
            description: "VFX for Young Thug.",
            press: []
        },
        {
            id: "amine-campfire",
            title: "Aminé - Campfire ft. Injury Reserve",
            role: "VFX, Editor",
            image: "images/cargo/amine-campfire.gif",
            youtubeId: "NO3k6kqbKGs",
            playCount: 5000000,
            releaseDate: "2018-11-01",
            description: "VFX and editing for Aminé. Directed by Face.",
            press: []
        },
        {
            id: "bhad-bhabie-hacked",
            title: 'Bhad Bhabie: HACKED Campaign',
            role: "Director, Editor, VFX",
            image: "images/cargo/bhad-bhabie-hacked.gif",
            youtubeId: "JEdAUcra2X0",
            playCount: 8000000,
            releaseDate: "2019-02-01",
            description: "Viral campaign for Bhad Bhabie. Directed by Face.",
            press: []
        },
        {
            id: "prhyme",
            title: "PRhyme - PRhyme",
            role: "Director, Editor, VFX",
            image: "images/cargo/prhyme.gif",
            youtubeId: null,
            releaseDate: "2014-11-20",
            playCount: 3500000,
            description: "Work for PRhyme (Royce da 5'9\" and DJ Premier).",
            press: []
        },
        {
            id: "fifth-harmony",
            title: "Fifth Harmony Stage Visuals",
            role: "Editor, VFX, Animator",
            image: "images/cargo/fifth-harmony.gif",
            youtubeId: null,
            releaseDate: "2018-05-01",
            playCount: null,
            description: "Stage visuals for Fifth Harmony tour.",
            press: []
        },
        {
            id: "dua-lipa-genesis",
            title: "Dua Lipa - Genesis",
            role: "Music Video, VFX",
            image: "images/cargo/dua-lipa-genesis.gif",
            youtubeId: "nAQ77H7Fzfw",
            playCount: 15000000,
            releaseDate: "2017-06-01",
            description: "VFX work for Dua Lipa acoustic performance. The Fader.",
            press: []
        },
        {
            id: "dram-ill-nana",
            title: "DRAM ft. Trippie Redd - ILL NANA",
            role: "VFX, Editor",
            image: "images/cargo/dram-ill-nana.gif",
            youtubeId: "HLuQbbMnlK4",
            playCount: 7000000,
            releaseDate: "2017-12-01",
            description: "VFX and editing for DRAM ft. Trippie Redd.",
            press: []
        },
        {
            id: "khalid-location",
            title: "Khalid - Location",
            role: "Music Video, Editor, VFX",
            image: "images/cargo/khalid-location.gif",
            youtubeId: "by3yRdlQvzs",
            playCount: 350000000,
            releaseDate: "2016-09-26",
            description: "Work on Khalid's breakout hit 'Location'. Directed by Alex Di Marco. 552M+ views.",
            press: [
                { quote: "The video that helped launch Khalid to stardom.", source: "Billboard" }
            ]
        },
        {
            id: "smokepurpp-bless-yo-trap",
            title: "Smokepurpp - Bless Yo Trap",
            role: "VFX, Editor",
            image: "images/cargo/smokepurpp-bless-yo-trap.gif",
            youtubeId: "QlbJ49xpPzU",
            releaseDate: "2017-11-01",
            playCount: 6000000,
            description: "VFX and editing for Smokepurpp.",
            press: []
        },
        {
            id: "migos-motorsport",
            title: "Migos - Motorsport (Lyric Video)",
            role: "Editor, VFX, Animator",
            image: "images/cargo/migos-motorsport.gif",
            youtubeId: "LWpYaXYsPvA",
            releaseDate: "2017-11-22",
            playCount: 25000000,
            description: "Lyric video for Migos hit featuring Cardi B and Nicki Minaj.",
            press: []
        },
        {
            id: "tobi-lou-2hrs",
            title: "Tobi Lou - 2HRS",
            role: "Director, Editor, VFX",
            image: "https://img.youtube.com/vi/2Gaxt3zP8Sg/hqdefault.jpg",
            youtubeId: "2Gaxt3zP8Sg",
            releaseDate: "2020-12-18",
            playCount: 2000000,
            description: "Official music video for Tobi Lou's '2HRS'.",
            press: []
        }
    ]
};

// Helper function to format play count
function formatPlayCount(count) {
    if (!count) return null;
    if (count >= 1000000) {
        return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
}

// Flatten all projects into a single array for timeline
function getAllProjects() {
    const allProjects = [];
    Object.keys(projects).forEach(category => {
        projects[category].forEach(project => {
            allProjects.push({
                ...project,
                category: category,
                year: project.releaseDate ? new Date(project.releaseDate).getFullYear() : null
            });
        });
    });
    return allProjects.sort((a, b) => {
        if (!a.releaseDate) return 1;
        if (!b.releaseDate) return -1;
        return new Date(a.releaseDate) - new Date(b.releaseDate);
    });
}

// Get date range for timeline
function getTimelineRange() {
    const allProjects = getAllProjects();
    const dates = allProjects
        .filter(p => p.releaseDate)
        .map(p => new Date(p.releaseDate));
    return {
        min: new Date(Math.min(...dates)),
        max: new Date(Math.max(...dates))
    };
}

// Format date for display
function formatDate(dateString) {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

// Category display names
const categoryNames = {
    commercial: 'Commercial',
    musicVideo: 'Music Video',
    coverArtwork: 'Cover Artwork',
    narrative: 'Narrative',
    web3: 'Web3/NFT',
    graphicDesign: 'Graphic Design',
    archive: 'Archive'
};

// Category colors
const categoryColors = {
    commercial: '#ff6b6b',
    musicVideo: '#4ecdc4',
    coverArtwork: '#ffe66d',
    narrative: '#a8e6cf',
    web3: '#c7ceea',
    graphicDesign: '#ffd3b6',
    archive: '#ff8b94'
};

// Ensure projects is available globally
if (typeof window !== 'undefined') {
    window.projects = projects;
    window.getAllProjects = getAllProjects;
    window.getTimelineRange = getTimelineRange;
    window.formatDate = formatDate;
    window.categoryNames = categoryNames;
    window.categoryColors = categoryColors;
}

// Export for use in app.js (Node.js/ES modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        projects, 
        formatPlayCount, 
        getAllProjects, 
        getTimelineRange,
        formatDate,
        categoryNames,
        categoryColors
    };
}