<?php

namespace App\Http\Controllers;

use Faker\Generator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Container\Container;

class ApiController extends Controller
{

    /*
    // Class constructor 
    The base configurations for the Guzzle library are defined in the constructor
    */

    public function __construct (Request $request)
    {

    }
    
    /*
    // API methods
    */
    
    public function get(Request $request,$apiPath)
    {
 
        $this->responseResults = $this->apiHandler($request,$apiPath,"GET");

        return $this->apiCallBack();
        
    }
    

    public function post(Request $request,$apiPath)
    {
        if ($apiPath=="authentication") {
            return $this->authentication($request);
        } else {
            $this->responseResults = $this->apiHandler($request,$apiPath,"POST");
            return $this->apiCallBack();
        }
    }
    
    public function authentication($request)
    {
     
        $params     = $request->all();
        $endpoint   = "https://app.anomate.co/wp-json/anomate/v1/auth";
        $client     = new \GuzzleHttp\Client();

        $response = $client->request('POST',$endpoint,
            [
                'query' => [
                    'username' => $params['username'],
                    'password' => $params['password']
                ],
                'http_errors' => false,
                'verify' => false
            ]
        );
        
        $statusCode     = $response->getStatusCode();
        $responseData   = json_decode($response->getBody()); // returns an object
        
        if (isset($responseData->api_token)&&isset($responseData->shop_id)) {
            $request->session()->put('user',$responseData);
            return redirect('/');
        } else {
            return redirect('/?status=failed');
        }
        
    }
    
    protected function apiHandler($request,$apiPath,$method) 
    {
        
        $this->queryParams = $request->all();
        
        $resopnseBody = array();
        
        switch ($apiPath) {
            // Get customer information from session
            case "user":
                $resopnseBody = $this->getUserData();
            break;
            case "user/logout":
                $request->session()->forget('user');
                return redirect('/?status=logout');
            break;
            case "user/billing/invoices":
                $resopnseBody = $this->getInvoices();
            break;
            case "campaigns":
                $resopnseBody = $this->getCampgaigns();
            break;
            case "campaigns/products":
                $resopnseBody = $this->getProducts();
            break;
            case "campaigns/revenue":
                $resopnseBody = $this->getRevenue();
            break;
            case "campaigns/performance":
                $resopnseBody = $this->getRevenue();
            break;
            case "campaigns/activity":
                $resopnseBody = $this->getActivity();
            break;
            case "campaigns/logs":
                $resopnseBody = $this->getCampgaignLogs();
            break;
            case "settings/domains":
                $resopnseBody = $this->getDomains();
            break;
            case "settings/domains/verify":
                $resopnseBody = $this->getDomainVerify();
            break;
            case "stats":
                $resopnseBody = $this->getStats();
            break;
            case "customers":
                $resopnseBody = $this->getCustomers();
            break;
        }
        
        return $resopnseBody;
        
    }

    protected function getRevenue()  
    {  

        // use the factory to create a Faker\Generator instance
        $faker = Container::getInstance()->make(Generator::class);

        $revenue = array(
            "labels" => array(
                "14 Dec",
                "19 Dec",
                "23 Dec",
                "27 Dec",
                "2 Jan",
                "5 Jan"
            ),
            "datasets" => array(
                array(
                    "label" => "Dataset 1",
                    "borderColor" => "rgba(0, 0, 0, 1)",
                    "backgroundColor" => "rgba(0, 0, 0, 1)",
                    "data" => [
                      $faker->numberBetween(0, 100),
                      $faker->numberBetween(0, 100),
                      $faker->numberBetween(0, 100),
                      $faker->numberBetween(0, 100),
                      $faker->numberBetween(0, 100),
                      $faker->numberBetween(0, 100)
                    ]
                ),
                array(
                    "label" => "Dataset 2",
                    "borderColor" => "rgba(146, 100, 222, 1)",
                    "backgroundColor" => "rgba(146, 40, 222, 1)",
                    "data" => [
                      $faker->numberBetween(0, 100),
                      $faker->numberBetween(0, 100),
                      $faker->numberBetween(0, 100),
                      $faker->numberBetween(0, 100),
                      $faker->numberBetween(0, 100),
                      $faker->numberBetween(0, 100)
                    ]
                ),
                array(
                    "label" => "Dataset 3",
                    "borderColor" => "rgba(75, 212, 251, 1)",
                    "backgroundColor" => "rgba(75, 212, 251, 1)",
                    "data" => [
                      $faker->numberBetween(0, 100),
                      $faker->numberBetween(0, 100),
                      $faker->numberBetween(0, 100),
                      $faker->numberBetween(0, 100),
                      $faker->numberBetween(0, 100),
                      $faker->numberBetween(0, 100)
                    ]
                )
            )
        );

        return $revenue;
        
    }  
    
    protected function getDomains()  
    {  
        
        $domains = array(
            array(
                "domain"        => 'uicollab.com',
                "host"          => 'uicollab.com',
                "type"          => "TXT",
                "value"         => "unique-string",
                "status"        => "verified",
                "verify-type"   => "dns",
                "current-used"  => "check"
            ),
            array(
                "domain"        => 'migroserv.com',
                "host"          => 'migroserv.com',
                "type"          => "TXT",
                "value"         => "unique-string",
                "status"        => "verified",
                "verify-type"   => "dns",
                "current-used"  => "check"
            )
        );

        return $domains;
    }  

    protected function getDomainVerify()
    {
        
        $response = array();
        
        if (isset($this->queryParams['domain'])) {
            $domain = $this->queryParams['domain'];
            $response = array(
                "domain"        => strtolower($domain),
                "host"          => strtolower($domain),
                "type"          => "TXT",
                "value"         => "unique-string",
                "status"        => "pending",
                "verify-type"   => "dns",
                "current-used"  => "check"
            );
        }
        
        return $response;
        
    }
    
    protected function getCampgaignLogs() 
    {
 
        $response = array(
            array(
                "time"      => "08:42",
                "color"     => "#4BD4FB",
                "message"   => "New order placed"
            ),
            array(
                "time"      => "07:50",
                "color"     => "#4BD4FB",
                "message"   => "New order placed"
            ),
            array(
                "time"      => "07:30",
                "color"     => "#FFE58F",
                "message"   => "New customer sign up"
            ),
            array(
                "time"      => "07:00",
                "color"     => "#4BD4FB",
                "message"   => "New order placed"
            ),
            array(
                "time"      => "06:50",
                "color"     => "#FF3B30",
                "message"   => "Order canceled"
            ),
    
            array(
                "time"      => "05:42",
                "color"     => "#4BD4FB",
                "message"   => "New order placed"
            ),
            array(
                "time"      => "04:50",
                "color"     => "#4BD4FB",
                "message"   => "New order placed"
            ),
            array(
                "time"      => "04:20",
                "color"     => "#FFE58F",
                "message"   => "New customer sign up"
            ),
            array(
                "time"      => "04:00",
                "color"     => "#4BD4FB",
                "message"   => "New order placed"
            ),
            array(
                "time"      => "03:50",
                "color"     => "#FF3B30",
                "message"   => "Order canceled"
            ),
        );
        
        return $response;
        
    }
    
    protected function getActivity() {
  
        $response = array(
            array(
                "time"      => "08:42",
                "color"     => "#4BD4FB",
                "message"   => " opened the email Winback 3"
            ),
            array(
                "time"      => "07:50",
                "color"     => "#4BD4FB",
                "message"   => " went to the site through a link in the email"
            ),
            array(
                "time"      => "07:30",
                "color"     => "#FFE58F",
                "message"   => " opened the email Winback 2"
            ),
            array(
                "time"      => "07:00",
                "color"     => "#4BD4FB",
                "message"   => " went to the site through a link in the email"
            ),
            array(
                "time"      => "06:50",
                "color"     => "#FF3B30",
                "message"   => " opened the email Winback 3"
            ),
    
            array(
                "time"      => "05:42",
                "color"     => "#4BD4FB",
                "message"   => " opened the email Winback 4"
            ),
            array(
                "time"      => "04:50",
                "color"     => "#4BD4FB",
                "message"   => " opened the email Winback 3"
            ),
            array(
                "time"      => "04:20",
                "color"     => "#FFE58F",
                "message"   => " went to the site through a link in the email"
            ),
            array(
                "time"      => "04:00",
                "color"     => "#4BD4FB",
                "message"   => " went to the site through a link in the email"
            ),
            array(
                "time"      => "03:50",
                "color"     => "#FF3B30",
                "message"   => " opened the email Winback 3"
            ),
        );
        
        return $response;
    }
    
    protected function getProducts() {
    
        $response = array(
            array(
                "icon"  => "/assets/icons/icon-1.svg",
                "name"  => "Red shoes",
                "qty"   => "10",
                "price" => "49.00",
            ),
            array(
                "icon"  => "/assets/icons/icon-2.svg",
                "name"  => "Teddy bear",
                "qty"   => "5",
                "price" => "15.00",
            ),
            array(
                "icon"  => "/assets/icons/icon-3.svg",
                "name"  => "Leather shoes",
                "qty"   => "3",
                "price" => "49.00",
            ),
            array(
                "icon"  => "/assets/icons/icon-4.svg",
                "name"  => "Digital camera",
                "qty"   => "2",
                "price" => "549.00",
            ),
            array(
                "icon"  => "/assets/icons/icon-1.svg",
                "name"  => "Red shoes",
                "qty"   => "6",
                "price" => "49.00",
            ),
            array(
                "icon"  => "/assets/icons/icon-2.svg",
                "name"  => "Teddy bear",
                "qty"   => "7",
                "price" => "15.00",
            ),
            array(
                "icon"  => "/assets/icons/icon-3.svg",
                "name"  => "Leather shoes",
                "qty"   => "3",
                "price" => "49.00",
            ),
            array(
                "icon"  => "/assets/icons/icon-4.svg",
                "name"  => "Digital camera",
                "qty"   => "6",
                "price" => "549.00",
            ),
            array(
                "icon"  => "/assets/icons/icon-3.svg",
                "name"  => "Leather shoes",
                "qty"   => "3",
                "price" => "49.00",
            ),
            array(
                "icon"  => "/assets/icons/icon-4.svg",
                "name"  => "Digital camera",
                "qty"   => "2",
                "price" => "549.00",
            ),
            array(
                "icon"  => "/assets/icons/icon-1.svg",
                "name"  => "Red shoes",
                "qty"   => "60",
                "price" => "49.00",
            ),
            array(
                "icon"  => "/assets/icons/icon-2.svg",
                "name"  => "Teddy bear",
                "qty"   => "3",
                "price" => "15.00",
            ),
            array(
                "icon"  => "/assets/icons/icon-3.svg",
                "name"  => "Leather shoes",
                "qty"   => "1",
                "price" => "49.00",
            ),
            array(
                "icon"  => "/assets/icons/icon-4.svg",
                "name"  => "Digital camera",
                "qty"   => "70",
                "price" => "549.00",
            )
        );
        
        return $response;
        
    }
    
    protected function getUserData() {
        
        $response = [
            "id"        => 1,
            "email"     => "astrit.lala88@gmail.com",
            "firstname" => "Astrit",
            "lastname"  => "Lala",
            "avatar"    => "path.jpg",
            "company"   => "Company Name",
            "position"  => "Developer",
            "shop"      => array(
                "id"        => "10",
                "url"       => "https://shop.dev.anomate.co",
                "membership"=> "1",
            ),
            "campaigns" => $this->getCampgaigns()
        ];
        
        return $response;
        
    }
    
    protected function getStats() {
            
        $response = [
            [
                "icon"        => "/assets/icons/icon-revenue.svg",
                "value"       => "£150,000",
                "title"       => "Revenue",
                "performance" => '<div class="alert alert-danger"><i class="ai-arrow-down"></i> 43.8% </div>',
            ],
            [
                "icon"        => "/assets/icons/icon-customers.svg",
                "value"       => "43",
                "title"       => "New customers",
                "performance" => '<div class="alert alert-success"><i class="ai-arrow-up"></i>  43.8% </div>',
            ],
            [
                "icon"        => "/assets/icons/icon-orders.svg",
                "value"       => "154",
                "title"       => "Orders sold",
                "performance" => '<div class="alert alert-danger"><i class="ai-arrow-down"></i>  43.8% </div>',
            ],
            [
                "icon"        => "/assets/icons/icon-sold.svg",
                "value"       => "12",
                "title"       => "Items sold",
                "performance" => '<div class="alert alert-danger"><i class="ai-arrow-down"></i>  43.8% </div>',
            ],
            [
                "icon"        => "/assets/icons/icon-order-value.svg",
                "value"       => "£26.40",
                "title"       => "Order value",
                "performance" => '<div class="alert alert-success"><i class="ai-arrow-up"></i>  43.8% </div>',
            ],
            [
                "icon"        => "/assets/icons/icon-order-items.svg",
                "value"       => "£150,000",
                "title"       => "Average order items",
                "performance" => '<div class="alert alert-success"><i class="ai-arrow-up"></i>  43.8% </div>',
            ],
            [
                "icon"        => "/assets/icons/icon-ltv.svg",
                "value"       => "1.08",
                "title"       => "Average customer LTV",
                "performance" => '<div class="alert alert-success"><i class="ai-arrow-up"></i>  43.8% </div>',
            ],
            [
                "icon"        => "/assets/icons/icon-customers-orders.svg",
                "value"       => "£150,000",
                "title"       => "Average customers orders",
                "performance" => '<div class="alert alert-danger"><i class="ai-arrow-down"></i>  43.8% </div>',
            ],
        ];
        
        return $response;
        
    }
    
    protected function getCampgaignsPerformance() {
        
        // use the factory to create a Faker\Generator instance
        $faker = Container::getInstance()->make(Generator::class);
        
        $campaigns = $this->getCampgaigns();
        
        $cmpPerformance = array();
        
        $cmpStatuses = array(
            '<div class="alert alert-success"> Active </div>',
            '<div class="alert alert-danger"> Inactive </div>',
        );
        
        for ($i = 0; $i < count($campaigns); $i++) {
            $date = $faker->dateTimeBetween('-1 week', '+1 week');
            if (isset($campaigns[$i])) {
                $randomCMP = $campaigns[$i];
                array_push($cmpPerformance,array(
                    "icon"          => $randomCMP['icon'],
                    "name"          => $randomCMP['title'],
                    "created_at"    => date_format($date,"Y/m/d H:i:s"),
                    "sent"          => $faker->numberBetween(0, 100),
                    "open"          => $faker->numberBetween(0, 100)."/".$faker->numberBetween(0, 100)."%",
                    "clicked"       => $faker->numberBetween(10, 100)." (10%)",
                    "unsubscribed"  => $faker->numberBetween(100, 1000)."/12.5%",
                    "status"        => $cmpStatuses[$faker->numberBetween(0,1)],
                    "impressions"   => $faker->numberBetween(100, 1000),
                    "engagement"    => $faker->numberBetween(10, 100)." (10%)"
                ));
            }
        }
        
        
        return $cmpPerformance;
        
    }

    protected function getCampgaigns() {
        
        // use the factory to create a Faker\Generator instance
        $faker = Container::getInstance()->make(Generator::class);
        
        $response = [
            [
                "icon"        => "/assets/icons/icon-1.svg",
                "title"       => "Win back old customers",
                "description" => "Baby, give me one more chance. Engage with your old customers and offer them something they can’t refuse."
            ],
            [
                "icon"        => "/assets/icons/icon-2.svg",
                "title"       => "Cart abandonment reminder",
                "description" => "Give your customers the gentle nudge they need to make the purchase."
            ],
            [
                "icon"        => "/assets/icons/icon-3.svg",
                "title"       => "Product review",
                "description" => "You don’t need to air your dirty laundry. Boost the positive reviews, and work on the negative reviews internally."
            ],
            [
                "icon"        => "/assets/icons/icon-4.svg",
                "title"       => "Price drop notification",
                "description" => "Few things make us smile: a warm cup of coffee, birthday presents, and a notification that tells us our favorite product is on sale."
            ],
            [
                "icon"        => "/assets/icons/icon-5.svg",
                "title"       => "Welcome new customers",
                "description" => "It’s their first day in your family. Offer your new customers the support, insights, and offers they need to love you."
            ],
            [
                "icon"        => "/assets/icons/icon-6.svg",
                "title"       => "Re-engage old customers",
                "description" => "Some relationships fizzle down, but we’re not going to let that happen with your customers."
            ],
            [
                "icon"        => "/assets/icons/icon-7.svg",
                "title"       => "Upsell to target customers",
                "description" => "It doesn’t have to end with ‘thank you for shopping with us’."
            ],
            [
                "icon"        => "/assets/icons/icon-8.svg",
                "title"       => "Remind customers to checkout",
                "description" => "If you’re married, you’ll know that no chore gets done without at least 8 reminders."
            ],
            [
                "icon"        => "/assets/icons/icon-9.svg",
                "title"       => "Generate new subscribers",
                "description" => "Use savvy pop-ups that get your customers clicking with joy."
            ],
            [
                "icon"        => "/assets/icons/icon-10.svg",
                "title"       => "Survey your customers",
                "description" => "To serve your customers, you need to get to know them. We conduct user surveys to let your customers know they are heard."
            ],
            [
                "icon"        => "/assets/icons/icon-11.svg",
                "title"       => "Boost product reviews",
                "description" => "Product reviews work like a charm. The positive reviews bring more customers and the negative reviews allow you to improve."
            ],
            [
                "icon"        => "/assets/icons/icon-12.svg",
                "title"       => "Promote giveaway competitions",
                "description" => "Giveaway campaigns can work wonders in incentivizing customers to increase engagement."
            ],
        ];
        
        return $response;
        
    }


    protected function getInvoices() {
        
        // use the factory to create a Faker\Generator instance
        $faker = Container::getInstance()->make(Generator::class);
        
        $customers = array();
        
        $invoiceStatus = array(
            '<div class="alert alert-success"> Paid </div>',
            '<div class="alert alert-danger"> Failed </div>',
            '<div class="alert alert-warning"> Pending </div>',
        );
        
        if (!isset($this->queryParams['length'])) {
            $this->queryParams['length'] = 10;
        }
        
        for ($i = 0; $i < $this->queryParams['length']; $i++) {
            
            $date = $faker->dateTimeThisYear('-1 months');
            
            array_push($customers,array(
                'Mini Biz Rejuve',
                'Billing cycle '.date_format($date,"M Y"),
                date_format($date,"M Y"),
                $invoiceStatus[$faker->numberBetween(0,2)],
                "£".$faker->randomFloat(1, 200, 300),
            ));
            
        }
    
        if (!isset($this->queryParams['draw'])) {
            $this->queryParams['draw'] = 8;
        }
        
        $response = array(
            "draw"  => $this->queryParams['draw'],
            "recordsTotal" => 300,
            "recordsFiltered" => 300,
            "data" => $customers
        );
        
        return $response;
        
    }

    protected function getCustomers() {
        
        // use the factory to create a Faker\Generator instance
        $faker = Container::getInstance()->make(Generator::class);
        
        $customers = array();
        
        $customerType = array(
            '<div class="alert alert-success"> One time buyer </div>',
            '<div class="alert alert-danger"> Occasional Buyer </div>',
            '<div class="alert alert-warning"> Frequent buyer </div>',
            '<div class="alert alert-info"> VIP </div>',
        );
        
        if (!isset($this->queryParams['length'])) {
            $this->queryParams['length'] = 10;
        }
        
        for ($i = 0; $i < $this->queryParams['length']; $i++) {
            $date = $faker->dateTimeBetween('-1 week', '+1 week');
            
            array_push($customers,array(
                $faker->name(),
                $faker->email(),
                $customerType[$faker->numberBetween(0,3)],
                $faker->numberBetween(0, 100),
                "£".$faker->randomFloat(1, 20, 30),
                date_format($date,"Y/m/d H:i:s")
            ));
            
        }
    
        if (!isset($this->queryParams['draw'])) {
            $this->queryParams['draw'] = 8;
        }
        
        $response = array(
            "draw"  => $this->queryParams['draw'],
            "recordsTotal" => 300,
            "recordsFiltered" => 300,
            "data" => $customers
        );
        
        return $response;
        
    }

    
    public function head(Request $request,$apiPath)
    {

    }
    
    public function put(Request $request,$apiPath)
    {

    }
    
    public function delete(Request $request,$apiPath)
    {

    }
    
    public function options(Request $request,$apiPath)
    {
 
    }
    
    public function patch(Request $request,$apiPath)
    {

    }
    
    protected function apiCallBack() 
    {
        // Return response and set header to JSON 
        return response()->json($this->responseResults)->header('Content-Type','application/json');
    }

}
