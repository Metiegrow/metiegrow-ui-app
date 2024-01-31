import React,{useState} from 'react';
import { Colxx } from 'components/common/CustomBootstrap';
import { Row, Card, Button } from 'reactstrap';
import ReactQuill from 'react-quill';



import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

const quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };
  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];  


const AskQuestion = () => {
    const [inputkey,setInputKey]=useState('')
    const [inputkey1,setInputKey1]=useState('')
    const [textQuillStandart, setTextQuillStandart] = useState('');

  return (
    <div>
    <h1 className='font-weight-semibold'>Ask a public question</h1>
     <Card className='mt-3'>
     <Colxx  sm="12" md="12" lg="12" xxs="12" className='mx-auto '>
      
    
      <div className='mt-2'>
        <h6 className='font-weight-semibold'>Title</h6>
        <p className='text-muted'>Be specific and imagine you are asking question to another person</p>
        <input
            type="text"
            className="form-control shadow-none border-none  text-one font-weight-medium"
            placeholder ='Type questions here'
            value={inputkey}
            onChange={(e) =>setInputKey(e.target.value)}
          />
       </div>
       
     <div className='mt-4'>
     <h6 className='font-weight-semibold'>Body</h6>
        <p className='text-muted'>Include all the information would need to answer your question</p>
        <Row className="mb-4">
        <Colxx xxs="12">
          
            
              <ReactQuill
                theme="snow"
                value={textQuillStandart}
                onChange={(val) => setTextQuillStandart(val)}
                modules={quillModules}
                formats={quillFormats}
              />
           
       
        </Colxx>
      </Row>

     
     </div>
     <div className='mt-2'>
        <h6 className='font-weight-semibold'>Tags</h6>
        <p className='text-muted'>Add up to 5 tags to decribe what your question is about</p>
        <input
            type="text"
            className="form-control shadow-none border-none  text-one font-weight-medium my-3"
            placeholder ='Type questions here'
            value={inputkey1}
            onChange={(e) =>setInputKey1(e.target.value)}
          />
       </div>
      
      </Colxx>
     </Card>
     <div className='mt-3'>
     <Button color="primary " className="default  py-2 " >
                        Review your question
              </Button>
              
     </div>
 
    </div>
  );
}

export default AskQuestion;
