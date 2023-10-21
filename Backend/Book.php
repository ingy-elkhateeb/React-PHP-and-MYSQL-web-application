<?php
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Origin: https://testingscandi.000webhostapp.com");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

header("Content-Type: application/json; charset=UTF-8");

include('server.php');
include_once('products.php');
class Book extends AbstractProducts{
    protected string $Weight;
    protected string $Description;
    private static $BookInstance;

    function __construct($SKU, $Name,  $Price, $Weight, $Description){
        parent::__construct($SKU, $Name, $Price);
        $this->Weight=$Weight;
        $this->Description = $Description;

        if (self::$BookInstance === NULL){
            self::$BookInstance = $this;
        }
    }

    public static function getBookInstance(){
        if (!isset(self::$BookInstance)) {
            self::$BookInstance = new self("", "", 0, "", "");
        }
        return self::$BookInstance;
    }

    public function addProduct() {
        global $conn,$data; 

        $this->SKU = $data->SKU;
        $this->Name = $data->Name;
        $this->Price = $data->Price;
        $this->Weight = $data->Weight;
        $this->Description = $data->Book_description;
        
        $query = "INSERT INTO product (SKU, name, price, type, attribute, attribute_value, product_description)
                  VALUES ('$this->SKU', '$this->Name', $this->Price, 'Book', 'KG', '$this->Weight', '$this->Description')";
        
        $result = mysqli_query($conn, $query);
        
        if ($result) {
            $response = array('status' => 'valid');
            echo json_encode($response);
        } else {
            $response = array('status' => 'invalid', 'message' => 'Missing attributes');
            echo json_encode($response);
        }
    }
    public function getProduct() {
        global $conn; 
        
        $query = "SELECT SKU, name, product_id, price,type, attribute_value, product_description
                  FROM product
                  WHERE type='Book'";
        
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
            $op .= '"Weight":"' . $rs["attribute_value"] . '",';
            $op .= '"Book_description":"' . $rs["product_description"] . '",';
            $op .= '"Price":"' . $rs["price"] . '"}';
          
        }
        $op='{"records":['.$op.',';
        echo $op ;
        
   
}
}

$book= Book::getBookInstance();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    if (isset($data->Name) && isset($data->SKU) && isset($data->Price) && isset($data->Weight) && isset($data->Book_description)) {
        $book->addProduct();
    } else {
        $response = array('status' => 'invalid');
        echo json_encode($response);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') { 
    $book->getProduct();
} else {
    $response = array('status' => 'invalid');
    echo json_encode($response);
}