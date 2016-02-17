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
        if($request->isGet() && isset($args['key']))
        {
            $this->getSession($args['key']);
        }

        if($request->isDelete() && isset($args['id']))
        {
            $this->deleteSession($args['id']);
        }

        if($request->isPost())
        {

            $this->createSession($request->getParsedBody());
        }

        return parent::__invoke($request, $response, $args);
    }

    private function getSession($key)
    {
        $result = ORM::for_table("session")->select('user_id')->where('key',$key)->find_one();
        if($result === false)
        {
            $this->writeFail("invalid key");
        }else
        {
            $this->writeSuccess(["user_id"=>$result]);
        }
    }

    private function createSession($data)
    {
        if(isset($data['username']) && isset($data['password']))
        {
            $result = UserModel::authenticateUser($data['username'], $data['password']);
            //first authenticate the user
            //if successful, it returns the api key, otherwise it returns false
            if($result !== false)
            {
                $this->writeSuccess(["api_key"=>$result]);
            }else
            {
                $this->writeFail("Authentication failed");
            }
        }else
        {
            $this->writeFail("Authentication failed");
        }


    }

    private function deleteSession($key)
    {
        UserModel::resetApiKey($key);
        $this->writeSuccess("Session deleted.");
    }
}