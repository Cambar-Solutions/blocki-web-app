export default function About() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About Blocki</h1>
        <p className="text-lg text-gray-700 mb-4">
          Built for the Stellar Blockchain Hackathon.
        </p>
        <div className="prose prose-lg">
          <h2 className="text-2xl font-semibold mt-8 mb-4">Technology Stack</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>React 19 with Vite</li>
            <li>Tailwind CSS v4</li>
            <li>React Router v7</li>
            <li>TanStack Query</li>
            <li>Stellar SDK</li>
            <li>Soroban Smart Contracts</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
