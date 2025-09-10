
import React from 'react';
import { Link } from 'react-router-dom';
import { useLocalization } from '../contexts.tsx';
import { PROPERTIES } from '../constants.tsx';

const HeroSection = () => {
    const { t } = useLocalization();
    return (
        <div className="relative h-[85vh] text-white flex items-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <img src="https://picsum.photos/seed/hero/1920/1080" className="absolute inset-0 w-full h-full object-cover" alt="Luxury property" />
            <div className="relative container mx-auto px-6 text-center">
                <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-4 animate-fade-in-down">
                    {t('heroTitle')}
                </h1>
                <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 animate-fade-in-up">
                    {t('heroSubtitle')}
                </p>
                <Link to="/properties" className="bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-full text-lg transition-transform duration-200 ease-in-out hover:scale-105 inline-block animate-bounce-in">
                    {t('heroCta')}
                </Link>
            </div>
        </div>
    );
};

const FeaturedProperties = () => (
    <div className="py-20 bg-background-light dark:bg-background-dark">
        <div className="container mx-auto px-6">
            <h2 className="text-4xl font-serif font-bold text-center mb-12">Featured Properties</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PROPERTIES.slice(0, 3).map(p => (
                    <div key={p.id} className="bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 group">
                        <div className="relative overflow-hidden">
                            <img src={p.imageUrl} alt={p.title} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute top-0 right-0 bg-primary text-white text-sm font-bold px-3 py-1 m-4 rounded-full">{p.yield}% Yield</div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-serif font-semibold mb-2">{p.title}</h3>
                            <p className="text-text-muted-light dark:text-text-muted-dark mb-4">{p.location}</p>
                            <Link to="/properties" className="text-primary dark:text-primary-dark font-semibold hover:underline">View Details &rarr;</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const HowItWorks = () => (
    <div className="py-20 bg-surface-light dark:bg-surface-dark">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-serif font-bold mb-4">How It Works</h2>
            <p className="max-w-2xl mx-auto text-text-muted-light dark:text-text-muted-dark mb-12">Investing in real estate has never been easier. Follow these simple steps to start building your portfolio.</p>
            <div className="grid md:grid-cols-3 gap-12">
                <div className="flex flex-col items-center">
                    <div className="bg-primary/10 text-primary dark:text-primary-dark p-6 rounded-full mb-4 text-4xl font-bold font-serif">1</div>
                    <h3 className="text-xl font-semibold mb-2">Browse Properties</h3>
                    <p className="text-text-muted-light dark:text-text-muted-dark">Explore our curated selection of high-yield properties and choose the one that fits your investment goals.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-primary/10 text-primary dark:text-primary-dark p-6 rounded-full mb-4 text-4xl font-bold font-serif">2</div>
                    <h3 className="text-xl font-semibold mb-2">Invest in Shares</h3>
                    <p className="text-text-muted-light dark:text-text-muted-dark">Purchase fractional shares of the property. You can start with a small investment and increase as you go.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-primary/10 text-primary dark:text-primary-dark p-6 rounded-full mb-4 text-4xl font-bold font-serif">3</div>
                    <h3 className="text-xl font-semibold mb-2">Earn Passive Income</h3>
                    <p className="text-text-muted-light dark:text-text-muted-dark">Receive your share of the rental income monthly and watch your investment grow over time.</p>
                </div>
            </div>
        </div>
    </div>
);


export default function HomePage() {
    return (
        <div>
            <HeroSection />
            <FeaturedProperties />
            <HowItWorks />
        </div>
    );
}