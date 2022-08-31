import React,{useState,useEffect} from 'react'
import { useDropzone } from 'react-dropzone';
import "./news.css"
import { FileRejected, PostInfo } from '../components';
import { TextEditor } from '../components';
import { db, storage } from '../components/functions/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { async } from '@firebase/util';
import { addDoc, arrayUnion, collection, serverTimestamp } from 'firebase/firestore';
const News = () => {
  const [selectedImages,setSelectedImages] = useState([]);
  const [files, setFiles] = useState([]);  
  const [editorState,setEditorState] = useState();
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
      if(fileRejections[0].errors[0].code==="file-too-large"){
       errors ="La imagen "+fileRejections[0].file.name+" tiene mas de 2MB por favor reduzca su tamaño, (lo puede hacer compartiendo su imagen en Whatsapp y luego volverla a descargar)";
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
    let text =JSON.stringify(editorState);
    let downloadURL = [];
    let title = data.get("title");
    files.map((image,i)=>{
      const imageRef = ref(storage, `noticias/${image.path}`);
      uploadBytes(imageRef, image, "data_Url").then(async()=>{
       let URL = await getDownloadURL(imageRef);
       downloadURL.push(URL);
        if(i+1 === files.length){
          addDoc(collection(db,"noticias"),{
            title,
            time: serverTimestamp(),
            text,
            imagesURL:downloadURL,
            }).then(
              PostInfo("success","La noticia fue publicada")
            ).catch(
              err=>PostInfo("error",`${err}`)
            );
        }
      }).catch(
        err=>PostInfo("error",`Problema con Google Storage ${err}`)
      );
    });
     
  }
  return (
    <div>
      <div className='create__news'>
        <form action="newForm" className='newsForm' onSubmit={e=>handleSubmit(e)}>
          <input type="text" id='title' name='title' required={true} autoComplete="off" placeholder="TÍTULO DE LA NOTICIA"/>
          <TextEditor setEditorState={setEditorState}/>
          <div className='files__container'>
            <div {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />
            <p>Arrastra las imagenes o hace click para abrir el buscador</p>
            </div>
            <aside className="thumbsContainer">
              {thumbs}
            </aside>
          </div>
          <button type='submit' id="submit">Publicar Noticia</button>
        </form>
      </div>
    </div>
  )
}

export default News