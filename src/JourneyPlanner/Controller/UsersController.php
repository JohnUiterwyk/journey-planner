<?php
/**
 * Created by PhpStorm.
 * User: johnuiterwyk
 * Date: 2/15/16
 * Time: 10:47 PM
 */

namespace JourneyPlanner\Controller;

use JourneyPlanner\Model\UserModel;
use JourneyPlanner\Model\UsersModel;
use ORM;
use Slim\Http\Request;
use Slim\Http\Response;

class UsersController extends ApiController
{
    /**
     * @var ORM
     */
    private $userTable;

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
        if($request->isGet())
        {
            if(isset($args['id']))
            {
                $this->getUser($args['id']);
            }else
            {
                $this->getAllUsers();
            }
        }

        if($request->isDelete() && isset($args['id']))
        {
            $this->deleteUser($args['id']);
        }

        if($request->isPost())
        {
            $this->createUser($request->getParsedBody());
        }

        return parent::__invoke($request, $response, $args);
    }

    /**
     */

    /**
     * @param $userId int
     */
    public function createUser(array $data)
    {
        if(isset($data['username']) && isset($data['password']) && isset($data['fullname']))
        {
            //check if username exists
            if(UserModel::isUsernameAvailable($data['username']) === true)
            {
                //username unique
                //create user
                $newUserId = UserModel::createUser($data['username'],$data['password'], $data['fullname']);
                $this->writeSuccess(UserModel::getUser($newUserId));

            }else
            {
                $this->writeFail("Username already exists.");
            }
        }else
        {
            $this->writeFail("Required fields missing.");
        }

    }

    public function getAllUsers()
    {
        $this->writeSuccess(UserModel::getUsers());
    }

    /**
     * @param $userId int
     */
    public function getUser($userId)
    {
        $result = UserModel::getUser($userId);
        if($result !== false)
        {
            $this->writeSuccess($result);
        }else
        {
            $this->writeFail("User not found.");
        }
    }


    /**
     * @param $userId int
     */
    public function deleteUser($userId)
    {
        if(UserModel::deleteUser($userId) === true)
        {
            $this->writeSuccess("Deleted user ".$userId);
        }else
        {
            $this->writeFail("User not found.");
        }
    }


}