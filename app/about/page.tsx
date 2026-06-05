export default function AboutPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-4">
            <div className="glass p-12 max-w-4xl w-full">
                <h1 className="text-5xl font-extrabold mb-8 text-blue text-center" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
                    About OYSTR
                </h1>
                <div className="space-y-6 text-gray-300 text-lg leading-relaxed font-medium">
                    <p>
                        OYSTR is a modern platform for dreamers and creators, built for those who turn big ideas into reality.
                    </p>
                    <p>
                        Our mission is to help you launch and achieve your **Moonshots**—those deeply meaningful life goals that pull at your heart and make you feel truly alive. Through community support, Crew energy, and shared resources, we make the impossible happen.
                    </p>
                    <div className="pt-8 flex justify-center text-center">
                        <div className="glass px-4 py-1-5 text-xs uppercase tracking-widest text-accent-secondary font-bold">
                            Dreams . Community . Momentum
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
