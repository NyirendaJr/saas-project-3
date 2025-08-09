<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Store;

class EnsureStoreContext
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            $user = Auth::user();
            
            // If user doesn't have a current store set, set the first available one
            if (!$user->current_store_id && $user->activeStores()->exists()) {
                $firstStore = $user->activeStores()->first();
                $user->switchToStore($firstStore);
            }
            
            // Make current store available globally
            if ($user->currentStore) {
                app()->instance('current_store', $user->currentStore);
                config(['app.current_store_id' => $user->current_store_id]);
            }
        }

        return $next($request);
    }
}
