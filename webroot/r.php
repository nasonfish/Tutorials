<?php
if(isset($args[0])){
$id = $args[0];
include('../libs/Tutorials.class.php');
$tutorials = new Tutorials;
$page = $tutorials->page($id);
header(sprintf('Location: /tutorial/%s/%s/', $page->getTitleSlug(), $id));
} else {
    echo "I found no place to redirect you to.";
}
