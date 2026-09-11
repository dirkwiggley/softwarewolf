import { RegistrySectorData } from '../../../../components/CampaignRegistryViewer';

export const EVERWARD_DISTRICTS: RegistrySectorData[] = [
  {
    id: 'palace-district',
    name: 'Palace District',
    tagline: 'Seat of the High Crown',
    description: 'The pristine, heavily fortified apex of Everward where royalty, high-ranking military officials, and court advisors govern.',
    locations: [
      {
        name: 'The Royal Palace',
        description: 'The majestic seat of authority housing the High Crown, the Privy Council chambers, and court retainers.',
        subLocations: [
          {
            name: 'The High Royalty',
            targets: [
              { name: 'His Majesty King Benjaman Monroe “the fat”', description: 'Ruler of Everward' }
            ]
          },
          {
            name: 'The Privy Council & Officers of State',
            targets: [
              { name: 'Count Rufus J Perriwinkle', description: 'Lord High Chamberlain' },
              { name: 'Earl Hadley Powers', description: 'Chancellor of the Realm (Mage)' },
              { name: 'Marquis Jewell Broach', description: 'Keeper of the Rolls' },
              { name: 'Marquis Bluejon de Blackjack', description: 'Counsellor to His Majesty' },
              { name: 'Penjelette', description: 'Royal Magician' },
              { name: 'Baron Beuford T Justice', description: 'Marshall of the Realm' },
              { name: 'Duke Boswick Curmudgeon', description: 'Chancellor of the Exchequer' }
            ]
          },
          {
            name: 'The Palace Guard & Military Command',
            targets: [
              { name: 'Sir Charles Norris', description: 'Captain of the Palace Guard' },
              { name: 'Sir Shane Black', description: 'Sergeant of the Guard' },
              { name: 'Sir Brunswick', description: 'Captain of the Royal Fusiliers' },
              { name: 'Sir Stephen Irwin', description: 'Forrester-Royal' }
            ]
          },
          {
            name: 'The Royal Court & Musicians',
            targets: [
              { name: '(Position Open)', description: 'Poet Laureate' },
              { name: 'Peter', description: 'Royal Musician (vocal, harp, lute, dulcimer)' },
              { name: 'Paul', description: 'Royal Musician (vocal, lute, trumpet, drum)' },
              { name: 'Mary', description: 'Royal Musician (vocal, drum, hurdy-gurdy, flute)' }
            ]
          },
          {
            name: 'Staff of the Chamber',
            targets: [
              { name: 'Jory', description: 'Staff Member of the Chamber' },
              { name: 'Rory', description: 'Staff Member of the Chamber' },
              { name: 'Denise', description: 'Staff Member of the Chamber' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'merchant-district',
    name: 'Merchant District',
    tagline: 'Bazaars, Guilds, and Trading Hubs',
    description: 'The administrative and mercantile engine of Everward where trade compacts are signed, municipal laws are enforced, and gold changes hands constantly.',
    locations: [
      {
        name: 'City Administration Offices',
        description: 'The municipal heart where legal paperwork, registry books, and city laws are processed.',
        subLocations: [
          {
            name: "Clerk's Office",
            targets: [
              { name: 'Ivana Tinkle', description: 'Chief Magistrate' },
              { name: 'Otta Patience', description: 'Assistant to Ms. Tinkle' }
            ]
          },
          {
            name: "Sheriff's Office",
            targets: [
              { name: 'Sheriff Justin Case', description: 'County Law Enforcer' },
              { name: 'Deputy Barclay Armstrong', description: 'Administrative Deputy' }
            ]
          },
          {
            name: 'City Guard Headquarters',
            targets: [
              { name: 'Dick Tate', description: 'Captain of the City Guard' },
              { name: 'Sergeant Jess Typhlotic', description: 'Guard Sergeant' },
              { name: 'Sergeant Pat Downe', description: 'Guard Sergeant' },
              { name: 'Sergeant Sid Downe', description: 'Guard Sergeant' }
            ]
          }
        ]
      },
      {
        name: 'Guild Halls',
        description: 'The corporate seats of powerful trade monopolies and financial institutions.',
        subLocations: [
          {
            name: "Goldsmith's Guild & Banking Hub",
            targets: [
              { name: 'Cache Monet', description: "Guildmaster, Chief Banker, and Head of Goldsmith's Guild" },
              { name: 'Buette Lequor', description: 'Clerk / Assistant' },
              { name: 'Myriad Monet', description: 'Daughter of Cache Monet' },
              { name: 'Beryl Commerse', description: 'Master Jeweler' }
            ]
          },
          {
            name: "Merchant's Guild",
            targets: [
              { name: 'Brighton Earlee', description: 'Master Teamster and Caravaneer' }
            ]
          }
        ]
      },
      {
        name: 'The High Market Sprawl',
        description: 'The premier commercial hub specializing in high-end commerce, boutique luxury stores, and premier services.',
        subLocations: [
          {
            name: "Perdue's Apothecary and Potions",
            targets: [
              { name: 'Richard Sackler', description: 'Company Manager' },
              { name: 'Mortimer Sackler', description: 'Head of Healing Products' },
              { name: 'Raymond Sackler', description: 'Head of Non-Healing Concoctions' },
              { name: 'Arthur Sackler', description: 'Head of Recreational Products' }
            ]
          },
          {
            name: 'Quill and Ink Bookseller',
            targets: [
              { name: 'Misty Rious', description: 'Proprietor' }
            ]
          },
          {
            name: 'Fringe Clothmakers (High Market Branch)',
            description: 'Luxury tier fabrics and local cloth tailoring options.',
            targets: [
              { name: 'Deborah Fringe', description: "Bobbin's Sister" },
              { name: 'Bobbin Winders', description: "Deborah's Sister" }
            ]
          },
          {
            name: "Klink's Klocks",
            targets: [
              { name: 'Werner Klemperer', description: 'Master Horologist' }
            ]
          },
          {
            name: 'The Stilton Inn & Complex',
            description: 'Prestigious establishment serving wealthy merchants and visiting nobles.',
            targets: [
              { name: 'Norris Stilton', description: 'Head of the Stilton Family' },
              { name: 'Dorris Stilton', description: 'Wife of Norris' },
              { name: 'Parris Stilton', description: "Daughter of Norris & Dorris; Co-founder of Stilton’s Stylish Fashions" },
              { name: 'June Bugsworth', description: "Friend of Parris and Co-founder of Stilton’s Stylish Fashions" },
              { name: 'Remy Stilton (Deceased)', description: 'Brother of Norris; Former owner of hospitality supply support businesses' }
            ]
          },
          {
            name: 'Shiny Mail Armoury',
            targets: [
              { name: 'Hammon Tongs', description: 'Proprietor & Heavy Metal Armor Specialist' }
            ]
          },
          {
            name: "Q's Books and Oddities",
            targets: [
              { name: 'Howard Lovecraft', description: 'Proprietor' }
            ]
          },
          {
            name: "Monet's Messages",
            description: 'The city’s high-end printing office and merchant ledger newsletter.',
            targets: [
              { name: 'Cache Monet', description: 'Owner' },
              { name: 'Buette Lequor', description: 'Lead Investigative Reporter' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'star-street',
    name: 'Star Street',
    tagline: 'The Arcane & Celestial Mile',
    description: 'A colorful, neon-tinged thoroughfare featuring esoteric shops, localized street vendors, alcoves of recreation, and specialized alchemical labs.',
    locations: [
      {
        name: 'The Red Light Block',
        description: 'An entertainment strip anchoring localized lounges and parlors at opposite boundaries of the sector grid.',
        subLocations: [
          {
            name: 'Lavender Parlor',
            description: 'Established venue located at the district terminal block.',
            targets: [
              { name: 'Oliver Closeoff', description: 'Manager' }
            ]
          },
          {
            name: 'Lace Lounge',
            description: 'Sought-after establishment located at the opposite edge of the street axis.',
            targets: [
              { name: 'Charity Beaver', description: 'Manager' }
            ]
          }
        ]
      },
      {
        name: 'Apothecary and Potions Shop',
        description: 'A localized storefront delivering specialized herbal remedies and alchemical solutions.',
        targets: [
          { name: 'Timothe Leary', description: 'Proprietor & Master Herbalist' }
        ]
      }
    ]
  },
  {
    id: 'the-emerald-quarter',
    name: 'The Emerald Quarter',
    tagline: 'The Noble Estates',
    description: 'The opulent upper-crust residential neighborhood featuring sprawling manors, private aristocratic parks, and exclusive estates.',
    locations: [
      {
        name: 'The Emerald Estate Townhomes',
        description: 'A manicured, ultra-exclusive gated residential block within the quarter bounds.',
        subLocations: [
          {
            name: 'Townhome Association Board',
            targets: [
              { name: 'Karen Puffup', description: 'Chair of the Townhome Association' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'the-commons',
    name: 'The Commons',
    tagline: 'Heart of the Populace',
    description: 'Densely populated residential zone for working citizens, bustling local shops, and academic halls.',
    locations: [
      {
        name: 'The University of Everward',
        description: 'The central hub of higher learning and arcane research within the city.',
        subLocations: [
          {
            name: 'Administration',
            targets: [{ name: 'Provost Miss Daken' }]
          },
          {
            name: 'General Studies',
            targets: [{ name: 'Mathilda Maze', description: 'Mathematics Professor' }]
          },
          {
            name: 'College of Magic',
            targets: [
              { name: 'Dean Joaquin Flashbang', description: 'College of Thaumaturgy' },
              { name: 'Bekar Moppit', description: 'Assistant to Dean Flashbang' }
            ]
          }
        ]
      },
      {
        name: 'The Small Market',
        description: 'A vibrant neighborhood market square and the surrounding local shops.',
        subLocations: [
          {
            name: "Brad’s Meats",
            targets: [{ name: 'Brad Slaughter', description: 'Proprietor' }]
          },
          {
            name: "Wendy’s Grill",
            targets: [{ name: 'Dave Thomas', description: 'Owner' }]
          },
          {
            name: 'Fish Food',
            targets: [{ name: 'Anita Bath', description: 'Owner' }]
          },
          {
            name: 'Fringe Clothmakers',
            description: 'Has booths in big and small market. Purchases cloth made locally.',
            targets: [
              { name: 'Deborah Fringe', description: "Bobbin's Sister" },
              { name: 'Bobbin Winders', description: "Deborah's Sister" }
            ]
          },
          {
            name: 'Information on Paper',
            description: 'Local newspaper and newsletter.',
            targets: [{ name: 'Alex Jones', description: 'Proprietor' }]
          },
          {
            name: 'Bowyer',
            description: 'The shop has numerous animal head trophies, all with an arrow sticking out of them.',
            targets: [{ name: 'Piercy Arrowsmythe' }]
          }
        ]
      },
      {
        name: 'The Sanatorium',
        description: 'The municipal hospital system.',
        targets: [
          { name: 'Frederick Kreuger', description: 'Administrator' },
          { name: 'Samara Morgan', description: 'Chief Physician' }
        ]
      },
      {
        name: 'Blind Beholder Tavern',
        targets: [{ name: 'Izzy Gone', description: 'Proprietor' }]
      },
      {
        name: 'Mortar and Pestle Apothecary',
        targets: [{ name: 'Al Kaseltzer', description: 'Proprietor' }]
      },
      {
        name: 'Brash Beaver',
        targets: [
          { name: 'Alan Lockewood', description: 'Proprietor' },
          { name: 'Deidre Lockewood', description: 'Proprietress' },
          { name: 'Larry Lockewood', description: 'Engaged to Emma Timmons' }
        ]
      },
      {
        name: 'Weaver (Previously Haunted)',
        targets: [
          { name: 'Martin Timmons' },
          { name: 'Lois Timmons' },
          { name: 'Emma Timmons', description: 'Engaged to Larry Lockewood' }
        ]
      },
      {
        name: 'Archibald the Wizard Purveyor of Oddities',
        description: 'Boarded up as the owner is deceased.',
        targets: []
      },
      {
        name: "The Demon’s Grin Group Manor",
        description: 'Headquarters of the local adventuring party.',
        subLocations: [
          {
            name: 'Party Members',
            targets: [
              { name: 'Sath', description: 'Half-orc artificer' },
              { name: 'Red', description: 'Spellsword' },
              { name: 'Gleck', description: 'Lizardman warrior' }
            ]
          },
          {
            name: 'Staff & Retainers',
            targets: [
              { name: 'Alfred Pennyworth', description: "The manor’s majordomo" },
              { name: 'John Tyler', description: 'Manor master carpenter and mason' },
              { name: 'Janice Tyler', description: 'Manor seamstress and cloth maker' },
              { name: 'Tam & Yam', description: 'Children of the Tylers' }
            ]
          },
          {
            name: 'Other Assets',
            targets: [{ name: 'Aymonwe', description: "Red’s Sentinel Demon" }]
          }
        ]
      }
    ]
  },
  {
    id: 'the-canals',
    name: 'The Canals',
    tagline: 'Waterways & Waterborne Trade',
    description: 'Vast aquatic channels stringing the city segments together, populated by industrial workhouses, stables, and tight-lipped canal guards.',
    locations: [
      {
        name: 'The Waterway Stables',
        description: 'A dockside hub for draft beasts, logistics animals, and shoeing services.',
        subLocations: [
          {
            name: 'Stable & Farrier Workshop',
            targets: [
              { name: 'Lucky Irons', description: 'Master Blacksmith & Farrier' }
            ]
          }
        ]
      },
      {
        name: 'Industrial Tannery Yards',
        description: 'Heavy chemical workhouses processing local trade goods along the water margins.',
        subLocations: [
          {
            name: 'Big Pig Leathermakers & Urine Collectors',
            targets: [
              { name: 'Rollo Koster', description: 'Proprietor' }
            ]
          }
        ]
      },
      {
        name: 'Canal Security Sector',
        description: 'The tactical guard station keeping watch over underwater gates and waterborn smuggling routes.',
        targets: [
          { name: 'Sergeant Keene Walleye', description: 'Guard Officer in Charge of the Canals' }
        ]
      }
    ]
  },
  {
    id: 'the-docs',
    name: 'The Docs',
    tagline: 'The Shipping Harbor',
    description: 'Where coastal trading galleons, massive naval vessels, and local fishing skiffs anchor along the busy waterfront.',
    locations: [
      {
        name: 'The Harbor Administration',
        description: 'The central maritime registry managing inbound cargo and berths.',
        subLocations: [
          {
            name: 'Harbormaster Offices',
            targets: [
              { name: 'Anne Kersway', description: 'Harbormaster' },
              { name: 'Upton O’Goode', description: 'Assistant Harbormaster' }
            ]
          }
        ]
      },
      {
        name: 'The Waterfront & Docks',
        description: 'Split pathways separating elite trading fleets from localized watercraft traffic.',
        subLocations: [
          {
            name: 'Upper Docks (Merchant Traffic)',
            description: 'Deepwater berths hosting heavy commercial trading vessels.',
            targets: [
              { name: 'Frye Fishsticks', description: 'Food Cart Vendor' }
            ]
          },
          {
            name: 'Lower Docks (Local Traffic & Fishing)',
            description: 'Shallow slips occupied by everyday fishing vessels and skiffs.'
          }
        ]
      },
      {
        name: 'Maritime Services & Lounges',
        description: 'Shipyards and local taverns catering to weary sailors and shipwrights.',
        subLocations: [
          {
            name: 'The Stinky Starfish Tavern',
            targets: [
              { name: 'Dorreth', description: 'Proprietor' },
              { name: 'Patrick Barte', description: 'Server' }
            ]
          },
          {
            name: 'Drydocks & Repair Yards',
            targets: [
              { name: 'Skiff Wright', description: 'Shipwright' },
              { name: 'Edmund Fitzgerald', description: 'Shipwright' }
            ]
          }
        ]
      },
      {
        name: 'Frequently Visiting Ships',
        description: 'Notable vessels registered under ongoing dockside clearance codes.',
        targets: [
          { name: 'Aboat Time', description: 'Visiting Vessel' },
          { name: 'Feeling Nautical', description: 'Visiting Vessel' },
          { name: 'Wood Knot', description: 'Visiting Vessel' },
          { name: 'Wood Two', description: 'Visiting Vessel' },
          { name: 'Unsinkable 2', description: 'Visiting Vessel' }
        ]
      }
    ]
  },
  {
    id: 'the-lilac-quarter',
    name: 'The Lilac Quarter',
    tagline: 'Entertainment & Nightlife',
    description: 'The vibrant cultural center filled with theaters, festive halls, local trade fronts, and residential estates masking brewing urban crises.',
    locations: [
      {
        name: 'The Artisan Sprawl & Trade Shops',
        description: 'Boutiques and second-hand vendors lining the primary walking thoroughfares.',
        subLocations: [
          {
            name: 'The Dogs Scraps',
            description: 'A local second-hand thrift and oddity store.'
          },
          {
            name: "Aunt Chovie’s Seafood",
            description: 'A popular local dining establishment specializing in oceanic cuisine.'
          }
        ]
      },
      {
        name: 'Municipal & Hospitality Hubs',
        description: 'Public travel support options, liveries, and overnight lodging houses.',
        subLocations: [
          {
            name: 'The Central Quarter Stables',
            targets: [
              { name: 'Hoof Arted', description: 'Stablemaster' }
            ]
          },
          {
            name: 'Bate’s Inn',
            description: 'A quiet, secluded overnight lodging house at the edge of the quarter.',
            targets: [
              { name: 'Norma Bates', description: 'Proprietor' },
              { name: 'Norman Bates', description: 'Son of Proprietor' }
            ]
          }
        ]
      },
      {
        name: 'Private Neighborhood Residences',
        description: 'The residential sectors housing everyday citizens of the quarter.',
        subLocations: [
          {
            name: 'The Stunnelson Residence',
            targets: [
              { name: 'Snorri Stunnelson', description: 'Patient Zero of the mysterious sleeping disease' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'the-sewers',
    name: 'The Sewers',
    tagline: 'The Underbelly',
    description: 'Subterranean corridors masking outcasts and underground syndicates.',
    locations: []
  }
];
