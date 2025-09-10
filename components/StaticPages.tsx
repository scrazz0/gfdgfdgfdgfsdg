
import React from 'react';

const AboutContent = () => (
  <>
    <h1 className="text-5xl font-serif font-bold mb-6">About Elysian Estates</h1>
    <p className="text-lg text-text-muted-light dark:text-text-muted-dark mb-6">
      Elysian Estates was founded with a clear mission: to democratize real estate investing. We believe that everyone should have the opportunity to build long-term wealth through property ownership, regardless of their starting capital.
    </p>
    <p className="mb-4">
      Our team consists of seasoned real estate professionals, financial experts, and technology innovators dedicated to creating a transparent, secure, and user-friendly platform. We meticulously vet every property, ensuring it meets our high standards for location, quality, and rental income potential.
    </p>
    <p>
      By leveraging technology, we've simplified the entire investment process, from discovery and purchase to management and income distribution. Join us and be a part of the future of real estate investing.
    </p>
  </>
);

const HowItWorksContent = () => (
  <>
    <h1 className="text-5xl font-serif font-bold mb-6">How It Works: A Step-by-Step Guide</h1>
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-serif font-semibold text-primary dark:text-primary-dark mb-2">Step 1: Discover & Select</h2>
        <p>Browse our curated marketplace of premium properties. Each listing provides comprehensive details, including financial projections, location analysis, and professional photography. Find an investment that aligns with your financial goals.</p>
      </div>
      <div>
        <h2 className="text-3xl font-serif font-semibold text-primary dark:text-primary-dark mb-2">Step 2: Invest & Own</h2>
        <p>Decide how much you want to invest. We handle all the legal paperwork to create a unique LLC for each property. You purchase shares in the LLC, giving you direct, fractional ownership of the property. The process is fully digital and secure.</p>
      </div>
      <div>
        <h2 className="text-3xl font-serif font-semibold text-primary dark:text-primary-dark mb-2">Step 3: Earn & Track</h2>
        <p>Once you're an owner, we take care of the rest. Our expert property management partners handle tenants, maintenance, and operations. You can sit back and collect your share of the rental income, paid out monthly. Track your portfolio's performance and income through your personal dashboard.</p>
      </div>
    </div>
  </>
);

interface StaticPagesProps {
  page: 'about' | 'how-it-works';
}

const StaticPages: React.FC<StaticPagesProps> = ({ page }) => {
  const contentMap = {
    'about': <AboutContent />,
    'how-it-works': <HowItWorksContent />,
  };

  return (
    <div className="bg-surface-light dark:bg-surface-dark">
      <div className="container mx-auto px-6 py-20 max-w-4xl">
        {contentMap[page]}
      </div>
    </div>
  );
};

export default StaticPages;
