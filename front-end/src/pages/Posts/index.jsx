import React, { useEffect } from 'react'
import Post from '../../components/Post'

const Posts = () => {
  useEffect(() => {
    document.onreadystatechange = function () {
      if (document.readyState !== 'complete') {
        document.querySelector('.loading').style.visibility = 'visible'
      } else {
        document.querySelector('.loading').style.display = 'none'
      }
    }
  }, [])

  return (
    <>
      <div>
        {document.readyState !== 'complete' && <div className="loading"></div>}
        <Post />
      </div>
    </>
  )
}

export default Posts
