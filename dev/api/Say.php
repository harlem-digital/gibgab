<?php
class Say {

    /*
    * @url GET /
    */
    function hello($to='world') {
        return "Hello $to!";
    }

    function hi($to) {
        return  "Hi $to!";
    }
}