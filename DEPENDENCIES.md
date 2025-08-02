# External Library Dependencies

This document lists all external libraries that need to be included in HTML files to resolve ESLint errors.

## Required CDN Links

Add these script tags to your HTML files before your custom JavaScript files:

### jQuery (for main.js)
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
```

### ScrollReveal (for script.js)
```html
<script src="https://unpkg.com/scrollreveal@4.0.9/dist/scrollreveal.min.js"></script>
```

### jsPDF (for calorie.js)
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
```

### QuaggaJS (for scan.js)
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/quagga/0.12.1/quagga.min.js"></script>
```

### International Telephone Input (for login.js)
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/css/intlTelInput.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js"></script>
```

## File Dependencies

- **cookies.js** must be loaded before **register.js** and **main.js**
- **register.js** must be loaded before other authentication-related scripts
- External libraries must be loaded before custom scripts that use them

## Example HTML Head Section

```html
<head>
    <!-- External Libraries -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://unpkg.com/scrollreveal@4.0.9/dist/scrollreveal.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/quagga/0.12.1/quagga.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/css/intlTelInput.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js"></script>
    
    <!-- Custom Scripts (order matters) -->
    <script src="js/cookies.js"></script>
    <script src="js/register.js" type="module"></script>
    <!-- Other custom scripts -->
</head>
```