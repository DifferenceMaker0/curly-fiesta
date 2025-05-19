@extends('layouts.app')

@section('content')
    <div class="card">
        <h5 class="card-header bg-primary">Tickets</h5>
        <div class="card-body">
            <div class="row">
                <livewire:tickets-list>
            </div>
        </div>
        <div class="card-footer">
            <button class="btn btn-primary">
                Refresh
            </button>
            <button id="promptBtn" class="btn btn-accent">Show Prompt</button>
            <button id="confirmBtn" class="btn btn-secondary">Show Confirm</button>
        </div>
    </div>
@endsection
