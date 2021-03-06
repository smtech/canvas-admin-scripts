<html>
<body>
<pre>
<?php

define ('TOOL_NAME', 'List Users without SIS ID&rsquo;s');

require_once('config.inc.php');

debugFlag('START');

$users = callCanvasApiPaginated(
	CANVAS_API_GET,
	'/accounts/1/users'
);
$page = 1;

echo TOOL_NAME . PHP_EOL;
echo "name\tlogin_id\tid" . PHP_EOL;

do {
	$pageProgress = 'processing page ' . getCanvasApiCurrentPageNumber() . ' of ' . getCanvasApiLastPageNumber() . '...';
	debugFlag($pageProgress);
	
	foreach ($users as $user) {
		if (!isset($user['sis_user_id'])) {
			echo "{$user['name']}\t{$user['login_id']}\t{$user['id']}" . PHP_EOL;
		}
	}
	flush();
} while ($users = callCanvasApiNextPage());

debugFlag('FINISH');

?>
</pre>
</body>
</html>