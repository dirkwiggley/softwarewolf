import { RegistrySectorData } from "../../../../components/CampaignRegistryViewer";

export const POINTS_OF_INTEREST: RegistrySectorData[] = [
  {
    id: "the-infinite-staircase",
    name: "The Infinite Staircase",
    tagline: "Multi dimensinal access between dungeons",
    description:
      "The domain of Dominus Carceris, the daemon lord of dungeons claims dominion over the Infinite Staircase. It is an interdimensional space that connects dungeons. When one of the daemon lord’s minions strikes a deal with a mortal a small dungeon will appear in what appears to be an auspicious location for the supplicant. All of these dungeons are secretly connected via magical passageways to the staircase.",
    locations: [
      {
        name: `Daemon's Gryn Manor`,
        description: `The home of the Daemon's Gryn Group.`,
        subLocations: [
          {
            name: "Root Cellar",
            targets: [
              {
                name: "The space under the manor",
                description:
                  "Storage space with a portal to the infinite staircase",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "lefeite-farm",
    name: "The Lefeite Farm",
    tagline: "A prestigious creamery outside the capitol",
    description:
      "Home of the famous Lefiete Creamery maker of expensive and highly sought after dairy products.",
    locations: [
      {
        name: `The Lefeite Farm and Creamery`,
        description: `The home of the Lefeite Farm.`,
        subLocations: [
          {
            name: "The Farm",
            targets: [
              {
                name: "Amy Stake-Lefiete",
                description: "Lady of the estate and farm manager",
              },
              {
                name: "Rick O'Shea",
                description: "Chief guard at the farm",
              },
            ],
          },
        ],
      },
      {
        name: `Animated Cottage`,
        description: "The animated cottage of Nifkin Grundlehammer, just outside the Lefeite Farm",
        targets: [
          {
            name: "Nifkin Grundlehammer",
            description: "A theoretically dead artificer"
          }
        ]
      },
    ],
  },
  {
    id: "strawberry-dungeon",
    name: "Strawberry Dungeon",
    tagline: "A cautionary tale",
    description: "A hidden dungeon outside of the capitol of Everward",
    locations: [
      {
        name: `Strawberry Dungeon`,
        description: "A growing dungeon hidden on the outskirts of the capitol",
        targets: [
          {
            name: "Christopher Percival Bacon",
            description: "The owner of the former Strawberry Farm who became the lord of Strawberry Dungeon who became dead."
          }
        ]
      },
    ]
  }
];
