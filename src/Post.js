import React from 'react';
import "./Post.css";
import Avatar from '@material-ui/core/Avatar';

function Post({username , caption, imageUrl}) {
    return (
        <div className="post">
            <div className="post__header">
            <Avatar className="post__avatar"
                    src="/static/images/avatar/1.jpg"
                    alt="Judegsupreme"
            />
            <h3>{username}</h3>
            </div>

            <img className="post__image"
                  src={imageUrl}
                  alt="" />
          
            <h3 className="post__text"><strong>{username}</strong> {caption}</h3>
     
              
        </div>
    )
}

export default Post;
