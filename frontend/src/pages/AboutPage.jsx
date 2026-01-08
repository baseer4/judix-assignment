function AboutPage() {
  return (
    <div className="w-full bg-black">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            About Notes app
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            A simple, beautiful way to capture and organize your thoughts
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <p className="text-white/70 text-lg leading-relaxed text-center">
              Notes app was created to provide a clean, intuitive platform for note-taking. 
              We believe that capturing ideas should be effortless and enjoyable. Whether you're 
              jotting down quick thoughts or organizing detailed plans, Notes app helps you stay 
              productive and focused.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default AboutPage

