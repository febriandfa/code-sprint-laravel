<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
        $userDetail = $request->user()->userDetail;

        $user->fill($request->validated());

        $foto = null;
        if ($request->hasFile('foto')) {
            $fileFoto = $request->file('foto');
            $extension = $fileFoto->getClientOriginalName();
            $fotoName = date('YmdHis') . "-" . $extension;
            $fileFoto->move(storage_path('app/public/foto'), $fotoName);
            $foto = '/foto/' . $fotoName;
            $userDetail->foto = $foto;
        } else {
            $foto = $userDetail->foto;
            $userDetail->foto = $foto;
        }

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        if ($request->filled('password')) {
            $user->password = bcrypt($request->password);
        } else {
            unset($user->password);
        }

        $user->save();
        $userDetail->save();

        return to_route('profile.edit')->with('success', 'Profil berhasil diubah');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
