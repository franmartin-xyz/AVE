details.forEach((item,i)=>{
    let data;
    item.id ? data={...item} : data ={...item,"id":item.Familia}
    setDoc(doc(db,"details",data.id),{data});
    console.log(i)
  }) 