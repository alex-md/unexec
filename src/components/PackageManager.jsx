import React, { useState, useRef, useEffect } from 'react';
import { X, Plus, Trash2, Search } from 'lucide-react';

const PackageManager = ({ packages, addPackage, removePackage, onClose, darkMode }) => {
    const [newPackageUrl, setNewPackageUrl] = useState('');
    const [error, setError] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const searchTimeout = useRef(null);
    const dropdownRef = useRef(null);

    const handleAddPackage = () => {
        if (!newPackageUrl) {
            setError('Please enter a package URL');
            return;
        }

        try {
            new URL(newPackageUrl);
        } catch {
            setError('Please enter a valid URL');
            return;
        }

        addPackage(newPackageUrl);
        setNewPackageUrl('');
        setError('');
        setSearchQuery('');
        setSuggestions([]);
    };

    const searchPackages = async (query) => {
        if (!query || query.length < 2) {
            setSuggestions([]);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(query)}&size=10`);
            const data = await response.json();

            const packageSuggestions = await Promise.all(data.objects.map(async item => {
                // Get the package details to find the main file
                const pkgResponse = await fetch(`https://registry.npmjs.org/${item.package.name}/latest`);
                const pkgData = await pkgResponse.json();

                // Determine the main file path
                let filePath = '';
                if (pkgData.unpkg) {
                    filePath = pkgData.unpkg;
                } else if (pkgData.browser) {
                    filePath = pkgData.browser;
                } else if (pkgData.main) {
                    filePath = pkgData.main;
                } else {
                    filePath = 'index.js';
                }

                // Check if it's likely a CSS package
                const isCSS = filePath.endsWith('.css') ||
                    item.package.name.includes('css') ||
                    item.package.keywords?.some(k => k.includes('css'));

                // For CSS packages, try to use a dist/css file if available
                if (isCSS && !filePath.endsWith('.css')) {
                    filePath = 'dist/css/' + item.package.name.split('/').pop() + '.min.css';
                }

                // Construct the jsDelivr URL
                const url = `https://cdn.jsdelivr.net/npm/${item.package.name}@${item.package.version}/${filePath}`;

                return {
                    name: item.package.name,
                    description: item.package.description,
                    version: item.package.version,
                    url: url,
                    isCSS: isCSS
                };
            }));

            setSuggestions(packageSuggestions);
            setShowSuggestions(true);
        } catch (err) {
            console.error('Failed to fetch package suggestions:', err);
            setSuggestions([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearchInputChange = (e) => {
        const query = e.target.value;
        setNewPackageUrl(query);
        setSelectedIndex(-1);
        setShowSuggestions(true);

        // Clear previous timeout
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        // Debounce search requests
        searchTimeout.current = setTimeout(() => {
            searchPackages(query);
        }, 300);
    };

    const handleKeyDown = (e) => {
        if (!suggestions.length) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
                break;
            case 'Enter':
                if (selectedIndex >= 0) {
                    e.preventDefault();
                    const selected = suggestions[selectedIndex];
                    setNewPackageUrl(selected.url);
                    setSuggestions([]);
                    setShowSuggestions(false);
                }
                break;
            case 'Escape':
                setSuggestions([]);
                setShowSuggestions(false);
                setSelectedIndex(-1);
                break;
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setNewPackageUrl(suggestion.url);
        setSuggestions([]);
        setShowSuggestions(false);
        setSelectedIndex(-1);
    };

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setSuggestions([]);
                setShowSuggestions(false);
                setSelectedIndex(-1);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const popularPackages = [
        { name: 'Bootstrap CSS', url: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css' },
        { name: 'Bootstrap JS', url: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js' },
        { name: 'jQuery', url: 'https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js' },
        { name: 'React', url: 'https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js' },
        { name: 'React DOM', url: 'https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.production.min.js' },
        { name: 'Tailwind CSS', url: 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css' },
        { name: 'Alpine.js', url: 'https://cdn.jsdelivr.net/npm/alpinejs@3.13.3/dist/cdn.min.js' },
        { name: 'Lodash', url: 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js' },
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`w-full max-w-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl overflow-hidden`}>
                <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center`}>
                    <h2 className="text-xl font-semibold">Package Manager</h2>
                    <button
                        onClick={onClose}
                        className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="space-y-4">
                        <div className="relative" ref={dropdownRef}>
                            <div className="flex space-x-2">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={newPackageUrl}
                                        onChange={handleSearchInputChange}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Enter a CDN URL or search for a package..."
                                        className={`w-full px-4 py-2 rounded-lg border ${darkMode
                                            ? 'bg-gray-700 border-gray-600 text-white'
                                            : 'bg-white border-gray-300'
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    />
                                </div>
                                <button
                                    onClick={handleAddPackage}
                                    className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                                        } text-white flex items-center space-x-1`}
                                >
                                    <Plus className="h-5 w-5" />
                                    <span>Add</span>
                                </button>
                            </div>

                            {/* Search suggestions dropdown */}
                            {(suggestions.length > 0 && showSuggestions) && (
                                <div className={`absolute w-full mt-1 rounded-lg border ${darkMode
                                    ? 'bg-gray-700 border-gray-600'
                                    : 'bg-white border-gray-200'
                                    } shadow-lg z-10 max-h-60 overflow-auto`}>
                                    {suggestions.map((suggestion, index) => (
                                        <div
                                            key={suggestion.name}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                            className={`px-4 py-2 cursor-pointer ${selectedIndex === index
                                                ? darkMode
                                                    ? 'bg-gray-600'
                                                    : 'bg-gray-100'
                                                : ''
                                                } ${darkMode
                                                    ? 'hover:bg-gray-600'
                                                    : 'hover:bg-gray-100'
                                                }`}
                                        >
                                            <div className="font-medium">
                                                {suggestion.name}
                                                <span className={`ml-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    {suggestion.isCSS ? '(CSS)' : '(JS)'}
                                                </span>
                                            </div>
                                            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                {suggestion.description}
                                            </div>
                                            <div className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                                {suggestion.url}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {isLoading && (
                                <div className={`absolute right-14 top-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-b-transparent"></div>
                                </div>
                            )}
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}

                        <div className="mb-6">
                            <h3 className="text-sm font-medium mb-2">Popular Packages</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {popularPackages.map((pkg) => (
                                    <button
                                        key={pkg.url}
                                        onClick={() => addPackage(pkg.url)}
                                        className={`text-left px-3 py-2 text-sm rounded-md ${darkMode
                                            ? 'hover:bg-gray-700 focus:bg-gray-700'
                                            : 'hover:bg-gray-100 focus:bg-gray-100'
                                            } focus:outline-none`}
                                    >
                                        {pkg.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium mb-2">Current Packages</h3>
                            {packages.length === 0 ? (
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No packages added yet.</p>
                            ) : (
                                <ul className={`border rounded-md divide-y ${darkMode ? 'border-gray-700 divide-gray-700' : 'border-gray-200 divide-gray-200'}`}>
                                    {packages.map((pkg) => (
                                        <li key={pkg} className="flex items-center justify-between py-2 px-3">
                                            <span className="text-sm truncate flex-1">{pkg}</span>
                                            <button
                                                onClick={() => removePackage(pkg)}
                                                className={`p-1 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} text-red-500`}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>

                <div className={`px-6 py-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-end`}>
                    <button
                        onClick={onClose}
                        className={`px-4 py-2 rounded-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PackageManager;
