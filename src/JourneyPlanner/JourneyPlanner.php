<?php
/**
 * Created by PhpStorm.
 * User: johnuiterwyk
 * Date: 2/12/16
 * Time: 3:45 PM
 */

namespace JourneyPlanner;

use Slim\App;

class JourneyPlanner
{
    /**
     * @var \Slim\App $app Holds a reference to the Slim application object
     */
    private $app;

    /**
     *
     * The constructor is called in index.php and sets up the app
     *
     */
    public function __construct()
    {
        // we need to change the session_save_path
        // due to issues with how data is handled on AWS EC2 instances
        $dir = sys_get_temp_dir();
        session_save_path($dir);
        //session_cache_limiter(false);

        //start the session
        session_start();

        //get settings and instantiate app
        $settings = new AppSettings();
        $this->app = new App($settings->slimSettings);

        //configure app
        $this->setUpDependencies();
        $this->setUpRoutes();

        //run all the apps!
        $this->app->run();

    }
    public function setUpDependencies()
    {

    }
    public function setUpRoutes()
    {
        $this->app->any('/users[/{id}]', Controller\UsersController::class);
    }
}