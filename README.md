# Pokédex if Nintendo was cutting down on resources

`bun install`
`bun run dev`

This project is a best-effort under 1h. I used v0 as a base (prompt screenshot via email) and on top of that I corrected
the usage of heroUI components, faulty logic and skeleton behavior. 

## What I wanted to add

Initially I wanted to make the cards like Pokémon cards, where you could hover and they would shimmer and all. I also
wanted a search bar, add a details page to see all the sprites available. Maybe a "who is this pokémon?" minigame. But
that takes more time than what I had with this test.

## What could be better

V0 used an older version of the PokeAPI, I didn't fix it because this one is working and this is just an assignment.
The list isn't virtualized, it's not a huge problem here because the amount of items is not that big but it
would be a problem for larger datasets.
Architecture is not exactly what I'd choose for a larger project, but using something else would be overengineering for
no good reason.
I'd replace eslint by biome or oxlint.
