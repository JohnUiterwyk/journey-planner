/**
 * Created by johnuiterwyk on 2/23/16.
 */
import React from 'react';

class HomeView extends React.Component {
    getWelcomeMessage()
    {
        let {authenticated} = this.props;
        if(authenticated)
        {
            return "Welcome "+this.props.currentUser.fullname;
        }else
        {
            return "Hi, please login or signup";
        }

    }
    render() {
        if(this.props.currentUser)
        {
            var currentUserJson = <pre>{JSON.stringify(this.props.currentUser, null, '\t')}</pre>;
        }
        return (
            <div>
                <h1>{this.getWelcomeMessage()}</h1>

                    {currentUserJson}

            </div>
        );
    }
}

export default HomeView;