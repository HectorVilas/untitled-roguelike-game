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

## update 1 (condensed)

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

# what's next:
Now I have everything as it should be, everything is working, and I refactored the code many times to make it as easy as possible to read and understand.

For now the game's "viewport" is static, but I want a big map, so I have to refactor again to have the player always on the center, and let the viewport only draw what is around the player, so the "camera" will always follow the player, doesn't matter how big or small the world is.