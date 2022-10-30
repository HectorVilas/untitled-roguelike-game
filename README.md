# untitled-roguelike-game
![](READMEmd/progress005.gif)

# Play: https://hectorvilas.github.io/untitled-roguelike-game/

Welcome to my new personal project! This time I'm making a roguelike (not to be confused with the real time modern ones).

Since I discovered this genre I always wanted to make one, just for fun. I've been a big fan of [Cataclysm: Dark Days Ahead](https://github.com/CleverRaven/Cataclysm-DDA) years ago, so I want to aim for something like this (procedural generated cities and a big depth of details), but maybe that's too much for my current skills, but I can always try.

I also tried to make one years ago on `C++` ([this one](https://github.com/HectorVilas/roguelike-old-project)) but my programming skills were very basic.

Today I'm learning frontend and I feel like I'm getting better and better with `JavaScript`. Of course, I'm not in a professional level, I'm still very far from this, but I feel confident enough with my current knowledge to make this project happen.

## What is game about?
I'm still not sure what kind of roguelike I want to make. Something like Cataclysm would be great, but I'll start with a simple survival. I want to start with a simple map, a deserted isle, and the objetive should be simple survival. As the traditional roguelikes are mostly terminal-based, I can use a `grid` with rows and colums to place tiles (or chars) for each piece of map, so no `<canvas>` would be needed here.

# Progress:
I'm writing this readme 6 days after starting, 32 commits later, so the progress will be a resume.

## update

![](READMEmd/progress001.gif)

This was my start. On `JavaScript` I made a simple map with an array of chars. This array got iterated and each char was written on each tile (`grid` cell). Great, no problems here, but I wasn't sure about the size of the game area. I decided to apply the same `vmin` values to the `width` and `height`, so it will always be a square and won't get stretched depending on the user resolution.

![](READMEmd/progress002.gif)

Then the main character, it can move from tile to tile, but I didn't had collisions yet, even the char(acter) can go outside the map. 

![](READMEmd/progress003.gif)

After making some textures with Stable Diffusion and replacing the `innerText` with `background-image` for each tile, I finally implemented some kind of collision. It wasn't hard, but I wrote and fixed it too many times for something that simple, mostly because I needed optional chaining to check outside the map. Now it works great.

![](READMEmd/progress004.gif)

I also made the play area have 3 layers on top of each other. Now I have layers for floor, tiles and walls and ceiling.

![](READMEmd/progress005.gif)

And, finally, I added the ceiling. It just have a black transparent background, so the player knows where it is.

While I was at it, and while learning about good practices for modular code, I decided to apply this new knowledge on this prototype. Now each module have a "single responsability" and don't knowledge each other. After moving some functions from one to another, I finally separated each modular function to different modules, different `.js` files.

## what's next:
Now I have everything as it should be, everything is working, and I refactored the code many times to make it as easy as possible to read and understand.

For now the game's "viewport" is static, but I want a big map, so I have to refactor again to have the player always on the center, and let the viewport only draw what is around the player, so the "camera" will always follow the player, doesn't matter how big or small the world is.

---

# refactoring plan


This prototype is in a very, very early stage, so it's time to make another refactor. The way I wrote the code, it only works for maps with static size. The tiles on screen must be the same for the map, and I want a big world. I have to refactor almost everything, so maybe tomorrow I'll be making a new branch and writing again most of the code. My ideas:

## the map:
I want to have an overmap, and each tile must represent a 16x16 (or 24x24; or 32x32) map that will be drawn on screen. The player must be able to move from one chunk to another.

My idea is to create a set of rules to randomize this overmap. For example, if this is a city:

- generate houses next to the road
- if a road will go there, then it needs intersection every X tiles
- if I have X free space in a block with no connection with the road or any kind of path, a big house/shop/etc made of various chunks will occupy this space
- a school/big mall/fire department/etc can't be too close to each other

and any other set of rules I may come while working on it, then randomize each chunk, making lots of variants and placing them randomly. I know I'm aiming too high, but for now I'll manually draw the map.

I'm not sure yet how I'll manage to do this, but what I'm sure about is that I need the playable character in the center and the world must be drawn around it when the player walks, instead of the player moving on screen, no matter how big or small the world is.

## game save
This kind of game is not something you play for a few minutes and you are done. It's something the player may spend hours on it, so I'll make sure whatever I come up with can be stored in `localStorage`. The next practice from the course I'm making requires this, so I'll learn about this pretty soon, although doesn't seems hard.

This is the only way a website can generate a file, so I'll make sure to have it's content "dumpable" for backups.

## the code:
I've been reading again about the [OOP Principles](https://www.theodinproject.com/lessons/node-path-javascript-oop-principles), specially the [SOLID principle](https://duncan-mcardle.medium.com/solid-principle-1-single-responsibility-javascript-5d9ce2c6f4a5), and now I have a better understanding of how it should be done. I like this, and it will save me so much work in the future on my next refactoring. I want this project to be a long term work, and doing everything right from the beginning is a must.

I also need a "handler", this module must be the only one receiving imports for the other modules, not the UI one like I did.

I was struggling thinking how I'm going to store the info for each tile, but I think I have a solution. Right now there's an array with 3 2D arrays, representing floor, walls and ceiling respectively. I wanted to make another array to store the "HP" of each tile (in case the player wants to damage and break a wall), but maybe I just need a different array, storing the coordinates and HP of damaged tiles only. Now I'll have a small array that don't need a visual representation in the code, instead of a huge array with the HP of each tile.

Now, what if I want to set the room on fire? Or show a blood pool on the floor? How about painted tiles? That would require lots of arrays, but storing each of those values on a single array of objects will be way more less work.

I'm not sure how clear is what I'm saying, but you will see once I manage to refactor the code and find a way to store the map.

## dev tools
Once I finally find a way to make the maps the way I want, I need a visual tool to draw maps, to draw chunks. When everything else is ready, I need a visual representation of the *blueprints*, with an input to paste some raw code, load it in the page and then be able to make changes. I also need an output, with also raw code, so it can be copied as a map. `JSON.parse` and `JSON.stringify` must take care of that.