<?php
// header("Access-Control-Allow-Methods: POST, GET");
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Origin: https://testingscandi.000webhostapp.com/");
// header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
// header("Content-Type: application/json; charset=UTF-8");

include('server.php');
include_once('products.php');

class Furniture extends AbstractProducts {
    protected $Dimensions = ['Length' => 0, 'Width' => 0, 'Height' => 0];
    private static $FurnitureInstance;

    function __construct($SKU, $Name,  $Price, $Dimensions, $Description) {
        parent::__construct($SKU, $Name, $Price);
        $this->Dimensions = $Dimensions;
        $this->Description = $Description;

        if (self::$FurnitureInstance === NULL){
            self::$FurnitureInstance = $this;
        }
    }

    public static function getBookInstance(){
        if (!isset(self::$FurnitureInstance)) {
            self::$FurnitureInstance = new self("", "", 0, "", "");
        }
        return self::$FurnitureInstance;
    }

    public function addProduct() {
        global $conn, $data;
        $this->SKU = $data->SKU;
        $this->Name = $data->Name;
        $this->Price = $data->Price;
        $this->Dimensions = $data->Dimensions;
        $this->Description = $data->Furniture_description;
        // $string_dimensions = json_encode($this->Dimensions);
        $dimensions = json_encode([
            "Length" => $this->Dimensions->Length,
            "Width" => $this->Dimensions->Width,
            "Height" => $this->Dimensions->Height
        ]);

        $query = "INSERT INTO product (SKU, name, price, type, attribute, attribute_value, product_description)
                  VALUES ('$this->SKU', '$this->Name', $this->Price, 'Furniture', 'LxWxH', '$dimensions', '$this->Description')";

        $result = mysqli_query($conn, $query);

        if ($result) {
            $response = array('status' => 'valid');
            echo json_encode($response);
        } else {
            $error_message = mysqli_error($conn);
            $response = array('status' => 'invalid', 'error' => $error_message);
            echo json_encode($response);
        }
    }

    public function getProduct() {
        global $conn; 
        
        $query = "SELECT SKU, name, product_id, price,type, attribute_value, product_description
                  FROM product
                  WHERE type='Furniture'";
        
        $result = mysqli_query($conn, $query);

        if (!$result) {
            die('Error: ' . mysqli_error($conn)); 
        }
        $op = "";

        while($rs= mysqli_fetch_array($result)){

            if($op != "")
            {
                $op .= ",";
            }
            $op .='{"Name":"' . $rs["name"] . '",';
            $op .= '"SKU":"' . $rs["SKU"] . '",';
            $op .= '"product_id":"' . $rs["product_id"] . '",';
            $op .= '"Dimensions":' . $rs["attribute_value"] . ',';
            $op .= '"Furniture_description":"' . $rs["product_description"] . '",';
            $op .= '"Price":"' . $rs["price"] . '"}';
            
        
        }
        $op=''.$op.']}';
        echo $op ;
        
        
    }
}

$furniture= Furniture::getBookInstance();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->Name) && isset($data->SKU) && isset($data->Price) && isset($data->Dimensions) && isset($data->Furniture_description)) {
        $furniture->addProduct();
    } else {
        $response = array('status' => 'invalid', 'error' => 'Missing or invalid data fields.');
        echo json_encode($response);
    }
} elseif($_SERVER['REQUEST_METHOD'] === 'GET'){ 
    $furniture->getProduct();
} else {
    $response = array('status' => 'invalid', 'error' => 'Invalid request method.');
    echo json_encode($response);
}