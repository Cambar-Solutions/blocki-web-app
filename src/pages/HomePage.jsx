import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Building2, Shield, TrendingUp, Users, ArrowRight } from 'lucide-react';

/**
 * Home/Landing page component
 * Features hero section, feature showcase, and CTA
 */
export default function HomePage() {
  const features = [
    {
      icon: Building2,
      title: 'Tokenized Real Estate',
      description: 'Own fractional shares of real properties through blockchain tokens',
    },
    {
      icon: Shield,
      title: 'Secure & Transparent',
      description: 'Built on Stellar blockchain with smart contract security',
    },
    {
      icon: TrendingUp,
      title: 'Liquid Investments',
      description: 'Trade property tokens anytime on our marketplace',
    },
    {
      icon: Users,
      title: 'KYC Verified',
      description: 'All users verified through SmartFace for compliance',
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Invest in Real Estate with{' '}
              <span className="text-primary">Blockchain</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Blocki enables fractional ownership of real estate properties through
              tokenization on the Stellar blockchain. Start investing with as little as $100.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/dashboard">
                <Button size="lg">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/properties">
                <Button variant="outline" size="lg">
                  Browse Properties
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Powered by Stellar
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Choose Blocki?
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We're revolutionizing real estate investment with blockchain technology,
            making it accessible, transparent, and liquid.
          </p>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative p-8 bg-gray-50 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                  <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to start investing?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-200">
              Connect your Stellar wallet and start building your real estate portfolio
              today.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-gray-100">
                  Launch App
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
