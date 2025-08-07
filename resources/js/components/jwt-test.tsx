import React, { useEffect, useState } from 'react';
import JWTService from '../services/jwtService';

const JWTTest: React.FC = () => {
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const jwtService = JWTService.getInstance();

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = () => {
        setIsAuthenticated(jwtService.isAuthenticated());
        setToken(jwtService.getCurrentToken());
    };

    const handleGetToken = async () => {
        setLoading(true);
        setError(null);

        try {
            const newToken = await jwtService.getToken();
            setToken(newToken);
            setIsAuthenticated(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to get token');
        } finally {
            setLoading(false);
        }
    };

    const handleRefreshToken = async () => {
        setLoading(true);
        setError(null);

        try {
            const newToken = await jwtService.refreshToken();
            setToken(newToken);
            setIsAuthenticated(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to refresh token');
        } finally {
            setLoading(false);
        }
    };

    const handleClearToken = () => {
        jwtService.clearToken();
        setToken(null);
        setIsAuthenticated(false);
    };

    return (
        <div className="rounded-lg border bg-white p-4 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">JWT Service Test</h3>

            <div className="space-y-4">
                <div className="flex items-center space-x-2">
                    <span className="font-medium">Status:</span>
                    <span className={`rounded px-2 py-1 text-sm ${isAuthenticated ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
                    </span>
                </div>

                {token && (
                    <div>
                        <span className="font-medium">Token:</span>
                        <div className="mt-1 rounded bg-gray-100 p-2 font-mono text-xs break-all">{token.substring(0, 50)}...</div>
                    </div>
                )}

                {error && <div className="rounded bg-red-100 p-2 text-sm text-red-800">{error}</div>}

                <div className="flex space-x-2">
                    <button
                        onClick={handleGetToken}
                        disabled={loading}
                        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
                    >
                        {loading ? 'Loading...' : 'Get Token'}
                    </button>

                    <button
                        onClick={handleRefreshToken}
                        disabled={loading || !isAuthenticated}
                        className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:opacity-50"
                    >
                        Refresh Token
                    </button>

                    <button onClick={handleClearToken} className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
                        Clear Token
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JWTTest;
