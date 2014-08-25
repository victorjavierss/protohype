<?php

    header("Content-Type application/json");
  //echo getcwd();
    require 'OoyalaSignature.php';


  //  var_dump(get_declared_classes());
	
	$api_key = "01bXExOlsXvZN75zdTp-QCTJeOVQ.oTUFr";
	$api_secret = "udHaAhi35KFOQLK2DYViVe5WgRTCseLQp-c6HKV_";
	$expires = strtotime("+100 minutes"); 
	
	$api_path = '/v2/'.$_GET['path'];
	$method = $_GET['method'];
	   		
	$OoyalaAPI = new OoyalaAPI;
	$request_url = $OoyalaAPI->generateURL($method,$api_key,$api_secret,$expires,$api_path,'');
	
 	
 	$url = $request_url;
    $ch = curl_init($url);
            curl_setopt ($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt ($ch, CURLOPT_HTTPHEADER, Array("Content-Type: application/json"));
            //Can be PUT/POST/PATCH
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);

    try {
        echo httpRequest($ch);
    } catch (Exception $e) {
        throw $e;
    }
        
	function httpRequest($ch){
            $response = curl_exec($ch);
 
            if(curl_error($ch)){
                $error = curl_error($ch); 
                curl_close($ch);
				return $error;
        	}
 
            $head=curl_getinfo($ch);
            //$content = $head["content_type"];//application/json
            $code = $head["http_code"];//200
            curl_close($ch);
			return $response;
    }
?>