/**
 * Created by johnuiterwyk on 2/23/16.
 */
import React from 'react';

class Home extends React.Component {
    getWelcomeMessage()
    {
        let {authenticated} = this.props;
        if(authenticated)
        {
            return "Welcome "+this.props.currentUser.fullname;
        }else
        {
            return "Hi, please login";
        }

    }
    render() {
        return (
            <div>
                <h1>{this.getWelcomeMessage()}</h1>
            </div>
        );
    }
}

export default Home;