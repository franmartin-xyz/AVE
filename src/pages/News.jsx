import React,{useState,useEffect} from 'react'
import { useDropzone } from 'react-dropzone';
import "./news.css"
import { FileRejected } from '../components';
import { TextEditor } from '../components';
const News = () => {
  const [files, setFiles] = useState([]);  
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: (acceptedFiles,fileRejections )=> {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    },
    onDropRejected: (fileRejections)=>{
      let errors;
      console.log(fileRejections)
      if(fileRejections[0].errors[0].code==="file-too-large"){
       errors ="La imagen "+fileRejections[0].file.name+" tiene mas de 2MB porfavor reduzca su tamaño, (lo puede hacer compartiendo su imagen en Whatsapp y luego volverla a descargar)";
      }else{
        errors = fileRejections[0].file.name + fileRejections[0].errors[0].message;
      }
      FileRejected(errors);
    },
    maxSize:2097152
  });
  
  const thumbs = files.map((file,index)=> (
    <div className='thumb' key={file.name}>
      <div className='thumbInner'>
        <button id="deleteImg" onClick={(e) => {e.preventDefault(); const newFiles=[...files]; newFiles.splice(index,1); setFiles(newFiles);}}>X</button>
        <img className='img'
          src={file.preview}
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
          alt="imges de la noticia"
        />
      </div>
    </div>
  ));

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  },);

  function handleSubmit(e){
    e.preventDefault()
    let data =new FormData(e.target)
    console.log(data.get('title'),data.get("description"))
  }

  return (
    <div>
      <div className='create__news'>
        <form action="newForm" className='newsForm' onSubmit={e=>handleSubmit(e)}>
          <input type="text" id='title' name='title' required={true} autoComplete="off" placeholder="TITULO DE LA NOTICIA"/>
          <TextEditor />
          {/* <input type="text"  name="description" required={true} autoComplete="off" placeholder="Descripción de la Noticia"/> */}
          <div className='files__container'>
            <div {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />
            <p>Arrastra las imagenes o hace click para abrir el buscador</p>
            </div>
            <aside className="thumbsContainer">
              {thumbs}
            </aside>
          </div>
          <button type='submit' id="submit">Enviar Noticia</button>
        </form>
      </div>
    </div>
  )
}

export default News