<?php
/**
 * Created by PhpStorm.
 * User: johnuiterwyk
 * Date: 2/15/16
 * Time: 10:47 PM
 */

namespace JourneyPlanner\Controller;

use JourneyPlanner\Model\User;
use JourneyPlanner\Model\UserModel;
use ORM;
use Respect\Validation\Exceptions\NestedValidationException;
use Respect\Validation\Exceptions\ValidationException;
use Respect\Validation\Validator as v;
use Slim\Http\Request;
use Slim\Http\Response;

class UsersController extends ApiController
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
        $this->response =  parent::__invoke($request, $response, $args);

        //create
        if($request->isPost())
        {
            $this->createUser($request->getParsedBody());
        }

        //read
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

        //update
        if($request->isPut())
        {
            $this->updateUser($request->getParsedBody());
        }

        //delete
        if($request->isDelete() && isset($args['id']))
        {
            $this->deleteUser($args['id']);
        }

        return $this->response;
    }

    /**
     * @param $data array
     */

    public function createUser(array $data)
    {
        $stringValidator = v::create();
        $stringValidator->stringType()->length(1,128);

        $userValidator = v::create();
        $userValidator->key('username', $stringValidator);
        $userValidator->key('fullname', $stringValidator);
        $userValidator->key('password', $stringValidator);


        try
        {
            $userValidator->assert($data);

            //check if username is available
            if(UserModel::isUsernameAvailable($data['username']) === true)
            {
                //create user
                $newUserId = UserModel::createUser($data['username'],$data['password'], $data['fullname']);

                // return the new user id
                $this->writeSuccess(['id'=>$newUserId]);

            }else
            {
                $this->writeFail("Username already exists.");
            }
        }catch(NestedValidationException $exception)
        {
            $this->writeFail($exception->getMessages());
            return;
        }

    }

    /**
     * @param $userId int
     */

    public function getUser($userId)
    {
        if(v::numeric()->validate($userId))
        {
            $result = UserModel::getUser($userId);
            if($result !== false)
            {
                $this->writeSuccess($result);
            }else
            {
                $this->writeFail("User not found.");
            }
        }else
        {
            $this->writeFail("Invalid id.");
        }
    }

    /**
     */
    public function getAllUsers()
    {
        if($this->isUserAuthenticated() && $this->currentUser->isAdmin())
        {
            $this->writeSuccess(UserModel::getUsers());

        }else
        {
            $this->writeUnauthorized();
        }
    }



    /**
     * @param $data array
     *
     */

    public function updateUser(array $data)
    {

        $stringValidator = v::stringType()->length(1,128);

        $idValidator = v::numeric();

        $userValidator = v::create();
        $userValidator->key('id', $idValidator);
        $userValidator->key('username', $stringValidator);
        $userValidator->key('fullname', $stringValidator);
        $userValidator->key('password', $stringValidator, false); //optional

        try {
            $userValidator->assert($data);

        }catch(NestedValidationException $exception)
        {
            $this->writeFail($exception->getMessages());
            return;
        }

        //see if username is changing if so, check it is available
        $currentUserData = UserModel::getUser($data['id']);
        if($data['username'] !== $currentUserData['username'] && UserModel::isUsernameAvailable($data['username']))
        {
            $this->writeFail(["Username is not available"]);
            return;
        }

        //then check the current user is either admin or editing his own
        if($this->isUserAuthenticated() && ($this->currentUser->isAdmin() || $this->currentUser->id === $data["id"]))
        {
            UserModel::updateUser($data);

        }else
        {
            $this->writeUnauthorized();
        }

    }

    /**
     * @param $userId int
     */
    public function deleteUser($userId)
    {
        if($this->isUserAuthenticated() && $this->currentUser->isAdmin())
        {
            if(UserModel::deleteUser($userId) === true)
            {
                $this->writeSuccess("Deleted user ".$userId);
            }else
            {
                $this->writeFail("User not found.");
            }

        }else
        {
            $this->writeUnauthorized();
        }
    }


}