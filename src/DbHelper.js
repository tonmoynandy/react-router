
export  const DbHelper = {

  insert : (indexName,object)=>{
    let indexData = localStorage.getItem(indexName);
    if (indexData) {
      indexData = JSON.parse(localStorage.getItem(indexName));
    } else {
      indexData = [];
    }
    indexData.push({
      ...object,
      _id:indexData.length+1
    });
    indexData = JSON.stringify(indexData)
    localStorage.setItem(indexName,indexData);
    return true;
  },
  all:(indexName)=>{
    let indexData = localStorage.getItem(indexName);
    if (indexData) {
      indexData = JSON.parse(localStorage.getItem(indexName));
    } else {
      indexData = [];
    }
    return indexData;
  },
  find: (indexName,filterObj)=>{
    let indexData = localStorage.getItem(indexName);
    if (indexData) {
      indexData = JSON.parse(localStorage.getItem(indexName));
    }
    if (indexData) {
       return indexData.find((i)=>{
          let result=true;
          for (let index=0; index<filterObj.length; index++) {
            let filterItem = filterObj[index];
            if (i[filterItem[0]] !== filterItem[1]) {
              result =  false;
            }
             
          }
         
          return result;
        });
    } else {
      return null;
    }
   
  },
  filter: (indexName,filterObj=[])=>{
    let indexData = localStorage.getItem(indexName);
    if (indexData) {
      indexData = JSON.parse(localStorage.getItem(indexName));
    }
    if (indexData) {
    return indexData.filter((i)=>{
      let result=true;
      for (let index=0; index<filterObj.length; index++) {
        let filterItem = filterObj[index];
  if (i[filterItem[0]] !== filterItem[1]) {
    result =  false;
  }
      }
      return result;
  
    });
    } else { 
      return [];
    }
  },

  update: (indexName,where,updateObj=null)=>{
    let result = DbHelper.find(indexName, where);
    let allRecord = DbHelper.all(indexName);
    if (result) {
      let updateRow = allRecord.findIndex((i)=> i._id=== result._id);
      updateObj = Object.assign({},result,updateObj);
      allRecord[updateRow] = updateObj;
      localStorage.setItem(indexName,JSON.stringify(allRecord));
    }
  }
}

