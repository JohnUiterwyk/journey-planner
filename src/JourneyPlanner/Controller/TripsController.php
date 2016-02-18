<?php
/**
 * Created by PhpStorm.
 * User: johnuiterwyk
 * Date: 2/17/16
 * Time: 6:06 PM
 */

namespace JourneyPlanner\Controller;


use JourneyPlanner\Model\TripModel;
use Respect\Validation\Exceptions\NestedValidationException;
use Respect\Validation\Validator as v;
use Slim\Http\Request;
use Slim\Http\Response;

class TripsController extends ApiController
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
            $this->createTrip($request->getParsedBody());
        }
        elseif($request->isGet())
        {
            if(isset($args['id']))
            {
                $this->getTrip($args['id']);
            }elseif(isset($args['user_id']))
            {
                $this->getUserTrips($args['user_id']);
            }else
            {
                $this->getAllTrips();

            }
        }
        elseif($request->isPut())
        {
            $this->updateTrip($request->getParsedBody());
        }
        elseif($request->isDelete() && isset($args['id']))
        {
            $this->deleteTrip($args['id']);
        }

        return $this->response;
    }

    /**
     * @param $data
     */
    private function createTrip($data)
    {
        //check authorization
        if($this->isUserAuthenticated())
        {
            // user authenticated
            if($this->currentUser->isAdmin() == false)
            {
                $data['user_id'] = $this->currentUser->id;
            }
        }else
        {
            $this->writeUnauthorized();
            return;
        }

        // Create validators

        $stringValidator = v::create();
        $stringValidator->stringType();

        $idValidator = v::numeric();

        $dateValidator = v::date('Y-m-d');

        $tripValidator = v::create();
        $tripValidator->key('user_id', $idValidator);
        $tripValidator->key('destination', $stringValidator);
        $tripValidator->key('start_date', $dateValidator);
        $tripValidator->key('end_date', $dateValidator);
        $tripValidator->key('comment', $stringValidator);

        // run validation
        try {
            $tripValidator->assert($data);
            $newTripId = TripModel::createTrip($data);
            $this->writeSuccess(['id'=>$newTripId]);
        }catch(NestedValidationException $exception)
        {
            $this->writeFail($exception->getMessages());
            return;
        }



    }

    private function getTrip($tripId)
    {
        if(v::numeric()->validate($tripId))
        {
            $result = TripModel::getTrip($tripId);
            if($result !== false)
            {
                $this->writeSuccess($result);
            }else
            {
                $this->writeFail("Trip not found.");
            }
        }else
        {
            $this->writeFail("Invalid id.");
        }
    }

    private function getUserTrips($userId)
    {
        if(v::numeric()->validate($userId))
        {
            if ($this->isUserAuthenticated() && ($this->currentUser->isAdmin() || $this->currentUser->id === $userId))
            {
                $this->writeSuccess(TripModel::getUserTrips($userId));
            } else
            {
                $this->writeUnauthorized();
            }
        }
    }

    private function getAllTrips()
    {
        if($this->isUserAuthenticated() && $this->currentUser->isAdmin())
        {
            $this->writeSuccess(TripModel::getAllTrips());

        }else
        {
            $this->writeUnauthorized();
        }
    }

    private function updateTrip($data)
    {
        // Create validators

        $stringValidator = v::create();
        $stringValidator->stringType();

        $idValidator = v::numeric();

        $dateValidator = v::date('Y-m-d');

        $tripValidator = v::create();
        $tripValidator->key('user_id', $idValidator);
        $tripValidator->key('destination', $stringValidator);
        $tripValidator->key('start_date', $dateValidator);
        $tripValidator->key('end_date', $dateValidator);
        $tripValidator->key('comment', $stringValidator);

        // run validation
        try {
            $tripValidator->assert($data);
        }catch(NestedValidationException $exception)
        {
            $this->writeFail($exception->getMessages());
            return;
        }

        //then check the current user is either admin or editing his own
        if($this->isUserAuthenticated() && ($this->currentUser->isAdmin() || $this->currentUser->id === $data["user_id"]))
        {
            TripModel::updateTrip($data);

        }else
        {
            $this->writeUnauthorized();
        }
    }

    private function deleteTrip($tripId)
    {
        if(v::numeric()->validate($tripId))
        {
            $tripData = TripModel::getTrip($tripId);
            if($this->isUserAuthenticated() && ($this->currentUser->isAdmin() || $this->currentUser->id === $tripData["user_id"]))
            {
                if(TripModel::deleteTrip($tripId) === true)
                {
                    $this->writeSuccess("Deleted trip ".$tripId);
                }else
                {
                    $this->writeFail("Trip not found.");
                }

            }else
            {
                $this->writeUnauthorized();
            }
        }else
        {
            $this->writeFail("Invalid id.");
        }

    }

}