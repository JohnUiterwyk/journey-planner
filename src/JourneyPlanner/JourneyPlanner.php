<?php
/**
 * Created by PhpStorm.
 * User: johnuiterwyk
 * Date: 2/12/16
 * Time: 3:45 PM
 */

namespace JourneyPlanner;

use ORM;
use PDO;
use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;

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
        $this->app = new App(AppConfig::$slimSettings);

        //configure app
        $this->setUpDatabase();
        $this->setUpRoutes();

        //run all the apps!
        $this->app->run();

    }
    public function setUpDatabase()
    {
        ORM::reset_db();
        ORM::configure('driver_options', array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
        $connectionString = "mysql:";
        $connectionString .= "host=".AppConfig::$databaseSettings['server'].";";
        $connectionString .= "port=".AppConfig::$databaseSettings['port'].";";
        $connectionString .= "dbname=".AppConfig::$databaseSettings['name'];

        ORM::configure($connectionString);
        ORM::configure('username', AppConfig::$databaseSettings['username']);
        ORM::configure('password', AppConfig::$databaseSettings['password']);
        ORM::configure('return_result_sets', true);
        ORM::configure('logging',true);
    }
    public function setUpRoutes()
    {
        $this->app->get('/',function(Request $request, Response $response, array $args)
        {
           $response->getBody()->write(file_get_contents(AppConfig::getPathToPublic().'/app.html'));
        });
        $this->app->any('/users/[{id}]', Controller\UsersController::class);
        $this->app->any('/sessions/[{api_key}]', Controller\SessionsController::class);
        $this->app->any('/trips/[id]', Controller\TripsController::class);
        $this->app->any('/trips/user/[{user_id}]', Controller\TripsController::class);
    }
}