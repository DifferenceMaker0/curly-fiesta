<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>{{config('app.name')}}</title>
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
    <!-- Theme style -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@coreui/coreui@2.1.16/dist/css/coreui.min.css">

    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    @livewireStyles
    <link href="{{ asset('style.css') }}" rel="stylesheet"> <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <link href="{{ mix('css/dialog/dialog.css') }}" rel="stylesheet">
    <link href="{{ mix('css/dialog/styles.css') }}" rel="stylesheet">

</head>

<body class="app sidebar-show aside-menu-show">
<div class="app-body">
<button id="promptBtn" class="btn btn-accent">Show Prompt</button>
    <main class="main">
        @yield('content')
    </main>
</div>

<div id="app">
    <div class="container">
        <h1>Beautiful Dialog Component</h1>
        <div class="button-group">
            <button id="alertBtn" class="btn btn-primary">Show Alert</button>
            <button id="confirmBtn" class="btn btn-secondary">Show Confirm</button>
            <button id="promptBtn" class="btn btn-accent">Show Prompt</button>
            <button id="customBtn" class="btn btn-success">Custom Dialog</button>
        </div>
    </div>
</div>


<footer class="app-footer">
    <div class="ml-auto">
        <span>Powered by</span>
        <a href="https://coreui.io">CoreUI</a>
    </div>
</footer>
</body>

<script type="module" src="/js/dialog/main.js"></script>

<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@coreui/coreui@2.1.16/dist/js/coreui.min.js"></script>
@livewireScripts
</html>
