import Swal from 'sweetalert2'
const PostInfo = (type,msg)=>{
    Swal.fire({
      icon:type,
      title:msg,
      background:"#031B34",
      color:"white",
    })
  }

export default PostInfo