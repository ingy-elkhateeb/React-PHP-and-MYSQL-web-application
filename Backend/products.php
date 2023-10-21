<?php
abstract class AbstractProducts {
    protected string $SKU;
    protected string $Name;
    protected float $Price;
   
    function __construct($SKU, $Name, $Price){

        $this->SKU = $SKU;
        $this->Name = $Name;
        $this->Price = $Price;
        
    }
    abstract public function addProduct();
    abstract public function getProduct();

}