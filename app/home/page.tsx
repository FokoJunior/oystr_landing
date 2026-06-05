export default function HomePage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-4">
            <div className="glass p-12 max-w-4xl w-full text-center">
                <h1 className="text-5xl font-extrabold mb-6 text-blue" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
                    Welcome to OYSTR
                </h1>
                <p className="text-xl text-gray-300 mb-8 font-medium">
                    This is your private Moonshot control center.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass p-6 text-left">
                        <h3 className="text-accent-secondary mb-2 uppercase text-xs tracking-widest font-bold">Network</h3>
                        <p className="text-sm text-gray-500">Connect with your crew.</p>
                    </div>
                    <div className="glass p-6 text-left">
                        <h3 className="text-accent-secondary mb-2 uppercase text-xs tracking-widest font-bold">Launch</h3>
                        <p className="text-sm text-gray-500">Blast off with new Moonshots.</p>
                    </div>
                    <div className="glass p-6 text-left">
                        <h3 className="text-accent-secondary mb-2 uppercase text-xs tracking-widest font-bold">Orbit</h3>
                        <p className="text-sm text-gray-500">Track community progress.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
