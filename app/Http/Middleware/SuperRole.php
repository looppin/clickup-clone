<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Auth;
use Spatie\Permission\Traits\HasRoles;

class SuperRole
{
    use HasRoles;

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();

        // Bu alanlarda super user değilse 404 görsün
        if ( ! $user->hasRole('super')){
            abort(404);
        }

        return $next($request);
    }
}
