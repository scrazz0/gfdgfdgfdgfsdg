
import React, { useState, useMemo } from 'react';
import type { Property } from '../types.ts';
import { PROPERTIES } from '../constants.tsx';
import PropertyCard from './common/PropertyCard.tsx';

const PropertyDetailModal: React.FC<{ property: Property; onClose: () => void }> = ({ property, onClose }) => {
  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
  
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-surface-light dark:bg-surface-dark rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          <img src={property.imageUrl} alt={property.title} className="w-full h-80 object-cover rounded-t-2xl" />
          <button onClick={onClose} className="absolute top-4 right-4 bg-white/50 hover:bg-white/80 dark:bg-black/50 dark:hover:bg-black/80 rounded-full p-2 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-8">
          <h2 className="text-4xl font-serif font-bold mb-2 text-primary dark:text-primary-dark">{property.title}</h2>
          <p className="text-lg text-text-muted-light dark:text-text-muted-dark mb-6">{property.location}</p>
          <p className="mb-6">{property.description}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 text-center">
            <div className="bg-background-light dark:bg-background-dark p-4 rounded-lg">
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Yield</p>
                <p className="text-2xl font-bold text-primary dark:text-primary-dark">{property.yield}%</p>
            </div>
            {property.details.bedrooms && (
              <div className="bg-background-light dark:bg-background-dark p-4 rounded-lg">
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Bedrooms</p>
                  <p className="text-2xl font-bold">{property.details.bedrooms}</p>
              </div>
            )}
            {property.details.bathrooms && (
               <div className="bg-background-light dark:bg-background-dark p-4 rounded-lg">
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Bathrooms</p>
                  <p className="text-2xl font-bold">{property.details.bathrooms}</p>
              </div>
            )}
             <div className="bg-background-light dark:bg-background-dark p-4 rounded-lg">
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Area</p>
                <p className="text-2xl font-bold">{property.details.area} m²</p>
            </div>
          </div>
           <div className="bg-primary/10 p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                  <p className="text-lg">Invest starting from</p>
                  <p className="text-4xl font-bold text-primary dark:text-primary-dark">{formatCurrency(property.minShare)}</p>
              </div>
              <button className="bg-primary hover:bg-opacity-90 text-white font-semibold py-4 px-10 rounded-full transition-transform duration-200 ease-in-out hover:scale-105 text-lg">
                Invest Now
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default function PropertiesPage() {
  const [filters, setFilters] = useState({ type: 'All', city: 'All', price: 10000000 });
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
  };

  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter(p => {
      const typeMatch = filters.type === 'All' || p.type === filters.type;
      const cityMatch = filters.city === 'All' || p.city === filters.city;
      const priceMatch = p.fullPrice <= filters.price;
      return typeMatch && cityMatch && priceMatch;
    });
  }, [filters]);

  const cities = useMemo(() => ['All', ...Array.from(new Set(PROPERTIES.map(p => p.city)))], []);

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-5xl font-serif font-bold text-center mb-4">Our Properties</h1>
      <p className="text-lg text-center text-text-muted-light dark:text-text-muted-dark max-w-2xl mx-auto mb-10">
        Explore our curated selection of investment properties, each chosen for its potential for high returns and long-term value.
      </p>

      <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-md mb-10 flex flex-col md:flex-row gap-4 items-center">
        <select name="type" onChange={handleFilterChange} className="w-full md:w-auto bg-background-light dark:bg-background-dark p-3 rounded-lg border dark:border-gray-600">
          <option value="All">All Types</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
        </select>
        <select name="city" onChange={handleFilterChange} className="w-full md:w-auto bg-background-light dark:bg-background-dark p-3 rounded-lg border dark:border-gray-600">
          {cities.map(city => <option key={city} value={city}>{city}</option>)}
        </select>
        <div className="w-full md:flex-1">
            <label htmlFor="price" className="block text-sm text-text-muted-light dark:text-text-muted-dark">Max Price: ${filters.price.toLocaleString()}</label>
            <input type="range" id="price" name="price" min="500000" max="10000000" step="100000" value={filters.price} onChange={handleFilterChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProperties.map(property => (
          <PropertyCard key={property.id} property={property} onViewDetails={setSelectedProperty} />
        ))}
      </div>

      {selectedProperty && <PropertyDetailModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />}
    </div>
  );
}