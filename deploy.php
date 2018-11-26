<?php
date_default_timezone_set('Asia/Manila');

// APPLICATION
define('APPLICATION', 'SITELAB WEB');

// STAGING CONFIG
define('STG_DEP_HOST', '52.63.201.136');
define('STG_DEP_PORT', 22);
define('STG_DEP_DEPLOY_PATH', '/opt/web');
define('STG_DEP_PEM_FILE', './sitelab.pem');
define('STG_DEP_USER', 'ubuntu');
define('STG_DEP_BRANCH', 'master');
define('STG_DEP_REPOSITORY', 'ssh://git-codecommit.ap-southeast-2.amazonaws.com/v1/repos/web');

// PRODUCTION CONFIG
define('PROD_DEP_HOST', '52.63.201.136');
define('PROD_DEP_PORT', 22);
define('PROD_DEP_DEPLOY_PATH', '/opt/web');
define('PROD_DEP_PEM_FILE', './sitelab.pem');
define('PROD_DEP_USER', 'ubuntu');
define('PROD_DEP_BRANCH', 'master');
define('PROD_DEP_REPOSITORY', 'ssh://git-codecommit.ap-southeast-2.amazonaws.com/v1/repos/web');

$host 		= STG_DEP_HOST;
$port 		= STG_DEP_PORT;
$user 		= STG_DEP_USER;
$pemFile 	= STG_DEP_PEM_FILE;
$depPath 	= STG_DEP_DEPLOY_PATH;
$depRepo 	= STG_DEP_REPOSITORY;
$depBranch 	= STG_DEP_BRANCH;
$stage 		= !empty($argv[2]) ? $argv[2] : null;
$app		= null;
$branch		= null;

if (!empty($argv[2])) {
	$part = explode(':', $argv[2]);
	$currentStage = !empty($part[0]) ? $part[0] : null;
	$branch = !empty($part[2]) ? $part[2] : null;

	define('APP_STAGE', $currentStage);

	if (count($part) === 0) {
		exit('Format must be `php dep deploy stg` e.g. `php dep deploy prod` or `php dep deploy stg:<branch>`' . "\n");
	}
	if ($currentStage != 'stg' && $currentStage != 'prod' ) {
		exit('Deployment stage must be \'stg\' or \'prod\'' . "\n");
	}

	if ($currentStage == 'prod') {
		$host 			= PROD_DEP_HOST;
		$port 			= PROD_DEP_PORT;
		$pemFile 		= PROD_DEP_PEM_FILE;
		$depPath 		= PROD_DEP_DEPLOY_PATH;
		$depRepo 		= PROD_DEP_REPOSITORY;
		$depBranch 	= PROD_DEP_BRANCH;
	}

	if ($branch) {
		$depBranch = $branch;
	}

	$depPath .= $app . '/';
 
	define('CURRENT_APP', strtoupper($app));
	define('CURRENT_STAGE', strtoupper($currentStage));
	define('CURRENT_BRANCH', $branch);
}

require 'recipe.php';

set('keep_releases', 1);

server('ec2', $host, $port)
    ->user($user)
    ->forwardAgent()
    ->pemFile($pemFile)
    ->stage($stage)
    ->env('deploy_path', $depPath)
	->env('deploy_branch', $depBranch)
	->env('branch', $branch);
 
set('repository', $depRepo);
