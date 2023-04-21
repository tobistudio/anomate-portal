<!doctype html>
<html lang="en">
	
	<head>
	    <meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	    <title>Login - Anomate.co</title>
		<link rel="icon" href="{{ asset('images/logo.ico') }}">
		<link rel="stylesheet" type="text/css" href="{{ asset('build/main.css') }}">
    </head>
    
    <body>
        <div id="application-wraper" class="container clearfix">
			<div class="app-login">
				<div class="column-md-6 column-md-offset-3 margin-top padding-top">
					
					<form action="/api/authentication" method="post">
						
					  <div class="form-group">
						    <label for="username">Username / Email address</label>
						    <input name="username" type="text" class="form-control" id="username" placeholder="Email" required>
					  </div>
					  
					  <div class="form-group">
						    <label for="password">Password</label>
						    <input name="password" type="password" class="form-control" id="password" placeholder="Password" required>
					  </div>
					  
					  <input type="hidden" name="_token" id="csrf-token" value="{{ Session::token() }}" />
					  <button type="submit" class="btn btn-default">Log in</button>
					  
					</form>
					
				</div>
			</div>
		</div>
    </body>

</html>