<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function index()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $rules = [
            'email' => ['required','email'],
            'password' => ['required']
        ];

        $validator = Validator::make($request->all(), $rules);

        // Hata var
        if ($validator->fails()) {

            return redirect()->route('login')->withErrors($validator->errors());

            // Oturum açmayı dene
        } else {
            $credentials = $request->only('email', 'password');

            // Oturum açmayı dene, sonra panele yönlendir
            if (Auth::attempt($credentials)) {
                $request->session()->regenerate();
                return redirect()->route('index');
            }

            // Hata var ise
            return back()->withErrors([
                'email' => 'Geçersiz eposta ya da parola, lütfen kontrol ederek tekrar deneyiniz',
            ]);
        }
    }

    public function logout()
    {
        Auth::logout();
        return redirect()->route('login');
    }

}
