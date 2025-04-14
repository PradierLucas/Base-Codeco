<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\vista_contacto_radicaciones;
use Inertia\Inertia;


class ContactoradicacionesController extends Controller
{
    public function index($id)
    {
        $contact = vista_contacto_radicaciones::where('id_contacto', $id)->get();

        if ($contact->isEmpty()) {
            return response()->json(['message' => 'Contact not found'], 404);
        }

        $contactName = $contact->first()->nombre;
        $contactSurname = $contact->first()->apellido;

        return Inertia::render('Radicaciones/Index', [
            'radicaciones' => $contact,
            'nombre' => $contactName,
            'apellido' => $contactSurname
        ]);
    }
    
}