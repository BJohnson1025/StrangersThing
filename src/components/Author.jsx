import React, { useState, useEffect } from "react";
import { myData } from "../api/ajax-helpers";
import AuthorPost from "./AuthorPost";
import Card from 'react-bootstrap/Card';

const Author = ({ token }) => {
  const [myPosts, setMyPosts] = useState([]);
  const [postId, setPostId] = useState('');
  const [myMessages, setMyMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const postsPromise = myData(token);
    Promise.all([postsPromise])
      .then((res) => {
        const filteredPosts = res[0].data.posts.filter((el) => {
          return el.active;
        })
        setMyPosts(filteredPosts);
        const filteredMessages = res[0].data.messages.filter((el) => {
          return el.fromUser._id === res[0].data._id;
        })
        setMyMessages(filteredMessages);
        setUsername(res[0].data.username);
        setUserId(res[0].data._id);
      })
  }, [])

  useEffect(() => {
    console.log(myMessages);
  }, [myMessages])

  return (
    <div className="posts">
      <div>
        <h2>My Posts</h2>
        {myPosts.length ?
          myPosts.map((el, ind) => {
            return (
              <AuthorPost key={el._id + ind} el={el} postId={postId} setPostId={setPostId} token={token} myPosts={myPosts} setMyPosts={setMyPosts} />
            )
          }) : null}
      </div>
      <div>
        <h2>My Messages</h2>
        {myMessages.map((el, ind) => {
          return (
            <Card bg="light" className="mb-2" border="danger" key={ind + el._id}>
              <Card.Body>
                <Card.Title>To: {el.post.author.username}</Card.Title>
                <Card.Subtitle>For: {el.post.title}</Card.Subtitle>
                <Card.Text>{el.content}</Card.Text>
              </Card.Body>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default Author;
