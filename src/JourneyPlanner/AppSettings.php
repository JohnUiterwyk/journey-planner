<?php
/**
 * Created by PhpStorm.
 * User: johnuiterwyk
 * Date: 2/12/16
 * Time: 3:47 PM
 */
namespace JourneyPlanner;

class AppSettings
{
    public $debug = true;
    public $databaseName = "journey_planner";
    public $databaseNameTesting = "journey_planner_test";
    public $databasServer = "localhost";
    public $databasPort = "3306";
    public $databasUsername = "toptal";
    public $databasPassword = "toptal2016";
    public $slimSettings = [
        'settings' => [
            'displayErrorDetails' => true, // set to false in production

            // Renderer settings
            'renderer' => [
                'template_path' => __DIR__ . '/../templates/',
            ],

            // Monolog settings
            'logger' => [
                'name' => 'slim-app',
                'path' => __DIR__ . '/../logs/app.log',
            ],
        ],
    ];

    public function getPathToPublic()
    {
        return realpath(__DIR__)."/../../public";
    }

}
if($_SERVER["HTTP_HOST"] == "journey.codama.com")
{
}