export const fileMaxSize = 2000000;
export const fileExtName = /^.+(\.json)+$/gi;

const isFileNameSizeCorrect = (file) => {
   try {
      if (!file) {
         throw Error('File does not selected');
      }
      if (file.size > fileMaxSize) {
         throw Error('invalid size');
      }
      if (!fileExtName.test(file.name)) {
         throw Error('invalid format');
      }
      return true;
   } catch (error) {
      console.log(error);
   }
   return false;
};

export const handleFileUpload = (e, callback) => {
   const dataFile = e.target.files[0];
   const fileReader = new FileReader();

   const fileIsOk = isFileNameSizeCorrect(dataFile);

   if (fileIsOk) {
      fileReader.readAsText(dataFile, 'UTF-8');
      fileReader.onload = (e) => {
         const result = e.target.result;
         callback(result);
      };
   } else {
      console.log('File does not meet the requirements');
   }
};
