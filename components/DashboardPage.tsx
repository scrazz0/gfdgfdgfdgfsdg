
import React, { useEffect, useState } from 'react';
import { Routes, Route, NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext.tsx'; // Импортируем useAuth
import { notifyWithdrawal } from '../api.ts'; // Импортируем API функцию


// --- ICONS ---
const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const PropertiesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
const WalletIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const ProfileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;


const DASHBOARD_LINKS = [
    { path: "", name: "Dashboard", icon: <DashboardIcon /> },
    { path: "properties", name: "My Properties", icon: <PropertiesIcon /> },
    { path: "wallet", name: "Wallet", icon: <WalletIcon /> },
    { path: "profile", name: "Profile", icon: <ProfileIcon /> },
];

// --- DASHBOARD SUB-COMPONENTS ---

const DashboardHome = () => (
    <div>
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-md">
                <h3 className="text-text-muted-light dark:text-text-muted-dark">Total Investment</h3>
                <p className="text-4xl font-bold text-primary dark:text-primary-dark mt-2">$125,000</p>
            </div>
            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-md">
                <h3 className="text-text-muted-light dark:text-text-muted-dark">Total Income</h3>
                <p className="text-4xl font-bold text-green-500 mt-2">$8,750</p>
            </div>
            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-md">
                <h3 className="text-text-muted-light dark:text-text-muted-dark">Portfolio Yield</h3>
                <p className="text-4xl font-bold mt-2">7.0%</p>
            </div>
        </div>
        <div className="mt-8 bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-xl mb-4">Transaction History</h3>
            <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                        <tr className="border-b dark:border-gray-700">
                            <th className="p-3">Date</th>
                            <th className="p-3">Description</th>
                            <th className="p-3">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b dark:border-gray-700"><td className="p-3">2023-10-01</td><td className="p-3">Rental Income: Serene Downtown Loft</td><td className="p-3 text-green-500">+$43.33</td></tr>
                        <tr className="border-b dark:border-gray-700"><td className="p-3">2023-09-15</td><td className="p-3">Investment: Chic Parisian Apartment</td><td className="p-3 text-red-500">-$12,000</td></tr>
                        <tr><td className="p-3">2023-09-01</td><td className="p-3">Deposit from Bank</td><td className="p-3 text-green-500">+$20,000</td></tr>
                    </tbody>
                 </table>
            </div>
        </div>
    </div>
);

const MyProperties = () => (
    <div>
        <h1 className="text-3xl font-bold mb-6">My Properties</h1>
        <div className="space-y-6">
            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-md flex items-center justify-between">
                <div>
                    <h3 className="font-bold text-xl">Serene Downtown Loft</h3>
                    <p className="text-text-muted-light dark:text-text-muted-dark">My Share: 1.5% ($12,000)</p>
                </div>
                <div>
                    <p className="text-green-500 font-bold">Status: Rented</p>
                    <p>Monthly Income: ~$65</p>
                </div>
            </div>
            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-md flex items-center justify-between">
                <div>
                    <h3 className="font-bold text-xl">Luxury Beachfront Villa</h3>
                    <p className="text-text-muted-light dark:text-text-muted-dark">My Share: 1.0% ($25,000)</p>
                </div>
                <div>
                    <p className="text-yellow-500 font-bold">Status: Seeking Tenant</p>
                    <p>Projected Income: ~$150</p>
                </div>
            </div>
        </div>
    </div>
);
const Wallet = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
    
    const handleWithdrawal = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        const formData = new FormData(e.currentTarget);
        const amount = formData.get('amount');
        const address = formData.get('address');

        if (!amount || !address) {
            setMessage({ type: 'error', text: 'Please fill in all fields.' });
            setIsLoading(false);
            return;
        }

        try {
            // Используем новую API функцию
            await notifyWithdrawal({ amount: amount.toString(), address: address.toString() });
            setMessage({ type: 'success', text: 'Withdrawal request submitted successfully!' });
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            console.error("Error sending notification:", error);
            setMessage({ type: 'error', text: 'An error occurred. Please try again later.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
    <div>
        <h1 className="text-3xl font-bold mb-6">Wallet</h1>
        <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-xl shadow-md mb-8 text-center">
            <h3 className="text-text-muted-light dark:text-text-muted-dark">Current Balance</h3>
            <p className="text-6xl font-bold text-primary dark:text-primary-dark mt-2">$2,450.75</p>
        </div>
         <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-xl mb-4">Deposit Funds</h3>
                <p className="text-text-muted-light dark:text-text-muted-dark mb-4">Send USDT (TRC-20) to the address below:</p>
                <div className="bg-background-light dark:bg-background-dark p-4 rounded-lg text-center">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TXYZ..." alt="QR Code" className="mx-auto mb-2" />
                    <p className="font-mono text-sm break-all">TXYZ...ABC123...</p>
                </div>
            </div>
            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-xl mb-4">Withdraw Funds</h3>
                 <form className="space-y-4" onSubmit={handleWithdrawal}>
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium">Amount (USD)</label>
                        <input type="number" name="amount" id="amount" required className="mt-1 block w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-600 rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium">USDT (TRC-20) Address</label>
                        <input type="text" name="address" id="address" required className="mt-1 block w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-600 rounded-md" />
                    </div>
                    <button type="submit" disabled={isLoading} className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-full hover:bg-opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed">
                        {isLoading ? 'Submitting...' : 'Request Withdrawal'}
                    </button>
                    {message && (
                        <p className={`text-sm mt-2 ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                            {message.text}
                        </p>
                    )}
                </form>
            </div>
        </div>
    </div>
    );
};
const Profile = () => {
    const { user } = useAuth();
    return (
        <div>
           <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
           <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-xl shadow-md">
               <form className="space-y-6">
                   <div>
                       <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
                       <input type="text" id="name" defaultValue={user?.name || ''} className="mt-1 block w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-600 rounded-md" />
                   </div>
                   <div>
                       <label htmlFor="email" className="block text-sm font-medium">Email</label>
                       <input type="email" id="email" defaultValue={user?.email || ''} disabled className="mt-1 block w-full px-3 py-2 bg-gray-200 dark:bg-gray-700 border rounded-md" />
                   </div>
                    <div>
                       <button type="submit" className="bg-primary text-white font-semibold py-2 px-6 rounded-full hover:bg-opacity-90">Save Changes</button>
                   </div>
               </form>
           </div>
       </div>
   );
};

const DashboardLayout: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };
    
    return (
        <div className="flex min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
            <aside className="w-64 bg-surface-light dark:bg-surface-dark p-6 flex-shrink-0 flex flex-col shadow-lg">
                 <Link to="/" className="text-3xl font-bold font-serif text-primary dark:text-primary-dark mb-10">
                    Elysian Estates
                </Link>
                <nav className="flex-grow">
                    {DASHBOARD_LINKS.map(link => (
                         <NavLink
                            key={link.name}
                            to={link.path}
                            end={link.path === ""}
                            className={({ isActive }) =>
                              `flex items-center space-x-3 p-3 my-2 rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 ${
                                isActive ? 'bg-primary/20 text-primary dark:text-primary-dark' : ''
                              }`
                            }
                        >
                            {link.icon}
                            <span>{link.name}</span>
                        </NavLink>
                    ))}
                </nav>
                 <div>
                    <button onClick={handleLogout} className="flex items-center space-x-3 p-3 w-full text-left rounded-lg transition-colors hover:bg-red-500/10 hover:text-red-500">
                        <LogoutIcon />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
            <main className="flex-1 p-10 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};


export default function DashboardPage() {
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    useEffect(() => {
        // Если загрузка завершена и пользователя нет, перенаправляем на страницу входа
        if (!loading && !user) {
            navigate('/login');
        }
    }, [user, loading, navigate]);

    if (loading) {
         return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (!user) {
        // Пока происходит перенаправление, ничего не рендерим
        return null; 
    }

    return (
        <DashboardLayout>
            <Routes>
                <Route index element={<DashboardHome />} />
                <Route path="properties" element={<MyProperties />} />
                <Route path="wallet" element={<Wallet />} />
                <Route path="profile" element={<Profile />} />
            </Routes>
        </DashboardLayout>
    );
}