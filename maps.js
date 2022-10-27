export const maps = (() => {
  const map = [
    [ //floor
      "ggggggggsssssdd",
      "ggggssssssssddd",
      "ggssSsssssdddDD",
      "ggsSSSSssdddDdd",
      "gSSSSSSSSDDDDdd",
      "sSsSSSSssdddDdd",
      "sSssSssssdddDdd",
      "SSssSssssdddDdd",
      "ssssSssssdddDdd",
      "ssssSSSSSSDDDdd",
      "sssssssssSsdDdd",
      "dddssssssSsddDd",
      "ddddssssSSSsdDd",
      "ddddssssSSSsddD",
      "dddddssssssssdd",
    ],
    [ //walls
      "               ",
      "               ",
      "  ww www w     ",
      "  w    w       ",
      "               ",
      "  w    w       ",
      "  ww www w     ",
      "               ",
      "               ",
      "               ",
      "  w            ",
      "       ww ww   ",
      "       w   w   ",
      "       w   w   ",
      "       wwwww   ",
    ],
    [ //ceiling
      "               ",
      "               ",
      "  cccccccc     ",
      "  cccccccc     ",
      "  cccccccc     ",
      "  cccccccc     ",
      "  cccccccc     ",
      "               ",
      " ccc           ",
      "ccccc          ",
      "ccccc   ccc    ",
      "ccccc  ccccc   ",
      " ccc   ccccc   ",
      "       ccccc   ",
      "       ccccc   ",
    ]

  ];

  const tiles = {
    " ": {
      url: null,
      name: "nothing",
      blocks: false,
      flamable: false,
    },
    "w": {
      url: "./media/images/tiles/wall.jpg",
      name: "wall",
      blocks: true,
      flamable: true,
    },
    "s": {
      url: "./media/images/tiles/sand.jpg",
      name: "sand",
      blocks: false,
      flamable: false,
    },
    "S": {
      url: "./media/images/tiles/sand-path.jpg",
      name: "sand path",
      blocks: false,
      flamable: false,
    },
    "g": {
      url: "./media/images/tiles/grass.jpg",
      name: "grass",
      blocks: false,
      flamable: true,
    },
    "d": {
      url: "./media/images/tiles/dirt.jpg",
      name: "dirt",
      blocks: false,
      flamable: true,
    },
    "D": {
      url: "./media/images/tiles/dirt-path.jpg",
      name: "dirt path",
      blocks: false,
      flamable: true,
    },
    "c": {
      url: null,
      name: "ceiling",
      blocks: false,
      flamable: true,
    },
  }

  const isBlocked = (x, y) => {
    const destination = tiles[map[1][y]?.[x]]?.blocks;
    const isBlocked = destination === undefined || destination;

    return isBlocked ? true : false;
  }

  const getMap = () => map;

  return { getMap, tiles, isBlocked };
})();