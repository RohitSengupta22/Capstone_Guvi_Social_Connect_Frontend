import React, { useEffect, useState } from 'react'
import NavbarComp from './Navbar'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import Avatar from '@mui/material/Avatar';
import Card from 'react-bootstrap/Card';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Modal from 'react-bootstrap/Modal';
import '../CSS/Homepage.css'


const Homepage = () => {

  const BASE_URL = 'https://social-connect-backend.onrender.com'

  const authToken = localStorage.getItem('token')
  const [userId, setUserId] = useState("")

  const [postData, setPostData] = useState({
    title: '',
    description: '',
    liked: false

  })

  const [comment, setComment] = useState({
    commentText: ''
  })
  const [commentArr, setCommentArr] = useState([])
  const [likedArr,setLikedArr] = useState([])
  const [show, setShow] = useState(false);
  const [commentPostId, setCommentPostId] = useState("")
  const [likeModal, setLikeModal] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = async (id) => {
    setShow(true);
    setCommentPostId(id)

    try {


      const response = await fetch(`${BASE_URL}/posts/comments/${id}`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const result = await response.json();
      console.log(result)
      setCommentArr(result.reverse())




    } catch (e) {

      console.log(e)

    }

  }




  const [postArr, setPostArr] = useState([])

  function postChangeHandler(e) {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value })
  }

  useEffect(() => {

    async function fetchPosts() { //fetching all posts in feed
      const response = await fetch('${BASE_URL}/posts/allposts')
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const result = await response.json();

      setPostArr(result.allPosts.reverse())
    }

    fetchPosts();

  }, [postArr])

  useEffect(() => {

    async function fetchData() { //fetch user data
      const response = await fetch('${BASE_URL}/users/user', {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const result = await response.json();
      const res = result.user;
      setUserId(res._id)







    }



    fetchData();



  }, [])

  async function postHandler() { //creating a new post

    if (postData.title === '' || postData.description === '') {
      alert("Enter proper title and description")
    } else {

      const response = await fetch('${BASE_URL}/posts/createpost', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": authToken
        },
        body: JSON.stringify(postData),
      })

      if (response.ok) {
        const res = await response.json();
        console.log(res)
        setPostArr([...postArr, res.savedPost])
      }

      setPostData({
        title: '',
        description: '',
        liked: false

      })




    }




  }

  async function likeHandler(id) { // handling like/unlike



    const authToken = localStorage.getItem('token');

    try {
      const response = await fetch(`${BASE_URL}/posts/allposts/${id}/like`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
        },

      });

      if (!response.ok) {
        throw new Error('Error updating post');
      }

      const updatedPost = await response.json();
      console.log(updatedPost)



      for (var i = 0; i < postArr.length; i++) {

        if (updatedPost.savedPost.likes.includes(userId) && authToken === updatedPost.token && postArr[i]._id === id) {
          postArr[i] = updatedPost.savedPost;
        }

      }



    } catch (error) {
      // Handle error
      console.error('Error:', error.message);
      return null;
    }



  }

  async function openLikeModal(id) {
    
    try{

   
        const response = await fetch(`${BASE_URL}/posts/likes/${id}`, {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          
          redirect: "follow",
          referrerPolicy: "no-referrer",
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
  
        const result = await response.json();
        console.log(result)
        setLikedArr(result)
      
  

    }catch(error){
      console.log(error)
    }

    setLikeModal(true)

}

  function closeLikeModal() {
    setLikeModal(false);
  }



  function commentChangeHandler(e) {

    const { name, value } = e.target;
    setComment({ ...comment, [name]: value })

  }

  async function commentHandler() {

    if (comment.commentText === '') {
      alert("Enter Proper Comment")
    } else {

      const response = await fetch(`${BASE_URL}/posts/addcomment/${commentPostId}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": authToken
        },
        body: JSON.stringify(comment),
      })

      if (response.ok) {
        const res = await response.json();
        setCommentArr([...commentArr, res.post])
        handleClose();

      }

      setComment({
        commentText: ''
      })

    }
    alert("Comment added successfully!")

  }








  return (
    <div>
      <NavbarComp />
      <Container style={{ marginTop: '90px' }}>
        <FloatingLabel
          controlId="floatingTextarea"
          label="Write a nice title for your post..."
          className="mb-3 mt-5"

        >
          <Form.Control as="textarea" placeholder="Leave a comment here" onChange={postChangeHandler}
            value={postData.title} name='title' />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea2" label="Post your content here!">
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: '100px' }}
            onChange={postChangeHandler}
            value={postData.description}
            name='description'
          />
        </FloatingLabel>
        <div className="d-flex justify-content-center"> {/* Centering div */}
          <Button variant="success" className="mt-4" style={{ width: '20%' }} onClick={postHandler}>
            Post
          </Button>{' '}
        </div>



        <Container className='mt-5  d-flex justify-content-center flex-column align-items-center'>
          {

            postArr.map((post) => (

              <Card key={post._id} style={{ width: '700px', marginBottom: '20px', boxShadow: '2px 2px grey' }} className='Postcard'>

                <Card.Body>

                  <div style={{ display: 'flex' }}>

                    <Avatar

                      sx={{ bgcolor: deepPurple[500] }}
                    >{post.initials}</Avatar>

                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '5px' }}>
                      <Card.Title>{post.username}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{post.dateTime}</Card.Subtitle>
                    </div>


                  </div>


                  <Card.Subtitle className="mb-2 text-muted mt-3">{post.title}</Card.Subtitle>
                  <Card.Text className='mt-3'>
                    {post.description}
                  </Card.Text>

                  {post.likes.includes(userId) ? <FavoriteIcon onClick={() => likeHandler(post._id)} style={{ color: 'red' }} /> : <FavoriteBorderIcon onClick={() => likeHandler(post._id)} />}
                  <ChatBubbleOutlineIcon style={{ marginLeft: '5px' }} onClick={() => handleShow(post._id)} />
                  <h6 style={{ marginTop: '10px',color: 'blue', cursor: 'pointer' }} onClick={()=>openLikeModal(post._id)}>Liked By {post.likedby.length} People</h6>

                  {
                    likeModal && (
                      <Modal show={likeModal} onHide={closeLikeModal}>
                        <Modal.Header closeButton>
                          <Modal.Title>Liked By:</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                         {
                          (likedArr.length > 0) ?
                          likedArr.map((likedby)=>{
                            return (
                              <h6>{likedby}</h6>
                            )
                          })
                          :
                          <h5>No likes yet!!!</h5>
                         }
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={closeLikeModal}>
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    )
                  }


                </Card.Body>




              </Card>



            ))

          }

        </Container>




        <Modal show={show} onHide={handleClose}  >
          <Modal.Header closeButton>
            <Modal.Title>Comments</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel controlId="floatingTextarea2" label="Post your content here!">
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: '100px' }}
                onChange={commentChangeHandler}
                value={comment.commentText}
                name='commentText'
              />
            </FloatingLabel>

            <div >

              {commentArr.map((comment, index) => (
                <Card key={index} style={{ width: '18rem', marginTop: '10px', boxShadow: '2px 2px grey' }}>
                  <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{comment.username}</Card.Subtitle>
                    <Card.Text>
                      {comment.commentText}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}

            </div>


          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={commentHandler}>
              Post
            </Button>
          </Modal.Footer>
        </Modal>





      </Container>

    </div>
  )
}

export default Homepage
