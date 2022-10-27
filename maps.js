export const maps = (() => {
  const map = [
    [ //floor
      "sssssssssssssdd",
      "ssssssssssssddd",
      "ssssssssssdddDD",
      "sssssssssdddDdd",
      "sssssssssdddDdd",
      "sssssssssdddDdd",
      "sssssssssdddDdd",
      "sssssssssdddDdd",
      "sssssssssdddDdd",
      "ssssssssssddDdd",
      "sssssssssssdDdd",
      "dddssssssssddDd",
      "ddddssssssssdDd",
      "ddddssssssssddD",
      "dddddssssssssdd",
    ],
    [ //walls
      "               ",
      "               ",
      "  ww www       ",
      "  w    w       ",
      "               ",
      "  w    w       ",
      "  ww www       ",
      "               ",
      "               ",
      "               ",
      "               ",
      "      ww ww    ",
      "      w   w    ",
      "      w   w    ",
      "      wwwww    ",
    ],
    [ //ceiling
      "               ",
      "               ",
      "  ccccccccccc  ",
      "  ccccccccccc  ",
      "  ccccccccccc  ",
      "  ccccccccccc  ",
      "  ccccccccccc  ",
      "               ",
      "               ",
      "               ",
      "               ",
      "           cc  ",
      "          ccc  ",
      "       cccccc  ",
      "               ",
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
      url: "./media/images/tiles/wall.png",
      name: "wall",
      blocks: true,
      flamable: true,
    },
    "s": {
      url: "./media/images/tiles/sand.png",
      name: "sand",
      blocks: false,
      flamable: false,
    },
    "S": {
      url: "./media/images/tiles/sand-path.png",
      name: "sand path",
      blocks: false,
      flamable: false,
    },
    "g": {
      url: "./media/images/tiles/grass.png",
      name: "grass",
      blocks: false,
      flamable: true,
    },
    "d": {
      url: "./media/images/tiles/dirt.png",
      name: "dirt",
      blocks: false,
      flamable: true,
    },
    "D": {
      url: "./media/images/tiles/dirt-path.png",
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