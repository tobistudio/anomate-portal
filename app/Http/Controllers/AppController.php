<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;

class AppController extends Controller
{
   /*
    // Class constructor 
    The base configurations for the Guzzle library are defined in the constructor
    */

    public function __construct (Request $request)
    {
        
        // Current timestamp to prevent assets caching
        $this->dateTime = Carbon::now();
        
        // Assets cache prefix
		$this->prefix = '?v='.$this->dateTime->timestamp;
		
    }
    
    public function get(Request $request)
    {
        
        $user = $request->session()->get('user');
        
        if (isset($user->shop_id)&&isset($user->api_token)) {
            
            return view('bootstrap',[
                'root'      => env('APP_URL'),
                'prefix'    => $this->prefix,
                'timestamp' => $this->dateTime,
                'shop_id'   => $user->shop_id,
                'api_token' => $user->api_token,
                'user'      => json_encode($user)
            ]);
            
        } else {
            
            return view('login');
            
        }
    
    }
    
    public function post(Request $request)
    {
        
        
    }

}
