<?php
include('../libs/Config.php');
if(get('admin:auth')){
    if (!isset($_SERVER['PHP_AUTH_USER'])) {
        header("WWW-Authenticate: Basic realm=\"Tutorials.pufferfi.sh - Create Tutorial\"");
        header("HTTP/1.0 401 Unauthorized");
        echo '401 Unauthorized - No username/password supplied. Sorry.';
        exit;
    } else {
        if($_SERVER['PHP_AUTH_PW'] != trim(file_get_contents('../pass.txt'))){
            header("WWW-Authenticate: Basic realm=\"Tutorials.pufferfi.sh - Create tutorial.\"");
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
$tutorials = new Tutorials;
$id = $tutorials->getPeregrine()->post->getInt('id');
$page = $tutorials->page($id);
?>
<br/>
<a href="/_r/<?=$id?>/"><button class="button button-blue">View this page!</button></a>
<p>or</p>
<a href="/edit/<?=$id?>/"><button class="button button-green">Edit this page!</button></a>
<p>or</p>
<form method="post" action="/delete.php">
    <input type="number" style="display: none;" name="id" value="<?=$id?>" onclick="return confirm('Are you sure you want to delete this page? This can not be undone.');"/>
    <button type="submit" class="button button-red">Delete this page?</button>
<h2>Attachments</h2>
<ul>
    <?php foreach($page->getFiles() as $file):
        $fileName = $tutorials->attachmentName($page->getId(), $file);
        echo sprintf('<li><a href="/_file/%s/%s/%s">%s</a> <span class="detach" data-id="%s" data-subid="%s">X</span></li>', $page->getId(), $file, $fileName, $fileName, $page->getId(), $file);
    endforeach; ?>
</ul>
<h2>Views</h2>
<p>Total: <strong><?=$page->getViews();?></strong></p>
<ul>
<?php foreach($page->getAllViews() as $view): ?>
    <li><?=$view?></li>
<?php endforeach; ?>
</ul>