<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Origin: https://testingscandi.000webhostapp.com");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

include('server.php');

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->action)) {
  echo json_encode(["message" => "Invalid input"]);
  http_response_code(400);
} else {
  if ($data->action === "DELETE") {
    if (!isset($data->product_id)) {
      echo json_encode(["message" => "Invalid input"]);
      http_response_code(400);
    } else {
      // Process the DELETE action here
      $product_ids = is_array($data->product_id) ? $data->product_id : [$data->product_id];
      
      // Sanitize the product IDs
      // $sanitized_ids = array_map('intval', $product_ids);

      $idsStr = implode(",", $product_ids);

      $query = "DELETE FROM product WHERE product_id IN ({$idsStr})";

      $result = mysqli_query($conn, $query);

      if (!$result) {
          die('Error: ' . mysqli_error($conn));
      }

      if (mysqli_affected_rows($conn) > 0) {
          echo json_encode(["message" => "Products deleted successfully"]);
          http_response_code(200);
      } else {
          echo json_encode(["message" => "No products deleted"]);
          http_response_code(404);
      }
    }
  } else {
    echo json_encode(["message" => "Invalid action"]);
    http_response_code(400);
  }
}