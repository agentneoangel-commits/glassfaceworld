// Project Data - Glassface Portfolio
// Updated: February 1, 2026 - Added comprehensive Google Creator Labs project

const projects = {
    commercial: [
        { 
            title: "Google Creator Labs (Seasons 1-10)", 
            role: "Director, Photographer", 
            years: "2019-2025",
            image: "https://img.youtube.com/vi/WPehLrjzX3o/hqdefault.jpg", 
            link: "#creator-labs",
            featured: true,
            description: "5+ year collaboration with Google's visual arts incubator. Created 'Ultradreamer' documentary series exploring mental health & creativity. 10 seasons spanning Pixel 4 through Pixel 9.",
            videos: [
                { title: "Ultradreamer Ep 3: Chaos & Creativity - Teddy Walton", id: "wWfphvBWIS0" },
                { title: "Ultradreamer Ep 2: Isolation & Creativity", id: "Rs5MDsM4Z0E" },
                { title: "Ultradreamer Ep 4: Progress", id: "gA51z7sMkOc" },
                { title: "Ultradreamer Ep 1: Meet The Cast", id: "AuG9hTy_Qpg" }
            ],
            press: ["Vogue", "V Magazine", "WWD", "Google Blog", "Essence"]
        },
        { title: "Reel", role: "Editing, VFX, Direction", image: "https://img.youtube.com/vi/SAufofjlmYk/hqdefault.jpg", link: "#" },
        { title: "PIAGET x MICHAEL B JORDAN", role: "Editor, VFX", image: "https://img.youtube.com/vi/HYEQ7BYRTaQ/hqdefault.jpg", link: "#" },
        { title: "TARGET x LIL YACHTY x CARLY RAE JEPSEN", role: "Editing, VFX", image: "https://img.youtube.com/vi/E9U6LvTnp7Y/hqdefault.jpg", link: "#" },
        { title: "COMPLEX NETWORKS REEL", role: "Director, Editor, VFX", image: "https://img.youtube.com/vi/SAufofjlmYk/hqdefault.jpg", link: "#" },
        { title: "ADIDAS x KYLIE JENNER", role: "Director, Editor, VFX", image: "https://img.youtube.com/vi/EQd8aK8tDXg/hqdefault.jpg", link: "#" },
        { title: "FINISH LINE x NIKE SPORTS", role: "Director, Editor, VFX", image: "https://img.youtube.com/vi/EQd8aK8tDXg/hqdefault.jpg", link: "#" },
        { title: "ADIDAS x JD SPORTS", role: "Director, Editor, VFX", image: "https://img.youtube.com/vi/251cxou3yR4/hqdefault.jpg", link: "#" },
        { title: "PUMA x JD SPORTS", role: "Director, Editor, VFX", image: "https://img.youtube.com/vi/4lT-2giDhQg/hqdefault.jpg", link: "#" },
        { title: "Snapple x Glassface - Elements NFT", role: "Director", image: "https://img.youtube.com/vi/nfsr8Yf6oPo/hqdefault.jpg", link: "#" }
    ],
    musicVideo: [
        { title: "Jhene Aiko - Love", role: "Director, VFX", image: "https://img.youtube.com/vi/nfsr8Yf6oPo/hqdefault.jpg", link: "#" },
        { title: "Jhene Aiko - Surrender", role: "Director", image: "https://img.youtube.com/vi/jtMin8GTNGA/hqdefault.jpg", link: "#" },
        { title: "Jhene Aiko - Summer 2020", role: "Editor, VFX", image: "https://img.youtube.com/vi/fyvf9jNPTHM/hqdefault.jpg", link: "#" },
        { title: "Lil Yachty - 1 Night", role: "Director, Editor, VFX", image: "https://img.youtube.com/vi/251cxou3yR4/hqdefault.jpg", link: "#" },
        { title: "OG Maco - U Guessed It", role: "Music Video, Director, Editor", image: "https://img.youtube.com/vi/kT3OQwyvKmk/hqdefault.jpg", link: "#" },
        { title: "Tove Lo - Jacques (ft. Jax Jones)", role: "Director, Editor, VFX", image: "https://img.youtube.com/vi/0efoCjgNQiE/hqdefault.jpg", link: "#" },
        { title: "Tobi Lou - Non Perishable", role: "EP, Tech Director", image: "https://img.youtube.com/vi/EPpVR_whAX8/hqdefault.jpg", link: "#" },
        { title: "Madeon - All My Friends", role: "Editor, VFX", image: "https://img.youtube.com/vi/o-o0ycSsqYA/hqdefault.jpg", link: "#" },
        { title: "tobi lou - LINGO STARR", role: "Director, Editor, Animator", image: "https://img.youtube.com/vi/EPpVR_whAX8/hqdefault.jpg", link: "#" },
        { title: "Bryson Tiller - Inhale", role: "VFX", image: "https://img.youtube.com/vi/zew8SOatV0U/hqdefault.jpg", link: "#" },
        { title: "24kGoldn - CITY OF ANGELS", role: "VFX", image: "https://img.youtube.com/vi/yHwGIA4VeOc/hqdefault.jpg", link: "#" },
        { title: "Tobi Lou - Troop", role: "Director, Editor, VFX", image: "https://img.youtube.com/vi/ckAgAc8paKo/hqdefault.jpg", link: "#" },
        { title: "Cousin Stizz - Perfect ft. City Girls", role: "Director, Editor, VFX", image: "https://img.youtube.com/vi/2Gaxt3zP8Sg/hqdefault.jpg", link: "#" },
        { title: "Sango – Khlorine (feat. Smino)", role: "Director, Editor, VFX", image: "https://img.youtube.com/vi/dbv1O3jV_Hk/hqdefault.jpg", link: "#" },
        { title: "Lil Yachty - BOOM! ft. Ugly God", role: "Director, Editor, VFX", image: "https://img.youtube.com/vi/NoOi8_xvjIU/hqdefault.jpg", link: "#" },
        { title: "tobi lou - HOT TUB DREAM MACHINE", role: "director, editor", image: "https://img.youtube.com/vi/-WsO5Tl5OVs/hqdefault.jpg", link: "#" }
    ],
    coverArtwork: [
        { title: "Kid Cudi - Insano Album Artwork", role: "Graphic Design", image: "https://img.youtube.com/vi/zew8SOatV0U/hqdefault.jpg", link: "#" },
        { title: "tobi lou - Non-Perishable Album Cover", role: "Graphic Design", image: "https://img.youtube.com/vi/EPpVR_whAX8/hqdefault.jpg", link: "#" },
        { title: "Kid Cudi - Porsche Topless", role: "Graphic Design", image: "https://img.youtube.com/vi/yHwGIA4VeOc/hqdefault.jpg", link: "#" },
        { title: "Kid Cudi ft. Pharrell & Travis Scott - At The Party", role: "Graphic Design", image: "https://img.youtube.com/vi/ckAgAc8paKo/hqdefault.jpg", link: "#" },
        { title: "Ms. Lauryn Hill - Rebel Cover Artwork", role: "Graphic Design", image: "https://img.youtube.com/vi/nfsr8Yf6oPo/hqdefault.jpg", link: "#" }
    ],
    narrative: [
        { title: "Hulu Presents: Free Machine", role: "Director, Editor", image: "https://img.youtube.com/vi/UiUg4_Ao46o/hqdefault.jpg", link: "#" }
    ],
    web3: [
        { title: "Impermanent Digital", role: "NFT", image: "https://img.youtube.com/vi/nfsr8Yf6oPo/hqdefault.jpg", link: "#" },
        { title: "DISTO FINE ART", role: "NFT, VFX", image: "https://img.youtube.com/vi/WPehLrjzX3o/hqdefault.jpg", link: "#" },
        { title: "JD Sports x AfterPay x Snap: Times Square AR Experience", role: "AR", image: "https://img.youtube.com/vi/E9U6LvTnp7Y/hqdefault.jpg", link: "#" }
    ],
    graphicDesign: [
        { title: "Sochi 2014 Olympics", role: "Brand Identity, Graphic Design", image: "https://img.youtube.com/vi/SAufofjlmYk/hqdefault.jpg", link: "#" }
    ],
    archive: [
        { title: "Tobi Lou - Game Ova", role: "Music Video, Director, Editor", image: "https://img.youtube.com/vi/S27Kem0zzBU/hqdefault.jpg", link: "#" },
        { title: "Tunji Ige - War", role: "Music Video, Director, Editor", image: "https://img.youtube.com/vi/sjAd-se-LEo/hqdefault.jpg", link: "#" },
        { title: "TOKYO'S REVENGE - GOODMORNINGTOKYO!", role: "VFX", image: "https://img.youtube.com/vi/B7RWR_5R5GE/hqdefault.jpg", link: "#" },
        { title: "Swizz Beats, DMX, Rick Ross - Just in Case", role: "VFX", image: "https://img.youtube.com/vi/--RTy_uobI8/hqdefault.jpg", link: "#" },
        { title: "Bea Miller - feel something", role: "VFX", image: "https://img.youtube.com/vi/3eLfRb6_Css/hqdefault.jpg", link: "#" },
        { title: "Wiz Khalifa - Alright ft. Trippie Redd & Preme", role: "VFX", image: "https://img.youtube.com/vi/ctTeJRAW_yE/hqdefault.jpg", link: "#" },
        { title: "Shy Glizzy - Volcano", role: "VFX", image: "https://img.youtube.com/vi/aSVzQXvWauY/hqdefault.jpg", link: "#" },
        { title: "Elley Duhé - $$$$", role: "Editor, VFX", image: "https://img.youtube.com/vi/dxgDRaeWvFE/hqdefault.jpg", link: "#" },
        { title: "Lil Yachty - 66 ft. Trippie Redd", role: "Editor, VFX", image: "https://img.youtube.com/vi/4lT-2giDhQg/hqdefault.jpg", link: "#" },
        { title: "Vic Mensa - Metaphysical", role: "VFX", image: "https://img.youtube.com/vi/lVVnL3J_acE/hqdefault.jpg", link: "#" },
        { title: "Young Thug - Dirty Shoes (ft. Gunna)", role: "VFX", image: "https://img.youtube.com/vi/8nxbrb3h8pE/hqdefault.jpg", link: "#" },
        { title: "Aminé - Campfire ft. Injury Reserve", role: "VFX, Editor", image: "https://img.youtube.com/vi/NO3k6kqbKGs/hqdefault.jpg", link: "#" },
        { title: "Bhad Bhabie: HACKED Campaign", role: "Director, Editor, VFX", image: "https://img.youtube.com/vi/JEdAUcra2X0/hqdefault.jpg", link: "#" },
        { title: "PRhyme - PRhyme", role: "Director, Editor, VFX", image: "https://img.youtube.com/vi/kT3OQwyvKmk/hqdefault.jpg", link: "#" },
        { title: "Fifth Harmony Stage Visuals", role: "Editor, VFX, Animator", image: "https://img.youtube.com/vi/3eLfRb6_Css/hqdefault.jpg", link: "#" },
        { title: "Dua Lipa - Genesis", role: "Music Video, VFX", image: "https://img.youtube.com/vi/nAQ77H7Fzfw/hqdefault.jpg", link: "#" },
        { title: "DRAM ft. Trippie Redd - ILL NANA", role: "VFX, Editor", image: "https://img.youtube.com/vi/HLuQbbMnlK4/hqdefault.jpg", link: "#" },
        { title: "Khalid - Location", role: "Music Video, Editor, VFX", image: "https://img.youtube.com/vi/by3yRdlQvzs/hqdefault.jpg", link: "#" },
        { title: "Smokepurpp - Bless Yo Trap", role: "VFX, Editor", image: "https://img.youtube.com/vi/QlbJ49xpPzU/hqdefault.jpg", link: "#" },
        { title: "Migos - Motorsport (Lyric Video)", role: "Editor, VFX, Animator", image: "https://img.youtube.com/vi/LWpYaXYsPvA/hqdefault.jpg", link: "#" },
        { title: "Lil Yachty & Diplo - Forever Young", role: "Director, Editor, Animator", image: "https://img.youtube.com/vi/251cxou3yR4/hqdefault.jpg", link: "#" },
        { title: "A$AP Twelvyy - Glock Rivers", role: "Music Video, Director, Editor", image: "https://img.youtube.com/vi/aSVzQXvWauY/hqdefault.jpg", link: "#" },
        { title: "Rome Fortune - Music Videos", role: "Director, Editor, Animator", image: "https://img.youtube.com/vi/sjAd-se-LEo/hqdefault.jpg", link: "#" }
    ]
};

// Google Creator Labs - Complete Project Data
const creatorLabsProject = {
    id: "google-creator-labs",
    title: "Google Creator Labs (Seasons 1-10)",
    category: "commercial",
    years: "2019-2025",
    role: "Director, Photographer",
    
    // Hero content
    heroVideo: "https://www.youtube.com/watch?v=WPehLrjzX3o",
    heroImage: "https://img.youtube.com/vi/WPehLrjzX3o/maxresdefault.jpg",
    
    // All 4 Ultradreamer videos
    ultradreamerSeries: [
        {
            episode: 1,
            title: "Meet The Cast",
            youtubeId: "AuG9hTy_Qpg",
            description: "Introduction to the series exploring mental health and creativity.",
            releaseDate: "December 2019",
            views: "1,000+",
            featured: []
        },
        {
            episode: 2,
            title: "Isolation & Creativity",
            youtubeId: "Rs5MDsM4Z0E",
            description: "Shot during quarantine, exploring how isolation affects the creative process. 'Nothing kills creativity like fear or depression. And often, nothing helps heal and reshape our mental health like creativity itself.'",
            releaseDate: "July 2020",
            season: "Season 2: Art in Isolation",
            views: "7,500+",
            featured: []
        },
        {
            episode: 3,
            title: "Chaos & Creativity - Featuring Teddy Walton",
            youtubeId: "wWfphvBWIS0",
            description: "Grammy-winning producer Teddy Walton shares his perspective on finding creativity in chaos. Shot on Google Pixel 5.",
            releaseDate: "December 2020",
            season: "Season 3",
            views: "38,942",
            duration: "2:18",
            featured: ["Teddy Walton (Grammy-winning producer)"]
        },
        {
            episode: 4,
            title: "Progress",
            youtubeId: "gA51z7sMkOc",
            description: "The creative journey and artistic growth - reflecting on the evolution of creative practice.",
            releaseDate: "2021",
            views: "55,000+",
            featured: []
        }
    ],
    
    // Season-by-season breakdown
    seasons: [
        {
            number: 1,
            year: "December 2019",
            theme: "For All You Are",
            role: "Founding Artist",
            device: "Pixel 4",
            description: "Joined as 1 of 10 founding artists in the inaugural Creator Labs cohort.",
            work: "Inaugural cohort member - helped establish the program's visual identity",
            exhibition: "415 Broadway, NYC - Gallery exhibition with fellow artists",
            fellowArtists: ["Quil Lemons", "Mayan Toledano", "Joshua Kissi", "MaryV Benoit", "Myles Loftin", "Andrew Thomas Huang", "June Canedo", "Tim Kellner", "Anthony Prince Leslie"],
            press: ["WWD"]
        },
        {
            number: 2,
            year: "July 2020",
            theme: "Art in Isolation",
            role: "Director",
            device: "Pixel 4",
            description: "Created during the COVID-19 quarantine, exploring the tension of virtual work lives.",
            work: "Ultradreamer Episode 2: Isolation & Creativity",
            quote: "Nothing kills creativity like fear or depression. And often, nothing helps heal and reshape our mental health like creativity itself. Isolation is a tough pill to swallow, but often it breeds incredible work.",
            press: ["Google Blog", "V Magazine"]
        },
        {
            number: 3,
            year: "December 2020",
            theme: "Continued Narratives",
            role: "Director",
            device: "Pixel 5",
            description: "Featured Grammy-winning producer Teddy Walton discussing chaos and creativity.",
            work: "Ultradreamer Episode 3: Chaos & Creativity",
            featured: "Teddy Walton",
            press: ["V Magazine"]
        },
        {
            number: 4,
            year: "2021",
            theme: "Evolving Stories",
            role: "Photographer",
            device: "Pixel 5/6",
            description: "Continued participation with photography work documenting creative communities.",
            work: "Photography series and Ultradreamer Episode 4: Progress"
        },
        {
            number: 5,
            year: "2021-2022",
            theme: "Image Equity",
            role: "Photographer",
            device: "Pixel 6/6 Pro",
            description: "Portrait photography exploring representation and diversity.",
            work: "Portrait series celebrating diverse skin tones and stories"
        },
        {
            number: 6,
            year: "April 2022",
            theme: "Seen on Pixel",
            role: "Photographer",
            device: "Pixel 6 Pro",
            description: "Part of Google's Image Equity initiative celebrating diverse skin tones with Real Tone technology.",
            work: "Portrait series celebrating diverse skin tones",
            initiative: "Google Image Equity",
            lead: "Florian Koenigsberger"
        },
        {
            number: 7,
            year: "December 2022",
            theme: "Be Seen, Be Heard, Belong",
            role: "Photographer / Director",
            device: "Pixel 7 Pro",
            description: "360-degree multimedia exploration of LA's music community, combining AI and 3D effects.",
            work: "Ultradreamer series continuation - LA Music Community portraits",
            subjects: "LA music-makers (producers, songwriters, singers, instrumentalists ages 20-75)",
            technique: "AI and 3D effects combined with portrait photography",
            press: ["Vogue"],
            quote: "Glassface brings his unique visual perspective, combining AI and 3D effects into his portraits of this patchwork creative community..."
        },
        {
            number: 8,
            year: "December 2023",
            theme: "One-of-One",
            role: "Photographer",
            device: "Pixel 8 Pro",
            description: "Exploring unique voice and vision through portrait photography. First international expansion.",
            work: "Portrait photography exploring unique voice and vision",
            featuresUsed: ["Pro Controls", "Magic Editor (generative AI)"],
            note: "First international expansion - added UK artists"
        },
        {
            number: 9,
            year: "December 2024",
            theme: "The Magic We Make",
            role: "Photographer",
            device: "Pixel 9",
            description: "Exploring the creative process through portrait photography. Program expanded to Japan and Germany.",
            work: "Portrait photography exploring the magic of creative process",
            totalArtists: 31,
            expansion: ["Japan (Piczo)", "Germany (Elizaveta Porodina)"],
            press: ["Vogue"]
        },
        {
            number: 10,
            year: "2025",
            theme: "TBD",
            role: "Photographer",
            device: "TBD",
            description: "Ongoing participation in the Creator Labs program.",
            work: "Continued photography work and creative exploration"
        }
    ],
    
    // Overall stats
    stats: {
        totalSeasons: 10,
        totalYears: "5+",
        videoViews: "100,000+",
        devicesUsed: ["Pixel 4", "Pixel 5", "Pixel 6", "Pixel 6 Pro", "Pixel 7 Pro", "Pixel 8 Pro", "Pixel 9"],
        fellowArtistsTotal: 35,
        projectsCreated: "100+"
    },
    
    // Press coverage
    pressCoverage: [
        {
            publication: "Vogue",
            title: "Be Seen, Be Heard, Belong: Creator Labs Season 7",
            url: "https://www.vogue.com/article/be-seen-be-heard-belong-creator-labs-season-7-new-artists-announced",
            date: "December 2022",
            quote: "Glassface brings his unique visual perspective, combining AI and 3D effects into his portraits of this patchwork creative community, while letting the subjects, camera, and IRL visual elements lead in telling their story."
        },
        {
            publication: "Vogue",
            title: "Google Creator Labs unveils its 9th edition, featuring global photographers",
            url: "https://www.vogue.com/article/google-creator-labs-unveils-its-9th-edition-featuring-global-photographers",
            date: "December 2024",
            quote: "Created through a partnership between SN37 and Google, Creator Labs supports emerging talents in crafting new cultural narratives using Google Pixel devices."
        },
        {
            publication: "V Magazine",
            title: "Creator Labs is Up For Its Third Installment",
            url: "https://vman.com/article/creator-labs-is-up-for-its-third-installment/",
            date: "December 2020",
            quote: "Goldenberg, also known as Glassface, is an image-maker creating stylized videos with visual effects, intense music and graphic design. In Ultradreamer Episode 2, Glassface turns the camera on himself and explores the interplay of mental health and creativity."
        },
        {
            publication: "WWD",
            title: "Google to Foster Professional Artists With Creator Labs Initiative",
            url: "https://wwd.com/fashion-news/fashion-scoops/google-creator-labs-incubator-1203392342/",
            date: "December 2019"
        },
        {
            publication: "Google Blog",
            title: "A look at art in isolation captured on Pixel",
            url: "https://blog.google/products/pixel/pixel-creator-labs-art-in-quarantine/",
            date: "July 2020",
            quote: "Another artist, who goes by the alias Glassface, took a look at the tension of our new virtual work lives. 'Nothing kills creativity like fear or depression. And often, nothing helps heal and reshape our mental health like creativity itself.'"
        },
        {
            publication: "Essence",
            title: "Google And LENS Launch A Incubator To Celebrate Black Art",
            url: "https://www.essence.com/fashion/google-lens-launch-art-exhibit/",
            date: "November 2020"
        }
    ],
    
    // Links
    links: {
        creatorLabs: "https://creatorlabs.google/",
        season7: "https://www.vogue.com/article/be-seen-be-heard-belong-creator-labs-season-7-new-artists-announced",
        season9: "https://www.vogue.com/article/google-creator-labs-unveils-its-9th-edition-featuring-global-photographers",
        googleBlog: "https://blog.google/products/pixel/pixel-creator-labs-art-in-quarantine/"
    }
};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { projects, creatorLabsProject };
}
