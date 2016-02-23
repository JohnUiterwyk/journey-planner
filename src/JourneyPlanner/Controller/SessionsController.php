<?php
/**
 * Created by PhpStorm.
 * User: johnuiterwyk
 * Date: 2/16/16
 * Time: 9:46 PM
 */

namespace JourneyPlanner\Controller;


use JourneyPlanner\Model\UserModel;
use JourneyPlanner\TokenGenerator;
use ORM;
use Slim\Http\Request;
use Slim\Http\Response;

class SessionsController extends ApiController
{

    /**
     * __invoke is called by slim when a route matches
     * @param $request Request
     * @param $response Response
     * @param $args array
     * *
     * @return $response \Slim\Http\Response
     */
    public function __invoke(Request $request, Response $response, array $args)
    {
        parent::__invoke($request, $response, $args);

        if($request->isPost())
        {

            $this->createSession($request->getParsedBody());
        }

        if($request->isGet() && isset($args['api_key']))
        {
            $this->getSession($args['api_key']);
        }

        if($request->isDelete() && isset($args['id']))
        {
            $this->deleteSession($args['id']);
        }

        return $response;
    }

    private function createSession($data)
    {
        if(isset($data['username']) && isset($data['password']))
        {
            $result = UserModel::authenticateUser($data['username'], $data['password']);
            //if successful, it returns the api key, otherwise it returns false
            if($result !== false)
            {
                unset($result['password_hash']);
                $this->writeSuccess($result);
            }else
            {
                $this->writeFail("Authentication failed");
            }
        }else
        {
            $this->writeFail("Authentication failed");
        }


    }

    private function getSession($apiKey)
    {
        $user = UserModel::getUserWithApiKey($apiKey);
        unset($user['password_hash']); //remove password_hash

        if($user === false)
        {
            $this->writeFail("invalid api key");
        }else
        {
            $this->writeSuccess($user);
        }
    }


    private function deleteSession($apiKey)
    {
        UserModel::resetApiKey($apiKey);
        $this->writeSuccess("Session deleted.");
    }
}