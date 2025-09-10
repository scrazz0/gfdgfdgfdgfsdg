
import React from 'react';
import { Link } from 'react-router-dom';
import type { Property } from '../../types.ts';

interface PropertyCardProps {
  property: Property;
  onViewDetails: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onViewDetails }) => {
  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);

  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 group">
      <div className="relative overflow-hidden">
        <img src={property.imageUrl} alt={property.title} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute top-0 right-0 bg-primary text-white text-sm font-bold px-3 py-1 m-4 rounded-full">{property.yield}% Yield</div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-serif font-semibold mb-2 text-text-light dark:text-text-dark">{property.title}</h3>
        <p className="text-text-muted-light dark:text-text-muted-dark mb-4">{property.location}</p>
        <div className="grid grid-cols-2 gap-4 text-center mb-6">
          <div>
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Full Price</p>
            <p className="font-bold text-lg text-text-light dark:text-text-dark">{formatCurrency(property.fullPrice)}</p>
          </div>
          <div>
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Min. Share</p>
            <p className="font-bold text-lg text-primary dark:text-primary-dark">{formatCurrency(property.minShare)}</p>
          </div>
        </div>
        <button onClick={() => onViewDetails(property)} className="w-full bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-full transition-transform duration-200 ease-in-out hover:scale-105">
          View Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;