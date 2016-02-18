<?php
/**
 * Created by PhpStorm.
 * User: johnuiterwyk
 * Date: 2/16/16
 * Time: 11:07 AM
 */

namespace JourneyPlanner\Controller;


use JourneyPlanner\Model\User;
use JourneyPlanner\Model\UserModel;
use JourneyPlanner\Util\ApiResponse;
use Slim\Container;
use Slim\Http\Request;
use Slim\Http\Response;

class ApiController
{

    /**
     * @var \Psr\Http\Message\StreamInterface
     */
    protected $body;

    /**
     * @var User
     */
    protected $currentUser;

    /**
     * @var Response
     */
    protected $response;


    /**
     * UserController constructor.
     * @param $container Container
     */
    public function __construct(Container $container)
    {

        $this->body = $container->response->getBody();
    }

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
        $this->response = $response;
        //check for api key
        $queryParams = $request->getQueryParams();
        if(isset($queryParams['api_key']))
        {
            $userData = UserModel::getUserWithApiKey($queryParams['api_key']);
            if($userData !== false)
            {
                $this->currentUser = new User($userData);
            }

        }

        return $this->response->withHeader('Content-type', 'application/json');
    }

    public function writeResponse(ApiResponse $apiResponse)
    {
        $this->body->write($apiResponse->toJSON());
    }

    public function writeSuccess($data = null)
    {
        $apiResponse = new ApiResponse();
        $apiResponse->setStatusSuccess();
        $apiResponse->setData($data);
        $this->body->write($apiResponse->toJSON());
    }


    public function writeFail($data = null)
    {
        $apiResponse = new ApiResponse();
        $apiResponse->setStatusFail();
        $apiResponse->setData($data);
        $this->body->write($apiResponse->toJSON());
    }

    public function writeUnauthorized()
    {
        $apiResponse = new ApiResponse();
        $apiResponse->setStatusFail();
        $apiResponse->setData("Unauthorized");
        $this->body->write($apiResponse->toJSON());
        $this->response = $this->response->withStatus(401);
    }

    public function isUserAuthenticated()
    {
        return $this->currentUser !== null;
    }
}