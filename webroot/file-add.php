<?php
include('../libs/Config.php');
if(get('admin:auth')){
    if (!isset($_SERVER['PHP_AUTH_USER'])) {
        header("WWW-Authenticate: Basic realm=\"Tutorials.pufferfi.sh - Add file\"");
        header("HTTP/1.0 401 Unauthorized");
        echo '401 Unauthorized - No username/password supplied. Sorry.';
        exit;
    } else {
        if($_SERVER['PHP_AUTH_PW'] != file_get_contents('../pass.txt')){
            header("WWW-Authenticate: Basic realm=\"Tutorials.pufferfi.sh - Add file\"");
            header("HTTP/1.0 401 Unauthorized");
            echo "401 Unauthorized - Incorrect username/password. Sorry.";
            exit;
        }
    }
}
if(empty($_POST)){
    exit;
}
require('../libs/Tutorials.class.php');
require('../libs/Predis_Page.class.php');

$tutorials = new Tutorials;
$peregrine = $tutorials->getPeregrine();
$tutorials->attach(
    $peregrine->post->getRaw('text'),
    $peregrine->post->getInt('id'),
    $peregrine->post->getRaw('name')
);
header('Location: /files/'.$peregrine->post->getInt('id').'/');