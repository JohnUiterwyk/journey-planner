<?php
/**
 * Created by PhpStorm.
 * User: johnuiterwyk
 * Date: 2/12/16
 * Time: 3:47 PM
 */
namespace JourneyPlanner;

 class AppConfig
{
    public static $slimSettings =  [
            'settings' => [
                'displayErrorDetails' => true, // set to false in production


                // Monolog settings
                'logger' => [
                    'name' => 'slim-app',
                    'path' => __DIR__ . '/../logs/app.log',
                ]
            ]
        ];
    public static $databaseSettings = [
        'name' => "journey_planner",
        'testing' => "journey_planner_test",
        'server' => "localhost",
        'port' => "3306",
        'username' => "",
        'password' => ""
    ];

    public static function getPathToPublic()
    {
        return realpath(__DIR__)."/../../public";
    }

}
if($_SERVER["HTTP_HOST"] == "journey.codama.com")
{
}

 if (file_exists(__DIR__.'/AppConfigLocal.php')) {
     include_once(__DIR__.'/AppConfigLocal.php');
 }