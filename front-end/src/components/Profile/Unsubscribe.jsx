// import axios from 'axios'
// import cookie from 'js-cookie'
// import jwt_decode from 'jwt-decode'

// const Unsubscribe = () => {
//   const token = getCookie('token')
//   const headers = { Authorization: `Bearer ${token}` }
//   const config = { headers }

//   const decodedToken = jwt_decode(token)
//   const userId = decodedToken.userId

//   const getAndDeleteUserPostsAndUnsubscribe = () => {
//     axios({
//       method: 'get',
//       url: `${process.env.REACT_APP_API_URL}/api/posts/${userId}`,
//       headers: headers,
//     })
//       .then((res) => {
//         res.data.forEach((i) => {
//           deletePost(i.id)
//         })
//       })
//       .then((res) => {
//         handleUnsubscribe()
//       })
//       .catch((err) => console.log(err))

//     const deletePost = (postId) => {
//       axios
//         .delete(`${process.env.REACT_APP_API_URL}/api/posts/${postId}`, config)
//         .then((res) => {
//           console.log(res.data)
//         })
//         .catch((err) => console.log(err))
//     }

//     const handleUnsubscribe = () => {
//       axios
//         .delete(`${process.env.REACT_APP_API_URL}/api/auth/delete`, config)
//         .then(() => {
//           removeCookie('token')
//           window.location = '/'
//         })
//         .catch((err) => console.log(err))
//     }

//     const removeCookie = (key) => {
//       cookie.remove(key, { expires: 1 })
//     }
//   }

//   return (
//     <div
//       className="unsubscribe"
//       onClick={(e) => {
//         if (window.confirm('Voulez-vous vraiment vous désinscrire ?')) {
//           getAndDeleteUserPostsAndUnsubscribe()
//         }
//       }}
//     >
//       Désinscription
//     </div>
//   )
// }

// // https://www.w3schools.com/js/js_cookies.asp :
// function getCookie(cname) {
//   let name = cname + '='
//   let decodedCookie = decodeURIComponent(document.cookie)
//   let ca = decodedCookie.split(';')
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i]
//     while (c.charAt(0) === ' ') {
//       c = c.substring(1)
//     }
//     if (c.indexOf(name) === 0) {
//       return c.substring(name.length, c.length)
//     }
//   }
//   return ''
// }

// export default Unsubscribe
