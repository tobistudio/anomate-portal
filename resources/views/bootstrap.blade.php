<!doctype html>
<html lang="en">
	
	<head>
	    <meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	    <title>Dashboard - Anomate.co</title>
		<link rel="icon" href="{{ asset('images/logo.ico') }}">
		<link rel="stylesheet" type="text/css" href="{{ asset('build/main.css') }}{{ $prefix }}">
    </head>
    
    <body>
        <div id="application-wraper" class="wraper clearfix">
			<div class="app-preloading">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
    </body>
  	
	<script>
		const config = {
			appURL			: '{{ $root }}',
	        apiURL			: '{{ $root }}api',
	        apiURL_V1		: 'https://app.anomate.co/wp-json/anomate/v1/',
	        token			: '{{ csrf_token() }}',
	        time			: '{{ $timestamp }}',
	        language		: 'fr',
	        shop_id			: '{{ $shop_id }}',
	        api_token		: '{{ $api_token }}',
	        user			: '{{ $user }}'
		};
	</script>
	
	<script async type="text/javascript" src="{{ asset('build/main.bundle.js') }}{{ $prefix }}"></script>

</html>