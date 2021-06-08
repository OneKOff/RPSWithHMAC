<?php
foreach (glob('*') as $file)
{
    echo $file, " ";
    $fileContent = file_get_contents($file);
    echo hash('sha3-256' , $fileContent), "\n";
}
?>