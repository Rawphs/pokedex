import { PokemonList } from './pages/PokemonList';

function App() {
  return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">
              Discover Your Favorite Pokémon!
            </h1>
          </div>
          <PokemonList />;
        </div>
      </main>
  )
}

export default App
