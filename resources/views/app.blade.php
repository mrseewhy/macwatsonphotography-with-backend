<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    {{-- <script>
        (function() {
            const appearance = '{{ $appearance ?? 'system' }}';

            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }
        })();
    </script> --}}

    {{-- Inline style to set the HTML background color based on our theme in app.css --}}
    {{-- <style>
        html {
            background-color: oklch(1 0 0);
        }

        html.dark {
            background-color: oklch(0.145 0 0);
        }
    </style> --}}

    <title inertia>{{ config('app.name', 'Macwatson Photography') }}</title>

    <link rel="icon" type="image/x-icon" href="{{ asset('fav.png') }}">

    <meta name="description" content="Macwatson Photography, world class Photography from lagos to the world">
    <meta name="author" content="Bigyard Digital">
    <meta name="keywords" content="Macwatson, Photography, Lagos, Nigeria, world class photography">



    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
