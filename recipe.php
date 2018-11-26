<?php

require_once __DIR__ . '/common.php';

task('deploy', function() {
  echo run("cd {{deploy_path}}; sudo git fetch origin {{deploy_branch}}; sudo git reset --hard FETCH_HEAD; sudo git clean -df; sudo git pull origin {{deploy_branch}}; sudo yarn install --silent; cd {{deploy_path}}/client; sudo yarn install --silent; sudo yarn run build; sudo pm2 delete sitelab");
  echo run("cd /opt/web && sudo pm2 start process.yml");
})->desc('Deploying...');

after('deploy', 'success');
