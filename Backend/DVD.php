<?php
// header("Access-Control-Allow-Methods: POST, GET");
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Origin: https://testingscandi.000webhostapp.com");
// header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// header("Content-Type: application/json; charset=UTF-8");

include('server.php');
include_once('products.php'); 

class DVD extends AbstractProducts {
    protected string $Size;
    protected string $Description;
    private static $DvdInstance;
    
    private function __construct($SKU, $Name,  $Price, $Size, $Description) {
        parent::__construct($SKU, $Name, $Price);
        $this->Size = $Size;
        $this->Description = $Description;

        if (self::$DvdInstance === NULL){
            self::$DvdInstance = $this;
        }
        
    }

    public static function getDvdInstance(){
        if (!isset(self::$DvdInstance)) {
            self::$DvdInstance = new self("", "", 0, "", "");
        }
        return self::$DvdInstance;
    }
    
    public function addProduct() {
        global $conn,$data; 
        
        $this->SKU = $data->SKU;
        $this->Name = $data->Name;
        $this->Price = $data->Price;
        $this->Size = $data->size;
        $this->Description = $data->DVD_description;

        $query = "INSERT INTO product (SKU, name, price, type, attribute, attribute_value, product_description)
                  VALUES ('$this->SKU', '$this->Name', $this->Price, 'DVD', 'MB', '$this->Size', '$this->Description')";
        
        $result = mysqli_query($conn, $query);
        
        if ($result) {
            $response = array('status' => 'valid');
            echo json_encode($response);
        } else {
            $response = array('status' => 'invalid');
            echo json_encode($response);
        }
    }
    public function getProduct() {
        global $conn; 
        
        $query = "SELECT SKU, name, product_id, price,type, attribute_value, product_description
                  FROM product
                  WHERE type='DVD'";
        
        $result = mysqli_query($conn, $query);
        
        if (!$result) {
            die('Error: ' . mysqli_error($conn));
        }
        $op = "";

        while ($rs= mysqli_fetch_array($result)) {

            if ($op != ""){
                $op .= ",";
            }
            $op .='{"Name":"' . $rs["name"] . '",';
            $op .= '"SKU":"' . $rs["SKU"] . '",';
            $op .= '"product_id":"' . $rs["product_id"] . '",';
            $op .= '"size":"' . $rs["attribute_value"] . '",';
            $op .= '"DVD_description":"' . $rs["product_description"] . '",';
            $op .= '"Price":"' . $rs["price"] . '"}';
         
        }
        $op=''.$op.',';
        echo $op ;
    }
}

$dvd= DVD::getDvdInstance();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->Name) && isset($data->SKU) && isset($data->Price) && isset($data->size) && isset($data->DVD_description)) {
        $dvd->addProduct();
    } else {
        $response = array('status' => 'invalid');
        echo json_encode($response);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') { 
    $dvd->getProduct();
} else {
    $response = array('status' => 'invalid');
    echo json_encode($response);
}