import Swal from 'sweetalert2'
const FileRejected = (errors)=>{
    Swal.fire({
      icon:"error",
      title:"Imagen no acceptada",
      text:errors,
      background:"#031B34",
      color:"white",
    })
  }

export default FileRejected