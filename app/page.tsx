export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">

      <section className="container mx-auto px-6 py-32">

        <div className="max-w-4xl">

          <p className="text-lime-400 mb-4">
            CONTENT RADAR
          </p>

          <h1 className="text-6xl font-bold mb-6">
            Your content is everywhere.
            You just don't know it yet.
          </h1>

          <p className="text-zinc-400 text-xl mb-8">
            Discover where your photos and videos
            appear online and prove your true reach.
          </p>

          <div className="flex gap-4">

            <a
              href="/signup"
              className="bg-lime-400 text-black px-6 py-3 rounded-lg"
            >
              Start Free
            </a>

            <a
              href="/login"
              className="border border-zinc-700 px-6 py-3 rounded-lg"
            >
              Login
            </a>

          </div>

        </div>

      </section>

    </main>
  );
}