/**
 * Created by johnuiterwyk on 2/15/16.
 */
// tutorial1.js
var CommentBox = React.createClass({
    render: function() {
        return (
            <div className="commentBox">
            Hello, world! I am a CommentBox.
        </div>
        );
    }
});
ReactDOM.render(
<CommentBox />,
    document.getElementById('content')
);