<?php
    $dbHost = "localhost";
    $dbUsername = "phpmyadmin";
    $dbPassword = "kien121999";
    $database = "test";

    $connect = mysqli_connect($dbHost, $dbUsername, $dbPassword, $database) or die("Cannot connect to database");
?>