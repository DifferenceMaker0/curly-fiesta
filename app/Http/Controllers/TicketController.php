<?php

namespace App\Http\Controllers;
use App\Models\Ticket;

class TicketController extends Controller
{
    public function index()
    {
             return view('tickets');
    }
}
