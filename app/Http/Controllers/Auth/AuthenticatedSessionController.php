<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        $user = Auth::user();
        $token = JWTAuth::fromUser($user);
        
        // Store token in cache for API access
        Cache::put('jwt_token_' . $user->id, $token, now()->addDays(7));
        
        Log::info('JWT Token generated for user: ' . $user->id, ['token' => $token]);

        // Redirect to modules dashboard after successful login
        return redirect()->intended(route('modules.index', absolute: false));
    }

    /**
     * Get JWT token for authenticated user (for frontend use)
     */
    public function getToken(Request $request): \Illuminate\Http\JsonResponse
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user = Auth::user();
        $token = Cache::get('jwt_token_' . $user->id);
        
        if (!$token) {
            // Generate new token if not exists
            $token = JWTAuth::fromUser($user);
            Cache::put('jwt_token_' . $user->id, $token, now()->addDays(7));
        }

        return response()->json([
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl') * 60, // Convert to seconds
        ]);
    }

    /**
     * Refresh JWT token
     */
    public function refreshToken(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            $token = JWTAuth::refresh(JWTAuth::getToken());
            
            $user = Auth::user();
            Cache::put('jwt_token_' . $user->id, $token, now()->addDays(7));
            
            return response()->json([
                'token' => $token,
                'token_type' => 'bearer',
                'expires_in' => config('jwt.ttl') * 60,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Token refresh failed'], 401);
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();
        JWTAuth::invalidate(JWTAuth::getToken());
        Cache::forget('jwt_token');
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
