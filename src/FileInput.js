import React from 'react';
import {useState} from "react";
import ReactImageBase64 from "react-image-base64"
import { useEffect } from 'react';

export function FileInput (){

  const [errors, setErrors] = useState([]);
  const [base64, setBase64] = useState('');
  const [result, setResult] = useState('upload your pic.');

  useEffect(() => {
    async function fetchData(){
      const response = await fetch('http://localhost:8000', {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({image:base64})
      });
      const json = await response.json();
      setResult(json['prediction']);
    }
    if (base64.length > 0){
      fetchData()
    }
  }, [base64])

  return (
    <div>
      <ReactImageBase64
        maxFileSize={10485760}
        thumbnail_size={300}
        drop={true}
        dropText="Choose a file or drag it here."
        capture="environment"
        multiple={false}
        handleChange={ async data => {
          if (data.result) {
            setBase64(data.fileData);
          } else {
            setErrors([...errors, data.messages]);
          }
        }}
      />
      { errors.map((error, index) => 
          <p className="error-message" key={index}>{error}</p>
        )
      }
      <img src={base64} alt="" />
      <p>{result}</p>
    </div>
  )

}